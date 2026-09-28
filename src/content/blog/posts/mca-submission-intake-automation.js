export const post = {
  slug: "mca-submission-intake-automation",
  title: "Automating MCA Submission Intake: From ISO Email to Underwriting Queue",
  metaTitle: "MCA Submission Intake Automation for Funders",
  metaDescription: "How MCA funders can automate ISO submission intake — application and statement scrubbing, checks and routing — without letting automation make credit decisions.",
  keywords: [
    "MCA submission intake automation",
    "ISO submission processing",
    "MCA application scrubbing",
    "bank statement scrubbing",
    "merchant cash advance intake",
    "MCA underwriting automation",
  ],
  category: "Underwriting Workflow",
  excerpt: "The first hour of an MCA submission decides how fast everything after it moves. Here is what to automate at intake, what to keep for the underwriter, and how to tell the difference.",
  publishedAt: "2026-09-28",
  updatedAt: "2026-09-28",
  readingTime: 5,
  workflowStage: "Intake",
  heroImage: null,
  relatedProductPaths: ["product/document-intelligence", "product/bank-statement-analysis"],
  relatedSlugs: [
    "how-brokers-isos-submit-cleaner-deals-faster-decisions",
    "hidden-cost-of-manual-document-review-mca",
    "underwriting-turnaround-time-fragmented-review",
  ],
  body: [
    {
      type: "p",
      text: "For most merchant cash advance funders, the underwriting process starts in an inbox. ISOs send submissions by email — an application, four to six months of bank statements, sometimes a driver's license, a voided check or processing statements — and each one waits until someone opens it, renames the files, checks what is missing and keys the basics into the CRM. In a busy week, deals that would have funded are lost simply because a faster funder answered first.",
    },
    {
      type: "p",
      text: "Submission intake is the most automatable part of MCA underwriting and also the easiest place to automate too much. This guide covers what intake should do, what to automate, and where automation should hand over to an underwriter.",
    },
    {
      type: "workflow",
      stage: "Intake",
      caption: "Intake is the first stage: getting a complete, labelled file in front of the right reviewer before any analysis begins.",
    },
    {
      type: "h2",
      text: "What intake has to accomplish",
      id: "what-intake-does",
    },
    {
      type: "ol",
      items: [
        "**Capture** every submission, whatever the channel — email, portal, API or CRM — against one deal record.",
        "**Classify** each document: application, which months of which account's statements, IDs, processing statements, contracts.",
        "**Check completeness** — missing months, unsigned applications, statements for a different account or entity.",
        "**Extract the basics** — business name, owners, requested amount, the statement period and headline figures.",
        "**Screen** against the funder's hard knock-out criteria, such as restricted industries, time in business or states you do not fund.",
        "**Route** the deal to the right queue with a clear status, and tell the ISO what is missing.",
      ],
    },
    {
      type: "h2",
      text: "What to automate at intake",
      id: "what-to-automate",
    },
    {
      type: "p",
      text: "Almost all of the list above is mechanical, and automating it is pure gain. Classification and completeness checks are where most manual time goes; a system that reads a submission and replies within minutes \"we have March–July for account ending 2208, June is missing\" does more for speed-to-offer than any downstream improvement. For the detail of reading mixed files, see our guide to **[document intelligence for lenders](/blog/document-intelligence-for-lenders)**.",
    },
    {
      type: "p",
      text: "Hard knock-outs are also safe to automate, provided they really are hard. A funder that never funds a particular industry gains nothing from an analyst confirming that by hand. The key is that these rules are the funder's own, written down, versioned and visible — not a vendor's default.",
    },
    {
      type: "h2",
      text: "What to keep for the underwriter",
      id: "what-to-keep",
    },
    {
      type: "p",
      text: "Trouble starts when intake automation begins to make soft credit calls. Scoring a file as \"low quality\" and sending it to the bottom of a queue, auto-declining on revenue that is just below a threshold, or treating an unusual deposit pattern as a red flag — each of these is a judgment that can be right for most files and wrong for the one that matters. Seasonal businesses, recent bank switches and legitimate transfers between the owner's accounts all look odd to a rule and normal to an experienced underwriter.",
    },
    {
      type: "callout",
      title: "A useful dividing line",
      items: [
        "**Automate** anything that is true or false from the documents: which month is missing, which entity a statement belongs to, whether an industry is on your restricted list.",
        "**Surface, do not decide** anything that needs context: revenue trends, deposit patterns, existing positions, mismatches between the application and the evidence.",
        "**Keep with a person** anything that commits capital: approval, decline, amount, factor and structure.",
      ],
    },
    {
      type: "h2",
      text: "Intake metrics worth tracking",
      id: "metrics",
    },
    {
      type: "ul",
      items: [
        "**Time to first response** — from submission received to the ISO hearing back, whether with an offer, a request or a decline.",
        "**Complete-on-arrival rate** by ISO — which partners send full files, and which need coaching. Our guide for **[brokers and ISOs](/blog/how-brokers-isos-submit-cleaner-deals-faster-decisions)** can help.",
        "**Touches per file** before it reaches an underwriter.",
        "**Knock-out accuracy** — how often a file screened out at intake would, on review, have met your criteria.",
      ],
    },
    {
      type: "p",
      text: "The last metric is the one most funders never measure, and it is the one that tells you whether intake automation is saving time or silently costing you deals.",
    },
    {
      type: "h2",
      text: "From intake to underwriting: the handoff",
      id: "handoff",
    },
    {
      type: "p",
      text: "Good intake does not just move a file faster; it hands the underwriter a better file. The documents are labelled, the statement period is confirmed complete, and the values extracted at intake keep a link to the page they came from, so the analysis that follows — cash flow, **[existing positions and stacking](/blog/detecting-stacking-in-merchant-cash-advance-underwriting)**, verification and fraud signals — starts from evidence rather than from re-reading the submission.",
    },
    {
      type: "h2",
      text: "How Cevrynt handles intake",
      id: "how-cevrynt-handles-intake",
    },
    {
      type: "p",
      text: "Cevrynt treats intake as the first stage of one evidence-linked review rather than a separate tool. Whatever arrives lands against the same deal; each document is classified and read, gaps are surfaced, and extracted values stay linked to their source as the file moves into **[bank statement analysis](/product/bank-statement-analysis)**, verification, fraud review and your policy. It flags and organizes; it does not auto-decline on soft signals, and the credit decision stays with your underwriters. Intake connections to your existing channels and CRM are scoped with you before a pilot — see **[Integrations](/integrations)**.",
    },
    {
      type: "p",
      text: "To see intake and analysis run on one of your recent submissions, **[book a walkthrough](https://calendly.com/arin-cevrynt/cevrynt-demo)**.",
    },
  ],
  faqs: [
    {
      q: "What is MCA submission intake automation?",
      a: "Software that captures merchant cash advance submissions from ISOs, classifies the application and bank statements, checks completeness, extracts key details, applies the funder's hard knock-out rules and routes the deal to the right queue — replacing manual inbox processing.",
    },
    {
      q: "Should intake automation decline MCA deals automatically?",
      a: "Only on hard, documented criteria the funder has chosen, such as restricted industries or states. Soft signals such as revenue trends, deposit patterns or existing positions need context and should be surfaced for an underwriter rather than used to auto-decline.",
    },
    {
      q: "What does 'scrubbing' bank statements mean in MCA?",
      a: "Reading each statement to extract transactions and key metrics — deposits, true revenue, average daily balance, negative days, NSFs and existing MCA payments — and checking the statements are complete and belong to the right business and account.",
    },
    {
      q: "How fast should a funder respond to an ISO submission?",
      a: "Speed matters because ISOs often submit to several funders. Many funders aim to acknowledge and request missing items within minutes and to give a decision or offer the same day; automated intake is what makes that possible at volume.",
    },
  ],
};
