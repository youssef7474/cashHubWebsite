"use client";

import { useLocale } from "@/providers/LocaleProvider";

const COPY = {
  ar: {
    day: "اليوم الوطني السعودي",
    book: "احجز موعدك قبل زحمة المناسبة",
    pride: "إطلالة تليق بفرحة الوطن",
    hero: "نسخة اليوم الوطني",
    date: "سبتمبر",
  },
  en: {
    day: "Saudi National Day",
    book: "Book early — the holiday rush is coming",
    pride: "A look worthy of the nation's celebration",
    hero: "National Day edition",
    date: "SEPTEMBER",
  },
} as const;

export function WatanTicker() {
  const { locale } = useLocale();
  const t = COPY[locale];
  const items = [t.day, t.pride, t.book, t.day, t.pride, t.book];

  return (
    <div
      className="relative z-[60] overflow-hidden border-b border-[var(--wt-line)] bg-[var(--wt-green)] text-white"
      aria-hidden
    >
      {/* LTR track so the loop scrolls the same way in Arabic and English */}
      <div className="watan-ticker-track py-2" dir="ltr">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8 px-4">
            {items.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex shrink-0 items-center gap-8 text-[0.7rem] font-extrabold tracking-[0.18em] uppercase"
              >
                <span>{item}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-[var(--wt-gold)]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function getWatanCopy(locale: "ar" | "en") {
  return COPY[locale];
}
