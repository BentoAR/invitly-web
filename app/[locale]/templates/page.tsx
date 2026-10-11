import { Container } from "@/components/shared/Container";
import { TemplatesHeader } from "@/components/features/templates/TemplatesHeader";
import { TemplatesGrid } from "@/components/features/templates/TemplatesGrid";
import { CategorySelect } from "@/components/features/templates/CategorySelect";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageMetadata, siteConfig } from "@/src/utils/metadata";
import StructuredData from "@/components/shared/StructuredData";
import { getOrganizationSchema, getBreadcrumbSchema } from "@/src/utils/structuredData";
import { Suspense } from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getTemplates } from "@/services/templates";
import { getCategories } from "@/services/categories";

export const revalidate = 60;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ categories?: string | string[] }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { categories } = await searchParams;

  const title =
    locale === "es"
      ? "Plantillas de Invitaciones Digitales | Bento"
      : "Digital Invitation Templates | Bento";

  const description =
    locale === "es"
      ? "Explorá plantillas de invitaciones digitales para bodas, 15 años, cumpleaños y eventos. Elegí un diseño y personalizalo en Bento."
      : "Explore digital invitation templates for weddings, birthdays and events. Choose a design and customize it in Bento.";

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

  const metadata = generatePageMetadata({
    title,
    description,
    path: "/templates",
    locale,
    keywords,
  });

  return categories
    ? { ...metadata, robots: { index: false, follow: true } }
    : metadata;
}

export default async function Templates({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations("Templates");

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["templates", []],
      queryFn: () => getTemplates(),
    }),
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    }),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema(
    [
      { name: "Home", url: `${siteConfig.url}/${locale}` },
      { name: locale === "es" ? "Plantillas" : "Templates", url: `${siteConfig.url}/${locale}/templates` },
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
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div className="h-12 bg-muted/50 rounded-lg animate-pulse w-60" />}>
            <CategorySelect />
          </Suspense>
          <TemplatesGrid />
        </HydrationBoundary>
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("seoTitle")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("seoDescription")}</p>
          <p className="mt-3 text-sm text-muted-foreground">{t("seoFeatures")}</p>
        </div>
      </Container>
    </section>
  );
}
