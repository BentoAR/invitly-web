"use client";
import { useCategories } from "@/hooks/useCategories";
import { useURLParams } from "@/hooks/useURLParams";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { Category } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";

const categoryLandingPaths: Record<string, string> = {
  wedding: "/es/invitaciones-digitales-bodas",
  quinces: "/es/invitaciones-digitales-quince-anos",
  birthday: "/es/invitaciones-digitales-cumpleanos",
  corporate: "/es/invitaciones-digitales-eventos-corporativos",
};

export function CategorySelect({ categoryKey }: { categoryKey?: string }) {
  const t = useTranslations("Templates");
  const locale = useLocale();
  const router = useRouter();
  const { data: categories } = useCategories();
  const { paramValues, updateParam } = useURLParams("categories");

  const addCategory = useCategoriesStore((state) => state.addCategory);
  const selectedCategories = useCategoriesStore(
    (state) => state.selectedCategories
  );
  const removeCategory = useCategoriesStore((state) => state.removeCategory);

  const handleAddCategory = (displayName: string) => {
    const catObj = categories?.find(
      (cat: Category) => cat.display_name === displayName
    );

    if (catObj) {
      const landingPath = categoryLandingPaths[catObj.key];
      if (locale === "es" && landingPath) {
        router.push(landingPath);
        return;
      }

      addCategory(catObj);

      const newSelected = [...selectedCategories, catObj]
        .map((c) => c.id)
        .filter((v, i, arr) => arr.indexOf(v) === i);

      updateParam(newSelected);
    }
  };

  const handleRemoveCategory = (idCategory: string) => {
    removeCategory(idCategory);

    const newSelected = selectedCategories
      .filter((c) => c.id !== idCategory)
      .map((c) => c.id);

    updateParam(newSelected);
  };

  useEffect(() => {
    if (!categories) return;

    paramValues.forEach((id) => {
      if (!selectedCategories.some((c) => c.id === id)) {
        const cat = categories.find((c: Category) => c.id === id);
        if (cat) addCategory(cat);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (!categories) return null;
  const activeCategory = categoryKey
    ? categories.find((category: Category) => category.key === categoryKey)
    : undefined;

  return (
    <div>
      <Select
        value={activeCategory?.display_name ?? ""}
        onValueChange={handleAddCategory}
        aria-label={t("filterValue")}
      >
        <SelectTrigger className="w-60">
          <SelectValue placeholder={t("filterValue")} />
        </SelectTrigger>
        <SelectContent className="w-60">
          {categories.map((cat: Category) => (
            <SelectItem
              key={cat.id}
              value={cat.display_name}
              checked={selectedCategories.some((c) => c.id === cat.id)}
            >
              {cat.display_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {categoryKey && locale === "es" && (
        <Link
          href="/es/templates"
          className="mt-4 inline-flex text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Ver todas las plantillas
        </Link>
      )}
      {selectedCategories.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedCategories.map((cat) => (
            <Badge key={cat.id} className="flex items-center gap-1">
              {cat.display_name}
              <button
                type="button"
                className="ml-1 rounded-full hover:bg-white/20 transition-colors p-0.5"
                onClick={() => handleRemoveCategory(cat.id)}
                aria-label={`Remove ${cat.display_name} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
