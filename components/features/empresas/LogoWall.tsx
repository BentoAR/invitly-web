import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";

export default async function LogoWall() {
  const t = await getTranslations("LogoWallB2B");

  // Placeholders de logos de salones (SVG simples)
  const logos = [
    "Salón Las Cañitas",
    "Espacio Eventos",
    "La Quinta",
    "Villa Marina",
    "Salón Premier",
    "Casa Rosada Events",
  ];

  return (
    <section className="py-16 bg-[var(--muted-b2b)] border-y border-[var(--border-b2b)]">
      <Container>
        <p className="text-center text-sm font-semibold text-muted-foreground mb-10 uppercase tracking-wide">
          {t("title")}
        </p>

        {/* Grid de logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-4 rounded-lg bg-white/50 border border-[var(--border-b2b)] hover:bg-white transition-colors"
            >
              <div className="text-center">
                {/* SVG placeholder simple */}
                <svg
                  className="w-full h-12 mx-auto mb-2"
                  viewBox="0 0 120 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="10" y="10" width="20" height="20" rx="4" fill="currentColor" opacity="0.3" />
                  <rect x="35" y="10" width="75" height="6" rx="3" fill="currentColor" opacity="0.2" />
                  <rect x="35" y="20" width="60" height="6" rx="3" fill="currentColor" opacity="0.15" />
                </svg>
                <p className="text-xs font-medium text-muted-foreground">{logo}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
