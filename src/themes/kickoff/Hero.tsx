"use client";

import { useLocale } from "@/providers/LocaleProvider";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi, getHeroBadge } from "@/themes/barber/ui";

type KickoffHeroProps = {
  shop: ShopWebsiteData;
};

export function KickoffHero({ shop }: KickoffHeroProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);

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
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgb(240 193 75 / 0.18), transparent 55%), radial-gradient(ellipse 90% 70% at 80% 100%, rgb(29 185 84 / 0.16), transparent 50%), linear-gradient(180deg, #0c1a2e 0%, #07111f 55%, #051018 100%)",
          }}
        />
        <div className="kickoff-pitch-bg absolute inset-0 opacity-40" />
        <div className="kickoff-flood absolute -top-24 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-[var(--ko-gold)]/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-1/2 h-[55vw] max-h-[420px] w-[55vw] max-w-[420px] -translate-x-1/2 rounded-full border border-white/10" />
      </div>

      <div className="kickoff-shell relative z-10">
        <p className="kickoff-in kickoff-eyebrow">
          {getHeroBadge(locale, shop.audience)}
        </p>

        <h1 className="kickoff-in kickoff-in-1 kickoff-display mt-6 max-w-[16ch] text-[clamp(3.5rem,14vw,8rem)] text-[var(--ko-white)]">
          {pickLocale(shop.hero?.title ?? shop.name, locale)}
        </h1>

        <p className="kickoff-in kickoff-in-2 mt-5 max-w-xl text-lg font-medium leading-relaxed text-[var(--ko-soft)] sm:text-xl">
          {pickLocale(shop.hero?.subtitle ?? shop.tagline, locale)}
        </p>

        <div className="kickoff-in kickoff-in-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#lineup" className="kickoff-btn kickoff-btn-pitch">
            {(shop.hero && pickLocale(shop.hero.ctaText, locale)) ||
              ui.heroCta}
          </a>
          <a href="#squad" className="kickoff-btn kickoff-btn-ghost">
            {ui.heroSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
