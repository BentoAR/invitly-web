import { Container } from "@/components/shared/Container";
import ContactTitle from "@/components/features/contact/ContactTitle";
import ContactInfo from "@/components/features/contact/ContactInfo";
import ContactForm from "@/components/features/contact/ContactForm";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import StructuredData from "@/components/shared/StructuredData";
import { getOrganizationSchema, getBreadcrumbSchema } from "@/src/utils/structuredData";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "es" ? "Contacto | Soporte Bento" : "Contact | Bento Support";

  const description =
    locale === "es"
      ? "Contacta al equipo de Bento. Soporte técnico, consultas sobre planes, asistencia para eventos corporativos y más. Respondemos en menos de 24 horas por WhatsApp, email o Instagram."
      : "Contact the Bento team. Technical support, plan inquiries, corporate event assistance and more. We respond within 24 hours via WhatsApp, email or Instagram.";

  const keywords =
    locale === "es"
      ? ["contacto bento", "soporte invitaciones digitales", "ayuda eventos", "asistencia técnica"]
      : ["bento contact", "digital invitations support", "event help", "technical assistance"];

  return generatePageMetadata({
    title,
    description,
    path: "/contact",
    locale,
    keywords,
  });
}

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbSchema = getBreadcrumbSchema(
    [
      { name: "Home", url: `https://app.bento.com.ar/${locale}` },
      { name: locale === "es" ? "Contacto" : "Contact", url: `https://app.bento.com.ar/${locale}/contact` },
    ],
    locale
  );

  const structuredData = [getOrganizationSchema(locale), breadcrumbSchema];

  return (
    <section className="py-20 bg-secondary/20" role="main">
      <StructuredData data={structuredData} />
      <Container>
        <ContactTitle />
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
