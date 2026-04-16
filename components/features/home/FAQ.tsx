export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import { useLocale } from "next-intl";
import FAQClient from "./FAQClient";
import StructuredData from "@/components/shared/StructuredData";
import { getFAQSchema } from "@/src/utils/structuredData";

export default async function FAQ() {
  const t = await getTranslations("FAQ");
  const locale = useLocale();
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
