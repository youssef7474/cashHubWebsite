"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";

type MidnightHeaderProps = {
  shop: ShopWebsiteData;
};

export function MidnightHeader({ shop }: MidnightHeaderProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const name = pickLocale(shop.name, locale);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { href: "#about", label: ui.navAbout },
    { href: "#reservation", label: ui.navBook },
    { href: "#faq", label: ui.navFaq },
    { href: "#contact", label: ui.navContact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-brand-800/80 bg-brand-950/90 shadow-lg backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container
        as="nav"
        className="flex h-16 items-center justify-between lg:h-[4.5rem]"
      >
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-brand-50 sm:text-xl"
        >
          {name}
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-400 transition-colors hover:text-accent-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher className="border-brand-700 bg-brand-900 text-brand-200 hover:border-accent-400 hover:bg-brand-800 hover:text-accent-400" />
          <Button variant="secondary" size="sm" href="#reservation">
            {ui.bookNow}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher className="border-brand-700 bg-brand-900 text-brand-200 hover:border-accent-400 hover:bg-brand-800 hover:text-accent-400" />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div className="border-t border-brand-800 bg-brand-950/95 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-300 hover:bg-brand-900 hover:text-accent-400"
              >
                {item.label}
              </a>
            ))}
            <div onClick={() => setMobileOpen(false)}>
              <Button
                variant="secondary"
                size="sm"
                href="#reservation"
                className="mt-2 w-full"
              >
                {ui.bookNow}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
