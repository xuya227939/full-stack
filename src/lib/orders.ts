/**
 * 支付宝订单：创建、更新、激活（升级用户等级并写入订阅记录）
 */

const ALIPAY_PLAN_USD = {
  earlyBird: {
    standard: 39.99,
    discounted: 29.99,
  },
  proMonthly: 5.99,
  proYearly: 29.99,
};

/**
 * 创建支付宝订单
 * @param isEarlyBird 是否早鸟价（创建时根据早鸟配置判定）
 */
export async function createAlipayOrder(
  userId: string,
  amountCny: number,
  planLevel: number = 1,
  isEarlyBird: boolean = false,
  billingCycle?: "monthly" | "yearly",
) {
  if (![1, 2].includes(planLevel)) {
    throw new Error("Invalid plan level for Alipay");
  }
  if (planLevel === 2 && !billingCycle) {
    throw new Error("Billing cycle is required for Pro plan");
  }
  const { createAdminClient } = await import("./supabase/admin");
  const supabase = createAdminClient();

  const orderNo = `SNV${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const paymentTimeoutAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  let amountUsd = ALIPAY_PLAN_USD.earlyBird.standard;
  if (planLevel === 1) {
    amountUsd = isEarlyBird
      ? ALIPAY_PLAN_USD.earlyBird.discounted
      : ALIPAY_PLAN_USD.earlyBird.standard;
  } else if (planLevel === 2) {
    amountUsd =
      billingCycle === "yearly"
        ? ALIPAY_PLAN_USD.proYearly
        : ALIPAY_PLAN_USD.proMonthly;
  }

  const { data: order, error } = await supabase
    .from("snapvee_orders")
    .insert({
      user_id: userId,
      order_no: orderNo,
      amount: amountUsd,
      amount_cny: amountCny,
      plan_level: planLevel,
      billing_cycle: billingCycle || null,
      status: "pending",
      payment_method: "alipay",
      payment_timeout_at: paymentTimeoutAt,
      is_early_bird: isEarlyBird,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`创建订单失败: ${error.message}`);
  }

  return order;
}

/**
 * 更新订单状态
 */
export async function updateOrderStatus(
  orderId: string,
  status: "pending" | "paid" | "cancelled",
  additionalData?: {
    paid_at?: string;
  },
) {
  const { createAdminClient } = await import("./supabase/admin");
  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
    ...additionalData,
  };

  const { data, error } = await supabase
    .from("snapvee_orders")
    .update(updateData)
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    throw new Error(`更新订单失败: ${error.message}`);
  }

  return data;
}

/**
 * 支付宝支付成功后：更新订单为已支付，并激活用户（升级等级、早鸟标识、写入订阅记录、发收据邮件）
 */
export async function activateAlipayOrder(orderId: string) {
  const { createAdminClient } = await import("./supabase/admin");
  const supabase = createAdminClient();

  const { data: order, error: orderError } = await supabase
    .from("snapvee_orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    throw new Error("订单不存在");
  }

  if (order.status !== "paid") {
    throw new Error("订单未支付，无法激活");
  }

  const planLevel = order.plan_level ?? 1;
  const isEarlyBird = Boolean(order.is_early_bird);
  const billingCycle = (order as { billing_cycle?: string | null })
    .billing_cycle as "monthly" | "yearly" | null;

  // 如果是支付宝 Pro 续费，先关闭历史的支付宝 Pro 订阅，避免多条 active
  if (planLevel === 2) {
    await supabase
      .from("snapvee_subscriptions")
      .update({ status: "canceled", cancel_at_period_end: true })
      .eq("user_id", order.user_id)
      .eq("user_level", 2)
      .ilike("stripe_subscription_id", "alipay_%")
      .neq("stripe_subscription_id", `alipay_${order.order_no}`)
      .eq("status", "active");
  }
  // 早鸟：更新销量并得到早鸟编号
  let earlyBirdNumber: number | null = null;
  if (isEarlyBird && planLevel === 1) {
    const { data: config } = await supabase
      .from("snapvee_early_bird_config")
      .select("sold_count")
      .eq("id", 1)
      .single();

    if (config) {
      earlyBirdNumber = config.sold_count + 1;
      await supabase
        .from("snapvee_early_bird_config")
        .update({ sold_count: earlyBirdNumber })
        .eq("id", 1);
      console.log(
        `Alipay early bird #${earlyBirdNumber} for user ${order.user_id}`,
      );
    }
  }

  // 更新用户等级、订阅状态、早鸟标识
  const userUpdate: Record<string, unknown> = {
    user_level: planLevel,
    subscription_status: "active",
    updated_at: new Date().toISOString(),
  };
  if (isEarlyBird && earlyBirdNumber != null) {
    userUpdate.is_early_bird = true;
    userUpdate.early_bird_number = earlyBirdNumber;
  }
  await supabase
    .from("snapvee_users")
    .update(userUpdate)
    .eq("id", order.user_id);

  // 计算订阅周期（Pro 为月/年订阅，Early Bird 终身）
  let currentPeriodEnd: string | null = null;
  let cancelAtPeriodEnd = false;
  let planName = "Alipay Early Bird";
  if (planLevel === 2) {
    const now = new Date();
    const end = new Date(now);
    if (billingCycle === "yearly") {
      end.setFullYear(end.getFullYear() + 1);
      planName = "Alipay Pro Yearly";
    } else {
      end.setMonth(end.getMonth() + 1);
      planName = "Alipay Pro Monthly";
    }
    currentPeriodEnd = end.toISOString();
    cancelAtPeriodEnd = true;
  }

  // 创建订阅记录（与 Stripe 一致，用 alipay_ 前缀标识）
  const subscriptionId = `alipay_${order.order_no}`;
  await supabase.from("snapvee_subscriptions").upsert(
    {
      user_id: order.user_id,
      stripe_subscription_id: subscriptionId,
      stripe_price_id: planName,
      user_level: planLevel,
      status: "active",
      current_period_start: new Date().toISOString(),
      current_period_end: currentPeriodEnd,
      cancel_at_period_end: cancelAtPeriodEnd,
      amount_paid: Math.round(Number(order.amount_cny ?? order.amount) * 100),
      currency: "cny",
    },
    { onConflict: "stripe_subscription_id" },
  );

  // 发收据邮件（与 Stripe 一致，支付宝无 receiptUrl）
  const { data: userProfile } = await supabase
    .from("snapvee_users")
    .select("email, username")
    .eq("id", order.user_id)
    .single();
  const userEmail = userProfile?.email;
  if (userEmail) {
    try {
      const { sendPaymentReceiptEmail } = await import("./resend");
      const isChineseUser =
        userEmail.includes("@qq.com") ||
        userEmail.includes("@163.com") ||
        userEmail.includes("@126.com") ||
        userEmail.includes("@sina.com") ||
        userEmail.includes("@aliyun.com") ||
        userEmail.includes("@foxmail.com");
      const locale = isChineseUser ? "zh" : "en";
      const customerName = userProfile?.username ?? userEmail.split("@")[0];
      const amount = String(order.amount_cny ?? order.amount);
      const paymentDate = new Date().toLocaleDateString(
        locale === "zh" ? "zh-CN" : "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      );
      const receiptPlanName =
        planLevel === 2
          ? `SnapVee Pro ${billingCycle === "yearly" ? "Yearly" : "Monthly"}`
          : "SnapVee Early Bird";
      await sendPaymentReceiptEmail(
        userEmail,
        {
          customerName: String(customerName),
          planName: receiptPlanName,
          amount,
          currency: "CNY",
          paymentDate,
          receiptUrl: "", // 支付宝无在线收据链接，邮件即凭证
        },
        locale,
      );
      console.log(`Alipay receipt email sent to ${userEmail}`);
    } catch (e) {
      console.error("Failed to send Alipay receipt email:", e);
    }
  }

  return order;
}
