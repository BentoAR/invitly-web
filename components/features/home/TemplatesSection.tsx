export const dynamic = "force-static";

import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { InvitationsList } from "@/components/features/templates/InvitationsList";

const OCCASION_LINKS = [
  { slug: "invitaciones-digitales-bodas", labelKey: "occasionWeddings" },
  { slug: "invitaciones-digitales-quince-anos", labelKey: "occasionQuinces" },
  { slug: "invitaciones-digitales-cumpleanos", labelKey: "occasionBirthdays" },
  { slug: "invitaciones-digitales-eventos-corporativos", labelKey: "occasionCorporate" },
] as const;

/**
 * Bloque 5 — Plantillas.
 *
 * Reemplaza a `TemplatesSectionClient`, que tenía tres problemas de layout:
 *
 *   1. `md:-mt-[100vh]` — margen negativo de un viewport completo. Existía para
 *      solaparse con el pin de HowItWorks. Al desmontar HowItWorks, se comía la
 *      sección anterior: es el bug de "templates tapa todo".
 *   2. `zIndex: 30` + `isolation: isolate` — la ponía por encima del resto de
 *      la home sin necesidad.
 *   3. Un SVG de domo desplazado `-70vh` hacia arriba, con morph de `path`
 *      scrubeado por scroll, invadiendo la sección de arriba.
 *
 * Ahora es una sección normal en el flujo del documento.
 * `TemplatesSectionClient.tsx` sigue en el repo por si se quiere consultar.
 */
export default async function TemplatesSection() {
  const t = await getTranslations("TemplatesSection");
  const tFooter = await getTranslations("Footer");
  const locale = await getLocale();

  return (
    <section
      id="invitaciones"
      aria-label={t("title")}
      className="relative py-20 md:py-24"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2
            className="font-display font-normal leading-[1.06]"
            style={{
              fontSize: "clamp(2.25rem, 4.4vw, 3.5rem)",
              color: "#200041",
              letterSpacing: "-0.025em",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(32, 0, 65, 0.6)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        <InvitationsList />

        {locale === "es" ? (
          <nav
            aria-label={tFooter("eventTypes")}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm"
          >
            {OCCASION_LINKS.map((occasion, index) => (
              <span key={occasion.slug} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" style={{ color: "rgba(32, 0, 65, 0.25)" }}>
                    ·
                  </span>
                ) : null}
                <a
                  href={`/es/${occasion.slug}`}
                  className="transition-colors hover:text-primary"
                  style={{ color: "rgba(32, 0, 65, 0.6)" }}
                >
                  {tFooter(occasion.labelKey)}
                </a>
              </span>
            ))}
          </nav>
        ) : null}
      </Container>
    </section>
  );
}
