"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";

type StudioFooterProps = {
  shop: ShopWebsiteData;
};

export function StudioFooter({ shop }: StudioFooterProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const name = pickLocale(shop.name, locale);
  const year = new Date().getFullYear();

  const links = [
    { href: "#story", label: ui.navAbout },
    { href: "#book", label: ui.navBook },
    { href: "#faq", label: ui.navFaq },
    { href: "#find", label: ui.navContact },
  ];

  return (
    <footer className="border-t border-[var(--studio-line)] bg-[var(--studio-surface)]">
      <div className="studio-shell py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-extrabold tracking-tight">{name}</p>
            <p className="mt-2 max-w-xs text-sm text-[var(--studio-muted)]">
              {pickLocale(shop.tagline, locale)}
            </p>
            <ShopSocialLinks
              contact={shop.contact}
              variant="barber"
              className="mt-5"
              label={ui.socialTitle}
            />
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-accent)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--studio-line)] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--studio-muted)]">
            © {year} {name}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--studio-line)] bg-[var(--studio-bg)] px-3 py-1.5"
            aria-label={`${ui.poweredBy} CashHub`}
          >
            <span className="text-[10px] font-medium tracking-wide text-[var(--studio-muted)] uppercase">
              {ui.poweredBy}
            </span>
            <BrandLogo className="h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
