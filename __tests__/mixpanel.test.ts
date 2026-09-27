import mixpanel from "mixpanel-browser";
import { trackMixpanel, trackMixpanelPageView } from "@/utils/mixpanel";

jest.mock("mixpanel-browser", () => ({
  __esModule: true,
  default: {
    init: jest.fn(),
    register: jest.fn(),
    register_once: jest.fn(),
    track: jest.fn(),
  },
}));

describe("Mixpanel del sitio público", () => {
  it("registra la primera visita y la campaña sin esperar interacción", () => {
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN = "test-token";
    window.history.replaceState({}, "", "/?utm_source=instagram&utm_medium=paid&utm_campaign=launch");

    trackMixpanelPageView("/es");
    trackMixpanel("Pricing Section Viewed");

    expect(mixpanel.init).toHaveBeenCalledTimes(1);
    expect(mixpanel.register_once).toHaveBeenCalledWith({
      first_utm_source: "instagram",
      first_utm_medium: "paid",
      first_utm_campaign: "launch",
    });
    expect(mixpanel.register).toHaveBeenCalledWith({
      utm_source: "instagram",
      utm_medium: "paid",
      utm_campaign: "launch",
    });
    expect(mixpanel.track).toHaveBeenNthCalledWith(1, "Page Viewed", { path: "/es" });
    expect(mixpanel.track).toHaveBeenNthCalledWith(2, "Pricing Section Viewed", undefined);
  });
});
