"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { getText, type Locale } from "@/lib/i18n";
import { useSession } from "next-auth/react";

export default function PricingClientEffects({
  currentLocale,
  success,
  canceled,
}: {
  currentLocale: Locale;
  success?: boolean;
  canceled?: boolean;
}) {
  const { update } = useSession();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (success && !hasShownToast.current) {
      hasShownToast.current = true;
      update();
      const t2 = setTimeout(() => update(), 2000);
      const t4 = setTimeout(() => update(), 4000);
      toast.success(
        getText("pricing.payment.success", currentLocale) ||
          "Payment successful! Your account has been upgraded.",
      );
      return () => {
        clearTimeout(t2);
        clearTimeout(t4);
      };
    }

    if (canceled && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.info(
        getText("pricing.payment.canceled", currentLocale) ||
          "Payment was canceled.",
      );
    }
  }, [success, canceled, currentLocale, update]);

  return null;
}
