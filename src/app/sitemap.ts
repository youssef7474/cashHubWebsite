import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ar: siteUrl,
          en: `${siteUrl}/?lang=en`,
          "x-default": siteUrl,
        },
      },
    },
  ];
}
