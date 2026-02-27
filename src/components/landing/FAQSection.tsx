"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { getText } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    questionKey: "faq.tips1",
    answerKey: "faq.subTips1",
  },
  {
    questionKey: "faq.tips2",
    answerKey: "faq.subTips2",
  },
  {
    questionKey: "faq.tips3",
    answerKey: "faq.subTips3",
  },
  {
    questionKey: "faq.tips4",
    answerKey: "faq.subTips4",
  },
  {
    questionKey: "faq.tips5",
    answerKey: "faq.subTips5",
  },
  {
    questionKey: "faq.tips6",
    answerKey: "faq.subTips6",
  },
  {
    questionKey: "faq.tips7",
    answerKey: "faq.subTips7",
  },
  {
    questionKey: "faq.tips8",
    answerKey: "faq.subTips8",
  },
  {
    questionKey: "faq.tips9",
    answerKey: "faq.subTips9",
  },
  {
    questionKey: "faq.tips10",
    answerKey: "faq.subTips10",
  },
  {
    questionKey: "faq.tips11",
    answerKey: "faq.subTips11",
  },
  {
    questionKey: "faq.tips12",
    answerKey: "faq.subTips12",
  },
  {
    questionKey: "faq.tips13",
    answerKey: "faq.subTips13",
  },
  {
    questionKey: "faq.tips14",
    answerKey: "faq.subTips14",
  },
  {
    questionKey: "faq.tips15",
    answerKey: "faq.subTips15",
  },
];

export function FAQSection() {
  const { currentLocale } = useLocale();

  return (
    <section id="faq" className="relative bg-black py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
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
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-gray-800 bg-gray-900/30 px-6 py-2 transition-all hover:bg-gray-900/50"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:no-underline [&[data-state=open]]:text-purple-400">
                  {getText(faq.questionKey, currentLocale) || ""}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-400">
                  {getText(faq.answerKey, currentLocale) || ""}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
