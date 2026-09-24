import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import HeroPhonesWrapper from "@/components/features/home/HeroPhonesWrapper";
import HeroActions from "@/components/features/home/HeroActions";
import {
  getPrimaryCtaHref,
  getPricingHref,
  isPrimaryCtaExternal,
  CTA_MODE,
} from "@/src/config/cta";

const PHONE_FRONT_URL = "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/iMockup+-+iPhone+15+Pro+Max+costado.png";
const PHONE_LATERAL_URL = "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/iMockup+-+iPhone+15+Pro+Max+lateral.png";

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
              <div className="relative h-[280px] sm:h-[330px] lg:hidden">
                <div className="absolute right-[8%] top-5 w-[45%] drop-shadow-[0_24px_48px_rgba(0,0,0,0.22)]">
                  <Image
                    src={PHONE_FRONT_URL}
                    alt={t("imageAlt")}
                    width={1080}
                    height={1132}
                    className="w-full h-auto"
                    priority
                    fetchPriority="high"
                    sizes="45vw"
                  />
                </div>
                <div className="absolute left-[-2%] top-10 w-[72%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.20)] opacity-95">
                  <Image
                    src={PHONE_LATERAL_URL}
                    alt={t("imageAlt")}
                    width={1080}
                    height={1132}
                    className="w-full h-auto"
                    priority
                    fetchPriority="high"
                    sizes="72vw"
                  />
                </div>
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
          frontImage={PHONE_FRONT_URL}
          lateralImage={PHONE_LATERAL_URL}
          imageAlt={t("imageAlt")}
        />
      </section>
    </>
  );
}
