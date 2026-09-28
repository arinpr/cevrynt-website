import Link from "next/link";
import { HeroMotion } from "@/components/hero-motion";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { ArticleRenderer } from "@/components/article-renderer";
import { ArticleIndex } from "@/components/article/article-index";
import { ArticleFaq } from "@/components/article-faq";
import { FounderClose } from "@/components/home/founder-close";
import { JsonLd } from "@/components/json-ld";
import { anatomyOf } from "@/content/article-anatomy";
import { compare } from "@/content/compare";
import { pageByPath } from "@/content/site-pages";
import { pageBreadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const revalidate = 3600;

const page = pageByPath.get("compare");
const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

export function generateMetadata() {
  return pageMetadata(page);
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatDay(date) {
  const [y, m, d] = date.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/* Same reading layout as an article: the contents down the left, the text in
   the middle, the answers underneath. */
export default function ComparePage() {
  const anatomy = anatomyOf(compare);
  let run = 0;
  const indexItems = [];
  anatomy.sections.forEach((s) => {
    const opensOn = Math.floor(run) + 1;
    run += s.minutes;
    if (!s.id) return;
    indexItems.push({
      id: s.id,
      title: s.title,
      number: String(indexItems.length + 1).padStart(2, "0"),
      page: String(opensOn),
      share: Number(s.share.toFixed(4)),
      cevrynt: false,
    });
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: compare.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main id="main-content">
      <JsonLd data={{ ...webPageJsonLd(page), dateModified: compare.reviewedAt }} />
      <JsonLd data={pageBreadcrumbJsonLd(page)} />
      <JsonLd data={faqJsonLd} />

      <HeroMotion>
        <div className="page-hero-dark-inner legal-hero-inner">
          <PageHeroCopy heading={page.title} lede={compare.lede} />
          <p className="ar-hero-meta hx-mono">
            <Link className="ar-hero-back" href="/resources">
              Resources
            </Link>
            <span>
              Reviewed <time dateTime={compare.reviewedAt}>{formatDay(compare.reviewedAt)}</time>
            </span>
          </p>
          <div className="hero-actions">
            <RainbowCta href={calendlyUrl} label="Book a walkthrough" />
          </div>
        </div>
      </HeroMotion>

      <article className="ar-read legal-read" id="article-start" aria-label={page.title}>
        <div className="eg ar-read-shell">
          <div className="ar-read-left">
            <div className="ar-read-stick">
              <ArticleIndex items={indexItems} faqLabel="Questions" label="Contents" targetId="article-start" />
            </div>
          </div>
          <div className="ar-read-body">
            <ArticleRenderer blocks={compare.body} numbered />
            <ArticleFaq items={compare.faqs} />
          </div>
        </div>
      </article>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="→"
          kicker="Founder-led"
          heading="Compare it on your own files."
          lede="Bring a real MCA or small-business file. We will show what Cevrynt structures, what it flags, and what it leaves for your underwriters to decide."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
