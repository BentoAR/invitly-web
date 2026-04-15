import { getTranslations } from "next-intl/server";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

const APP_URL = "https://app.bento.com.ar";

export default async function HeroB2B() {
  const t = await getTranslations("HeroB2B");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradiente sutil B2B */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-[var(--muted-b2b)]" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenido */}
          <div className="max-w-2xl">
            {/* Badge */}
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full">
              {t("badge")}
            </span>

            {/* Headline */}
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground leading-tight">
              {t("title")}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("subtitle")}
            </p>

            {/* Value Props - 3 bullets */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <p className="font-semibold text-foreground mb-1">{t("value1Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("value1Description")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <p className="font-semibold text-foreground mb-1">{t("value2Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("value2Description")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <p className="font-semibold text-foreground mb-1">{t("value3Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("value3Description")}</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href={`${APP_URL}/contact`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto font-semibold">
                  {t("ctaPrimary")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="#como-funciona">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold">
                  {t("ctaSecondary")}
                </Button>
              </a>
            </div>

            {/* Trust line */}
            <p className="text-sm text-muted-foreground">
              {t("trustLine")}
            </p>
          </div>

          {/* Dashboard Mockup Placeholder */}
          <div className="relative">
            <div className="relative rounded-2xl border-2 border-[var(--border-b2b)] bg-white shadow-2xl overflow-hidden">
              {/* Header simulado */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b border-[var(--border-b2b)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <span className="font-semibold text-foreground">Bento Dashboard</span>
                  </div>
                  <div className="w-24 h-8 bg-primary/20 rounded animate-pulse" />
                </div>
              </div>

              {/* Contenido simulado */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-b2b)]">
                  <h3 className="font-semibold text-lg">Mis Eventos</h3>
                  <div className="w-32 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">+ Nuevo evento</span>
                  </div>
                </div>

                {/* Lista de eventos simulada */}
                {[
                  { name: "Boda Martínez-López", date: "15/05/2026", confirmados: "87/120" },
                  { name: "15 años Sofía Ruiz", date: "22/05/2026", confirmados: "45/80" },
                  { name: "Casamiento Fernández", date: "10/05/2026", confirmados: "156/150" },
                ].map((event, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted-b2b)] border border-[var(--border-b2b)]"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{event.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">{event.confirmados}</p>
                      <p className="text-xs text-muted-foreground">confirmados</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decoración sutil */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
