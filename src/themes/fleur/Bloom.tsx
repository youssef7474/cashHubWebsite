"use client";

import { useLocale } from "@/providers/LocaleProvider";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi, getHeroBadge } from "@/themes/barber/ui";

type FleurBloomProps = {
  shop: ShopWebsiteData;
};

/**
 * Airy porcelain hero: centered serif brand, soft blush petals of light,
 * a thin rose-gold rule, one supporting line and CTA pair.
 */
export function FleurBloom({ shop }: FleurBloomProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center lg:py-28"
    >
      <div
        className="fleur-veil pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% 0%, rgb(183 110 121 / 0.14), transparent 60%), radial-gradient(ellipse 55% 45% at 12% 85%, rgb(201 163 95 / 0.12), transparent 55%), radial-gradient(ellipse 60% 50% at 88% 75%, rgb(183 110 121 / 0.1), transparent 55%), linear-gradient(180deg, #fdf9f7 0%, #f8ede9 100%)",
          }}
        />
        {/* Fine ring ornament behind the brand */}
        <div
          className="absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--fleur-line)] sm:h-[44rem] sm:w-[44rem]"
        />
        <div
          className="absolute top-1/2 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(201_163_95_/_0.18)] sm:h-[34rem] sm:w-[34rem]"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <p className="fleur-in fleur-eyebrow">
          {getHeroBadge(locale, shop.audience)}
        </p>

        <h1 className="fleur-in fleur-in-1 fleur-display mt-6 text-[clamp(3rem,10vw,6.5rem)] text-[var(--fleur-plum)]">
          {pickLocale(shop.hero?.title ?? shop.name, locale)}
        </h1>

        <div
          className="fleur-in fleur-in-2 mt-7 flex items-center gap-3"
          aria-hidden
        >
          <span className="h-px w-12 bg-[var(--fleur-rose)]/50" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[var(--fleur-gold)]" />
          <span className="h-px w-12 bg-[var(--fleur-rose)]/50" />
        </div>

        <p className="fleur-in fleur-in-2 fleur-italic mt-7 max-w-md text-xl leading-relaxed text-[var(--fleur-soft)] sm:text-2xl">
          {pickLocale(shop.hero?.subtitle ?? shop.tagline, locale)}
        </p>

        <div className="fleur-in fleur-in-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#booking" className="fleur-btn fleur-btn-primary">
            {(shop.hero && pickLocale(shop.hero.ctaText, locale)) ||
              ui.heroCta}
          </a>
          <a href="#rituals" className="fleur-btn fleur-btn-ghost">
            {ui.heroSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
