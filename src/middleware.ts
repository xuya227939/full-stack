import { NextRequest, NextResponse } from "next/server";

// 支持的语言（与 i18n 保持一致）
import { LOCALE_CODES } from "@/lib/i18n";
const supportedLanguages = LOCALE_CODES;
type SupportedLanguage = (typeof supportedLanguages)[number];

// 默认语言
const defaultLanguage: SupportedLanguage = "en";

// 检测是否为搜索引擎或广告爬虫
function isSearchEngineOrAdsBot(userAgent: string): boolean {
  const botPatterns = [
    /googlebot/i,
    /bingbot/i,
    /yandex/i,
    /baiduspider/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegrambot/i,
    /slackbot/i,
    /discordbot/i,
    /google-ads/i,
    /google-adwords/i,
    /facebook-ads/i,
    /bing-ads/i,
    /yandex-ads/i,
    /semrushbot/i,
    /ahrefsbot/i,
    /mozbot/i,
    /dotbot/i,
    /rogerbot/i,
    /mj12bot/i,
    /ia_archiver/i,
    /archive.org_bot/i,
    /wget/i,
    /curl/i,
    /python-requests/i,
    /scraper/i,
    /crawler/i,
    /spider/i,
  ];

  return botPatterns.some((pattern) => pattern.test(userAgent));
}

// 获取用户语言偏好
function getLanguageFromRequest(request: NextRequest): SupportedLanguage {
  const userAgent = request.headers.get("user-agent") || "";

  // 如果是搜索引擎或广告爬虫，返回英文（国际化优先）
  if (isSearchEngineOrAdsBot(userAgent)) {
    return "en";
  }

  // 1. 从 Cookie 获取用户语言偏好
  const userLanguage = request.cookies.get("locale")?.value;
  if (
    userLanguage &&
    supportedLanguages.includes(userLanguage as SupportedLanguage)
  ) {
    return userLanguage as SupportedLanguage;
  }

  // 2. 从 Accept-Language 头部获取语言
  const acceptLanguage = request.headers.get("accept-language") || "";
  if (acceptLanguage) {
    const first = acceptLanguage.split(",")[0].trim().toLowerCase();
    // zh-TW / zh-Hant 优先匹配繁体中文
    if (first.startsWith("zh-tw") || first.startsWith("zh-hant")) {
      return "zh-TW";
    }
    const firstLanguage = first.split("-")[0];
    if (supportedLanguages.includes(firstLanguage as SupportedLanguage)) {
      return firstLanguage as SupportedLanguage;
    }
  }

  // 3. 默认返回英文（国际化优先）
  return defaultLanguage;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 排除不需要处理的路径
  const excludePaths = [
    "/api",
    "/_next",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.json",
    "/ads.txt",
    "/llms.txt",
  ];

  const shouldExclude = excludePaths.some((path) => pathname.startsWith(path));
  if (shouldExclude) {
    return NextResponse.next();
  }

  // 检查路径是否已经有语言前缀
  const hasLanguagePrefix = supportedLanguages.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );

  // 如果路径没有语言前缀，重写 URL 添加默认语言前缀
  if (!hasLanguagePrefix) {
    const locale = getLanguageFromRequest(request);
    const newPathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // 统一使用 rewrite，URL 不变但内容正确
    // 这样 Google 验证 https://snapvee.com 时能看到实际内容
    // 而不是看到 301 重定向（重定向前的页面是空的）
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    const response = NextResponse.rewrite(url);
    response.headers.set("x-locale", locale);
    return response;
  }

  // 如果路径已经有语言前缀，提取语言并设置 header
  const locale =
    supportedLanguages.find(
      (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
    ) || defaultLanguage;

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|ads.txt|llms.txt).*)",
  ],
};
