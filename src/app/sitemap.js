import { siteConfig } from "@/config/site";
import { contentUpdatedAt, sitePages } from "@/content/site-pages";
import { legalDocs } from "@/content/legal";
import { compare } from "@/content/compare";
import { posts } from "@/content/blog";
import { ogImagePath } from "@/lib/seo";

/* lastmod carries real dates — the page's own review date where it has one,
   otherwise contentUpdatedAt — never the build time, so search engines only
   re-crawl pages that actually changed. Each entry lists its share card and,
   for product pages, the product screenshot, for image search. */

const priorityByGroup = {
  Product: 0.9,
  Solutions: 0.9,
  Platform: 0.9,
  "Why Cevrynt": 0.8,
  Pilot: 0.8,
  Resources: 0.7,
  Partner: 0.7,
  Trust: 0.7,
  Company: 0.6,
  Legal: 0.3,
};

const abs = (path) => `${siteConfig.url}${path}`;
const productShot = abs("/media/cevrynt-dashboard-website-analytics.webp");

function lastModifiedOf(page) {
  if (legalDocs[page.path]) return legalDocs[page.path].updatedAt;
  if (page.path === "compare") return compare.reviewedAt;
  return contentUpdatedAt;
}

export default function sitemap() {
  const newestPost = posts.reduce((d, p) => ((p.updatedAt || p.publishedAt) > d ? p.updatedAt || p.publishedAt : d), "");

  const routes = [
    {
      url: siteConfig.url,
      lastModified: contentUpdatedAt,
      changeFrequency: "weekly",
      priority: 1,
      images: [abs(ogImagePath("")), productShot],
    },
    {
      url: abs("/blog"),
      lastModified: newestPost > contentUpdatedAt ? newestPost : contentUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [abs("/blog/opengraph-image")],
    },
    {
      url: abs("/faq"),
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [abs("/faq/opengraph-image")],
    },
  ];

  for (const page of sitePages) {
    const legal = page.group === "Legal";
    routes.push({
      url: abs(`/${page.path}`),
      lastModified: lastModifiedOf(page),
      changeFrequency: legal ? "yearly" : "monthly",
      priority: priorityByGroup[page.group] ?? 0.6,
      images: legal ? undefined : [abs(ogImagePath(page.path)), ...(page.group === "Product" ? [productShot] : [])],
    });
  }

  for (const post of posts) {
    routes.push({
      url: abs(`/blog/${post.slug}`),
      lastModified: post.updatedAt || post.publishedAt,
      changeFrequency: "monthly",
      priority: 0.65,
      images: [abs(`/blog/${post.slug}/opengraph-image`)],
    });
  }

  return routes;
}
