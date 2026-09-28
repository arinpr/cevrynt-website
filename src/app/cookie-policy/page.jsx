import { LegalPage, legalMetadata } from "@/components/legal-page";

export const revalidate = 3600;

export function generateMetadata() {
  return legalMetadata("cookie-policy");
}

export default function Page() {
  return <LegalPage path="cookie-policy" />;
}
