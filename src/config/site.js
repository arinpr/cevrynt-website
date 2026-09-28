/* The canonical origin. The apex cevrynt.com redirects here (next.config.js). */
const fallbackUrl = "https://www.cevrynt.com";

/* The absolute origin used for canonical URLs, the sitemap, JSON-LD and —
   most visibly — og:image. Share scrapers fetch og:image from this origin, so
   it must be the host actually serving this build, or every preview is empty.

     1. NEXT_PUBLIC_SITE_URL — set this once the custom domain points here.
     2. On Vercel production, the project's production domain.
     3. On a Vercel preview, that preview's own URL, so its cards resolve.
     4. Otherwise https://www.cevrynt.com — the case on Cloudflare Workers.

   Read on the server only; client components use appUrl, never url. */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return fallbackUrl;
}

export const siteConfig = {
  name: "Cevrynt",
  legalName: "Cevrynt, Inc.",
  title: "Cevrynt | AI Underwriting Software for MCA & Alternative Lenders",
  description:
    "AI underwriting for MCA and alternative lenders: turn borrower documents, bank statements and business signals into evidence-linked, decision-ready analysis.",
  url: resolveSiteUrl(),
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.cevrynt.com",
  /* Official profiles for Organization.sameAs — Google and AI assistants use
     these to confirm the brand is one entity. Add each profile once it is
     live (LinkedIn company page, Crunchbase, G2, X, GitHub...). */
  sameAs: ["https://www.linkedin.com/company/cevrynt"],
  linkedinUrl: "https://www.linkedin.com/company/cevrynt",
};
