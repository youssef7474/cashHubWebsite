import { ar } from "./locales/ar";
import { en } from "./locales/en";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale };

export const locales: Locale[] = ["ar", "en"];
export const defaultLocale: Locale = "ar";

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isRTL(locale: Locale): boolean {
  return locale === "ar";
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return isRTL(locale) ? "rtl" : "ltr";
}
