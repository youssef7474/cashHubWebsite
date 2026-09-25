"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import { getWatanCopy } from "./Ticker";

type WatanPrideProps = {
  shop: ShopWebsiteData;
};

/**
 * Pride section: about + highlights as numbered green cards.
 */
export function WatanPride({ shop }: WatanPrideProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const wt = getWatanCopy(locale);
  const { about } = shop;

  return (
    <section
      id="pride"
      className="border-y border-[var(--wt-line)] bg-[var(--wt-deep)] py-20 lg:py-28"
    >
      <div className="watan-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="watan-eyebrow">{ui.aboutBadge}</p>
            <h2 className="watan-display mt-4 text-5xl text-[var(--wt-white)] sm:text-6xl">
              {pickLocale(about.title, locale)}
            </h2>
            <p className="mt-6 text-base leading-[1.85] text-[var(--wt-soft)] sm:text-lg">
              {pickLocale(about.body, locale)}
            </p>
            <p className="mt-6 inline-flex border border-[var(--wt-green)]/40 bg-[var(--wt-green)]/10 px-3 py-2 text-[0.65rem] font-bold tracking-[0.18em] text-[var(--wt-green)] uppercase">
              {wt.book}
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-3">
            {about.highlights.map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <li className="group flex gap-4 border border-[var(--wt-line)] bg-[var(--wt-panel)]/80 p-4 transition-colors hover:border-[var(--wt-gold)]/50 sm:flex-col lg:flex-row lg:items-center lg:p-5">
                  <span className="watan-display flex h-14 w-14 shrink-0 items-center justify-center bg-[var(--wt-gold)] text-2xl text-[var(--wt-night)] sm:h-16 sm:w-16 sm:text-3xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[var(--wt-white)] sm:text-lg">
                      {pickLocale(item.title, locale)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--wt-muted)]">
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
