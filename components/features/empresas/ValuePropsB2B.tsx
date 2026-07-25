import { getTranslations } from "next-intl/server";
import { DollarSign, Zap, Trophy, BarChart3 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll, StaggerItem } from "@/components/features/empresas/RevealOnScroll";
import { DotGrid } from "@/components/features/empresas/BackgroundPatterns";

type Placement = "tall" | "small-1" | "small-2" | "wide";

const PLACEMENT_CLASSES: Record<Placement, string> = {
  tall: "md:col-start-1 md:row-start-1 md:row-span-2",
  "small-1": "md:col-start-2 md:row-start-1",
  "small-2": "md:col-start-2 md:row-start-2",
  wide: "md:col-start-1 md:row-start-3 md:col-span-2",
};

const TEXT_SIZES: Record<Placement, { title: string; desc: string }> = {
  tall: { title: "text-2xl md:text-3xl", desc: "text-base" },
  "small-1": { title: "text-lg", desc: "text-sm" },
  "small-2": { title: "text-lg", desc: "text-sm" },
  wide: { title: "text-xl", desc: "text-sm" },
};

export default async function ValuePropsB2B() {
  const t = await getTranslations("ValuePropsB2B");

  const props: Array<{
    icon: typeof DollarSign;
    title: string;
    description: string;
    placement: Placement;
  }> = [
    {
      icon: DollarSign,
      title: t("prop1Title"),
      description: t("prop1Description"),
      placement: "tall",
    },
    {
      icon: Zap,
      title: t("prop2Title"),
      description: t("prop2Description"),
      placement: "small-1",
    },
    {
      icon: Trophy,
      title: t("prop3Title"),
      description: t("prop3Description"),
      placement: "small-2",
    },
    {
      icon: BarChart3,
      title: t("prop4Title"),
      description: t("prop4Description"),
      placement: "wide",
    },
  ];

  return (
    <section className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden">
      <DotGrid className="opacity-40" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,164,89,0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20">
            Bento Empresas
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[1fr_1fr_auto] gap-4 md:gap-5">
          {props.map((prop, idx) => {
            const Icon = prop.icon;
            const sizes = TEXT_SIZES[prop.placement];
            return (
              <StaggerItem
                key={prop.title}
                index={idx}
                className={`group relative p-6 md:p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 hover:border-[#FFA459]/30 transition-all duration-500 overflow-hidden flex flex-col ${PLACEMENT_CLASSES[prop.placement]}`}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(255,164,89,0.1), transparent 60%)",
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#FFA459]/10 border border-[#FFA459]/20 flex items-center justify-center mb-5 group-hover:bg-[#FFA459]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon
                      className="w-6 h-6 text-[#FFA459]"
                      strokeWidth={2}
                    />
                  </div>

                  <h3
                    className={`font-bold text-white mb-3 tracking-tight ${sizes.title}`}
                  >
                    {prop.title}
                  </h3>
                  <p
                    className={`text-neutral-400 leading-relaxed ${sizes.desc}`}
                  >
                    {prop.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
