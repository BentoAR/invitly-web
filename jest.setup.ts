import "@testing-library/jest-dom";

// Mock next-intl/server
jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      title: "Invitaciones Digitales",
      subtitle: "Crea invitaciones únicas para tus eventos especiales",
      badge: "Diseños Personalizados",
      imageAlt: "Evento especial",
      "button.categories": "Ver Categorías",
      "button.contact": "Contactar",
      "stats.designs": "Diseños",
      "stats.clients": "Clientes",
      "stats.satisfaction": "Satisfacción",
      whatsappMessage: "Hola, me interesa crear una invitación digital",
    };
    return translations[key] || key;
  }),
}));

Object.defineProperty(HTMLElement.prototype, "hasPointerCapture", {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock GSAP and ScrollTrigger
jest.mock("gsap", () => {
  const mockTimeline = {
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
    add: jest.fn().mockReturnThis(),
    kill: jest.fn(),
  };

  const mockTween = {
    kill: jest.fn(),
  };

  const gsap = jest.fn().mockReturnValue(mockTimeline);
  gsap.timeline = jest.fn(() => mockTimeline);
  gsap.to = jest.fn(() => mockTween);
  gsap.from = jest.fn(() => mockTween);
  gsap.fromTo = jest.fn(() => mockTween);
  gsap.set = jest.fn();
  gsap.registerPlugin = jest.fn();
  gsap.matchMedia = jest.fn(() => ({
    add: jest.fn().mockReturnThis(),
    revert: jest.fn(),
    kill: jest.fn(),
  }));
  gsap.context = jest.fn((fn) => {
    fn();
    return { revert: jest.fn() };
  });
  gsap.utils = {
    selector: jest.fn(() => jest.fn(() => [])),
  };

  return {
    __esModule: true,
    default: gsap,
  };
});

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: jest.fn(),
    refresh: jest.fn(),
    update: jest.fn(),
    kill: jest.fn(),
  },
}));
