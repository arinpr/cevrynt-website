import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { AccessScope } from "@/components/security/access-scope";
import { EvidenceRecord } from "@/components/security/evidence-record";
import { DataLifecycle } from "@/components/security/data-lifecycle";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("security");

export function generateMetadata() {
  const title = page.metaTitle || page.title;
  const description = page.metaDescription || page.description;

  return {
    title,
    description,
    keywords: page.keywords,
    alternates: { canonical: `/${page.path}` },
    openGraph: { title, description, url: `/${page.path}` },
    twitter: { title, description },
  };
}

const reviewDeal = {
  name: "Cedar & Stone LLC",
  ref: "APP-240819-017 · sent for review",
  meta: "5 documents · 143 pages · classified and mapped",
};

const outsideReview = [
  "The rest of your book",
  "Your CRM and your funding platform",
  "Anything at all between reviews",
  "This deal, once its review has ended",
];

const intakeShot = {
  src: "/media/Steps/intake.png",
  alt: "The Cevrynt intake screen for the deal sent for review: the borrower package for Cedar & Stone LLC, each file classified and mapped to page ranges, with every structured field linked back to its source document and line.",
  width: 2000,
  height: 950,
};

const reachRules = [
  "Read-only, and only the files attached to a deal you send for review.",
  "No standing connection to your book, your CRM or your funding platform.",
  "No background sync. Nothing is read between reviews.",
  "Access to a deal ends when its review does.",
];

const answers = [
  { stated: true, q: "What can it reach?", a: "Read access, scoped to the deals you name." },
  { stated: true, q: "What is recorded when a reviewer overrides a finding?", a: "The original, the replacement, who changed it, when, and why." },
  { stated: true, q: "Who issues the decision?", a: "Your team. Cevrynt issues no approval or decline, on any file." },
  { stated: true, q: "How long is borrower data kept?", a: "For a retention and deletion period agreed before the pilot." },
  { stated: false, q: "Is our borrower data used to train models?", when: "Confirmed in writing before anything is sent" },
  { stated: false, q: "Where does it live, and under whose account?", when: "Settled with your team at deployment" },
  { stated: false, q: "Who else processes it?", when: "Named in your review" },
];

const surfaces = [
  { name: "The documents you send", what: "Bank statements, filings and the rest of the file, exactly as they arrived.", clock: "Deletion schedule set in your pilot" },
  { name: "The structured output", what: "The extraction, the analysis and the report derived from those documents.", clock: "Deletion schedule set in your pilot" },
  { name: "The run log", what: "What the system did, what a reviewer changed, and when.", clock: "Held for the audit period you set" },
  { name: "Operational telemetry", what: "Timings, errors and throughput, used to keep the service running.", clock: "What it may carry is written into the agreement" },
];

const overrideRecord = {
  field: "Fraud signal · duplicate account",
  was: "Flagged — duplicate account pattern",
  now: "Resolved — same owner, second entity",
  by: "Underwriter · your team",
  at: "2026-08-19 14:22 UTC",
  reason: "Second entity confirmed against registry filing; accounts share a controlling owner.",
};

const holders = [
  { name: "Your systems", what: "The files you attach to a deal you send for review." },
  { name: "Cevrynt", what: "Structures the file and runs the analysis your team reads." },
  { name: "Cloud infrastructure", what: "Where that work runs, under a named agreement." },
  { name: "Model providers", what: "What reads the text, named in your review." },
];

const terminus = {
  name: "The chain stops here",
  what: "Any addition to it is raised with you before it happens, not after.",
};

export default function SecurityPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: page.group, item: `${siteConfig.url}/${page.path}` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${siteConfig.url}/${page.path}` },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero unchanged — the same composition PageShell renders for this page. */}
      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy heading={page.title} lede={page.description} />
          <div className="hero-actions">
            <RainbowCta href={calendlyUrl} label={page.cta || "Book a walkthrough"} />
          </div>
        </div>
      </HeroMotion>

      {/* 01 — Access: what a review can reach, and the boundary around it */}
      <section className="sec-access band-light" aria-labelledby="access-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Access</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="access-heading"
              text="One deal in reach. Everything else stays out."
            />
          </div>
          <p className="eg-lede t-lede">
            A review reaches the files on the deal you send, and nothing else on either side of it — no
            standing connection to your book, your CRM or your funding platform.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <AccessScope deal={reviewDeal} shot={intakeShot} outside={outsideReview} rules={reachRules} />
          </div>
        </div>
      </section>

      {/* 02 — Evidence: the questionnaire, and one override as it's recorded */}
      <section className="sec-evidence band-deep" aria-labelledby="evidence-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Evidence</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="evidence-heading"
              text="Four answers settled. Three left open on purpose."
            />
          </div>
          <p className="eg-lede t-lede">
            The questions your risk team already asks, answered plainly — gaps included — next to what
            actually survives when a reviewer overrules a finding.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <EvidenceRecord items={answers} record={overrideRecord} />
          </div>
        </div>
      </section>

      {/* 03 — Data lifecycle: where it rests, and who's in the chain */}
      <section className="sec-lifecycle band-light" aria-labelledby="lifecycle-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Data lifecycle</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="lifecycle-heading"
              text="Four places it can rest. A short chain, and it stops."
            />
          </div>
          <p className="eg-lede t-lede">
            A single retention promise is the answer that fails a review. These are the actual surfaces
            underneath it, and everyone who touches the file on the way through.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <DataLifecycle surfaces={surfaces} holders={holders} terminus={terminus} />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="04"
          kicker="Founder-led review"
          heading="Bring the questionnaire to the call."
          lede="Access, retention, custody and audit worked through against your own review process, by the person who can commit to the answers."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
