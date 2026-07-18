"use client";

import { useLocale } from "@/providers/LocaleProvider";

const COPY = {
  ar: {
    wc: "كأس العالم 2026",
    matchDay: "يوم المباراة — احجز قبل الطابور",
    cut: "قصة بطولية قبل كل ماتش",
  },
  en: {
    wc: "World Cup 2026",
    matchDay: "Match-day ready — book before kickoff",
    cut: "Championship cuts before every match",
  },
} as const;

export function KickoffTicker() {
  const { locale } = useLocale();
  const t = COPY[locale];
  const items = [t.wc, t.matchDay, t.cut, t.wc, t.matchDay, t.cut];

  return (
    <div
      className="relative z-[60] overflow-hidden border-b border-[var(--ko-line)] bg-[var(--ko-gold)] text-[var(--ko-night)]"
      aria-hidden
    >
      <div className="kickoff-ticker-track py-2">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8 px-4">
            {items.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex shrink-0 items-center gap-8 text-[0.68rem] font-extrabold tracking-[0.2em] uppercase"
              >
                <span>{item}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-[var(--ko-night)]/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function getKickoffCopy(locale: "ar" | "en") {
  return COPY[locale];
}
