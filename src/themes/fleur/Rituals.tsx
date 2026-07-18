"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";

type FleurRitualsProps = {
  shop: ShopWebsiteData;
};

/**
 * About section: centered story copy above a trio of soft highlight cards.
 */
export function FleurRituals({ shop }: FleurRitualsProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { about } = shop;

  return (
    <section
      id="rituals"
      className="relative border-y border-[var(--fleur-line)] bg-[var(--fleur-blush)] py-20 lg:py-28"
    >
      <div className="fleur-shell">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="fleur-eyebrow">{ui.aboutBadge}</p>
          <h2 className="fleur-display mt-5 text-4xl text-[var(--fleur-plum)] sm:text-5xl lg:text-[3.5rem]">
            {pickLocale(about.title, locale)}
          </h2>
          <p className="mt-7 text-base leading-[1.85] text-[var(--fleur-soft)] sm:text-lg">
            {pickLocale(about.body, locale)}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {about.highlights.map((item, index) => (
            <Reveal key={item.id} delay={index * 90}>
              <article className="fleur-card h-full p-7 sm:p-8">
                <span
                  className="fleur-display block text-3xl text-[var(--fleur-gold)] sm:text-4xl"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-wide text-[var(--fleur-plum)] sm:text-lg">
                  {pickLocale(item.title, locale)}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--fleur-muted)] sm:text-[0.95rem]">
                  {pickLocale(item.description, locale)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <a href="#booking" className="fleur-btn fleur-btn-ghost">
            {ui.bookNow}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
