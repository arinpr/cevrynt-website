import { getAllSlugs, getPostBySlug } from "@/content/blog";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

/* Rendered once per article at build time, never on request. */
export const dynamicParams = false;
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return renderOgImage({ title: "Cevrynt Insights" });
  }

  return renderOgImage({
    eyebrow: post.category,
    title: post.title,
    subtitle: post.excerpt,
  });
}
