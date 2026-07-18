"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "./ui";

type BarberHeaderProps = {
  shop: ShopWebsiteData;
};

export function BarberHeader({ shop }: BarberHeaderProps) {
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
        scrolled ? "glass shadow-sm" : "bg-transparent",
      )}
    >
      <Container
        as="nav"
        className="flex h-16 items-center justify-between lg:h-[4.5rem]"
      >
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-brand-900 sm:text-xl"
        >
          {name}
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-900"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button variant="secondary" size="sm" href="#reservation">
            {ui.bookNow}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-700"
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
        <div className="border-t border-brand-100 bg-white/95 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
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
