/**
 * On Vercel, use the domain the production deployment is actually served
 * from (set automatically, and switches to a custom domain once one is
 * attached). Link previews load their image from this URL, so it must never
 * point at a domain that is not live — WhatsApp hangs waiting for it.
 */
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const siteUrl = vercelProductionHost
  ? `https://${vercelProductionHost}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://cash-hub-website.vercel.app";

export const siteConfig = {
  name: "CashHub",
  nameAr: "كاش هاب",
  url: siteUrl.replace(/\/$/, ""),
  locale: "ar_SA",
  alternateLocale: "en_US",
  twitterHandle: "@cashhub",
  contactEmail: "hello@cashhub.app",
  whatsapp: "201020233296",
  facebook: "https://www.facebook.com/people/%D9%83%D8%A7%D8%B4-%D9%87%D8%A8-Cash-Hub/61595060050187/",
  instagram: "https://www.instagram.com/cash.hub12/",
  sameAs: ["https://www.facebook.com/people/%D9%83%D8%A7%D8%B4-%D9%87%D8%A8-Cash-Hub/61595060050187/", "https://www.instagram.com/cash.hub12/"] as string[],
} as const;

export function getSiteUrl() {
  return siteConfig.url;
}
