"use client";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/utils/analytics";

const APP_URL = "https://app.bento.com.ar";

interface HeroB2BCtaProps {
  label: string;
}

export function HeroB2BCta({ label }: HeroB2BCtaProps) {
  return (
    <a
      href={`${APP_URL}/contact`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.b2bDemoClick()}
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
