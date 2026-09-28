/* --------------------------------------------------------------------------
   Google Analytics 4, privacy-first.

   - Consent Mode v2. Advertising storage and signals are always denied — the
     site runs no ads. Analytics storage defaults to granted in the U.S. (the
     site's market) and to denied in the EEA, UK and Switzerland, where it
     waits for an explicit "Accept".
   - A visitor's choice is kept in localStorage under CONSENT_KEY and applied
     before the first hit. A browser Global Privacy Control signal is treated
     as "Decline".
   - Google signals and ad personalization are off; no user IDs or personal
     data are ever sent. Event parameters carry link text and page context
     only.
   - Only the production domain is measured, so local builds, workers.dev
     URLs and preview deployments never pollute the property.

   If this changes, update src/content/legal.js (Privacy + Cookie Policy).
   -------------------------------------------------------------------------- */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-80SL6B8WHP";
export const CONSENT_KEY = "cevrynt_consent_v1";
export const CONSENT_EVENT = "cevrynt:consent";

/* EEA + UK + Switzerland, ISO 3166-1 alpha-2. */
export const CONSENT_REQUIRED_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT",
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

/* The only hosts analytics runs on. NEXT_PUBLIC_SITE_URL is inlined at build
   time; the apex is included so a visit that lands before the redirect still
   counts. */
const productionHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.cevrynt.com").hostname;
  } catch {
    return "www.cevrynt.com";
  }
})();
const PRODUCTION_HOSTS = new Set([productionHost, productionHost.replace(/^www\./, "")]);

export function analyticsEnabled() {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production") return false;
  return PRODUCTION_HOSTS.has(window.location.hostname);
}

export function readConsent() {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {}
  return null;
}

export function privacySignal() {
  return typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;
}

function gtag() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // gtag expects the arguments object itself, not an array.
  window.dataLayer.push(arguments);
}

let booted = false;

/** Queue consent defaults and config. Safe to call more than once. */
export function bootAnalytics() {
  if (booted) return true;
  if (!analyticsEnabled()) return false;
  booted = true;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
  gtag("consent", "default", { analytics_storage: "denied", region: CONSENT_REQUIRED_REGIONS });
  gtag("set", "ads_data_redaction", true);

  const stored = readConsent();
  if (stored || privacySignal()) {
    gtag("consent", "update", { analytics_storage: stored === "granted" && !privacySignal() ? "granted" : "denied" });
  }

  gtag("js", new Date());
  gtag("config", GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  return true;
}

/** Record a visitor's cookie choice and apply it immediately. */
export function setConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {}
  if (booted) gtag("consent", "update", { analytics_storage: value });
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** Send a GA4 event. A no-op until analytics has booted. */
export function track(name, params = {}) {
  if (!booted) return;
  gtag("event", name, params);
}
