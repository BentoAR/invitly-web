"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export default function TestimonialsB2BClient() {
  const t = useTranslations("TestimonialsB2B");
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      quote: t("testimonial1.quote"),
      author: t("testimonial1.author"),
      role: t("testimonial1.role"),
    },
    {
      quote: t("testimonial2.quote"),
      author: t("testimonial2.author"),
      role: t("testimonial2.role"),
    },
    {
      quote: t("testimonial3.quote"),
      author: t("testimonial3.author"),
      role: t("testimonial3.role"),
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
      {/* Card del testimonial */}
      <div className="bg-white rounded-2xl p-10 md:p-12 border border-[var(--border-b2b)] shadow-lg relative">
        {/* Quote icon */}
        <Quote className="w-12 h-12 text-primary/20 mb-6" strokeWidth={2} />

        {/* Quote */}
        <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-medium">
          "{currentTestimonial.quote}"
        </blockquote>

        {/* Autor */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold text-lg">
              {currentTestimonial.author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{currentTestimonial.author}</p>
            <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-primary" : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
