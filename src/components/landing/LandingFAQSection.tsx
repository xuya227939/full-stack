import type { CSSProperties } from "react";
import { getText, type Locale } from "@/lib/i18n";

const faqs = [
  { questionKey: "faq.tips1", answerKey: "faq.subTips1" },
  { questionKey: "faq.tips2", answerKey: "faq.subTips2" },
  { questionKey: "faq.tips3", answerKey: "faq.subTips3" },
  { questionKey: "faq.tips4", answerKey: "faq.subTips4" },
  { questionKey: "faq.tips5", answerKey: "faq.subTips5" },
  { questionKey: "faq.tips6", answerKey: "faq.subTips6" },
  { questionKey: "faq.tips7", answerKey: "faq.subTips7" },
  { questionKey: "faq.tips8", answerKey: "faq.subTips8" },
  { questionKey: "faq.tips9", answerKey: "faq.subTips9" },
  { questionKey: "faq.tips10", answerKey: "faq.subTips10" },
  { questionKey: "faq.tips11", answerKey: "faq.subTips11" },
  { questionKey: "faq.tips12", answerKey: "faq.subTips12" },
  { questionKey: "faq.tips13", answerKey: "faq.subTips13" },
  { questionKey: "faq.tips14", answerKey: "faq.subTips14" },
  { questionKey: "faq.tips15", answerKey: "faq.subTips15" },
];

export default function LandingFAQSection({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  return (
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
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-lg border border-gray-800 bg-gray-900/30 px-6 py-4 transition-all hover:bg-gray-900/50 animate-fade-in-up"
              style={{ "--delay": `${0.08 + index * 0.04}s` } as CSSProperties}
            >
              <summary className="cursor-pointer list-none text-left text-lg font-medium text-white transition-colors group-open:text-purple-400 [&::-webkit-details-marker]:hidden">
                {getText(faq.questionKey, currentLocale) || ""}
              </summary>
              <div className="mt-3 text-base text-gray-400">
                {getText(faq.answerKey, currentLocale) || ""}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
