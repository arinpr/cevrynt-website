import { siteConfig } from "@/config/site";

/* --------------------------------------------------------------------------
   One place that turns a page's SEO fields into a complete Metadata object.

   Next merges metadata shallowly, so a page that sets `openGraph` or
   `twitter` replaces the layout's version wholesale — site name, locale, type
   and image included. Building every page's metadata here keeps those fields
   on every route instead of only on the ones that remembered to repeat them.

     title          the page's title; the layout template appends "| Cevrynt"
     absoluteTitle  a title that already names Cevrynt, used as-is
     image          a share image path; defaults to the page's /og card
   -------------------------------------------------------------------------- */

export const ogImageAlt = "Cevrynt — AI underwriting infrastructure for alternative lenders";

/** The generated share card for a page path ("" is the homepage). */
export function ogImagePath(path) {
  return path ? `/og/${path}` : "/opengraph-image";
}

export function buildMetadata({
  path = "",
  title,
  absoluteTitle,
  description,
  keywords,
  image,
  imageAlt,
  type = "website",
  noindex = false,
  article,
}) {
  const url = path ? `/${path}` : "/";
  const fullTitle = absoluteTitle || `${title} | ${siteConfig.name}`;
  const images = [
    {
      url: image || ogImagePath(path),
      width: 1200,
      height: 630,
      alt: imageAlt || fullTitle,
    },
  ];

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_US",
      siteName: siteConfig.name,
      url,
      title: fullTitle,
      description,
      images,
      ...article,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata for a page defined in src/content/site-pages.js. */
export function pageMetadata(page) {
  return buildMetadata({
    path: page.path,
    title: page.metaTitle || page.title,
    absoluteTitle: page.absoluteTitle,
    description: page.metaDescription || page.description,
    keywords: page.keywords,
  });
}

/* The one Organization every page's structured data points back to. */
export const organizationId = `${siteConfig.url}/#organization`;

/** BreadcrumbList JSON-LD from [name, path] pairs, Home first. */
export function breadcrumbJsonLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", ""], ...trail].map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: path ? `${siteConfig.url}/${path}` : siteConfig.url,
    })),
  };
}

/* Product pages sit under the platform overview; everything else hangs
   directly off Home. */
export function pageBreadcrumbJsonLd(page) {
  const trail = page.group === "Product" ? [["Platform", "platform"]] : [];
  return breadcrumbJsonLd([...trail, [page.name || page.title, page.path]]);
}

/** WebPage-family JSON-LD for a site page, tied to the Organization. */
export function webPageJsonLd(page, type = "WebPage") {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${siteConfig.url}/${page.path}#webpage`,
    url: `${siteConfig.url}/${page.path}`,
    name: page.absoluteTitle || page.metaTitle || page.title,
    description: page.metaDescription || page.description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": organizationId },
    publisher: { "@id": organizationId },
  };
}
