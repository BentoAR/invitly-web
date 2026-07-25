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
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "border-[#FFA459]/40 bg-neutral-900/80 shadow-lg shadow-[#FFA459]/5"
                : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/60"
            }`}
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="group w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-white pr-4 text-base group-hover:text-[#FFA459] transition-colors">
                {faq.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  isOpen
                    ? "bg-[#FFA459]/20 border border-[#FFA459]/40 rotate-180"
                    : "bg-neutral-800 border border-neutral-700 group-hover:border-[#FFA459]/30"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-colors ${
                    isOpen ? "text-[#FFA459]" : "text-neutral-400"
                  }`}
                />
              </div>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
