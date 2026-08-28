import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { Container } from "@/components/shared/Container";
import StructuredData from "@/components/shared/StructuredData";
import { generatePageMetadata, siteConfig } from "@/src/utils/metadata";
import {
  getBreadcrumbSchema,
  getOrganizationSchema,
  getTemplateCreativeWorkSchema,
} from "@/src/utils/structuredData";
import { getTemplates } from "@/services/templates";
import {
  TEMPLATE_DETAIL_SLUGS,
  getTemplateDetail,
  isDarkPlate,
} from "@/src/content/templateDetails";

export const revalidate = 3600;

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * FICHA DE PLANTILLA — contrato de dirección
 * ─────────────────────────────────────────────────────────────────────────────
 * THESIS: cada ficha adopta el mundo cromático de la plantilla que presenta,
 *   en vez de mostrar 17 diseños distintos dentro del mismo marco neutro. La
 *   paleta es CONTENIDO, con sus hex reales, porque lo único que diferencia a
 *   una plantilla de otra es su color y su carácter. Rechaza el default de
 *   "product detail page": screenshot a la izquierda, bullets a la derecha.
 *
 * OWN-WORLD: el sistema Bento sin tocar — tinta #200041, Playfair en clamps
 *   grandes con tracking negativo, Inter en el cuerpo, eyebrow mono en
 *   mayúsculas a 0.3em en bronce #bc8129, filete bronce, naranja #FFA459 como
 *   única acción primaria. La extensión es UNA sola región nueva: el "plate",
 *   cuyo fondo es el color real del template. El cromo Bento nunca cambia de
 *   color; solo el plate lo hace.
 *
 * STORY: alguien llega desde Google buscando un look ("invitaciones acuarela").
 *   Ve el diseño a escala en sus colores reales, entiende para qué evento es y
 *   qué incluye, y abre la demo en vivo o va a precios.
 *
 * FIRST VIEWPORT: breadcrumb mono. Dos columnas en desktop. Izquierda:
 *   eyebrow "{CATEGORÍA} · PLANTILLA", H1 display con el nombre, descripción
 *   real, filete bronce, la paleta como tres muestras con su hex en mono, y
 *   dos acciones (naranja "Ver demo en vivo", fantasma "Ver precios").
 *   Derecha: el plate — panel alto con el fondo propio del template, grano, y
 *   el preview flotando con sombra profunda.
 *
 * FORM: extensión de un mundo establecido; sin torneo de concepto.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const INK = "#200041";
const BRONZE = "#bc8129";
const ORANGE = "#FFA459";
const DEMO_BASE = "https://inv.bento.com.ar/demo";

interface ApiTemplate {
  id: string;
  name: string;
  display_name: string;
  preview_url: string;
  category?: { id: string; key: string; display_name: string };
}

async function findTemplate(slug: string) {
  const templates: ApiTemplate[] = await getTemplates();
  const template = templates.find((item) => item.name === slug);
  return { template, templates };
}

export async function generateStaticParams() {
  return TEMPLATE_DETAIL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const detail = getTemplateDetail(slug);

  if (locale !== "es" || !detail) {
    return { robots: { index: false, follow: false } };
  }

  const { template } = await findTemplate(slug);
  if (!template) {
    return { robots: { index: false, follow: false } };
  }

  const categoryName = template.category?.display_name ?? "eventos";
  const path = `/templates/${slug}`;

  const metadata = generatePageMetadata({
    title: `${template.display_name} — Invitación digital para ${categoryName}`,
    description: detail.description,
    path,
    locale,
    keywords: [
      `invitación digital ${template.display_name}`,
      `plantilla ${template.display_name}`,
      `invitaciones digitales ${categoryName}`,
      "invitaciones digitales Argentina",
    ],
    ogImage: template.preview_url,
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

/**
 * Ficha técnica, no contenido. Es idéntica en las 17 fichas a propósito: es
 * verdad común a todo el catálogo, y sirve para que quien cae de Google en una
 * plantilla suelta entienda que atrás hay algo más que una imagen linda. Se
 * mantiene deliberadamente compacta para no competir con lo único propio de
 * cada página —el diseño y su paleta— ni disfrazarse de texto único.
 */
const INCLUDED = ["RSVP automático", "Mapa del lugar", "Galería de fotos", "Playlist colaborativa"];

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (locale !== "es") {
    redirect("/en/templates");
  }

  const detail = getTemplateDetail(slug);
  if (!detail) {
    notFound();
  }

  const { template, templates } = await findTemplate(slug);
  if (!template) {
    notFound();
  }

  const categoryName = template.category?.display_name ?? "Eventos";
  const categoryKey = template.category?.key;
  const darkPlate = isDarkPlate(detail.plate);
  const plateInk = darkPlate ? "rgba(255,255,255,0.92)" : "rgba(32,0,65,0.75)";
  const plateHairline = darkPlate ? "rgba(255,255,255,0.16)" : "rgba(32,0,65,0.12)";

  const siblings = templates
    .filter((item) => item.name !== slug && item.category?.key === categoryKey)
    .filter((item) => getTemplateDetail(item.name))
    .slice(0, 4);

  const path = `/templates/${slug}`;
  const structuredData = [
    getOrganizationSchema(locale),
    getBreadcrumbSchema(
      [
        { name: "Inicio", url: `${siteConfig.url}/es` },
        { name: "Plantillas", url: `${siteConfig.url}/es/templates` },
        { name: template.display_name, url: `${siteConfig.url}/es${path}` },
      ],
      locale
    ),
    getTemplateCreativeWorkSchema({
      name: `${template.display_name} — invitación digital`,
      description: detail.description,
      image: template.preview_url,
      url: `${siteConfig.url}/es${path}`,
      genre: categoryName,
      siteUrl: siteConfig.url,
    }),
  ];

  return (
    <div className="pb-20 pt-28 md:pt-32">
      <StructuredData data={structuredData} />

      <Container>
        <nav aria-label="Miga de pan" className="mb-10">
          <ol
            className="flex flex-wrap items-center gap-2 font-mono uppercase"
            style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(32,0,65,0.45)" }}
          >
            <li>
              <Link href="/es" className="transition-colors hover:text-primary">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/es/templates" className="transition-colors hover:text-primary">
                Plantillas
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li style={{ color: BRONZE }}>{template.display_name}</li>
          </ol>
        </nav>

        {/*
          `grid-rows-[auto_1fr]` no es cosmético: el plate ocupa las dos filas y,
          con filas automáticas, su altura se reparte entre ambas y abre un hueco
          entre el H1 y la descripción. Fijando la fila 1 en `auto`, el sobrante
          cae en la fila 2 y el texto queda junto al título.
        */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16 lg:gap-y-6">
          {/* Identidad — encabezado */}
          <header className="lg:col-start-1 lg:row-start-1">
            <p
              className="font-mono uppercase"
              style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: BRONZE }}
            >
              {categoryName} · Plantilla
            </p>
            <h1
              className="mt-4 font-display font-normal leading-[1.02]"
              style={{
                fontSize: "clamp(3rem, 7vw, 5rem)",
                color: INK,
                letterSpacing: "-0.035em",
              }}
            >
              {template.display_name}
            </h1>
          </header>

          {/* El plate — única región que toma el color del template */}
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <figure
              className="grain relative overflow-hidden rounded-3xl"
              style={{ backgroundColor: detail.plate }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 rounded-2xl"
                style={{ border: `1px solid ${plateHairline}` }}
              />
              <div className="relative z-10 flex items-center justify-center px-6 py-10 sm:px-10 sm:py-14">
                <Image
                  src={template.preview_url}
                  alt={`Invitación digital ${template.display_name} — plantilla para ${categoryName.toLowerCase()}`}
                  width={900}
                  height={1600}
                  className="h-auto w-full max-w-[320px] rounded-xl sm:max-w-[380px]"
                  style={{ boxShadow: "0 32px 70px rgba(0,0,0,0.28)" }}
                  priority
                  sizes="(max-width: 1024px) 80vw, 380px"
                />
              </div>
              <figcaption
                className="relative z-10 flex items-center justify-between px-6 pb-5 font-mono uppercase sm:px-10"
                style={{ fontSize: "0.58rem", letterSpacing: "0.24em", color: plateInk, opacity: 0.75 }}
              >
                <span>{slug}</span>
                <span>{detail.plate}</span>
              </figcaption>
            </figure>
          </div>

          {/* Identidad — cuerpo */}
          <div className="lg:col-start-1 lg:row-start-2">
            <p
              className="max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(32,0,65,0.72)" }}
            >
              {detail.description}
            </p>

            <div className="mt-8 h-px w-16" style={{ backgroundColor: BRONZE, opacity: 0.6 }} />

            <section className="mt-8" aria-labelledby="palette-title">
              <h2
                id="palette-title"
                className="font-mono uppercase"
                style={{ fontSize: "0.6rem", letterSpacing: "0.28em", color: "rgba(32,0,65,0.45)" }}
              >
                Paleta
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
                {detail.palette.map((swatch) => (
                  <li key={`${swatch.hex}-${swatch.label}`} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-9 w-9 shrink-0 rounded-full"
                      style={{
                        backgroundColor: swatch.hex,
                        boxShadow: "inset 0 0 0 1px rgba(32,0,65,0.12)",
                      }}
                    />
                    <span className="leading-tight">
                      <span className="block text-sm font-medium" style={{ color: INK }}>
                        {swatch.label}
                      </span>
                      <span
                        className="block font-mono uppercase"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.14em", color: "rgba(32,0,65,0.45)" }}
                      >
                        {swatch.hex}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`${DEMO_BASE}/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: ORANGE, color: INK }}
              >
                Ver demo en vivo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <Link
                href="/es/pricing"
                className="inline-flex h-12 items-center justify-center rounded-full border px-7 text-sm font-medium transition-colors hover:bg-[rgba(32,0,65,0.04)]"
                style={{ borderColor: "rgba(32,0,65,0.2)", color: INK }}
              >
                Ver precios
              </Link>
            </div>

            <section className="mt-12" aria-labelledby="included-title">
              <h2
                id="included-title"
                className="font-mono uppercase"
                style={{ fontSize: "0.6rem", letterSpacing: "0.28em", color: "rgba(32,0,65,0.45)" }}
              >
                Incluido en todas las plantillas
              </h2>
              <ul className="mt-4 space-y-2.5">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "rgba(32,0,65,0.7)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: BRONZE }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Container>

      {siblings.length > 0 ? (
        <section className="mt-24" aria-labelledby="siblings-title">
          <Container>
            <h2
              id="siblings-title"
              className="font-display font-normal leading-[1.1]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: INK, letterSpacing: "-0.025em" }}
            >
              Otras plantillas de {categoryName.toLowerCase()}
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {siblings.map((sibling) => {
                const siblingDetail = getTemplateDetail(sibling.name);
                return (
                  <li key={sibling.id}>
                    <Link href={`/es/templates/${sibling.name}`} className="group block">
                      <div
                        className="grain relative overflow-hidden rounded-2xl"
                        style={{ backgroundColor: siblingDetail?.plate ?? "#fff3e7" }}
                      >
                        <div className="relative z-10 flex justify-center px-4 py-5 sm:px-5 sm:py-6">
                          <Image
                            src={sibling.preview_url}
                            alt={`Plantilla ${sibling.display_name}`}
                            width={600}
                            height={1067}
                            className="h-auto w-full max-w-[150px] rounded-lg transition-transform duration-300 group-hover:-translate-y-1"
                            style={{ boxShadow: "0 16px 32px rgba(0,0,0,0.22)" }}
                            sizes="(max-width: 640px) 45vw, 150px"
                          />
                        </div>
                      </div>
                      <p className="mt-3 font-display text-lg" style={{ color: INK }}>
                        {sibling.display_name}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/es/templates"
              className="mt-12 inline-flex items-center gap-2 text-sm transition-colors hover:text-primary"
              style={{ color: "rgba(32,0,65,0.6)" }}
            >
              ← Ver todas las plantillas
            </Link>
          </Container>
        </section>
      ) : null}
    </div>
  );
}
