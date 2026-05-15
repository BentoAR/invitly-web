"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    >
      <Button size="lg" className="w-full sm:w-auto font-semibold">
        {label}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </a>
  );
}
