import { ImageResponse } from "next/og";
import { ogLogoDataUri } from "@/lib/og-logo";
import { ogLogoFullDataUri, ogLogoFullSize } from "@/lib/og-logo-full";

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

/* The homepage share card: the logo is the message. The full-colour wordmark
   is drawn for light backgrounds, so it sits unaltered on the cool-white
   surface, with the positioning line beneath it. */
export async function renderBrandOgImage({ tagline }) {
  const logoWidth = 560;
  const logoHeight = Math.round((logoWidth * ogLogoFullSize.height) / ogLogoFullSize.width);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f7faf9",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, #edf5f3 0%, rgba(237,245,243,0) 55%), radial-gradient(circle at 88% 100%, #edf5f3 0%, rgba(237,245,243,0) 55%)",
          borderTop: "12px solid #013e37",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ogLogoFullDataUri} width={logoWidth} height={logoHeight} alt="" />
        {tagline ? (
          <div
            style={{
              display: "flex",
              marginTop: 52,
              color: "#013e37",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: -0.5,
            }}
          >
            {tagline}
          </div>
        ) : null}
        <div style={{ display: "flex", marginTop: 18, color: "#496761", fontSize: 24 }}>www.cevrynt.com</div>
      </div>
    ),
    { ...ogImageSize }
  );
}
