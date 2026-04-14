export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import TestimonialsClient from "./TestimonialsClient";

export default async function Testimonials() {
  const t = await getTranslations("Testimonials");
  const testimonials = t.raw("testimonials") as Array<{
    name: string;
    location: string;
    eventType: string;
    eventDate: string;
    quote: string;
  }>;

  return (
    <TestimonialsClient
      badge={t("badge")}
      title={t("title")}
      subtitle={t("subtitle")}
      testimonials={testimonials}
    />
  );
}
