import mixpanel from "mixpanel-browser";

type EventParams = Record<string, string | number | boolean>;

let initialized = false;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function registerAcquisition() {
  const params = new URLSearchParams(window.location.search);
  const utms = Object.fromEntries(
    UTM_KEYS.flatMap((key) => {
      const value = params.get(key)?.trim();
      return value ? [[key, value]] : [];
    }),
  );

  if (Object.keys(utms).length > 0) {
    mixpanel.register_once(
      Object.fromEntries(Object.entries(utms).map(([key, value]) => [`first_${key}`, value])),
    );
    mixpanel.register(utms);
  }

  let referrerHost = "direct";
  if (document.referrer) {
    try {
      referrerHost = new URL(document.referrer).hostname;
    } catch {
      // A malformed referrer should never prevent analytics initialization.
    }
  }
  mixpanel.register_once({ first_referrer_host: referrerHost });
}

export function initializeMixpanel() {
  if (initialized || typeof window === "undefined") return;

  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token) return;

  mixpanel.init(token, {
    autocapture: false,
    track_pageview: false,
    persistence: "cookie",
    cross_subdomain_cookie: true,
    secure_cookie: process.env.NODE_ENV === "production",
  });
  initialized = true;

  mixpanel.register({
    platform: "web",
    app: "invitly-web",
  });
  registerAcquisition();
}

export function trackMixpanel(event: string, params?: EventParams) {
  initializeMixpanel();
  if (!initialized) return;
  mixpanel.track(event, params);
}

export function trackMixpanelPageView(path: string) {
  trackMixpanel("Page Viewed", { path });
}
