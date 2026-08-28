/**
 * Ficha editorial de cada plantilla publicada.
 *
 * La API (`GET /templates`) solo devuelve id, name, display_name, category y
 * preview_url. La identidad visual de cada diseño —su paleta y el color de
 * fondo sobre el que vive— es verdad que hoy únicamente existe en el registry
 * de `invitation-front`. Este archivo la replica del lado de la web pública
 * para poder construir la ficha de cada plantilla.
 *
 * Los valores NO son decorativos: `plate` es el `wrapperBackground` real del
 * template y `palette` sus `DEFAULT_TEMPLATE_COLORS`. Si cambian allá, cambian
 * acá. Una plantilla sin entrada en este mapa sigue funcionando en el catálogo
 * pero no tiene página propia (ver `getTemplateDetail`).
 */

export interface TemplateSwatch {
  hex: string;
  label: string;
}

export interface TemplateDetail {
  /** `name` de la API, y slug de la URL. */
  slug: string;
  /** Fondo dominante del template — el `wrapperBackground` del registry. */
  plate: string;
  /** Descripción orientada al visitante, fiel al diseño real. */
  description: string;
  palette: [TemplateSwatch, TemplateSwatch, TemplateSwatch];
}

const TEMPLATE_DETAILS: Record<string, Omit<TemplateDetail, "slug">> = {
  aquarelle: {
    plate: "#EEEAD9",
    description:
      "Acuarela pintada a mano sobre papel crema. Los ramos florales y la tinta oliva le dan el aire de una invitación hecha a pincel, no impresa.",
    palette: [
      { hex: "#6D6B39", label: "Tinta oliva" },
      { hex: "#EEEAD9", label: "Papel crema" },
      { hex: "#E8C9CF", label: "Rosa acuarela" },
    ],
  },
  autumn: {
    plate: "#fdf3e7",
    description:
      "Hojas de maple y tonos tierra para una boda de otoño. Cálido sin ser rústico, con la caída de la hoja como motivo que recorre toda la invitación.",
    palette: [
      { hex: "#c45c1a", label: "Cobre" },
      { hex: "#fdf3e7", label: "Crema tostado" },
      { hex: "#5c2a0e", label: "Tierra" },
    ],
  },
  woodland: {
    plate: "#c8dcc0",
    description:
      "Bosque y botánica para una boda entre árboles. El verde manda, con hojas dibujadas que enmarcan cada sección.",
    palette: [
      { hex: "#3d9430", label: "Verde hoja" },
      { hex: "#f3f9f0", label: "Blanco musgo" },
      { hex: "#1a4512", label: "Verde profundo" },
    ],
  },
  lavender: {
    plate: "#d4c8f0",
    description:
      "Espigas de lavanda y violetas suaves. Un campo de la Provenza traducido a invitación, sereno y perfumado.",
    palette: [
      { hex: "#7c5cbf", label: "Lavanda" },
      { hex: "#f9f5ff", label: "Lila claro" },
      { hex: "#2d1a5e", label: "Violeta noche" },
    ],
  },
  sakura: {
    plate: "#FDF6F8",
    description:
      "Motivos sakura de inspiración japonesa. Flor de cerezo, espacio en blanco y una delicadeza que no necesita adornos.",
    palette: [
      { hex: "#C8698A", label: "Cerezo" },
      { hex: "#FDF6F8", label: "Blanco pétalo" },
      { hex: "#c9a87c", label: "Oro suave" },
    ],
  },
  campestre: {
    plate: "#1a1612",
    description:
      "Boda de estancia sobre fondo oscuro. Dorado sobre marrón profundo, para una fiesta de campo que arranca cuando cae el sol.",
    palette: [
      { hex: "#C9A84C", label: "Dorado" },
      { hex: "#F5F0E8", label: "Lino" },
      { hex: "#3D3024", label: "Madera" },
    ],
  },
  "dos-trazos": {
    plate: "#E9E6DC",
    description:
      "Editorial y mínima: dos trazos botánicos recorren la invitación de punta a punta hasta encontrarse. La idea de dos caminos que convergen, dibujada.",
    palette: [
      { hex: "#A6B2A0", label: "Salvia" },
      { hex: "#F7F3EA", label: "Papel" },
      { hex: "#D2AAA5", label: "Terracota pálido" },
    ],
  },
  shimmer: {
    plate: "#FAFAFA",
    description:
      "XV elegante en rosa y plata. Tipografía script con swashes y divisores decorativos, para una fiesta clásica y luminosa.",
    palette: [
      { hex: "#F48FA6", label: "Rosa" },
      { hex: "#FAFAFA", label: "Blanco perla" },
      { hex: "#9AA5B1", label: "Plata" },
    ],
  },
  blush: {
    plate: "#FFFFFF",
    description:
      "Rosa empolvado con acentos plateados. La lectura invertida del kit Shimmer: más aire, más blanco, el color como fondo y no como adorno.",
    palette: [
      { hex: "#F48FA6", label: "Rosa empolvado" },
      { hex: "#FDE8ED", label: "Blush" },
      { hex: "#9AA5B1", label: "Plata" },
    ],
  },
  meadow: {
    plate: "#D8D9C4",
    description:
      "Acuarela botánica con mariposas sobre fondo crema. Serif y script conviven en una pieza que se siente pintada a mano.",
    palette: [
      { hex: "#6E7355", label: "Verde pradera" },
      { hex: "#F7F4EB", label: "Crema" },
      { hex: "#DCA9B8", label: "Rosa seco" },
    ],
  },
  disco: {
    plate: "#0A0410",
    description:
      "XV con estética disco: oscuridad glam, dorado y rosa neón sobre violeta profundo. Para una fiesta que se trata de la pista.",
    palette: [
      { hex: "#F0D27A", label: "Dorado" },
      { hex: "#0A0410", label: "Violeta noche" },
      { hex: "#FF3B6E", label: "Rosa neón" },
    ],
  },
  phantom: {
    plate: "#080808",
    description:
      "Dark y editorial. Hot pink sobre negro con tipografía bold: la opción más contemporánea del catálogo, y la menos parecida a una invitación tradicional.",
    palette: [
      { hex: "#E8306A", label: "Hot pink" },
      { hex: "#080808", label: "Negro" },
      { hex: "#ffffff", label: "Blanco" },
    ],
  },
  carousel: {
    plate: "#FDFBF7",
    description:
      "Cumpleaños infantil sin estridencia. Crema y rosa pastel con motivo de calesita, pensado para chicos pero con criterio adulto.",
    palette: [
      { hex: "#D49AA6", label: "Rosa pastel" },
      { hex: "#F5EEE8", label: "Crema" },
      { hex: "#36302F", label: "Carbón" },
    ],
  },
  "confetti-pop": {
    plate: "#1a1a2e",
    description:
      "Confetti y estilo pop sobre fondo azul noche. Vibrante y alto contraste, para un cumpleaños que se nota apenas se abre el link.",
    palette: [
      { hex: "#FF3D8A", label: "Fucsia" },
      { hex: "#4D6FFF", label: "Azul pop" },
      { hex: "#FFD43D", label: "Amarillo" },
    ],
  },
  flowers: {
    plate: "#e8f5f3",
    description:
      "Motivos florales sobre verde agua. Elegante y fresco, se adapta tanto a un cumpleaños como a una celebración más formal.",
    palette: [
      { hex: "#78C9BC", label: "Verde agua" },
      { hex: "#4C9B97", label: "Petróleo" },
      { hex: "#BAA67C", label: "Arena" },
    ],
  },
  "corporate-summit": {
    plate: "#EDEAE2",
    description:
      "Editorial y sobrio para eventos de empresa. Rojo señal sobre papel claro: presencia sin la estética festiva de un cumpleaños.",
    palette: [
      { hex: "#C8350A", label: "Rojo señal" },
      { hex: "#EDEAE2", label: "Papel" },
      { hex: "#1C1A18", label: "Grafito" },
    ],
  },
  "corporate-noir": {
    plate: "#111111",
    description:
      "Oscuro y editorial para eventos corporativos de alto nivel. Escala de grises, sin color de acento: todo el peso lo lleva la tipografía.",
    palette: [
      { hex: "#1A1A1A", label: "Negro" },
      { hex: "#F0EFED", label: "Hueso" },
      { hex: "#555555", label: "Gris" },
    ],
  },
};

/** Slugs con ficha propia, para `generateStaticParams` y el sitemap. */
export const TEMPLATE_DETAIL_SLUGS = Object.keys(TEMPLATE_DETAILS);

export function getTemplateDetail(slug: string): TemplateDetail | null {
  const detail = TEMPLATE_DETAILS[slug];
  return detail ? { slug, ...detail } : null;
}

/**
 * Luminancia relativa (WCAG) para decidir si el plate lleva tinta clara u
 * oscura. Se calcula en vez de hardcodearse por plantilla: un color nuevo mal
 * clasificado a mano es texto ilegible en producción.
 */
export function isDarkPlate(hex: string): boolean {
  const normalized = hex.replace("#", "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const channels = [0, 2, 4].map((offset) => {
    const value = parseInt(full.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  const luminance = 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  return luminance < 0.4;
}
