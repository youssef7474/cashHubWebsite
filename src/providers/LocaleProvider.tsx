"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  defaultLocale,
  getDictionary,
  getDirection,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

const STORAGE_KEY = "cashhub-locale";
const LOCALE_CHANGE_EVENT = "cashhub-locale-change";

type LocaleContextValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Dictionary;
  canSwitchLocale: boolean;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function subscribeToLocale(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
  };
}

function getStoredLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "ar" || stored === "en" ? stored : defaultLocale;
}

type LocaleProviderProps = {
  children: React.ReactNode;
  forcedLocale?: Locale;
};

export function LocaleProvider({
  children,
  forcedLocale,
}: LocaleProviderProps) {
  const storedLocale = useSyncExternalStore(
    subscribeToLocale,
    getStoredLocale,
    () => defaultLocale,
  );
  const locale = forcedLocale ?? storedLocale;
  const canSwitchLocale = forcedLocale === undefined;

  const setLocale = useCallback(
    (next: Locale) => {
      if (forcedLocale) return;
      localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
    },
    [forcedLocale],
  );

  const dir = getDirection(locale);
  const t = useMemo(() => getDictionary(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const value = useMemo(
    () => ({ locale, dir, t, canSwitchLocale, setLocale }),
    [locale, dir, t, canSwitchLocale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}

export function useTranslation() {
  return useLocale().t;
}
