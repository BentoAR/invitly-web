import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import TestimonialsB2BClient from "./TestimonialsB2BClient";

export default async function TestimonialsB2B() {
  const t = await getTranslations("TestimonialsB2B");

  return (
    <section className="py-24 md:py-32 bg-background">
      <Container>
        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
        </div>

        {/* Client Component con carousel */}
        <TestimonialsB2BClient />
      </Container>
    </section>
  );
}
