import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { FounderClose } from "@/components/home/founder-close";
import { RevealLines } from "@/components/home/reveal-lines";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { PackageStacks } from "@/components/integrations/package-stacks";
import { HandoffLog } from "@/components/integrations/handoff-log";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("integrations");

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

/**
 * What a broker package actually contains, read from the intake export rendered
 * beneath it. The ranges there are 1–6, 7–126, 127–128, 129 and 130–143, so the
 * total is the last page of the last document rather than a figure anybody
 * chose, and the height of every stack below is its real page count.
 *
 * Each `reads` list describes what the product structures from that document.
 * None of it claims an accuracy, a rate or an outcome.
 */
const PACKAGE_TOTAL = 143;

const packageDocuments = [
  {
    name: "Business application",
    range: "pp. 1–6",
    pages: 6,
    summary:
      "The claim. Everything here is what the borrower says is true, and every document after it exists to test one part of that against evidence.",
    reads: ["Legal name", "EIN", "Entity type", "Ownership split", "Amount requested"],
  },
  {
    name: "Bank statements",
    range: "pp. 7–126",
    pages: 120,
    summary:
      "Most of the file. Six statements across a hundred and twenty pages is where underwriting actually happens, and it is the part nobody has time to read line by line.",
    reads: ["Deposits", "Average daily balance", "NSF events", "Negative days", "Inter-account transfers"],
  },
  {
    name: "Owner identity",
    range: "pp. 127–128",
    pages: 2,
    summary:
      "Two pages that settle whether the person on the application is the person on the account.",
    reads: ["Legal name", "Date of birth", "Document expiry", "Match to application"],
  },
  {
    name: "Bank proof",
    range: "p. 129",
    pages: 1,
    summary:
      "A single page, and the only thing tying those statements to an account the business actually controls.",
    reads: ["Account number", "Routing number", "Account holder", "Match to statements"],
  },
  {
    name: "Existing MCA agreement",
    range: "pp. 130–143",
    pages: 14,
    summary:
      "The position already on the book. Missing it is how a file gets funded into a stack.",
    reads: ["Funder", "Outstanding balance", "Remittance amount", "Remittance frequency"],
  },
];

const intakeShot = {
  src: "/media/Steps/intake.png",
  alt: "Cevrynt intake view of an illustrative broker package: mixed borrower files on the left, the document map and structured borrower schema in the centre, and every structured field carrying the page and line it was read from on the right",
  caption: "Illustrative workspace · synthetic borrower data",
};

/**
 * One deal, step by step, exactly as it runs now.
 *
 * `manual` marks a step a person performs only because two systems do not
 * speak: downloading, renaming, copying a reference, retyping a finding. Those
 * are the rows a connection would remove.
 *
 * Nothing judgemental is marked. The review, the notes and the approval are not
 * hand-offs, they are the work, and they stand in both trails — which is the
 * half of this argument that matters most.
 */
const dealTrail = [
  { actor: "Broker", text: "Sends the package to a submissions inbox." },
  { actor: "Operations", text: "Downloads five files, renames them and uploads them to wherever the review happens.", manual: true },
  { actor: "Cevrynt", text: "Classifies and structures the package, linking every field back to its page." },
  { actor: "Operations", text: "Opens the CRM and finds or creates the deal record for this submission.", manual: true },
  { actor: "Operations", text: "Copies the deal reference across so the review and the record can be matched later.", manual: true },
  { actor: "Cevrynt", text: "Runs financial analysis, verification, fraud signals and the lender’s own policy." },
  { actor: "Underwriter", text: "Reviews the findings, adds notes and records any override." },
  { actor: "Operations", text: "Retypes the findings, exceptions and figures into the system of record.", manual: true },
  { actor: "Underwriter", text: "Approves, declines or sends the file back for more information." },
];

/**
 * The access boundary. Everything on the left is the least a connection could
 * need; everything on the right is a thing this product should never do, and
 * saying so before anybody asks is the cheapest credibility on the page.
 */
const accessTerms = [
  {
    asks: "Read access, scoped to the deals you name",
    never: "Standing access to your whole book",
  },
  {
    asks: "A deal identifier, so one file stays one file",
    never: "Borrower data moved anywhere you have not approved",
  },
  {
    asks: "A destination for the finished record",
    never: "Writing back into your systems without a person approving it",
  },
  {
    asks: "An agreed retention and deletion period",
    never: "Holding a file after the period you set",
  },
];

/**
 * The finished record, read from the Deal Memo export rendered beneath it.
 *
 * Every figure here is in that image — requested amount, deposits, balance,
 * positions, the open exception — so a reader can find each one in the picture.
 * Cedar & Stone LLC is the persistent illustrative deal used across the site.
 *
 * The dispositions are listed, not offered. The memo itself states that no
 * automated approval or decline has been issued, and this section says the same
 * thing rather than softening it.
 */
const memoFigures = [
  { k: "Requested", v: "$20,000" },
  { k: "Avg monthly deposits", v: "$91.3K" },
  { k: "Avg daily balance", v: "$34.8K" },
  { k: "Active MCA positions", v: "1" },
];

const memoFindings = [
  {
    title: "Business & identity",
    body: "Entity, standing and officer records align. One address detail remains open.",
    source: "Application p.1–2 · Registry record",
  },
  {
    title: "Financial position",
    body: "Average monthly deposits of $91.3K against an average daily balance of $34.8K, with recent NSF frequency improving.",
    source: "Bank statements · 12 months",
  },
  {
    title: "Debt & risk observations",
    body: "One active MCA position remains after corrected agreement review. Fraud signals were resolved as review items, not automatic determinations.",
    source: "Agreement p.1–14 · Fraud queue",
  },
];

const memoDispositions = ["Approve", "Conditional", "Request info", "Decline"];

const memoShot = {
  src: "/media/Steps/Deal Memo.png",
  alt: "Cevrynt deal memo for the illustrative Cedar & Stone LLC file: a deal snapshot with requested amount and deposit figures, a review-ready memo whose findings each cite their source document and page, and a decision summary whose approve, conditional, request-info and decline outcomes are marked as owned by the lender team",
  caption: "Illustrative deal · Cedar & Stone LLC · synthetic borrower data",
};

const scopeSteps = [
  {
    marker: "First call",
    title: "Name the systems that actually touch the file",
    body: "Usually fewer than a team expects, and often only one of them matters for a first pilot.",
  },
  {
    marker: "Before anything is built",
    title: "Agree the access and the destination",
    body: "What is read, what is written, where it goes, how long it is kept — written down before a line of it exists.",
  },
  {
    marker: "During the pilot",
    title: "Run it without the connection first",
    body: "The workflow has to stand up on files moved by hand before a connection is worth building for it.",
  },
];

export default function IntegrationsPage() {
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

      {/* Film grain over the whole page. One fixed layer, so it never repaints
          on scroll, and it runs continuously across section boundaries the way
          grain on film would — which is the point: it ties the bands together
          instead of leaving each one a flat panel. */}
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

      {/* 01 — The honest opening, drawn as the file itself */}
      <section className="ig-arrive band-light" aria-labelledby="arrive-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">What arrives</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="arrive-heading"
              text="Nothing has to be connected for this to work."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt takes the package a broker already sends, in whatever shape it arrives. Here is one of them,
            every page of it — and none of this needs a single system wired to anything.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PackageStacks documents={packageDocuments} total={PACKAGE_TOTAL} shot={intakeShot} />
          </div>
        </div>
      </section>

      {/* 02 — The same deal, twice */}
      <section className="ig-points band-deep" aria-labelledby="points-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Where a connection helps</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="points-heading"
              text="Four of these nine steps exist only because systems do not speak."
            />
          </div>
          <p className="eg-lede t-lede">
            One submission and every step it takes through a lender today. Switch the control to drop the steps
            a connection would answer for, and see which ones survive.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <HandoffLog
              steps={dealTrail}
              caveat="No connection here exists today. This is the trail one would produce, not something you can switch on."
            />
          </div>
        </div>
      </section>

      {/* 03 — The access boundary */}
      <section className="ig-access band-light" aria-labelledby="access-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Access</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="access-heading"
              text="What a connection would ask for, and what it never would."
            />
          </div>
          <p className="eg-lede t-lede">
            Worth reading before a walkthrough rather than during one.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            {/* Still a real table — this is two columns of terms compared row by
                row — but drawn as the boundary it describes: a permitted side,
                a sealed side, and a lit seam between them. */}
            <div className="ac">
              <span className="ac-glow" aria-hidden="true" />
              <table className="ac-terms">
                <caption className="sr-only">
                  What a connection would require, set against what it would never do.
                </caption>
                <thead>
                  <tr>
                    <th scope="col"><span className="ac-h">Would ask for</span></th>
                    <th scope="col"><span className="ac-h ac-h-never">Would never</span></th>
                  </tr>
                </thead>
                <tbody>
                  {accessTerms.map((term) => (
                    <tr className="ac-term" key={term.asks}>
                      <td className="ac-asks">{term.asks}</td>
                      <td className="ac-never">{term.never}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Why there is no logo wall */}
      <section className="ig-scope band-deep" aria-labelledby="scope-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">How it gets decided</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="scope-heading"
              text="No logos on this page, and that is deliberate."
            />
          </div>
          <p className="eg-lede t-lede">
            A wall of marks would tell you a connection exists. Cevrynt does not claim one it has not built and
            agreed with you, so instead here is how one gets scoped.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            {/* Driven entirely by CSS scroll timelines: the rail fills and each
                step arrives as you read past it, with no JavaScript involved at
                all. Where scroll timelines are unsupported every step is simply
                already there. */}
            <div className="sc">
              <ol className="sc-steps">
                <span className="sc-rail" aria-hidden="true">
                  <span className="sc-rail-fill" />
                </span>
                {scopeSteps.map((step, index) => (
                  <li className="sc-step" key={step.title}>
                    <span className="sc-node" aria-hidden="true">
                      <span className="sc-node-glow" />
                      <span className="hx-mono sc-node-n">{String(index + 1).padStart(2, "0")}</span>
                    </span>
                    <div className="sc-card">
                      <span className="hx-mono sc-marker">{step.marker}</span>
                      <h3 className="sc-title">{step.title}</h3>
                      <p className="sc-body">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="sc-note">
                If a connection you need is not possible yet, the walkthrough is where you find that out — not
                three weeks into a pilot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — What crosses back */}
      <section className="ig-memo band-light" aria-labelledby="memo-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">What crosses back</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="memo-heading"
              text="What leaves is a memo, not a decision."
            />
          </div>
          <p className="eg-lede t-lede">
            The same file after review: findings consolidated, every conclusion still carrying the document and
            page it came from, and the call itself left where it belongs.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            {/* Positioned rather than stacked: the document sits to one side and
                holds still while its findings are read past it. The picture is
                cropped to the memo’s own findings column — a near-square region
                of the export — so it is narrow and shown close to native size
                instead of a full-width letterbox band. */}
            <div className="mm">
              <figure className="mm-visual">
                <div className="mm-win">
                  <Image
                    src={memoShot.src}
                    alt={memoShot.alt}
                    width={1600}
                    height={760}
                    sizes="(max-width: 900px) 280vw, 1240px"
                    loading="lazy"
                  />
                </div>
                <figcaption className="hx-mono mm-caption">{memoShot.caption}</figcaption>
              </figure>

              <div className="mm-body">
                <dl className="mm-figures">
                  {memoFigures.map((f) => (
                    <div className="mm-figure" key={f.k}>
                      <dt className="hx-mono mm-figure-k">{f.k}</dt>
                      <dd className="mm-figure-v">{f.v}</dd>
                    </div>
                  ))}
                </dl>

                <ol className="mm-findings">
                  {memoFindings.map((f, i) => (
                    <li className="mm-finding" key={f.title} style={{ "--i": i }}>
                      <h3 className="mm-finding-title">{f.title}</h3>
                      <p className="mm-finding-body">{f.body}</p>
                      {/* The citation is the point of the section: a finding
                          that cannot be traced is just an assertion. */}
                      <p className="hx-mono mm-source">
                        <span className="mm-source-k">Traced to</span>
                        {f.source}
                      </p>
                    </li>
                  ))}
                </ol>

                {/* Listed, never offered. The product does not press these. */}
                <div className="mm-decide">
                  <p className="hx-mono mm-decide-k">Your team decides</p>
                  <ul className="mm-outcomes">
                    {memoDispositions.map((d, i) => (
                      <li className="mm-outcome" key={d} style={{ "--i": i }}>{d}</li>
                    ))}
                  </ul>
                  <p className="mm-decide-note">
                    No automated approval or decline is issued. The memo is ready for a reviewer to resolve the
                    open exception and make the final call.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="Founder-led walkthrough"
          heading="Bring the systems the file actually touches."
          lede="Map the intake you have today, agree what a connection would need, and decide whether one is worth building at all."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
