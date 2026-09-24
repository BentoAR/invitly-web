import { render, screen } from "@testing-library/react";
import Hero from "@/components/features/home/Hero";

jest.mock("@/components/features/home/HeroPhonesWrapper", () => () => null);

jest.mock("next-intl/server", () => ({
  getLocale: jest.fn(async () => "es"),
  getTranslations: jest.fn(async () => {
    const translations: Record<string, string | string[]> = {
      eyebrow: "Tu evento empieza gratis",
      title: "Invitaciones digitales que organizan tu evento entero.",
      subtitle: "Elegí un diseño, personalizá tu invitación y empezá a organizar tu evento sin pagar. Elegís un plan cuando quieras publicarlo.",
      "stats.design": "Elegí un diseño",
      "stats.personalize": "Probá cómo queda",
      "stats.publish": "Publicá al pagar",
      imageAlt:
        "Invitación digital de Bento abierta en un celular",
      "button.primary": "Elegir diseño y probar gratis",
      "button.secondary": "Ver precios",
    };

    const t = (key: string) => {
      const value = translations[key];
      return typeof value === "string" ? value : "";
    };

    t.raw = (key: string) => translations[key];

    return t;
  }),
}));

describe("Componente Hero", () => {
  it("debería renderizar la sección del héroe", async () => {
    const HeroComponent = await Hero();
    render(HeroComponent);

    expect(screen.getByRole("heading", { level: 1, name: "Invitaciones digitales que organizan tu evento entero." })).toBeInTheDocument();
    expect(screen.getByText(/Elegís un plan cuando quieras publicarlo/i)).toBeInTheDocument();
  });

  it("lleva al catálogo antes del registro o pago", async () => {
    const HeroComponent = await Hero();
    render(HeroComponent);

    const primaryButton = screen.getByLabelText(/elegir diseño y probar gratis/i);
    const link = primaryButton.closest("a");
    expect(link).toHaveAttribute("href", "/es/templates");
  });

  it("muestra precios como opción secundaria", async () => {
    const HeroComponent = await Hero();
    render(HeroComponent);

    const pricingButton = screen.getByLabelText(/ver precios/i);
    expect(pricingButton.closest("a")).toHaveAttribute("href", "/es/pricing");
  });

  it("explica que se prueba gratis y se publica con un plan", async () => {
    const HeroComponent = await Hero();
    render(HeroComponent);

    expect(screen.getByText(/organizar tu evento sin pagar/i)).toBeInTheDocument();
    expect(screen.getByText("Publicá al pagar")).toBeInTheDocument();
  });
});
