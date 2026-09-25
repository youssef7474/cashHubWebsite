"use client";

import Image from "next/image";
import { useLocale } from "@/providers/LocaleProvider";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { isShopReservationFeatureEnabled, pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import { getWatanCopy } from "./Ticker";

type WatanHeroProps = {
  shop: ShopWebsiteData;
};

export function WatanHero({ shop }: WatanHeroProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const wt = getWatanCopy(locale);

  return (
    <section
      id="top"
      className="relative flex min-h-[min(92svh,820px)] flex-col justify-end overflow-hidden pb-14 pt-10 lg:justify-center lg:pb-20 lg:pt-16"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgb(212 175 55 / 0.16), transparent 55%), radial-gradient(ellipse 90% 70% at 85% 100%, rgb(31 174 91 / 0.28), transparent 55%), linear-gradient(180deg, #004225 0%, #00331a 60%, #002914 100%)",
          }}
        />
        <div className="watan-pattern absolute inset-0 opacity-60" />
        <div className="watan-glow absolute -top-24 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-[var(--wt-gold)]/15 blur-3xl" />
        {/* National Day date, outlined: fills the empty top on phones/tablets,
            sits opposite the headline on desktop */}
        <div className="absolute inset-x-0 top-[5%] flex flex-col items-center sm:top-[8%] lg:inset-x-auto lg:inset-y-0 lg:top-0 lg:end-[6%] lg:justify-center">
          <span className="watan-date text-[6.5rem] leading-none sm:text-[11rem] lg:text-[15rem]">23</span>
          <span className="mt-1 text-lg font-extrabold tracking-[0.3em] text-[var(--wt-gold)]/70 sm:mt-2 sm:text-2xl">
            {wt.date}
          </span>
        </div>
        {/* Green & white flag-colour stripes along the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 flex h-2">
          <span className="flex-1 bg-[var(--wt-green)]" />
          <span className="flex-1 bg-white" />
          <span className="flex-1 bg-[var(--wt-green)]" />
        </div>
      </div>

      <div className="watan-shell relative z-10">
        <p className="watan-in inline-flex items-center gap-2.5 rounded-full border border-[var(--wt-gold)]/50 bg-[var(--wt-gold)]/10 px-4 py-1.5 text-sm font-bold text-[var(--wt-gold-soft)]">
          {/* Saudi flag (flag-icons, MIT) — an image, so RTL never mirrors it */}
          <Image
            src="/flags/sa.svg"
            alt={wt.flagAlt}
            width={24}
            height={18}
            unoptimized
            className="h-[18px] w-6 shrink-0 rounded-[2px] shadow-sm"
          />
          {wt.hero}
        </p>

        <h1 className="watan-in watan-in-1 watan-display mt-6 max-w-[16ch] text-[clamp(3.5rem,14vw,8rem)] text-[var(--wt-white)]">
          {pickLocale(shop.hero?.title ?? shop.name, locale)}
        </h1>

        <p className="watan-in watan-in-2 mt-5 max-w-xl text-lg font-medium leading-relaxed text-[var(--wt-soft)] sm:text-xl">
          {pickLocale(shop.hero?.subtitle ?? shop.tagline, locale)}
        </p>

        <div className="watan-in watan-in-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          {isShopReservationFeatureEnabled(shop) ? (
            <a href="#booking" className="watan-btn watan-btn-primary">
              {(shop.hero && pickLocale(shop.hero.ctaText, locale)) ||
                ui.heroCta}
            </a>
          ) : null}
          <a href="#pride" className="watan-btn watan-btn-ghost">
            {ui.heroSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
