import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { TimedDemoPopup } from "@/components/timed-demo-popup";
import { Analytics } from "@/components/analytics";
import { DevelopmentCacheReset } from "@/components/development-cache-reset";
import { DevelopmentHardRefreshButton } from "@/components/development-hard-refresh-button";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsonLd } from "@/components/json-ld";
import { ogImageAlt, organizationId } from "@/lib/seo";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  alternateName: ["Cevrynt Inc", "Cevrynt AI"],
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/brand/cevrynt-icon-512-v3.png`,
    width: 512,
    height: 512,
  },
  image: `${siteConfig.url}/brand/cevrynt-logo-v2.png`,
  slogan: "From borrower documents to decision-ready underwriting.",
  description: siteConfig.description,
  ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
  email: "sales@cevrynt.com",
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: [
    "Merchant cash advance underwriting",
    "Alternative lending underwriting",
    "Bank statement analysis",
    "Business verification (KYB)",
    "Fraud signals in small business lending",
    "Lender credit policy evaluation",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "sales@cevrynt.com",
    contactType: "sales",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  alternateName: ["Cevrynt Inc", "cevrynt.com"],
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en-US",
  publisher: { "@id": organizationId },
};

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "AI underwriting platform",
    "merchant cash advance underwriting software",
    "alternative lending software",
    "bank statement analysis software",
    "underwriting decision intelligence",
  ],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  formatDetection: { email: false, address: false, telephone: false },
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: ogImageAlt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
  icons: {
    icon: [
      { url: "/brand/cevrynt-favicon.svg", type: "image/svg+xml" },
      { url: "/brand/cevrynt-favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/brand/cevrynt-favicon-v3.ico", sizes: "any" },
    ],
    shortcut: "/brand/cevrynt-favicon-v3.ico",
    apple: "/brand/cevrynt-apple-icon-v3.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {process.env.NODE_ENV === "development" ? <DevelopmentCacheReset /> : null}
        {process.env.NODE_ENV === "development" ? <DevelopmentHardRefreshButton /> : null}
        <SmoothScroll />
        <SiteHeader />
        {children}
        <SiteFooter />
        <TimedDemoPopup />
        <Analytics />
      </body>
    </html>
  );
}
