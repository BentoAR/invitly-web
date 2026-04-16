import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories";

export function useCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    // Categorías son datos casi estáticos — staleTime muy alto
    staleTime: 60 * 60 * 1000, // 1 hora
    gcTime: 2 * 60 * 60 * 1000, // 2 horas
  });
  return { data, isLoading, error };
}
