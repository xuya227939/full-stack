import type { CSSProperties } from "react";
import Link from "next/link";
import { Check, Crown, Gift, Clock, Star, X } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import ProPlanCardClient from "@/components/pricing/ProPlanCardClient";
import EarlyPlanActions from "@/components/pricing/EarlyPlanActions";
import PricingClientEffects from "@/components/pricing/PricingClientEffects";

interface EarlyBirdStatus {
  isActive: boolean;
  totalQuota: number;
  soldCount: number;
  remainingQuota: number;
}

const pricingPlans = {
  free: {
    key: "free",
    level: 0,
    name: "Free",
    price: "$0",
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
  early: {
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
  business: {
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
} as const;

export function Index({
  currentLocale,
  earlyBirdStatus,
  success,
  canceled,
  showReferral,
}: {
  currentLocale: Locale;
  earlyBirdStatus: EarlyBirdStatus;
  success?: boolean;
  canceled?: boolean;
  showReferral?: boolean;
}) {
  return (
    <main className="min-h-screen transition-colors duration-300">
      <PricingClientEffects
        currentLocale={currentLocale}
        success={success}
        canceled={canceled}
      />

      {/* Pricing Section */}
      <section id="pricing" className="relative bg-black py-20 sm:py-24">
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
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {getText("pricing.header.title", currentLocale) ||
                "Simple, Transparent Pricing"}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              {getText("pricing.header.subtitle", currentLocale) ||
                "Choose a plan that fits your needs. Monthly, yearly, and lifetime options available."}
            </p>
          </div>

          <h2 className="mb-6 text-lg font-semibold text-white text-left">
            {currentLocale === "zh" ? "定价方案" : "Pricing Plans"}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {/* Free */}
            {(() => {
              const plan = pricingPlans.free;
              const Icon = plan.icon;
              return (
                <div
                  className="relative flex flex-col rounded-2xl border border-gray-800 bg-black p-8 transition-all duration-300 animate-fade-in-up"
                  style={{ "--delay": "0.1s" } as CSSProperties}
                >
                  <div className="mb-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <Icon className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-semibold text-white whitespace-nowrap">
                        {getText(
                          `pricing.plan.${plan.level}.name`,
                          currentLocale,
                        ) || plan.name}
                      </h3>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          {plan.price}
                        </span>
                      </div>
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
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          {(plan.featureStates?.[i] ?? true) ? (
                            <Check className="h-5 w-5 shrink-0 text-white" />
                          ) : (
                            <X className="h-5 w-5 shrink-0 text-gray-500" />
                          )}
                          <span className="text-sm text-gray-400">
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
                    <Link
                      href={`/${currentLocale}/download`}
                      className="inline-flex w-full items-center justify-center rounded-sm border border-gray-700 bg-transparent py-3 text-center text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-gray-800"
                    >
                      {getText(
                        `pricing.plan.${plan.level}.cta`,
                        currentLocale,
                      ) || plan.cta}
                    </Link>
                  </div>
                </div>
              );
            })()}

            {/* Pro (client card for billing toggle + checkout) */}
            <ProPlanCardClient currentLocale={currentLocale} delay="0.18s" />

            {/* Early Bird */}
            {(() => {
              const plan = pricingPlans.early;
              const Icon = plan.icon;
              const showEarlyBird = earlyBirdStatus?.isActive;
              return (
                <div
                  className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 animate-fade-in-up ${
                    plan.popular
                      ? "border-purple-500/30 bg-gradient-to-b from-purple-900/10 to-transparent shadow-[0_0_40px_-10px_rgba(147,51,234,0.3)] pt-12"
                      : "border-gray-800 bg-black"
                  }`}
                  style={{ "--delay": "0.26s" } as CSSProperties}
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
                      {showEarlyBird && (
                        <span className="rounded bg-gradient-to-r from-orange-500 to-yellow-500 px-2 py-1 text-xs font-medium text-white flex items-center gap-1 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {getText("pricing.earlyBird.badge", currentLocale) ||
                            "Early Bird"}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      {showEarlyBird && plan.earlyBirdPrice ? (
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
                        </div>
                      )}

                      {showEarlyBird && (
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
                      {showEarlyBird &&
                        plan.earlyBirdFeatures?.map((feature, i) => (
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
                      {showEarlyBird && (
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
                      )}

                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 shrink-0 text-white" />
                          <span className="text-sm text-gray-400">
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
                    <EarlyPlanActions
                      currentLocale={currentLocale}
                      useEarlyBird={showEarlyBird}
                      popular={plan.popular}
                    />
                  </div>
                </div>
              );
            })()}

            {/* Business */}
            {(() => {
              const plan = pricingPlans.business;
              const Icon = plan.icon;
              return (
                <div
                  className="relative flex flex-col rounded-2xl border border-gray-800 bg-black p-8 transition-all duration-300 animate-fade-in-up"
                  style={{ "--delay": "0.34s" } as CSSProperties}
                >
                  <div className="mb-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <Icon className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-semibold text-white whitespace-nowrap">
                        {getText(
                          `pricing.plan.${plan.level}.name`,
                          currentLocale,
                        ) || plan.name}
                      </h3>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          {getText(
                            `pricing.plan.${plan.level}.cta`,
                            currentLocale,
                          ) || plan.price}
                        </span>
                      </div>
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
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 shrink-0 text-white" />
                          <span className="text-sm text-gray-400">
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
                    <a
                      href="mailto:hezhiqianye@gmail.com"
                      className="inline-flex w-full items-center justify-center rounded-sm border border-gray-700 bg-transparent py-3 text-center text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-gray-800"
                    >
                      {getText(
                        `pricing.plan.${plan.level}.cta`,
                        currentLocale,
                      ) || plan.cta}
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/10 p-6 shadow-lg backdrop-blur-sm sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-white sm:mb-6 sm:text-2xl">
              {getText("pricing.faq.title", currentLocale) ||
                "Frequently Asked Questions"}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  {getText("pricing.faq.q1", currentLocale) ||
                    "How does the free plan work?"}
                </h3>
                <p className="text-gray-300">
                  {getText("pricing.faq.a1", currentLocale) ||
                    "Free plan is limited to 720p, up to 20 minutes, and 1 download per day. Upgrade to unlock HD/4K, audio extraction, and batch downloads."}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  {getText("pricing.faq.q2", currentLocale) ||
                    "What is the Early Bird plan?"}
                </h3>
                <p className="text-gray-300">
                  {getText("pricing.faq.a2", currentLocale) ||
                    "Early Bird is a limited lifetime offer for the first 500 supporters. You get all Pro features, 4K unlimited, up to 2-hour videos, plus an exclusive badge and permanent price lock."}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  {getText("pricing.faq.q3", currentLocale) ||
                    "Are there file size or duration limits?"}
                </h3>
                <p className="text-gray-300">
                  {getText("pricing.faq.a3", currentLocale) ||
                    "Free: up to 20 minutes. Pro: up to 1 hour (4K 5/month). Early Bird: up to 2 hours and 4K unlimited. Limits can vary by platform."}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  {getText("pricing.faq.q4", currentLocale) ||
                    "Which platforms are supported?"}
                </h3>
                <p className="text-gray-300">
                  {getText("pricing.faq.a4", currentLocale) ||
                    "We support 50+ platforms including YouTube, TikTok, Instagram, Twitter/X, Facebook, Bilibili, Douyin, Xiaohongshu, and more. If a platform is not supported, please join our Telegram group to provide feedback and request support."}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  {getText("pricing.faq.q5", currentLocale) ||
                    "Is there a refund policy?"}
                </h3>
                <p className="text-gray-300">
                  {getText("pricing.faq.a5", currentLocale) ||
                    "Due to the nature of digital products, we generally do not offer refunds once the service has been used. If you experience technical issues that prevent usage, please contact support within 7 days of purchase."}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  {getText("pricing.faq.q6", currentLocale) ||
                    "Can I upgrade to a higher plan later?"}
                </h3>
                <p className="text-gray-300">
                  {getText("pricing.faq.a6", currentLocale) ||
                    "Yes. You can upgrade from Free to Pro or Early Bird at any time. Business/API is available on request."}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  {getText("pricing.faq.q7", currentLocale) ||
                    "What payment methods do you accept?"}
                </h3>
                <p className="text-gray-300">
                  {getText("pricing.faq.a7", currentLocale) ||
                    "We accept cards via Stripe. Alipay is available for the Early Bird lifetime plan only."}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  {getText("pricing.faq.q8", currentLocale) ||
                    "How long does my subscription last?"}
                </h3>
                <p className="text-gray-300">
                  {getText("pricing.faq.a8", currentLocale) ||
                    "Pro is a monthly or yearly subscription. Early Bird is a one-time lifetime plan."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
