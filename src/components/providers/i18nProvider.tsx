"use client";

import { useEffect } from "react";
import {
  initI18n,
  getCurrentLocale,
  setLocale,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/lib/i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 确保只在客户端执行
    if (typeof window === "undefined") return;

    try {
      // 优先从 URL 路径解析语言（如 /zh/faq -> zh），与 localStorage 保持一致
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      const urlLang =
        pathSegments.length > 0 && SUPPORTED_LOCALES[pathSegments[0] as Locale]
          ? (pathSegments[0] as Locale)
          : null;

      const locale = urlLang ?? getCurrentLocale();
      initI18n(locale);

      // URL 有语言时同步到 localStorage 和 cookie，确保切换页面时语言一致
      if (urlLang) {
        localStorage.setItem("locale", urlLang);
        document.cookie = `locale=${urlLang}; path=/; max-age=31536000`;
      } else {
        const savedLocale = localStorage.getItem("locale");
        if (savedLocale) {
          document.cookie = `locale=${savedLocale}; path=/; max-age=31536000`;
        }
      }

      // 监听语言变化
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "locale" && e.newValue) {
          setLocale(e.newValue as any);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => window.removeEventListener("storage", handleStorageChange);
    } catch (error) {
      console.error("Failed to initialize i18n:", error);
    }
  }, []);

  // 直接返回 children，避免条件渲染导致的 hydration 错误
  // 国际化初始化是同步的，不需要等待状态
  return <>{children}</>;
}
