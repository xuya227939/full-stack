import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPaymentReceiptEmail } from "@/lib/resend";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * 从订阅中获取账期信息（Stripe SDK v20.x 兼容）
 * 在 API 2025-12-15.clover 中，current_period_start/end 移到了 subscription.items.data[0]
 */
function getSubscriptionPeriod(subscription: Stripe.Subscription): {
  currentPeriodStart: number;
  currentPeriodEnd: number;
} {
  const firstItem = subscription.items?.data?.[0];
  return {
    currentPeriodStart: firstItem?.current_period_start ?? subscription.created,
    currentPeriodEnd: firstItem?.current_period_end ?? subscription.created,
  };
}

/**
 * Stripe Webhook 处理
 * POST /api/stripe/webhook
 */
export async function POST(request: NextRequest) {
  try {
    // 获取原始 body 作为 Buffer（Stripe 签名验证需要原始字节）
    const bodyBuffer = await request.arrayBuffer();
    const body = Buffer.from(bodyBuffer);

    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 },
      );
    }

    let event: Stripe.Event;

    try {
      // 使用 Buffer 或字符串都可以，Stripe SDK 会处理
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 },
      );
    }

    // 使用 admin client，因为 webhook 没有用户 session，需要绕过 RLS
    const supabase = createAdminClient();

    // 处理不同的事件类型
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session, supabase);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent, supabase);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("Payment failed:", paymentIntent.id);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription, supabase);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription, supabase);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook handler failed" },
      { status: 500 },
    );
  }
}

/**
 * 处理 Checkout Session 完成
 */
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: ReturnType<typeof createAdminClient>,
) {
  // 幂等性检查：防止重复处理同一个 session
  const { data: existingSubscription } = await supabase
    .from("snapvee_subscriptions")
    .select("id")
    .eq("stripe_subscription_id", session.id)
    .single();

  if (existingSubscription) {
    console.warn(`Session ${session.id} already processed, skipping duplicate`);
    return;
  }

  const userId = session.metadata?.userId;
  const planLevel = session.metadata?.planLevel
    ? parseInt(session.metadata.planLevel, 10)
    : null;
  const isEarlyBird = session.metadata?.isEarlyBird === "true";

  if (!userId || planLevel === null) {
    console.error("Missing userId or planLevel in session metadata");
    return;
  }

  // 如果是早鸟购买，先获取当前销量作为早鸟编号
  let earlyBirdNumber: number | null = null;
  if (isEarlyBird && planLevel === 1) {
    const { data: config } = await supabase
      .from("snapvee_early_bird_config")
      .select("sold_count")
      .eq("id", 1)
      .single();

    if (config) {
      // 早鸟编号 = 当前销量 + 1
      earlyBirdNumber = config.sold_count + 1;

      // 更新早鸟销量
      await supabase
        .from("snapvee_early_bird_config")
        .update({ sold_count: earlyBirdNumber })
        .eq("id", 1);

      console.log(`Early bird #${earlyBirdNumber} for user ${userId}`);
    }
  }

  // 更新用户等级和早鸟标识
  const updateData: Record<string, unknown> = {
    user_level: planLevel,
    subscription_status: "active",
  };

  // 如果是早鸟用户，添加早鸟标识和编号
  if (isEarlyBird && earlyBirdNumber) {
    updateData.is_early_bird = true;
    updateData.early_bird_number = earlyBirdNumber;
  }

  const { data: userData, error: userError } = await supabase
    .from("snapvee_users")
    .update(updateData)
    .eq("id", userId)
    .select();

  if (userError) {
    console.error("Failed to update user level:", userError);
    throw new Error(`Failed to update user: ${userError.message}`);
  }

  console.log(`User ${userId} updated:`, userData);

  // 获取 Invoice 信息（用于收据链接）
  let receiptUrl: string | null = null;
  let invoiceId: string | null = null;
  let amountPaid: number | null = null;
  let currency: string = "usd";

  if (session.invoice) {
    try {
      const invoice = await stripe.invoices.retrieve(session.invoice as string);
      receiptUrl = invoice.hosted_invoice_url || null;
      invoiceId = invoice.id;
      amountPaid = invoice.amount_paid;
      currency = invoice.currency;
      console.log(
        `Invoice retrieved: ${invoiceId}, receipt URL: ${receiptUrl}`,
      );
    } catch (invoiceError) {
      console.error("Failed to retrieve invoice:", invoiceError);
      // 继续处理，不中断流程
    }
  }

  const isSubscriptionCheckout = session.mode === "subscription";
  let stripeSubscriptionData: Stripe.Subscription | null = null;
  if (isSubscriptionCheckout && session.subscription) {
    try {
      stripeSubscriptionData = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );
    } catch (subscriptionError) {
      console.error("Failed to retrieve subscription:", subscriptionError);
    }
  }

  // 获取账期信息
  const period = stripeSubscriptionData
    ? getSubscriptionPeriod(stripeSubscriptionData)
    : null;

  // 创建订阅记录（一次性支付也记录为订阅）
  const subscriptionRecord: Record<string, unknown> = {
    user_id: userId,
    stripe_subscription_id: (session.subscription as string) || session.id,
    stripe_price_id: session.metadata?.planName || "",
    user_level: planLevel,
    status: stripeSubscriptionData?.status || "active",
    current_period_start: period
      ? new Date(period.currentPeriodStart * 1000).toISOString()
      : new Date().toISOString(),
    current_period_end: period
      ? new Date(period.currentPeriodEnd * 1000).toISOString()
      : null,
    cancel_at_period_end: stripeSubscriptionData?.cancel_at_period_end || false,
  };

  // 添加收据相关字段（如果有）
  if (invoiceId) {
    subscriptionRecord.stripe_invoice_id = invoiceId;
  }
  if (receiptUrl) {
    subscriptionRecord.stripe_receipt_url = receiptUrl;
  }
  if (amountPaid !== null) {
    subscriptionRecord.amount_paid = amountPaid;
  }
  if (currency) {
    subscriptionRecord.currency = currency;
  }

  const { data: subscriptionResult, error: subscriptionError } = await supabase
    .from("snapvee_subscriptions")
    .upsert(subscriptionRecord)
    .select();

  if (subscriptionError) {
    console.error("Failed to create subscription:", subscriptionError);
    throw new Error(
      `Failed to create subscription: ${subscriptionError.message}`,
    );
  }

  console.log(`User ${userId} upgraded to level ${planLevel}`);
  console.log(`Subscription created:`, subscriptionResult);

  // 发送支付收据邮件
  const userEmail = session.customer_details?.email;
  if (userEmail && receiptUrl) {
    try {
      // 根据用户邮箱或其他信息判断语言
      // 简单判断：如果邮箱包含常见中国域名，使用中文
      const isChineseUser =
        userEmail.includes("@qq.com") ||
        userEmail.includes("@163.com") ||
        userEmail.includes("@126.com") ||
        userEmail.includes("@sina.com") ||
        userEmail.includes("@aliyun.com") ||
        userEmail.includes("@foxmail.com");
      const locale = isChineseUser ? "zh" : "en";

      const customerName =
        session.customer_details?.name || userEmail.split("@")[0];
      const planName = session.metadata?.planName || "Basic";
      const amount = ((session.amount_total || 0) / 100).toFixed(2);
      const currencyUpper = (session.currency || "usd").toUpperCase();
      const paymentDate = new Date().toLocaleDateString(
        locale === "zh" ? "zh-CN" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );

      await sendPaymentReceiptEmail(
        userEmail,
        {
          customerName,
          planName,
          amount,
          currency: currencyUpper,
          paymentDate,
          receiptUrl,
        },
        locale,
      );

      console.log(`Payment receipt email sent to ${userEmail}`);
    } catch (emailError) {
      console.error("Failed to send payment receipt email:", emailError);
      // 不中断流程，邮件发送失败不影响支付成功
    }
  } else {
    console.log(
      `Skipping receipt email: userEmail=${userEmail}, receiptUrl=${receiptUrl}`,
    );
  }
}

/**
 * 订阅更新（Stripe）
 */
async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof createAdminClient>,
) {
  let userId = subscription.metadata?.userId;
  const planLevel = subscription.metadata?.planLevel
    ? parseInt(subscription.metadata.planLevel, 10)
    : 2;

  const period = getSubscriptionPeriod(subscription);
  const currentPeriodStart = new Date(
    period.currentPeriodStart * 1000,
  ).toISOString();
  const currentPeriodEnd = new Date(
    period.currentPeriodEnd * 1000,
  ).toISOString();

  await supabase.from("snapvee_subscriptions").upsert(
    {
      user_id: userId || null,
      stripe_subscription_id: subscription.id,
      stripe_price_id: subscription.items.data[0]?.price?.id || "",
      user_level: planLevel,
      status: subscription.status,
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd,
      cancel_at_period_end: subscription.cancel_at_period_end,
    },
    { onConflict: "stripe_subscription_id" },
  );

  if (!userId) {
    const { data: existingSub } = await supabase
      .from("snapvee_subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", subscription.id)
      .maybeSingle();
    userId = existingSub?.user_id || null;
  }
  if (!userId) return;

  const now = Date.now();
  const periodEndMs = period.currentPeriodEnd * 1000;
  const shouldDowngrade =
    subscription.status !== "active" ||
    (subscription.cancel_at_period_end && periodEndMs <= now);

  if (shouldDowngrade) {
    await supabase
      .from("snapvee_users")
      .update({ user_level: 0, subscription_status: "expired" })
      .eq("id", userId);
    return;
  }

  await supabase
    .from("snapvee_users")
    .update({ user_level: planLevel, subscription_status: "active" })
    .eq("id", userId);
}

/**
 * 订阅取消（Stripe）
 */
async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof createAdminClient>,
) {
  let userId = subscription.metadata?.userId;
  const planLevel = subscription.metadata?.planLevel
    ? parseInt(subscription.metadata.planLevel, 10)
    : 2;

  const period = getSubscriptionPeriod(subscription);

  await supabase.from("snapvee_subscriptions").upsert(
    {
      user_id: userId || null,
      stripe_subscription_id: subscription.id,
      stripe_price_id: subscription.items.data[0]?.price?.id || "",
      user_level: planLevel,
      status: "canceled",
      current_period_start: new Date(
        period.currentPeriodStart * 1000,
      ).toISOString(),
      current_period_end: new Date(
        period.currentPeriodEnd * 1000,
      ).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    },
    { onConflict: "stripe_subscription_id" },
  );

  if (!userId) {
    const { data: existingSub } = await supabase
      .from("snapvee_subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", subscription.id)
      .maybeSingle();
    userId = existingSub?.user_id || null;
  }
  if (!userId) return;

  await supabase
    .from("snapvee_users")
    .update({ user_level: 0, subscription_status: "expired" })
    .eq("id", userId);
}

/**
 * 处理支付成功
 */
async function handlePaymentSucceeded(
  paymentIntent: Stripe.PaymentIntent,
  supabase: ReturnType<typeof createAdminClient>,
) {
  const userId = paymentIntent.metadata?.userId;
  const planLevel = paymentIntent.metadata?.planLevel
    ? parseInt(paymentIntent.metadata.planLevel, 10)
    : null;

  if (!userId || planLevel === null) {
    console.error("Missing userId or planLevel in payment intent metadata");
    return;
  }

  // 确保用户等级已更新（双重保险）
  const { data: userData, error: userError } = await supabase
    .from("snapvee_users")
    .update({
      user_level: planLevel,
      subscription_status: "active",
    })
    .eq("id", userId)
    .select();

  if (userError) {
    console.error("Failed to update user level:", userError);
    throw new Error(`Failed to update user: ${userError.message}`);
  }

  console.log(`Payment succeeded for user ${userId}, level ${planLevel}`);
  console.log(`User updated:`, userData);
}

// 禁用 body 解析，因为我们需要原始 body 来验证签名
export const runtime = "nodejs";
