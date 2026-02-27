import type { CSSProperties } from "react";
import {
  Video,
  Megaphone,
  Scissors,
  GraduationCap,
  Users,
  Heart,
} from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";

const audiences = [
  {
    icon: Video,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    titleKey: "landing.targetAudience.1.title",
    descKey: "landing.targetAudience.1.description",
  },
  {
    icon: Megaphone,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    titleKey: "landing.targetAudience.2.title",
    descKey: "landing.targetAudience.2.description",
  },
  {
    icon: Scissors,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    titleKey: "landing.targetAudience.3.title",
    descKey: "landing.targetAudience.3.description",
  },
  {
    icon: GraduationCap,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    titleKey: "landing.targetAudience.4.title",
    descKey: "landing.targetAudience.4.description",
  },
  {
    icon: Users,
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-400",
    titleKey: "landing.targetAudience.5.title",
    descKey: "landing.targetAudience.5.description",
  },
  {
    icon: Heart,
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    titleKey: "landing.targetAudience.6.title",
    descKey: "landing.targetAudience.6.description",
  },
];

export function TargetAudienceSection({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  return (
    <section
      id="target-audience"
      className="relative bg-black py-20 sm:py-24 cv-auto"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="mb-16 text-center animate-fade-in-up"
          style={{ "--delay": "0.05s" } as CSSProperties}
        >
          <div className="mb-6 flex justify-center">
            <span className="rounded bg-[#0a0a0a] px-3 py-1 text-sm font-medium text-gray-300 border border-[#2a2a2a]">
              {getText("landing.targetAudience.header", currentLocale) ||
                "Target Audience"}
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {getText("landing.targetAudience.title", currentLocale) ||
              "Built for Who Uses SnapVee"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            {getText("landing.targetAudience.subtitle", currentLocale) ||
              "Content creators, marketers, educators, and everyday users — SnapVee makes high-quality video extraction simple and accessible."}
          </p>
        </div>

        {/* Audience Cards Grid - 3x2 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-800 bg-gray-900/30 p-6 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/50 animate-fade-in-up"
                style={
                  { "--delay": `${0.1 + index * 0.08}s` } as CSSProperties
                }
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${audience.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${audience.iconColor}`} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {getText(audience.titleKey, currentLocale)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {getText(audience.descKey, currentLocale)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
