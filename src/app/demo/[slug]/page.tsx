import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getDemoShop } from "@/lib/shops/get-shop";
import { ShopTemplate } from "@/lib/shops/templates";
import { pickLocale } from "@/lib/shops/types";
import { LocaleProvider } from "@/providers/LocaleProvider";

type DemoPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

/**
 * Template preview with demo content, e.g. /demo/najd-barber-watan?lang=ar.
 * Demo shops live in lib/shops/get-shop.ts; real shops use /[shopSlug]/[publicNumber].
 */
export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const shop = getDemoShop(slug);
  return {
    title: shop ? `${pickLocale(shop.name, "ar")} — Demo` : "Demo",
    robots: { index: false, follow: false },
  };
}

export default async function DemoShopPage({ params, searchParams }: DemoPageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const shop = getDemoShop(slug);
  if (!shop) notFound();

  const forcedLocale: Locale | undefined =
    lang === "ar" || lang === "en" ? lang : undefined;

  return (
    <LocaleProvider forcedLocale={forcedLocale}>
      <ShopTemplate shop={shop} />
    </LocaleProvider>
  );
}
