"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";

type KickoffFooterProps = {
  shop: ShopWebsiteData;
};

export function KickoffFooter({ shop }: KickoffFooterProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const name = pickLocale(shop.name, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--ko-line)] bg-[var(--ko-night)]">
      <div className="kickoff-shell flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="kickoff-display text-3xl text-[var(--ko-white)]">
            {name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-[var(--ko-muted)]">
            {pickLocale(shop.tagline, locale)}
          </p>
          <ShopSocialLinks
            contact={shop.contact}
            variant="kickoff"
            className="mt-5"
            label={ui.socialTitle}
          />
          <p className="mt-4 text-xs text-[var(--ko-muted)]">
            © {year} {name}
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2.5 border border-[var(--ko-line)] px-3 py-2 opacity-80 transition-opacity hover:opacity-100"
          aria-label={`${ui.poweredBy} CashHub`}
        >
          <span className="text-[0.6rem] font-bold tracking-[0.18em] text-[var(--ko-muted)] uppercase">
            {ui.poweredBy}
          </span>
          <BrandLogo variant="dark" className="h-5" />
        </a>
      </div>
    </footer>
  );
}
