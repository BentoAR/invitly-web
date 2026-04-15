import { getTranslations } from "next-intl/server";
import { Link2, Send, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";

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
    <section id="como-funciona" className="py-24 md:py-32 bg-[var(--muted-b2b)]">
      <Container>
        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Línea conectora (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative">
                {/* Card */}
                <div className="bg-white rounded-2xl p-8 border border-[var(--border-b2b)] shadow-sm hover:shadow-md transition-shadow">
                  {/* Número del step */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-primary/20">
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-white text-sm font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Contenido */}
                  <h3 className="text-lg font-bold text-foreground mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
