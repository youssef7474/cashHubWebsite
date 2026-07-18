import type { Metadata } from "next";
import { ar } from "@/lib/i18n/locales/ar";
import { en } from "@/lib/i18n/locales/en";
import { getSiteUrl, siteConfig } from "./config";

const meta = ar.meta;

export function buildRootMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: `%s | ${siteConfig.nameAr}`,
    },
    description: meta.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    keywords: meta.keywords,
    category: meta.category,
    classification: meta.category,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
      languages: {
        "ar-SA": "/",
        "en-US": "/?lang=en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      alternateLocale: [siteConfig.alternateLocale],
      url: "/",
      siteName: meta.siteName,
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: meta.ogTitle,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "apple-mobile-web-app-title": siteConfig.name,
      "mobile-web-app-capable": "yes",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
  };
}

/** English meta kept for bilingual markup / future locale routes */
export const englishMeta = en.meta;
