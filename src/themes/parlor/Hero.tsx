"use client";

import { useLocale } from "@/providers/LocaleProvider";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { isShopReservationFeatureEnabled, pickLocale } from "@/lib/shops/types";
import { getBarberUi, getHeroBadge } from "@/themes/barber/ui";
import { getParlorCopy } from "./copy";

type ParlorHeroProps = {
  shop: ShopWebsiteData;
};

/** Centred vintage poster: seal badge, ornament rules, serif headline. */
export function ParlorHero({ shop }: ParlorHeroProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const pl = getParlorCopy(locale);

  return (
    <section id="top" className="parlor-paper relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="parlor-shell relative">
        <div className="parlor-frame mx-auto max-w-3xl bg-[var(--pl-card)]/70 px-5 py-12 text-center sm:px-12 sm:py-16">
          {/* Seal */}
          <div className="parlor-in mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[var(--pl-red)] text-[var(--pl-red)] sm:h-28 sm:w-28">
            <span className="text-2xl leading-none" aria-hidden>
              ✂
            </span>
            <span className="mt-1 max-w-[5.5rem] text-[0.58rem] font-bold leading-tight tracking-[0.14em] uppercase">
              {pl.since}
            </span>
          </div>

          <p className="parlor-in parlor-in-1 parlor-eyebrow mt-7 justify-center">
            {getHeroBadge(locale, shop.audience)}
          </p>

          <h1 className="parlor-in parlor-in-1 parlor-display mt-4 text-[clamp(2.6rem,9vw,5.5rem)] text-[var(--pl-navy)]">
            {pickLocale(shop.hero?.title ?? shop.name, locale)}
          </h1>

          <div className="parlor-in parlor-in-2 parlor-ornament mx-auto mt-6 max-w-xs" aria-hidden>
            <span className="text-sm">✦</span>
          </div>

          <p className="parlor-in parlor-in-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--pl-soft)] sm:text-xl">
            {pickLocale(shop.hero?.subtitle ?? shop.tagline, locale)}
          </p>

          <div className="parlor-in parlor-in-3 mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            {isShopReservationFeatureEnabled(shop) ? (
              <a href="#menu" className="parlor-btn parlor-btn-primary">
                {(shop.hero && pickLocale(shop.hero.ctaText, locale)) ||
                  ui.heroCta}
              </a>
            ) : null}
            <a href="#story" className="parlor-btn parlor-btn-ghost">
              {ui.heroSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
