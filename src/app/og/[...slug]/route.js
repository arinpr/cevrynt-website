import { renderOgImage } from "@/lib/og-image";
import { pageByPath, sitePages } from "@/content/site-pages";

/* Share cards for every page in site-pages.js, rendered once at build time.
   The blog and FAQ keep their own opengraph-image files. */

export const dynamicParams = false;

export function generateStaticParams() {
  return sitePages.map((page) => ({ slug: page.path.split("/") }));
}

export async function GET(_request, { params }) {
  const { slug } = await params;
  const page = pageByPath.get(slug.join("/"));
  if (!page) return new Response("Not found", { status: 404 });

  const eyebrow = page.group === page.name || !page.name ? page.group : `${page.group} · ${page.name}`;

  return renderOgImage({
    eyebrow,
    title: page.title,
    subtitle: page.metaTitle && page.metaTitle !== page.title ? page.metaTitle : undefined,
  });
}
