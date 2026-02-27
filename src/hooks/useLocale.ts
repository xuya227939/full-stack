import { useState, useEffect } from "react";
import {
  intl,
  getCurrentLocale,
  setLocale,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/lib/i18n";
import { useRouter, usePathname } from "next/navigation";

export function useLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    // 尝试从 URL 中获取语言
    const pathSegments = pathname.split("/").filter(Boolean);

    if (
      pathSegments.length > 0 &&
      SUPPORTED_LOCALES[pathSegments[0] as Locale]
    ) {
      return pathSegments[0] as Locale;
    }

    // 回退到 localStorage 或默认语言
    return getCurrentLocale();
  });

  useEffect(() => {
    // 监听 URL 变化，更新语言
    const pathSegments = pathname.split("/").filter(Boolean);

    if (
      pathSegments.length > 0 &&
      SUPPORTED_LOCALES[pathSegments[0] as Locale]
    ) {
      setCurrentLocale(pathSegments[0] as Locale);
    }
  }, [pathname]);

  //   const changeLocale = (locale: Locale) => {
  //     setLocale(locale);
  //     setCurrentLocale(locale);
  //     // 刷新页面以应用新语言
  //     window.location.reload();
  //   };

  const changeLocale = (newLocale: Locale) => {
    // 如果已经是当前语言，不需要切换
    if (newLocale === currentLocale) {
      return;
    }

    // 先保存到 localStorage 和 cookie（不更新状态，避免闪烁）
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

      // 构建 new URL，替换 URL 中的语言部分
      const pathname = window.location.pathname;
      const pathSegments = pathname.split("/").filter(Boolean);

      // 如果 URL 有语言前缀，替换它
      if (
        pathSegments.length > 0 &&
        SUPPORTED_LOCALES[pathSegments[0] as Locale]
      ) {
        pathSegments[0] = newLocale;
      } else {
        // 如果 URL 没有语言前缀，添加它
        pathSegments.unshift(newLocale);
      }

      const newPathname = "/" + pathSegments.join("/");

      // 重定向到新的 URL
      window.location.href = newPathname;
    }
  };

  return {
    currentLocale,
    changeLocale,
    supportedLocales: SUPPORTED_LOCALES,
    t: intl.get.bind(intl),
  };
}
