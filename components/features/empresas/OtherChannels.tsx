import { getTranslations } from "next-intl/server";
import { Heart, Camera, Briefcase, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

const APP_URL = "https://app.bento.com.ar";

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
    <section className="py-24 md:py-32 bg-[var(--muted-b2b)]">
      <Container>
        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid de 4 canales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-xl p-6 border border-[var(--border-b2b)] hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Ícono */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" strokeWidth={2} />
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {channel.title}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {channel.description}
                </p>

                {/* CTA */}
                <a href={`${APP_URL}/contact`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="w-full justify-start px-0 hover:text-primary">
                    {channel.cta} →
                  </Button>
                </a>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
