import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SubscriptionEnded,
  WebsiteFeatureUnavailable,
} from "@/components/shop/ShopUnavailable";
import type { Locale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo/config";
import { getShopWebsite } from "@/lib/shops/get-shop-from-supabase";
import { ShopTemplate } from "@/lib/shops/templates";
import {
  flattenServices,
  isShopSubscriptionExpired,
  isShopWebsiteFeatureEnabled,
  pickLocale,
  type ShopWebsiteData,
} from "@/lib/shops/types";
import { LocaleProvider } from "@/providers/LocaleProvider";

type ShopPageProps = {
  params: Promise<{
    shopSlug: string;
    publicNumber: string;
  }>;
};

function shopUrl(shopSlug: string, publicNumber: string) {
  let decodedSlug = shopSlug;
  try {
    decodedSlug = decodeURIComponent(shopSlug);
  } catch {
    // Keep the original route value if it is not valid percent-encoding.
  }

  const path = `/${encodeURIComponent(decodedSlug)}/${encodeURIComponent(publicNumber)}`;
  return new URL(path, `${getSiteUrl()}/`).toString();
}

function uniqueKeywords(values: string[]) {
  const seen = new Set<string>();

  return values.filter((value) => {
    const keyword = value.trim();
    const normalized = keyword.toLocaleLowerCase();
    if (!keyword || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function localKeywords(shop: ShopWebsiteData) {
  const locationAr = pickLocale(shop.seo.location, "ar");
  const locationEn = pickLocale(shop.seo.location, "en");
  const configuredTypeAr = pickLocale(shop.seo.businessType, "ar");
  const configuredTypeEn = pickLocale(shop.seo.businessType, "en");
  const typeAr = /[\u0600-\u06ff]/.test(configuredTypeAr)
    ? configuredTypeAr
    : shop.audience === "women"
      ? "صالون نسائي"
      : "صالون حلاقة";
  const typeEn =
    configuredTypeEn ||
    (shop.audience === "women" ? "beauty salon" : "barber shop");
  const nameAr = pickLocale(shop.name, "ar");
  const nameEn = pickLocale(shop.name, "en");
  const serviceKeywords = flattenServices(shop).flatMap((service) => [
    locationAr ? `${pickLocale(service.name, "ar")} ${locationAr}` : "",
    locationEn ? `${pickLocale(service.name, "en")} ${locationEn}` : "",
  ]);

  const audienceKeywords =
    shop.audience === "women"
      ? [
          locationAr ? `صالون نسائي في ${locationAr}` : "",
          locationAr ? `كوافير نسائي في ${locationAr}` : "",
          locationEn ? `beauty salon in ${locationEn}` : "",
          locationEn ? `ladies salon in ${locationEn}` : "",
        ]
      : [
          locationAr ? `صالون حلاقة في ${locationAr}` : "",
          locationAr ? `حلاق في ${locationAr}` : "",
          locationEn ? `barber shop in ${locationEn}` : "",
          locationEn ? `barbershop in ${locationEn}` : "",
        ];

  return uniqueKeywords([
    ...shop.seo.keywords.ar,
    ...shop.seo.keywords.en,
    locationAr ? `${typeAr} في ${locationAr}` : "",
    locationEn ? `${typeEn} in ${locationEn}` : "",
    locationAr ? `${nameAr} ${locationAr}` : "",
    locationEn ? `${nameEn} ${locationEn}` : "",
    ...audienceKeywords,
    ...serviceKeywords,
  ]);
}

function localizedSeo(shop: ShopWebsiteData, locale: Locale) {
  const name = pickLocale(shop.name, locale);
  const tagline = pickLocale(shop.tagline, locale);
  const location = pickLocale(shop.seo.location, locale);
  const businessType = pickLocale(shop.seo.businessType, locale);
  const configuredTitle = pickLocale(shop.seo.title, locale);
  const configuredDescription = pickLocale(shop.seo.description, locale);
  const titleBase =
    configuredTitle ||
    [name, businessType || tagline].filter(Boolean).join(" — ");
  const title =
    location && !titleBase.toLocaleLowerCase().includes(location.toLocaleLowerCase())
      ? `${titleBase} — ${location}`
      : titleBase;
  const descriptionBase =
    configuredDescription || pickLocale(shop.description, locale);
  const description =
    location &&
    !descriptionBase.toLocaleLowerCase().includes(location.toLocaleLowerCase())
      ? locale === "ar"
        ? `${descriptionBase} الموقع: ${location}.`
        : `${descriptionBase} Located in ${location}.`
      : descriptionBase;

  return { title, description, location, name };
}

export async function generateMetadata({
  params,
}: ShopPageProps): Promise<Metadata> {
  const { shopSlug, publicNumber } = await params;
  const shop = await getShopWebsite(shopSlug, publicNumber);

  if (!shop) {
    return { title: "المتجر غير موجود" };
  }

  if (isShopSubscriptionExpired(shop)) {
    return {
      title: "انتهى الاشتراك | CashHub",
      description: "انتهى اشتراك هذا المتجر في CashHub.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  if (!isShopWebsiteFeatureEnabled(shop)) {
    return {
      title: "الموقع غير متاح في الخطة | CashHub",
      description: "ميزة الموقع غير متاحة في خطة هذا المتجر.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const metadataLocale = shop.languageMode === "en" ? "en" : "ar";
  const { title, description, location, name } = localizedSeo(
    shop,
    metadataLocale,
  );
  const canonical = shopUrl(shopSlug, publicNumber);
  const locale = metadataLocale === "ar" ? "ar_SA" : "en_US";

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: localKeywords(shop),
    category: pickLocale(shop.seo.businessType, metadataLocale),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: name,
      locale,
      alternateLocale:
        shop.languageMode === "bilingual"
          ? [metadataLocale === "ar" ? "en_US" : "ar_SA"]
          : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: location
      ? {
          "geo.placename": location,
        }
      : undefined,
  };
}

function ShopStructuredData({
  shop,
  url,
}: {
  shop: ShopWebsiteData;
  url: string;
}) {
  const locale = shop.languageMode === "en" ? "en" : "ar";
  const { name, description, location } = localizedSeo(shop, locale);
  const country = pickLocale(shop.seo.country, locale);
  const sameAs = [
    shop.contact.facebook,
    shop.contact.instagram,
    shop.contact.tiktok,
  ].filter((value): value is string => Boolean(value));
  const services = flattenServices(shop).map((service) => ({
    "@type": "Service",
    name: pickLocale(service.name, locale),
    description: pickLocale(service.description, locale),
  }));
  const data = {
    "@context": "https://schema.org",
    "@type": shop.audience === "women" ? "BeautySalon" : "HairSalon",
    "@id": `${url}#business`,
    url,
    name,
    description,
    telephone: shop.contact.phone || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: location,
      addressCountry: country,
    },
    sameAs,
    inLanguage:
      shop.languageMode === "bilingual"
        ? ["ar", "en"]
        : [shop.languageMode],
    hasOfferCatalog: services.length
      ? {
          "@type": "OfferCatalog",
          name: locale === "ar" ? "الخدمات" : "Services",
          itemListElement: services,
        }
      : undefined,
  };

  return (
    <script
      id="shop-local-business-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { shopSlug, publicNumber } = await params;
  const shop = await getShopWebsite(shopSlug, publicNumber);

  if (!shop) {
    notFound();
  }

  if (isShopSubscriptionExpired(shop)) {
    return <SubscriptionEnded />;
  }

  if (!isShopWebsiteFeatureEnabled(shop)) {
    return <WebsiteFeatureUnavailable />;
  }

  const template = (
    <>
      <ShopStructuredData shop={shop} url={shopUrl(shopSlug, publicNumber)} />
      <ShopTemplate shop={shop} />
    </>
  );

  if (shop.languageMode === "bilingual") {
    return template;
  }

  return (
    <LocaleProvider forcedLocale={shop.languageMode}>
      {template}
    </LocaleProvider>
  );
}
