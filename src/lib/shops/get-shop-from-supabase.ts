import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type {
  LocalizedString,
  ShopFaq,
  ShopHighlight,
  ShopHighlightIcon,
  ShopLanguageMode,
  ShopServiceCategory,
  ShopTemplateId,
  ShopTimeSlot,
  ShopWebsiteData,
} from "./types";
import {
  generateReservationSchedule,
  localizedFriendlyTime,
  normalizeTime24,
} from "./time";
import {
  localizeAddressParts,
  localizePlaceName,
  localizePlaceText,
} from "./places";
import { normalizeWorkingDays } from "./working-days";

type JsonObject = Record<string, unknown>;

type ShopRow = {
  id: string;
  public_number: number | null;
  shop_name: string | null;
  shop_number: string | null;
  subscription_plan: string | null;
  end_of_subscription: string | null;
  features: unknown;
  type: string | null;
  location: string | null;
  country: string | null;
  working_hours_from: string | null;
  working_hours_to: string | null;
  number_of_chairs: number | null;
  working_days: unknown;
  slot_interval_minutes: number | null;
};

type CategoryRow = {
  id: number;
  title: string;
  description: string | null;
};

type ServiceRow = {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  price: number;
};

type WebsiteConfigRow = {
  shop_id: string;
  theme: number;
  language_mode: string;
  hero: unknown;
  about: unknown;
  advantages: unknown;
  social: unknown;
  faq: unknown;
  seo: unknown;
};

const DAY_NAMES: Record<string, LocalizedString> = {
  saturday: { ar: "السبت", en: "Saturday" },
  sunday: { ar: "الأحد", en: "Sunday" },
  monday: { ar: "الاثنين", en: "Monday" },
  tuesday: { ar: "الثلاثاء", en: "Tuesday" },
  wednesday: { ar: "الأربعاء", en: "Wednesday" },
  thursday: { ar: "الخميس", en: "Thursday" },
  friday: { ar: "الجمعة", en: "Friday" },
};

/** Week order used to group consecutive working days into ranges. */
const WEEK_ORDER = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeFallback(fallback: string | LocalizedString = ""): LocalizedString {
  return typeof fallback === "string"
    ? { ar: fallback, en: fallback }
    : fallback;
}

function localized(
  value: unknown,
  fallback: string | LocalizedString = "",
): LocalizedString {
  const fb = normalizeFallback(fallback);

  if (typeof value === "string") {
    return { ar: value, en: value };
  }

  if (isObject(value)) {
    const ar = stringValue(value.ar);
    const en = stringValue(value.en);

    return {
      ar: ar ?? (fb.ar || en || ""),
      en: en ?? (fb.en || ar || ""),
    };
  }

  return { ar: fb.ar, en: fb.en };
}

function localizedField(
  source: JsonObject,
  key: string,
  fallback: string | LocalizedString = "",
): LocalizedString {
  const direct = source[key];
  if (typeof direct === "string" || isObject(direct)) {
    return localized(direct, fallback);
  }

  const ar = stringValue(source[`${key}_ar`]);
  const en = stringValue(source[`${key}_en`]);
  return localized({ ar, en }, fallback);
}

function localizedFirstField(
  source: JsonObject,
  keys: string[],
  fallback: string | LocalizedString = "",
): LocalizedString {
  for (const key of keys) {
    const value = localizedField(source, key);
    if (value.ar || value.en) return value;
  }

  return localized(fallback);
}

function keywordList(value: unknown): string[] {
  const values = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/[,\n]/)
      : [];

  return values
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function localizedKeywords(source: JsonObject) {
  const direct = source.keywords;
  const directObject = isObject(direct) ? direct : {};
  const shared = isObject(direct) ? [] : keywordList(direct);

  return {
    ar: [
      ...keywordList(directObject.ar),
      ...keywordList(source.keywords_ar),
      ...keywordList(source.keywordsAr),
      ...keywordList(source.keyword_ar),
      ...shared,
    ],
    en: [
      ...keywordList(directObject.en),
      ...keywordList(source.keywords_en),
      ...keywordList(source.keywordsEn),
      ...keywordList(source.keyword_en),
      ...shared,
    ],
  };
}

function optionalString(source: JsonObject, ...keys: string[]) {
  for (const key of keys) {
    const value = stringValue(source[key]);
    if (value) return value;
  }

  return undefined;
}

function templateId(value: number | undefined): ShopTemplateId {
  return value && value >= 1 && value <= 6
    ? (value as ShopTemplateId)
    : 1;
}

function languageMode(value: string | undefined): ShopLanguageMode {
  return value === "en" || value === "ar" ? value : "bilingual";
}

function parseFeatures(value: unknown): Record<string, boolean> | null {
  if (!isObject(value)) return null;

  const features: Record<string, boolean> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === "boolean") {
      features[key] = entry;
    }
  }

  return Object.keys(features).length ? features : null;
}

function audienceFromType(type: string | null): "men" | "women" {
  const normalized = type?.toLowerCase() ?? "";
  return /women|woman|female|ladies|نسائ|سيدات/.test(normalized)
    ? "women"
    : "men";
}

function buildTimeSlots(
  from: string | null,
  to: string | null,
  interval: number | null,
  numberOfChairs: number | null,
): ShopTimeSlot[] {
  try {
    const schedule = generateReservationSchedule(
      normalizeTime24(from ?? "12:00"),
      normalizeTime24(to ?? "23:00"),
      interval ?? 60,
      numberOfChairs ?? 1,
    );

    return schedule.slots.map((time) => ({
      // The selected reservation time remains a 24-hour HH:MM value internally.
      id: time,
      label: localizedFriendlyTime(time),
    }));
  } catch (err) {
    console.error("Unable to build reservation time slots:", err);
    return [];
  }
}

function buildHours(shop: ShopRow) {
  const rawDays = Array.isArray(shop.working_days) ? shop.working_days : [];
  let from: string;
  let to: string;
  try {
    from = normalizeTime24(shop.working_hours_from ?? "12:00");
    to = normalizeTime24(shop.working_hours_to ?? "23:00");
  } catch (err) {
    console.error("Unable to build shop hours:", err);
    from = "12:00";
    to = "23:00";
  }
  const hours = {
    ar: `${localizedFriendlyTime(from).ar} — ${localizedFriendlyTime(to).ar}`,
    en: `${localizedFriendlyTime(from).en} — ${localizedFriendlyTime(to).en}`,
  };

  const activeDays = rawDays.filter(
    (day): day is string => typeof day === "string",
  );
  const normalized = activeDays.map((day) => day.toLowerCase());

  // Known week days kept in canonical order; anything else stays as-is.
  const ordered = WEEK_ORDER.filter((day) => normalized.includes(day));
  const unknownDays = activeDays.filter(
    (day) => !WEEK_ORDER.includes(day.toLowerCase()),
  );

  // Group runs of consecutive working days so days off split them apart.
  const groups: string[][] = [];
  for (const day of ordered) {
    const index = WEEK_ORDER.indexOf(day);
    const lastGroup = groups[groups.length - 1];
    const lastIndex = lastGroup
      ? WEEK_ORDER.indexOf(lastGroup[lastGroup.length - 1])
      : -2;

    if (lastGroup && index === lastIndex + 1) {
      lastGroup.push(day);
    } else {
      groups.push([day]);
    }
  }

  const rows = groups.map((group) => {
    const first = DAY_NAMES[group[0]];
    const last = DAY_NAMES[group[group.length - 1]];
    const day =
      group.length === 1
        ? first
        : { ar: `${first.ar} — ${last.ar}`, en: `${first.en} — ${last.en}` };

    return { day, hours };
  });

  for (const day of unknownDays) {
    rows.push({ day: localized(day), hours });
  }

  return rows;
}

function mapHighlights(
  advantages: unknown,
  about: JsonObject,
  shop: ShopRow,
): ShopHighlight[] {
  const value = Array.isArray(advantages)
    ? advantages
    : isObject(advantages) && Array.isArray(advantages.items)
      ? advantages.items
      : about.highlights;

  if (Array.isArray(value)) {
    const highlights = value.flatMap((item, index): ShopHighlight[] => {
      if (!isObject(item)) return [];

      const rawIcon = stringValue(item.icon);
      const icon: ShopHighlightIcon =
        rawIcon === "sanitized" || rawIcon === "products"
          ? rawIcon
          : "experience";

      return [{
        id: stringValue(item.id) ?? `highlight-${index}`,
        icon,
        title: localizedField(item, "title"),
        description: localizedField(item, "description"),
      }];
    });

    if (highlights.length) return highlights;
  }

  return [
    {
      id: "capacity",
      icon: "experience",
      title: {
        ar: `السعة: ${shop.number_of_chairs ?? 1} كرسي`,
        en: `Capacity: ${shop.number_of_chairs ?? 1} chair${shop.number_of_chairs === 1 ? "" : "s"}`,
      },
      description: {
        ar: "جاهزون لاستقبال حجوزاتكم خلال ساعات العمل.",
        en: "Ready to receive your bookings during working hours.",
      },
    },
  ];
}

function mapFaq(value: unknown): ShopFaq[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item, index): ShopFaq[] => {
    if (!isObject(item)) return [];

    return [{
      id: stringValue(item.id) ?? `faq-${index}`,
      question: localizedField(item, "question"),
      answer: localizedField(item, "answer"),
    }];
  });
}

function mapCategories(
  categories: CategoryRow[],
  services: ServiceRow[],
): ShopServiceCategory[] {
  return categories.map((category) => ({
    id: String(category.id),
    name: localized(category.title),
    services: services
      .filter((service) => service.category_id === category.id)
      .map((service) => ({
        id: String(service.id),
        name: localized(service.name),
        description: localized(service.description ?? ""),
        price: {
          ar: String(service.price),
          en: String(service.price),
        },
      })),
  }));
}

async function fetchShopWebsite(
  shopSlug: string,
  publicNumberParam: string,
): Promise<ShopWebsiteData | null> {
  const publicNumber = Number(publicNumberParam);
  if (!Number.isInteger(publicNumber) || publicNumber <= 0) return null;

  const supabase = await createClient();

  // The URL never carries the Supabase id: resolve the shop_id from the
  // slug, then cross-check it against the public_number from the URL
  // before trusting it. A slug/public_number pair that doesn't match the
  // same shop is treated as not found.
  const configLookup = await supabase
    .from("shop_website_configs")
    .select(
      "shop_id, theme, language_mode, hero, about, advantages, social, faq, seo",
    )
    .eq("slug", shopSlug)
    .maybeSingle();

  if (configLookup.error) {
    console.error("Unable to load shop website:", configLookup.error.message);
    return null;
  }

  const config = configLookup.data as WebsiteConfigRow | null;
  if (!config) return null;

  const shopId = config.shop_id;

  const [shopResult, categoriesResult, servicesResult] = await Promise.all([
    supabase
      .from("shops")
      .select(
        "id, public_number, shop_name, shop_number, subscription_plan, end_of_subscription, features, type, location, country, working_hours_from, working_hours_to, number_of_chairs, working_days, slot_interval_minutes",
      )
      .eq("id", shopId)
      .eq("public_number", publicNumber)
      .maybeSingle(),
    supabase
      .from("catigories")
      .select("id, title, description")
      .eq("shop_id", shopId)
      .order("id"),
    supabase
      .from("services")
      .select("id, category_id, name, description, price")
      .eq("shop_id", shopId)
      .eq("is_active", true)
      .order("id"),
  ]);

  const error = shopResult.error ?? categoriesResult.error ?? servicesResult.error;

  if (error) {
    console.error("Unable to load shop website:", error.message);
    return null;
  }

  // The public_number didn't match the shop the slug points to.
  if (!shopResult.data) return null;

  try {
    const shop = shopResult.data as ShopRow;
    const categories = (categoriesResult.data ?? []) as CategoryRow[];
    const services = (servicesResult.data ?? []) as ServiceRow[];
    const hero = isObject(config?.hero) ? config.hero : {};
    const about = isObject(config?.about) ? config.about : {};
    const social = isObject(config?.social) ? config.social : {};
    const seo = isObject(config?.seo) ? config.seo : {};
    const shopName = shop.shop_name ?? "Shop";
    const address = localizeAddressParts(shop.location, shop.country);
    const location = localizePlaceName(shop.location ?? "");
    const country = localizePlaceName(shop.country ?? "");
    const phone = optionalString(social, "phone") ?? shop.shop_number ?? "";
    const whatsappDigits = (
      optionalString(social, "whatsapp", "whats_app") ?? phone
    ).replace(/\D/g, "");
    // Shop numbers are stored in local Egyptian format (leading 0, no country
    // code), e.g. "01001234567". WhatsApp needs the country code instead of
    // the leading 0, so "2" + "01001234567" -> "201001234567".
    const whatsapp =
      whatsappDigits && !whatsappDigits.startsWith("20")
        ? `2${whatsappDigits}`
        : whatsappDigits;

    return {
      id: shop.id,
      slug: shopSlug,
      subscriptionPlan: shop.subscription_plan,
      endOfSubscription: shop.end_of_subscription,
      features: parseFeatures(shop.features),
      templateId: templateId(config?.theme),
      languageMode: languageMode(config?.language_mode),
      audience: audienceFromType(shop.type),
      name: localizedField(hero, "name", shopName),
      tagline: localizedField(
        hero,
        "tagline",
        shop.type ?? "Welcome",
      ),
      description: localizedField(
        hero,
        "description",
        localizedField(seo, "description", address),
      ),
      hero: {
        title: localizedFirstField(
          hero,
          ["headline", "title", "name"],
          shopName,
        ),
        subtitle: localizedFirstField(
          hero,
          ["subheadline", "subtitle", "tagline"],
          shop.type ?? "Welcome",
        ),
        ctaText: localizedFirstField(
          hero,
          ["ctaText", "cta_text", "buttonText", "button_text", "cta"],
        ),
      },
      about: {
        title: localizedField(about, "title", {
          ar: "من نحن",
          en: "About us",
        }),
        body: localizedFirstField(about, ["body", "description"], address),
        highlights: mapHighlights(config?.advantages, about, shop),
      },
      categories: mapCategories(categories, services),
      timeSlots: buildTimeSlots(
        shop.working_hours_from,
        shop.working_hours_to,
        shop.slot_interval_minutes,
        shop.number_of_chairs,
      ),
      workingDays: normalizeWorkingDays(shop.working_days),
      hours: buildHours(shop),
      contact: {
        phone,
        whatsapp,
        address: (() => {
          const configured = localizedField(social, "address");
          if (configured.ar || configured.en) {
            return {
              ar: configured.ar
                ? localizePlaceText(configured.ar).ar
                : configured.en
                  ? localizePlaceText(configured.en).ar
                  : address.ar,
              en: configured.en
                ? localizePlaceText(configured.en).en
                : configured.ar
                  ? localizePlaceText(configured.ar).en
                  : address.en,
            };
          }
          return address;
        })(),
        mapUrl: optionalString(social, "mapUrl", "map_url"),
        facebook: optionalString(social, "facebook"),
        instagram: optionalString(social, "instagram"),
        tiktok: optionalString(social, "tiktok"),
      },
      faqs: mapFaq(config?.faq),
      seo: {
        title: localizedFirstField(seo, ["title", "metaTitle", "meta_title"]),
        description: localizedFirstField(
          seo,
          ["description", "metaDescription", "meta_description"],
        ),
        keywords: localizedKeywords(seo),
        location: (() => {
          const configured = localizedFirstField(seo, ["location", "area"]);
          if (configured.ar || configured.en) {
            return {
              ar: configured.ar
                ? localizePlaceText(configured.ar).ar
                : location.ar,
              en: configured.en
                ? localizePlaceText(configured.en).en
                : location.en,
            };
          }
          return location;
        })(),
        country: (() => {
          const configured = localizedFirstField(seo, ["country"]);
          if (configured.ar || configured.en) {
            return {
              ar: configured.ar
                ? localizePlaceName(configured.ar).ar
                : country.ar,
              en: configured.en
                ? localizePlaceName(configured.en).en
                : country.en,
            };
          }
          return country;
        })(),
        businessType: localizedFirstField(
          seo,
          ["businessType", "business_type", "type"],
          shop.type ?? "",
        ),
      },
    };
  } catch (err) {
    console.error("Failed to map shop website data:", err);
    return null;
  }
}

// generateMetadata and the page both call this function during one request.
export const getShopWebsite = cache(fetchShopWebsite);
