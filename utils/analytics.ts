import { trackMixpanel } from './mixpanel'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[][]
    bentoMetaQueue?: Array<[string, string, EventParams?]>
  }
}

type EventParams = Record<string, string | number | boolean>

export const ANALYTICS_SIGNAL_EVENT = 'bento:analytics-signal'

// Nombres de evento en Object-Action Framework (Title Case): "Plan Selected",
// "Whatsapp Clicked", etc. GA4 no acepta espacios en el nombre del evento, así
// que derivamos la versión snake_case para gtag desde el mismo nombre canónico
// en vez de mantener dos catálogos.
// https://growthmethod.com/object-action-framework/
function toGaEventName(event: string) {
  return event.toLowerCase().replace(/\s+/g, '_')
}

function trackMeta(event: string, params?: EventParams) {
  if (typeof window === 'undefined') return

  const standardEvents: Record<string, string> = {
    'Plan Selected': 'InitiateCheckout',
    'Template Demo Clicked': 'ViewContent',
    'Template Selected': 'ViewContent',
    'Personalization Started': 'CustomizeProduct',
    'Whatsapp Clicked': 'Contact',
    'Contact Form Submitted': 'Lead',
  }
  const metaEvent = standardEvents[event]

  const method = metaEvent
    ? 'track'
    : ['Hero Cta Clicked', 'Pricing Link Clicked', 'Final Cta Clicked'].includes(event)
      ? 'trackCustom'
      : null
  if (!method) return

  const command: [string, string, EventParams?] = [method, metaEvent ?? toGaEventName(event), params]
  if (typeof window.fbq === 'function') window.fbq(...command)
  else (window.bentoMetaQueue ??= []).push(command)
}

function track(event: string, params?: EventParams) {
  trackMixpanel(event, params)

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ANALYTICS_SIGNAL_EVENT, {
      detail: { event, params: params ?? {} },
    }))
  }

  trackMeta(event, params)

  if (typeof window === 'undefined') return

  const gaCommand = ['event', toGaEventName(event), params]
  if (typeof window.gtag === 'function') window.gtag(...gaCommand)
  else (window.dataLayer ??= []).push(gaCommand)
}

export const analytics = {
  planSelected: (planName: string, planCode?: string) =>
    track('Plan Selected', { plan_name: planName, plan_code: planCode ?? '' }),

  templateDemoClicked: (templateName: string, category?: string) =>
    track('Template Demo Clicked', { template_name: templateName, template_category: category ?? '' }),

  templateSelected: (templateName: string, category?: string) =>
    track('Template Selected', { template_name: templateName, template_category: category ?? '' }),

  personalizationStarted: (templateName: string, category: string | undefined, source: string) =>
    track('Personalization Started', {
      template_name: templateName,
      template_category: category ?? '',
      source,
    }),

  /** CTA de WhatsApp, del origen que sea. Se distingue por `source`, no por evento. */
  whatsappClicked: (source: string) =>
    track('Whatsapp Clicked', { source }),

  contactFormSubmitted: (eventType: string) =>
    track('Contact Form Submitted', { event_type: eventType, method: 'contact_form' }),

  contactFormFailed: () =>
    track('Contact Form Failed'),

  loginClicked: (source: string) =>
    track('Login Clicked', { source }),

  heroCtaClicked: (mode: string) =>
    track('Hero Cta Clicked', { cta_mode: mode }),

  heroDemoClicked: () =>
    track('Hero Demo Clicked'),

  pricingLinkClicked: (source: string) =>
    track('Pricing Link Clicked', { source }),

  finalCtaClicked: (mode: string) =>
    track('Final Cta Clicked', { cta_mode: mode }),

  /** Interacción con la demo "Dos pantallas". Mide si el bloque estrella se usa. */
  demoActionClicked: (actionId: string) =>
    track('Demo Action Clicked', { action_id: actionId }),

  categorySelected: (categoryName: string) =>
    track('Category Selected', { category_name: categoryName }),

  categoryDeselected: (categoryName: string) =>
    track('Category Deselected', { category_name: categoryName }),

  /** Fire-once cuando la sección de precios entra en viewport. Funnel real: cuántos la ven vs. cuántos clickean un plan. */
  pricingSectionViewed: () =>
    track('Pricing Section Viewed'),

  intentAssistShown: (trigger: string) =>
    track('Intent Assist Shown', { trigger }),

  intentAssistClicked: (trigger: string) =>
    track('Intent Assist Clicked', { trigger }),

  intentAssistDismissed: (trigger: string) =>
    track('Intent Assist Dismissed', { trigger }),
}
