/**
 * Configuración central del CTA principal de la home.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DECISIÓN PENDIENTE — "vista previa antes de pagar"
 * ─────────────────────────────────────────────────────────────────────────────
 * Hoy el modelo es pay-first: el usuario paga y recién ahí accede al panel.
 * Si se habilita que alguien arme su invitación con SUS datos y pague solo para
 * publicarla, el CTA de toda la home cambia. Ese cambio se hace ACÁ, en un
 * único lugar, y se propaga a Hero, FinalCta y cualquier otro consumidor.
 *
 * Para cambiar el modelo:
 *   1. Poner CTA_MODE = "preview-first"
 *   2. Ajustar las claves `Hero.button.primary` y `FinalCta.button.primary`
 *      en messages/es/home.json y messages/en/home.json
 *
 * NO hardcodear destinos de CTA en los componentes.
 */

export type CtaMode = "pay-first" | "preview-first";

/** Modelo comercial activo. Ver bloque de arriba antes de tocar. */
export const CTA_MODE: CtaMode = "pay-first";

const APP_URL = "https://app.bento.com.ar";

/**
 * Destino del CTA primario de la home.
 * - pay-first     → pricing, porque el precio es la primera objeción a resolver.
 * - preview-first → constructor de invitación, el pago llega al publicar.
 */
export function getPrimaryCtaHref(locale: string): string {
  if (CTA_MODE === "preview-first") {
    return `${APP_URL}/signup?intent=preview`;
  }
  return `/${locale}/pricing`;
}

export function isPrimaryCtaExternal(): boolean {
  return CTA_MODE === "preview-first";
}

export const DEMO_INVITATION_URL = "https://inv.bento.com.ar/demo/autumn";

/** Precio de entrada. Se muestra en el hero para calificar al visitante temprano. */
export const ENTRY_PRICE_ES = "$60.000";
export const ENTRY_PRICE_EN = "$60";
