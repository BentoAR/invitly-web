import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import DashboardShowcaseB2BClient from "./DashboardShowcaseB2BClient";
import { GridLines } from "@/components/features/empresas/BackgroundPatterns";
import { RevealOnScroll } from "@/components/features/empresas/RevealOnScroll";

export default async function DashboardShowcaseB2B() {
  const t = await getTranslations("DashboardShowcaseB2B");

  return (
    <section className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden">
      <GridLines className="opacity-50" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(255,164,89,0.08), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 30%, rgba(124,58,237,0.05), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-14">
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20">
            Tu panel de control
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        <DashboardShowcaseB2BClient />
      </Container>
    </section>
  );
}
