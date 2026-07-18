"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import { cn } from "@/lib/utils/cn";

type StudioNavProps = {
  shop: ShopWebsiteData;
};

export function StudioNav({ shop }: StudioNavProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const name = pickLocale(shop.name, locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#story", label: ui.navAbout },
    { href: "#book", label: ui.navBook },
    { href: "#faq", label: ui.navFaq },
    { href: "#find", label: ui.navContact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--studio-line)] bg-[var(--studio-surface)]/90 shadow-sm backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <div className="studio-shell flex h-16 items-center justify-between lg:h-[4.25rem]">
        <a href="#top" className="text-base font-extrabold tracking-tight lg:text-lg">
          {name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="rounded-full border-[var(--studio-line)] bg-white" />
          <a href="#book" className="studio-btn studio-btn-primary hidden !py-2 !px-4 sm:inline-flex">
            {ui.bookNow}
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--studio-line)] bg-white md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--studio-line)] bg-[var(--studio-surface)] md:hidden">
          <div className="studio-shell flex flex-col gap-1 py-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--studio-ink-soft)] hover:bg-[var(--studio-bg-soft)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="studio-btn studio-btn-primary mt-2"
            >
              {ui.bookNow}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
