export const dynamic = "force-static";

import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { getPrimaryCtaHref, isPrimaryCtaExternal, CTA_MODE } from "@/src/config/cta";
import FinalCtaActions from "./FinalCtaActions";

/**
 * Bloque 12 — CTA final.
 *
 * Antes de este rediseño la home terminaba en el FAQ: el visitante llegaba al
 * fondo, resolvía sus dudas y no tenía dónde hacer click.
 *
 * Nota de identidad: este bloque era violeta oscuro. El violeta profundo es el
 * lenguaje de `/empresas`, no el de Bento. Bento es modo claro; el cierre usa
 * el crema cálido de la marca con el naranja como único acento.
 */
export default async function FinalCta() {
  const [t, locale] = await Promise.all([getTranslations("FinalCta"), getLocale()]);

  return (
    <section
      id="empezar"
      aria-label={t("title")}
      className="relative py-24 md:py-32 grain overflow-hidden"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 1000px 520px at 50% 100%, rgba(255,164,89,0.30) 0%, rgba(255,190,130,0.14) 42%, transparent 72%)",
        }}
      />
      <Container className="relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-display font-normal leading-[1.06] mb-5"
            style={{
              fontSize: "clamp(2.1rem, 5vw, 3.5rem)",
              color: "#200041",
              letterSpacing: "-0.025em",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base md:text-lg mb-9"
            style={{ color: "rgba(32, 0, 65, 0.6)" }}
          >
            {t("subtitle")}
          </p>

          <FinalCtaActions
            primaryLabel={t("button.primary")}
            secondaryLabel={t("button.secondary")}
            primaryHref={getPrimaryCtaHref(locale)}
            primaryExternal={isPrimaryCtaExternal()}
            ctaMode={CTA_MODE}
            whatsappMessage={t("whatsappMessage")}
          />

          <p className="mt-6 text-xs" style={{ color: "rgba(32, 0, 65, 0.45)" }}>
            {t("trust")}
          </p>
        </div>
      </Container>
      <span id="contacto" aria-hidden="true" />
    </section>
  );
}
