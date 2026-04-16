import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://app.bento.com.ar";
  const locales = ["es", "en"];

  const staticPages = [
    "",
    "/templates",
    "/contact",
    "/empresas",
  ];

  const urls: MetadataRoute.Sitemap = [];

  // Generate URLs for each locale
  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : page === "/templates" ? "daily" : "monthly",
        priority: page === "" ? 1 : page === "/templates" ? 0.9 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    });
  });

  return urls;
}
