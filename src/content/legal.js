/* --------------------------------------------------------------------------
   Legal documents for the marketing website, in the same block format the
   blog uses (see src/components/article-renderer.jsx).

   Keep these accurate to what is actually deployed. The website runs Google
   Analytics 4 under Consent Mode (src/lib/analytics.js), stores the visitor's
   cookie choice, and uses two browser-storage entries for the timed demo
   prompt (src/components/timed-demo-popup.jsx). It runs no advertising
   scripts. If any of that changes — a new tool, a form, an embed, a storage
   key — update the Privacy and Cookie policies in the same change and move
   `updatedAt`.
   -------------------------------------------------------------------------- */

const contactEmail = "arin@cevrynt.com";

export const legalDocs = {
  privacy: {
    path: "privacy",
    effectiveAt: "2026-09-28",
    updatedAt: "2026-09-28",
    lede: "How Cevrynt, Inc. collects, uses, shares and protects personal information when you visit cevrynt.com or contact us — and how borrower data is handled when a lender uses the Cevrynt platform.",
    body: [
      {
        type: "p",
        text: "This Privacy Policy explains how **Cevrynt, Inc.** (\"Cevrynt\", \"we\", \"us\" or \"our\") handles personal information in connection with our marketing website at cevrynt.com (the \"Website\") and our business communications. It is written to be read in one sitting. If anything here is unclear, email [arin@cevrynt.com](mailto:arin@cevrynt.com).",
      },
      {
        type: "callout",
        title: "The short version",
        items: [
          "We use Google Analytics to understand how the Website is used. You can decline it at any time, and we never use advertising or cross-site tracking cookies.",
          "We collect what you choose to send us — typically your name, work email and message — plus basic technical logs needed to run the Website securely.",
          "We do not sell your personal information or share it for cross-context behavioral advertising.",
          "Borrower data processed in the Cevrynt platform belongs to the lender we process it for, and is governed by our agreement with that lender.",
        ],
      },
      { type: "h2", text: "Scope of this policy", id: "scope" },
      {
        type: "p",
        text: "This policy covers personal information we collect through the Website and when you correspond with us — for example, when you email us, book a walkthrough, discuss a pilot or partnership, or contact us as an investor.",
      },
      {
        type: "p",
        text: "It does **not** govern borrower or applicant information that a lender, broker or other customer uploads to the Cevrynt underwriting application (reached through **Sign In**). In that context we act as a service provider to our customer, process that information only on the customer's instructions, and handle it under our written agreement with that customer. If you are a borrower or applicant, the lender or broker you applied through is responsible for your data and is the right first contact for requests about it — see [Borrower data in the Cevrynt platform](#borrower-data).",
      },
      { type: "h2", text: "Information we collect", id: "information-we-collect" },
      { type: "h3", text: "Information you give us", id: "information-you-give-us" },
      {
        type: "p",
        text: "The Website has no account sign-up and no forms that submit data to us. When you contact us by email, or otherwise correspond with us, we receive what you choose to include, which usually means:",
      },
      {
        type: "ul",
        items: [
          "Your name, job title, company and work email address.",
          "The content of your message, and any files or details you decide to share about your underwriting workflow, a pilot or a partnership.",
          "Scheduling details, if you book a walkthrough (see [Calendly](#third-party-services) below).",
        ],
      },
      {
        type: "p",
        text: "Please do not send us borrower files, bank statements or other personal information about third parties through email or the Website. If a pilot requires real files, we will agree a secure transfer method and the terms that apply before anything is shared.",
      },
      { type: "h3", text: "Information collected automatically", id: "information-collected-automatically" },
      {
        type: "p",
        text: "Like most websites, the servers and content delivery network that host the Website automatically record standard technical information when pages are requested: IP address, browser type and version, device and operating system, the page requested, the referring page, and the date and time of the request. These logs are used to deliver the Website, keep it secure, prevent abuse and diagnose errors. We do not use them to build profiles of individual visitors.",
      },
      { type: "h3", text: "Analytics", id: "analytics" },
      {
        type: "p",
        text: "We use **Google Analytics 4**, provided by Google LLC, to understand how visitors find and use the Website — for example, which pages are viewed, how long visits last, the approximate region and device type, the site that referred you, and which buttons are clicked (such as \"Book a walkthrough\" or an email link). Google Analytics uses first-party cookies to distinguish visits. It does not log or store full IP addresses, and we have turned off Google signals and advertising personalization, so this data is not used for advertising or linked to your Google account.",
      },
      {
        type: "p",
        text: "You control analytics through the cookie banner and the **Cookie settings** link in the footer. If you are in the European Economic Area, the United Kingdom or Switzerland, analytics cookies stay off unless you choose Accept. Elsewhere they are on by default and you can decline at any time. We honor Global Privacy Control browser signals as a decline. You can also install Google's [opt-out browser add-on](https://tools.google.com/dlpage/gaoptout).",
      },
      {
        type: "p",
        text: "The Website also stores a few small entries in your browser — your cookie choice and the state of our timed demo prompt. They are listed in our [Cookie Policy](/cookie-policy), stay on your device, and are not used to identify you.",
      },
      { type: "h2", text: "How we use information", id: "how-we-use-information" },
      {
        type: "ul",
        items: [
          "**To respond to you** — answering questions, arranging walkthroughs, and discussing pilots, partnerships or investment.",
          "**To operate and secure the Website** — serving pages, detecting and preventing abuse, fraud or security incidents, and fixing errors.",
          "**To run our business** — keeping records of our business relationships and communications, and improving how we describe our products.",
          "**To meet legal obligations** — complying with applicable law, responding to lawful requests, and establishing, exercising or defending legal claims.",
        ],
      },
      {
        type: "p",
        text: "We do not use personal information from the Website for automated decisions that produce legal or similarly significant effects on you, and we do not use it to train machine-learning models.",
      },
      { type: "h2", text: "How we share information", id: "how-we-share-information" },
      {
        type: "p",
        text: "We do not sell personal information, and we do not share it for cross-context behavioral advertising. We share personal information only as follows:",
      },
      {
        type: "ul",
        items: [
          "**Service providers** that host the Website, measure its use (Google Analytics), deliver email and provide scheduling or business tools on our behalf, under obligations to protect the information and use it only to provide their services.",
          "**Professional advisers** such as lawyers and accountants, where needed and under confidentiality obligations.",
          "**Legal and safety** — where we believe disclosure is required by law, regulation or legal process, or is necessary to protect the rights, property or safety of Cevrynt, our users or others.",
          "**Business transfers** — in connection with a financing, merger, acquisition or sale of all or part of our business, subject to this policy's protections.",
          "**With your direction or consent** — for example, when you ask us to introduce you to a partner.",
        ],
      },
      { type: "h2", text: "Third-party services and links", id: "third-party-services" },
      {
        type: "p",
        text: "Our **Get Demo** and **Book a walkthrough** links open Calendly, a third-party scheduling service, on its own website. Information you enter there is collected by Calendly under its own privacy policy and then shared with us so we can hold the meeting. The Website does not embed Calendly or load its scripts.",
      },
      {
        type: "p",
        text: "The Website may link to other websites, including partner websites. We are not responsible for their privacy practices, and we encourage you to read their policies.",
      },
      { type: "h2", text: "Borrower data in the Cevrynt platform", id: "borrower-data" },
      {
        type: "p",
        text: "Cevrynt is AI-assisted underwriting infrastructure. It is not a lender, does not make credit decisions and does not offer or guarantee funding. When a lender or other business customer uses the Cevrynt platform, it may upload borrower documents such as applications, bank statements and business records. For that information:",
      },
      {
        type: "ul",
        items: [
          "The customer decides what information is uploaded, why it is processed and how long it is kept, within the terms of our agreement.",
          "We process it only to provide and support the services the customer has engaged us for, and as the customer instructs.",
          "Access, retention and deletion requirements are agreed with each customer before production use.",
          "Requests from borrowers or applicants about this information should go to the lender or broker they applied through. If we receive such a request directly, we will refer it to the relevant customer where we are able to.",
        ],
      },
      { type: "h2", text: "Data retention", id: "data-retention" },
      {
        type: "p",
        text: "We keep business correspondence for as long as needed to manage the relationship it relates to and to meet legal, accounting and record-keeping requirements, and then delete or de-identify it. Technical logs are kept for a limited period by our hosting providers for security and operational purposes. Google Analytics event data is retained for 14 months and then deleted automatically. Retention of platform data is governed by our agreement with the relevant customer.",
      },
      { type: "h2", text: "Security", id: "security" },
      {
        type: "p",
        text: "We use administrative, technical and organizational safeguards designed to protect personal information against unauthorized access, loss, misuse and alteration, appropriate to the nature of the information. The Website is served only over encrypted HTTPS connections. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security. More about our approach to underwriting data is on our [Security](/security) page.",
      },
      { type: "h2", text: "Your privacy rights", id: "your-rights" },
      {
        type: "p",
        text: "Depending on where you live — including under U.S. state privacy laws such as the California Consumer Privacy Act — you may have the right to:",
      },
      {
        type: "ul",
        items: [
          "Know what personal information we have collected about you and how we use and disclose it, and receive a copy of it.",
          "Correct inaccurate personal information.",
          "Delete personal information we hold about you, subject to legal exceptions.",
          "Opt out of the sale of personal information or its sharing for targeted advertising. We do neither.",
          "Not be discriminated against for exercising any of these rights.",
        ],
      },
      {
        type: "p",
        text: "To make a request, email [arin@cevrynt.com](mailto:arin@cevrynt.com) with the subject line \"Privacy request\". We will verify the request using information we already hold and respond within the time required by applicable law. You may use an authorized agent where the law allows; we may ask for proof of the agent's authority. If we decline a request, we will explain why, and you may appeal by replying to our response.",
      },
      { type: "h2", text: "Children's privacy", id: "childrens-privacy" },
      {
        type: "p",
        text: "The Website and our services are intended for businesses and are not directed to children. We do not knowingly collect personal information from anyone under 16. If you believe a child has provided us with personal information, contact us and we will delete it.",
      },
      { type: "h2", text: "International visitors", id: "international-visitors" },
      {
        type: "p",
        text: "Cevrynt is based in and focused on the United States. If you access the Website from elsewhere, your information will be processed in the United States, where data protection laws may differ from those in your country.",
      },
      { type: "h2", text: "Changes to this policy", id: "changes" },
      {
        type: "p",
        text: "We may update this policy as the Website and our services change. We will post the updated version on this page and change the \"Last updated\" date above. If a change is material, we will take reasonable steps to highlight it.",
      },
      { type: "h2", text: "Contact us", id: "contact" },
      {
        type: "p",
        text: "Questions or requests about this Privacy Policy can be sent to **Cevrynt, Inc.** at [arin@cevrynt.com](mailto:arin@cevrynt.com).",
      },
    ],
  },

  terms: {
    path: "terms",
    effectiveAt: "2026-09-28",
    updatedAt: "2026-09-28",
    lede: "The terms that govern your access to and use of the Cevrynt website. Use of the Cevrynt underwriting platform is governed separately by a written agreement with each customer.",
    body: [
      {
        type: "p",
        text: "These Terms of Use (\"Terms\") are an agreement between you and **Cevrynt, Inc.** (\"Cevrynt\", \"we\", \"us\" or \"our\") governing your use of our website at cevrynt.com and any content made available on it (the \"Website\"). By using the Website you agree to these Terms. If you do not agree, please do not use the Website.",
      },
      {
        type: "callout",
        title: "What these Terms do and do not cover",
        items: [
          "They cover the public marketing Website — its pages, articles, guides and illustrations.",
          "They do not cover the Cevrynt underwriting application. Access to and use of the platform are governed by a separate written agreement between Cevrynt and each customer, which controls if it conflicts with these Terms.",
          "Nothing on the Website is an offer of credit, a funding commitment or financial, legal or credit advice.",
        ],
      },
      { type: "h2", text: "Who may use the Website", id: "eligibility" },
      {
        type: "p",
        text: "The Website is intended for businesses and professionals, primarily U.S. lenders, funders, brokers and their teams. You must be at least 18 years old to use it. If you use the Website on behalf of an organization, you confirm that you are authorized to accept these Terms for that organization.",
      },
      { type: "h2", text: "What Cevrynt is — and is not", id: "what-cevrynt-is" },
      {
        type: "p",
        text: "Cevrynt provides AI-assisted underwriting infrastructure that helps lenders structure borrower documents and business signals into analysis for human review. **Cevrynt is not a lender, broker or credit bureau.** It does not make, arrange or guarantee loans, advances or funding offers, and it does not make credit decisions. Lenders using Cevrynt retain final approval authority and remain responsible for their own credit decisions and regulatory obligations.",
      },
      { type: "h2", text: "Informational content only", id: "informational-content" },
      {
        type: "p",
        text: "Articles, guides, glossary entries, FAQs and other Website content are provided for general information. They are not financial, credit, legal, tax or compliance advice, and they may not reflect every lender's policy or the latest regulatory developments. You should obtain professional advice for your specific circumstances.",
      },
      {
        type: "p",
        text: "Product screens, sample deals and figures shown on the Website — including the example business **Cedar & Stone LLC** — are **illustrative and use synthetic data**. They do not describe real borrowers, customers or results, and they do not represent guaranteed product performance. Descriptions of features, partnerships and roadmap items describe the current or intended product and may change.",
      },
      { type: "h2", text: "Acceptable use", id: "acceptable-use" },
      { type: "p", text: "When using the Website, you agree not to:" },
      {
        type: "ul",
        items: [
          "Use it in violation of any law or regulation, or to infringe anyone's rights.",
          "Attempt to gain unauthorized access to the Website, the Cevrynt application or related systems, or probe, scan or test their vulnerabilities without our written permission.",
          "Interfere with or disrupt the Website, including by introducing malware or placing an unreasonable load on its infrastructure.",
          "Scrape or harvest the Website in a way that degrades its performance, or copy it to build a competing product or service.",
          "Misrepresent your identity or affiliation, or imply that Cevrynt endorses you, your products or your services.",
          "Send us borrower files or other third-party personal information through the Website or unsolicited email.",
        ],
      },
      {
        type: "p",
        text: "Search engines and AI assistants may crawl and index the Website's public pages, as described in our robots.txt file, for the purpose of search and answering user questions with attribution.",
      },
      { type: "h2", text: "Intellectual property", id: "intellectual-property" },
      {
        type: "p",
        text: "The Website and its content — including text, graphics, product illustrations, software, and the Cevrynt name, logo and marks — are owned by Cevrynt or its licensors and are protected by intellectual property laws. Subject to these Terms, you may view the Website and share links to it, and you may quote brief excerpts with attribution to Cevrynt. You may not otherwise copy, modify, distribute, sell or create derivative works from Website content without our prior written permission.",
      },
      {
        type: "p",
        text: "Third-party names and logos shown on the Website, including SHOPLINE, belong to their respective owners and are used only to identify those parties. Their appearance does not imply endorsement beyond what is expressly described.",
      },
      { type: "h2", text: "Feedback", id: "feedback" },
      {
        type: "p",
        text: "If you send us ideas, suggestions or feedback about Cevrynt, you allow us to use them without restriction or compensation to you. We will not publicly identify you as the source without your permission.",
      },
      { type: "h2", text: "Third-party links and services", id: "third-party-links" },
      {
        type: "p",
        text: "The Website links to third-party websites and services, such as Calendly for scheduling walkthroughs. We do not control and are not responsible for their content, terms or privacy practices. Your use of them is at your own risk and subject to their terms.",
      },
      { type: "h2", text: "Disclaimers", id: "disclaimers" },
      {
        type: "p",
        text: "THE WEBSITE AND ITS CONTENT ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\", WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT AND ACCURACY. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, SECURE OR ERROR-FREE, OR THAT ITS CONTENT IS COMPLETE OR CURRENT.",
      },
      { type: "h2", text: "Limitation of liability", id: "limitation-of-liability" },
      {
        type: "p",
        text: "TO THE FULLEST EXTENT PERMITTED BY LAW, CEVRYNT AND ITS OFFICERS, DIRECTORS, EMPLOYEES AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA OR GOODWILL, ARISING OUT OF OR RELATING TO YOUR USE OF, OR INABILITY TO USE, THE WEBSITE. OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE WEBSITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US$100). Some jurisdictions do not allow certain of these limitations, so they may not all apply to you.",
      },
      { type: "h2", text: "Indemnification", id: "indemnification" },
      {
        type: "p",
        text: "You agree to indemnify and hold harmless Cevrynt and its officers, directors, employees and agents from any claims, losses, liabilities and expenses, including reasonable legal fees, arising out of your breach of these Terms or your misuse of the Website.",
      },
      { type: "h2", text: "Governing law and disputes", id: "governing-law" },
      {
        type: "p",
        text: "These Terms are governed by the laws of the United States and of the state in which Cevrynt, Inc. is incorporated, without regard to conflict-of-law principles. Any dispute arising out of or relating to these Terms or the Website will be brought exclusively in the state or federal courts located in that state, and you and Cevrynt consent to their personal jurisdiction.",
      },
      { type: "h2", text: "Changes and termination", id: "changes" },
      {
        type: "p",
        text: "We may modify the Website, or suspend or discontinue any part of it, at any time. We may also update these Terms; the updated version takes effect when posted on this page with a new \"Last updated\" date, and your continued use of the Website after that means you accept it. We may suspend your access to the Website if you breach these Terms.",
      },
      { type: "h2", text: "General", id: "general" },
      {
        type: "p",
        text: "If any provision of these Terms is found unenforceable, the remaining provisions stay in effect. Our failure to enforce a provision is not a waiver of it. You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition or sale of assets. These Terms, together with our [Privacy Policy](/privacy) and [Cookie Policy](/cookie-policy), are the entire agreement between you and Cevrynt regarding the Website.",
      },
      { type: "h2", text: "Contact us", id: "contact" },
      {
        type: "p",
        text: "Questions about these Terms can be sent to **Cevrynt, Inc.** at [arin@cevrynt.com](mailto:arin@cevrynt.com).",
      },
    ],
  },

  "cookie-policy": {
    path: "cookie-policy",
    effectiveAt: "2026-09-28",
    updatedAt: "2026-09-28",
    lede: "The Website uses Google Analytics cookies, with your consent where the law requires it, and a few small first-party storage entries. No advertising or cross-site tracking cookies. Here is exactly what is set, why, and how to control it.",
    body: [
      {
        type: "p",
        text: "This Cookie Policy explains how **Cevrynt, Inc.** (\"Cevrynt\", \"we\" or \"us\") uses cookies and similar browser-storage technologies on cevrynt.com (the \"Website\"). It should be read together with our [Privacy Policy](/privacy).",
      },
      {
        type: "callout",
        title: "At a glance",
        items: [
          "Analytics only: Google Analytics 4 measures how the Website is used. It is never used for advertising.",
          "In the EEA, the UK and Switzerland, analytics cookies are off until you choose **Accept**. Elsewhere they are on by default and you can **Decline** at any time.",
          "No advertising, retargeting or cross-site tracking cookies, and no session recording.",
          "Change your choice whenever you like with **Cookie settings** in the footer.",
        ],
      },
      { type: "h2", text: "What cookies and browser storage are", id: "what-they-are" },
      {
        type: "p",
        text: "**Cookies** are small text files a website places on your device, which are sent back to that website with later requests. **Local storage** and **session storage** are similar browser features that let a website keep small pieces of information on your device; unlike cookies, they are not sent to a server automatically. Session storage is cleared when you close the tab, while local storage persists until it is cleared.",
      },
      { type: "h2", text: "Analytics cookies", id: "analytics-cookies" },
      {
        type: "p",
        text: "We use **Google Analytics 4** (provided by Google LLC) to count visits and understand which pages and calls to action are useful — for example, whether visitors reach a product page or click **Book a walkthrough**. It sets these first-party cookies on the cevrynt.com domain:",
      },
      {
        type: "ul",
        items: [
          "**_ga** — distinguishes one browser from another with a random identifier. Expires after 2 years.",
          "**_ga_80SL6B8WHP** — keeps the state of the current visit for our Google Analytics property. Expires after 2 years.",
        ],
      },
      {
        type: "p",
        text: "We run Google Analytics in **Consent Mode**. Advertising storage, ad personalization and Google signals are always off. When analytics consent is declined, Google Analytics sets no cookies and receives only cookieless signals that cannot identify a returning visitor. Google Analytics does not log or store full IP addresses. Analytics data is kept for 14 months. Google's own practices are described in [How Google uses information from sites that use its services](https://policies.google.com/technologies/partner-sites).",
      },
      { type: "h2", text: "Functional storage", id: "functional-storage" },
      {
        type: "p",
        text: "These entries make the Website work the way you have chosen. They contain no personal information and never leave your device:",
      },
      {
        type: "ul",
        items: [
          "**cevrynt_consent_v1** (local storage) — remembers whether you accepted or declined analytics cookies, so we do not ask again. Kept until you clear it or change your choice.",
          "**cevrynt_demo_prompt_v1** (local storage) — records that you dismissed the timed \"Get Demo\" prompt, so it is not shown again for 7 days. Stores only a timestamp.",
          "**cevrynt_demo_prompt_seen** (session storage) — records that the prompt has been shown in this browser session, so it appears at most once per visit. Cleared when you close the tab.",
        ],
      },
      { type: "h2", text: "What the Website does not use", id: "what-we-do-not-use" },
      {
        type: "ul",
        items: [
          "Advertising, retargeting or social-media tracking pixels.",
          "Session-recording, heatmap or browser-fingerprinting tools.",
          "Third-party embeds that set cookies — fonts are served from our own domain, and scheduling opens on Calendly's site rather than inside ours.",
        ],
      },
      {
        type: "p",
        text: "Our hosting provider keeps standard server logs to deliver and secure the Website, as described in our [Privacy Policy](/privacy#information-collected-automatically). This does not involve placing cookies on your device.",
      },
      { type: "h2", text: "Your choices", id: "your-choices" },
      {
        type: "ul",
        items: [
          "**Cookie banner and Cookie settings** — choose Accept or Decline. Your choice applies immediately and is remembered on this device.",
          "**Global Privacy Control** — if your browser sends a GPC signal, we treat it as Decline and do not show the banner.",
          "**Browser settings** — you can block or delete cookies and clear site data under Privacy, Site data or Cookies. The Website works fully with them blocked.",
          "**Google's opt-out** — Google offers a [browser add-on](https://tools.google.com/dlpage/gaoptout) that stops Google Analytics on every site.",
        ],
      },
      { type: "h2", text: "Third-party sites we link to", id: "third-party-sites" },
      {
        type: "p",
        text: "When you follow a link from the Website — for example, to book a walkthrough on Calendly, or to sign in to the Cevrynt application — that site may set its own cookies under its own policies. Those cookies are not set by the Website and are outside the scope of this policy.",
      },
      { type: "h2", text: "Changes to this policy", id: "changes" },
      {
        type: "p",
        text: "If we add or change any cookie or storage technology, we will update this page before it goes live and ask for consent first where the law requires it.",
      },
      { type: "h2", text: "Contact us", id: "contact" },
      {
        type: "p",
        text: `Questions about this Cookie Policy can be sent to **Cevrynt, Inc.** at [${contactEmail}](mailto:${contactEmail}).`,
      },
    ],
  },
};
