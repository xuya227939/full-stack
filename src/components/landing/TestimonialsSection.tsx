import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Content Creator",
    avatar: "AC",
    color: "bg-blue-500",
  },
  {
    name: "Sarah Johnson",
    role: "Social Media Manager",
    avatar: "SJ",
    color: "bg-purple-500",
  },
  {
    name: "Mike Zhang",
    role: "Video Editor",
    avatar: "MZ",
    color: "bg-indigo-500",
  },
  {
    name: "Lisa Wang",
    role: "Marketing Director",
    avatar: "LW",
    color: "bg-pink-500",
  },
];

export function TestimonialsSection({
  currentLocale,
}: {
  currentLocale: Locale;
}) {

  return (
    <section
      id="testimonials"
      className="relative bg-black py-20 sm:py-24 cv-auto"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="mb-16 text-center animate-fade-in-up"
          style={{ "--delay": "0.05s" } as CSSProperties}
        >
          <div className="mb-6 flex justify-center">
            <span className="rounded bg-gray-900 px-3 py-1 text-sm font-medium text-gray-300 border border-gray-800">
              {getText("landing.testimonials.header", currentLocale) ||
                "Testimonials"}
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {getText("landing.testimonials.title", currentLocale) ||
              "What Our Users Say"}
          </h2>
          <p className="text-lg text-gray-400">
            {getText("landing.testimonials.subtitle", currentLocale) ||
              "Typical user experiences with SnapVee."}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {getText("landing.testimonials.disclaimer", currentLocale) ||
              "* Names and scenarios are illustrative examples"}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/20 p-8 transition-all hover:bg-gray-900/40 animate-fade-in-up"
              style={{ "--delay": `${0.1 + index * 0.08}s` } as CSSProperties}
            >
              {/* Gradient Glow Effect */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-900/20 blur-3xl transition-all group-hover:bg-purple-800/30" />

              {/* Stars */}
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-white text-white" />
                ))}
              </div>

              {/* Content */}
              <p className="mb-8 text-lg leading-relaxed text-gray-300">
                &quot;
                {getText(
                  `landing.testimonials.${index}.content`,
                  currentLocale
                ) || ""}
                &quot;
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${testimonial.color}`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {getText(
                      `landing.testimonials.${index}.name`,
                      currentLocale
                    ) || testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {getText(
                      `landing.testimonials.${index}.role`,
                      currentLocale
                    ) || testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
