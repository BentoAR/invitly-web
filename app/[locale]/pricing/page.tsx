import { Suspense, lazy } from "react";
import type { Metadata } from "next";
import { generatePageMetadata, siteConfig } from "@/src/utils/metadata";
import StructuredData from "@/components/shared/StructuredData";
import { getOrganizationSchema, getBreadcrumbSchema, getServiceSchema } from "@/src/utils/structuredData";
import { PricingSkeleton } from "@/components/shared/skeletons/HomeSectionSkeletons";
import { TemplatesHeader } from "@/components/features/templates/TemplatesHeader";
import { Container } from "@/components/shared/Container";
import { getTranslations } from "next-intl/server";

const Pricing = lazy(() => import("@/components/features/home/Pricing"));

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "es"
      ? "Precios | Planes de Invitaciones Digitales"
      : "Pricing | Digital Invitation Plans";

  const description =
    locale === "es"
      ? "Conocé los planes de Bento para crear invitaciones digitales. Desde eventos pequeños hasta grandes celebraciones, tenemos la opción perfecta para vos."
      : "Explore Bento's plans for digital invitations. From small events to large celebrations, we have the perfect option for you.";

  return generatePageMetadata({
    title,
    description,
    path: "/pricing",
    locale,
    keywords: locale === "es"
      ? ["precios invitaciones digitales", "planes bento", "costo invitaciones online"]
      : ["digital invitation pricing", "bento plans", "online invitation cost"],
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbSchema = getBreadcrumbSchema(
    [
      { name: "Home", url: `${siteConfig.url}/${locale}` },
      {
        name: locale === "es" ? "Precios" : "Pricing",
        url: `${siteConfig.url}/${locale}/pricing`,
      },
    ],
    locale
  );

  const structuredData = [
    getOrganizationSchema(locale),
    getServiceSchema(locale),
    breadcrumbSchema
  ];

  const t = await getTranslations({ locale, namespace: "Pricing" });

  return (
    <div className="min-h-screen pt-20">
      <StructuredData data={structuredData} />
      <Container>
        <TemplatesHeader
          eyebrow={locale === "es" ? "Planes · 2025" : "Plans · 2025"}
          title={t("title")}
          description={t("subtitle")}
        />
      </Container>
      <Suspense fallback={<PricingSkeleton />}>
        <Pricing />
      </Suspense>
    </div>
  );
}
