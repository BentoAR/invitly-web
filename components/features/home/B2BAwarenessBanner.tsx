export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import B2BAwarenessBannerClient from "./B2BAwarenessBannerClient";

export default async function B2BAwarenessBanner() {
  const t = await getTranslations("B2BAwarenessBanner");
  const benefits = t.raw("benefits") as Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  const cta = t.raw("cta") as {
    primary: string;
    secondary: string;
  };

  return (
    <B2BAwarenessBannerClient
      badge={t("badge")}
      title={t("title")}
      subtitle={t("subtitle")}
      benefits={benefits}
      cta={cta}
      trustLine={t("trustLine")}
    />
  );
}
