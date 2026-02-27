import type { CSSProperties } from "react";
import Image from "next/image";
import { getText, type Locale } from "@/lib/i18n";
import { Youtube, Douyin, Xiaohongshu, Bilibili } from "@/components/icon";

// Feature images - using external CDN
const youtubeScreenshot =
  "https://oss.api-service.net.cn/snapvee/images/product_highlights1.png";
const batchScreenshot =
  "https://oss.api-service.net.cn/snapvee/images/product_highlights2.png";
const douyinScreenshot =
  "https://oss.api-service.net.cn/snapvee/images/product_highlights3.png";
const xiaohongshuScreenshot =
  "https://oss.api-service.net.cn/snapvee/images/product_highlights4.png";
const youtubeMultiAudioScreenshot =
  "https://oss.api-service.net.cn/snapvee/images/product_highlights5.png";
const bilibiliVipScreenshot =
  "https://oss.api-service.net.cn/snapvee/images/product_highlights6.png";

export function ProductHighlights({ currentLocale }: { currentLocale: Locale }) {

  const highlights = [
    {
      step:
        getText("landing.productHighlights.step1", currentLocale) || "亮点 1",
      title:
        getText("landing.productHighlights.youtube4k.title", currentLocale) ||
        "YouTube 4K 提取",
      description:
        getText(
          "landing.productHighlights.youtube4k.description",
          currentLocale,
        ) ||
        "支持 YouTube 4K/2K/1080p 高清视频下载，AV1/VP9/H.264 多种编码格式任选，配合音频分离功能，满足专业创作需求。",
      icon: <Youtube className="w-5 h-5" />,
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
      image: youtubeScreenshot,
    },
    {
      step:
        getText("landing.productHighlights.step2", currentLocale) || "亮点 2",
      title:
        getText("landing.productHighlights.batch.title", currentLocale) ||
        "批量提取",
      description:
        getText("landing.productHighlights.batch.description", currentLocale) ||
        "一次最多提取 3 个视频链接，无需逐个等待。批量处理让您的工作流程更加高效，节省宝贵时间。",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      image: batchScreenshot,
    },
    {
      step:
        getText("landing.productHighlights.step3", currentLocale) || "亮点 3",
      title:
        getText("landing.productHighlights.douyin.title", currentLocale) ||
        "抖音图文提取",
      description:
        getText(
          "landing.productHighlights.douyin.description",
          currentLocale,
        ) ||
        "智能识别抖音图文笔记，一键提取所有高清图片及背景音乐，同时生成带音乐的幻灯片视频，完美还原原作。",
      icon: <Douyin className="w-5 h-5" />,
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-400",
      image: douyinScreenshot,
    },
    {
      step:
        getText("landing.productHighlights.step4", currentLocale) || "亮点 4",
      title:
        getText("landing.productHighlights.xiaohongshu.title", currentLocale) ||
        "小红书 Live Photo",
      description:
        getText(
          "landing.productHighlights.xiaohongshu.description",
          currentLocale,
        ) ||
        "独家支持小红书 Live Photo 实况照片提取，保留动态效果，批量下载所有图片和视频，无水印原图直出。",
      icon: <Xiaohongshu className="w-5 h-5" />,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      image: xiaohongshuScreenshot,
    },
    {
      step:
        getText("landing.productHighlights.step5", currentLocale) || "亮点 5",
      title:
        getText("landing.productHighlights.youtubeMultiAudio.title", currentLocale) ||
        "YouTube 多音轨支持",
      description:
        getText(
          "landing.productHighlights.youtubeMultiAudio.description",
          currentLocale,
        ) ||
        "支持 YouTube 视频与音频独立提取，可分别选择画质和音质，多音轨任选搭配，满足专业剪辑和混音需求。",
      icon: <Youtube className="w-5 h-5" />,
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
      image: youtubeMultiAudioScreenshot,
    },
    {
      step:
        getText("landing.productHighlights.step6", currentLocale) || "亮点 6",
      title:
        getText("landing.productHighlights.bilibiliVip.title", currentLocale) ||
        "B站大会员视频支持",
      description:
        getText(
          "landing.productHighlights.bilibiliVip.description",
          currentLocale,
        ) ||
        "支持 B站大会员专享视频下载，无需登录大会员账号，即可提取高清画质，畅享番剧、纪录片等付费内容。",
      icon: <Bilibili className="w-5 h-5" />,
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-400",
      image: bilibiliVipScreenshot,
    },
  ];

  return (
    <section className="relative bg-black py-20 sm:py-24 cv-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="mb-16 text-center animate-fade-in-up"
          style={{ "--delay": "0.05s" } as CSSProperties}
        >
          <div className="mb-6 flex justify-center">
            <span className="rounded bg-[#0a0a0a] px-3 py-1 text-sm font-medium text-gray-300 border border-[#2a2a2a]">
              {getText("landing.productHighlights.header", currentLocale) ||
                "产品亮点"}
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {getText("landing.productHighlights.title", currentLocale) ||
              "差异化核心功能"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            {getText("landing.productHighlights.subtitle", currentLocale) ||
              "不只是下载器，更是专业级内容提取引擎"}
          </p>
        </div>

        {/* Highlights Grid - 2x2 */}
        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-gray-800 bg-gray-900/30 p-6 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/50 animate-fade-in-up"
              style={{ "--delay": `${0.1 + index * 0.08}s` } as CSSProperties}
            >
              {/* Step Badge */}
              <div className="mb-4 inline-flex rounded-lg border border-gray-800 bg-gray-900/80 px-3 py-1 text-sm font-medium text-gray-400">
                {highlight.step}
              </div>

              {/* Title with Icon */}
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${highlight.iconBg}`}
                >
                  <span className={highlight.iconColor}>{highlight.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {highlight.title}
                </h3>
              </div>

              {/* Description */}
              <p className="mb-6 text-gray-400 leading-relaxed">
                {highlight.description}
              </p>

              {/* Screenshot Image */}
              <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-950">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    unoptimized
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
