import { ImageResponse } from "next/og";
import { ogLogoDataUri } from "@/lib/og-logo";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export async function renderOgImage({ eyebrow, title, subtitle }) {
  const logoSrc = ogLogoDataUri;
  const titleSize = title.length > 70 ? 52 : title.length > 44 ? 62 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 76px",
          backgroundImage: "linear-gradient(135deg, #0a4640 0%, #052d29 60%, #031e1b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logoSrc ? <img src={logoSrc} width={168} height={60} alt="" style={{ objectFit: "contain" }} /> : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                color: "#ffefb3",
                fontSize: 26,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              color: "#f7faf9",
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: "flex", color: "#b9d4cd", fontSize: 30, lineHeight: 1.4 }}>{subtitle}</div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#7fa39b",
            fontSize: 24,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>cevrynt.com</div>
          <div style={{ display: "flex" }}>AI Underwriting Infrastructure for Alternative Lenders</div>
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
