export const dynamic = "force-static";

import { getTranslations, getLocale } from "next-intl/server";
import FAQClient from "./FAQClient";
import StructuredData from "@/components/shared/StructuredData";
import { getFAQSchema } from "@/src/utils/structuredData";

export default async function FAQ() {
  const t = await getTranslations("FAQ");
  const locale = await getLocale();
  const faqs = t.raw("faqs") as Array<{
    question: string;
    answer: string;
  }>;

  const faqSchema = getFAQSchema(faqs, locale);

  return (
    <>
      <StructuredData data={faqSchema} />
      <FAQClient badge={t("badge")} title={t("title")} faqs={faqs} />
    </>
  );
}
