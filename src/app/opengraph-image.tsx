import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ar } from "@/lib/i18n/locales/ar";

export const alt = ar.meta.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Link-preview card (WhatsApp, Facebook, X…). Shows the real logo only — the
 * image renderer cannot lay out Arabic right-to-left, and the Arabic title and
 * description already appear as text under the image in the preview.
 */
export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "src/app/icon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          background: "linear-gradient(145deg, #ffffff 0%, #faf7f0 55%, #f3ead6 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={300} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#1c1917",
          }}
        >
          CashHub
        </div>
        <div style={{ display: "flex", marginTop: 20, width: 120, height: 4, background: "#b8892f" }} />
      </div>
    ),
    size
  );
}
