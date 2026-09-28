const isProduction = process.env.NODE_ENV === "production";
const developmentNoCacheHeaders = [
  {
    key: "Cache-Control",
    value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
];

/* Sent on every production response. No CSP yet: Google Analytics and the
   inline JSON-LD would need nonces; add one deliberately, not by accident. */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
];

const nextConfig = {
  reactCompiler: false,
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.0.199"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: isProduction ? 31536000 : 0,
  },
  async redirects() {
    return [
      // One canonical host: the apex answers with a permanent redirect to www,
      // so search engines index a single copy of every page. The host value is
      // a regex; anchor it, or OpenNext on Workers also matches www.cevrynt.com
      // and redirects www to itself forever. The root gets its own rule because
      // OpenNext leaves ":path*" unsubstituted in the destination for "/".
      {
        source: "/",
        has: [{ type: "host", value: "^cevrynt\\.com$" }],
        destination: "https://www.cevrynt.com/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "^cevrynt\\.com$" }],
        destination: "https://www.cevrynt.com/:path*",
        permanent: true,
      },
      // URLs from the previous cevrynt.com site, which search engines and old
      // links may still point at.
      { source: "/market", destination: "/investors", permanent: true },
      { source: "/roadmap", destination: "/investors", permanent: true },
      { source: "/process", destination: "/platform", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/cevrynt-favicon.png", destination: "/brand/cevrynt-favicon-96.png", permanent: true },
      { source: "/cevrynt-whitebg.png", destination: "/brand/cevrynt-logo-v2.png", permanent: true },
      { source: "/cevrynt-whitebg-removebg-preview.png", destination: "/brand/cevrynt-logo-v2.png", permanent: true },
      // Paths people commonly guess.
      { source: "/company/:page(about|investors|contact)", destination: "/:page", permanent: true },
      { source: "/demo", destination: "https://calendly.com/arin-cevrynt/cevrynt-demo", permanent: false },
      { source: "/cookies", destination: "/cookie-policy", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-use", destination: "/terms", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
    ];
  },
  async headers() {
    if (!isProduction) {
      return [
        {
          source: "/:path*",
          headers: developmentNoCacheHeaders,
        },
      ];
    }

    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
