"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Handshake,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const benefitIcons = [LayoutDashboard, TrendingUp, Handshake];

interface B2BAwarenessBannerClientProps {
  badge: string;
  title: string;
  subtitle: string;
  benefits: Benefit[];
  cta: {
    primary: string;
    secondary: string;
  };
  trustLine: string;
}

export default function B2BAwarenessBannerClient({
  badge,
  title,
  subtitle,
  benefits,
  cta,
  trustLine,
}: B2BAwarenessBannerClientProps) {
  const locale = useLocale();

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-secondary/20 to-secondary/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.28em] uppercase mb-5" style={{ color: "#9B5A00" }}>
            <Building2 className="h-4 w-4" />
            {badge}
          </p>
          <h2
            className="font-display font-normal leading-[1.08] mb-4 max-w-3xl mx-auto"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#200041", letterSpacing: "-0.03em" }}
          >
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {benefits.map((benefit, i) => {
            const Icon = benefitIcons[i] ?? LayoutDashboard;
            return (
              <div
                key={benefit.title}
                className="flex flex-col items-start gap-3 p-6 rounded-xl border border-border/60 bg-background/80 backdrop-blur-sm"
              >
                <div className="h-11 w-11 rounded-xl bg-[#FFA459]/10 border border-[#FFA459]/20 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-[#9B5A00]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1 text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <Link href={`/${locale}/empresas`}>
            <Button size="lg" className="group">
              {cta.primary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground">{trustLine}</p>
      </div>
    </section>
  );
}
