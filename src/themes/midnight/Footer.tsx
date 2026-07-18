"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";

type MidnightFooterProps = {
  shop: ShopWebsiteData;
};

export function MidnightFooter({ shop }: MidnightFooterProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const name = pickLocale(shop.name, locale);
  const year = new Date().getFullYear();

  const links = [
    { href: "#about", label: ui.navAbout },
    { href: "#reservation", label: ui.navBook },
    { href: "#faq", label: ui.navFaq },
    { href: "#contact", label: ui.navContact },
  ];

  return (
    <footer className="border-t border-brand-800 bg-brand-950 text-brand-400">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xl font-bold text-brand-50">{name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-500">
              {pickLocale(shop.tagline, locale)}
            </p>
            <ShopSocialLinks
              contact={shop.contact}
              variant="midnight"
              className="mt-5"
              label={ui.socialTitle}
            />
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm transition-colors hover:text-accent-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-brand-800 pt-8 sm:flex-row">
          <p className="text-sm text-brand-600">
            © {year} {name}
          </p>

          <a
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full border border-brand-800 bg-brand-900/60 px-4 py-2 transition-colors hover:border-accent-500/40 hover:bg-brand-900"
            aria-label={`${ui.poweredBy} CashHub`}
          >
            <span className="text-xs font-medium tracking-wide text-brand-500 group-hover:text-brand-300">
              {ui.poweredBy}
            </span>
            <BrandLogo
              variant="dark"
              className="h-6 opacity-90 group-hover:opacity-100"
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
