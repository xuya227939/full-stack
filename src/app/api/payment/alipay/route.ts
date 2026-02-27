import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createAlipayOrder } from "@/lib/orders";
import { AlipaySdk } from "alipay-sdk";
import { createAdminClient } from "@/lib/supabase/admin";

const alipaySdk = new AlipaySdk({
  appId: process.env.ALIPAY_APP_ID!,
  privateKey: process.env.ALIPAY_PRIVATE_KEY!,
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY!,
  gateway:
    process.env.ALIPAY_GATEWAY || "https://openapi.alipay.com/gateway.do",
  signType: "RSA2",
});

/** 支付宝价格配置（可通过环境变量覆盖） */
const ALIPAY_EARLY_BIRD_CNY = Number(
  process.env.ALIPAY_EARLY_BIRD_CNY || "208",
);
const ALIPAY_PRO_MONTHLY_CNY = Number(
  process.env.ALIPAY_PRO_MONTHLY_CNY || "0",
);
const ALIPAY_PRO_YEARLY_CNY = Number(
  process.env.ALIPAY_PRO_YEARLY_CNY || "0",
);
const ALIPAY_PLAN_LEVEL = 1;

/**
 * 创建支付宝订单并返回跳转表单
 * POST /api/payment/alipay
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { code: 4001, msg: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => ({}));
    const { plan_level = ALIPAY_PLAN_LEVEL, billing_cycle } = body;

    if (![1, 2].includes(plan_level)) {
      return NextResponse.json(
        { code: 3001, msg: "Invalid plan level for Alipay" },
        { status: 400 },
      );
    }

    const normalizedBillingCycle =
      billing_cycle === "yearly" || billing_cycle === "monthly"
        ? billing_cycle
        : null;
    if (plan_level === 2 && !normalizedBillingCycle) {
      return NextResponse.json(
        {
          code: 3002,
          msg: "Invalid billing cycle. Must be monthly or yearly",
        },
        { status: 400 },
      );
    }

    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://snapvee.com";
    const notifyUrl = `${baseUrl}/api/payment/alipay/notify`;
    const returnUrl = `${baseUrl}/pricing?success=true`;

    // 早鸟：仅 Early Bird 且早鸟仍有名额时计入
    let isEarlyBird = false;
    if (plan_level === 1) {
      const adminSupabase = createAdminClient();
      const { data: earlyBirdConfig } = await adminSupabase
        .from("snapvee_early_bird_config")
        .select("total_quota, sold_count, is_active")
        .eq("id", 1)
        .single();
      if (
        earlyBirdConfig?.is_active &&
        earlyBirdConfig.total_quota - earlyBirdConfig.sold_count > 0
      ) {
        isEarlyBird = true;
      }
    }

    let alipayAmountCny = ALIPAY_EARLY_BIRD_CNY;
    if (plan_level === 2) {
      alipayAmountCny =
        normalizedBillingCycle === "yearly"
          ? ALIPAY_PRO_YEARLY_CNY
          : ALIPAY_PRO_MONTHLY_CNY;
      if (!alipayAmountCny || alipayAmountCny <= 0) {
        return NextResponse.json(
          {
            code: 3003,
            msg: "Alipay Pro price not configured",
          },
          { status: 500 },
        );
      }
    }

    const order = await createAlipayOrder(
      session.user.id,
      alipayAmountCny,
      plan_level,
      isEarlyBird,
      normalizedBillingCycle || undefined,
    );

    const subject =
      plan_level === 2
        ? `SnapVee Pro - ${normalizedBillingCycle === "yearly" ? "Yearly" : "Monthly"}`
        : "SnapVee Early Bird - 终身会员";
    const bodyText =
      plan_level === 2
        ? `SnapVee Pro - ${normalizedBillingCycle === "yearly" ? "Yearly" : "Monthly"} Subscription`
        : "SnapVee Early Bird - Lifetime Access";

    const formHtml: string = await alipaySdk.pageExec("alipay.trade.page.pay", {
      notify_url: notifyUrl,
      return_url: returnUrl,
      bizContent: {
        out_trade_no: order.order_no,
        product_code: "FAST_INSTANT_TRADE_PAY",
        total_amount: String(alipayAmountCny),
        subject,
        body: bodyText,
        timeout_express: "30m",
      },
    });

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: { form: formHtml, order_no: order.order_no },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Create Alipay order failed";
    console.error("Alipay create order error:", error);
    return NextResponse.json({ code: 5000, msg: message }, { status: 500 });
  }
}
