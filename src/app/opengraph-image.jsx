import { renderBrandOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Cevrynt logo — From borrower documents to decision-ready underwriting.";

export default async function Image() {
  return renderBrandOgImage({
    tagline: "From borrower documents to decision-ready underwriting.",
  });
}
