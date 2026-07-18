"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";

type MaisonAtelierProps = {
  shop: ShopWebsiteData;
};

/**
 * Editorial atelier: split manifesto copy + numbered craft list (no cards).
 */
export function MaisonAtelier({ shop }: MaisonAtelierProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { about } = shop;

  return (
    <section
      id="atelier"
      className="relative border-y border-[var(--maison-line)] bg-[var(--maison-ink)] py-20 lg:py-28"
    >
      <div className="maison-shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="maison-eyebrow">{ui.aboutBadge}</p>
            <h2 className="maison-display mt-5 text-4xl text-[var(--maison-ivory)] sm:text-5xl lg:text-[3.5rem]">
              {pickLocale(about.title, locale)}
            </h2>
            <p className="mt-7 text-base leading-[1.85] text-[var(--maison-soft)] sm:text-lg">
              {pickLocale(about.body, locale)}
            </p>
            <a href="#reserve" className="maison-btn maison-btn-ghost mt-10">
              {ui.bookNow}
            </a>
          </Reveal>

          <div className="lg:col-span-7 lg:border-s lg:border-[var(--maison-line)] lg:ps-14">
            <ol className="divide-y divide-[var(--maison-line)]">
              {about.highlights.map((item, index) => (
                <Reveal key={item.id} delay={index * 90}>
                  <li className="grid grid-cols-[auto_1fr] gap-5 py-7 first:pt-0 last:pb-0 sm:gap-8 sm:py-8">
                    <span className="maison-display text-3xl text-[var(--maison-champagne)] sm:text-4xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-wide text-[var(--maison-ivory)] sm:text-lg">
                        {pickLocale(item.title, locale)}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--maison-muted)] sm:text-[0.95rem]">
                        {pickLocale(item.description, locale)}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
