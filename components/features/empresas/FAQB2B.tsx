import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import FAQB2BClient from "./FAQB2BClient";

export default async function FAQB2B() {
  const t = await getTranslations("FAQB2B");

  return (
    <section className="py-24 md:py-32 bg-[var(--muted-b2b)]">
      <Container>
        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full">
            {t("badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
        </div>

        {/* Client Component con accordion */}
        <FAQB2BClient />
      </Container>
    </section>
  );
}
