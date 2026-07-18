"use client";

import { cn } from "@/lib/utils/cn";
import { useLocale } from "@/providers/LocaleProvider";
import type { Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  ar: "EN",
  en: "عربي",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, canSwitchLocale, setLocale } = useLocale();

  if (!canSwitchLocale) return null;

  const toggle = () => setLocale(locale === "ar" ? "en" : "ar");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-brand-200 bg-white px-3 text-xs font-bold tracking-wide text-brand-700 transition-colors hover:border-accent-400 hover:bg-accent-100 hover:text-accent-600",
        className
      )}
    >
      {labels[locale]}
    </button>
  );
}
