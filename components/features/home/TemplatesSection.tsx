export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import TemplatesSectionClient from "./TemplatesSectionClient";

export default async function TemplatesSection() {
  const t = await getTranslations("TemplatesSection");

  return <TemplatesSectionClient badge={t("badge")} title={t("title")} />;
}
