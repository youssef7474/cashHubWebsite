"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";

type MaisonColophonProps = {
  shop: ShopWebsiteData;
};

export function MaisonColophon({ shop }: MaisonColophonProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const name = pickLocale(shop.name, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--maison-line)] bg-[var(--maison-void)]">
      <div className="maison-shell flex flex-col items-start justify-between gap-8 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="maison-display text-2xl text-[var(--maison-ivory)]">
            {name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-[var(--maison-muted)]">
            {pickLocale(shop.tagline, locale)}
          </p>
          <ShopSocialLinks
            contact={shop.contact}
            shopName={shop.name}
            variant="maison"
            className="mt-5"
            label={ui.socialTitle}
          />
          <p className="mt-4 text-xs text-[var(--maison-muted)]">
            © {year} {name}
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2.5 border border-[var(--maison-line)] px-3 py-2 opacity-80 transition-opacity hover:opacity-100"
          aria-label={`${ui.poweredBy} CashHub`}
        >
          <span className="text-[0.6rem] font-semibold tracking-[0.22em] text-[var(--maison-muted)] uppercase">
            {ui.poweredBy}
          </span>
          <BrandLogo variant="dark" className="h-5" />
        </a>
      </div>
    </footer>
  );
}
