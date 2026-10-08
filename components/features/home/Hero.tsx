import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import HeroPhonesWrapper from "@/components/features/home/HeroPhonesWrapper";
import HeroActions from "@/components/features/home/HeroActions";
import {
  getPrimaryCtaHref,
  getPricingHref,
  isPrimaryCtaExternal,
  CTA_MODE,
} from "@/src/config/cta";

const HERO_VIDEO_WEBM_URL = "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/videos/hero/bento-hero-v2.webm";
const HERO_VIDEO_MOV_URL = "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/videos/hero/bento-hero-v2-safari.mov";
const HERO_VIDEO_POSTER_URL = "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/videos/hero/bento-hero-v2-poster.webp";

/**
 * Bloque 1 — Hero.
 *
 * La promesa de probar gratis aparece antes del catálogo. El destino del CTA
 * sigue centralizado en `src/config/cta.ts`: elegir diseño antes de registrarse.
 */
export default async function Hero() {
  const [t, locale] = await Promise.all([getTranslations("Hero"), getLocale()]);

  const stats = [
    { value: "01", label: t("stats.design") },
    { value: "02", label: t("stats.personalize") },
    { value: "03", label: t("stats.publish") },
  ];

  return (
    <>
      <section
        id="inicio"
        className="relative z-1 min-h-screen flex items-center pt-16 grain overflow-hidden"
        role="main"
        aria-label={t("title") + " " + t("subtitle")}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 1100px 620px at 18% 28%, rgba(255,164,89,0.22) 0%, transparent 68%), radial-gradient(ellipse 900px 520px at 82% 72%, rgba(255,140,70,0.16) 0%, transparent 70%)",
          }}
        />

        <Container className="relative z-10">
          <div className="flex flex-col gap-7 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12" style={{ minHeight: "min(600px, 80vh)" }}>
            <div aria-hidden="true" className="order-2 lg:order-2">
              <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[460px] lg:hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={HERO_VIDEO_POSTER_URL}
                  width={1080}
                  height={1080}
                  className="w-full h-auto"
                  aria-label={t("imageAlt")}
                >
                  <source src={HERO_VIDEO_WEBM_URL} type="video/webm" />
                  <source src={HERO_VIDEO_MOV_URL} type="video/quicktime" />
                </video>
              </div>
            </div>

            <div
              data-hero="content"
              className="order-1 pt-6 text-center lg:order-1 lg:pt-0 lg:text-left"
            >
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--bento-border)] bg-[var(--bento-peach)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.17em] text-[var(--bento-ink)] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--bento-orange)]" aria-hidden="true" />
                {t("eyebrow")}
              </p>
              <h1
                data-hero="title"
                className="font-display font-normal mb-5 leading-[1.06] text-[var(--bento-ink)]"
                style={{ fontSize: "clamp(2.55rem, 6.5vh, 4.5rem)", letterSpacing: "-0.035em" }}
              >
                {t("title")}
              </h1>

              <p
                data-hero="subtitle"
                className="mb-7 max-w-xl mx-auto text-[var(--bento-ink)]/75 lg:mx-0"
                style={{ fontSize: "clamp(1rem, 2vh, 1.2rem)", lineHeight: 1.65 }}
              >
                {t("subtitle")}
              </p>

              <HeroActions
                primaryLabel={t("button.primary")}
                secondaryLabel={t("button.secondary")}
                primaryHref={getPrimaryCtaHref(locale)}
                primaryExternal={isPrimaryCtaExternal()}
                ctaMode={CTA_MODE}
                pricingHref={getPricingHref(locale)}
              />

              <div className="mt-9 grid grid-cols-3 gap-4 border-t border-[var(--bento-border)] pt-6 max-w-md mx-auto lg:mx-0">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="font-display text-[var(--bento-orange-deep)]" style={{ fontSize: "clamp(1.2rem, 3vh, 1.7rem)" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-[var(--bento-ink)]/65 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <HeroPhonesWrapper
          webmSrc={HERO_VIDEO_WEBM_URL}
          movSrc={HERO_VIDEO_MOV_URL}
          poster={HERO_VIDEO_POSTER_URL}
          ariaLabel={t("imageAlt")}
        />
      </section>
    </>
  );
}
