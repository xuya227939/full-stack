import ServiceClient from "./index";
import { Metadata } from "next";
import LandingLayout from "@/components/layouts/LandingLayout";
import { LOCALE_CODES, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}

// SEO metadata for each language
const seoMetadata = {
  en: {
    title: "SnapVee Services - Enterprise Video Download Solutions",
    description:
      "Professional video download solutions. Enterprise services, API integration, custom development, and technical support.",
    keywords:
      "video download API, enterprise video download, custom video downloader, video download service, API integration, enterprise solution, technical support",
    openGraph: {
      title: "SnapVee Services - Enterprise Video Download Solutions",
      description:
        "Professional video download solutions. Enterprise services, API integration, custom development, and technical support.",
      type: "website" as const,
      url: "https://snapvee.com/en/service",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee Professional Services",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "SnapVee Professional Services",
      description:
        "Professional video download solutions including enterprise services, API integration, and custom development.",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/en/service",
      languages: {
        en: "https://snapvee.com/en/service",
        zh: "https://snapvee.com/zh/service",
        ja: "https://snapvee.com/ja/service",
        ko: "https://snapvee.com/ko/service",
        hi: "https://snapvee.com/hi/service",
        "x-default": "https://snapvee.com/en/service",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "SnapVee Professional Services",
      description:
        "Professional video download solutions including enterprise services, API integration, and custom development.",
      provider: {
        "@type": "Organization",
        name: "SnapVee",
        url: "https://snapvee.com",
      },
      serviceType: "Video Download Solutions",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SnapVee Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Video Download API",
              description: "Scalable API for enterprise video download needs",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Development",
              description:
                "Custom video download solutions for specific requirements",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Technical Support",
              description: "Professional technical support and consultation",
            },
          },
        ],
      },
    },
  },
  zh: {
    title: "SnapVee 服务 - 专业视频下载解决方案 | 企业服务与API",
    description:
      "SnapVee 专业视频下载解决方案。企业服务、API集成、定制开发、技术支持。可靠且可扩展的解决方案。",
    keywords:
      "视频下载API, 企业视频下载, 定制视频下载器, 视频下载服务, API集成, 企业解决方案, 技术支持",
    openGraph: {
      title: "SnapVee 服务 - 专业视频下载解决方案 | 企业服务与API",
      description:
        "SnapVee 专业视频下载解决方案。企业服务、API集成、定制开发、技术支持。可靠且可扩展的解决方案。",
      type: "website" as const,
      url: "https://snapvee.com/zh/service",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee 专业服务",
        },
      ],
      locale: "zh_CN",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "SnapVee 专业服务",
      description: "专业视频下载解决方案，包括企业服务、API集成和定制开发。",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/zh/service",
      languages: {
        en: "https://snapvee.com/en/service",
        zh: "https://snapvee.com/zh/service",
        ja: "https://snapvee.com/ja/service",
        ko: "https://snapvee.com/ko/service",
        hi: "https://snapvee.com/hi/service",
        "x-default": "https://snapvee.com/en/service",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "SnapVee 专业服务",
      description: "专业视频下载解决方案，包括企业服务、API集成和定制开发。",
      provider: {
        "@type": "Organization",
        name: "SnapVee",
        url: "https://snapvee.com",
      },
      serviceType: "视频下载解决方案",
      areaServed: "全球",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SnapVee 服务",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "企业视频下载API",
              description: "可扩展的企业视频下载需求API",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "定制开发",
              description: "针对特定需求的定制视频下载解决方案",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "技术支持",
              description: "专业技术支持和咨询",
            },
          },
        ],
      },
    },
  },
  ja: {
    title:
      "SnapVee サービス - プロフェッショナル動画ダウンロードソリューション | エンタープライズ & API",
    description:
      "SnapVeeによるプロフェッショナルな動画ダウンロードソリューション。エンタープライズサービス、API統合、カスタム開発、技術サポート。信頼性と拡張性の高いソリューション。",
    keywords:
      "動画ダウンロードAPI, エンタープライズ動画ダウンロード, カスタム動画ダウンローダー, 動画ダウンロードサービス, API統合, エンタープライズソリューション, 技術サポート",
    openGraph: {
      title:
        "SnapVee サービス - プロフェッショナル動画ダウンロードソリューション | エンタープライズ & API",
      description:
        "SnapVeeによるプロフェッショナルな動画ダウンロードソリューション。エンタープライズサービス、API統合、カスタム開発、技術サポート。信頼性と拡張性の高いソリューション。",
      type: "website" as const,
      url: "https://snapvee.com/ja/service",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee プロフェッショナルサービス",
        },
      ],
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "SnapVee プロフェッショナルサービス",
      description:
        "エンタープライズサービス、API統合、カスタム開発を含むプロフェッショナル動画ダウンロードソリューション。",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/ja/service",
      languages: {
        en: "https://snapvee.com/en/service",
        zh: "https://snapvee.com/zh/service",
        ja: "https://snapvee.com/ja/service",
        ko: "https://snapvee.com/ko/service",
        hi: "https://snapvee.com/hi/service",
        "x-default": "https://snapvee.com/en/service",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "SnapVee プロフェッショナルサービス",
      description:
        "エンタープライズサービス、API統合、カスタム開発を含むプロフェッショナル動画ダウンロードソリューション。",
      provider: {
        "@type": "Organization",
        name: "SnapVee",
        url: "https://snapvee.com",
      },
      serviceType: "動画ダウンロードソリューション",
      areaServed: "全世界",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SnapVee サービス",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "エンタープライズ動画ダウンロードAPI",
              description:
                "企業の動画ダウンロードニーズに対応したスケーラブルなAPI",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "カスタム開発",
              description: "特定の要件に合わせたカスタム動画ダウンロードソリューション",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "技術サポート",
              description: "プロフェッショナルな技術サポートとコンサルテーション",
            },
          },
        ],
      },
    },
  },
  ko: {
    title:
      "SnapVee 서비스 - 전문 동영상 다운로드 솔루션 | 엔터프라이즈 & API",
    description:
      "SnapVee의 전문 동영상 다운로드 솔루션. 엔터프라이즈 서비스, API 통합, 맞춤형 개발, 기술 지원. 신뢰성 높고 확장 가능한 솔루션.",
    keywords:
      "동영상 다운로드 API, 엔터프라이즈 동영상 다운로드, 맞춤형 동영상 다운로더, 동영상 다운로드 서비스, API 통합, 엔터프라이즈 솔루션, 기술 지원",
    openGraph: {
      title:
        "SnapVee 서비스 - 전문 동영상 다운로드 솔루션 | 엔터프라이즈 & API",
      description:
        "SnapVee의 전문 동영상 다운로드 솔루션. 엔터프라이즈 서비스, API 통합, 맞춤형 개발, 기술 지원. 신뢰성 높고 확장 가능한 솔루션.",
      type: "website" as const,
      url: "https://snapvee.com/ko/service",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee 전문 서비스",
        },
      ],
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "SnapVee 전문 서비스",
      description:
        "엔터프라이즈 서비스, API 통합, 맞춤형 개발을 포함한 전문 동영상 다운로드 솔루션.",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/ko/service",
      languages: {
        en: "https://snapvee.com/en/service",
        zh: "https://snapvee.com/zh/service",
        ja: "https://snapvee.com/ja/service",
        ko: "https://snapvee.com/ko/service",
        hi: "https://snapvee.com/hi/service",
        "x-default": "https://snapvee.com/en/service",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "SnapVee 전문 서비스",
      description:
        "엔터프라이즈 서비스, API 통합, 맞춤형 개발을 포함한 전문 동영상 다운로드 솔루션.",
      provider: {
        "@type": "Organization",
        name: "SnapVee",
        url: "https://snapvee.com",
      },
      serviceType: "동영상 다운로드 솔루션",
      areaServed: "전 세계",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SnapVee 서비스",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "엔터프라이즈 동영상 다운로드 API",
              description: "기업 동영상 다운로드 요구를 위한 확장 가능한 API",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "맞춤형 개발",
              description: "특정 요구 사항에 맞는 맞춤형 동영상 다운로드 솔루션",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "기술 지원",
              description: "전문 기술 지원 및 컨설팅",
            },
          },
        ],
      },
    },
  },
  hi: {
    title:
      "SnapVee सेवाएं - पेशेवर वीडियो डाउनलोड समाधान | एंटरप्राइज और API",
    description:
      "SnapVee द्वारा पेशेवर वीडियो डाउनलोड समाधान। एंटरप्राइज सेवाएं, API एकीकरण, कस्टम विकास और तकनीकी सहायता। विश्वसनीय और स्केलेबल समाधान।",
    keywords:
      "वीडियो डाउनलोड API, एंटरप्राइज वीडियो डाउनलोड, कस्टम वीडियो डाउनलोडर, वीडियो डाउनलोड सेवा, API एकीकरण, एंटरप्राइज समाधान, तकनीकी सहायता",
    openGraph: {
      title:
        "SnapVee सेवाएं - पेशेवर वीडियो डाउनलोड समाधान | एंटरप्राइज और API",
      description:
        "SnapVee द्वारा पेशेवर वीडियो डाउनलोड समाधान। एंटरप्राइज सेवाएं, API एकीकरण, कस्टम विकास और तकनीकी सहायता। विश्वसनीय और स्केलेबल समाधान।",
      type: "website" as const,
      url: "https://snapvee.com/hi/service",
      siteName: "SnapVee",
      images: [
        {
          url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
          width: 1200,
          height: 630,
          alt: "SnapVee पेशेवर सेवाएं",
        },
      ],
      locale: "hi_IN",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "SnapVee पेशेवर सेवाएं",
      description:
        "एंटरप्राइज सेवाएं, API एकीकरण और कस्टम विकास सहित पेशेवर वीडियो डाउनलोड समाधान।",
      images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
      site: "@snapvee",
    },
    alternates: {
      canonical: "https://snapvee.com/hi/service",
      languages: {
        en: "https://snapvee.com/en/service",
        zh: "https://snapvee.com/zh/service",
        ja: "https://snapvee.com/ja/service",
        ko: "https://snapvee.com/ko/service",
        hi: "https://snapvee.com/hi/service",
        "x-default": "https://snapvee.com/en/service",
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "SnapVee पेशेवर सेवाएं",
      description:
        "एंटरप्राइज सेवाएं, API एकीकरण और कस्टम विकास सहित पेशेवर वीडियो डाउनलोड समाधान।",
      provider: {
        "@type": "Organization",
        name: "SnapVee",
        url: "https://snapvee.com",
      },
      serviceType: "वीडियो डाउनलोड समाधान",
      areaServed: "विश्वव्यापी",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SnapVee सेवाएं",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "एंटरप्राइज वीडियो डाउनलोड API",
              description:
                "एंटरप्राइज वीडियो डाउनलोड जरूरतों के लिए स्केलेबल API",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "कस्टम विकास",
              description: "विशिष्ट आवश्यकताओं के लिए कस्टम वीडियो डाउनलोड समाधान",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "तकनीकी सहायता",
              description: "पेशेवर तकनीकी सहायता और परामर्श",
            },
          },
        ],
      },
    },
  },
};

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

export default async function Service({
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
      <ServiceClient currentLocale={currentLocale} />
    </LandingLayout>
  );
}
