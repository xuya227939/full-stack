import PrivacyClient from "./index";
import { Metadata } from "next";
import LandingLayout from "@/components/layouts/LandingLayout";
import { LOCALE_CODES, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}

// 生成动态元数据
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata | undefined> {
  // 使用类型断言（如果确定类型）
  const resolvedParams = (await params) as { lang: string };
  const resolvedSearchParams = (await searchParams) as { lang?: string };

  let targetLang = resolvedParams.lang;

  // 如果 searchParams 中有语言参数，使用它
  if (
    resolvedSearchParams.lang &&
    ["en", "zh", "ja", "ko", "hi"].includes(resolvedSearchParams.lang)
  ) {
    targetLang = resolvedSearchParams.lang;
  }

  const isTargetLang =
    targetLang === "en"
      ? "en"
      : targetLang === "ja"
        ? "ja"
        : targetLang === "ko"
          ? "ko"
          : targetLang === "hi"
            ? "hi"
            : "zh";
  if (isTargetLang === "en") {
    return {
      title: "Privacy Policy - SnapVee Data Protection & Privacy Information",
      description:
        "SnapVee privacy policy and data protection information. Learn how we collect, use, and protect your personal information. GDPR compliant privacy practices.",
      keywords:
        "privacy policy, data protection, GDPR compliance, personal information, data privacy, SnapVee privacy, user privacy, data security",
      openGraph: {
        title: "Privacy Policy - SnapVee Data Protection & Privacy Information",
        description:
          "SnapVee privacy policy and data protection information. Learn how we collect, use, and protect your personal information. GDPR compliant privacy practices.",
        type: "website",
        url: "https://snapvee.com/en/privacy",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee Privacy Policy",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee Privacy Policy",
        description:
          "Learn about SnapVee's data protection practices and how we safeguard your privacy. GDPR compliant privacy policy.",
        images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
        site: "@snapvee",
      },
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
      alternates: {
        canonical: "https://snapvee.com/en/privacy",
        languages: {
          en: "https://snapvee.com/en/privacy",
          zh: "https://snapvee.com/zh/privacy",
          ja: "https://snapvee.com/ja/privacy",
          ko: "https://snapvee.com/ko/privacy",
          hi: "https://snapvee.com/hi/privacy",
          "x-default": "https://snapvee.com/en/privacy",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SnapVee Privacy Policy",
          description:
            "Privacy policy and data protection information for SnapVee services",
          url: "https://snapvee.com/privacy",
          mainEntity: {
            "@type": "Article",
            name: "Privacy Policy",
            description:
              "Comprehensive privacy policy covering data collection, usage, and protection practices",
            author: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
            },
            publisher: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
              logo: {
                "@type": "ImageObject",
                url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
              },
            },
            datePublished: "2024-01-01",
            dateModified: "2024-01-01",
            articleSection: "Legal",
            keywords:
              "privacy policy, data protection, GDPR, personal information",
            about: [
              {
                "@type": "Thing",
                name: "Data Protection",
                description: "Information about how we protect user data",
              },
              {
                "@type": "Thing",
                name: "Privacy Rights",
                description: "User rights regarding personal information",
              },
              {
                "@type": "Thing",
                name: "Cookie Policy",
                description: "Information about cookie usage",
              },
            ],
          },
        }),
      },
    };
  }

  if (isTargetLang === "zh") {
    return {
      title:
        "隐私政策与数据保护声明 - SnapVee 用户信息收集、使用与保护说明",
      description:
        "SnapVee 隐私政策和数据保护信息。了解我们如何收集、使用和保护您的个人信息。符合 GDPR 的隐私实践。",
      keywords:
        "隐私政策, 数据保护, GDPR合规, 个人信息, 数据隐私, SnapVee隐私, 用户隐私, 数据安全",
      openGraph: {
        title:
          "隐私政策与数据保护声明 - SnapVee 用户信息收集、使用与保护说明",
        description:
          "SnapVee 隐私政策和数据保护信息。了解我们如何收集、使用和保护您的个人信息。符合 GDPR 的隐私实践。",
        type: "website",
        url: "https://snapvee.com/zh/privacy",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee 隐私政策",
          },
        ],
        locale: "zh",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee 隐私政策与数据保护声明",
        description:
          "了解 SnapVee 的数据保护实践以及我们如何保护您的隐私。符合 GDPR 的隐私政策。",
        images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
        site: "@snapvee",
      },
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
      alternates: {
        canonical: "https://snapvee.com/zh/privacy",
        languages: {
          en: "https://snapvee.com/en/privacy",
          zh: "https://snapvee.com/zh/privacy",
          ja: "https://snapvee.com/ja/privacy",
          ko: "https://snapvee.com/ko/privacy",
          hi: "https://snapvee.com/hi/privacy",
          "x-default": "https://snapvee.com/zh/privacy",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SnapVee 隐私政策",
          description: "SnapVee 服务的隐私政策和数据保护信息",
          url: "https://snapvee.com/privacy",
          mainEntity: {
            "@type": "Article",
            name: "隐私政策",
            description: "全面的隐私政策，涵盖数据收集、使用和保护实践",
            author: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
            },
            publisher: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
              logo: {
                "@type": "ImageObject",
                url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
              },
            },
            datePublished: "2024-01-01",
            dateModified: "2024-01-01",
            articleSection: "法律",
            keywords: "隐私政策, 数据保护, GDPR, 个人信息",
            about: [
              {
                "@type": "Thing",
                name: "数据保护",
                description: "关于我们如何保护用户数据的信息",
              },
              {
                "@type": "Thing",
                name: "隐私权利",
                description: "用户关于个人信息的权利",
              },
              {
                "@type": "Thing",
                name: "Cookie政策",
                description: "关于Cookie使用的信息",
              },
            ],
          },
        }),
      },
    };
  }

  if (isTargetLang === "ja") {
    return {
      title: "プライバシーポリシー - SnapVee データ保護およびプライバシー情報",
      description:
        "SnapVeeのプライバシーポリシーおよびデータ保護情報をご確認ください。お客様の個人情報をどのように収集、利用、保護しているかをご説明します。GDPR準拠のプライバシー対応。",
      keywords:
        "プライバシーポリシー, データ保護, GDPR準拠, 個人情報, データプライバシー, SnapVee プライバシー, ユーザープライバシー, データセキュリティ",
      openGraph: {
        title:
          "プライバシーポリシー - SnapVee データ保護およびプライバシー情報",
        description:
          "SnapVeeのプライバシーポリシーおよびデータ保護情報をご確認ください。お客様の個人情報をどのように収集、利用、保護しているかをご説明します。GDPR準拠のプライバシー対応。",
        type: "website",
        url: "https://snapvee.com/ja/privacy",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee プライバシーポリシー",
          },
        ],
        locale: "ja_JP",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee プライバシーポリシー",
        description:
          "SnapVeeのデータ保護方針とプライバシー保護の取り組みをご確認ください。GDPR準拠のプライバシーポリシー。",
        images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
        site: "@snapvee",
      },
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
      alternates: {
        canonical: "https://snapvee.com/ja/privacy",
        languages: {
          en: "https://snapvee.com/en/privacy",
          ja: "https://snapvee.com/ja/privacy",
          ko: "https://snapvee.com/ko/privacy",
          hi: "https://snapvee.com/hi/privacy",
          zh: "https://snapvee.com/zh/privacy",
          "x-default": "https://snapvee.com/ja/privacy",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SnapVee プライバシーポリシー",
          description:
            "SnapVeeサービスのプライバシーポリシーおよびデータ保護情報",
          url: "https://snapvee.com/ja/privacy",
          mainEntity: {
            "@type": "Article",
            name: "プライバシーポリシー",
            description:
              "データの収集、利用、保護に関する包括的なプライバシーポリシー",
            author: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
            },
            publisher: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
              logo: {
                "@type": "ImageObject",
                url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
              },
            },
            datePublished: "2024-01-01",
            dateModified: "2024-01-01",
            articleSection: "法的情報",
            keywords: "プライバシーポリシー, データ保護, GDPR, 個人情報",
            about: [
              {
                "@type": "Thing",
                name: "データ保護",
                description: "ユーザーのデータを保護する方法に関する情報",
              },
              {
                "@type": "Thing",
                name: "プライバシー権利",
                description: "個人情報に関するユーザーの権利",
              },
              {
                "@type": "Thing",
                name: "Cookie ポリシー",
                description: "Cookieの使用に関する情報",
              },
            ],
          },
        }),
      },
    };
  }

  if (isTargetLang === "ko") {
    return {
      title: "개인정보 보호정책 - SnapVee 데이터 보호 및 개인정보 안내",
      description:
        "SnapVee의 개인정보 보호정책 및 데이터 보호 정보를 확인하세요. 귀하의 개인정보를 어떻게 수집, 사용 및 보호하는지 알아보세요. GDPR 준수 개인정보 처리 방침.",
      keywords:
        "개인정보 보호정책, 데이터 보호, GDPR 준수, 개인 정보, 데이터 프라이버시, SnapVee 개인정보, 사용자 프라이버시, 데이터 보안",
      openGraph: {
        title: "개인정보 보호정책 - SnapVee 데이터 보호 및 개인정보 안내",
        description:
          "SnapVee의 개인정보 보호정책 및 데이터 보호 정보를 확인하세요. 귀하의 개인정보를 어떻게 수집, 사용 및 보호하는지 알아보세요. GDPR 준수 개인정보 처리 방침.",
        type: "website",
        url: "https://snapvee.com/ko/privacy",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee 개인정보 보호정책",
          },
        ],
        locale: "ko_KR",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee 개인정보 보호정책",
        description:
          "SnapVee의 데이터 보호 방침과 개인정보 보호 방법을 확인하세요. GDPR 준수 개인정보 정책.",
        images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
        site: "@snapvee",
      },
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
      alternates: {
        canonical: "https://snapvee.com/ko/privacy",
        languages: {
          en: "https://snapvee.com/en/privacy",
          ko: "https://snapvee.com/ko/privacy",
          ja: "https://snapvee.com/ja/privacy",
          hi: "https://snapvee.com/hi/privacy",
          zh: "https://snapvee.com/zh/privacy",
          "x-default": "https://snapvee.com/ko/privacy",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SnapVee 개인정보 보호정책",
          description: "SnapVee 서비스의 개인정보 보호정책 및 데이터 보호 정보",
          url: "https://snapvee.com/ko/privacy",
          mainEntity: {
            "@type": "Article",
            name: "개인정보 보호정책",
            description:
              "데이터 수집, 사용 및 보호 방침에 대한 포괄적인 개인정보 보호정책",
            author: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
            },
            publisher: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
              logo: {
                "@type": "ImageObject",
                url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
              },
            },
            datePublished: "2024-01-01",
            dateModified: "2024-01-01",
            articleSection: "법적 정보",
            keywords: "개인정보 보호정책, 데이터 보호, GDPR, 개인 정보",
            about: [
              {
                "@type": "Thing",
                name: "데이터 보호",
                description: "사용자 데이터 보호 방법에 대한 정보",
              },
              {
                "@type": "Thing",
                name: "개인정보 권리",
                description: "개인정보 관련 사용자 권리 안내",
              },
              {
                "@type": "Thing",
                name: "쿠키 정책",
                description: "쿠키 사용에 대한 정보",
              },
            ],
          },
        }),
      },
    };
  }

  if (isTargetLang === "hi") {
    return {
      title: "गोपनीयता नीति - SnapVee डेटा सुरक्षा और गोपनीयता जानकारी",
      description:
        "SnapVee की गोपनीयता नीति और डेटा सुरक्षा जानकारी। जानें कि हम आपके व्यक्तिगत जानकारी को कैसे एकत्र करते, उपयोग करते और सुरक्षित रखते हैं। GDPR के अनुरूप गोपनीयता प्रथाएं।",
      keywords:
        "गोपनीयता नीति, डेटा सुरक्षा, GDPR अनुपालन, व्यक्तिगत जानकारी, डेटा गोपनीयता, SnapVee गोपनीयता, उपयोगकर्ता गोपनीयता, डेटा सुरक्षा",
      openGraph: {
        title: "गोपनीयता नीति - SnapVee डेटा सुरक्षा और गोपनीयता जानकारी",
        description:
          "SnapVee की गोपनीयता नीति और डेटा सुरक्षा जानकारी। जानें कि हम आपके व्यक्तिगत जानकारी को कैसे एकत्र करते, उपयोग करते और सुरक्षित रखते हैं। GDPR के अनुरूप गोपनीयता प्रथाएं।",
        type: "website",
        url: "https://snapvee.com/hi/privacy",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee गोपनीयता नीति",
          },
        ],
        locale: "hi_IN",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee गोपनीयता नीति",
        description:
          "SnapVee के डेटा सुरक्षा अभ्यासों और आपकी गोपनीयता की सुरक्षा के तरीके के बारे में जानें। GDPR अनुरूप गोपनीयता नीति।",
        images: ["https://oss.api-service.net.cn/snapvee/images/logo.png"],
        site: "@snapvee",
      },
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
      alternates: {
        canonical: "https://snapvee.com/hi/privacy",
        languages: {
          en: "https://snapvee.com/en/privacy",
          hi: "https://snapvee.com/hi/privacy",
          ja: "https://snapvee.com/ja/privacy",
          ko: "https://snapvee.com/ko/privacy",
          zh: "https://snapvee.com/zh/privacy",
          "x-default": "https://snapvee.com/hi/privacy",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SnapVee गोपनीयता नीति",
          description:
            "SnapVee सेवाओं के लिए गोपनीयता नीति और डेटा सुरक्षा जानकारी",
          url: "https://snapvee.com/hi/privacy",
          mainEntity: {
            "@type": "Article",
            name: "गोपनीयता नीति",
            description:
              "डेटा संग्रह, उपयोग और सुरक्षा अभ्यासों को कवर करने वाली व्यापक गोपनीयता नीति",
            author: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
            },
            publisher: {
              "@type": "Organization",
              name: "SnapVee",
              url: "https://snapvee.com",
              logo: {
                "@type": "ImageObject",
                url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
              },
            },
            datePublished: "2024-01-01",
            dateModified: "2024-01-01",
            articleSection: "कानूनी",
            keywords: "गोपनीयता नीति, डेटा सुरक्षा, GDPR, व्यक्तिगत जानकारी",
            about: [
              {
                "@type": "Thing",
                name: "डेटा सुरक्षा",
                description: "हम उपयोगकर्ता डेटा की सुरक्षा कैसे करते हैं",
              },
              {
                "@type": "Thing",
                name: "गोपनीयता अधिकार",
                description: "व्यक्तिगत जानकारी के संबंध में उपयोगकर्ता अधिकार",
              },
              {
                "@type": "Thing",
                name: "कुकी नीति",
                description: "कुकी उपयोग के बारे में जानकारी",
              },
            ],
          },
        }),
      },
    };
  }
}

export default async function Privacy({
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
      <PrivacyClient currentLocale={currentLocale} />
    </LandingLayout>
  );
}
