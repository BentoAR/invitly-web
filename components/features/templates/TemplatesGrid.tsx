"use client";
import { Category, Template } from "@/utils/types";
import Image from "next/image";
import { useTemplates } from "@/hooks/useTemplates";
import { useCategories } from "@/hooks/useCategories";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ErrorState } from "@/components/shared/states/ErrorState";
import { EmptyState } from "@/components/shared/states/EmptyState";
import { openWhatsApp } from "@/utils/openWhatsapp";
import { analytics } from "@/utils/analytics";
import { Play, ArrowRight } from "lucide-react";

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

        {/* Desktop: hover overlay with CTAs */}
        <div
          className="absolute inset-0 hidden md:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backdropFilter: "blur(2px)", background: "rgba(255,164,89,0.2)" }}
        >
          <a
            href={`https://inv.bento.com.ar/demo/${template.name}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.templateDemoClick(template.name, template.category?.display_name)}
          >
            <Button size="sm" className="gap-1.5 bg-white text-[#FFA459] hover:bg-white/90">
              <Play size={11} fill="currentColor" />
              {t("viewDemo")}
            </Button>
          </a>
          <Button
            size="sm"
            className="gap-1.5 bg-[#FFA459] text-white hover:bg-[#FFA459]/90"
            onClick={() => {
              analytics.templateGetClick(template.name, template.category?.display_name);
              openWhatsApp(t("getMessage", { name: template.display_name }));
            }}
          >
            {t("get")}
            <ArrowRight size={11} strokeWidth={2.5} />
          </Button>
        </div>

        {/* Mobile: always-visible gradient + CTAs */}
        <div className="md:hidden absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }}
        />
        <div className="md:hidden absolute bottom-0 left-0 right-0 p-3 z-10">
          <h3
            className="font-display font-normal text-white leading-tight mb-2"
            style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}
          >
            {template.display_name}
          </h3>
          <div className="flex gap-1.5">
            <a
              href={`https://inv.bento.com.ar/demo/${template.name}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.templateDemoClick(template.name, template.category?.display_name)}
              className="flex-1 flex items-center justify-center gap-1 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm py-1.5 text-white/90 font-medium"
              style={{ fontSize: "0.6rem", letterSpacing: "0.02em" }}
            >
              <Play size={9} fill="currentColor" />
              {t("viewDemo")}
            </a>
            <button
              onClick={() => {
                analytics.templateGetClick(template.name, template.category?.display_name);
                openWhatsApp(t("getMessage", { name: template.display_name }));
              }}
              className="flex-1 flex items-center justify-center gap-1 rounded-full bg-white py-1.5 text-neutral-900 font-semibold"
              style={{ fontSize: "0.6rem", letterSpacing: "0.02em" }}
            >
              {t("get")}
              <ArrowRight size={9} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer — desktop only */}
      <div className="hidden md:block p-3 md:p-4">
        <h3
          className="font-display font-normal leading-tight"
          style={{ fontSize: "0.95rem", color: "#200041", letterSpacing: "-0.01em" }}
        >
          {template.display_name}
        </h3>
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
