"use client";

import { useLocale } from "@/providers/LocaleProvider";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi, getHeroBadge } from "@/themes/barber/ui";

type StudioHeroProps = {
  shop: ShopWebsiteData;
};

export function StudioHero({ shop }: StudioHeroProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Full-bleed atmospheric plane */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgb(248 235 232 / 0.9) 0%, transparent 42%), linear-gradient(120deg, transparent 40%, rgb(227 93 74 / 0.06) 100%)",
          }}
        />
        <div
          className="absolute -top-24 end-[-10%] h-[520px] w-[520px] rounded-full blur-3xl"
          style={{ background: "rgb(227 93 74 / 0.14)" }}
        />
      </div>

      <div className="studio-shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="studio-rise studio-eyebrow">{getHeroBadge(locale, shop.audience)}</p>

          <h1 className="studio-rise studio-rise-1 studio-title mt-5 text-5xl sm:text-6xl lg:text-7xl">
            {pickLocale(shop.hero?.title ?? shop.name, locale)}
          </h1>

          <p className="studio-rise studio-rise-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--studio-ink-soft)] sm:text-xl">
            {pickLocale(shop.hero?.subtitle ?? shop.tagline, locale)}
          </p>

          <p className="studio-rise studio-rise-3 mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--studio-muted)]">
            {pickLocale(shop.description, locale)}
          </p>

          <div className="studio-rise studio-rise-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#book" className="studio-btn studio-btn-primary min-w-[10.5rem]">
              {(shop.hero && pickLocale(shop.hero.ctaText, locale)) ||
                ui.heroCta}
            </a>
            <a href="#story" className="studio-btn studio-btn-ghost min-w-[10.5rem]">
              {ui.heroSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
