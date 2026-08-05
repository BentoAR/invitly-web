declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type EventParams = Record<string, string | number | boolean>

function track(event: string, params?: EventParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}

export const analytics = {
  planCtaClick: (planName: string) =>
    track('plan_whatsapp_click', { plan_name: planName }),

  templateDemoClick: (templateName: string, category?: string) =>
    track('template_demo_click', { template_name: templateName, template_category: category ?? '' }),

  templateGetClick: (templateName: string, category?: string) =>
    track('template_whatsapp_click', { template_name: templateName, template_category: category ?? '' }),

  contactFormSuccess: (eventType: string) =>
    track('generate_lead', { event_type: eventType, method: 'contact_form' }),

  contactFormError: () =>
    track('contact_form_error'),

  loginClick: () =>
    track('login_click'),

  ctaWhatsappClick: () =>
    track('cta_whatsapp_click'),

  heroCtaClick: (mode: string) =>
    track('hero_cta_click', { cta_mode: mode }),

  heroDemoClick: () =>
    track('hero_demo_click'),

  finalCtaClick: (mode: string) =>
    track('final_cta_click', { cta_mode: mode }),

  finalCtaWhatsappClick: () =>
    track('final_cta_whatsapp_click'),

  /** Interacción con la demo "Dos pantallas". Mide si el bloque estrella se usa. */
  demoActionClick: (actionId: string) =>
    track('demo_action_click', { action_id: actionId }),

  /** Consulta previa a la compra. Proxy directo de intención en modelo pay-first. */
  preSaleWhatsappClick: () =>
    track('presale_whatsapp_click'),

  b2bDemoClick: () =>
    track('b2b_demo_request'),
}
