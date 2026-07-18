import type { MetadataRoute } from "next";
import { ar } from "@/lib/i18n/locales/ar";
import { siteConfig } from "@/lib/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ar.meta.siteName,
    short_name: siteConfig.name,
    description: ar.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#1c1917",
    lang: "ar",
    dir: "rtl",
    categories: ["business", "productivity", "finance"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
