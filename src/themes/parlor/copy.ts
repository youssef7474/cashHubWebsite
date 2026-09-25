import type { Locale } from "@/lib/i18n";

/** Wording specific to the vintage parlor template (template 8). */
const COPY = {
  ar: {
    since: "منذ زمن الأصالة",
    classic: "حلاقة كلاسيكية على الأصول",
    menu: "قائمة الأسعار",
    ticket: "تذكرة الحجز",
    sign: "مفتوح للزبائن",
    tradition: "تقاليد الحلاقة الأصيلة بلمسة اليوم",
  },
  en: {
    since: "Established tradition",
    classic: "Classic grooming, done properly",
    menu: "Price list",
    ticket: "Booking ticket",
    sign: "Open for guests",
    tradition: "Old-school barbering with a modern touch",
  },
} as const;

export function getParlorCopy(locale: Locale) {
  return COPY[locale];
}
