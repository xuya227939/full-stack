import LandingLayout from "@/components/layouts/LandingLayout";
import SignInClient from "./SignInClient";
import type { Metadata } from "next";
import { siteConfig } from "@/app/metadata";
import { LOCALE_CODES, type Locale } from "@/lib/i18n";

const signinSeo = {
  en: {
    title: "Sign In to SnapVee - Secure Access to Your Downloader Account",
    description:
      "Log in or create a SnapVee account to manage downloads, subscriptions, and orders. Secure sign-in with email or Google.",
    keywords:
      "SnapVee login, sign in, create account, video downloader account, secure login",
  },
  zh: {
    title: "登录或注册 SnapVee 账号 - 安全访问下载、会员与订单服务",
    description:
      "登录或注册 SnapVee 账号，管理下载记录、会员权益与订单信息。支持邮箱与 Google 安全登录。",
    keywords:
      "SnapVee 登录, 注册账号, 视频下载器登录, 会员登录, 安全登录",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const currentLocale = LOCALE_CODES.includes(lang as Locale)
    ? (lang as Locale)
    : "en";
  const seo = currentLocale === "zh" ? signinSeo.zh : signinSeo.en;
  const canonicalUrl = `${siteConfig.url}/${currentLocale}/signin`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteConfig.url}/en/signin`,
        zh: `${siteConfig.url}/zh/signin`,
        ja: `${siteConfig.url}/ja/signin`,
        ko: `${siteConfig.url}/ko/signin`,
        hi: `${siteConfig.url}/hi/signin`,
        "zh-TW": `${siteConfig.url}/zh-TW/signin`,
        es: `${siteConfig.url}/es/signin`,
        pt: `${siteConfig.url}/pt/signin`,
        ru: `${siteConfig.url}/ru/signin`,
        fr: `${siteConfig.url}/fr/signin`,
        de: `${siteConfig.url}/de/signin`,
        it: `${siteConfig.url}/it/signin`,
        "x-default": `${siteConfig.url}/en/signin`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: canonicalUrl,
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/twitter.png",
          width: 1200,
          height: 630,
          alt: "SnapVee Sign In",
        },
      ],
      locale: currentLocale === "zh" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["https://oss.api-service.net.cn/snapvee/images/twitter.png"],
      site: "@snapvee",
    },
  };
}

export default async function SignInPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLocale = LOCALE_CODES.includes(lang as Locale)
    ? (lang as Locale)
    : "en";

  return (
    <LandingLayout currentLocale={currentLocale}>
      <SignInClient />
    </LandingLayout>
  );
}
