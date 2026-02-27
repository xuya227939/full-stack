import intl from "react-intl-universal";
import en from "./language/en.json";
import zh from "./language/zh.json";
import ja from "./language/ja.json";
import ko from "./language/ko.json";
import hi from "./language/hi.json";
import zhTW from "./language/zh-TW.json";
import es from "./language/es.json";
import pt from "./language/pt.json";
import ru from "./language/ru.json";
import fr from "./language/fr.json";
import de from "./language/de.json";
import it from "./language/it.json";

// 支持的语言列表
export const SUPPORTED_LOCALES = {
  zh: "中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  hi: "हिंदी",
  "zh-TW": "繁體中文",
  es: "Español",
  pt: "Português",
  ru: "Русский",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
} as const;

export type Locale = keyof typeof SUPPORTED_LOCALES;

// 统一 locale 列表，供 middleware、sitemap、各页面使用
export const LOCALE_CODES: readonly Locale[] = [
  "zh",
  "en",
  "ja",
  "ko",
  "hi",
  "zh-TW",
  "es",
  "pt",
  "ru",
  "fr",
  "de",
  "it",
] as const;

// 语言资源文件
export const locales = {
  zh,
  en,
  ja,
  ko,
  hi,
  "zh-TW": zhTW,
  es,
  pt,
  ru,
  fr,
  de,
  it,
};

// 默认语言（按优先级检测）
const DEFAULT_LOCALE: Locale = (() => {
  if (typeof window === "undefined") return "en";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("zh-tw") || lang.startsWith("zh-hant")) return "zh-TW";
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("ko")) return "ko";
  if (lang.startsWith("hi")) return "hi";
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("pt")) return "pt";
  if (lang.startsWith("ru")) return "ru";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("it")) return "it";
  return "en";
})();

// 初始化状态
let isInitialized = false;

// 初始化国际化
export function initI18n(locale: Locale = DEFAULT_LOCALE) {
  if (isInitialized) {
    // 如果已经初始化，只更新语言

    intl.init({
      currentLocale: locale,
      locales,
      fallbackLocale: DEFAULT_LOCALE,
    });
    return;
  }

  intl.init({
    currentLocale: locale,
    locales,
    fallbackLocale: DEFAULT_LOCALE,
  });
  isInitialized = true;
}

// 获取当前语言
export function getCurrentLocale(): Locale {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("locale") as Locale;
    return saved && SUPPORTED_LOCALES[saved] ? saved : DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
}

// 设置语言
export function setLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    localStorage.setItem("locale", locale);
    initI18n(locale);
  }
}

// 安全的获取翻译文本
export function getText(
  key: string,
  localeOrConfig?: Locale | any,
  fallback?: string,
): string {
  // 检查第二个参数是否是 locale（如果是字符串且是支持的 locale）
  const locale =
    typeof localeOrConfig === "string" &&
    SUPPORTED_LOCALES[localeOrConfig as Locale]
      ? (localeOrConfig as Locale)
      : getCurrentLocale();

  const config =
    typeof localeOrConfig === "object" ? localeOrConfig : undefined;

  // 直接从 locales 对象中获取对应语言的内容
  if (locales[locale] && (locales[locale] as any)[key]) {
    return (locales[locale] as any)[key];
  }

  // 回退到默认语言
  if (locales[DEFAULT_LOCALE] && (locales[DEFAULT_LOCALE] as any)[key]) {
    return (locales[DEFAULT_LOCALE] as any)[key];
  }

  return fallback || key;
}

// 导出 intl 实例
export { intl };
