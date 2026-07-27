import type { Locale } from "@/lib/i18n";

export type LocalizedString = {
  ar: string;
  en: string;
};

export type ShopTemplateId = 1 | 2 | 3 | 4 | 5 | 6;

export type ShopAudience = "men" | "women";

export type ShopLanguageMode = "bilingual" | "en" | "ar";

export type ShopHighlightIcon = "experience" | "sanitized" | "products";

export type ShopHighlight = {
  id: string;
  icon: ShopHighlightIcon;
  title: LocalizedString;
  description: LocalizedString;
};

export type ShopService = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: LocalizedString;
};

export type ShopServiceCategory = {
  id: string;
  name: LocalizedString;
  services: ShopService[];
};

export type ShopHoursDay = {
  day: LocalizedString;
  hours: LocalizedString;
};

export type ShopContact = {
  phone: string;
  /** Digits only, for https://wa.me/{whatsapp} */
  whatsapp: string;
  address: LocalizedString;
  mapUrl?: string;
  /** Full profile URL, e.g. https://facebook.com/... */
  facebook?: string;
  /** Full profile URL, e.g. https://instagram.com/... */
  instagram?: string;
  /** Full profile URL, e.g. https://tiktok.com/@... */
  tiktok?: string;
};

export type ShopTimeSlot = {
  id: string;
  label: LocalizedString;
};

export type ShopFaq = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
};

export type ShopSeo = {
  title: LocalizedString;
  description: LocalizedString;
  keywords: {
    ar: string[];
    en: string[];
  };
  location: LocalizedString;
  country: LocalizedString;
  businessType: LocalizedString;
};

export type ShopWebsiteData = {
  id: string;
  slug: string;
  subscriptionPlan?: string | null;
  endOfSubscription?: string | null;
  /** Plan feature flags from the shops.features column. */
  features?: Record<string, boolean> | null;
  templateId: ShopTemplateId;
  languageMode: ShopLanguageMode;
  audience: ShopAudience;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  hero?: {
    title: LocalizedString;
    subtitle: LocalizedString;
    ctaText: LocalizedString;
  };
  about: {
    title: LocalizedString;
    body: LocalizedString;
    highlights: ShopHighlight[];
  };
  categories: ShopServiceCategory[];
  timeSlots: ShopTimeSlot[];
  hours: ShopHoursDay[];
  contact: ShopContact;
  faqs: ShopFaq[];
  seo: ShopSeo;
};

export function pickLocale(value: LocalizedString, locale: Locale): string {
  return value[locale];
}

export function flattenServices(shop: ShopWebsiteData): ShopService[] {
  return shop.categories.flatMap((category) => category.services);
}

export function isShopSubscriptionExpired(
  shop: Pick<ShopWebsiteData, "subscriptionPlan" | "endOfSubscription">,
  now = new Date(),
): boolean {
  if (shop.subscriptionPlan?.trim().toLowerCase() === "expired") {
    return true;
  }

  const endDate = shop.endOfSubscription?.trim();
  if (!endDate) return false;

  // A date-only subscription remains valid through the end of that date.
  if (/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
    return endDate < now.toISOString().slice(0, 10);
  }

  const endTime = Date.parse(endDate);
  return Number.isFinite(endTime) && endTime <= now.getTime();
}

/** Website is allowed when features is unset (legacy) or website is explicitly true. */
export function isShopWebsiteFeatureEnabled(
  shop: Pick<ShopWebsiteData, "features">,
): boolean {
  if (!shop.features) return true;
  return shop.features.website === true;
}
