import type { CSSProperties } from "react";
import { getText, type Locale } from "@/lib/i18n";
import { PlatformHero } from "@/components/landing/PlatformHero";
import type { PlatformKey } from "@/constants/platformThemes";

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
  "youtube-shorts-download-hd": "youtube-shorts",
  "youtube-video-downloader-4k": "youtube",
  "youtube-video-download-online-free": "youtube",
  "youtube-video-download-to-gallery": "youtube",
  "instagram-video-downloader-4k-no-watermark": "instagram",
  "tiktok-video-downloader-hd-no-watermark": "tiktok",
  "threads-video-downloader": "threads",
  "threads-video-save": "threads",
  nicovideo: "nicovideo",
};

interface FaqItem {
  question: string;
  answer: string;
}

export function PlatformContent({
  platform,
  currentLocale,
  faqQuestions = [],
}: {
  platform: string;
  currentLocale: Locale;
  faqQuestions?: FaqItem[];
}) {
  const baseKey = platformKeys[platform] || platform;
  const isLongtailPage =
    platform.includes("-download") ||
    platform.includes("-downloader") ||
    platform.includes("-save");
  const heroKey = isLongtailPage ? platform : baseKey;

  const platformDisplay =
    getText(`platform.${baseKey}.name`, currentLocale, "") ||
    platform.charAt(0).toUpperCase() + platform.slice(1);

  const heroTitle =
    getText(`landing.longtail.${heroKey}.seo.h1`, currentLocale, "") ||
    getText(
      `landing.platform.${baseKey}.seo.h1`,
      currentLocale,
      platformDisplay,
    );
  const heroDescription =
    getText(`landing.longtail.${heroKey}.seo.description`, currentLocale, "") ||
    getText(
      `landing.platform.${baseKey}.seo.description`,
      currentLocale,
      "",
    );

  const t = (key: string, params?: Record<string, string>) => {
    let text = getText(key, currentLocale, key);
    if (params) {
      Object.keys(params).forEach((paramKey) => {
        text = text.replace(`{${paramKey}}`, params[paramKey]);
      });
    }
    return text;
  };

  return (
    <>
      <PlatformHero
        platform={baseKey as PlatformKey}
        title={heroTitle}
        subtitle={heroDescription}
        currentLocale={currentLocale}
      />

      {/* Platform-Specific How It Works */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-black cv-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="text-center animate-fade-in-up"
            style={{ "--delay": "0.05s" } as CSSProperties}
          >
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {t("platform.howTo.title", { platform: platformDisplay })}
            </h2>
            <p className="mb-12 text-lg text-gray-400">
              {t("platform.howTo.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: t("platform.howTo.step1.title"),
                description: t("platform.howTo.step1.description", {
                  platform: platformDisplay,
                }),
                icon: "📋",
              },
              {
                step: "02",
                title: t("platform.howTo.step2.title"),
                description: t("platform.howTo.step2.description"),
                icon: "🔍",
              },
              {
                step: "03",
                title: t("platform.howTo.step3.title"),
                description: t("platform.howTo.step3.description"),
                icon: "⬇️",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="group rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.1] p-8 hover:border-white/[0.2] transition-all hover:scale-105 animate-fade-in-up"
                style={
                  {
                    "--delay": `${0.1 + index * 0.08}s`,
                  } as CSSProperties
                }
              >
                <div className="mb-4 text-6xl font-black text-white/[0.1]">
                  {item.step}
                </div>
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform-Specific Features */}
      <section className="py-24 bg-black cv-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl animate-fade-in-up"
            style={{ "--delay": "0.05s" } as CSSProperties}
          >
            {t("platform.features.title", { platform: platformDisplay })}
          </h2>

          <p
            className="mb-12 text-center text-lg text-gray-400 animate-fade-in-up"
            style={{ "--delay": "0.1s" } as CSSProperties}
          >
            {t("platform.features.subtitle")}
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t("platform.features.smartDetection.title"),
                description: t("platform.features.smartDetection.description"),
                icon: "🧠",
              },
              {
                title: t("platform.features.batchDownload.title"),
                description: t("platform.features.batchDownload.description"),
                icon: "⚡",
              },
              {
                title: t("platform.features.secure.title"),
                description: t("platform.features.secure.description"),
                icon: "🔐",
              },
              {
                title: t("platform.features.multiPlatform.title"),
                description: t("platform.features.multiPlatform.description", {
                  platform: platformDisplay,
                }),
                icon: "🌐",
              },
              {
                title: t("platform.features.noWatermark.title"),
                description: t("platform.features.noWatermark.description"),
                icon: "✨",
              },
              {
                title: t("platform.features.alwaysFree.title"),
                description: t("platform.features.alwaysFree.description"),
                icon: "💎",
              },
            ].map((benefit, index) => (
              <div
                key={benefit.title}
                className="group rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.1] p-6 hover:border-white/[0.2] transition-all hover:bg-white/[0.1] hover:scale-105 animate-fade-in-up"
                style={
                  {
                    "--delay": `${0.12 + index * 0.06}s`,
                  } as CSSProperties
                }
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#0a0a0a] cv-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-3xl mx-auto text-center animate-fade-in-up"
            style={{ "--delay": "0.05s" } as CSSProperties}
          >
            <div className="text-6xl mb-6">🔄</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("platform.comparison.title", { platform: platformDisplay })}
            </h2>
            <p className="text-gray-400 mb-8">
              {t("platform.comparison.subtitle")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                feature: t("platform.comparison.feature.noWatermark"),
                snapvee: true,
                others: false,
              },
              {
                feature: t("platform.comparison.feature.fasterSpeed"),
                snapvee: true,
                others: false,
              },
              {
                feature: t("platform.comparison.feature.betterQuality"),
                snapvee: true,
                others: false,
              },
              {
                feature: t("platform.comparison.feature.morePlatforms"),
                snapvee: true,
                others: false,
              },
            ].map((item, index) => (
              <div
                key={item.feature}
                className="rounded-xl border border-white/[0.1] p-6 animate-fade-in-up"
                style={
                  {
                    "--delay": `${0.1 + index * 0.08}s`,
                  } as CSSProperties
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {item.snapvee ? "✓" : "✗"}
                    </div>
                    <div className="text-sm font-medium text-white">
                      {t("platform.comparison.snapvee")}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {t("platform.comparison.others")}
                  </div>
                </div>
                <div className="font-medium text-white">{item.feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-black cv-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mb-12 text-center text-3xl font-bold text-white animate-fade-in-up"
            style={{ "--delay": "0.05s" } as CSSProperties}
          >
            {t("platform.reviews.title")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: t("platform.reviews.user1.name"),
                role: t("platform.reviews.user1.role"),
                content: t("platform.reviews.user1.content"),
              },
              {
                name: t("platform.reviews.user2.name"),
                role: t("platform.reviews.user2.role"),
                content: t("platform.reviews.user2.content"),
              },
              {
                name: t("platform.reviews.user3.name"),
                role: t("platform.reviews.user3.role"),
                content: t("platform.reviews.user3.content"),
              },
            ].map((review, index) => (
              <div
                key={review.name}
                className="group rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.08] p-8 hover:border-white/[0.15] transition-all hover:scale-105 animate-fade-in-up"
                style={
                  {
                    "--delay": `${0.1 + index * 0.08}s`,
                  } as CSSProperties
                }
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#824ac8] to-[#a855f7] flex items-center justify-center text-white text-xl font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{review.name}</h4>
                    <p className="text-sm text-gray-400 mb-1">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">"{review.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqQuestions.length > 0 && (
        <section id="faq" className="relative bg-black py-20 sm:py-24 cv-auto">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div
              className="mb-16 text-center animate-fade-in-up"
              style={{ "--delay": "0.05s" } as CSSProperties}
            >
              <div className="mb-6 flex justify-center">
                <span className="rounded bg-gray-900 px-3 py-1 text-sm font-medium text-gray-300 border border-gray-800">
                  {getText("landing.faq.header", currentLocale) || "FAQs"}
                </span>
              </div>
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {getText("landing.faq.title", currentLocale) ||
                  "Frequently Asked Questions"}
              </h2>
              <p className="text-lg text-gray-400">
                {getText("landing.faq.subtitle", currentLocale) ||
                  "Quick answers to your questions about SnapVee."}
              </p>
            </div>

            <div className="space-y-4">
              {faqQuestions.map((faq, index) => (
                <details
                  key={`${faq.question}-${index}`}
                  className="group rounded-lg border border-gray-800 bg-gray-900/30 px-6 py-4 transition-all hover:bg-gray-900/50 animate-fade-in-up"
                  style={
                    {
                      "--delay": `${0.08 + index * 0.04}s`,
                    } as CSSProperties
                  }
                >
                  <summary className="cursor-pointer list-none text-left text-lg font-medium text-white transition-colors group-open:text-purple-400 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                  </summary>
                  <div className="mt-3 text-base text-gray-400">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
