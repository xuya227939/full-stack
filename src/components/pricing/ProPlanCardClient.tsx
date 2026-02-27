"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getText, type Locale } from "@/lib/i18n";
import { redirectToCheckout, redirectToAlipay } from "@/services/payment";

const features = [
  "1080p / 2K quality",
  "4K: 5 downloads per month",
  "Up to 1 hour per video",
  "Batch download (up to 3 at once)",
  "Audio & video separation",
  "Fast queue",
  "Remove YouTube ads",
  "Bilibili premium video extraction",
  "YouTube multi-language audio (Opus/AAC)",
];

export default function ProPlanCardClient({
  currentLocale,
  delay = "0.18s",
}: {
  currentLocale: Locale;
  delay?: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [proBilling, setProBilling] = useState<"monthly" | "yearly">("monthly");

  const displayPrice = proBilling === "monthly" ? "$5.99" : "$29.99";
  const displayPeriod =
    proBilling === "monthly"
      ? getText("pricing.plan.perMonth", currentLocale) || "/ month"
      : getText("pricing.plan.perYear", currentLocale) || "/ year";

  const handleSubscribe = async (paymentMethod: "card" | "alipay") => {
    if (!session?.user) {
      router.push(
        `/${currentLocale}/signin?callbackUrl=/${currentLocale}/pricing`,
      );
      return;
    }

    try {
      if (paymentMethod === "alipay") {
        toast.loading(
          getText("pricing.checkout.alipayLoading", currentLocale) ||
            "Redirecting to Alipay...",
        );
        await redirectToAlipay(2, proBilling);
        return;
      }

      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/${currentLocale}/pricing?success=true`;
      const cancelUrl = `${baseUrl}/${currentLocale}/pricing?canceled=true`;

      toast.loading(
        getText("pricing.checkout.loading", currentLocale) ||
          "Redirecting to checkout...",
      );

      await redirectToCheckout(2, successUrl, cancelUrl, false, proBilling);
    } catch (error: any) {
      toast.error(
        error.message ||
          getText("pricing.checkout.error", currentLocale) ||
          "Failed to start checkout",
      );
    }
  };

  return (
    <div
      className="relative flex flex-col rounded-2xl border border-gray-800 bg-black p-8 transition-all duration-300 animate-fade-in-up"
      style={{ "--delay": delay } as CSSProperties}
    >
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Zap className="h-6 w-6 text-white" />
          <h3 className="text-xl font-semibold text-white whitespace-nowrap">
            {getText("pricing.plan.1.name", currentLocale) || "Pro"}
          </h3>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">
              {displayPrice}
            </span>
            <span className="text-gray-400">{displayPeriod}</span>
          </div>

          <div className="mt-3 inline-flex items-center rounded-lg border border-gray-800 bg-black/40 p-1 text-xs">
            <button
              type="button"
              onClick={() => setProBilling("monthly")}
              className={`rounded-md px-3 py-1 transition-colors ${
                proBilling === "monthly"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {getText("pricing.plan.billing.monthly", currentLocale) ||
                "Monthly"}
            </button>
            <button
              type="button"
              onClick={() => setProBilling("yearly")}
              className={`rounded-md px-3 py-1 transition-colors ${
                proBilling === "yearly"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {getText("pricing.plan.billing.yearly", currentLocale) ||
                "Yearly"}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">
          {getText("pricing.plan.1.description", currentLocale) ||
            "Best for creators who need HD/4K and faster downloads."}
        </p>
      </div>

      <div className="mb-8 flex-1">
        <p className="mb-4 text-sm font-medium text-gray-300">
          {getText("pricing.plan.features.title", currentLocale) ||
            "What's Included:"}
        </p>
        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="h-5 w-5 shrink-0 text-white" />
              <span className="text-sm text-gray-400">
                {getText(
                  `pricing.plan.1.feature.${i}`,
                  currentLocale,
                ) || feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => handleSubscribe("card")}
          className="inline-flex w-full items-center justify-center rounded-sm border border-gray-700 bg-transparent py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-gray-800"
        >
          {getText("pricing.payment.card", currentLocale) || "Card / 银行卡"}
        </button>
        <button
          type="button"
          onClick={() => handleSubscribe("alipay")}
          className="inline-flex w-full items-center justify-center rounded-sm border border-blue-500/50 bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-blue-700 hover:border-blue-400/60"
        >
          {getText("pricing.payment.alipay", currentLocale) || "Alipay / 支付宝"}
        </button>
      </div>
    </div>
  );
}
