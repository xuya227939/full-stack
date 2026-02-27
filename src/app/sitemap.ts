import { MetadataRoute } from "next";
import { blogItems } from "@/app/[lang]/blog/listItem";

const SITE_URL = "https://snapvee.com";

import { LOCALE_CODES } from "@/lib/i18n";
const LOCALES = LOCALE_CODES as unknown as readonly string[];

const PLATFORMS: readonly string[] = [
  "tiktok",
  "youtube",
  "youtube-shorts",
  "instagram",
  "facebook",
  "twitter",
  "x",
  "bilibili",
  "douyin",
  "kuaishou",
  "xiaohongshu",
  "rednote",
  "threads",
  "pinterest",
  "vimeo",
];

const OTHER_PAGES: readonly string[] = [
  "download",
  "pricing",
  "faq",
  "privacy",
  "service",
  "blog",
  "convert",
  "merge",
];

// 为带语言前缀的路径生成 hreflang alternates（Google/Bing 多语言索引必需）
function getAlternatesForPath(path: string): { languages: Record<string, string> } | undefined {
  const found = LOCALES.find(
    (loc) => path === `/${loc}` || path.startsWith(`/${loc}/`),
  );
  if (!found) return undefined;
  const rest = path === `/${found}` ? "" : path.slice(`/${found}`.length);
  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/en${rest}`,
  };
  for (const loc of LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}${rest}`;
  }
  return { languages };
}

function generateUrlEntry(
  path: string,
  lastmod: string,
  priority: number,
  changeFrequency: "daily" | "weekly" = "daily",
) {
  const alternates = getAlternatesForPath(path);
  return {
    url: `${SITE_URL}${path}`,
    lastModified: lastmod,
    changeFrequency,
    priority,
    ...(alternates && { alternates }),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split("T")[0];

  // 根域名 alternates（rewrite 到各语言首页），x-default 供 Google 识别默认语言
  const rootAlternates: Record<string, string> = {
    "x-default": `${SITE_URL}/en`,
  };
  for (const loc of LOCALES) {
    rootAlternates[loc] = `${SITE_URL}/${loc}`;
  }

  return [
    // Homepage（根域名，含各语言 alternate）
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: { languages: rootAlternates },
    },

    // Language homepages
    ...LOCALES.map((locale) =>
      generateUrlEntry(`/${locale}`, currentDate, 1.0),
    ),

    // Platform pages
    ...PLATFORMS.flatMap((platform) =>
      LOCALES.map((locale) =>
        generateUrlEntry(`/${locale}/${platform}`, currentDate, 0.9, "weekly"),
      ),
    ),

    // Other pages
    ...OTHER_PAGES.flatMap((page) =>
      LOCALES.map((locale) =>
        generateUrlEntry(`/${locale}/${page}`, currentDate, 0.8, "weekly"),
      ),
    ),

    // Blog posts (all locales)
    ...LOCALES.flatMap((locale) =>
      blogItems.map((item) =>
        generateUrlEntry(
          `/${locale}/blogs/${item.id}`,
          item.dateTime.split("T")[0],
          0.7,
          "weekly",
        ),
      ),
    ),

    // Download page (no lang)
    generateUrlEntry("/download", currentDate, 0.9, "daily"),

    // Pricing page (no lang)
    generateUrlEntry("/pricing", currentDate, 0.8, "weekly"),

    // FAQ page (no lang)
    generateUrlEntry("/faq", currentDate, 0.7, "weekly"),
  ];
}
