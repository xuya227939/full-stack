import type { CSSProperties } from "react";
import Link from "next/link";
import { Check, Zap, Crown, Gift, Clock, Star, X } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import { createAdminClient } from "@/lib/supabase/admin";
import { EARLY_BIRD_CONFIG } from "@/lib/stripe";

interface EarlyBirdStatus {
  isActive: boolean;
  totalQuota: number;
  soldCount: number;
  remainingQuota: number;
}

const pricingPlans = [
  {
    key: "free",
    level: 0,
    name: "Free",
    price: "$0",
    period: "",
    description: "Try SnapVee once and see it works.",
    features: [
      "Max 720p quality",
      "Up to 20 minutes per video",
      "1 download per day",
      "Bilibili premium video extraction",
    ],
    featureStates: [true, true, true, true],
    cta: "Get Started",
    popular: false,
    icon: Gift,
    isFree: true,
  },
  {
    key: "pro",
    level: 1,
    name: "Pro",
    priceMonthly: "$5.99",
    priceYearly: "$29.99",
    description: "Best for creators who need HD/4K and faster downloads.",
    features: [
      "1080p / 2K quality",
      "4K: 5 downloads per month",
      "Up to 1 hour per video",
      "Batch download (up to 3 at once)",
      "Audio & video separation",
      "Fast queue",
      "Remove YouTube ads",
      "Bilibili premium video extraction",
      "YouTube multi-language audio (Opus/AAC)",
    ],
    cta: "Subscribe",
    popular: false,
    icon: Zap,
    isFree: false,
  },
  {
    key: "early",
    level: 2,
    name: "Early Bird",
    price: "$39.99",
    earlyBirdPrice: "$29.99",
    description: "Lifetime access for early supporters. Limited spots.",
    features: [
      "All Pro features",
      "4K unlimited",
      "Up to 2 hours per video",
      "Batch download (up to 3 at once)",
      "Priority queue",
      "Email support",
      "Remove YouTube ads",
      "Bilibili premium video extraction",
      "YouTube multi-language audio (Opus/AAC)",
    ],
    earlyBirdFeatures: [
      "Lifetime access (Early Bird)",
      "Permanent price protection",
      "Priority feature access",
      "Early Bird community support",
    ],
    cta: "Get Early Bird",
    popular: true,
    icon: Star,
    isFree: false,
    isEarlyBird: true,
  },
  {
    key: "business",
    level: 3,
    name: "Business / API",
    price: "Contact us",
    description:
      "For teams and developers who need higher limits and API access.",
    features: [
      "Custom concurrency & limits",
      "Commercial license",
      "API access (pay-as-you-go)",
      "Priority queue",
      "SLA & dedicated support",
    ],
    cta: "Contact us",
    popular: false,
    icon: Crown,
    isFree: false,
    isContact: true,
  },
];

async function getEarlyBirdStatus(): Promise<EarlyBirdStatus> {
  try {
    const supabase = createAdminClient();
    const { data: config, error } = await supabase
      .from("snapvee_early_bird_config")
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !config) {
      return {
        isActive: true,
        totalQuota: EARLY_BIRD_CONFIG.totalQuota,
        soldCount: 0,
        remainingQuota: EARLY_BIRD_CONFIG.totalQuota,
      };
    }

    const remainingQuota = config.total_quota - config.sold_count;
    const isActive = config.is_active && remainingQuota > 0;

    return {
      isActive,
      totalQuota: config.total_quota,
      soldCount: config.sold_count,
      remainingQuota: Math.max(0, remainingQuota),
    };
  } catch {
    return {
      isActive: true,
      totalQuota: EARLY_BIRD_CONFIG.totalQuota,
      soldCount: 0,
      remainingQuota: EARLY_BIRD_CONFIG.totalQuota,
    };
  }
}

export default async function LandingPriceSection({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const earlyBirdStatus = await getEarlyBirdStatus();
  const pricingUrl = `/${currentLocale}/pricing`;

  return (
    <section
      id="pricing"
      className="relative bg-black py-20 sm:py-24 cv-auto"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mb-16 text-center animate-fade-in-up"
          style={{ "--delay": "0.05s" } as CSSProperties}
        >
          <div className="mb-6 flex justify-center">
            <span className="rounded-full border border-gray-800 bg-gray-900/50 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-sm">
              {getText("pricing.header.badge", currentLocale) || "Pricing"}
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {getText("pricing.header.title", currentLocale) ||
              "Simple, Transparent Pricing"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            {getText("pricing.header.subtitle", currentLocale) ||
              "Choose a plan that fits your needs. Monthly, yearly, and lifetime options available."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const isProPlan = plan.key === "pro";
            const isEarlyBirdPlan = plan.key === "early";

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 animate-fade-in-up ${
                  plan.popular
                    ? "border-purple-500/30 bg-gradient-to-b from-purple-900/10 to-transparent shadow-[0_0_40px_-10px_rgba(147,51,234,0.3)] pt-12"
                    : "border-gray-800 bg-black"
                }`}
                style={{ "--delay": `${0.1 + index * 0.08}s` } as CSSProperties}
              >
                {plan.popular && (
                  <div className="absolute left-4 top-4">
                    <span className="rounded bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300">
                      {getText("pricing.plan.popular", currentLocale) ||
                        "Popular"}
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Icon className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-semibold text-white whitespace-nowrap">
                      {getText(
                        `pricing.plan.${plan.level}.name`,
                        currentLocale,
                      ) || plan.name}
                    </h3>
                    {isEarlyBirdPlan && earlyBirdStatus.isActive && (
                      <span className="rounded bg-gradient-to-r from-orange-500 to-yellow-500 px-2 py-1 text-xs font-medium text-white flex items-center gap-1 whitespace-nowrap">
                        <Clock className="h-3 w-3" />
                        {getText("pricing.earlyBird.badge", currentLocale) ||
                          "Early Bird"}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    {isProPlan ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-white">
                            {plan.priceMonthly}
                          </span>
                          <span className="text-gray-400">
                            {getText("pricing.plan.perMonth", currentLocale) ||
                              "/ month"}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          {getText(
                            "pricing.plan.billing.yearly",
                            currentLocale,
                          ) || "Yearly"}{" "}
                          {plan.priceYearly}{" "}
                          {getText("pricing.plan.perYear", currentLocale) ||
                            "/ year"}
                        </p>
                      </>
                    ) : isEarlyBirdPlan &&
                      earlyBirdStatus.isActive &&
                      plan.earlyBirdPrice ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          {plan.earlyBirdPrice}
                        </span>
                        <span className="text-xl text-gray-500 line-through">
                          {plan.price}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-gray-400">{plan.period}</span>
                        )}
                      </div>
                    )}

                    {isEarlyBirdPlan && earlyBirdStatus.isActive && (
                      <div className="mt-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-yellow-500 font-medium">
                          {getText(
                            "pricing.earlyBird.remaining",
                            currentLocale,
                          )?.replace(
                            "{count}",
                            String(earlyBirdStatus.remainingQuota),
                          ) ||
                            `Only ${earlyBirdStatus.remainingQuota} spots left!`}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {getText(
                      `pricing.plan.${plan.level}.description`,
                      currentLocale,
                    ) || plan.description}
                  </p>
                </div>

                <div className="mb-8 flex-1">
                  <p className="mb-4 text-sm font-medium text-gray-300">
                    {getText("pricing.plan.features.title", currentLocale) ||
                      "What's Included:"}
                  </p>
                  <ul className="space-y-4">
                    {isEarlyBirdPlan &&
                      earlyBirdStatus.isActive &&
                      plan.earlyBirdFeatures && (
                        <>
                          {plan.earlyBirdFeatures.map((feature, i) => (
                            <li
                              key={`early-bird-${i}`}
                              className="flex items-start gap-3"
                            >
                              <Star className="h-5 w-5 shrink-0 text-amber-400" />
                              <span className="text-sm text-amber-300 font-medium">
                                {getText(
                                  `pricing.earlyBird.feature.${i}`,
                                  currentLocale,
                                ) || feature}
                              </span>
                            </li>
                          ))}
                          <li className="flex items-start gap-3">
                            <Star className="h-5 w-5 shrink-0 text-amber-400" />
                            <span className="text-sm text-amber-300 font-medium">
                              {getText(
                                "pricing.earlyBird.identity.title",
                                currentLocale,
                              ) || "Early Adopter Exclusive Badge"}{" "}
                              (#0001-#0500)
                            </span>
                          </li>
                        </>
                      )}

                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {(plan.featureStates?.[i] ?? true) ? (
                          <Check className="h-5 w-5 shrink-0 text-white" />
                        ) : (
                          <X className="h-5 w-5 shrink-0 text-gray-500" />
                        )}
                        <span
                          className={`text-sm ${
                            (plan.featureStates?.[i] ?? true)
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {getText(
                            `pricing.plan.${plan.level}.feature.${i}`,
                            currentLocale,
                          ) || feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  {plan.key === "free" ? (
                    <Link
                      href={`/${currentLocale}/download`}
                      className="inline-flex w-full items-center justify-center rounded-sm border border-gray-700 bg-transparent py-3 text-center text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-gray-800"
                    >
                      {getText(
                        `pricing.plan.${plan.level}.cta`,
                        currentLocale,
                      ) || plan.cta}
                    </Link>
                  ) : plan.key === "business" ? (
                    <a
                      href="mailto:hezhiqianye@gmail.com"
                      className="inline-flex w-full items-center justify-center rounded-sm border border-gray-700 bg-transparent py-3 text-center text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-gray-800"
                    >
                      {getText(
                        `pricing.plan.${plan.level}.cta`,
                        currentLocale,
                      ) || plan.cta}
                    </a>
                  ) : (
                    <>
                      <Link
                        href={`${pricingUrl}`}
                        className={`inline-flex w-full items-center justify-center rounded-sm py-3 text-center text-sm font-semibold transition-all hover:scale-105 ${
                          plan.popular
                            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-900/20"
                            : "border border-gray-700 bg-transparent text-white hover:bg-gray-800"
                        }`}
                      >
                        {getText("pricing.payment.card", currentLocale) ||
                          "Card / 银行卡"}
                      </Link>
                      <Link
                        href={`${pricingUrl}`}
                        className="inline-flex w-full items-center justify-center rounded-sm border border-blue-500/50 bg-blue-600 py-3 text-center text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-blue-700 hover:border-blue-400/60"
                      >
                        {getText("pricing.payment.alipay", currentLocale) ||
                          "Alipay / 支付宝"}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
