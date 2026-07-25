import { getTranslations } from "next-intl/server";
import { Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { CountUp } from "@/components/features/empresas/CountUp";
import { RevealOnScroll } from "@/components/features/empresas/RevealOnScroll";
import { SideRaysB2B } from "@/components/features/empresas/SideRaysB2B";

const WHATSAPP_NUMBER = "5491139441413";
const WHATSAPP_MESSAGE = "Hola! Quiero información sobre Bento para mi negocio";

export default async function FinalCTAB2B() {
  const t = await getTranslations("FinalCTAB2B");
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #1a1410 50%, #0a0a0a 100%)",
      }}
    >
      <SideRaysB2B />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(10,10,10,0.5) 80%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grain opacity-15 pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <p className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20">
              Empezá hoy
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {t("title")}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="flex flex-col items-center justify-center gap-3 mb-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-semibold text-base text-neutral-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FFA459]/30 hover:shadow-xl hover:shadow-[#FFA459]/50"
                style={{
                  background:
                    "linear-gradient(135deg, #FFA459 0%, #FF8A3D 100%)",
                }}
              >
                <Calendar className="w-4 h-4" />
                {t("ctaPrimary")}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <p className="text-sm text-neutral-400 mb-16">{t("trustLine")}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.5}>
            <div className="pt-12 border-t border-neutral-800/60">
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-8">
                {t("statsTitle")}
              </p>
              <div className="grid grid-cols-3 gap-px bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-800 max-w-2xl mx-auto">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-neutral-950 p-6 md:p-8 group hover:bg-neutral-900/80 transition-colors">
                    <p className="text-2xl md:text-3xl font-bold text-[#FFA459] mb-1.5 tracking-tight">
                      <CountUp value={stat.value} duration={1.2} />
                    </p>
                    <p className="text-xs text-neutral-400 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <a
            href="#inicio"
            className="group inline-flex items-center gap-1.5 mt-12 text-sm text-neutral-500 hover:text-[#FFA459] transition-colors"
          >
            Volver arriba
            <ArrowRight className="w-3.5 h-3.5 -rotate-90 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </Container>
    </section>
  );
}
