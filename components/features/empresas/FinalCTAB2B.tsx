import { getTranslations } from "next-intl/server";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

const APP_URL = "https://app.bento.com.ar";
const WHATSAPP_NUMBER = "5491234567890"; // Reemplazar con número real

export default async function FinalCTAB2B() {
  const t = await getTranslations("FinalCTAB2B");

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-[var(--muted-b2b)] via-white/50 to-primary/5 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,164,89,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,164,89,0.05),transparent_50%)]" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título */}
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t("title")}
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href={`${APP_URL}/contact`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto font-semibold gap-2">
                <Calendar className="w-5 h-5" />
                {t("ctaPrimary")}
              </Button>
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quiero%20información%20sobre%20Bento%20para%20mi%20salón`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold gap-2">
                <MessageCircle className="w-5 h-5" />
                {t("ctaSecondary")}
              </Button>
            </a>
          </div>

          {/* Trust line */}
          <p className="text-sm text-muted-foreground">
            {t("trustLine")}
          </p>

          {/* Decoración visual */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto opacity-50">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground mt-1">Salones activos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Eventos gestionados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground mt-1">Satisfacción</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
