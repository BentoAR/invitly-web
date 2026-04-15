"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const APP_URL = "https://app.bento.com.ar";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
  highlighted?: boolean;
}

export default function PricingB2BClient() {
  const t = useTranslations("PricingB2B");

  const tiers: PricingTier[] = [
    {
      name: t("basico.name"),
      price: "$250.000",
      description: t("basico.description"),
      features: t.raw("basico.features") as string[],
      cta: t("basico.cta"),
      highlighted: false,
    },
    {
      name: t("medio.name"),
      price: "$500.000",
      description: t("medio.description"),
      features: t.raw("medio.features") as string[],
      cta: t("medio.cta"),
      badge: t("medio.badge"),
      highlighted: true,
    },
    {
      name: t("full.name"),
      price: "$800.000",
      description: t("full.description"),
      features: t.raw("full.features") as string[],
      cta: t("full.cta"),
      highlighted: false,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Grid de tiers */}
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`relative rounded-2xl p-8 border-2 transition-all duration-300 hover:-translate-y-2 ${
              tier.highlighted
                ? "border-primary bg-gradient-to-b from-primary/5 to-white shadow-xl shadow-primary/10"
                : "border-[var(--border-b2b)] bg-white hover:border-primary/50 hover:shadow-lg"
            }`}
          >
            {/* Badge (si existe) */}
            {tier.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-white text-sm font-semibold rounded-full whitespace-nowrap shadow-lg">
                {tier.badge}
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
              <div className="mb-3">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-muted-foreground ml-2">/mes</span>
              </div>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, featureIdx) => (
                <li key={featureIdx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a href={`${APP_URL}/contact`} target="_blank" rel="noopener noreferrer">
              <Button
                className="w-full font-semibold group"
                variant={tier.highlighted ? "default" : "outline"}
                size="lg"
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        ))}
      </div>

      {/* Trust line */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {t("trustLine")}
        </p>
      </div>
    </div>
  );
}
