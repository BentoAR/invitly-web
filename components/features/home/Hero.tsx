import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import HeroPhonesClient from "@/components/features/home/HeroPhonesClient";
import HeroTypewriter from "@/components/features/home/HeroTypewriter";

const PHONE_FRONT_URL = "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/iMockup+-+iPhone+15+Pro+Max+costado.png";
const PHONE_LATERAL_URL = "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/iMockup+-+iPhone+15+Pro+Max+lateral.png";

const APP_URL = "https://app.bento.com.ar";
const DEMO_INVITATION_URL = "https://inv.bento.com.ar/demo/sakura";

export default async function Hero() {
  const t = await getTranslations("Hero");
  const words = t.raw("words") as string[];

  const stats = [
    { value: "RSVP", label: t("stats.rsvp") },
    { value: "∞", label: t("stats.guests") },
    { value: "<1hs", label: t("stats.support") },
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
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:items-center min-h-[600px]">
            {/* Phones: first on mobile (top), second column on desktop (right) */}
            <div aria-hidden="true" className="lg:order-2">
              <div className="lg:hidden relative h-[380px]">
                <div className="absolute right-[4%] top-8 w-[50%] md:w-[72%] drop-shadow-[0_24px_48px_rgba(0,0,0,0.22)]">
                  <Image
                    src={PHONE_FRONT_URL}
                    alt={t("imageAlt")}
                    width={400}
                    height={820}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="absolute left-[-5%] top-16 w-[82%] md:top-0 md:left-[2%] md:w-[42%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.20)] opacity-100 md:opacity-[0.88]">
                  <Image
                    src={PHONE_LATERAL_URL}
                    alt={t("imageAlt")}
                    width={340}
                    height={820}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
            {/* Content: second on mobile (below phones), first column on desktop (left) */}
            <div
              data-hero="content"
              className="text-center lg:text-left lg:order-1"
            >
              <h1
                data-hero="title"
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal mb-6 leading-tight"
              >
                <HeroTypewriter words={words} />{" "}
                {t("title")}
              </h1>

              <p
                data-hero="subtitle"
                className="text-base lg:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
              >
                {t("subtitle")}
              </p>

              <div
                data-hero="cta"
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a href="#precios">
                  <Button
                    size="lg"
                    className="shadow-elegant group w-full sm:w-auto"
                    aria-label={t("button.primary")}
                  >
                    {t("button.primary")}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </a>
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
          </div>
        </Container>
      </section>

      {/* Phones outside the hero section so they have their own stacking context (z:20),
          floating above HowItWorks (z:10) as it slides over the hero */}
      <HeroPhonesClient
        frontImage={PHONE_FRONT_URL}
        lateralImage={PHONE_LATERAL_URL}
        imageAlt={t("imageAlt")}
      />
    </>
  );
}
