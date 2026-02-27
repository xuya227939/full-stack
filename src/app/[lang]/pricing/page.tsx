import { Metadata } from "next";
import { Index } from "./index";
import ServerMainLayout from "@/components/layouts/ServerMainLayout";
import { auth } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { EARLY_BIRD_CONFIG } from "@/lib/stripe";
import { LOCALE_CODES, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}

// SEO metadata for each language
const seoMetadata = {
  en: {
    title: "SnapVee Pricing - Free & Premium Plans",
    description:
      "Choose the perfect plan for video downloading. Free tier with premium options for unlimited downloads, batch processing, and priority support.",
    keywords:
      "pricing, video downloader, free download, premium, unlimited downloads",
    openGraph: {
      title: "SnapVee Pricing - Free & Premium Plans",
      description:
        "Choose the perfect plan for video downloading. Free tier with premium options for unlimited downloads, batch processing, and priority support.",
      type: "website" as const,
      url: "https://snapvee.com/en/pricing",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee Pricing Plans",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "SnapVee Pricing - Choose Your Plan",
      description:
        "Free and premium plans for video downloading. Unlimited downloads, batch processing, and more.",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/en/pricing",
      languages: {
        en: "https://snapvee.com/en/pricing",
        zh: "https://snapvee.com/zh/pricing",
        ja: "https://snapvee.com/ja/pricing",
        ko: "https://snapvee.com/ko/pricing",
        hi: "https://snapvee.com/hi/pricing",
        "x-default": "https://snapvee.com/en/pricing",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SnapVee Pricing Plans",
      description:
        "Pricing plans for SnapVee video downloader service with free and premium options.",
      url: "https://snapvee.com/en/pricing",
      mainEntity: {
        "@type": "Product",
        name: "SnapVee Video Downloader",
        offers: [
          {
            "@type": "Offer",
            name: "Free Plan",
            price: "0",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            name: "Premium Plan",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
            },
          },
        ],
      },
    },
  },
  zh: {
    title:
      "SnapVee 视频下载器定价方案 - 免费版、Pro、早鸟终身与企业/API（支持月付年付）",
    description:
      "选择最适合您视频下载需求的方案。提供免费版和高级版，支持无限下载、批量处理和优先支持。",
    keywords:
      "定价, 方案, 视频下载器价格, 订阅, 免费视频下载, 高级下载, 无限下载, 批量下载",
    openGraph: {
      title:
        "SnapVee 视频下载器定价方案 - 免费版、Pro、早鸟终身与企业/API（支持月付年付）",
      description:
        "选择最适合您视频下载需求的方案。提供免费版和高级版，支持无限下载、批量处理和优先支持。",
      type: "website" as const,
      url: "https://snapvee.com/zh/pricing",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee 定价方案",
        },
      ],
      locale: "zh_CN",
    },
    twitter: {
      card: "summary_large_image" as const,
      title:
        "SnapVee 视频下载器定价方案 - 免费版、Pro、早鸟终身与企业/API",
      description: "免费和高级版视频下载方案。无限下载、批量处理等。",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/zh/pricing",
      languages: {
        en: "https://snapvee.com/en/pricing",
        zh: "https://snapvee.com/zh/pricing",
        ja: "https://snapvee.com/ja/pricing",
        ko: "https://snapvee.com/ko/pricing",
        hi: "https://snapvee.com/hi/pricing",
        "x-default": "https://snapvee.com/en/pricing",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SnapVee 定价方案",
      description: "SnapVee 视频下载器服务的定价方案，包含免费和高级选项。",
      url: "https://snapvee.com/zh/pricing",
      mainEntity: {
        "@type": "Product",
        name: "SnapVee 视频下载器",
        offers: [
          {
            "@type": "Offer",
            name: "免费版",
            price: "0",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            name: "高级版",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
            },
          },
        ],
      },
    },
  },
  ja: {
    title: "料金プラン - SnapVee 動画ダウンローダー | 無料 & プレミアム",
    description:
      "動画ダウンロードのニーズに最適なプランをお選びください。無料プランに加え、無制限ダウンロード、一括処理、優先サポート付きのプレミアムオプションもご用意。",
    keywords:
      "料金, プラン, 動画ダウンローダー料金, サブスクリプション, 無料動画ダウンロード, プレミアムダウンロード, 無制限ダウンロード, 一括ダウンロード",
    openGraph: {
      title: "料金プラン - SnapVee 動画ダウンローダー | 無料 & プレミアム",
      description:
        "動画ダウンロードのニーズに最適なプランをお選びください。無料プランに加え、無制限ダウンロード、一括処理、優先サポート付きのプレミアムオプションもご用意。",
      type: "website" as const,
      url: "https://snapvee.com/ja/pricing",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee 料金プラン",
        },
      ],
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "SnapVee 料金 - プランを選択",
      description:
        "動画ダウンロードの無料プランとプレミアムプラン。無制限ダウンロード、一括処理など。",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/ja/pricing",
      languages: {
        en: "https://snapvee.com/en/pricing",
        zh: "https://snapvee.com/zh/pricing",
        ja: "https://snapvee.com/ja/pricing",
        ko: "https://snapvee.com/ko/pricing",
        hi: "https://snapvee.com/hi/pricing",
        "x-default": "https://snapvee.com/en/pricing",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SnapVee 料金プラン",
      description:
        "無料およびプレミアムオプション付きのSnapVee動画ダウンローダーサービスの料金プラン。",
      url: "https://snapvee.com/ja/pricing",
      mainEntity: {
        "@type": "Product",
        name: "SnapVee 動画ダウンローダー",
        offers: [
          {
            "@type": "Offer",
            name: "無料プラン",
            price: "0",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            name: "プレミアムプラン",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
            },
          },
        ],
      },
    },
  },
  ko: {
    title: "요금제 - SnapVee 동영상 다운로더 | 무료 & 프리미엄",
    description:
      "동영상 다운로드 요구에 맞는 완벽한 요금제를 선택하세요. 무제한 다운로드, 일괄 처리, 우선 지원이 포함된 무료 및 프리미엄 옵션 제공.",
    keywords:
      "요금제, 플랜, 동영상 다운로더 요금, 구독, 무료 동영상 다운로드, 프리미엄 다운로드, 무제한 다운로드, 일괄 다운로드",
    openGraph: {
      title: "요금제 - SnapVee 동영상 다운로더 | 무료 & 프리미엄",
      description:
        "동영상 다운로드 요구에 맞는 완벽한 요금제를 선택하세요. 무제한 다운로드, 일괄 처리, 우선 지원이 포함된 무료 및 프리미엄 옵션 제공.",
      type: "website" as const,
      url: "https://snapvee.com/ko/pricing",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee 요금제",
        },
      ],
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "SnapVee 요금 - 플랜 선택",
      description:
        "동영상 다운로드 무료 및 프리미엄 플랜. 무제한 다운로드, 일괄 처리 등.",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/ko/pricing",
      languages: {
        en: "https://snapvee.com/en/pricing",
        zh: "https://snapvee.com/zh/pricing",
        ja: "https://snapvee.com/ja/pricing",
        ko: "https://snapvee.com/ko/pricing",
        hi: "https://snapvee.com/hi/pricing",
        "x-default": "https://snapvee.com/en/pricing",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SnapVee 요금제",
      description:
        "무료 및 프리미엄 옵션이 포함된 SnapVee 동영상 다운로더 서비스 요금제.",
      url: "https://snapvee.com/ko/pricing",
      mainEntity: {
        "@type": "Product",
        name: "SnapVee 동영상 다운로더",
        offers: [
          {
            "@type": "Offer",
            name: "무료 플랜",
            price: "0",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            name: "프리미엄 플랜",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
            },
          },
        ],
      },
    },
  },
  hi: {
    title: "SnapVee मूल्य निर्धारण | मुफ्त और प्रीमियम",
    description:
      "वीडियो डाउनलोडिंग के लिए सही योजना चुनें। असीमित डाउनलोड, बैच प्रोसेसिंग और प्राथमिकता समर्थन के साथ मुफ्त और प्रीमियम विकल्प।",
    keywords:
      "मूल्य निर्धारण, वीडियो डाउनलोडर, मुफ्त डाउनलोड, प्रीमियम",
    openGraph: {
      title: "SnapVee मूल्य निर्धारण | मुफ्त और प्रीमियम",
      description:
        "वीडियो डाउनलोडिंग के लिए सही योजना चुनें। असीमित डाउनलोड, बैच प्रोसेसिंग और प्राथमिकता समर्थन के साथ मुफ्त और प्रीमियम विकल्प।",
      type: "website" as const,
      url: "https://snapvee.com/hi/pricing",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee मूल्य निर्धारण योजनाएं",
        },
      ],
      locale: "hi_IN",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "SnapVee मूल्य निर्धारण - अपनी योजना चुनें",
      description:
        "वीडियो डाउनलोडिंग के लिए मुफ्त और प्रीमियम योजनाएं। असीमित डाउनलोड, बैच प्रोसेसिंग और बहुत कुछ।",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/hi/pricing",
      languages: {
        en: "https://snapvee.com/en/pricing",
        zh: "https://snapvee.com/zh/pricing",
        ja: "https://snapvee.com/ja/pricing",
        ko: "https://snapvee.com/ko/pricing",
        hi: "https://snapvee.com/hi/pricing",
        "x-default": "https://snapvee.com/en/pricing",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SnapVee मूल्य निर्धारण योजनाएं",
      description:
        "मुफ्त और प्रीमियम विकल्पों के साथ SnapVee वीडियो डाउनलोडर सेवा की मूल्य निर्धारण योजनाएं।",
      url: "https://snapvee.com/hi/pricing",
      mainEntity: {
        "@type": "Product",
        name: "SnapVee वीडियो डाउनलोडर",
        offers: [
          {
            "@type": "Offer",
            name: "मुफ्त योजना",
            price: "0",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            name: "प्रीमियम योजना",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
            },
          },
        ],
      },
    },
  },
};

interface EarlyBirdStatus {
  isActive: boolean;
  totalQuota: number;
  soldCount: number;
  remainingQuota: number;
}

async function getEarlyBirdStatus(): Promise<EarlyBirdStatus> {
  try {
    const supabase = createAdminClient();
    const { data: config, error } = await supabase
      .from("snapvee_early_bird_config")
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !config) {
      return {
        isActive: true,
        totalQuota: EARLY_BIRD_CONFIG.totalQuota,
        soldCount: 0,
        remainingQuota: EARLY_BIRD_CONFIG.totalQuota,
      };
    }

    const remainingQuota = config.total_quota - config.sold_count;
    const isActive = config.is_active && remainingQuota > 0;

    return {
      isActive,
      totalQuota: config.total_quota,
      soldCount: config.sold_count,
      remainingQuota: Math.max(0, remainingQuota),
    };
  } catch {
    return {
      isActive: true,
      totalQuota: EARLY_BIRD_CONFIG.totalQuota,
      soldCount: 0,
      remainingQuota: EARLY_BIRD_CONFIG.totalQuota,
    };
  }
}

// 生成动态元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = (await params) as { lang: string };
  const lang = ["en", "zh", "ja", "ko", "hi"].includes(resolvedParams.lang)
    ? (resolvedParams.lang as keyof typeof seoMetadata)
    : "en";

  const meta = seoMetadata[lang];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: meta.openGraph,
    twitter: meta.twitter,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: meta.alternates,
    other: {
      "application/ld+json": JSON.stringify(meta.jsonLd),
    },
  };
}

export default async function PricingPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ plan?: string; success?: string; canceled?: string }>;
}) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const currentLocale = LOCALE_CODES.includes(lang as Locale)
    ? (lang as Locale)
    : "en";
  const session = await auth();
  const userLevel = session?.user?.userLevel ?? 0;
  const earlyBirdStatus = await getEarlyBirdStatus();
  return (
    <ServerMainLayout>
      <Index
        currentLocale={currentLocale}
        earlyBirdStatus={earlyBirdStatus}
        success={resolvedSearchParams.success === "true"}
        canceled={resolvedSearchParams.canceled === "true"}
        showReferral={!!session?.user && userLevel === 0}
      />
    </ServerMainLayout>
  );
}
