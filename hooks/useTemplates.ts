import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getTemplates } from "@/services/templates";
import { Category } from "@/utils/types";

export function useTemplates(categories: Category[]) {
  // Estabilizar query key para evitar refetches innecesarios
  const categoryIds = useMemo(
    () => categories.map((cat) => cat.id).sort(),
    [categories]
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["templates", categoryIds],
    queryFn: () => {
      return getTemplates(
        categoryIds.length ? { categories: categoryIds } : undefined
      );
    },
    // Datos estáticos del CMS — staleTime alto
    staleTime: 30 * 60 * 1000, // 30 minutos
    gcTime: 60 * 60 * 1000, // 1 hora
  });
  return { data, isLoading, error, refetch };
}
