"use client";

import { useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { isShopReservationFeatureEnabled, pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import { cn } from "@/lib/utils/cn";

type ParlorHeaderProps = {
  shop: ShopWebsiteData;
};

const LINKS = [
  { href: "#story", key: "about" as const },
  { href: "#menu", key: "book" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#visit", key: "contact" as const },
];

/** Barber-pole stripe on top, name centred between split navigation. */
export function ParlorHeader({ shop }: ParlorHeaderProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const [open, setOpen] = useState(false);
  const name = pickLocale(shop.name, locale);
  const canBook = isShopReservationFeatureEnabled(shop);

  const labels = {
    about: ui.navAbout,
    book: canBook ? ui.navBook : ui.navServices,
    faq: ui.navFaq,
    contact: ui.navContact,
  };

  const linkClass =
    "text-[0.72rem] font-bold tracking-[0.18em] text-[var(--pl-soft)] uppercase transition-colors hover:text-[var(--pl-red)]";

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--pl-navy)] bg-[var(--pl-paper)]/95 backdrop-blur-sm">
      <div className="parlor-pole" aria-hidden />
      <div className="parlor-shell grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 lg:h-[4.5rem]">
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {LINKS.slice(0, 2).map((link) => (
            <a key={link.href} href={link.href} className={linkClass}>
              {labels[link.key]}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="parlor-mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-[var(--pl-navy)] md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span className={cn("h-0.5 w-full bg-current transition-transform", open && "translate-y-[4px] rotate-45")} />
            <span className={cn("h-0.5 w-full bg-current transition-opacity", open && "opacity-0")} />
            <span className={cn("h-0.5 w-full bg-current transition-transform", open && "-translate-y-[4px] -rotate-45")} />
          </span>
        </button>

        <a href="#top" className="min-w-0 text-center">
          <span className="parlor-display block truncate text-xl text-[var(--pl-navy)] sm:text-2xl">
            {name}
          </span>
        </a>

        <div className="flex items-center justify-end gap-6">
          <nav className="hidden items-center gap-7 md:flex" aria-label="Secondary">
            {LINKS.slice(2).map((link) => (
              <a key={link.href} href={link.href} className={linkClass}>
                {labels[link.key]}
              </a>
            ))}
          </nav>
          <LanguageSwitcher className="rounded-none border-[var(--pl-navy)] bg-transparent text-[var(--pl-navy)] hover:bg-[var(--pl-navy)] hover:text-[var(--pl-paper)]" />
        </div>
      </div>

      {open ? (
        <nav
          id="parlor-mobile-nav"
          className="border-t-2 border-[var(--pl-navy)] bg-[var(--pl-paper-deep)] md:hidden"
        >
          <div className="parlor-shell flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[0.78rem] font-bold tracking-[0.16em] text-[var(--pl-navy)] uppercase"
              >
                {labels[link.key]}
              </a>
            ))}
            {canBook ? (
              <a
                href="#menu"
                onClick={() => setOpen(false)}
                className="parlor-btn parlor-btn-primary mt-2 w-full"
              >
                {ui.bookNow}
              </a>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
