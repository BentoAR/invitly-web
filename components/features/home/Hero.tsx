import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import phoneTopImage from "@/assets/imgi_28_1771333296-compressor-png-image.png";
import phoneBottomImage from "@/assets/imgi_30_1770851752-bottom-png-image.png";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import HeroPhonesClient from "@/components/features/home/HeroPhonesClient";

export default async function Hero() {
  const t = await getTranslations("Hero");
  const words = t.raw("words") as string[];

  const stats = [
    { value: "500+", label: t("stats.designs") },
    { value: "10K+", label: t("stats.clients") },
    { value: "98%", label: t("stats.satisfaction") },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 grain overflow-hidden"
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
              <Link href="#invitaciones" passHref>
                <Button
                  size="lg"
                  className="shadow-elegant group"
                  aria-label={t("button.categories")}
                >
                  {t("button.categories")}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link
                href={`https://wa.me/5491112345678?text=${encodeURIComponent(
                  t("whatsappMessage")
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  aria-label={t("button.contact")}
                >
                  {t("button.contact")}
                  <PhoneCall className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
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
          <div className="order-2 lg:order-2">
            <HeroPhonesClient
              topImage={phoneTopImage}
              bottomImage={phoneBottomImage}
              imageAlt={t("imageAlt")}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
