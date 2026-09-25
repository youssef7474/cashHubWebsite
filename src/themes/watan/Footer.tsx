"use client";

import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";

type WatanFooterProps = {
  shop: ShopWebsiteData;
};

export function WatanFooter({ shop }: WatanFooterProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const name = pickLocale(shop.name, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--wt-line)] bg-[var(--wt-night)]">
      <div className="watan-shell flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="watan-display text-3xl text-[var(--wt-white)]">
            {name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-[var(--wt-muted)]">
            {pickLocale(shop.tagline, locale)}
          </p>
          <ShopSocialLinks
            contact={shop.contact}
            shopName={shop.name}
            variant="watan"
            className="mt-5"
            label={ui.socialTitle}
          />
          <p className="mt-4 text-xs text-[var(--wt-muted)]">
            © {year} {name}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2.5 border border-[var(--wt-line)] px-3 py-2 opacity-80 transition-opacity hover:opacity-100"
          aria-label={`${ui.poweredBy} CashHub`}
        >
          <span className="text-[0.6rem] font-bold tracking-[0.18em] text-[var(--wt-muted)] uppercase">
            {ui.poweredBy}
          </span>
          <BrandLogo variant="dark" className="h-5" />
        </Link>
      </div>
    </footer>
  );
}
