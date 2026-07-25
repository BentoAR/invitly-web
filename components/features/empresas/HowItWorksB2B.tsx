import { getTranslations } from "next-intl/server";
import { Link2, Send, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll, StaggerItem } from "@/components/features/empresas/RevealOnScroll";
import { GridLines } from "@/components/features/empresas/BackgroundPatterns";

export default async function HowItWorksB2B() {
  const t = await getTranslations("HowItWorksB2B");

  const steps = [
    {
      icon: Link2,
      title: t("step1Title"),
      description: t("step1Description"),
    },
    {
      icon: Send,
      title: t("step2Title"),
      description: t("step2Description"),
    },
    {
      icon: Sparkles,
      title: t("step3Title"),
      description: t("step3Description"),
    },
  ];

  return (
    <section
      id="como-funciona"
      className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden"
    >
      <GridLines className="opacity-50" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,164,89,0.04) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20">
            Cómo funciona
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="hidden md:flex absolute top-8 left-[16.67%] right-[16.67%] items-center justify-between pointer-events-none"
            aria-hidden="true"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#FFA459] animate-dot-pulse"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-[#FFA459] animate-dot-pulse"
              style={{ animationDelay: "0.3s" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-[#FFA459] animate-dot-pulse"
              style={{ animationDelay: "0.6s" }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <StaggerItem
                  key={idx}
                  index={idx}
                  staggerDelay={0.15}
                  className="text-center group"
                >
                  <div className="relative inline-block mb-6">
                    <div
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#FFA459]/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, #FFA459 0%, #FF8A3D 100%)",
                      }}
                    >
                      <Icon
                        className="w-7 h-7 text-neutral-950"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-neutral-950 border-2 border-[#FFA459] text-[#FFA459] text-xs font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </StaggerItem>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
