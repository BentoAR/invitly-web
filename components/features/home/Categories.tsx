import { Container } from "@/components/shared/Container";
import { WaveDivider } from "../../shared/WaveDivider";
import { getCategories } from "@/services/categories";
import { getTranslations } from "next-intl/server";
import { Category } from "@/utils/types";
import { CategoriesSwiper } from "./CategoriesSwiper";
import { ErrorState } from "@/components/shared/states/ErrorState";

export default async function Categories() {
  const t = await getTranslations("Categories");

  let categories: Category[] = [];
  let error: string | null = null;

  try {
    categories = await getCategories();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al cargar categorías";
    console.error("Error fetching categories:", e);
  }

  return (
    <>
      <WaveDivider flipY height={80} color="accent" />
      <section
        id="categorias"
        className="py-20 bg-linear-to-b from-accent to-background relative overflow-x-hidden"
        role="main"
        aria-label={t("title") + " " + t("description")}
      >
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
          <div className="h-auto">
            {error ? (
              <ErrorState message={error} />
            ) : (
              <CategoriesSwiper categories={categories} />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
