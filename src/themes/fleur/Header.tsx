"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import { cn } from "@/lib/utils/cn";

type FleurHeaderProps = {
  shop: ShopWebsiteData;
};

const LINKS = [
  { href: "#rituals", key: "about" as const },
  { href: "#booking", key: "book" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#visit", key: "contact" as const },
];

export function FleurHeader({ shop }: FleurHeaderProps) {
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-[var(--fleur-line)] bg-[var(--fleur-cream)]/92 shadow-[0_10px_30px_-24px_rgb(67_41_60_/_0.4)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="fleur-shell flex h-16 items-center justify-between lg:h-[4.25rem]">
        <a
          href="#top"
          className="fleur-display text-xl text-[var(--fleur-plum)] transition-colors hover:text-[var(--fleur-rose-deep)] sm:text-2xl"
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
              className="text-[0.68rem] font-semibold tracking-[0.22em] text-[var(--fleur-soft)] uppercase transition-colors hover:text-[var(--fleur-rose-deep)]"
            >
              {labels[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="border-[var(--fleur-line)] bg-transparent text-[var(--fleur-soft)] hover:border-[var(--fleur-rose)] hover:bg-[var(--fleur-rose)]/10 hover:text-[var(--fleur-rose-deep)]" />
          <a
            href="#booking"
            className="fleur-btn fleur-btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
          >
            {ui.bookNow}
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="fleur-mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-[var(--fleur-plum)] md:hidden"
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
          id="fleur-mobile-nav"
          className="border-t border-[var(--fleur-line)] bg-[var(--fleur-cream)]/98 md:hidden"
        >
          <div className="fleur-shell flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[0.72rem] font-semibold tracking-[0.2em] text-[var(--fleur-soft)] uppercase"
              >
                {labels[link.key]}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="fleur-btn fleur-btn-primary mt-2 w-full sm:hidden"
            >
              {ui.bookNow}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
