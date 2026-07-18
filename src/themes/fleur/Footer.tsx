"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";

type FleurFooterProps = {
  shop: ShopWebsiteData;
};

export function FleurFooter({ shop }: FleurFooterProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const name = pickLocale(shop.name, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--fleur-line)] bg-[var(--fleur-cream)]">
      <div className="fleur-shell flex flex-col items-start justify-between gap-8 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="fleur-display text-2xl text-[var(--fleur-plum)]">
            {name}
          </p>
          <p className="fleur-italic mt-2 max-w-sm text-sm text-[var(--fleur-muted)]">
            {pickLocale(shop.tagline, locale)}
          </p>
          <ShopSocialLinks
            contact={shop.contact}
            variant="fleur"
            className="mt-5"
            label={ui.socialTitle}
          />
          <p className="mt-4 text-xs text-[var(--fleur-muted)]">
            © {year} {name}
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full border border-[var(--fleur-line)] px-4 py-2 opacity-80 transition-opacity hover:opacity-100"
          aria-label={`${ui.poweredBy} CashHub`}
        >
          <span className="text-[0.6rem] font-semibold tracking-[0.22em] text-[var(--fleur-muted)] uppercase">
            {ui.poweredBy}
          </span>
          <BrandLogo className="h-5" />
        </a>
      </div>
    </footer>
  );
}
