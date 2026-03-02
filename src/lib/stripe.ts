import Stripe from "stripe";

let stripeClient: Stripe | null = null;

function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return key;
}

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(getStripeSecretKey(), {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    });
  }
  return stripeClient;
}

// 价格配置
export const PRICING_PLANS = {
  FREE: {
    level: 0,
    name: "Free",
    price: 0,
    priceId: null, // 免费计划不需要 Stripe Price ID
  },
  BASIC: {
    level: 1,
    name: "Early Bird",
    price: 39.99,
    // 需要在 Stripe Dashboard 创建 Price，然后设置这里
    priceId: process.env.STRIPE_PRICE_ID_BASIC || "price_basic",
  },
  BASIC_EARLY_BIRD: {
    level: 1,
    name: "Early Bird",
    price: 29.99,
    originalPrice: 39.99,
    priceId:
      process.env.STRIPE_PRICE_ID_BASIC_EARLY_BIRD || "price_basic_early",
    isEarlyBird: true,
  },
  PRO_MONTHLY: {
    level: 2,
    name: "Pro Monthly",
    price: 5.99,
    priceId: process.env.STRIPE_PRICE_ID_PRO_MONTHLY || "price_pro_monthly",
  },
  PRO_YEARLY: {
    level: 2,
    name: "Pro Yearly",
    price: 29.99,
    priceId: process.env.STRIPE_PRICE_ID_PRO_YEARLY || "price_pro_yearly",
  },
} as const;

// 早鸟配置
export const EARLY_BIRD_CONFIG = {
  totalQuota: 500,
  rewardPerReferral: 2,
  maxReferrals: 1, // 每个用户最多邀请 1 人
} as const;

/**
 * 获取价格信息
 */
export function getPricingPlan(
  level: number,
  billingCycle?: "monthly" | "yearly",
) {
  switch (level) {
    case 0:
      return PRICING_PLANS.FREE;
    case 1:
      return PRICING_PLANS.BASIC;
    case 2:
      return billingCycle === "yearly"
        ? PRICING_PLANS.PRO_YEARLY
        : PRICING_PLANS.PRO_MONTHLY;
    default:
      return PRICING_PLANS.FREE;
  }
}
