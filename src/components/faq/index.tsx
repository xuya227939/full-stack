import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getText, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

// FAQ page design - matches landing FAQ: badge, title, subtitle, 15 items in rounded cards
const FAQ_PAGE_ITEMS = [
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

export function FaqC(props: {
  id: string;
  locale?: Locale;
}) {
  const locale =
    props.locale && SUPPORTED_LOCALES[props.locale]
      ? props.locale
      : undefined;

  const t = (key: string, fallback?: string) =>
    getText(key, locale, fallback);

  // Dedicated FAQ page: use reference design (badge + title + subtitle + 15 cards)
  if (props.id === "faq") {
    return (
      <section id="faq" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-6 inline-flex rounded-full border border-gray-700 bg-gray-900/50 px-3 py-1 text-sm font-medium text-gray-300">
              {t("landing.faq.header") || "FAQs"}
            </span>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t("landing.faq.title") || "Frequently Asked Questions"}
            </h2>
            <p className="text-lg text-gray-400">
              {t("landing.faq.subtitle") ||
                "Quick answers to your questions about SnapVee."}
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_PAGE_ITEMS.map((faq, index) => (
              <details
                key={index}
                className="group rounded-lg border border-gray-800 bg-gray-900/30 px-6 py-4 transition-all hover:border-gray-700 hover:bg-gray-900/50"
              >
                <summary className="cursor-pointer list-none text-left text-lg font-medium text-white transition-colors group-open:text-purple-400 [&::-webkit-details-marker]:hidden">
                  {t(faq.questionKey) || ""}
                </summary>
                <div className="mt-3 text-base text-gray-400">
                  {t(faq.answerKey) || ""}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Platform-specific FAQ (embed in platform pages)
  const faqs: { question: string; answer: string }[] = [];

  if (props.id === "bilibili") {
    faqs.push({
      question: getText("faq.bilibili.tips"),
      answer: getText("faq.bilibili.subTips"),
    });
  }
  if (props.id === "youtube") {
    faqs.push({
      question: getText("faq.youtube.tips"),
      answer: getText("faq.youtube.subTips"),
    });
  }
  if (props.id === "x") {
    faqs.push({
      question: getText("faq.x.tips"),
      answer: getText("faq.x.subTips"),
    });
  }
  if (props.id === "tiktok") {
    faqs.push({
      question: getText("faq.tiktok.tips"),
      answer: getText("faq.tiktok.subTips"),
    });
  }
  if (props.id === "xiaohongshu") {
    faqs.push({
      question: getText("faq.xiaohongshu.tips"),
      answer: getText("faq.xiaohongshu.subTips"),
    });
  }
  if (props.id === "instagram") {
    faqs.push({
      question: getText("faq.instagram.tips"),
      answer: getText("faq.instagram.subTips"),
    });
  }
  if (props.id === "facebook") {
    faqs.push({
      question: getText("faq.facebook.tips"),
      answer: getText("faq.facebook.subTips"),
    });
  }
  if (props.id === "douyin") {
    faqs.push({
      question: getText("faq.douyin.tips"),
      answer: getText("faq.douyin.subTips"),
    });
  }
  if (props.id === "kuaishou") {
    faqs.push({
      question: getText("faq.kuaishou.tips"),
      answer: getText("faq.kuaishou.subTips"),
    });
  }
  if (props.id === "threads") {
    faqs.push({
      question: getText("faq.threads.tips"),
      answer: getText("faq.threads.subTips"),
    });
  }

  faqs.push(
    { question: getText("faq.tips1"), answer: getText("faq.subTips1") },
    { question: getText("faq.tips2"), answer: getText("faq.subTips2") },
    { question: getText("faq.tips3"), answer: getText("faq.subTips3") },
    { question: getText("faq.tips4"), answer: getText("faq.subTips4") },
    { question: getText("faq.tips5"), answer: getText("faq.subTips5") },
    { question: getText("faq.tips6"), answer: getText("faq.subTips6") },
    { question: getText("faq.tips7"), answer: getText("faq.subTips7") },
    { question: getText("faq.tips8"), answer: getText("faq.subTips8") },
  );

  return (
    <section id="faq" className="mt-8 text-white">
      <div className="container">
        <div className="pb-12 md:pb-20">
          <div className="mb-8 flex justify-center md:flex">
            <h2 className="font-hkgrotesk mb-4 text-center text-3xl font-extrabold text-white md:mb-0 md:text-4xl">
              {getText("faq.title")}
            </h2>
          </div>
          <Accordion type="multiple" className="mt-8">
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border-gray-700"
              >
                <AccordionTrigger className="text-left text-white hover:text-gray-200 hover:no-underline [&>svg]:text-gray-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
