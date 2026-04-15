export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import FeaturesScrollSequence from "./FeaturesScrollSequence";

export default async function Features() {
  const t = await getTranslations("Features");
  const features = t.raw("features") as Array<{
    title: string;
    description: string;
    icon?: string;
  }>;

  return (
    <FeaturesScrollSequence
      features={features}
      sectionTitle={t("title")}
    />
  );
}
