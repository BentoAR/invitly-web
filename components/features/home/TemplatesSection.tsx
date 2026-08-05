export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { InvitationsList } from "@/components/features/templates/InvitationsList";

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
      </Container>
    </section>
  );
}
