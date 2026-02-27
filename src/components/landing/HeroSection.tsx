import type { CSSProperties } from "react";
import { ReactElement } from "react";
import { ArrowUpRight } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import {
  Bilibili,
  Kuaishou,
  Threads,
  Youtube,
  Instagram,
  Xiaohongshu,
  FacebookIcon,
  TikTok,
  WhiteTwitter,
  Pornhub,
} from "@/components/icon";

// 社交媒体平台图标组件
const PlatformIcon = ({ name }: { name: string }) => {
  const icons: Record<string, ReactElement> = {
    YouTube: <Youtube className="w-full h-full" />,
    TikTok: <TikTok className="w-full h-full" />,
    Instagram: <Instagram className="w-full h-full" />,
    Twitter: <WhiteTwitter className="w-full h-full" />,
    Facebook: <FacebookIcon className="w-full h-full" />,
    Bilibili: <Bilibili className="w-full h-full" />,
    Kuaishou: <Kuaishou className="w-full h-full" />,
    Xiaohongshu: <Xiaohongshu className="w-full h-full" />,
    Threads: <Threads className="w-full h-full" />,
    Pornhub: <Pornhub className="w-full h-full" />,
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {icons[name] || (
        <span className="text-xs font-bold text-white">{name.charAt(0)}</span>
      )}
    </div>
  );
};

// 社交媒体平台配置（仅展示主流平台，不展示成人内容平台）
const socialPlatforms = [
  { name: "YouTube" },
  { name: "TikTok" },
  { name: "Instagram" },
  { name: "Twitter" },
  { name: "Facebook" },
  { name: "Bilibili" },
  { name: "Xiaohongshu" },
  { name: "Threads" },
];

export interface HeroSectionProps {
  currentLocale: Locale;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export function HeroSection({
  currentLocale,
  title,
  subtitle,
  buttonText,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden  pb-32 pt-40 sm:pt-48">
      {/* 旋转光圈背景 - 使用 CSS 动画优化性能 */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
        {/* Big Circle */}
        <div
          className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full opacity-100 animate-spin-slow-reverse"
          style={{
            background:
              "linear-gradient(229deg, #df7afe 13%, rgba(201,110,240,0) 35%, rgba(164,92,219,0) 64%, rgb(129, 74, 200) 88%)",
            filter: "blur(40px)",
          }}
        />
        {/* Small Circle */}
        <div
          className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-100 animate-spin-slow"
          style={{
            background:
              "linear-gradient(229deg, #df7afe 13%, rgba(201,110,240,0) 35%, rgba(164,92,219,0) 64%, rgb(129, 74, 200) 88%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 主标题 - CSS 动画 */}
          <h1
            className="mx-auto max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl animate-fade-in-up"
            style={{ "--delay": "0.1s" } as CSSProperties}
          >
            {title ||
              getText("landing.hero.title", currentLocale) ||
              "Intelligent Automation for Modern Businesses."}
          </h1>

          {/* 副标题 */}
          <p
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl animate-fade-in-up"
            style={{ "--delay": "0.2s" } as CSSProperties}
          >
            {subtitle ||
              getText("landing.hero.subtitle", currentLocale) ||
              "Xtract brings AI automation to your fingertips & streamline tasks."}
          </p>

          {/* 快速开始按钮 */}
          <div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up"
            style={{ "--delay": "0.3s" } as CSSProperties}
          >
            <a
              href={`/${currentLocale}/download`}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#824ac8] px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#6639a3] hover:scale-105"
            >
              {buttonText ||
                getText("landing.hero.button.download", currentLocale) ||
                "Quick Start"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Trusted By Section */}
          <div
            className="mt-[14.5rem] sm:mt-[16rem] animate-fade-in"
            style={{ "--delay": "0.5s" } as CSSProperties}
          >
            <div className="flex flex-col items-center">
              <p className="mb-8 text-sm text-gray-400">
                {getText("landing.hero.suppport", currentLocale) ||
                  "Support 50+ platforms"}
              </p>
            </div>

            {/* 滚动 Logo 栏 */}
            <div className="relative w-full overflow-hidden mask-linear-fade">
              <div className="flex w-max animate-scroll-left gap-12 sm:gap-20">
                {/* 重复两组以实现无缝滚动 */}
                {[...socialPlatforms, ...socialPlatforms].map(
                  (platform, index) => (
                    <div
                      key={`${platform.name}-${index}`}
                      className="flex items-center gap-2 opacity-50 transition-opacity hover:opacity-100"
                    >
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gray-800/50 transition-transform hover:scale-110 hover:bg-gray-800">
                        <div className="h-6 w-6 sm:h-7 sm:w-7">
                          <PlatformIcon name={platform.name} />
                        </div>
                      </div>
                      <span className="text-base sm:text-lg font-bold text-gray-300">
                        {platform.name}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
