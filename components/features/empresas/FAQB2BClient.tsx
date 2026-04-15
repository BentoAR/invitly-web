"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQB2BClient() {
  const t = useTranslations("FAQB2B");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = t.raw("faqs") as FAQ[];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[var(--border-b2b)] overflow-hidden transition-all hover:border-primary/50"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-primary/5"
            >
              <span className="font-semibold text-foreground pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-5">
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
