import { ImageResponse } from "next/og";
import { ar } from "@/lib/i18n/locales/ar";

export const alt = ar.meta.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadArabicFont() {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansArabic/NotoSansArabic-Bold.ttf"
    );
    if (!res.ok) return null;
    return res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const fontData = await loadArabicFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #1c1917 0%, #292524 45%, #44403c 100%)",
          color: "#fafaf9",
          fontFamily: fontData ? "NotoSansArabic" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #d4af37 0%, #a67c00 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#1c1917",
            }}
          >
            C
          </div>
          <div style={{ display: "flex", marginLeft: 16, fontSize: 36, fontWeight: 800 }}>
            كاش هاب
          </div>
          <div style={{ display: "flex", marginLeft: 12, fontSize: 22, color: "#a8a29e" }}>
            CashHub
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 800, lineHeight: 1.25 }}>
            {`${ar.hero.title} ${ar.hero.titleHighlight}`}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 26,
              lineHeight: 1.5,
              color: "#d6d3d1",
              maxWidth: 920,
            }}
          >
            {ar.meta.ogDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#a8a29e",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", color: "#d4af37", fontWeight: 700 }}>
            حجوزات · نقطة بيع · عملاء · تقارير
          </div>
          <div style={{ display: "flex" }}>cashhub.app</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "NotoSansArabic",
              data: fontData,
              style: "normal" as const,
              weight: 700 as const,
            },
          ]
        : [],
    }
  );
}
