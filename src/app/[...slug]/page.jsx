import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { pageByPath, sitePages } from "@/content/site-pages";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

/** Paths with their own bespoke route under src/app/. */
const bespoke = new Set([
  "platform",
  "why-cevrynt",
  "integrations",
  "security",
  "solutions/merchant-cash-advance",
  "solutions/brokers-isos",
  "solutions/alternative-lenders",
  "solutions/ecommerce-merchant-underwriting",
  "about",
  "investors",
  "contact",
  "product/document-intelligence",
  "product/business-verification",
  "product/policy-engine",
  "product/underwriting-report",
  "product/bank-statement-analysis",
  "product/fraud-signals",
  "partners/shopline",
  "resources",
  "pilot",
  "privacy",
  "terms",
  "cookie-policy",
  "compare",
]);

export function generateStaticParams() {
  // Next always matches a literal segment before this catch-all, so filtering
  // only avoids pre-rendering an unreachable duplicate at build time.
  return sitePages
    .filter((page) => !bespoke.has(page.path))
    .map((page) => ({ slug: page.path.split("/") }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = pageByPath.get(slug.join("/"));
  return page ? pageMetadata(page) : {};
}

export default async function MarketingPage({ params }) {
  const { slug } = await params;
  const page = pageByPath.get(slug.join("/"));

  if (!page) notFound();

  return <PageShell page={page} />;
}
