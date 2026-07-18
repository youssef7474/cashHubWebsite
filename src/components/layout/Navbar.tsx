"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
  { key: "features" as const, href: "#features" },
  { key: "demo" as const, href: "#demo" },
  { key: "pricing" as const, href: "#pricing" },
  { key: "faq" as const, href: "#faq" },
];

export function Navbar() {
  const t = useTranslation();
  const { locale } = useLocale();
  const whatsappUrl = getWhatsAppUrl(locale);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <Container as="nav" className="flex h-16 items-center justify-between lg:h-[4.5rem]">
        <a href="#" className="flex shrink-0 items-center" aria-label="CashHub">
          <BrandLogo priority className="h-9 sm:h-10" />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-900"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm">
            {t.nav.login}
          </Button>
          <Button variant="secondary" size="sm" href={whatsappUrl}>
            {t.nav.startFree}
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
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-brand-200 bg-white px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-brand-700"
              >
                {t.nav[link.key]}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-brand-100 pt-4">
              <Button variant="ghost" size="sm">
                {t.nav.login}
              </Button>
              <Button variant="secondary" size="sm" href={whatsappUrl}>
                {t.nav.startFree}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
