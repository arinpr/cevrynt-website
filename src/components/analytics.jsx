"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import {
  CONSENT_EVENT,
  GA_ID,
  bootAnalytics,
  privacySignal,
  readConsent,
  setConsent,
  track,
} from "@/lib/analytics";
import { siteConfig } from "@/config/site";

/* Where on the page a click happened, as a short stable label:
   header, mobile_menu, footer, demo_prompt, hero, or the section's heading id. */
function areaOf(el) {
  if (el.closest(".demo-prompt")) return "demo_prompt";
  if (el.closest(".mobile-overlay")) return "mobile_menu";
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest(".home-hero, .page-hero")) return "hero";
  const section = el.closest("section[aria-labelledby], section[id]");
  if (section) return (section.getAttribute("aria-labelledby") || section.id).slice(0, 60);
  return "body";
}

/* The visible label only: animated buttons carry a hidden duplicate of their
   text for the hover swap, which would otherwise be read twice. */
function textOf(el) {
  const label = el.getAttribute("aria-label");
  if (label) return label.slice(0, 80);
  const copy = el.cloneNode(true);
  copy.querySelectorAll("[aria-hidden=\"true\"]").forEach((n) => n.remove());
  return (copy.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
}

/* One delegated listener for every link on the site, so no component has to
   remember to report its own CTA. Internal page views are measured by GA's
   enhanced measurement (history changes), not here. */
function onClick(event) {
  const a = event.target.closest?.("a[href]");
  if (!a) return;
  const href = a.getAttribute("href");
  const base = { link_text: textOf(a), cta_location: areaOf(a), page_path: window.location.pathname };

  if (href.includes("calendly.com")) track("book_demo_click", { ...base, link_url: href });
  else if (href.startsWith("mailto:")) track("email_click", { ...base, email_to: href.slice(7).split("?")[0] });
  else if (href.startsWith(siteConfig.appUrl)) track("sign_in_click", base);
  else if (href.startsWith("/") && !href.startsWith("//")) {
    if (href.startsWith("/pilot") || href.startsWith("/contact")) track("cta_click", { ...base, link_url: href });
    else if (base.cta_location === "header" || base.cta_location === "mobile_menu" || base.cta_location === "footer") {
      track("navigation_click", { ...base, link_url: href });
    }
  }
}

export function Analytics() {
  const [enabled, setEnabled] = useState(false);
  const [askConsent, setAskConsent] = useState(false);

  useEffect(() => {
    if (!bootAnalytics()) return undefined;
    // Deferred so the banner never competes with first paint or hydration.
    const id = window.setTimeout(() => {
      setEnabled(true);
      setAskConsent(!readConsent() && !privacySignal());
    }, 0);
    const reopen = (e) => e.detail === "ask" && setAskConsent(true);
    document.addEventListener("click", onClick, { capture: true, passive: true });
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener(CONSENT_EVENT, reopen);
    };
  }, []);

  if (!enabled) return null;

  const choose = (value) => {
    setConsent(value);
    setAskConsent(false);
  };

  return (
    <>
      {/* lazyOnload: fetched after the page has loaded, so it never touches LCP. */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      {askConsent ? (
        <div className="consent-bar" role="region" aria-label="Cookie preferences">
          <p className="consent-copy">
            We use Google Analytics cookies to understand how this site is used. No advertising or cross-site tracking.{" "}
            <Link href="/cookie-policy">Cookie Policy</Link>
          </p>
          <div className="consent-actions">
            <button type="button" className="consent-btn is-quiet" onClick={() => choose("denied")}>
              Decline
            </button>
            <button type="button" className="consent-btn" onClick={() => choose("granted")}>
              Accept
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** Footer link that reopens the consent choice. */
export function CookieSettingsButton({ className }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: "ask" }))}
    >
      <span>Cookie settings</span>
    </button>
  );
}
