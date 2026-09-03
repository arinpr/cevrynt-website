import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { ReachStage } from "@/components/security/reach-stage";
import { AnswerRail } from "@/components/security/answer-rail";
import { SurfaceCut } from "@/components/security/surface-cut";
import { NoRemoval } from "@/components/security/no-removal";
import { ChainStop } from "@/components/security/chain-stop";
import { ReviewClose } from "@/components/security/review-close";
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
  // Read off the intake screen itself rather than invented: five document types
  // across pages 1-143.
  meta: "5 documents · 143 pages · classified and mapped",
};

/**
 * The dim side of the seam. Everything a lender reasonably assumes a vendor
 * quietly reaches, and this one does not.
 */
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

/**
 * What the system can reach.
 *
 * Every rule here is a restatement of how the product already works rather than
 * a new commitment: review is per deal, on files a lender attaches, and there is
 * no standing connection to a book because there is no connection to a book.
 */
const reachRules = [
  "Read-only, and only the files attached to a deal you send for review.",
  "No standing connection to your book, your CRM or your funding platform.",
  "No background sync. Nothing is read between reviews.",
  "Access to a deal ends when its review does.",
];

/**
 * The questionnaire, as answers and blanks.
 *
 * Four of these are positions published elsewhere on this site or direct
 * consequences of how the product works. Three genuinely depend on the lender's
 * own deployment and cannot honestly be answered in advance by anybody, so they
 * are left blank with the moment they close written under the rule.
 */
const answers = [
  {
    stated: true,
    q: "What can it reach?",
    a: "Read access, scoped to the deals you name.",
  },
  {
    stated: true,
    q: "What is recorded when a reviewer overrides a finding?",
    a: "The original, the replacement, who changed it, when, and why.",
  },
  {
    stated: true,
    q: "Who issues the decision?",
    a: "Your team. Cevrynt issues no approval or decline, on any file.",
  },
  {
    stated: true,
    q: "How long is borrower data kept?",
    a: "For a retention and deletion period agreed before the pilot.",
  },
  {
    stated: false,
    q: "Is our borrower data used to train models?",
    when: "Confirmed in writing before anything is sent",
  },
  {
    stated: false,
    q: "Where does it live, and under whose account?",
    when: "Settled with your team at deployment",
  },
  {
    stated: false,
    q: "Who else processes it?",
    when: "Named in your review",
  },
];

/**
 * The four surfaces a document can come to rest on.
 *
 * Vendor-risk guidance is specific that reviews fail on the surfaces nobody
 * names — logging backends and telemetry pipelines — rather than on the
 * headline retention claim, which is why the last two are on this list at all.
 * No clock is a number here, because none of them is a default: each is set in
 * the pilot agreement, and inventing durations would be the opposite of the
 * point this section is making.
 */
const surfaces = [
  {
    name: "The documents you send",
    what: "Bank statements, filings and the rest of the file, exactly as they arrived.",
    clock: "Deletion schedule set in your pilot",
  },
  {
    name: "The structured output",
    what: "The extraction, the analysis and the report derived from those documents.",
    clock: "Deletion schedule set in your pilot",
  },
  {
    name: "The run log",
    what: "What the system did, what a reviewer changed, and when. The audit trail itself.",
    clock: "Held for the audit period you set",
  },
  {
    name: "Operational telemetry",
    what: "Timings, errors and throughput, used to keep the service running.",
    clock: "What it may carry is written into the agreement",
  },
];

/**
 * One override, as it is recorded.
 *
 * The example is one the site already tells elsewhere: fraud signals are
 * resolved as review items rather than automatic determinations. This is what
 * resolving one leaves behind.
 */
const overrideRecord = {
  field: "Fraud signal · duplicate account",
  was: "Flagged — duplicate account pattern",
  now: "Resolved — same owner, second entity",
  by: "Underwriter · your team",
  at: "2026-08-19 14:22 UTC",
  reason: "Second entity confirmed against registry filing; accounts share a controlling owner.",
};

/**
 * The chain of custody.
 *
 * Named by role rather than by brand: naming providers here would assert
 * arrangements that are settled in the review, which is what the terminus says.
 */
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

const closeSteps = [
  "You send the questionnaire your risk team already uses.",
  "We answer it live, including the parts this page leaves blank.",
  "What we agree goes into the pilot agreement, not into a slide.",
];

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

      {/* Film grain across the page, the same treatment the integrations page
          carries: one fixed layer that never repaints on scroll. */}
      <div className="ig-grain" aria-hidden="true" />

      {/* Hero unchanged — the same composition PageShell renders for this page. */}
      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy heading={page.title} lede={page.description} />
          <div className="hero-actions">
            <RainbowCta href={calendlyUrl} label={page.cta || "Book a walkthrough"} />
          </div>
        </div>
      </HeroMotion>

      {/* 01 — Reach */}
      <section className="sec-reach band-light sx" aria-labelledby="reach-heading">
        <div className="eg sec-head">
          <span className="sx-top" aria-hidden="true" />
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Reach</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="reach-heading"
              text="Access starts at your whole book and stops at the deals you name."
            />
          </div>
          <p className="eg-lede t-lede">
            Most vendor access diagrams grow outward. This one contracts, because that is what actually
            happens: a review reaches the files on one deal and nothing else on either side of it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReachStage deal={reviewDeal} shot={intakeShot} outside={outsideReview} rules={reachRules} />
          </div>
        </div>
      </section>

      {/* 02 — Straight answers */}
      <section className="sec-blanks band-deep sx" aria-labelledby="blanks-heading">
        <div className="eg sec-head">
          <span className="sx-top" aria-hidden="true" />
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Straight answers</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="blanks-heading"
              text="Four of these are settled. Three are blanks, and every blank has a date."
            />
          </div>
          <p className="eg-lede t-lede">
            A vendor without a published attestation gets assessed by hand. So here is the form as your risk
            team will read it, gaps included, rather than a badge standing in for one.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <AnswerRail items={answers} />
          </div>
        </div>
      </section>

      {/* 03 — Surfaces */}
      <section className="sec-surfaces band-light sx" aria-labelledby="surfaces-heading">
        <div className="eg sec-head">
          <span className="sx-top" aria-hidden="true" />
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Surfaces</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="surfaces-heading"
              text="Four places a document comes to rest, and a separate clock on each."
            />
          </div>
          <p className="eg-lede t-lede">
            One deletion promise covering everything is the answer that fails a review. These are the surfaces
            underneath it, including the two that usually go unmentioned.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SurfaceCut surfaces={surfaces} />
          </div>
        </div>
      </section>

      {/* 04 — Accountability */}
      <section className="sec-record band-deep sx" aria-labelledby="record-heading">
        <div className="eg sec-head">
          <span className="sx-top" aria-hidden="true" />
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Accountability</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="record-heading"
              text="Try to take the original out of the record."
            />
          </div>
          <p className="eg-lede t-lede">
            A reviewer overruled the system on this file. An auditor never asks whether that is allowed — they
            ask what survives it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <NoRemoval record={overrideRecord} />
          </div>
        </div>
      </section>

      {/* 05 — Custody */}
      <section className="sec-custody band-light sx" aria-labelledby="custody-heading">
        <div className="eg sec-head">
          <span className="sx-top" aria-hidden="true" />
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">Custody</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="custody-heading"
              text="The chain is short, it is named, and it stops."
            />
          </div>
          <p className="eg-lede t-lede">
            The hardest question in a vendor review is not who you are. It is who stands behind you, and
            whether that list can grow without anyone telling the lender.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ChainStop holders={holders} terminus={terminus} />
          </div>
        </div>
      </section>

      <section className="sec-close band-white sx" aria-labelledby="cta-heading">
        <div className="eg">
          <span className="sx-top" aria-hidden="true" />
          <span className="eg-rail hx-mono">06</span>
          <div className="eg-full">
            <ReviewClose
              kicker="Founder-led review"
              heading="Bring the questionnaire to the call."
              lede="Access, retention, custody and audit worked through against your own review process, by the person who can commit to the answers."
              steps={closeSteps}
              calendlyUrl={calendlyUrl}
              email="arin@cevrynt.com"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
