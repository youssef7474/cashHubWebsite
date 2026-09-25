"use client";

import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";

type ParlorFooterProps = {
  shop: ShopWebsiteData;
};

export function ParlorFooter({ shop }: ParlorFooterProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const name = pickLocale(shop.name, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--pl-navy)] text-[var(--pl-paper)]">
      <div className="parlor-pole" aria-hidden />
      <div className="parlor-shell flex flex-col items-center gap-6 py-12 text-center">
        <p className="parlor-display text-3xl">{name}</p>
        <p className="max-w-sm text-sm text-[var(--pl-paper)]/70">
          {pickLocale(shop.tagline, locale)}
        </p>
        <ShopSocialLinks
          contact={shop.contact}
          shopName={shop.name}
          variant="parlor"
          className="justify-center [&_a]:border-white/25 [&_a]:bg-transparent [&_a]:text-[var(--pl-paper)]"
          label={ui.socialTitle}
        />
        <p className="text-xs text-[var(--pl-paper)]/60">
          © {year} {name}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 border border-white/25 px-3 py-2 opacity-80 transition-opacity hover:opacity-100"
          aria-label={`${ui.poweredBy} CashHub`}
        >
          <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase opacity-80">
            {ui.poweredBy}
          </span>
          <BrandLogo variant="dark" className="h-5" />
        </Link>
      </div>
    </footer>
  );
}
