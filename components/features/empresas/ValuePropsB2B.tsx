import { getTranslations } from "next-intl/server";
import { DollarSign, Zap, Star } from "lucide-react";
import { Container } from "@/components/shared/Container";

export default async function ValuePropsB2B() {
  const t = await getTranslations("ValuePropsB2B");

  const props = [
    {
      icon: DollarSign,
      title: t("prop1Title"),
      description: t("prop1Description"),
    },
    {
      icon: Zap,
      title: t("prop2Title"),
      description: t("prop2Description"),
    },
    {
      icon: Star,
      title: t("prop3Title"),
      description: t("prop3Description"),
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <Container>
        {/* Título centrado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
        </div>

        {/* Grid de 3 columnas */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {props.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-[var(--card-b2b)] border border-[var(--border-b2b)] hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Ícono */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
                </div>

                {/* Contenido */}
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {prop.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
