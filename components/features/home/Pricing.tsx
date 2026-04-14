export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import PricingClient from "./PricingClient";

interface PlanFeature {
  label: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  cta: string;
  featured: boolean;
  features: PlanFeature[];
}

export default async function Pricing() {
  const t = await getTranslations("Pricing");
  const plans = t.raw("plans") as Plan[];
  const footer = t.raw("footer") as {
    line1: string;
    line2: string;
    line3: string;
    line3Link: string;
    priceNote: string;
  };

  return (
    <PricingClient
      badge={t("badge")}
      title={t("title")}
      subtitle={t("subtitle")}
      plans={plans}
      featuredBadge={t("featuredBadge")}
      footer={footer}
    />
  );
}
