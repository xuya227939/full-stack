import { Faq } from "./index";
import { Metadata } from "next";

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
      title:
        "Frequently Asked Questions - SnapVee Video Downloader Help & Support",
      description:
        "Find answers to common questions about SnapVee video downloader. Comprehensive FAQ covering usage, troubleshooting, and support information.",
      keywords:
        "FAQ, frequently asked questions, SnapVee help, video downloader support, troubleshooting, user guide, common questions",
      openGraph: {
        title:
          "Frequently Asked Questions - SnapVee Video Downloader Help & Support",
        description:
          "Find answers to common questions about SnapVee video downloader. Comprehensive FAQ covering usage, troubleshooting, and support information.",
        type: "website",
        url: "https://snapvee.com/en/faq",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee FAQ",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee FAQ - Help & Support",
        description:
          "Get answers to common questions about SnapVee video downloader. Comprehensive help and support information.",
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
        canonical: "https://snapvee.com/en/faq",
        languages: {
          en: "https://snapvee.com/en/faq",
          zh: "https://snapvee.com/zh/faq",
          "x-default": "https://snapvee.com/en/faq",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name: "SnapVee FAQ",
          description:
            "Frequently asked questions about SnapVee video downloader",
          url: "https://snapvee.com/faq",
          mainEntity: [
            {
              "@type": "Question",
              name: "How to download videos from TikTok?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Simply paste the TikTok video URL into our downloader and click download. No registration required.",
              },
            },
            {
              "@type": "Question",
              name: "Is SnapVee free to use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, SnapVee is completely free to use. No hidden fees or registration required.",
              },
            },
            {
              "@type": "Question",
              name: "Which platforms does SnapVee support?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "SnapVee supports TikTok, Instagram, YouTube, Facebook, Twitter, Bilibili, Douyin, and many more platforms.",
              },
            },
            {
              "@type": "Question",
              name: "Does SnapVee download videos with watermarks?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No, SnapVee downloads videos without watermarks whenever possible, providing clean video files.",
              },
            },
            {
              "@type": "Question",
              name: "Is it safe to use SnapVee?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, SnapVee is completely safe. We don't store your videos or personal information, and all downloads are processed securely.",
              },
            },
          ],
        }),
      },
    };
  }

  if (isTargetLang === "zh") {
    return {
      title: "常见问题 - SnapVee 视频下载器帮助与支持",
      description:
        "查找关于 SnapVee 视频下载器的常见问题答案。全面的FAQ涵盖使用方法、故障排除和支持信息。",
      keywords:
        "FAQ, 常见问题, SnapVee帮助, 视频下载器支持, 故障排除, 用户指南, 常见问题",
      openGraph: {
        title: "常见问题 - SnapVee 视频下载器帮助与支持",
        description:
          "查找关于 SnapVee 视频下载器的常见问题答案。全面的FAQ涵盖使用方法、故障排除和支持信息。",
        type: "website",
        url: "https://snapvee.com/zh/faq",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee 常见问题",
          },
        ],
        locale: "zh",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee 常见问题 - 帮助与支持",
        description:
          "获取关于 SnapVee 视频下载器的常见问题答案。全面的帮助和支持信息。",
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
        canonical: "https://snapvee.com/zh/faq",
        languages: {
          en: "https://snapvee.com/en/faq",
          zh: "https://snapvee.com/zh/faq",
          "x-default": "https://snapvee.com/en/faq",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name: "SnapVee 常见问题",
          description: "关于 SnapVee 视频下载器的常见问题",
          url: "https://snapvee.com/faq",
          mainEntity: [
            {
              "@type": "Question",
              name: "如何从抖音下载视频？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "只需将抖音视频链接粘贴到我们的下载器中，然后点击下载即可。无需注册。",
              },
            },
            {
              "@type": "Question",
              name: "SnapVee 是免费的吗？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "是的，SnapVee 完全免费使用。没有隐藏费用，也无需注册。",
              },
            },
            {
              "@type": "Question",
              name: "SnapVee 支持哪些平台？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "SnapVee 支持抖音、Instagram、YouTube、Facebook、Twitter、B站等众多平台。",
              },
            },
            {
              "@type": "Question",
              name: "SnapVee 下载的视频有水印吗？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "不会，SnapVee 尽可能下载无水印视频，提供干净的视频文件。",
              },
            },
            {
              "@type": "Question",
              name: "使用 SnapVee 安全吗？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "是的，SnapVee 完全安全。我们不存储您的视频或个人信息，所有下载都经过安全处理。",
              },
            },
          ],
        }),
      },
    };
  }

  if (isTargetLang === "ja") {
    return {
      title: "よくある質問 - SnapVee ビデオダウンローダーのヘルプとサポート",
      description:
        "SnapVeeビデオダウンローダーに関する一般的な質問への回答をこちらで見つけてください。使用方法、トラブルシューティング、サポート情報を含む包括的なFAQ。",
      keywords:
        "FAQ, よくある質問, SnapVeeヘルプ, ビデオダウンローダーサポート, トラブルシューティング, ユーザーガイド, 一般的な質問",
      openGraph: {
        title: "よくある質問 - SnapVee ビデオダウンローダーのヘルプとサポート",
        description:
          "SnapVeeビデオダウンローダーに関する一般的な質問への回答をこちらで見つけてください。使用方法、トラブルシューティング、サポート情報を含む包括的なFAQ。",
        type: "website",
        url: "https://snapvee.com/ja/faq",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee FAQ",
          },
        ],
        locale: "ja_JP",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee FAQ - ヘルプとサポート",
        description:
          "SnapVeeビデオダウンローダーに関する一般的な質問への回答を確認してください。包括的なヘルプとサポート情報。",
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
        canonical: "https://snapvee.com/ja/faq",
        languages: {
          en: "https://snapvee.com/en/faq",
          ja: "https://snapvee.com/ja/faq",
          ko: "https://snapvee.com/ko/faq",
          hi: "https://snapvee.com/hi/faq",
          zh: "https://snapvee.com/zh/faq",
          "x-default": "https://snapvee.com/ja/faq",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name: "SnapVee よくある質問",
          description: "SnapVeeビデオダウンローダーについてのよくある質問",
          url: "https://snapvee.com/ja/faq",
          mainEntity: [
            {
              "@type": "Question",
              name: "TikTokからビデオをどのようにダウンロードしますか？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ダウンローダーにTikTokビデオURLを貼り付け、ダウンロードボタンをクリックするだけです。登録は必要ありません。",
              },
            },
            {
              "@type": "Question",
              name: "SnapVeeは無料ですか？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "はい、SnapVeeは完全に無料です。隠れた料金や登録は必要ありません。",
              },
            },
            {
              "@type": "Question",
              name: "SnapVeeはどのプラットフォームをサポートしていますか？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "SnapVeeはTikTok、Instagram、YouTube、Facebook、Twitter、Bilibili、Douyinなど多くのプラットフォームをサポートしています。",
              },
            },
            {
              "@type": "Question",
              name: "SnapVeeはウォーターマーク付きのビデオをダウンロードしますか？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "いいえ、可能であればウォーターマークなしのクリーンなビデオファイルをダウンロードします。",
              },
            },
            {
              "@type": "Question",
              name: "SnapVeeを使用することは安全ですか？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "はい、SnapVeeは完全に安全です。私たちはあなたのビデオや個人情報を保存せず、すべてのダウンロードは安全に処理されます。",
              },
            },
          ],
        }),
      },
    };
  }

  if (isTargetLang === "ko") {
    return {
      title: "자주 묻는 질문 - SnapVee 비디오 다운로더 도움말 및 지원",
      description:
        "SnapVee 비디오 다운로더에 대한 일반적인 질문에 대한 답변을 찾아보세요. 사용법, 문제해결 및 지원 정보를 포함한 포괄적인 FAQ입니다.",
      keywords:
        "FAQ, 자주 묻는 질문, SnapVee 도움말, 비디오 다운로더 지원, 문제해결, 사용자 가이드, 일반적인 질문",
      openGraph: {
        title: "자주 묻는 질문 - SnapVee 비디오 다운로더 도움말 및 지원",
        description:
          "SnapVee 비디오 다운로더에 대한 일반적인 질문에 대한 답변을 찾아보세요. 사용법, 문제해결 및 지원 정보를 포함한 포괄적인 FAQ입니다.",
        type: "website",
        url: "https://snapvee.com/ko/faq",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee 자주 묻는 질문",
          },
        ],
        locale: "ko_KR",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee FAQ - 도움말 및 지원",
        description:
          "SnapVee 비디오 다운로더에 대한 일반적인 질문에 대한 답변을 확인하세요. 포괄적인 도움말 및 지원 정보.",
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
        canonical: "https://snapvee.com/ko/faq",
        languages: {
          en: "https://snapvee.com/en/faq",
          ko: "https://snapvee.com/ko/faq",
          hi: "https://snapvee.com/hi/faq",
          zh: "https://snapvee.com/zh/faq",
          ja: "https://snapvee.com/ja/faq",
          "x-default": "https://snapvee.com/ko/faq",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name: "SnapVee 자주 묻는 질문",
          description: "SnapVee 비디오 다운로더에 대한 자주 묻는 질문",
          url: "https://snapvee.com/ko/faq",
          mainEntity: [
            {
              "@type": "Question",
              name: "틱톡에서 비디오를 어떻게 다운로드하나요?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "다운로더에 틱톡 비디오 URL을 붙여넣고 다운로드 버튼을 클릭하기만 하면 됩니다. 등록이 필요하지 않습니다.",
              },
            },
            {
              "@type": "Question",
              name: "SnapVee는 무료로 사용할 수 있나요?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "네, SnapVee는 완전히 무료로 사용할 수 있습니다. 숨겨진 비용이나 등록이 필요하지 않습니다.",
              },
            },
            {
              "@type": "Question",
              name: "SnapVee는 어떤 플랫폼을 지원하나요?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "SnapVee는 틱톡, 인스타그램, 유튜브, 페이스북, 트위터, 빌리비, 더우인 등 여러 플랫폼을 지원합니다.",
              },
            },
            {
              "@type": "Question",
              name: "SnapVee는 워터마크가 있는 비디오를 다운로드하나요?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "아니요, 가능하면 워터마크 없는 깨끗한 비디오 파일을 다운로드합니다.",
              },
            },
            {
              "@type": "Question",
              name: "SnapVee를 사용하는 것이 안전한가요?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "네, SnapVee는 완전히 안전합니다. 우리는 비디오나 개인 정보를 저장하지 않으며 모든 다운로드는 안전하게 처리됩니다.",
              },
            },
          ],
        }),
      },
    };
  }

  if (isTargetLang === "hi") {
    return {
      title:
        "सामान्यतः पूछे जाने वाले प्रश्न - SnapVee वीडियो डाउनलोडर मदद और समर्थन",
      description:
        "SnapVee वीडियो डाउनलोडर के बारे में सामान्य प्रश्नों के उत्तर ढूंढें। उपयोग, समस्या समाधान और समर्थन सूचनाओं को कवर करने वाला व्यापक FAQ।",
      keywords:
        "FAQ, सामान्यतः पूछे जाने वाले प्रश्न, SnapVee मदद, वीडियो डाउनलोडर समर्थन, समस्या समाधान, उपयोगकर्ता मार्गदर्शक, सामान्य प्रश्न",
      openGraph: {
        title:
          "सामान्यतः पूछे जाने वाले प्रश्न - SnapVee वीडियो डाउनलोडर मदद और समर्थन",
        description:
          "SnapVee वीडियो डाउनलोडर के बारे में सामान्य प्रश्नों के उत्तर ढूंढें। उपयोग, समस्या समाधान और समर्थन सूचनाओं को कवर करने वाला व्यापक FAQ।",
        type: "website",
        url: "https://snapvee.com/hi/faq",
        siteName: "SnapVee",
        images: [
          {
            url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
            width: 1200,
            height: 630,
            alt: "SnapVee सामान्यतः पूछे जाने वाले प्रश्न",
          },
        ],
        locale: "hi_IN",
      },
      twitter: {
        card: "summary_large_image",
        title: "SnapVee FAQ - मदद और समर्थन",
        description:
          "SnapVee वीडियो डाउनलोडर के बारे में सामान्य प्रश्नों के उत्तर देखें। व्यापक मदद और समर्थन सूचना।",
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
        canonical: "https://snapvee.com/hi/faq",
        languages: {
          en: "https://snapvee.com/en/faq",
          hi: "https://snapvee.com/hi/faq",
          ja: "https://snapvee.com/ja/faq",
          ko: "https://snapvee.com/ko/faq",
          zh: "https://snapvee.com/zh/faq",
          "x-default": "https://snapvee.com/hi/faq",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name: "SnapVee सामान्यतः पूछे जाने वाले प्रश्न",
          description:
            "SnapVee वीडियो डाउनलोडर के बारे में सामान्यतः पूछे जाने वाले प्रश्न",
          url: "https://snapvee.com/hi/faq",
          mainEntity: [
            {
              "@type": "Question",
              name: "टिकटॉक से वीडियो कैसे डाउनलोड करें?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "बस टिकटॉक वीडियो URL को हमारे डाउनलोडर में पेस्ट करें और डाउनलोड का बटन दबाएँ। कोई पंजीकरण आवश्यक नहीं है।",
              },
            },
            {
              "@type": "Question",
              name: "SnapVee का उपयोग मुफ्त है?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "हाँ, SnapVee का पूरी तरह से मुफ्त उपयोग किया जा सकता है। कोई छिपी हुई फीस या पंजीकरण आवश्यक नहीं है।",
              },
            },
          ],
        }),
      },
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = LOCALE_CODES.includes(lang as Locale)
    ? (lang as Locale)
    : "en";
  return (
    <main className=" transition-colors duration-300">
      <Faq lang={validLang} />
    </main>
  );
}
