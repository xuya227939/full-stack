"use client";

import { useLocale } from "@/hooks/useLocale";
import { getText } from "@/lib/i18n";
import { createContext, useContext, ReactNode } from "react";

interface PlatformDataContextType {
  features: any;
  hero: any;
}

const PlatformDataContext = createContext<PlatformDataContextType | null>(null);

export function usePlatformData() {
  const context = useContext(PlatformDataContext);
  if (!context) {
    throw new Error("usePlatformData must be used within PlatformDataProvider");
  }
  return context;
}

export function PlatformDataProvider({
  platform,
  children,
}: {
  platform: string;
  children: ReactNode;
}) {
  const { currentLocale } = useLocale();

  // Map platform slugs to base platform keys for features/functionality
  const platformKeys: Record<string, string> = {
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
    twitter: "x",
    pinterest: "pinterest",
    vimeo: "vimeo",
    "youtube-shorts": "youtube-shorts",
    rednote: "xiaohongshu",
    // Longtail keyword pages - map to base platform for features
    "youtube-shorts-download-hd": "youtube-shorts",
    "youtube-video-downloader-4k": "youtube",
    "youtube-video-download-online-free": "youtube",
    "youtube-video-download-to-gallery": "youtube",
    "instagram-video-downloader-4k-no-watermark": "instagram",
    "tiktok-video-downloader-hd-no-watermark": "tiktok",
    "threads-video-downloader": "threads",
    "threads-video-save": "threads",
  };

  // Check if this is a longtail page
  const isLongtailPage = platform.includes("-download") || platform.includes("-downloader");
  
  // Get the base platform key for features
  const key = platformKeys[platform] || platform;
  
  // For longtail pages, use the longtail slug for hero, otherwise use base key
  const heroKey = isLongtailPage ? platform : key;

  const featuresData = {
    title: getText(`landing.platform.${key}.features.title`, currentLocale),
    subtitle: getText(
      `landing.platform.${key}.features.subtitle`,
      currentLocale,
    ),
    items: [
      {
        icon:
          getText(
            `landing.platform.${key}.features.item1.icon`,
            currentLocale,
          ) || "🎬",
        title: getText(
          `landing.platform.${key}.features.item1.title`,
          currentLocale,
        ),
        description: getText(
          `landing.platform.${key}.features.item1.description`,
          currentLocale,
        ),
      },
      {
        icon:
          getText(
            `landing.platform.${key}.features.item2.icon`,
            currentLocale,
          ) || "🎵",
        title: getText(
          `landing.platform.${key}.features.item2.title`,
          currentLocale,
        ),
        description: getText(
          `landing.platform.${key}.features.item2.description`,
          currentLocale,
        ),
      },
      {
        icon:
          getText(
            `landing.platform.${key}.features.item3.icon`,
            currentLocale,
          ) || "📱",
        title: getText(
          `landing.platform.${key}.features.item3.title`,
          currentLocale,
        ),
        description: getText(
          `landing.platform.${key}.features.item3.description`,
          currentLocale,
        ),
      },
      {
        icon:
          getText(
            `landing.platform.${key}.features.item4.icon`,
            currentLocale,
          ) || "⚡",
        title: getText(
          `landing.platform.${key}.features.item4.title`,
          currentLocale,
        ),
        description: getText(
          `landing.platform.${key}.features.item4.description`,
          currentLocale,
        ),
      },
    ],
  };

  // For longtail pages, try longtail-specific hero first, fallback to base platform
  const heroData = {
    h1: getText(`landing.longtail.${heroKey}.seo.h1`, currentLocale) || 
        getText(`landing.platform.${key}.seo.h1`, currentLocale),
    description: getText(`landing.longtail.${heroKey}.seo.description`, currentLocale) ||
        getText(`landing.platform.${key}.seo.description`, currentLocale),
  };

  return (
    <PlatformDataContext.Provider
      value={{ features: featuresData, hero: heroData }}
    >
      {children}
    </PlatformDataContext.Provider>
  );
}
