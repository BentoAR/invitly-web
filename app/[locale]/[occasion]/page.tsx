import { Container } from "@/components/shared/Container";
import { TemplatesHeader } from "@/components/features/templates/TemplatesHeader";
import { TemplatesGrid } from "@/components/features/templates/TemplatesGrid";
import { CategorySelect } from "@/components/features/templates/CategorySelect";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { generatePageMetadata, siteConfig } from "@/src/utils/metadata";
import StructuredData from "@/components/shared/StructuredData";
import { getBreadcrumbSchema, getOrganizationSchema } from "@/src/utils/structuredData";
import { Suspense } from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getTemplates } from "@/services/templates";
import { getCategories } from "@/services/categories";

export const revalidate = 60;

const catalogNote =
  "Están organizadas por tipo de evento, pero la mayoría se puede adaptar a cualquier celebración.";

const occasionPages = {
  "invitaciones-digitales-bodas": {
    title: "Invitaciones digitales para bodas",
    metadataTitle: "Invitaciones Digitales para Bodas",
    description:
      "Diseños para compartir la historia de su boda y organizar cada detalle en un solo link: RSVP, mapa, playlist y mucho más.",
    categoryKey: "wedding",
    metadataDescription:
      "Elegí una invitación digital para tu boda y personalizala en minutos. Compartí un solo link con RSVP automático, mapa, playlist y toda la información de tu celebración.",
    keywords: [
      "invitaciones digitales para bodas",
      "invitaciones de boda digitales",
      "invitaciones de casamiento online",
      "RSVP para bodas",
      "invitaciones de boda Argentina",
    ],
  },
  "invitaciones-digitales-quince-anos": {
    title: "Invitaciones digitales para quinceañeras",
    metadataTitle: "Invitaciones Digitales para Quinceañeras",
    description:
      "Elegí un diseño para tus 15 y compartí toda la información de tu fiesta en un solo link: RSVP, mapa, playlist y mucho más.",
    categoryKey: "quinces",
    metadataDescription:
      "Creá una invitación digital para tus 15 años y personalizala en minutos. Compartí un solo link con RSVP automático, mapa, playlist y toda la información de tu fiesta.",
    keywords: [
      "invitaciones digitales para quinceañeras",
      "invitaciones digitales 15 años",
      "invitaciones para XV años",
      "invitaciones de quinceañera Argentina",
    ],
  },
  "invitaciones-digitales-cumpleanos": {
    title: "Invitaciones digitales para cumpleaños",
    metadataTitle: "Invitaciones Digitales para Cumpleaños",
    description:
      "Encontrá un diseño para tu cumpleaños y compartí todos los detalles en un solo link: RSVP, mapa, playlist y mucho más.",
    categoryKey: "birthday",
    metadataDescription:
      "Creá una invitación digital para tu cumpleaños y personalizala en minutos. Compartí un solo link con RSVP automático, mapa, playlist y toda la información de tu festejo.",
    keywords: [
      "invitaciones digitales para cumpleaños",
      "invitaciones de cumpleaños digitales",
      "invitaciones cumpleaños online Argentina",
      "RSVP cumpleaños",
    ],
  },
  "invitaciones-digitales-eventos-corporativos": {
    title: "Invitaciones digitales para eventos corporativos",
    metadataTitle: "Invitaciones Digitales para Eventos Corporativos",
    description:
      "Presentá tu evento corporativo y centralizá confirmaciones, ubicación y toda la información importante en un solo link.",
    categoryKey: "corporate",
    metadataDescription:
      "Creá invitaciones digitales para eventos corporativos. Compartí un solo link con RSVP, ubicación y toda la información de tu evento.",
    keywords: [
      "invitaciones digitales eventos corporativos",
      "invitaciones corporativas digitales",
      "invitaciones para eventos empresariales",
      "RSVP eventos corporativos",
    ],
  },
} as const;

type OccasionSlug = keyof typeof occasionPages;

function getOccasion(slug: string) {
  return occasionPages[slug as OccasionSlug];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; occasion: string }>;
}): Promise<Metadata> {
  const { locale, occasion } = await params;
  const occasionPage = getOccasion(occasion);

  if (locale !== "es" || !occasionPage) {
    return { robots: { index: false, follow: false } };
  }

  const path = `/${occasion}`;
  const metadata = generatePageMetadata({
    title: occasionPage.metadataTitle,
    description: occasionPage.metadataDescription,
    path,
    locale,
    keywords: [...occasionPage.keywords],
  });

  return {
    ...metadata,
    alternates: {
      canonical: `${siteConfig.url}/es${path}`,
      languages: {
        es: `${siteConfig.url}/es${path}`,
        "x-default": `${siteConfig.url}/es${path}`,
      },
    },
  };
}

export default async function OccasionInvitationsPage({
  params,
}: {
  params: Promise<{ locale: string; occasion: string }>;
}) {
  const { locale, occasion } = await params;
  const occasionPage = getOccasion(occasion);

  if (locale !== "es") {
    redirect("/en/templates");
  }

  if (!occasionPage) {
    notFound();
  }

  const queryClient = new QueryClient();
  const categories = await queryClient.fetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const category = categories.find(
    (item: { id: string; key: string }) => item.key === occasionPage.categoryKey
  );

  if (!category) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["templates", [category.id]],
    queryFn: () => getTemplates({ categories: [category.id] }),
  });
  await queryClient.prefetchQuery({
    queryKey: ["templates", []],
    queryFn: () => getTemplates(),
  });

  const path = `/${occasion}`;
  const structuredData = [
    getOrganizationSchema(locale),
    getBreadcrumbSchema(
      [
        { name: "Inicio", url: `${siteConfig.url}/es` },
        { name: occasionPage.title, url: `${siteConfig.url}/es${path}` },
      ],
      locale
    ),
  ];

  return (
    <section className="py-20 from-secondary to-background" role="main">
      <StructuredData data={structuredData} />
      <Container>
        <TemplatesHeader
          title={occasionPage.title}
          description={catalogNote}
          fullWidthDescription
        />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div className="h-12 w-60 animate-pulse rounded-lg bg-muted/50" />}>
            <CategorySelect categoryKey={occasionPage.categoryKey} />
          </Suspense>
          <TemplatesGrid categoryKey={occasionPage.categoryKey} />
          <section className="mt-16" aria-labelledby="more-templates-title">
            <h2
              id="more-templates-title"
              className="font-display font-normal leading-[1.1]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#200041",
                letterSpacing: "-0.03em",
              }}
            >
              Más diseños para personalizar
            </h2>
            <p className="mt-3 max-w-2xl text-base md:text-lg" style={{ color: "rgba(32,0,65,0.7)" }}>
              Elegí cualquiera de estas plantillas y adaptala a tu celebración.
            </p>
            <TemplatesGrid excludeCategoryKey={occasionPage.categoryKey} />
          </section>

          <nav aria-label="Otros tipos de evento" className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            {(Object.keys(occasionPages) as OccasionSlug[])
              .filter((slug) => slug !== occasion)
              .map((slug, index) => (
                <span key={slug} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" style={{ color: "rgba(32, 0, 65, 0.25)" }}>
                      ·
                    </span>
                  ) : null}
                  <a
                    href={`/es/${slug}`}
                    className="transition-colors hover:text-primary"
                    style={{ color: "rgba(32, 0, 65, 0.6)" }}
                  >
                    {occasionPages[slug].title}
                  </a>
                </span>
              ))}
          </nav>
        </HydrationBoundary>
      </Container>
    </section>
  );
}
