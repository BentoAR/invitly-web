import { getTranslations } from "next-intl/server";
import { Heart, Camera, Briefcase, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll, StaggerItem } from "@/components/features/empresas/RevealOnScroll";
import { DotGrid } from "@/components/features/empresas/BackgroundPatterns";

const WHATSAPP_NUMBER = "5491139441413";
const WHATSAPP_MESSAGE = "Hola! Quiero información sobre Bento para mi negocio";

export default async function OtherChannels() {
  const t = await getTranslations("OtherChannelsB2B");

  const channels = [
    {
      icon: Heart,
      title: t("weddingPlanners.title"),
      description: t("weddingPlanners.description"),
      cta: t("weddingPlanners.cta"),
    },
    {
      icon: Camera,
      title: t("photographers.title"),
      description: t("photographers.description"),
      cta: t("photographers.cta"),
    },
    {
      icon: Briefcase,
      title: t("corporate.title"),
      description: t("corporate.description"),
      cta: t("corporate.cta"),
    },
    {
      icon: Sparkles,
      title: t("dressShops.title"),
      description: t("dressShops.description"),
      cta: t("dressShops.cta"),
    },
  ];

  return (
    <section className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden">
      <DotGrid className="opacity-30" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(255,164,89,0.05), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20">
            Para toda la industria
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
          {channels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <StaggerItem
                key={channel.title}
                index={idx}
                staggerDelay={0.08}
                className="group flex items-start gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#FFA459]/10 border border-[#FFA459]/20 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                  <Icon
                    className="w-6 h-6 text-[#FFA459]"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight group-hover:text-[#FFA459] transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-2">
                    {channel.description}
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFA459] hover:gap-2.5 transition-all"
                  >
                    {channel.cta} →
                  </a>
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
