import {
  ClipboardCheck,
  Image as ImageIcon,
  Music,
  LayoutDashboard,
  Users,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/shared/Container";

type Feature = { title: string; description: string; icon?: string };

const INK = "#200041";

/**
 * Ritmo del bento grid.
 *
 * Los tiles NO son todos iguales: distinto tamaño, distinto fondo y distinto
 * tamaño de tipografía según el peso de cada feature. Una grilla de seis cards
 * idénticas comunica que las seis valen lo mismo, y no es cierto: el álbum
 * colaborativo y el dashboard son los diferenciales; el soporte es una nota al
 * pie. La jerarquía visual tiene que reflejar la jerarquía comercial.
 */
const TILES: Array<{
  icon: LucideIcon;
  span: string;
  bg: string;
  border: string;
  ink: string;
  muted: string;
  scale: "lg" | "md" | "sm";
}> = [
  // 0 · Álbum colaborativo — diferencial, tile destacado en naranja de marca
  {
    icon: ImageIcon,
    span: "col-span-2 md:col-span-2 md:row-span-2",
    bg: "#FFA459",
    border: "transparent",
    ink: "#2E1000",
    muted: "rgba(46, 16, 0, 0.72)",
    scale: "lg",
  },
  // 1 · Playlist
  {
    icon: Music,
    span: "col-span-2 md:col-span-2",
    bg: "#FFFFFF",
    border: "rgba(32,0,65,0.08)",
    ink: INK,
    muted: "rgba(32, 0, 65, 0.58)",
    scale: "md",
  },
  // 2 · Gestión del evento
  {
    icon: Users,
    span: "col-span-1",
    bg: "#EDE9DA",
    border: "transparent",
    ink: INK,
    muted: "rgba(32, 0, 65, 0.58)",
    scale: "sm",
  },
  // 3 · Dashboard — diferencial
  {
    icon: LayoutDashboard,
    span: "col-span-1",
    bg: "#FFF1E2",
    border: "rgba(255,164,89,0.45)",
    ink: INK,
    muted: "rgba(32, 0, 65, 0.58)",
    scale: "sm",
  },
  // 4 · Invitación de diseñador
  {
    icon: ClipboardCheck,
    span: "col-span-2 md:col-span-3",
    bg: "#FFFFFF",
    border: "rgba(32,0,65,0.08)",
    ink: INK,
    muted: "rgba(32, 0, 65, 0.58)",
    scale: "md",
  },
  // 5 · Soporte
  {
    icon: Headphones,
    span: "col-span-2 md:col-span-1",
    bg: "#EDE9DA",
    border: "transparent",
    ink: INK,
    muted: "rgba(32, 0, 65, 0.58)",
    scale: "sm",
  },
];

const TITLE_SIZE = { lg: "clamp(1.4rem, 2.6vw, 2rem)", md: "1.2rem", sm: "1.05rem" };

/**
 * Bento grid de features — reemplaza a `FeaturesScrollSequence`.
 *
 * La versión original pineaba la sección ~7 viewports y hacía pasar las 6 cards
 * de a una por el centro de la pantalla: siete pantallas de scroll para mostrar
 * seis párrafos que se leen en treinta segundos, y sin poder compararlos nunca
 * porque jamás se veían dos juntos.
 *
 * `FeaturesScrollSequence.tsx` sigue en el repo por si se quiere volver atrás.
 */
export default function FeaturesGrid({
  features,
  sectionTitle,
  eyebrow,
}: {
  features: Feature[];
  sectionTitle: string;
  eyebrow?: string;
}) {
  return (
    <section
      id="caracteristicas"
      aria-label={sectionTitle}
      className="relative py-20 md:py-28"
    >
      <Container>
        <div className="max-w-2xl mb-10 md:mb-14">
          {eyebrow ? (
            <p
              className="font-mono uppercase mb-5"
              style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "#9B5A00" }}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2
            className="font-display font-normal leading-[1.08]"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.25rem)",
              color: INK,
              letterSpacing: "-0.025em",
            }}
          >
            {sectionTitle}
          </h2>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 grid-flow-dense"
          style={{ gridAutoRows: "minmax(160px, auto)" }}
        >
          {features.map((feature, i) => {
            const tile = TILES[i] ?? TILES[TILES.length - 1];
            const Icon = tile.icon;

            return (
              <article
                key={i}
                className={`flex flex-col justify-end rounded-2xl p-5 md:p-6 ${tile.span}`}
                style={{
                  backgroundColor: tile.bg,
                  border: `1px solid ${tile.border}`,
                  color: tile.ink,
                }}
              >
                <Icon
                  size={tile.scale === "lg" ? 30 : 22}
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className="mb-auto"
                  style={{ opacity: 0.55 }}
                />
                <h3
                  className="font-display font-normal leading-snug mt-6 mb-2"
                  style={{ fontSize: TITLE_SIZE[tile.scale], letterSpacing: "-0.015em" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: tile.scale === "lg" ? "0.95rem" : "0.85rem",
                    color: tile.muted,
                    maxWidth: "52ch",
                  }}
                >
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
