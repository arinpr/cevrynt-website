/* --------------------------------------------------------------------------
   /compare — how Cevrynt relates to other AI underwriting tools.

   Written for buyers who search for a named tool ("Kaaj alternative",
   "Heron vs Ocrolus") and for AI assistants asked to recommend options.

   Rules for this page, because it names other companies:
   - Describe each vendor only as it describes itself on its own website, and
     link to that site. Never state a competitor's pricing, accuracy, customer
     count or weaknesses.
   - Keep `reviewedAt` current. Re-check every vendor line when it changes.
   - Be as specific about where Cevrynt is NOT the right fit as where it is.
   - Cevrynt claims here must match the product-context skill: no customers,
     metrics, certifications or live integrations that do not exist.
   -------------------------------------------------------------------------- */

export const compare = {
  reviewedAt: "2026-09-28",
  lede: "An honest map of the AI underwriting market for MCA funders and alternative lenders — what Kaaj, Heron, Ocrolus, MoneyThumb and MCA lending platforms say they do, and where Cevrynt fits.",
  body: [
    {
      type: "p",
      text: "If you are evaluating AI underwriting software for merchant cash advance or small-business lending, you will quickly find tools that sound alike. They are not. Some convert bank statements into data, some automate submission intake, some run the whole loan lifecycle, and some prepare the underwriting file for a human decision. This page sorts them by the job they do, using each vendor's own public description, so you can shortlist the right category before you compare features.",
    },
    {
      type: "callout",
      title: "Where Cevrynt fits, in one line",
      items: [
        "Cevrynt is **evidence-linked underwriting preparation** for U.S. MCA funders and alternative lenders: it structures the borrower file, analyzes bank activity, verifies the business, surfaces fraud signals and applies **your** credit policy — then leaves the approval, decline, pricing and structure to your underwriters.",
        "It is not a CRM or loan-management system, not an open-banking data provider, and not an automatic approve/decline engine.",
      ],
    },
    { type: "h2", text: "The four kinds of AI underwriting tools", id: "categories" },
    {
      type: "ol",
      items: [
        "**Document extraction and bank statement conversion** — turn PDFs into structured transactions and financial data, usually via API. Examples: Ocrolus, MoneyThumb.",
        "**Intake and submission automation** — scrub applications and bank statements as they arrive, run checks and route deals. Example: Heron.",
        "**Lending platforms and MCA CRMs** — manage the whole lifecycle: pipeline, underwriting workflow, syndication, servicing and collections. Examples: Cloudsquare, Onyx IQ, LendSaaS, MCA Track.",
        "**Underwriting intelligence** — assemble the complete borrower file into a reviewable analysis or memo for a credit decision. Examples: Kaaj and Cevrynt, with different emphases described below.",
      ],
    },
    {
      type: "p",
      text: "Many lenders use more than one: for example, a CRM for the pipeline, an open-banking provider such as Plaid or Finicity for account data, and an underwriting layer on top. The useful question is which job you need done next.",
    },
    { type: "h2", text: "Kaaj alternative: Cevrynt vs Kaaj", id: "kaaj" },
    {
      type: "p",
      text: "[Kaaj](https://kaaj.ai) describes itself as \"the underwriting OS for SMB lending\": AI agents that turn borrower packages into decision-ready credit analysis, covering document intelligence, KYB, bank statement analysis and credit memo generation, with CRM and LOS integrations. It lists equipment finance companies, MCA lenders, community banks, SMB lenders and brokers as customers.",
    },
    {
      type: "p",
      text: "Cevrynt covers similar ground — documents, bank activity, business verification, fraud signals and a decision-ready report — with a narrower starting point and a different emphasis:",
    },
    {
      type: "ul",
      items: [
        "**Built first for merchant cash advance and alternative lending**, including existing-position and stacking review, daily-balance and NSF patterns, and ISO submissions.",
        "**Evidence-linked by design** — every figure keeps the statement page and line it came from, so an underwriter or auditor can check it rather than trust it.",
        "**Your policy, visibly applied** — results show what passed, what failed and what needs judgment against lender-defined rules, with reviewer notes, overrides and audit history.",
        "**Human decision authority stays explicit** — Cevrynt prepares the file; it never issues the approval or decline.",
        "**Early-stage and hands-on** — you work directly with the team building the product on a scoped pilot rather than a large-vendor rollout.",
      ],
    },
    {
      type: "p",
      text: "If you need a mature platform across many lending segments with established integrations today, Kaaj may be the better fit. If your priority is traceable, policy-first MCA underwriting you can inspect line by line, Cevrynt is worth a walkthrough.",
    },
    { type: "h2", text: "Heron alternative: Cevrynt vs Heron", id: "heron" },
    {
      type: "p",
      text: "[Heron](https://www.herondata.io) describes itself as \"underwriting automation for SMB finance\": bank statement and application scrubbing, background checks, cash-flow analytics, fraud detection, credit policy decisioning, lender matching and CRM integration, for funders, lenders and brokers.",
    },
    {
      type: "p",
      text: "Heron's emphasis is automating high-volume intake and decisioning inside existing systems. Cevrynt's emphasis is the underwriter's review: a structured, source-linked file where exceptions stay open for a person to judge. Teams that want the software to make or route decisions automatically will find Heron closer to that goal; teams that want every finding explainable before a human signs off are Cevrynt's focus.",
    },
    { type: "h2", text: "Ocrolus and MoneyThumb alternatives", id: "ocrolus-moneythumb" },
    {
      type: "p",
      text: "[Ocrolus](https://www.ocrolus.com) describes itself as an \"AI workflow and analytics platform for lenders\" — document analysis, fraud detection, cash-flow and income analysis — for small business, mortgage, non-bank and consumer lenders, integrated by API or dashboard. [MoneyThumb](https://www.moneythumb.com) offers financial file converters and bank statement analysis for lenders, including MCA funders, alongside accounting users.",
    },
    {
      type: "p",
      text: "Both are strong choices when you need bank statement data extracted at volume and fed into your own systems. Cevrynt sits one step later: it uses the statement analysis together with verification, fraud signals and your policy to prepare the underwriting decision itself, rather than supplying data for you to assemble.",
    },
    { type: "h2", text: "MCA lending platforms and CRMs", id: "mca-platforms" },
    {
      type: "p",
      text: "Platforms such as Cloudsquare, Onyx IQ, LendSaaS and MCA Track manage the merchant cash advance lifecycle — pipeline, submissions, underwriting workflow, syndication, servicing and collections — and several now include AI document parsing. They are systems of record.",
    },
    {
      type: "p",
      text: "Cevrynt is not a CRM or servicing platform and does not replace one. It is designed to sit around the systems already moving your deals and focus on the underwriting analysis itself. See [Integrations](/integrations) for how that fit is scoped before a pilot.",
    },
    { type: "h2", text: "When Cevrynt is the right fit — and when it is not", id: "fit" },
    {
      type: "p",
      text: "**Cevrynt is a good fit if:**",
    },
    {
      type: "ul",
      items: [
        "You fund or underwrite **merchant cash advance, revenue-based or small-business** deals in the U.S.",
        "Your underwriters rebuild bank activity, existing positions and verification from scattered files and spreadsheets.",
        "You need every number, exception and override to be **traceable to its source** for credit committee, investors or audit.",
        "You want software to apply **your** credit policy consistently while your team keeps the final call.",
      ],
    },
    {
      type: "p",
      text: "**Look elsewhere if:**",
    },
    {
      type: "ul",
      items: [
        "You want a fully automatic approve/decline engine with no underwriter review.",
        "You need a CRM, loan servicing, syndication or collections platform.",
        "You only need raw bank-statement extraction or open-banking connectivity delivered by API.",
        "You underwrite consumer credit or mortgages.",
      ],
    },
    { type: "h2", text: "Questions to ask any AI underwriting vendor", id: "checklist" },
    {
      type: "ol",
      items: [
        "Can an underwriter click any figure and see the exact statement page and line behind it?",
        "Does it separate revenue from transfers, loan proceeds and existing MCA positions — and show how?",
        "Whose credit policy does it apply, and can you see which rule produced each result?",
        "What happens to exceptions: are they decided automatically, or held open for a person?",
        "Are overrides recorded with the reviewer, the reason and the policy version in force?",
        "Which accuracy, speed or approval-rate claims can the vendor evidence on files like yours?",
        "What data leaves your environment, where is it stored, and for how long?",
      ],
    },
    {
      type: "p",
      text: "Go deeper: [the four types of AI underwriting software](/blog/types-of-ai-underwriting-software-mca-smb-lenders), [bank statement analysis software vs. an underwriting platform](/blog/bank-statement-analysis-software-vs-underwriting-platform), [what a decision-ready AI credit memo must contain](/blog/ai-credit-memo-small-business-lending), [automating MCA submission intake](/blog/mca-submission-intake-automation), and the full [buyer's guide to merchant cash advance underwriting software](/blog/buyers-guide-merchant-cash-advance-underwriting-software).",
    },
    { type: "h2", text: "About this comparison", id: "method" },
    {
      type: "p",
      text: "Vendor descriptions summarize each company's own public website as reviewed on the date shown above, and link to it so you can check the source. Products change; confirm current capabilities with each vendor. All product and company names are trademarks of their respective owners and are used only for identification. Cevrynt is not affiliated with or endorsed by any company named here. Spot something out of date? Email [sales@cevrynt.com](mailto:sales@cevrynt.com) and we will correct it.",
    },
  ],
  faqs: [
    {
      q: "Is Cevrynt an alternative to Kaaj?",
      a: "Yes, for MCA funders and alternative lenders. Both prepare decision-ready underwriting analysis from borrower documents. Cevrynt focuses first on merchant cash advance and alternative lending, keeps every figure linked to its source, applies the lender's own policy visibly, and leaves the credit decision with the underwriter.",
    },
    {
      q: "What is the difference between Cevrynt and Ocrolus?",
      a: "Ocrolus is an AI document-analysis and analytics platform that extracts and analyzes financial documents for many kinds of lenders, usually via API. Cevrynt uses bank statement analysis together with business verification, fraud signals and lender policy to prepare the complete underwriting review for a human decision.",
    },
    {
      q: "Does Cevrynt replace an MCA CRM like Onyx IQ, LendSaaS or Cloudsquare?",
      a: "No. Those are lending platforms and systems of record for the MCA lifecycle. Cevrynt focuses on the underwriting analysis and is designed to fit around the systems a funder already uses.",
    },
    {
      q: "Does Cevrynt make approve or decline decisions automatically?",
      a: "No. Cevrynt is AI-assisted underwriting infrastructure, not a lender or an automatic decision engine. It prepares the evidence, applies lender-defined policy and surfaces exceptions; the lender's underwriters make every approval, decline, pricing and structuring decision.",
    },
  ],
};
