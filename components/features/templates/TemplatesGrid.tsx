"use client";
import { Category, Template } from "@/utils/types";
import Image from "next/image";
import { useTemplates } from "@/hooks/useTemplates";
import { useCategories } from "@/hooks/useCategories";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { getTemplateDetail } from "@/src/content/templateDetails";
import { ErrorState } from "@/components/shared/states/ErrorState";
import { EmptyState } from "@/components/shared/states/EmptyState";
import { analytics } from "@/utils/analytics";
import { Play, ArrowRight } from "lucide-react";
import { getPersonalizationHref } from "@/src/config/personalization";

export function TemplatesGrid({
  categoryKey,
  excludeCategoryKey,
}: {
  categoryKey?: string;
  excludeCategoryKey?: string;
}) {
  const t = useTranslations("Templates");
  const selectedCategories = useCategoriesStore((s) => s.selectedCategories);
  const { data: categories } = useCategories();
  const selectedCategory = categoryKey
    ? categories?.find((category: Category) => category.key === categoryKey)
    : undefined;
  const categoriesForQuery = categoryKey
    ? selectedCategory
      ? [selectedCategory]
      : []
    : selectedCategories;
  const { data: templates = [], isLoading, error, refetch } = useTemplates(
    categoriesForQuery,
    { enabled: !categoryKey || Boolean(selectedCategory) }
  );

  if (isLoading || (categoryKey && !selectedCategory)) return <TemplatesGridSkeleton />;
  if (error) return <ErrorState message={t("error")} onRetry={() => refetch()} retryLabel={t("retry")} />;
  const visibleTemplates = excludeCategoryKey
    ? templates.filter((template: Template) => template.category?.key !== excludeCategoryKey)
    : templates;

  if (visibleTemplates.length === 0) return <EmptyState message={t("noResults")} />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
      {visibleTemplates.map((template: Template) => (
        <TemplateCard key={template.id} template={template} t={t} />
      ))}
    </div>
  );
}

function TemplateCard({ template, t }: { template: Template; t: ReturnType<typeof useTranslations> }) {
  const locale = useLocale();
  // La ficha propia hoy existe solo en español y solo para plantillas con
  // entrada editorial. Sin ficha, el título no es un link.
  const detailHref =
    locale === "es" && getTemplateDetail(template.name)
      ? `/es/templates/${template.name}`
      : null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white"
      style={{ boxShadow: "0 4px 20px rgba(32,0,65,0.08)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        {template.preview_url ? (
          <Image
            src={template.preview_url}
            alt={template.display_name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="font-mono uppercase rounded-full px-2 py-1"
            style={{
              fontSize: "0.5rem",
              letterSpacing: "0.2em",
              backgroundColor: "rgba(255,255,255,0.92)",
              color: "#9B5A00",
            }}
          >
            {template.category?.display_name}
          </span>
        </div>

      </div>

      {/* Acciones visibles también en mobile, sin tapar el diseño ni el nombre. */}
      <div className="p-3 md:p-4">
        <h3
          className="font-display font-normal leading-tight"
          style={{ fontSize: "0.95rem", color: "#200041", letterSpacing: "-0.01em" }}
        >
          {detailHref ? (
            <a href={detailHref} className="underline-offset-4 transition-colors hover:text-primary hover:underline">
              {template.display_name}
            </a>
          ) : (
            template.display_name
          )}
        </h3>
        <Button asChild size="sm" className="mt-4 w-full rounded-full bg-[var(--bento-orange)] px-2 text-xs text-white hover:bg-[var(--bento-orange-deep)] hover:text-white md:px-3 md:text-sm">
          <a
            href={getPersonalizationHref(template.name, "catalog")}
            onClick={() => {
              analytics.templateSelected(template.name, template.category?.display_name);
              analytics.personalizationStarted(template.name, template.category?.display_name, "catalog");
            }}
          >
            {t("get")}
            <ArrowRight size={12} strokeWidth={2.5} />
          </a>
        </Button>
        <a
          href={`https://inv.bento.com.ar/demo/${template.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-xs font-medium text-[var(--bento-ink)] underline-offset-4 transition-colors hover:text-[var(--bento-orange-deep)] hover:underline"
          onClick={() => analytics.templateDemoClicked(template.name, template.category?.display_name)}
        >
          <Play size={10} fill="currentColor" />
          {t("viewDemo")}
        </a>
      </div>
    </div>
  );
}

function TemplatesGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-muted animate-pulse">
          <div style={{ aspectRatio: "3/4" }} />
          <div className="p-3 md:p-4">
            <div className="h-4 bg-muted-foreground/10 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
