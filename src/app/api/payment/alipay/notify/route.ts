export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, activateAlipayOrder } from "@/lib/orders";
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

/**
 * 支付宝会先发 GET 探活
 */
export async function GET() {
  return new NextResponse("success");
}

/**
 * 支付宝异步通知（POST application/x-www-form-urlencoded）
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let params: Record<string, string> = {};

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const url = new URL(request.url);
      url.searchParams.forEach((value, key) => {
        params[key] = value;
      });
      if (Object.keys(params).length === 0) {
        const bodyText = await request.text();
        const bodyParams = new URLSearchParams(bodyText);
        bodyParams.forEach((value, key) => {
          params[key] = value;
        });
      }
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        params[key] = value.toString();
      });
    }

    console.log("Alipay Notify Params:", JSON.stringify(params, null, 2));

    try {
      const signVerified = alipaySdk.checkNotifySign(params);
      if (!signVerified) {
        console.error("Alipay signature verification failed");
        return new NextResponse("fail", { status: 400 });
      }
    } catch (signError: unknown) {
      console.error("Alipay signature verification error:", signError);
      return new NextResponse("fail", { status: 400 });
    }

    const tradeStatus = params.trade_status || params.tradeStatus;
    if (tradeStatus !== "TRADE_SUCCESS" && tradeStatus !== "TRADE_FINISHED") {
      return new NextResponse("success");
    }

    const orderNo = params.out_trade_no || params.outTradeNo;
    if (!orderNo) {
      console.error("Order number not found in params");
      return new NextResponse("fail", { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: order, error: orderError } = await supabase
      .from("snapvee_orders")
      .select("*")
      .eq("order_no", orderNo)
      .single();

    if (orderError || !order) {
      console.error("Order not found:", orderNo);
      return new NextResponse("fail", { status: 404 });
    }

    if (order.status === "paid") {
      return new NextResponse("success");
    }

    await updateOrderStatus(order.id, "paid", {
      paid_at: new Date().toISOString(),
    });

    await activateAlipayOrder(order.id);

    return new NextResponse("success");
  } catch (error: unknown) {
    console.error("Alipay notify error:", error);
    return new NextResponse("fail", { status: 500 });
  }
}
