import apiResponse from "@/utils/api";
import { unstable_cache } from "next/cache";

export const getTemplates = async (filters?: { categories?: string[] }) => {
  try {
    const params: Record<string, string> = {};

    if (filters?.categories && filters.categories.length > 0) {
      params.category_id = filters.categories.join(",");
    }

    const res = await apiResponse.get("/templates", { params });

    return res.data;
  } catch (error) {
    throw error;
  }
};

/**
 * La ficha SEO se prerenderiza para muchos slugs a la vez. Axios no participa
 * del Data Cache de Next, por lo que cada worker terminaba consultando la API
 * y podía gatillar su rate limit durante `next build`.
 */
export const getTemplatesForStaticGeneration = unstable_cache(
  async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_TEMPLATE_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_TEMPLATE_URL no está configurada");

    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/templates`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`No se pudieron obtener los templates: ${response.status}`);
    }

    return response.json();
  },
  ["templates-for-static-generation"],
  { revalidate: 3600 }
);
