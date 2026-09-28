import { HeroMotion } from "@/components/hero-motion";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { ArticleRenderer } from "@/components/article-renderer";
import { ArticleIndex } from "@/components/article/article-index";
import { ReadNext } from "@/components/article/read-next";
import { JsonLd } from "@/components/json-ld";
import { anatomyOf, WORDS_PER_MINUTE, wordsIn } from "@/content/article-anatomy";
import { legalDocs } from "@/content/legal";
import { pageByPath } from "@/content/site-pages";
import { pageBreadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

/* --------------------------------------------------------------------------
   Privacy, Terms and Cookie Policy.

   The same reading layout as an article — the dark hero, the chapter index
   held down the left, the numbered text in the middle — so a policy reads as
   part of the site rather than a bolted-on page. The hero drops the product
   screenshot: a legal document is read, not demonstrated. The right margin
   points at the other two policies instead of related articles.
   -------------------------------------------------------------------------- */

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* Read "YYYY-MM-DD" directly, never through a timezone. */
function formatDay(date) {
  const [y, m, d] = date.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

const legalOrder = ["privacy", "terms", "cookie-policy"];

export function legalMetadata(path) {
  return pageMetadata(pageByPath.get(path));
}

export function LegalPage({ path }) {
  const page = pageByPath.get(path);
  const doc = legalDocs[path];
  const anatomy = anatomyOf(doc);

  /* The index: each chapter, and the minute of the read it opens on. */
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

  const others = legalOrder
    .filter((p) => p !== path)
    .map((p) => {
      const other = pageByPath.get(p);
      return {
        slug: p,
        href: `/${p}`,
        title: other.title,
        category: "Legal",
        minutes: Math.max(1, Math.round(wordsIn(legalDocs[p].body) / WORDS_PER_MINUTE)),
      };
    });

  const pageJsonLd = {
    ...webPageJsonLd(page),
    datePublished: doc.effectiveAt,
    dateModified: doc.updatedAt,
  };

  return (
    <main id="main-content">
      <JsonLd data={pageJsonLd} />
      <JsonLd data={pageBreadcrumbJsonLd(page)} />

      <HeroMotion>
        <div className="page-hero-dark-inner legal-hero-inner">
          <PageHeroCopy heading={page.title} lede={doc.lede} />
          <p className="ar-hero-meta hx-mono">
            <span>Cevrynt, Inc.</span>
            <span>
              Effective <time dateTime={doc.effectiveAt}>{formatDay(doc.effectiveAt)}</time>
            </span>
            <span>
              Last updated <time dateTime={doc.updatedAt}>{formatDay(doc.updatedAt)}</time>
            </span>
          </p>
        </div>
      </HeroMotion>

      <article className="ar-read legal-read" id="article-start" aria-label={page.title}>
        <div className="eg ar-read-shell">
          <div className="ar-read-left">
            <div className="ar-read-stick">
              <ArticleIndex items={indexItems} label="Contents" targetId="article-start" />
            </div>
          </div>
          <div className="ar-read-body">
            <ArticleRenderer blocks={doc.body} numbered />
          </div>
          <div className="ar-read-right">
            <div className="ar-read-stick">
              <ReadNext
                items={others}
                readout={{
                  headingK: "Other policies",
                  minK: "min",
                  allK: "Security",
                  allHref: "/security",
                  hubK: "Contact",
                  hubHref: "/contact",
                }}
              />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
