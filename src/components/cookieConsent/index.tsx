"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const { currentLocale } = useLocale();

  useEffect(() => {
    setMounted(true);

    const isEU =
      /^(AT|BE|BG|HR|CY|CZ|DK|EE|FI|FR|DE|GR|HU|IE|IT|LV|LT|LU|MT|NL|PL|PT|RO|SK|SI|ES|SE|CH|GB)$/i.test(
        navigator.language.split("-")[1] || ""
      );

    const consent = localStorage.getItem("cookie-consent");

    // 更新 consent 的函数（带重试机制）
    const updateConsent = (retries = 10) => {
      // @ts-ignore
      if (typeof gtag !== "undefined") {
        // @ts-ignore
        gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
        });
      } else if (retries > 0) {
        // gtag 还未加载，100ms 后重试
        setTimeout(() => updateConsent(retries - 1), 100);
      }
    };

    // 非欧盟用户：直接授权 consent
    if (!isEU) {
      updateConsent();
      return;
    }

    // 欧盟用户：如果之前已同意，恢复 consent 状态
    if (consent === "granted") {
      updateConsent();
      return;
    }

    // 欧盟用户：未做过选择，显示弹窗
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    // @ts-ignore
    gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
    });

    // @ts-ignore
    if (window.clarity) {
      // @ts-ignore
      window.clarity("consent", true);
    }

    localStorage.setItem("cookie-consent", "granted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!mounted || !show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t  p-4 shadow-2xl dark:bg-dark-900 dark:border-gray-800 md:px-8"
      suppressHydrationWarning
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Cookie className="size-6 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {currentLocale === "zh"
                ? "我们使用 Cookie 来改善您的体验"
                : "We use cookies to enhance your experience"}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {currentLocale === "zh"
                ? '点击"接受"即表示您同意我们使用 Cookie 和类似技术。'
                : 'Click "Accept" to consent to our use of cookies and similar technologies.'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={handleDecline}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            {currentLocale === "zh" ? "拒绝" : "Decline"}
          </Button>
          <Button
            variant="ghost"
            onClick={handleAccept}
            className="bg-gray-900 text-gray-600 hover:text-gray-900 dark:bg-white  dark:hover:text-white"
          >
            {currentLocale === "zh" ? "接受" : "Accept"}
          </Button>
        </div>
      </div>
    </div>
  );
}
