import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe, getPricingPlan, PRICING_PLANS } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * 创建 Stripe Checkout Session
 * POST /api/stripe/checkout
 */
export async function POST(request: NextRequest) {
  try {
    // 检查用户认证
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { code: 4001, msg: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { planLevel, successUrl, cancelUrl, useEarlyBird, billingCycle } =
      body;

    // 验证 planLevel
    if (typeof planLevel !== "number" || planLevel < 1 || planLevel > 2) {
      return NextResponse.json(
        {
          code: 3001,
          msg: "Invalid plan level. Must be 1 (Early Bird) or 2 (Pro)",
        },
        { status: 400 },
      );
    }
    if (
      planLevel === 2 &&
      billingCycle &&
      !["monthly", "yearly"].includes(billingCycle)
    ) {
      return NextResponse.json(
        { code: 3004, msg: "Invalid billing cycle. Must be monthly or yearly" },
        { status: 400 },
      );
    }

    // 检查是否使用早鸟价（仅对 Basic 计划有效）
    let plan: {
      level: number;
      name: string;
      price: number;
      priceId: string | null;
    } = getPricingPlan(planLevel, billingCycle);
    let isEarlyBirdPurchase = false;

    if (planLevel === 1 && useEarlyBird) {
      // 检查早鸟是否仍然可用
      const adminSupabase = createAdminClient();
      const { data: earlyBirdConfig } = await adminSupabase
        .from("snapvee_early_bird_config")
        .select("*")
        .eq("id", 1)
        .single();

      if (earlyBirdConfig) {
        const remainingQuota =
          earlyBirdConfig.total_quota - earlyBirdConfig.sold_count;
        if (earlyBirdConfig.is_active && remainingQuota > 0) {
          // 使用早鸟价格
          plan = PRICING_PLANS.BASIC_EARLY_BIRD;
          isEarlyBirdPurchase = true;
        }
      }
    }

    if (!plan.priceId) {
      return NextResponse.json(
        { code: 3002, msg: "Price ID not configured for this plan" },
        { status: 500 },
      );
    }

    const supabase = createClient();

    // 获取或创建 Stripe Customer
    let customerId: string;
    const { data: userData } = await supabase
      .from("snapvee_users")
      .select("stripe_customer_id")
      .eq("id", session.user.id)
      .single();

    if (userData?.stripe_customer_id) {
      customerId = userData.stripe_customer_id;
    } else {
      // 创建 Stripe Customer
      const customer = await stripe.customers.create({
        email: session.user.email || undefined,
        metadata: {
          userId: session.user.id,
        },
      });

      customerId = customer.id;

      // 保存到数据库
      await supabase
        .from("snapvee_users")
        .update({ stripe_customer_id: customerId })
        .eq("id", session.user.id);
    }

    // 获取基础 URL
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:3000";
    const defaultSuccessUrl = `${baseUrl}/pricing?success=true`;
    const defaultCancelUrl = `${baseUrl}/pricing?canceled=true`;

    const isSubscription = planLevel === 2;

    // 创建 Checkout Session（银行卡支付；支付宝走独立 /api/payment/alipay）
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: isSubscription ? "subscription" : "payment",
      success_url: successUrl || defaultSuccessUrl,
      cancel_url: cancelUrl || defaultCancelUrl,
      metadata: {
        userId: session.user.id,
        planLevel: planLevel.toString(),
        planName: plan.name,
        isEarlyBird: isEarlyBirdPurchase ? "true" : "false",
        billingCycle: billingCycle || "",
      },
      // 订阅模式下使用 subscription_data，支付模式使用 payment_intent_data
      ...(isSubscription
        ? {
            subscription_data: {
              metadata: {
                userId: session.user.id,
                planLevel: planLevel.toString(),
                planName: plan.name,
                billingCycle: billingCycle || "",
              },
            },
          }
        : {
            // 启用发票生成，用于获取收据链接
            invoice_creation: {
              enabled: true,
              invoice_data: {
                description: `SnapVee ${plan.name} Plan - Lifetime Access`,
                metadata: {
                  userId: session.user.id,
                  planLevel: planLevel.toString(),
                  planName: plan.name,
                },
              },
            },
            // 允许客户在支付后立即访问
            payment_intent_data: {
              metadata: {
                userId: session.user.id,
                planLevel: planLevel.toString(),
                planName: plan.name,
                isEarlyBird: isEarlyBirdPurchase ? "true" : "false",
              },
            },
          }),
    });

    console.log("Checkout session created:", {
      id: checkoutSession.id,
      url: checkoutSession.url,
      status: checkoutSession.status,
    });

    // 检查 URL 是否存在
    if (!checkoutSession.url) {
      console.error("Checkout session URL is null:", checkoutSession);
      return NextResponse.json(
        {
          code: 3003,
          msg: "Checkout URL not available. Please check Stripe configuration.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: {
        sessionId: checkoutSession.id,
        url: checkoutSession.url,
      },
    });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    // 返回更详细的错误信息
    const errorMessage = error.message || "Failed to create checkout session";
    return NextResponse.json(
      { code: 5000, msg: errorMessage },
      { status: 500 },
    );
  }
}
