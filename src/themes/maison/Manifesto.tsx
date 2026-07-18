"use client";

import { useLocale } from "@/providers/LocaleProvider";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi, getHeroBadge } from "@/themes/barber/ui";

type MaisonManifestoProps = {
  shop: ShopWebsiteData;
};

/**
 * Full-bleed manifesto hero: brand as the dominant signal,
 * one line, one supporting sentence, one CTA group.
 */
export function MaisonManifesto({ shop }: MaisonManifestoProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24 lg:py-28"
    >
      {/* Atmospheric plane — isolated so grain never blends over copy */}
      <div
        className="maison-veil pointer-events-none absolute inset-0 z-0 isolate overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 70% 20%, rgb(196 165 116 / 0.16), transparent 55%), radial-gradient(ellipse 60% 50% at 10% 90%, rgb(243 235 224 / 0.06), transparent 50%), linear-gradient(165deg, #161310 0%, #080706 48%, #0e0c0a 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div className="maison-shell relative z-10 w-full">
        <p className="maison-in maison-eyebrow">{getHeroBadge(locale, shop.audience)}</p>

        <h1 className="maison-in maison-in-1 maison-display mt-5 max-w-[12ch] text-[clamp(3.25rem,11vw,7.5rem)] text-[#f3ebe0]">
          {pickLocale(shop.hero?.title ?? shop.name, locale)}
        </h1>

        <div className="maison-rule mt-7 h-px w-20 bg-[var(--maison-champagne)]" />

        <p className="maison-in maison-in-2 mt-7 max-w-md text-lg leading-relaxed text-[#c9bfb2] sm:text-xl">
          {pickLocale(shop.hero?.subtitle ?? shop.tagline, locale)}
        </p>

        <div className="maison-in maison-in-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#reserve" className="maison-btn maison-btn-primary">
            {(shop.hero && pickLocale(shop.hero.ctaText, locale)) ||
              ui.heroCta}
          </a>
          <a href="#atelier" className="maison-btn maison-btn-ghost">
            {ui.heroSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
