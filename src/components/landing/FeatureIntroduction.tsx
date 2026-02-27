import type { CSSProperties } from "react";
import { Globe, CheckCircle2, Play, Download } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import {
  WhiteTwitter,
  Youtube,
  TikTok,
  Instagram,
  FacebookIcon,
  Bilibili,
} from "@/components/icon";

export interface FeatureIntroductionProps {
  currentLocale: Locale;
  data?: {
    title: string;
    subtitle: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export function FeatureIntroduction({
  currentLocale,
  data,
}: FeatureIntroductionProps) {
  // 如果没有传入 data，使用默认逻辑（这里简化处理，实际应该保留原有逻辑作为 fallback）
  // 为了保持向后兼容，如果 data 为空，则渲染默认内容
  // 但为了简化 diff，这里我们假设如果有 data 就用 data，否则用默认的 getText

  const title =
    data?.title || getText("landing.featureIntroduction.title", currentLocale);
  const subtitle =
    data?.subtitle ||
    getText("landing.featureIntroduction.subtitle", currentLocale);

  // Feature 1 Data
  const feature1Title =
    data?.items?.[0]?.title ||
    getText("landing.featureIntroduction.feature1.title", currentLocale) ||
    "Lightning-Fast Video Extraction";
  const feature1Desc =
    data?.items?.[0]?.description ||
    getText("landing.featureIntroduction.feature1.description", currentLocale) ||
    "Advanced parsing engine analyzes URLs instantly, extracts video streams in seconds, and delivers high-quality downloads. No waiting, no buffering - just pure speed.";
  const feature1Badge =
    data?.items?.[0]?.icon || // Using icon field for badge text if provided via data
    getText("landing.featureIntroduction.feature1.badge", currentLocale) ||
    "Fast Parsing";

  // Feature 2 Data
  const feature2Title =
    data?.items?.[1]?.title ||
    getText("landing.featureIntroduction.feature2.title", currentLocale) ||
    "50+ Platform Support";
  const feature2Desc =
    data?.items?.[1]?.description ||
    getText("landing.featureIntroduction.feature2.description", currentLocale) ||
    "From YouTube to TikTok, Instagram to Bilibili - we support all major social media platforms. One tool, unlimited possibilities for content creators and marketers.";
  const feature2Badge =
    data?.items?.[1]?.icon ||
    getText("landing.featureIntroduction.feature2.badge", currentLocale) ||
    "Multi-Platform";

  // Feature 3 Data
  const feature3Title =
    data?.items?.[2]?.title ||
    getText("landing.featureIntroduction.feature3.title", currentLocale) ||
    "Batch Extraction, Double Efficiency";
  const feature3Desc =
    data?.items?.[2]?.description ||
    getText("landing.featureIntroduction.feature3.description", currentLocale) ||
    "Extract up to 3 videos at once without waiting for each one. Batch processing makes your workflow more efficient and saves valuable time. Whether for content creation or marketing material collection, get twice the results with half the effort.";
  const feature3Badge =
    data?.items?.[2]?.icon ||
    getText("landing.featureIntroduction.feature3.badge", currentLocale) ||
    "Batch Extraction";

  return (
    <section
      id="features"
      className="relative bg-black py-20 sm:py-24 cv-auto"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="mb-20 text-center animate-fade-in-up"
          style={{ "--delay": "0.05s" } as CSSProperties}
        >
          <div className="mb-6 flex justify-center">
            <span className="rounded bg-[#0a0a0a] px-3 py-1 text-sm font-medium text-gray-300 border border-[#2a2a2a]">
              {getText("landing.featureIntroduction.header", currentLocale)}
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{subtitle}</p>
        </div>

        {/* Feature 1: Workflow Automation (Global Fast Parsing) */}
        <div
          className="mb-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 animate-fade-in-up"
          style={{ "--delay": "0.1s" } as CSSProperties}
        >
          {/* Visual - Left Side */}
          <div className="relative rounded-2xl border border-gray-800 bg-gray-900/20 p-8">
            {/* Mockup UI */}
            <div className="rounded-xl border border-gray-800 bg-black p-4 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="h-2 w-20 rounded-full bg-gray-800" />
              </div>
              <div className="space-y-3">
                {[
                  {
                    icon: Globe,
                    text: "Analyzing URL...",
                    status: "Processing",
                  },
                  {
                    icon: Download,
                    text: "Extracting Video...",
                    status: "70%",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Download Ready",
                    status: "Done",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800">
                        <item.icon className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {item.text}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text - Right Side */}
          <div>
            <div className="mb-6 inline-flex rounded-lg border border-gray-800 bg-gray-900/50 px-3 py-1 text-sm font-medium text-gray-300">
              {feature1Badge}
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {feature1Title}
            </h3>
            <p className="mb-8 text-lg text-gray-400">{feature1Desc}</p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm font-medium text-gray-300">
                {getText(
                  "landing.featureIntroduction.feature1.tag1",
                  currentLocale
                ) || "Instant Analysis"}
              </span>
              <span className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm font-medium text-gray-300">
                {getText(
                  "landing.featureIntroduction.feature1.tag2",
                  currentLocale
                ) || "HD Quality"}
              </span>
            </div>
          </div>
        </div>

        {/* Feature 2: AI Assistant (Stable & Secure) */}
        <div
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 animate-fade-in-up"
          style={{ "--delay": "0.2s" } as CSSProperties}
        >
          {/* Text - Left Side */}
          <div className="order-2 lg:order-1">
            <div className="mb-6 inline-flex rounded-lg border border-gray-800 bg-gray-900/50 px-3 py-1 text-sm font-medium text-gray-300">
              {feature2Badge}
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {feature2Title}
            </h3>
            <p className="mb-8 text-lg text-gray-400">{feature2Desc}</p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm font-medium text-gray-300">
                {getText(
                  "landing.featureIntroduction.feature2.tag1",
                  currentLocale
                ) || "Universal Support"}
              </span>
              <span className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm font-medium text-gray-300">
                {getText(
                  "landing.featureIntroduction.feature2.tag2",
                  currentLocale
                ) || "Always Updated"}
              </span>
            </div>
          </div>

          {/* Visual - Right Side */}
          <div className="order-1 lg:order-2 relative rounded-2xl border border-gray-800 bg-gray-900/20 p-8">
            {/* Mockup UI - Platform Grid */}
            <div className="rounded-xl border border-gray-800 bg-black p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-500">50+ Platforms</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "YouTube", color: "", icon: Youtube },
                  { name: "TikTok", color: "", icon: TikTok },
                  { name: "Instagram", color: "", icon: Instagram },
                  { name: "Twitter", color: "", icon: WhiteTwitter },
                  { name: "Facebook", color: "", icon: FacebookIcon },
                  { name: "Bilibili", color: "", icon: Bilibili },
                ].map((platform, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-3 transition-all hover:border-purple-500/50 hover:bg-gray-900"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${platform.color}15` }}
                    >
                      <platform.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-gray-400">
                      {platform.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-purple-500/30 bg-purple-900/10 px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-medium text-purple-300">
                  All Platforms Supported
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Batch Extraction */}
        <div
          className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 animate-fade-in-up"
          style={{ "--delay": "0.3s" } as CSSProperties}
        >
          {/* Visual - Left Side */}
          <div className="relative rounded-2xl border border-gray-800 bg-gray-900/20 p-8">
            {/* Mockup UI - Batch Processing */}
            <div className="rounded-xl border border-gray-800 bg-black p-4 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-500">Batch Mode</span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    url: "youtube.com/watch?v=...",
                    status: "Processing",
                    progress: "60%",
                  },
                  {
                    url: "tiktok.com/@user/video/...",
                    status: "Processing",
                    progress: "40%",
                  },
                  {
                    url: "instagram.com/p/...",
                    status: "Queued",
                    progress: "0%",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-3"
                  >
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-400" />
                        <span className="text-xs font-medium text-gray-300">
                          {item.url}
                        </span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-gray-800">
                        <div
                          className="h-1 rounded-full bg-purple-500 transition-all"
                          style={{ width: item.progress }}
                        />
                      </div>
                    </div>
                    <span className="ml-3 text-xs text-gray-500">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-purple-500/30 bg-purple-900/10 px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-medium text-purple-300">
                  3 tasks in batch
                </span>
              </div>
            </div>
          </div>

          {/* Text - Right Side */}
          <div>
            <div className="mb-6 inline-flex rounded-lg border border-gray-800 bg-gray-900/50 px-3 py-1 text-sm font-medium text-gray-300">
              {feature3Badge}
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {feature3Title}
            </h3>
            <p className="mb-8 text-lg text-gray-400">{feature3Desc}</p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm font-medium text-gray-300">
                {getText(
                  "landing.featureIntroduction.feature3.tag1",
                  currentLocale
                ) || "Batch Processing"}
              </span>
              <span className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm font-medium text-gray-300">
                {getText(
                  "landing.featureIntroduction.feature3.tag2",
                  currentLocale
                ) || "Time Saving"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
