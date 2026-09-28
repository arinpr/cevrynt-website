import { ImageResponse } from "next/og";
import { ogLogoFullDataUri, ogLogoFullSize } from "@/lib/og-logo-full";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

/* Keeps long blog excerpts from overflowing the card. */
function clamp(text, max) {
  if (!text || text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

/* The card for every inner page. Same cool-white surface as the homepage
   card, so the full-colour wordmark (drawn for light backgrounds) stays
   legible without any patch behind it. */
export async function renderOgImage({ eyebrow, title, subtitle }) {
  const titleSize = title.length > 60 ? 50 : title.length > 44 ? 60 : 70;
  const logoWidth = 210;
  const logoHeight = Math.round((logoWidth * ogLogoFullSize.height) / ogLogoFullSize.width);
  // A long title wraps to three lines; keep the excerpt to one so nothing crowds.
  const subtitleText = clamp(subtitle, title.length > 60 ? 62 : 150);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 76px 56px",
          backgroundColor: "#f7faf9",
          backgroundImage: "radial-gradient(circle at 100% 0%, #edf5f3 0%, rgba(237,245,243,0) 60%)",
          borderTop: "12px solid #013e37",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ogLogoFullDataUri} width={logoWidth} height={logoHeight} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 22, maxWidth: 1000 }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                padding: "8px 16px",
                borderRadius: 999,
                backgroundColor: "#ffefb3",
                color: "#013e37",
                fontSize: 22,
                letterSpacing: 1.5,
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
              color: "#013e37",
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          {subtitleText ? (
            <div style={{ display: "flex", color: "#496761", fontSize: 28, lineHeight: 1.4 }}>{subtitleText}</div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#496761",
            fontSize: 22,
            borderTop: "1px solid #d8e6e2",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex" }}>www.cevrynt.com</div>
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
