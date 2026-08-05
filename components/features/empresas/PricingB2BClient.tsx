"use client";

import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link as LocaleLink } from "@/src/i18n/routing";
import { RevealOnScroll, StaggerItem } from "@/components/features/empresas/RevealOnScroll";

const WHATSAPP_NUMBER = "541157572713";
const WHATSAPP_MESSAGE = "Hola! Quiero información sobre Bento para mi negocio";

interface PricingTier {
  name: string;
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
      name: t("esencial.name"),
      description: t("esencial.description"),
      features: t.raw("esencial.features") as string[],
      cta: t("esencial.cta"),
      highlighted: false,
    },
    {
      name: t("profesional.name"),
      description: t("profesional.description"),
      features: t.raw("profesional.features") as string[],
      cta: t("profesional.cta"),
      badge: t("profesional.badge"),
      highlighted: true,
    },
    {
      name: t("escala.name"),
      description: t("escala.description"),
      features: t.raw("escala.features") as string[],
      cta: t("escala.cta"),
      highlighted: false,
    },
  ];

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-5">
        {tiers.map((tier, idx) => (
          <StaggerItem
            key={tier.name}
            index={idx}
            staggerDelay={0.1}
            className={`group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 ${
              tier.highlighted
                ? "border-2 border-[#FFA459] bg-gradient-to-b from-[#FFA459]/10 to-neutral-900 shadow-2xl shadow-[#FFA459]/20"
                : "border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/40"
            }`}
          >
            {tier.highlighted && (
              <div
                className="absolute -inset-px rounded-2xl opacity-60 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,164,89,0.4) 0%, transparent 50%, rgba(124,58,237,0.2) 100%)",
                }}
                aria-hidden="true"
              />
            )}

            {tier.badge && (
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap shadow-lg flex items-center gap-1.5 text-neutral-950 z-10"
                style={{
                  background: "linear-gradient(135deg, #FFA459 0%, #FF8A3D 100%)",
                }}
              >
                <Sparkles className="w-3 h-3" strokeWidth={2.5} />
                {tier.badge}
              </div>
            )}

            <div className="relative z-10 mb-6">
              <h3 className="text-base font-semibold text-neutral-400 mb-4 tracking-wide uppercase">
                {tier.name}
              </h3>
              <div className="mb-1 min-h-[2.25rem]">
                <span className="text-lg font-semibold text-[#FFA459] tracking-tight">
                  Consultanos
                </span>
              </div>
              <p className="text-sm text-neutral-400">{tier.description}</p>
            </div>

            <div
              className={`relative z-10 h-px mb-6 ${
                tier.highlighted ? "bg-[#FFA459]/20" : "bg-neutral-800"
              }`}
            />

            <ul className="relative z-10 space-y-3 mb-8">
              {tier.features.map((feature, featureIdx) => (
                <li key={featureIdx} className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      tier.highlighted
                        ? "bg-[#FFA459]/20"
                        : "bg-neutral-800 group-hover:bg-neutral-700 transition-colors"
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 ${
                        tier.highlighted
                          ? "text-[#FFA459]"
                          : "text-neutral-400"
                      }`}
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-sm text-neutral-300 leading-relaxed">
                    {feature.toLowerCase().includes("celebr") ? (
                      <LocaleLink
                        href="/pricing"
                        className="underline underline-offset-2 decoration-dotted hover:text-[#FFA459] transition-colors"
                      >
                        {feature}
                      </LocaleLink>
                    ) : (
                      feature
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative z-10 flex items-center justify-center gap-2 w-full h-12 rounded-xl font-semibold text-sm transition-all duration-300 group/btn ${
                tier.highlighted
                  ? "text-neutral-950 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FFA459]/30 hover:shadow-xl hover:shadow-[#FFA459]/40"
                  : "border-2 border-neutral-700 bg-transparent text-white hover:bg-neutral-800 hover:border-neutral-600"
              }`}
              style={
                tier.highlighted
                  ? {
                      background:
                        "linear-gradient(135deg, #FFA459 0%, #FF8A3D 100%)",
                    }
                  : undefined
              }
            >
              {tier.cta}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </StaggerItem>
        ))}
      </div>

      <RevealOnScroll className="text-center" delay={0.3}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/60 border border-neutral-800">
          <Check className="w-4 h-4 text-[#FFA459]" strokeWidth={2.5} />
          <p className="text-xs md:text-sm text-neutral-300">
            {t("trustLine")}
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}
