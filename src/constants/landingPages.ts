import intl from "react-intl-universal";

export interface LandingPageData {
  // SEO优化内容
  seo: {
    title: string;
    description: string;
    keywords: string[];
    h1: string;
    h2: string;
  };
  // 平台特色内容
  features: {
    title: string;
    subtitle: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  // 平台特定优势
  advantages: {
    title: string;
    subtitle: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  // 使用场景
  useCases: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

// 获取平台特定的 landing page 数据（支持多语言）
export function getLandingPageData(platformId: string): LandingPageData | null {
  // 使用国际化 key 动态获取内容
  const getText = (key: string, fallback: string = "") => {
    return intl.get(key) || fallback;
  };

  const platformKeys = {
    youtube: "youtube",
    tiktok: "tiktok",
    x: "x",
    xiaohongshu: "xiaohongshu",
    instagram: "instagram",
    facebook: "facebook",
    douyin: "douyin",
    bilibili: "bilibili",
    threads: "threads",
    kuaishou: "kuaishou",
    pornhub: "pornhub",
    nicovideo: "nicovideo",
    upscrolled: "upscrolled",
  };

  const key = platformKeys[platformId as keyof typeof platformKeys];
  if (!key) return null;

  return {
    seo: {
      title: getText(`landing.platform.${key}.seo.title`),
      description: getText(`landing.platform.${key}.seo.description`),
      keywords: [
        getText(`landing.platform.${key}.seo.keyword1`),
        getText(`landing.platform.${key}.seo.keyword2`),
        getText(`landing.platform.${key}.seo.keyword3`),
        getText(`landing.platform.${key}.seo.keyword4`),
        getText(`landing.platform.${key}.seo.keyword5`),
      ].filter(Boolean),
      h1: getText(`landing.platform.${key}.seo.h1`),
      h2: getText(`landing.platform.${key}.seo.h2`),
    },
    features: {
      title: getText(`landing.platform.${key}.features.title`),
      subtitle: getText(`landing.platform.${key}.features.subtitle`),
      items: [
        {
          icon: getText(`landing.platform.${key}.features.item1.icon`, "🎬"),
          title: getText(`landing.platform.${key}.features.item1.title`),
          description: getText(
            `landing.platform.${key}.features.item1.description`
          ),
        },
        {
          icon: getText(`landing.platform.${key}.features.item2.icon`, "🎵"),
          title: getText(`landing.platform.${key}.features.item2.title`),
          description: getText(
            `landing.platform.${key}.features.item2.description`
          ),
        },
        {
          icon: getText(`landing.platform.${key}.features.item3.icon`, "📱"),
          title: getText(`landing.platform.${key}.features.item3.title`),
          description: getText(
            `landing.platform.${key}.features.item3.description`
          ),
        },
        {
          icon: getText(`landing.platform.${key}.features.item4.icon`, "⚡"),
          title: getText(`landing.platform.${key}.features.item4.title`),
          description: getText(
            `landing.platform.${key}.features.item4.description`
          ),
        },
      ],
    },
    advantages: {
      title: getText(`landing.platform.${key}.advantages.title`),
      subtitle: getText(`landing.platform.${key}.advantages.subtitle`),
      items: [
        {
          icon: getText(`landing.platform.${key}.advantages.item1.icon`, "🔒"),
          title: getText(`landing.platform.${key}.advantages.item1.title`),
          description: getText(
            `landing.platform.${key}.advantages.item1.description`
          ),
        },
        {
          icon: getText(`landing.platform.${key}.advantages.item2.icon`, "💯"),
          title: getText(`landing.platform.${key}.advantages.item2.title`),
          description: getText(
            `landing.platform.${key}.advantages.item2.description`
          ),
        },
        {
          icon: getText(`landing.platform.${key}.advantages.item3.icon`, "🌍"),
          title: getText(`landing.platform.${key}.advantages.item3.title`),
          description: getText(
            `landing.platform.${key}.advantages.item3.description`
          ),
        },
        {
          icon: getText(`landing.platform.${key}.advantages.item4.icon`, "🔄"),
          title: getText(`landing.platform.${key}.advantages.item4.title`),
          description: getText(
            `landing.platform.${key}.advantages.item4.description`
          ),
        },
      ],
    },
    useCases: {
      title: getText(`landing.platform.${key}.useCases.title`),
      subtitle: getText(`landing.platform.${key}.useCases.subtitle`),
      items: [
        {
          title: getText(`landing.platform.${key}.useCases.item1.title`),
          description: getText(
            `landing.platform.${key}.useCases.item1.description`
          ),
        },
        {
          title: getText(`landing.platform.${key}.useCases.item2.title`),
          description: getText(
            `landing.platform.${key}.useCases.item2.description`
          ),
        },
        {
          title: getText(`landing.platform.${key}.useCases.item3.title`),
          description: getText(
            `landing.platform.${key}.useCases.item3.description`
          ),
        },
        {
          title: getText(`landing.platform.${key}.useCases.item4.title`),
          description: getText(
            `landing.platform.${key}.useCases.item4.description`
          ),
        },
      ],
    },
  };
}

// 保留旧的 LANDING_PAGES 作为 fallback（向后兼容）
export const LANDING_PAGES: Record<string, LandingPageData> = {
  // 这个对象现在主要用于类型定义，实际数据通过 getLandingPageData 获取
};
