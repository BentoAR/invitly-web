export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import FAQClient from "./FAQClient";

export default async function FAQ() {
  const t = await getTranslations("FAQ");
  const faqs = t.raw("faqs") as Array<{
    question: string;
    answer: string;
  }>;

  return <FAQClient badge={t("badge")} title={t("title")} faqs={faqs} />;
}
