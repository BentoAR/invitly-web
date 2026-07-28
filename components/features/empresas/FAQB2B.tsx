import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import FAQB2BClient from "./FAQB2BClient";
import { DotGrid } from "@/components/features/empresas/BackgroundPatterns";
import { RevealOnScroll } from "@/components/features/empresas/RevealOnScroll";

export default async function FAQB2B() {
  const t = await getTranslations("FAQB2B");

  return (
    <section className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden">
      <DotGrid className="opacity-30" />
      <Container>
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20">
            {t("badge")}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <FAQB2BClient />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
