import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import PricingB2BClient from "./PricingB2BClient";
import { DotFieldB2B } from "@/components/features/empresas/DotFieldB2B";
import { RevealOnScroll } from "@/components/features/empresas/RevealOnScroll";

export default async function PricingB2B() {
  const t = await getTranslations("PricingB2B");

  return (
    <section
      id="precios"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #171717 50%, #0a0a0a 100%)",
      }}
    >
      <DotFieldB2B />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,164,89,0.12), transparent 65%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(124,58,237,0.06), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grain opacity-15 pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20">
            Planes para tu negocio
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        <PricingB2BClient />
      </Container>
    </section>
  );
}
