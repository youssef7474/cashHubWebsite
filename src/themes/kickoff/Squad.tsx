"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import { getKickoffCopy } from "./Ticker";

type KickoffSquadProps = {
  shop: ShopWebsiteData;
};

/**
 * Squad sheet: about + highlights as jersey-number match cards.
 */
export function KickoffSquad({ shop }: KickoffSquadProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const ko = getKickoffCopy(locale);
  const { about } = shop;

  return (
    <section
      id="squad"
      className="border-y border-[var(--ko-line)] bg-[var(--ko-deep)] py-20 lg:py-28"
    >
      <div className="kickoff-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="kickoff-eyebrow">{ui.aboutBadge}</p>
            <h2 className="kickoff-display mt-4 text-5xl text-[var(--ko-white)] sm:text-6xl">
              {pickLocale(about.title, locale)}
            </h2>
            <p className="mt-6 text-base leading-[1.85] text-[var(--ko-soft)] sm:text-lg">
              {pickLocale(about.body, locale)}
            </p>
            <p className="mt-6 inline-flex border border-[var(--ko-pitch)]/40 bg-[var(--ko-pitch)]/10 px-3 py-2 text-[0.65rem] font-bold tracking-[0.18em] text-[var(--ko-pitch)] uppercase">
              {ko.matchDay}
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-3">
            {about.highlights.map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <li className="group flex gap-4 border border-[var(--ko-line)] bg-[var(--ko-panel)]/80 p-4 transition-colors hover:border-[var(--ko-gold)]/50 sm:flex-col lg:flex-row lg:items-center lg:p-5">
                  <span className="kickoff-display flex h-14 w-14 shrink-0 items-center justify-center bg-[var(--ko-gold)] text-2xl text-[var(--ko-night)] sm:h-16 sm:w-16 sm:text-3xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[var(--ko-white)] sm:text-lg">
                      {pickLocale(item.title, locale)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--ko-muted)]">
                      {pickLocale(item.description, locale)}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
