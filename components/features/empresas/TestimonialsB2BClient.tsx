"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  metric: string;
}

export default function TestimonialsB2BClient() {
  const t = useTranslations("TestimonialsB2B");
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      quote: t("testimonial1.quote"),
      author: t("testimonial1.author"),
      role: t("testimonial1.role"),
      metric: t("testimonial1.metric"),
    },
    {
      quote: t("testimonial2.quote"),
      author: t("testimonial2.author"),
      role: t("testimonial2.role"),
      metric: t("testimonial2.metric"),
    },
    {
      quote: t("testimonial3.quote"),
      author: t("testimonial3.author"),
      role: t("testimonial3.role"),
      metric: t("testimonial3.metric"),
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative rounded-2xl p-8 md:p-12 border border-neutral-800 bg-neutral-900/60 overflow-hidden group">
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,164,89,0.35), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <Quote className="w-10 h-10 text-[#FFA459] mb-6" strokeWidth={2} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <blockquote className="text-lg md:text-2xl text-white leading-relaxed mb-8 font-medium">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#FFA459]/15 border border-[#FFA459]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FFA459] font-bold text-base">
                    {currentTestimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {currentTestimonial.author}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-md bg-[#FFA459]/10 border border-[#FFA459]/20">
                <p className="text-xs font-semibold text-[#FFA459]">
                  {currentTestimonial.metric}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={goToPrevious}
          className="group/btn w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/60 flex items-center justify-center text-white hover:bg-neutral-800 hover:border-[#FFA459]/40 hover:text-[#FFA459] transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 group-hover/btn:-translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-8 bg-[#FFA459]"
                  : "w-2 bg-neutral-700 hover:bg-neutral-600"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="group/btn w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/60 flex items-center justify-center text-white hover:bg-neutral-800 hover:border-[#FFA459]/40 hover:text-[#FFA459] transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
