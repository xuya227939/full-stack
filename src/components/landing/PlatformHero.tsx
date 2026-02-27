import { ArrowUpRight, Download, Zap, Shield, Sparkles } from "lucide-react";
import { getPlatformTheme, type PlatformKey } from "@/constants/platformThemes";
import { getText, type Locale } from "@/lib/i18n";

interface PlatformHeroProps {
  platform: PlatformKey;
  title: string;
  subtitle: string;
  currentLocale: Locale;
}

export function PlatformHero({
  platform,
  title,
  subtitle,
  currentLocale,
}: PlatformHeroProps) {
  const theme = getPlatformTheme(platform);

  const platformDisplay = platform.charAt(0).toUpperCase() + platform.slice(1);

  const t = (key: string, fallback: string) =>
    getText(key, currentLocale as any, fallback);

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#120a1f] to-[#0a0a0a]" />

      {/* Static accent gradient - 性能优化：移除动画粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-3xl top-1/4 left-1/4"
          style={{ background: `radial-gradient(circle, ${theme.primaryColor}40 0%, transparent 70%)` }}
        />
        <div
          className="absolute w-[250px] h-[250px] rounded-full opacity-15 blur-3xl bottom-1/4 right-1/4"
          style={{ background: `radial-gradient(circle, ${theme.primaryColor}30 0%, transparent 70%)` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="text-center">
          {/* Platform Badge */}
          <div className="inline-flex items-center gap-3 mb-10 animate-fade-in-up">
            <div
              className="text-3xl filter drop-shadow-lg"
              style={{
                color: theme.primaryColor,
                filter: `drop-shadow(0 0 10px ${theme.primaryColor}40)`,
              }}
            >
              {theme.icon}
            </div>
            <div className="px-5 py-2 rounded-full text-sm font-semibold bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-gray-200">Powered by </span>
              <span className="text-white font-bold">{theme.name}</span>
            </div>
          </div>

          {/* Main Title */}
          <h1
            className="mx-auto max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white animate-fade-in-up"
            style={{ textShadow: `0 0 60px ${theme.primaryColor}30`, animationDelay: "0.1s" }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl text-gray-400 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {subtitle}
          </p>

          {/* Feature Pills */}
          <div
            className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/10 text-white hover:border-white/20 transition-all">
              <Shield className="inline w-4 h-4 mr-2" />
              {t("platform.hero.noWatermark", "No Watermark")}
            </div>
            <div className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/10 text-white hover:border-white/20 transition-all">
              <Sparkles className="inline w-4 h-4 mr-2" />
              {t("platform.hero.originalQuality", "Original Quality")}
            </div>
            <div className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/10 text-white hover:border-white/20 transition-all">
              <Zap className="inline w-4 h-4 mr-2" />
              {t("platform.hero.instantDownload", "Instant Download")}
            </div>
            <div className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/10 text-white hover:border-white/20 transition-all">
              <Download className="inline w-4 h-4 mr-2" />
              {t("platform.hero.freeForever", "Free Forever")}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href={`/${currentLocale}/download`}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#824ac8] to-[#6b3fa0] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#824ac8]/40 transition-all duration-300 hover:scale-105 hover:shadow-[#824ac8]/60 hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.gradientTo})`,
              }}
            >
              <Download className="h-5 w-5" />
              {t(
                "platform.hero.cta.download",
                "Download {platform} Videos",
              ).replace("{platform}", platformDisplay)}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href={`/${currentLocale}/pricing`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              <Zap className="h-5 w-5" />
              {t("platform.hero.cta.upgrade", "Upgrade for Unlimited")}
            </a>
          </div>

          {/* Quick Stats */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              {
                label: t("platform.stats.free100", "100% Free"),
                value: t("platform.stats.noHiddenFees", "No Hidden Fees"),
              },
              {
                label: t("platform.stats.hdQuality", "HD Quality"),
                value: t("platform.stats.1080p4k", "1080p & 4K"),
              },
              {
                label: t("platform.stats.instant", "Instant"),
                value: t("platform.stats.noWaitTime", "No Wait Time"),
              },
              {
                label: t("platform.stats.privacy", "Privacy"),
                value: t("platform.stats.secure", "Secure"),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/[0.1] p-6 hover:border-white/[0.2] transition-all"
              >
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
