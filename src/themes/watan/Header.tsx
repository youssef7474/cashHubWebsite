"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { isShopReservationFeatureEnabled, pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import { cn } from "@/lib/utils/cn";

type WatanHeaderProps = {
  shop: ShopWebsiteData;
};

const LINKS = [
  { href: "#pride", key: "about" as const },
  { href: "#booking", key: "book" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#visit", key: "contact" as const },
];

export function WatanHeader({ shop }: WatanHeaderProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const name = pickLocale(shop.name, locale);
  const canBook = isShopReservationFeatureEnabled(shop);

  const labels = {
    about: ui.navAbout,
    book: canBook ? ui.navBook : ui.navServices,
    faq: ui.navFaq,
    contact: ui.navContact,
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-[var(--wt-line)] bg-[var(--wt-night)]/95 backdrop-blur-md"
          : "border-b border-transparent bg-[var(--wt-night)]/70 backdrop-blur-sm",
      )}
    >
      <div className="watan-shell flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <a href="#top" className="min-w-0">
          <span className="watan-display block truncate text-2xl text-[var(--wt-white)] sm:text-[1.75rem]">
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.68rem] font-bold tracking-[0.2em] text-[var(--wt-muted)] uppercase transition-colors hover:text-[var(--wt-gold)]"
            >
              {labels[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="rounded-none border-[var(--wt-line)] bg-transparent text-[var(--wt-soft)] hover:border-[var(--wt-gold)] hover:bg-[var(--wt-gold)]/10 hover:text-[var(--wt-gold)]" />
          {canBook ? (
            <a
              href="#booking"
              className="watan-btn watan-btn-primary hidden !px-4 !py-2 sm:inline-flex"
            >
              {ui.bookNow}
            </a>
          ) : null}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="watan-mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-[var(--wt-soft)] md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={cn(
                  "h-px w-full bg-current transition-transform",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-current transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-current transition-transform",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="watan-mobile-nav"
          className="border-t border-[var(--wt-line)] bg-[var(--wt-deep)] md:hidden"
        >
          <div className="watan-shell flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[0.72rem] font-bold tracking-[0.18em] text-[var(--wt-soft)] uppercase"
              >
                {labels[link.key]}
              </a>
            ))}
            {canBook ? (
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="watan-btn watan-btn-primary mt-2 w-full"
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
