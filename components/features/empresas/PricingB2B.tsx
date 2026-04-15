import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import PricingB2BClient from "./PricingB2BClient";

export default async function PricingB2B() {
  const t = await getTranslations("PricingB2B");

  return (
    <section id="precios" className="py-24 md:py-32 bg-background">
      <Container>
        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Client Component con los tiers */}
        <PricingB2BClient />
      </Container>
    </section>
  );
}
