import axios from "axios";

/**
 * 创建 Stripe Checkout Session
 */
export async function createCheckoutSession(
  planLevel: number,
  successUrl?: string,
  cancelUrl?: string,
  useEarlyBird?: boolean,
  billingCycle?: "monthly" | "yearly",
): Promise<{ sessionId: string; url: string | null }> {
  try {
    const response = await axios.post("/api/stripe/checkout", {
      planLevel,
      successUrl,
      cancelUrl,
      useEarlyBird,
      billingCycle,
    });

    const data = response.data;
    console.log("[Payment] Checkout response:", data);

    // 检查返回的 code 是否为 0（成功）
    if (data.code !== 0) {
      throw new Error(data.msg || "Failed to create checkout session");
    }

    // 确保 data.data 存在
    if (!data.data) {
      console.error("[Payment] No data in response:", data);
      throw new Error("Invalid response from checkout API");
    }

    return data.data;
  } catch (error: any) {
    // axios 错误处理：从 error.response.data 中提取错误信息
    const errorData = error.response?.data;
    const errorMsg =
      errorData?.msg || error.message || "Payment initialization failed";
    console.error("[Payment] Checkout error:", errorMsg, error);
    throw new Error(errorMsg);
  }
}

/**
 * 重定向到 Stripe Checkout（银行卡支付）
 */
export async function redirectToCheckout(
  planLevel: number,
  successUrl?: string,
  cancelUrl?: string,
  useEarlyBird?: boolean,
  billingCycle?: "monthly" | "yearly",
): Promise<void> {
  const { url } = await createCheckoutSession(
    planLevel,
    successUrl,
    cancelUrl,
    useEarlyBird,
    billingCycle,
  );

  if (url) {
    window.location.href = url;
  } else {
    throw new Error("Checkout URL not available");
  }
}

/**
 * 支付宝支付：创建订单并提交支付宝表单跳转
 * 支持 Early Bird (planLevel === 1) 与 Pro (planLevel === 2)
 */
export async function redirectToAlipay(
  planLevel: number,
  billingCycle?: "monthly" | "yearly",
): Promise<void> {
  const response = await fetch("/api/payment/alipay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan_level: planLevel, billing_cycle: billingCycle }),
  });
  const data = await response.json();
  if (data.code !== 0 || !data.data?.form) {
    throw new Error(data.msg || "Failed to create Alipay order");
  }
  const formHtml = data.data.form;
  const doc = window.document;
  const div = doc.createElement("div");
  div.innerHTML = formHtml;
  const form = div.querySelector("form");
  if (form) {
    doc.body.appendChild(form);
    form.submit();
  } else {
    doc.open();
    doc.write(formHtml);
    doc.close();
  }
}
