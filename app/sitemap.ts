import { MetadataRoute } from "next";
import { siteConfig } from "@/src/utils/metadata";
import { TEMPLATE_DETAIL_SLUGS } from "@/src/content/templateDetails";

const STATIC_PAGES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/templates", changeFrequency: "daily" as const, priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/empresas", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
];

const LOCALES = ["es", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  const localizedPages = LOCALES.flatMap((locale) =>
    STATIC_PAGES.map(({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          es: `${baseUrl}/es${path}`,
          en: `${baseUrl}/en${path}`,
          "x-default": `${baseUrl}/es${path}`,
        },
      },
    }))
  );

  const occasionPaths = [
    "/invitaciones-digitales-bodas",
    "/invitaciones-digitales-quince-anos",
    "/invitaciones-digitales-cumpleanos",
    "/invitaciones-digitales-eventos-corporativos",
  ];

  return [
    ...localizedPages,
    ...occasionPaths.map((path) => ({
      url: `${baseUrl}/es${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/es${path}`,
          "x-default": `${baseUrl}/es${path}`,
        },
      },
    })),
    ...TEMPLATE_DETAIL_SLUGS.map((slug) => ({
      url: `${baseUrl}/es/templates/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/es/templates/${slug}`,
          "x-default": `${baseUrl}/es/templates/${slug}`,
        },
      },
    })),
  ];
}
