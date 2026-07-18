export const siteConfig = {
  name: "CashHub",
  nameAr: "كاش هاب",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://cashhub.app",
  locale: "ar_SA",
  alternateLocale: "en_US",
  twitterHandle: "@cashhub",
  contactEmail: "hello@cashhub.app",
  whatsapp: "201020233296",
  sameAs: [] as string[],
} as const;

export function getSiteUrl() {
  return siteConfig.url;
}
