import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SubscriptionEnded,
  WebsiteFeatureUnavailable,
} from "@/components/shop/ShopUnavailable";
import { getShopWebsite } from "@/lib/shops/get-shop-from-supabase";
import { getRulesPalette } from "@/lib/shops/rules-palette";
import {
  isShopSubscriptionExpired,
  isShopWebsiteFeatureEnabled,
  pickLocale,
} from "@/lib/shops/types";

type RulesPageProps = {
  params: Promise<{
    shopSlug: string;
    publicNumber: string;
  }>;
};

const COPY = {
  ar: {
    badge: "القواعد والشروط",
    title: (shop: string) => `قواعد ${shop}`,
    subtitle: "يرجى قراءة القواعد التالية والالتزام بها.",
    empty: "لا توجد قواعد بعد.",
    back: "العودة إلى الموقع",
  },
  en: {
    badge: "Rules & terms",
    title: (shop: string) => `${shop} rules`,
    subtitle: "Please read and follow the rules below.",
    empty: "No rules yet.",
    back: "Back to the website",
  },
} as const;

function shopPath(shopSlug: string, publicNumber: string) {
  let decodedSlug = shopSlug;
  try {
    decodedSlug = decodeURIComponent(shopSlug);
  } catch {
    // Keep the original route value if it is not valid percent-encoding.
  }
  return `/${encodeURIComponent(decodedSlug)}/${encodeURIComponent(publicNumber)}`;
}

export async function generateMetadata({
  params,
}: RulesPageProps): Promise<Metadata> {
  const { shopSlug, publicNumber } = await params;
  const shop = await getShopWebsite(shopSlug, publicNumber);

  if (!shop) return { title: "المتجر غير موجود" };

  if (isShopSubscriptionExpired(shop) || !isShopWebsiteFeatureEnabled(shop)) {
    return { title: "CashHub", robots: { index: false, follow: false } };
  }

  const locale = shop.languageMode === "en" ? "en" : "ar";
  const name = pickLocale(shop.name, locale);
  return {
    title: { absolute: `${COPY[locale].badge} — ${name}` },
    description: COPY[locale].subtitle,
    // Staff-facing page; keep it out of search results.
    robots: { index: false, follow: true },
  };
}

/** The shop's rules as bullet points, in its website template's colors. */
export default async function ShopRulesPage({ params }: RulesPageProps) {
  const { shopSlug, publicNumber } = await params;
  const shop = await getShopWebsite(shopSlug, publicNumber);

  if (!shop) notFound();

  // Closed exactly like the shop's main page.
  if (isShopSubscriptionExpired(shop)) return <SubscriptionEnded />;
  if (!isShopWebsiteFeatureEnabled(shop)) return <WebsiteFeatureUnavailable />;

  const locale = shop.languageMode === "en" ? "en" : "ar";
  const copy = COPY[locale];
  const palette = getRulesPalette(shop.templateId);
  const rules = shop.rules ?? [];
  const shopName = pickLocale(shop.name, locale);

  return (
    <main
      className="min-h-screen px-4 py-12 sm:py-20"
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      style={{ backgroundColor: palette.background, color: palette.text }}
    >
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8 text-center">
          <span
            className="inline-block rounded-full px-4 py-1 text-sm font-semibold"
            style={{ border: `1px solid ${palette.accent}`, color: palette.accent }}
          >
            {copy.badge}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {copy.title(shopName)}
          </h1>
          <div
            className="mx-auto mt-4 h-px w-16"
            style={{ backgroundColor: palette.accent }}
          />
          <p className="mt-4 text-base" style={{ color: palette.muted }}>
            {copy.subtitle}
          </p>
        </header>

        <section
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
          }}
        >
          {rules.length === 0 ? (
            <p className="text-center" style={{ color: palette.muted }}>
              {copy.empty}
            </p>
          ) : (
            <ul className="space-y-4">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3 leading-8">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: palette.accent }}
                  />
                  <span className="min-w-0 whitespace-pre-line break-words">
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="mt-8 text-center">
          <Link
            href={shopPath(shopSlug, publicNumber)}
            className="text-sm font-semibold underline-offset-4 hover:underline"
            style={{ color: palette.accent }}
          >
            {copy.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
