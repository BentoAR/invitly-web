import { Metadata } from "next";

export const siteConfig = {
  name: "Bento",
  description: {
    es: "Crea invitaciones digitales profesionales para bodas, cumpleaños, eventos corporativos y más. Más de 200 plantillas premium, RSVP automático, playlist colaborativa y gestión completa de invitados. La plataforma #1 de invitaciones digitales en Argentina.",
    en: "Create professional digital invitations for weddings, birthdays, corporate events and more. Over 200 premium templates, automatic RSVP, collaborative playlist and complete guest management. The #1 digital invitation platform in Argentina.",
  },
  url: "https://app.bento.com.ar",
  ogImage: "https://d14sb9d2krfjkl.cloudfront.net/media/og-image.jpg",
  keywords: {
    es: [
      "invitaciones digitales",
      "invitaciones para eventos",
      "invitaciones online argentina",
      "invitaciones de boda digitales",
      "invitaciones de cumpleaños digitales",
      "tarjetas digitales para eventos",
      "crear invitaciones online",
      "invitaciones whatsapp",
      "plantillas de invitaciones",
      "rsvp automático",
      "gestión de eventos",
      "invitaciones profesionales",
      "invitaciones personalizadas",
      "alternativa a invitaciones impresas",
      "invitaciones ecológicas",
      "confirmación de asistencia online",
      "wedding planner argentina",
      "salones de eventos",
    ],
    en: [
      "digital invitations",
      "event invitations",
      "online invitations argentina",
      "digital wedding invitations",
      "digital birthday invitations",
      "event cards online",
      "create invitations online",
      "whatsapp invitations",
      "invitation templates",
      "automatic rsvp",
      "event management",
      "professional invitations",
      "personalized invitations",
      "alternative to printed invitations",
      "eco-friendly invitations",
      "online rsvp",
      "wedding planner argentina",
      "event venues",
    ],
  },
};

interface GenerateMetadataParams {
  title: string;
  description: string;
  path: string;
  locale: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  keywords = [],
  ogImage = siteConfig.ogImage,
  noIndex = false,
}: GenerateMetadataParams): Metadata {
  const fullTitle = title ? `${title} | Bento` : "Bento";
  const url = `${siteConfig.url}/${locale}${path}`;
  const canonicalPath = `/${locale}${path}`;

  const allKeywords = [
    ...keywords,
    ...(locale === "es" ? siteConfig.keywords.es : siteConfig.keywords.en),
  ];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(", "),
    authors: [{ name: "Bento", url: siteConfig.url }],
    creator: "Bento",
    publisher: "Bento",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      languages: {
        es: `/es${path}`,
        en: `/en${path}`,
        'x-default': `/es${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Bento",
      locale: locale === "es" ? "es_AR" : "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@bentoinvitaciones",
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    verification: {
      google: "google-site-verification-code", // TODO: Add actual verification code
    },
  };
}
