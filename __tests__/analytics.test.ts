import { analytics } from '@/utils/analytics'

jest.mock('@/utils/mixpanel', () => ({ trackMixpanel: jest.fn() }))

describe('medición del embudo publicitario', () => {
  it('envía el primer CTA y los pasos reales del funnel a GA y Meta', () => {
    delete window.gtag
    delete window.fbq

    analytics.heroCtaClicked('design-first')

    expect(window.dataLayer).toEqual([
      ['event', 'hero_cta_clicked', { cta_mode: 'design-first' }],
    ])
    expect(window.bentoMetaQueue).toEqual([
      ['trackCustom', 'hero_cta_clicked', { cta_mode: 'design-first' }],
    ])

    window.gtag = jest.fn()
    window.fbq = jest.fn()

    analytics.templateSelected('boda-clasica', 'Bodas')
    analytics.personalizationStarted('boda-clasica', 'Bodas', 'catalog')
    analytics.contactFormSubmitted('Boda')

    expect(window.fbq).toHaveBeenNthCalledWith(1, 'track', 'ViewContent', {
      template_name: 'boda-clasica',
      template_category: 'Bodas',
    })
    expect(window.fbq).toHaveBeenNthCalledWith(2, 'track', 'CustomizeProduct', {
      template_name: 'boda-clasica',
      template_category: 'Bodas',
      source: 'catalog',
    })
    expect(window.fbq).toHaveBeenNthCalledWith(3, 'track', 'Lead', {
      event_type: 'Boda',
      method: 'contact_form',
    })
  })
})
