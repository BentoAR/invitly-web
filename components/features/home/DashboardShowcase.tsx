export const dynamic = "force-static";

import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { DashboardCarousel } from "./DashboardCarousel";

interface Panel {
  title: string;
  description: string;
  alt: string;
}

const DASHBOARD_IMAGE_BASE_URL =
  "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media";

const PANEL_IMAGES = [
  `${DASHBOARD_IMAGE_BASE_URL}/03_invitados_desktop_mobile.webp`,
  `${DASHBOARD_IMAGE_BASE_URL}/ChatGPT%20Image%20Aug%204,%202026,%2005_27_01%20PM.webp`,
  `${DASHBOARD_IMAGE_BASE_URL}/11_playlist_frontal.webp`,
  `${DASHBOARD_IMAGE_BASE_URL}/mesas.webp`,
] as const;

const INK = "var(--bento-ink)";

/**
 * La demo interactiva ya explica el funcionamiento. Este bloque confirma el
 * alcance sin volver a convertir cada feature en una sección completa.
 */
export default async function DashboardShowcase() {
  const t = await getTranslations("DashboardShowcase");
  const panels = t.raw("panels") as Panel[];

  return (
    <section
      id="panel"
      aria-label={t("title")}
      className="relative py-16 md:py-20"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Container>
        <div className="mb-10 grid items-end gap-5 md:mb-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-12">
          <h2
            className="max-w-3xl font-display font-normal leading-[1.05]"
            style={{
              fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)",
              color: INK,
              letterSpacing: "-0.03em",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(32, 0, 65, 0.6)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        <div className="-mx-5 lg:hidden">
          <DashboardCarousel panels={panels} images={PANEL_IMAGES} />
        </div>

        <div className="hidden grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)] gap-8 lg:grid">
          <article>
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "16 / 10",
                backgroundColor: "var(--bento-peach)",
                boxShadow: "0 24px 58px rgba(32, 0, 65, 0.11)",
              }}
            >
              <Image
                src={PANEL_IMAGES[0]}
                alt={panels[0]?.alt ?? ""}
                fill
                className="object-cover object-top"
                sizes="58vw"
              />
            </div>
            <div className="mt-6 grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-8">
              <h3
                className="font-display text-3xl font-normal leading-tight"
                style={{ color: INK, letterSpacing: "-0.025em" }}
              >
                {panels[0]?.title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(32, 0, 65, 0.6)" }}
              >
                {panels[0]?.description}
              </p>
            </div>
          </article>

          <div className="flex flex-col justify-between gap-6">
            {panels.slice(1).map((panel, index) => (
              <article
                key={panel.title}
                className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-5 border-b pb-6 last:border-b-0 last:pb-0"
                style={{ borderColor: "rgba(32, 0, 65, 0.12)" }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    aspectRatio: "16 / 10",
                    backgroundColor: "var(--bento-peach)",
                    boxShadow: "0 14px 34px rgba(32, 0, 65, 0.08)",
                  }}
                >
                  <Image
                    src={PANEL_IMAGES[index + 1] ?? PANEL_IMAGES[0]}
                    alt={panel.alt}
                    fill
                    className="object-cover object-top"
                    sizes="20vw"
                  />
                </div>
                <div>
                  <h3
                    className="font-display text-2xl font-normal leading-tight"
                    style={{ color: INK, letterSpacing: "-0.02em" }}
                  >
                    {panel.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "rgba(32, 0, 65, 0.58)" }}
                  >
                    {panel.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
