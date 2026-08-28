import { Container } from "@/components/shared/Container";
import { TemplatesHeader } from "@/components/features/templates/TemplatesHeader";
import { TemplatesGrid } from "@/components/features/templates/TemplatesGrid";
import { CategorySelect } from "@/components/features/templates/CategorySelect";
import FAQClient from "@/components/features/home/FAQClient";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { generatePageMetadata, siteConfig } from "@/src/utils/metadata";
import StructuredData from "@/components/shared/StructuredData";
import { getBreadcrumbSchema, getOrganizationSchema, getFAQSchema } from "@/src/utils/structuredData";
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
    intro:
      "Tu invitación de boda no es solo la tarjeta que ven tus invitados: es el lugar donde confirman asistencia, ven el mapa a la ceremonia y la fiesta, sugieren canciones para la pista y suben las fotos del día después. Elegís el diseño, cargás la info de los dos, y compartís un solo link por WhatsApp.",
    features: [
      {
        title: "RSVP para ambas familias",
        description:
          "Cada invitado confirma con un toque, y vos ves en tiempo real quién viene por parte de novio y quién por parte de novia, sin tener que preguntarle a nadie.",
      },
      {
        title: "Playlist para la pista",
        description:
          "Tus invitados proponen las canciones que quieren bailar. Vos moderás y armás la lista definitiva antes de la fiesta.",
      },
      {
        title: "Álbum del día después",
        description:
          "Todas las fotos que sacaron tus invitados, en un solo lugar, sin pedirlas por WhatsApp una semana después.",
      },
    ],
    faqSubtitle:
      "Lo que más preguntan las parejas antes de elegir su invitación.",
    faqs: [
      {
        question: "¿Puedo poner el nombre de los dos, o solo de uno?",
        answer:
          "Los dos. La invitación está pensada para mostrar la historia de la pareja, con espacio para fotos, fecha y el lugar de la ceremonia y la fiesta.",
      },
      {
        question: "¿Sirve si la ceremonia y la fiesta son en lugares distintos?",
        answer:
          "Sí, podés cargar las dos ubicaciones con su propio mapa, para que nadie se pierda ni llegue tarde a ninguna de las dos partes.",
      },
      {
        question: "¿Puedo separar la lista de invitados por ceremonia y por fiesta?",
        answer:
          "Sí, podés armar grupos distintos y mandar información específica a cada uno según corresponda.",
      },
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
    intro:
      "Tus 15 son tuyos, y la invitación también. Elegís el diseño, cargás la cuenta regresiva, el lugar de la fiesta y el dress code, y tus amigos confirman con un toque desde el celular. Nada de andar juntando confirmaciones por grupos de WhatsApp.",
    features: [
      {
        title: "Cuenta regresiva en vivo",
        description:
          "Tus invitados ven cuánto falta para la fiesta apenas abren el link, para que el hype no se corte.",
      },
      {
        title: "Dress code claro",
        description:
          "Cargás el código de vestimenta y el color que elegiste, así nadie llega con la ropa que no va.",
      },
      {
        title: "Playlist armada entre todos",
        description:
          "Tus amigos sugieren las canciones para la pista, vos aprobás cuáles suenan esa noche.",
      },
    ],
    faqSubtitle:
      "Lo que más preguntan las quinceañeras (y sus papás) antes de elegir la invitación.",
    faqs: [
      {
        question: "¿Puedo poner la coreografía o el vals en la invitación?",
        answer:
          "Podés armar el timeline del día con los momentos que quieras destacar, incluyendo el vals o la coreografía sorpresa.",
      },
      {
        question: "¿Mis papás pueden ver quién confirmó?",
        answer:
          "Sí, el panel de control lo pueden usar juntos — ideal para que ellos hagan el seguimiento de confirmaciones sin que vos tengas que estar pendiente todo el tiempo.",
      },
      {
        question: "¿Sirve para invitar por separado a familia y amigos?",
        answer: "Sí, podés armar grupos distintos y organizar la lista de invitados como quieras.",
      },
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
    intro:
      "Desde un cumple de 5 hasta los 50 de tu viejo, la lógica es la misma: elegís un diseño, cargás la fecha y el lugar, y mandás un link por WhatsApp. Tus invitados confirman solos y vos ves en tiempo real cuántos van a venir.",
    features: [
      {
        title: "Un diseño para cada edad",
        description:
          "Tenés plantillas para cumpleaños infantiles, adolescentes y adultos, cada una con su estética propia.",
      },
      {
        title: "RSVP sin perseguir a nadie",
        description:
          "Confirman con un toque desde el link. Vos ves la lista actualizada sin tener que llamar a nadie dos veces.",
      },
      {
        title: "Playlist de la fiesta",
        description: "Tus invitados proponen temas, vos armás la lista final antes de que arranque.",
      },
    ],
    faqSubtitle:
      "Lo que más preguntan antes de armar la invitación de cumpleaños.",
    faqs: [
      {
        question: "¿Sirve para cumpleaños infantiles?",
        answer:
          "Sí, tenemos diseños pensados específicamente para fiestas de chicos, con estética más lúdica y colorida.",
      },
      {
        question: "¿Puedo usarlo para una fiesta sorpresa?",
        answer:
          "Sí, podés mandar el link solo a quienes están invitados a la sorpresa y mantenerlo fuera del radar del cumpleañero.",
      },
      {
        question: "¿Hay límite de invitados?",
        answer:
          "Depende del plan que elijas — el plan Digital cubre hasta 100 invitados, y los planes superiores tienen más capacidad.",
      },
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
    intro:
      "Un lanzamiento, una convención, un evento de fin de año: la lógica es la misma que cualquier evento, pero con otra imagen. Cargás la identidad de tu empresa, gestionás confirmaciones por área o por invitado individual, y centralizás toda la logística en un solo panel.",
    features: [
      {
        title: "Imagen profesional",
        description: "Diseños pensados para eventos de empresa, sin la estética festiva de una fiesta de cumpleaños.",
      },
      {
        title: "Gestión de asistentes",
        description:
          "Confirmá por persona o por empresa invitada, y exportá la lista a Excel cuando la necesites para catering o accesos.",
      },
      {
        title: "Info centralizada",
        description:
          "Ubicación, agenda del evento y contacto de organización, todo en el mismo link que mandás por mail o WhatsApp.",
      },
    ],
    faqSubtitle:
      "Lo que más preguntan las empresas antes de elegir su invitación.",
    faqs: [
      {
        question: "¿Puedo poner el logo de mi empresa?",
        answer: "Sí, el plan A Medida permite un diseño 100% personalizado con tu identidad visual.",
      },
      {
        question: "¿Sirve para eventos con cupo limitado?",
        answer: "Sí, podés ver en tiempo real cuántos confirmaron y cerrar el RSVP cuando llegues al cupo.",
      },
      {
        question: "¿Puedo exportar la lista de invitados?",
        answer: "Sí, exportás a Excel cuando la necesites, útil para catering, accesos o credenciales.",
      },
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
    getFAQSchema([...occasionPage.faqs], locale),
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

          <section className="mt-16" aria-labelledby="occasion-about-title">
            <h2
              id="occasion-about-title"
              className="font-display font-normal leading-[1.1]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#200041", letterSpacing: "-0.025em" }}
            >
              Qué incluye tu invitación
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed md:text-lg" style={{ color: "rgba(32,0,65,0.75)" }}>
              {occasionPage.intro}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {occasionPage.features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border bg-white p-5" style={{ borderColor: "rgba(32,0,65,0.1)" }}>
                  <h3 className="text-base font-medium" style={{ color: "#200041" }}>
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(32,0,65,0.64)" }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </HydrationBoundary>
      </Container>

      <FAQClient
        title="Preguntas frecuentes"
        subtitle={occasionPage.faqSubtitle}
        faqs={[...occasionPage.faqs]}
      />

      <Container>
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
      </Container>
    </section>
  );
}
