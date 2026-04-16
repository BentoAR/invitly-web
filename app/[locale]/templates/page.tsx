import { Container } from "@/components/shared/Container";
import { TemplatesHeader } from "@/components/features/templates/TemplatesHeader";
import { InvitationsList } from "@/components/features/templates/InvitationsList";
import { CategorySelect } from "@/components/features/templates/CategorySelect";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import StructuredData from "@/components/shared/StructuredData";
import { getOrganizationSchema, getBreadcrumbSchema } from "@/src/utils/structuredData";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "es"
      ? "Plantillas de Invitaciones Digitales | +200 Diseños Premium"
      : "Digital Invitation Templates | +200 Premium Designs";

  const description =
    locale === "es"
      ? "Descubre más de 200 plantillas profesionales de invitaciones digitales para bodas, cumpleaños, eventos corporativos, XV años y más. Diseños elegantes, modernos y completamente personalizables. Crea tu invitación perfecta en minutos con Bento, la plataforma líder en Argentina."
      : "Discover over 200 professional digital invitation templates for weddings, birthdays, corporate events, quinceañeras and more. Elegant, modern and fully customizable designs. Create your perfect invitation in minutes with Bento, the leading platform in Argentina.";

  const keywords =
    locale === "es"
      ? [
          "plantillas de invitaciones digitales",
          "diseños de invitaciones",
          "invitaciones para bodas",
          "invitaciones para cumpleaños",
          "invitaciones corporativas",
          "plantillas personalizables",
          "diseños premium",
          "invitaciones XV años",
        ]
      : [
          "digital invitation templates",
          "invitation designs",
          "wedding invitations",
          "birthday invitations",
          "corporate invitations",
          "customizable templates",
          "premium designs",
          "quinceañera invitations",
        ];

  return generatePageMetadata({
    title,
    description,
    path: "/templates",
    locale,
    keywords,
  });
}

export default async function Templates({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Templates");

  const breadcrumbSchema = getBreadcrumbSchema(
    [
      { name: "Home", url: `https://app.bento.com.ar/${locale}` },
      { name: locale === "es" ? "Plantillas" : "Templates", url: `https://app.bento.com.ar/${locale}/templates` },
    ],
    locale
  );

  const structuredData = [getOrganizationSchema(locale), breadcrumbSchema];

  return (
    <section className="py-20 from-secondary to-background" role="main">
      <StructuredData data={structuredData} />
      <Container>
        <TemplatesHeader
          title={t("featuredInvitations")}
          description={t("featuredDescription")}
        />
        <CategorySelect />
        <InvitationsList />
      </Container>
    </section>
  );
}
