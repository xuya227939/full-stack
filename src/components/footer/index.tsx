"use client";

import { DownloadCloud } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { getText } from "@/lib/i18n";
import { Telegram } from "@/components/icon";

export function Footer() {
  const { currentLocale } = useLocale();

  return (
    <footer className="bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-800 pt-12 pb-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Brand & Description */}
            <div className="lg:col-span-5">
              <div className="mb-6 flex items-center gap-2">
                <DownloadCloud className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">SnapVee</span>
              </div>
              <p className="mb-8 max-w-sm text-gray-400">
                {getText("footer.description", currentLocale) ||
                  "SnapVee – Universal Social Media Video Downloader."}
              </p>
            </div>

            {/* Right Columns: Popular Searches, Pages & About */}
            <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:col-span-7 lg:pl-12">
              {/* Popular Searches Column - SEO Longtail Keywords */}
              <div>
                <h4 className="mb-6 text-lg font-medium text-white">
                  {getText("footer.popular.title", currentLocale) ||
                    "Popular Searches"}
                </h4>
                <ul className="space-y-4">
                  {[
                    // YouTube longtail keywords
                    {
                      name:
                        getText(
                          "footer.longtail.youtube-shorts-hd",
                          currentLocale,
                        ) || "YouTube Shorts HD",
                      url: `/${currentLocale}/youtube-shorts-download-hd`,
                    },
                    {
                      name:
                        getText("footer.longtail.youtube-4k", currentLocale) ||
                        "4K YouTube Downloader",
                      url: `/${currentLocale}/youtube-video-downloader-4k`,
                    },
                    {
                      name:
                        getText(
                          "footer.longtail.youtube-free",
                          currentLocale,
                        ) || "YouTube Free Online",
                      url: `/${currentLocale}/youtube-video-download-online-free`,
                    },
                    {
                      name:
                        getText(
                          "footer.longtail.youtube-gallery",
                          currentLocale,
                        ) || "YouTube Save to Gallery",
                      url: `/${currentLocale}/youtube-video-download-to-gallery`,
                    },
                    // Instagram longtail
                    {
                      name:
                        getText(
                          "footer.longtail.instagram-4k",
                          currentLocale,
                        ) || "Instagram 4K No Watermark",
                      url: `/${currentLocale}/instagram-video-downloader-4k-no-watermark`,
                    },
                    // TikTok longtail
                    {
                      name:
                        getText("footer.longtail.tiktok-hd", currentLocale) ||
                        "TikTok HD No Watermark",
                      url: `/${currentLocale}/tiktok-video-downloader-hd-no-watermark`,
                    },
                    // Platform pages
                    {
                      name:
                        getText("footer.popular.facebook", currentLocale) ||
                        "Facebook Video Downloader",
                      url: `/${currentLocale}/facebook`,
                    },
                    {
                      name:
                        getText("footer.popular.twitter", currentLocale) ||
                        "Twitter Video HD",
                      url: `/${currentLocale}/x`,
                    },
                    {
                      name:
                        getText("footer.popular.pinterest", currentLocale) ||
                        "Pinterest HD 4K",
                      url: `/${currentLocale}/pinterest`,
                    },
                    {
                      name:
                        getText("footer.popular.xiaohongshu", currentLocale) ||
                        "RedNote No Watermark",
                      url: `/${currentLocale}/xiaohongshu`,
                    },
                    {
                      name:
                        getText("footer.popular.vimeo", currentLocale) ||
                        "Vimeo Downloader",
                      url: `/${currentLocale}/vimeo`,
                    },
                    {
                      name:
                        getText("footer.popular.nicovideo", currentLocale) ||
                        "Nicovideo Downloader",
                      url: `/${currentLocale}/nicovideo`,
                    },
                    {
                      name:
                        getText("footer.popular.upscrolled", currentLocale) ||
                        "UpScrolled Downloader",
                      url: `/${currentLocale}/upscrolled`,
                    },
                    {
                      name:
                        getText(
                          "footer.longtail.threads-downloader",
                          currentLocale,
                        ) || "Threads Video Downloader",
                      url: `/${currentLocale}/threads-video-downloader`,
                    },
                    {
                      name:
                        getText(
                          "footer.longtail.threads-save",
                          currentLocale,
                        ) || "Threads Video Save",
                      url: `/${currentLocale}/threads-video-save`,
                    },
                  ].map((item) => (
                    <li key={item.url}>
                      <Link
                        href={item.url}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pages Column */}
              <div>
                <h4 className="mb-6 text-lg font-medium text-white">
                  {getText("footer.pages.title", currentLocale) || "Pages"}
                </h4>
                <ul className="space-y-4">
                  {[
                    {
                      name: getText("header.nav.home", currentLocale) || "Home",
                      url: `/${currentLocale}`,
                    },
                    {
                      name:
                        getText("header.nav.download", currentLocale) ||
                        "Download",
                      url: `/${currentLocale}/download`,
                    },
                    {
                      name:
                        getText("footer.pages.convertVideo", currentLocale) ||
                        "Video Format Convert",
                      url: `/${currentLocale}/convert/video`,
                    },
                    {
                      name:
                        getText("footer.pages.convertImage", currentLocale) ||
                        "Image Format Convert",
                      url: `/${currentLocale}/convert/image`,
                    },
                    {
                      name:
                        getText("footer.pages.convertAudio", currentLocale) ||
                        "Audio Format Convert",
                      url: `/${currentLocale}/convert/audio`,
                    },
                    {
                      name:
                        getText("footer.pages.merge", currentLocale) ||
                        "Merge Video Audio",
                      url: `/${currentLocale}/merge`,
                    },
                    {
                      name:
                        getText("header.nav.pricing", currentLocale) ||
                        "Pricing",
                      url: `/${currentLocale}/pricing`,
                    },
                    {
                      name: getText("header.nav.faq", currentLocale) || "FAQ",
                      url: `/${currentLocale}/faq`,
                    },
                    {
                      name: getText("header.nav.blog", currentLocale) || "Blog",
                      url: `/${currentLocale}/blog`,
                    },
                    {
                      name:
                        getText("footer.pages.roadmap", currentLocale) ||
                        "Roadmap",
                      url: "https://neonbit.featurebase.app/roadmap",
                      external: true,
                    },
                  ].map((item) => (
                    <li key={item.name}>
                      {"external" in item && item.external ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 transition-colors hover:text-white"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={item.url}
                          className="text-gray-400 transition-colors hover:text-white"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* About Column */}
              <div>
                <h4 className="mb-6 text-lg font-medium text-white">
                  {getText("footer.about", currentLocale) || "About"}
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="mailto:hezhiqianye@gmail.com"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      {getText("footer.about.contact", currentLocale) ||
                        "Contact Us"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright, Links & Socials Row */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span>
                {new Date().getFullYear()}
                {getText("footer.copyright", currentLocale) ||
                  "© SnapVee Copyright"}
              </span>
              <Link
                href={`/${currentLocale}/service`}
                className="transition-colors hover:text-white"
              >
                {getText("footer.links.services", currentLocale) ||
                  "Terms of Use"}
              </Link>
              <Link
                href={`/${currentLocale}/privacy`}
                className="transition-colors hover:text-white"
              >
                {getText("footer.links.privacy", currentLocale) ||
                  "Privacy Policy"}
              </Link>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <Link
                href="https://t.me/+YJsGEv_hJKhkZWY1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Telegram className="h-6 w-6 text-gray-400" />
              </Link>
              {/* <Link
                href="https://x.com/hezhiqianye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <WhiteTwitter className="h-5 w-5" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
