import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import phoneTopImage from "@/assets/imgi_28_1771333296-compressor-png-image.png";
import phoneBottomImage from "@/assets/imgi_30_1770851752-bottom-png-image.png";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import HeroPhonesClient from "@/components/features/home/HeroPhonesClient";
import HeroTypewriter from "@/components/features/home/HeroTypewriter";

const APP_URL = "https://app.bento.com.ar";
// TODO: reemplazar con el link de una invitación pública de demo (sin login)
const DEMO_INVITATION_URL = "#";

export default async function Hero() {
  const t = await getTranslations("Hero");
  const words = t.raw("words") as string[];

  const stats = [
    { value: "500+", label: t("stats.designs") },
    { value: "10K+", label: t("stats.clients") },
    { value: "98%", label: t("stats.satisfaction") },
  ];

  return (
    <>
      <section
        id="inicio"
        className="relative z-[1] min-h-screen flex items-center pt-16 grain overflow-hidden"
        role="main"
        aria-label={t("title") + " " + t("subtitle")}
      >
        <div
          className="absolute inset-0 bg-(--gradient-hero) opacity-60"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div
              data-hero="content"
              className="order-1 lg:order-1 text-center lg:text-left"
            >
              <h1
                data-hero="title"
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal mb-6 leading-tight"
              >
                {t("title")}{" "}
                <HeroTypewriter words={words} />
              </h1>

              <p
                data-hero="subtitle"
                className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
              >
                {t("subtitle")}
              </p>

              <div
                data-hero="cta"
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href={`${APP_URL}/register`} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="shadow-elegant group w-full sm:w-auto"
                    aria-label={t("button.primary")}
                  >
                    {t("button.primary")}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link
                  href={DEMO_INVITATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    aria-label={t("button.secondary")}
                  >
                    {t("button.secondary")}
                    <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-xs text-muted-foreground text-center lg:text-left">
                {t("trust")}
              </p>

              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="font-display text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right column: phones in mobile flow (lg:hidden) — desktop uses fixed overlay */}
            <div className="order-2 lg:order-2" aria-hidden="true">
              <div className="lg:hidden relative h-[340px] mt-4">
                <div className="absolute inset-x-0 mx-auto top-0 w-[72%] animate-float-slow drop-shadow-[0_24px_48px_rgba(0,0,0,0.22)]">
                  <Image
                    src={phoneTopImage}
                    alt={t("imageAlt")}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="absolute inset-x-0 mx-auto top-16 w-[64%] animate-float-medium drop-shadow-[0_20px_40px_rgba(0,0,0,0.20)]">
                  <Image
                    src={phoneBottomImage}
                    alt={t("imageAlt")}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Phones outside the hero section so they have their own stacking context (z:20),
          floating above HowItWorks (z:10) as it slides over the hero */}
      <HeroPhonesClient
        topImage={phoneTopImage}
        bottomImage={phoneBottomImage}
        imageAlt={t("imageAlt")}
      />
    </>
  );
}
