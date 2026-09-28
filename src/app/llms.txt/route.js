import { siteConfig } from "@/config/site";
import { sitePages, workflow } from "@/content/site-pages";
import { posts } from "@/content/blog";

export const revalidate = 3600;

/* llms.txt: a plain-text map of the site for AI assistants and answer
   engines (https://llmstxt.org). Built from the same page data as the
   navigation and sitemap, so it cannot drift from what the site says. */

function section(title, items) {
  if (!items.length) return "";
  const lines = items.map(
    (item) => `- [${item.name || item.title}](${siteConfig.url}/${item.path}): ${item.metaDescription || item.description}`,
  );
  return `## ${title}\n\n${lines.join("\n")}\n`;
}

const byGroup = (...groups) => sitePages.filter((page) => groups.includes(page.group));

export async function GET() {
  const blogLines = posts.map(
    (post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.metaDescription || post.excerpt}`,
  );

  const body = `# Cevrynt

> ${siteConfig.description}

Cevrynt (${siteConfig.legalName}) is an early-stage AI underwriting and decision-intelligence platform for U.S. alternative lenders, initially focused on merchant cash advance (MCA) and small-business finance. It structures borrower documents and business signals into evidence-linked analysis for human underwriters.

Key facts:

- Primary users: MCA funders, alternative lenders and revenue-based finance companies — their underwriting, credit, risk and operations teams. Secondary: brokers/ISOs, commerce platforms and embedded-finance partners.
- Capabilities: document classification and source-linked extraction; bank statement and cash-flow analysis (deposits, daily balances, NSFs, negative days, existing positions); business verification (KYB); fraud and risk signals; lender-defined policy evaluation; reviewer notes, overrides and audit history; evidence-linked underwriting reports.
- Workflow: ${workflow.join(" → ")}.
- Cevrynt is AI-assisted infrastructure. It is not a lender, does not make or guarantee funding offers, and does not replace lender judgment. Lenders retain final approval authority in every case.
- Cevrynt × SHOPLINE is a documented development and referral partnership around e-commerce merchant-underwriting workflows. It is not a generally available live integration and does not imply guaranteed funding or universal merchant eligibility.
- Pricing is not published. Evaluation is through a founder-led walkthrough or a scoped pilot.
- Product screens and figures on the website are illustrative and use a synthetic example business (Cedar & Stone LLC).

${section("Platform", byGroup("Platform", "Why Cevrynt", "Trust", "Pilot"))}
${section("Product", byGroup("Product"))}
${section("Solutions", byGroup("Solutions"))}
${section("Partners", byGroup("Partner"))}
${section("Company", byGroup("Company"))}
## Who Cevrynt is for

- MCA funders and merchant cash advance underwriting teams that rebuild bank activity, existing positions and verification by hand.
- Alternative and small-business lenders, including revenue-based financing, that need consistent, auditable credit review.
- ISOs and brokers that want cleaner lender submissions.
- E-commerce and embedded-finance platforms underwriting merchants.
- Not for: consumer credit, mortgages, fully automatic approve/decline engines, or teams looking for a CRM or servicing platform.

## Comparisons

- [AI underwriting software compared](${siteConfig.url}/compare): How Cevrynt relates to Kaaj, Heron, Ocrolus, MoneyThumb and MCA lending platforms (Cloudsquare, Onyx IQ, LendSaaS, MCA Track), and when each is the better fit.

## Resources

- [Underwriting resources](${siteConfig.url}/resources): Guides organized by underwriting stage, a question index and a glossary.
- [FAQ](${siteConfig.url}/faq): Answers about what Cevrynt does, who it is for, lender control, data handling and pilots.
- [Insights blog](${siteConfig.url}/blog): Articles on MCA and alternative-lending underwriting.

## Articles

${blogLines.join("\n")}

## Contact

- Book a walkthrough: https://calendly.com/arin-cevrynt/cevrynt-demo
- Founder-led sales: arin@cevrynt.com
- Sales enquiries: sales@cevrynt.com
- Contact page: ${siteConfig.url}/contact
- LinkedIn: ${siteConfig.linkedinUrl}

## Optional

${section("Legal", byGroup("Legal")).replace(/^## Legal\n\n/, "")}- [Sitemap](${siteConfig.url}/sitemap.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
