import { WithContext, Organization, WebSite, FAQPage, Question, Service } from "schema-dts";

export function getOrganizationSchema(locale: string): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://app.bento.com.ar/#organization",
    name: "Bento",
    legalName: "Bento - Invitaciones Digitales",
    url: "https://app.bento.com.ar",
    logo: {
      "@type": "ImageObject",
      url: "https://d14sb9d2krfjkl.cloudfront.net/media/LogoFavicon.svg",
      width: "512",
      height: "512",
    },
    description:
      locale === "es"
        ? "Plataforma líder de invitaciones digitales en Argentina. Crea invitaciones profesionales para bodas, cumpleaños y eventos corporativos con más de 200 plantillas premium."
        : "Leading digital invitation platform in Argentina. Create professional invitations for weddings, birthdays and corporate events with over 200 premium templates.",
    foundingDate: "2023",
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "AR",
      addressRegion: "Buenos Aires",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hola@bento.com.ar",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [
      "https://www.instagram.com/bento.invitaciones",
      "https://www.facebook.com/bento.invitaciones",
      // Add other social profiles
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function getWebSiteSchema(locale: string): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://app.bento.com.ar/#website",
    url: "https://app.bento.com.ar",
    name: "Bento",
    description:
      locale === "es"
        ? "Crea invitaciones digitales profesionales para cualquier evento. Más de 200 plantillas, RSVP automático y gestión completa de invitados."
        : "Create professional digital invitations for any event. Over 200 templates, automatic RSVP and complete guest management.",
    inLanguage: locale === "es" ? "es-AR" : "en-US",
    publisher: {
      "@type": "Organization",
      "@id": "https://app.bento.com.ar/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://app.bento.com.ar/{locale}/templates?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    } as any,
  };
}

export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
  locale: string
): WithContext<FAQPage> {
  const mainEntity: Question[] = faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
    inLanguage: locale === "es" ? "es-AR" : "en-US",
  };
}

export function getServiceSchema(locale: string): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://app.bento.com.ar/#service",
    name: locale === "es" ? "Invitaciones Digitales Bento" : "Bento Digital Invitations",
    description:
      locale === "es"
        ? "Servicio profesional de creación de invitaciones digitales para bodas, cumpleaños, eventos corporativos y celebraciones. Incluye RSVP automático, playlist colaborativa, álbum de fotos en tiempo real y gestión completa de invitados."
        : "Professional digital invitation creation service for weddings, birthdays, corporate events and celebrations. Includes automatic RSVP, collaborative playlist, real-time photo album and complete guest management.",
    provider: {
      "@type": "Organization",
      "@id": "https://app.bento.com.ar/#organization",
    },
    serviceType:
      locale === "es"
        ? "Plataforma de Invitaciones Digitales"
        : "Digital Invitation Platform",
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    audience: {
      "@type": "Audience",
      audienceType:
        locale === "es"
          ? "Personas organizando eventos, wedding planners, salones de eventos"
          : "People organizing events, wedding planners, event venues",
    },
    category: "Event Planning Software",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "es" ? "Plantillas de Invitaciones" : "Invitation Templates",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: locale === "es" ? "Bodas" : "Weddings",
          description:
            locale === "es"
              ? "Invitaciones elegantes y románticas para bodas"
              : "Elegant and romantic wedding invitations",
        },
        {
          "@type": "OfferCatalog",
          name: locale === "es" ? "Cumpleaños" : "Birthdays",
          description:
            locale === "es"
              ? "Invitaciones festivas para cumpleaños y celebraciones"
              : "Festive invitations for birthdays and celebrations",
        },
        {
          "@type": "OfferCatalog",
          name: locale === "es" ? "Eventos Corporativos" : "Corporate Events",
          description:
            locale === "es"
              ? "Invitaciones profesionales para eventos de empresa"
              : "Professional invitations for corporate events",
        },
        {
          "@type": "OfferCatalog",
          name: locale === "es" ? "XV Años" : "Quinceañera",
          description:
            locale === "es"
              ? "Invitaciones especiales para quinceañeras"
              : "Special quinceañera invitations",
        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "ARS",
      lowPrice: "0",
      highPrice: "250000",
      offerCount: "3",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  locale: string
): WithContext<any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getEventSchema(locale: string): WithContext<any> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bento",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      locale === "es"
        ? "Aplicación web para crear y gestionar invitaciones digitales para eventos. Compatible con todos los dispositivos, sin necesidad de descargar apps."
        : "Web application to create and manage digital event invitations. Compatible with all devices, no app download required.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ARS",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
    },
  };
}
