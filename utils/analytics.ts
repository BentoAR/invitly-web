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
  // Pricing
  planCtaClick: (planName: string) =>
    track('plan_whatsapp_click', { plan_name: planName }),

  // Templates
  templateDemoClick: (templateName: string, category?: string) =>
    track('template_demo_click', { template_name: templateName, template_category: category ?? '' }),

  templateGetClick: (templateName: string, category?: string) =>
    track('template_whatsapp_click', { template_name: templateName, template_category: category ?? '' }),

  // Formulario de contacto
  contactFormSuccess: (eventType: string) =>
    track('generate_lead', { event_type: eventType, method: 'contact_form' }),

  contactFormError: () =>
    track('contact_form_error'),

  // Navbar
  loginClick: () =>
    track('login_click'),

  // CTA principal
  ctaWhatsappClick: () =>
    track('cta_whatsapp_click'),

  // B2B
  b2bDemoClick: () =>
    track('b2b_demo_request'),
}
