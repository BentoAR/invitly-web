"use client";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/utils/analytics";

const WHATSAPP_NUMBER = "541157572713";
const WHATSAPP_MESSAGE = "Hola! Quiero información sobre Bento para mi negocio";

interface HeroB2BCtaProps {
  label: string;
}

export function HeroB2BCta({ label }: HeroB2BCtaProps) {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.whatsappClicked('b2b_hero')}
      className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-semibold text-base text-neutral-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FFA459]/25"
      style={{
        background: "linear-gradient(135deg, #FFA459 0%, #FF8A3D 100%)",
      }}
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}
