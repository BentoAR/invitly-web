import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import heroImage from "@/assets/hero-event.jpg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

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
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <Image
                src={heroImage}
                alt={t("imageAlt")}
                className="w-full h-[400px] lg:h-[600px] object-cover"
                width={1200}
                height={600}
                priority
                role="img"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight">
              {t("title")}{" "}
              <span className="relative inline-block text-primary">
                <span className="inset-0">{words[0]}</span>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
        </div>
      </Container>
    </section>
  );
}
