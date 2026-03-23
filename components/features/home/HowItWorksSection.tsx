export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import HowItWorksClient from "./HowItWorksClient";

export default async function HowItWorksSection() {
  const t = await getTranslations("HowItWorks");
  const steps = t.raw("steps") as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <HowItWorksClient
      steps={steps}
      sectionTitle={t("title")}
      subtitle={t("badge")}
    />
  );
}
