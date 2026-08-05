import es from "@/messages/es/home.json";
import en from "@/messages/en/home.json";
import { getPrimaryCtaHref, isPrimaryCtaExternal, CTA_MODE } from "@/src/config/cta";

type Json = Record<string, unknown>;

const flatten = (obj: Json, prefix = ""): string[] =>
  Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === "object" && !Array.isArray(value)
      ? flatten(value as Json, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );

describe("Embudo de la home — contrato de contenido", () => {
  it("todos los bloques del embudo tienen copy en español", () => {
    const bloques = [
      "Hero",
      "Problem",
      "LiveDemo",
      "DashboardShowcase",
      "Features",
      "Testimonials",
      "Pricing",
      "RiskReversal",
      "FAQ",
      "B2BAwarenessBanner",
      "FinalCta",
    ];

    bloques.forEach((bloque) => {
      expect(es).toHaveProperty(bloque);
    });
  });

  it("es y en no se desincronizan", () => {
    expect(flatten(es as Json).sort()).toEqual(flatten(en as Json).sort());
  });

  it("el hero muestra el precio de entrada arriba del pliegue", () => {
    // En modelo pay-first el precio es la primera objeción: si desaparece de
    // acá, el visitante rebota una página más adelante y no nos enteramos.
    expect(es.Hero.trust).toMatch(/\$60\.000/);
  });

  it("el FAQ abre respondiendo la objeción del pago por adelantado", () => {
    expect(es.FAQ.faqs[0].question).toMatch(/pago antes/i);
  });

  it("la reversión de riesgo no promete devolución de dinero", () => {
    const texto = JSON.stringify(es.RiskReversal).toLowerCase();
    expect(texto).not.toMatch(/devolvemos|reembolso|devolución del dinero/);
  });
});

describe("Configuración central del CTA", () => {
  it("en pay-first el CTA primario va a pricing y es interno", () => {
    if (CTA_MODE !== "pay-first") return;

    expect(getPrimaryCtaHref("es")).toBe("/es/pricing");
    expect(getPrimaryCtaHref("en")).toBe("/en/pricing");
    expect(isPrimaryCtaExternal()).toBe(false);
  });
});
