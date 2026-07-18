"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import { cn } from "@/lib/utils/cn";

type MaisonHeaderProps = {
  shop: ShopWebsiteData;
};

const LINKS = [
  { href: "#atelier", key: "about" as const },
  { href: "#reserve", key: "book" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#arrive", key: "contact" as const },
];

export function MaisonHeader({ shop }: MaisonHeaderProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const name = pickLocale(shop.name, locale);

  const labels = {
    about: ui.navAbout,
    book: ui.navBook,
    faq: ui.navFaq,
    contact: ui.navContact,
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-[var(--maison-line)] bg-[var(--maison-void)]/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="maison-shell flex h-16 items-center justify-between lg:h-[4.25rem]">
        <a
          href="#top"
          className="maison-display text-xl text-[var(--maison-ivory)] transition-colors hover:text-[var(--maison-champagne)] sm:text-2xl"
        >
          {name}
        </a>

        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Primary"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.68rem] font-semibold tracking-[0.22em] text-[var(--maison-muted)] uppercase transition-colors hover:text-[var(--maison-champagne)]"
            >
              {labels[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="rounded-none border-[var(--maison-line)] bg-transparent text-[var(--maison-soft)] hover:border-[var(--maison-champagne)] hover:bg-[var(--maison-champagne)]/10 hover:text-[var(--maison-champagne)]" />
          <a
            href="#reserve"
            className="maison-btn maison-btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
          >
            {ui.bookNow}
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="maison-mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-[var(--maison-soft)] md:hidden"
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
          id="maison-mobile-nav"
          className="border-t border-[var(--maison-line)] bg-[var(--maison-void)]/98 md:hidden"
        >
          <div className="maison-shell flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[0.72rem] font-semibold tracking-[0.2em] text-[var(--maison-soft)] uppercase"
              >
                {labels[link.key]}
              </a>
            ))}
            <a
              href="#reserve"
              onClick={() => setOpen(false)}
              className="maison-btn maison-btn-primary mt-2 w-full sm:hidden"
            >
              {ui.bookNow}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
