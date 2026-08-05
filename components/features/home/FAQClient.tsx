"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Container } from "@/components/shared/Container";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQClientProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

function FAQRow({
  item,
  isOpen,
  onToggle,
  answerId,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  answerId: string;
}) {
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "rgba(32, 0, 65, 0.12)" }}>
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-focus)] focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="text-base font-medium leading-snug md:text-lg" style={{ color: "var(--bento-ink)" }}>
          {item.question}
        </span>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
          style={{ backgroundColor: isOpen ? "#FFA459" : "var(--bento-peach)", color: "var(--bento-ink)" }}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p
              className="max-w-[68ch] pb-6 pr-12 text-sm leading-relaxed md:text-base"
              style={{ color: "rgba(32, 0, 65, 0.64)" }}
            >
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function FAQClient({ title, subtitle, faqs }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-16 md:py-24" style={{ backgroundColor: "var(--bento-peach)" }}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2
              className="max-w-xl font-display font-normal leading-[1.05]"
              style={{
                fontSize: "clamp(2.35rem, 4.6vw, 4rem)",
                color: "#200041",
                letterSpacing: "-0.035em",
              }}
            >
              {title}
            </h2>
            <p
              className="mt-5 max-w-md text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(32, 0, 65, 0.62)" }}
            >
              {subtitle}
            </p>
            <div className="mt-8 flex items-center gap-3" aria-hidden="true">
              <span className="h-px w-12" style={{ backgroundColor: "#FFA459" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#FFA459" }} />
            </div>
          </div>

          <div className="rounded-2xl bg-white px-5 sm:px-7 md:px-9">
            {faqs.map((faq, index) => (
              <FAQRow
                key={faq.question}
                item={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                answerId={`faq-answer-${index}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
