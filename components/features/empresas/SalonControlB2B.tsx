import { getTranslations } from "next-intl/server";
import { Users, Sparkles, BarChart3, Award } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll, StaggerItem } from "@/components/features/empresas/RevealOnScroll";
import { GridLines } from "@/components/features/empresas/BackgroundPatterns";

export default async function SalonControlB2B() {
  const t = await getTranslations("SalonControlB2B");

  const benefits = [
    {
      icon: Users,
      number: "01",
      title: t("benefit1Title"),
      description: t("benefit1Description"),
    },
    {
      icon: Sparkles,
      number: "02",
      title: t("benefit2Title"),
      description: t("benefit2Description"),
    },
    {
      icon: BarChart3,
      number: "03",
      title: t("benefit3Title"),
      description: t("benefit3Description"),
    },
    {
      icon: Award,
      number: "04",
      title: t("benefit4Title"),
      description: t("benefit4Description"),
    },
  ];

  return (
    <section className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden">
      <GridLines className="opacity-40" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,164,89,0.08), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20">
            {t("badge")}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-5">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <StaggerItem
                key={benefit.number}
                index={idx}
                staggerDelay={0.1}
                className="group relative p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/40 hover:border-[#FFA459]/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 blur-2xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,164,89,0.4), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFA459]/20 to-[#FFA459]/5 border border-[#FFA459]/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon
                        className="w-7 h-7 text-[#FFA459]"
                        strokeWidth={2}
                      />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-neutral-950 border border-[#FFA459]/40 flex items-center justify-center text-[10px] font-bold text-[#FFA459]">
                        {benefit.number}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
