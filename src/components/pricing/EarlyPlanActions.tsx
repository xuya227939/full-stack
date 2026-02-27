"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getText, type Locale } from "@/lib/i18n";
import { redirectToCheckout, redirectToAlipay } from "@/services/payment";

export default function EarlyPlanActions({
  currentLocale,
  useEarlyBird,
  popular,
}: {
  currentLocale: Locale;
  useEarlyBird: boolean;
  popular?: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();

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
        await redirectToAlipay(1);
        return;
      }

      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/${currentLocale}/pricing?success=true`;
      const cancelUrl = `${baseUrl}/${currentLocale}/pricing?canceled=true`;

      toast.loading(
        getText("pricing.checkout.loading", currentLocale) ||
          "Redirecting to checkout...",
      );

      await redirectToCheckout(1, successUrl, cancelUrl, useEarlyBird);
    } catch (error: any) {
      toast.error(
        error.message ||
          getText("pricing.checkout.error", currentLocale) ||
          "Failed to start checkout",
      );
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => handleSubscribe("card")}
        className={`inline-flex w-full items-center justify-center rounded-sm py-3 text-sm font-semibold transition-all hover:scale-105 ${
          popular
            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-900/20"
            : "border border-gray-700 bg-transparent text-white hover:bg-gray-800"
        }`}
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
    </>
  );
}
