import { siteConfig } from "@/config/site";
import { contentUpdatedAt, sitePages } from "@/content/site-pages";
import { legalDocs } from "@/content/legal";
import { compare } from "@/content/compare";
import { posts } from "@/content/blog";

/* lastmod carries real dates — the page's own review date where it has one,
   otherwise contentUpdatedAt — never the build time, so search engines only
   re-crawl pages that actually changed.

   No <image:image> entries: Next writes them before <lastmod>, which breaks
   the sitemap schema's element order, and Search Console then reports the
   sitemap as unreadable. Google finds page images by crawling the pages. */

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
    },
    {
      url: abs("/blog"),
      lastModified: newestPost > contentUpdatedAt ? newestPost : contentUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: abs("/faq"),
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  for (const page of sitePages) {
    const legal = page.group === "Legal";
    routes.push({
      url: abs(`/${page.path}`),
      lastModified: lastModifiedOf(page),
      changeFrequency: legal ? "yearly" : "monthly",
      priority: priorityByGroup[page.group] ?? 0.6,
    });
  }

  for (const post of posts) {
    routes.push({
      url: abs(`/blog/${post.slug}`),
      lastModified: post.updatedAt || post.publishedAt,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return routes;
}
