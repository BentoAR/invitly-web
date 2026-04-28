import { render, screen } from "@testing-library/react";
import Hero from "@/components/features/home/Hero";

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(async () => {
    const translations: Record<string, string | string[]> = {
      badge: "Invitaciones únicas y personalizadas",
      title: "Celebra tus momentos",
      subtitle:
        "Crea invitaciones digitales elegantes e interactivas que sorprenderán a tus invitados. Diseño personalizado, animaciones únicas y gestión de RSVP en una sola plataforma.",
      "button.categories": "Ver categorías",
      "button.contact": "Contactanos",
      "stats.designs": "Diseños",
      "stats.clients": "Clientes",
      "stats.satisfaction": "Satisfacción",
      words: ["especiales", "únicos"],
      imageAlt:
        "Decoración elegante de evento, ejemplo de invitación digital personalizada",
      "button.primary": "Crear mi invitación",
      "button.secondary": "Ver un ejemplo real",
      trust:
        "Sin tarjeta de crédito · +10.000 eventos en Argentina · Cancelas cuando quieras",
      whatsappMessage:
        "Hola! 👋 Me das una mano para hacer mi invitacion digital?",
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

    expect(screen.getByText(/Celebra tus momentos/i)).toBeInTheDocument();
  });

  it("debería tener un botón primario que enlace a #precios", async () => {
    const HeroComponent = await Hero();
    render(HeroComponent);

    const primaryButton = screen.getByLabelText(/crear mi invitación/i);
    const link = primaryButton.closest("a");
    expect(link).toHaveAttribute("href", "#precios");
  });

  it("debería tener un botón secundario que abra la demo real", async () => {
    const HeroComponent = await Hero();
    render(HeroComponent);

    const demoButton = screen.getByLabelText(/ver un ejemplo real/i);
    const link = demoButton.closest("a");

    expect(link).toHaveAttribute(
      "href",
      "https://inv.bento.com.ar/evento/4d50d8/lautaroydafne"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("debería mostrar las estadísticas correctamente", async () => {
    const HeroComponent = await Hero();
    render(HeroComponent);

    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("10K+")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
  });
});
