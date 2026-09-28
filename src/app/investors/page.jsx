import Image from "next/image";
import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { SourceLedger } from "@/components/investors/source-ledger";
import { StickySurfaces } from "@/components/investors/sticky-surfaces";
import { TractionBoard } from "@/components/investors/traction-board";
import { WeightedSides } from "@/components/investors/weighted-sides";
import { SegmentTracks } from "@/components/investors/segment-tracks";
import { TeamRoster } from "@/components/investors/team-roster";
import { StepStack } from "@/components/investors/step-stack";
import { RoundAllocation } from "@/components/investors/round-allocation";
import { BetPanels } from "@/components/investors/bet-panels";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, pageBreadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageByPath } from "@/content/site-pages";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const investorEmail = "arin@cevrynt.com";

const page = pageByPath.get("investors");

export function generateMetadata() {
  return pageMetadata(page);
}

/* --------------------------------------------------------------------------
   The public version of the pre-seed investor deck. The deck itself is not
   published or attached: it is shared after an investor meeting or by email,
   which is what every CTA on this page offers.

   Standing constraints for this page:

   1. The raise ($250K pre-seed), use of funds and roadmap exit criteria are
      approved for publication. Nothing here is an offer to sell a security;
      the closing note says so and must stay.
   2. "200+ real-world files evaluated" and the monthly counts are internal
      evaluation figures on the working MVP — not customers, pilots, contracts
      or revenue, and not a claim about accuracy.
   3. No competitor is named. The deck's comparison table and funding chart
      describe other companies; they stay in the deck.
   4. Market-size figures stay in the deck until they carry sources that
      reconcile (the deck's SAM and its segment breakdown do not).
   5. SHOPLINE is described only as a signed Development and Referral
      Agreement around e-commerce merchant-underwriting workflows — never as
      a live integration, investment, endorsement, or eligibility for anybody.
   6. Third-party providers are described by role, not by name.
   -------------------------------------------------------------------------- */

/* 01 — the bottleneck --------------------------------------------------------- */

const sources = [
  { k: "Borrower application", v: "Intake details and attestations." },
  { k: "Bank statements & ACH", v: "Cash-flow truth: deposits, balances, returns." },
  { k: "Existing debt & MCA positions", v: "Stacking risk and repayment load." },
  { k: "KYB, KYC & records", v: "Is the business, and the owner, who they say?" },
  { k: "Address & web evidence", v: "Is this a real, operating business?" },
  { k: "Fraud & inconsistency", v: "Altered documents and figures that do not reconcile." },
  { k: "The lender's own policy", v: "Risk appetite, thresholds and exceptions." },
];

const sourcesCallout =
  "In alternative lending, slower review means lost merchants, higher operating cost, and decisions that are harder to explain later.";

const sourcesNote =
  "Cevrynt is not another point OCR tool. It is the decision layer across the whole review: every source above feeds one evidence-linked record, and the lender still makes the call.";

/* 02 — what is built ---------------------------------------------------------- */

const surfaceReadout = {
  builtK: "Built · intake to decision, working today",
};

const surfaces = [
  {
    shown: true,
    k: "Intake & extraction",
    b: "Manual upload, bulk packages or a borrower form, then OCR plus structured document intelligence with source references kept attached.",
  },
  {
    k: "Financial analysis",
    b: "Bank, ACH, existing debt, cash-flow and risk signals structured from the statements themselves.",
  },
  {
    shown: true,
    k: "Verification",
    b: "KYB and KYC checks, registry records, web and address evidence, with conflicts kept visible.",
  },
  {
    k: "Fraud & review signals",
    b: "Document issues, inconsistencies and unusual activity surfaced with the evidence behind them.",
  },
  {
    shown: true,
    k: "Lender policy",
    b: "The lender's own rules, versioned, applied to the same evidence rather than a generic AI verdict.",
  },
  {
    shown: true,
    k: "Explainable memo",
    b: "A decision-ready review with every finding traceable. Cevrynt recommends; the lender decides.",
  },
];

const surfaceFigure = "200+";
const surfaceFigureK = "real-world underwriting files evaluated on the working MVP";

const surfacePlates = [
  {
    surface: 0,
    k: "A financial finding traced back to the statement page and supporting transactions.",
    shot: {
      src: "/media/placeholder/Traceable.png",
      alt: "Illustrative Cevrynt evidence-trace view showing an $84,613 financial finding linked back to the supporting bank statement page, source lines, and underlying transaction evidence.",
    },
  },
  {
    surface: 2,
    k: "A verification conflict kept open with both values and their evidence preserved.",
    shot: {
      src: "/media/placeholder/Exception-aware.png",
      alt: "Illustrative Cevrynt verification view showing conflicting business information side by side, both source values preserved, and the mismatch held open for human review.",
    },
  },
  {
    surface: 4,
    k: "Lender-defined criteria applied with the exception left visible for judgment.",
    shot: {
      src: "/media/placeholder/policy-led.png",
      alt: "Illustrative Cevrynt policy view showing lender-configured criteria, observed values, thresholds, passing checks, and one exception kept open for reviewer judgment.",
    },
  },
  {
    surface: 5,
    k: "A decision-ready review assembled with the evidence, policy context, and reviewer record intact.",
    shot: {
      src: "/media/placeholder/Human-owned.png",
      alt: "Illustrative Cevrynt underwriting-record view bringing financial findings, verification issues, policy exceptions, source-linked evidence, and reviewer context into one reviewable case.",
    },
  },
];

const surfaceClose =
  "A working workspace from intake to decision — not a slide-deck promise. API, LOS and CRM integrations are on the roadmap, not claimed as production today.";

const surfaceNote =
  "Product views shown here use illustrative synthetic borrower data. Real-world files have been used for internal development and evaluation; they are not customer deployments, funded transactions, or independently validated accuracy results.";

/* 03 — traction ---------------------------------------------------------------- */

const tractionFigures = [
  { k: "Real-world files evaluated", v: "200+", b: "Across MCA, working-capital and alternative-lending workflows." },
  { k: "Fastest end-to-end memo", v: "4m 17s", b: "From uploaded package to review-ready memo, in one internal run." },
  { k: "Evidence sources connected", v: "7", b: "The seven sources a reviewer otherwise connects by hand." },
  { k: "Signed partner agreement", v: "1", b: "Development and Referral Agreement with SHOPLINE." },
];

const tractionSeries = [
  { k: "Mar", n: 12 },
  { k: "Apr", n: 20 },
  { k: "May", n: 34 },
  { k: "Jun", n: 47 },
  { k: "Jul", n: 63 },
  { k: "Aug", n: 80, label: "80+" },
];

const tractionClose = "Next milestone: design-partner pilots and the first paying customers.";

const tractionNote =
  "Figures are internal evaluation counts on the working MVP for 2026. They are not customers, pilots, contracts or revenue, and the memo time is from a single run rather than an average.";

/* 04 — why it becomes sticky --------------------------------------------------- */

const moatStatement = [
  "A generic AI answer is not enough.",
  "Each lender has its own risk appetite.",
  "Cevrynt encodes it — and keeps every version.",
];

const moatSides = [
  {
    cost: true,
    k: "A generic AI answer",
    foot: "Easy to try, and just as easy to replace.",
    items: [
      { k: "Same answer for every lender.", b: "One model's view, whatever the lender's appetite." },
      { k: "Policy applied after the fact.", b: "A reviewer still reconciles the output with the credit rules by hand." },
      { k: "No record of policy changes.", b: "Nothing shows which rules a past decision was made under." },
      { k: "A verdict, not a workflow.", b: "Switching cost is close to zero." },
    ],
  },
  {
    k: "Cevrynt",
    foot: "Every policy-encoded lender adds switching cost, and the dataset compounds with every reviewed deal.",
    items: [
      { k: "Consistent decisions inside each lender.", b: "The same evidence, evaluated against that lender's own rules." },
      { k: "An audit trail around policy changes.", b: "Versions are kept, so past decisions stay explainable." },
      { k: "More embedded workflows over time.", b: "Intake, review and memo live in one place." },
      { k: "A dataset of evidence, policy and reviewed outcomes.", b: "Switching cost rises as policy is encoded." },
    ],
  },
];

const moatClose =
  "Lender policy is part of the decision, not a note after the fact. That is what makes Cevrynt harder to replace than a model call.";

const moatNote =
  "Describes the product's design and the intended source of defensibility. It is not a claim about current customer retention or switching behavior.";

/* 05 — where it starts --------------------------------------------------------- */

const wedgePremise = "Start in MCA. The same infrastructure serves the rest.";

const wedgeReadout = { corner: "Market entry paths" };

const wedgeSegments = [
  { k: "MCA funders" },
  { k: "Alternative lenders" },
  { k: "Brokers & ISOs" },
  { k: "E-commerce underwriting" },
];

const wedgeProperties = [
  {
    k: "The file",
    cells: [
      "Applications, bank statements, existing positions, and business evidence.",
      "Borrower documents, financials, verification, and supporting records.",
      "A submission package prepared for one or more downstream funders.",
      "Bank evidence alongside approved commerce activity, payouts, and operating history.",
    ],
  },
  {
    k: "Who decides",
    cells: [
      "The funder's underwriting team.",
      "The lender's credit or risk team.",
      "The downstream funder, not the broker.",
      "The financing provider reviewing the merchant.",
    ],
  },
  {
    k: "What varies",
    cells: [
      "Repayment tolerance, stacking rules, thresholds, and risk appetite.",
      "Product criteria, eligibility rules, exceptions, and policy version.",
      "Required documents, lender appetite, stipulations, and submission requirements.",
      "Available commerce evidence, lender criteria, and how platform activity is weighed.",
    ],
  },
];

const wedgeFoot =
  "MCA comes first: the fastest decision cycles, the most document pain, and the clearest wedge. The underwriting work underneath every segment repeats — assemble the evidence, understand the financials, verify the business, apply lender policy, and prepare the case for human review.";

const wedgeClose =
  "One evidence and policy layer, not four separate products. Market sizing and its sources are covered in the investor meeting.";

const wedgeNote =
  "These are Cevrynt's market-entry paths, not customer counts, market share, or active deployments.";

/* 06 — the team ---------------------------------------------------------------- */

const teamPeople = [
  { n: "1", k: "Founder", b: "Arin leads product, lender conversations, partnerships and the raise." },
  { n: "6+", k: "Engineering & product", b: "Building the workspace, document pipeline, verification and policy engine." },
  { n: "2", k: "Marketing", b: "Content, SEO, partnerships and go-to-market support." },
];

const teamFacts = [
  { k: "Delaware C-Corp", b: "Cevrynt, Inc. is registered in Delaware at 8 The Green, Ste R, Dover, Kent County, DE 19901, USA, with clean records, IP assignment, cap table and banking in place." },
  { k: "SOC 2 readiness", b: "Controls, policies, evidence collection and audit prep, funded by this round. Not claimed until an independent auditor issues the report." },
  { k: "Security work", b: "Access controls, logging, penetration testing, vendor review and data-handling discipline." },
  { k: "Provider-flexible architecture", b: "No single-model dependency: reasoning, OCR, verification and search providers can be swapped per workflow stage without re-architecting." },
];

const teamClose =
  "Lenders buy accuracy, but also security, process and clean structure. The company is set up for that from the start.";

const teamNote =
  "Team figures describe current headcount across employees and contractors. They are not a committed hiring plan.";

/* 07 — go-to-market ------------------------------------------------------------ */

const gtmReadout = { head: "Go-to-market · four steps, in order" };

const gtmSteps = [
  {
    k: "Direct demos",
    b: "Walk lenders through a file their team already knows, using their own policy, so the output is judged against a case they understand.",
    tag: "Where we are now",
  },
  {
    k: "Design-partner pilots",
    b: "Scoped pilots on representative files and lender-specific criteria, with human approval authority explicit throughout.",
    tag: "Funded by this round",
  },
  {
    k: "Paying customers",
    b: "A SaaS platform fee, with usage-based processing, integrations and premium modules — verification, automation, white-label — as expansion.",
    tag: "Subscription + usage",
  },
  {
    k: "Case studies, then repeatable acquisition",
    b: "Documented outcomes feed SEO, content and partner channels, so acquisition stops depending on one conversation at a time.",
    tag: "Next-round evidence",
  },
];

const gtmNoteLine =
  "Start with the workflow. Expand through usage, integrations and automation.";

const gtmAside = {
  k: "SHOPLINE · signed Development and Referral Agreement",
  b: "Cevrynt has signed a Development and Referral Agreement to operate as a technology and referral partner on the SHOPLINE platform, around e-commerce merchant-underwriting workflows. SHOPLINE merchants need working capital; Cevrynt structures documents, evidence and fraud signals; funding partners receive organized opportunities. The lender keeps final decision authority. It is not a live integration, an investment, or a promise of merchant eligibility or funding.",
};

const gtmClose =
  "Revenue paths: subscription, usage, integrations and referral. Pricing is scoped per lender and is not published.";

const gtmNote =
  "Describes the planned go-to-market sequence, not completed deployments or scaled distribution.";

/* 08 — the round --------------------------------------------------------------- */

const round = {
  stage: "Pre-seed round · 2026",
  amount: "$250K",
  purpose: "To take the working MVP to a lender-ready launch: product reliability, test volume, paid pilots, SOC 2 readiness and credible recurring revenue.",
  terms: [
    { k: "Instrument", v: "Standard SAFE or an agreed instrument" },
    { k: "Entity", v: "Cevrynt, Inc. · Delaware C-Corp" },
    { k: "Registered address", v: "8 The Green, Ste R, Dover, DE 19901, USA" },
    { k: "Deck", v: "Shared after a meeting or by email" },
  ],
};

const allocation = [
  { pct: 40, k: "Product & engineering", b: "Core team, product maturity, QA, SaaS hardening, automation, API foundation and integrations." },
  { pct: 25, k: "AI, cloud, data & testing", b: "Model calls, OCR, verification APIs, infrastructure, storage and regression testing." },
  { pct: 15, k: "Go-to-market", b: "Design partners, direct sales, SEO, content, partnerships and onboarding." },
  { pct: 10, k: "Operations & runway reserve", b: "Essential operating costs and a buffer for longer lender sales cycles." },
  { pct: 10, k: "Security, SOC 2 & contingency", b: "Controls, penetration testing, audit prep and a compliance buffer." },
];

const roundClose =
  "The next raise is built on evidence: paying customers, usage data, SOC 2 readiness and credible recurring revenue.";

const roundNote =
  "This page is for information only and is not an offer to sell, or a solicitation of an offer to buy, any security. Any investment will be made only through definitive documents and only with investors who qualify under applicable securities laws.";

/* 09 — what the round buys, milestone by milestone ---------------------------- */

const roadmapReadout = {
  head: "12–18 month plan · four milestones, each with an exit criterion",
  failK: "Exit criterion",
};

const roadmap = [
  {
    k: "0–3 months · Make it dependable",
    b: "Accuracy benchmarks, automated testing, exception handling, multi-tenant SaaS and a security baseline.",
    fail: "Accuracy of 95% or better on the regression set.",
  },
  {
    k: "3–6 months · Make it launchable",
    b: "Billing, onboarding, monitoring, SOC 2 readiness, commercial packaging and design partners.",
    fail: "SOC 2 Type I audit kicked off.",
  },
  {
    k: "6–12 months · Make it connected",
    b: "API foundation, LOS and CRM readiness, email reading, event-based workflows and paid pilots.",
    fail: "First paid pilot live.",
  },
  {
    k: "12–18 months · Make it repeatable",
    b: "SEO, partnerships, expansion revenue, portfolio intelligence and next-round metrics.",
    fail: "$25K+ MRR, or next-round metrics.",
  },
];

const roadmapFoot =
  "Target: lender-ready SaaS, design-partner pilots, first paying customers and a data-backed next raise.";

const roadmapClose = "From dependable, to launchable, to connected, to repeatable.";

const roadmapNote =
  "Milestones and exit criteria are targets set for investor accountability, not results already achieved or guaranteed.";

export default function InvestorsPage() {
  const pageJsonLd = webPageJsonLd(page);
  const breadcrumbJsonLd = pageBreadcrumbJsonLd(page);

  return (
    <main id="main-content">
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy heading={page.title} lede={page.description} />
          <div className="hero-actions">
            <RainbowCta href={page.ctaHref || calendlyUrl} label={page.cta || "Book an investor meeting"} />
          </div>
        </div>
        <div className="hero-dashboard-wrap">
          <div className="hero-dashboard-frame">
            <div className="hero-dashboard-float">
              {/* The supplied investor visual, shown whole. Its headline and
                  figures are part of the artwork, so the alt text carries them. */}
              <Image
                src="/media/cevrynt-investor-hero.webp"
                alt="Invest in Cevrynt: AI infrastructure for faster, fairer lending decisions. Cevrynt helps small business lenders underwrite MCA applications in minutes with evidence-backed AI, keeping the human decision in control. 2–4 min underwriting review time, ≥95% target accuracy, $3–$4 estimated cost per case. Shown beside an illustrative Cevrynt underwriting dashboard on a laptop."
                width={1672}
                height={941}
                priority
                loading="eager"
                sizes="(max-width: 560px) calc(250vw - 70px), (max-width: 760px) calc(100vw - 28px), min(1600px, calc(100vw - 80px))"
              />
            </div>
          </div>
        </div>
      </HeroMotion>

      {/* 01 — the bottleneck */}
      <section className="band-light" aria-labelledby="problem-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">THE BOTTLENECK</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="problem-heading"
              text="Collecting files is easy. Turning them into a defensible decision is not."
            />
          </div>
          <p className="eg-lede t-lede">
            A reviewer still connects seven things by hand. Every handoff adds time. Every manual interpretation adds variance.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SourceLedger
              sources={sources}
              head="Seven sources · one review"
              callout={sourcesCallout}
              note={sourcesNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — what is built */}
      <section className="iv-surfaces band-deep" aria-labelledby="surfaces-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">WORKING PRODUCT TODAY</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="surfaces-heading"
              text="A working workspace from intake to decision."
            />
          </div>
          <p className="eg-lede t-lede">
            Intake, extraction, analysis, verification and a policy-aware memo, connected end to end. Cevrynt recommends. The lender still decides.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <StickySurfaces
              surfaces={surfaces}
              plates={surfacePlates}
              figure={surfaceFigure}
              figureK={surfaceFigureK}
              close={surfaceClose}
              note={surfaceNote}
              readout={surfaceReadout}
            />
          </div>
        </div>
      </section>

      {/* 03 — traction */}
      <section className="band-light" aria-labelledby="traction-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">TRACTION ON REAL FILES</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="traction-heading"
              text="Working MVP. Real files. Real evidence."
            />
          </div>
          <p className="eg-lede t-lede">
            Not a prototype. The MVP has processed more than 200 real-world borrower files across MCA and alternative-lending workflows, and the monthly count keeps rising.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <TractionBoard
              figures={tractionFigures}
              series={tractionSeries}
              head="Internal evaluation · working MVP"
              chartK="Files evaluated per month · 2026"
              chartFoot="Cumulative 200+ files across MCA, working-capital and alternative-lending deal flows."
              close={tractionClose}
              note={tractionNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — why it becomes sticky */}
      <section className="iv-founder band-deep" aria-labelledby="moat-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">WHY IT BECOMES STICKY</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="moat-heading"
              text="Lender policy is part of the decision, not a note after the fact."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt applies each lender&apos;s policy to the same underlying evidence and preserves policy versions over time. That is the switching cost.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <WeightedSides statement={moatStatement} sides={moatSides} close={moatClose} note={moatNote} />
          </div>
        </div>
      </section>

      {/* 05 — where it starts */}
      <section className="iv-wedge band-light" aria-labelledby="wedge-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">THE MARKET WEDGE</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="wedge-heading"
              text="Start in MCA. Expand across SMB finance."
            />
          </div>
          <p className="eg-lede t-lede">
            Small-business and alternative lending is large, document-heavy, and still underwritten by hand. The category is moving from extraction tools to decision infrastructure, and lenders still need policy control, explainability, audit trails and human final authority.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SegmentTracks
              segments={wedgeSegments}
              properties={wedgeProperties}
              premise={wedgePremise}
              foot={wedgeFoot}
              close={wedgeClose}
              note={wedgeNote}
              readout={wedgeReadout}
            />
          </div>
        </div>
      </section>

      {/* 06 — the team */}
      <section className="band-deep" aria-labelledby="team-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">06</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">TEAM & COMPANY</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="team-heading"
              text="Nine-plus people, inside a clean Delaware company."
            />
          </div>
          <p className="eg-lede t-lede">
            A founder, six-plus engineers and product builders, and two marketers — with the entity, security work and financing structure already in place.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <TeamRoster
              people={teamPeople}
              facts={teamFacts}
              head="Team today · Cevrynt, Inc."
              factsK="Investment readiness"
              close={teamClose}
              note={teamNote}
            />
          </div>
        </div>
      </section>

      {/* 07 — go-to-market */}
      <section className="iv-route band-light" aria-labelledby="route-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">07</span>
          <div className="eg-head">
            <p className="hx-kicker">DISTRIBUTION & MODEL</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="route-heading"
              text="Demos, then pilots, then paying customers."
            />
          </div>
          <p className="eg-lede t-lede">
            Direct lender demos today, a signed SHOPLINE referral agreement for merchant-side reach, and a SaaS model that expands with usage.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <StepStack
              steps={gtmSteps}
              noteLine={gtmNoteLine}
              aside={gtmAside}
              close={gtmClose}
              note={gtmNote}
              readout={gtmReadout}
            />
          </div>
        </div>
      </section>

      {/* 08 — the round */}
      <section className="band-deep" aria-labelledby="round-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">08</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">THE ASK</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="round-heading"
              text="$250K pre-seed to reach a lender-ready launch."
            />
          </div>
          <p className="eg-lede t-lede">
            The round funds product reliability, test volume, paid pilots, SOC 2 readiness and the first recurring revenue.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <RoundAllocation
              round={round}
              allocation={allocation}
              head="Use of funds · $250K"
              close={roundClose}
              note={roundNote}
            />
          </div>
        </div>
      </section>

      {/* 09 — the plan the round buys */}
      <section className="iv-bet band-light" aria-labelledby="bet-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">09</span>
          <div className="eg-head">
            <p className="hx-kicker">ROADMAP</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="bet-heading"
              text="Four milestones, each with a measurable exit."
            />
          </div>
          <p className="eg-lede t-lede">
            A 12–18 month plan built for investor accountability. Each stage ends on a criterion anyone can check.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <BetPanels
              className="bet-4"
              bets={roadmap}
              foot={roadmapFoot}
              close={roadmapClose}
              note={roadmapNote}
              readout={roadmapReadout}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="10"
          kicker="REQUEST THE PITCH DECK"
          heading="See the full deck in a 20-minute meeting."
          lede="The pitch deck is not published. Book a private 20-minute product walkthrough and investor conversation, or email and the deck will be shared directly."
          calendlyUrl={calendlyUrl}
          email={investorEmail}
        />
      </section>
    </main>
  );
}
