"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import { getParlorCopy } from "./copy";

type ParlorStoryProps = {
  shop: ShopWebsiteData;
};

/** About + highlights as numbered vintage cards with an offset shadow. */
export function ParlorStory({ shop }: ParlorStoryProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const pl = getParlorCopy(locale);
  const { about } = shop;

  return (
    <section id="story" className="border-y-2 border-[var(--pl-navy)] bg-[var(--pl-paper-deep)] py-20 lg:py-28">
      <div className="parlor-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="parlor-eyebrow justify-center">{ui.aboutBadge}</p>
          <h2 className="parlor-display mt-4 text-4xl text-[var(--pl-navy)] sm:text-5xl">
            {pickLocale(about.title, locale)}
          </h2>
          <div className="parlor-ornament mx-auto mt-5 max-w-[10rem]" aria-hidden>
            <span className="text-xs">✦</span>
          </div>
          <p className="mt-6 text-base leading-[1.9] text-[var(--pl-soft)] sm:text-lg">
            {pickLocale(about.body, locale)}
          </p>
          <p className="mt-5 text-sm font-semibold italic text-[var(--pl-brass)]">
            {pl.tradition}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.highlights.map((item, index) => (
            <Reveal key={item.id} delay={index * 80} className="h-full">
              <li className="flex h-full flex-col border-2 border-[var(--pl-navy)] bg-[var(--pl-card)] p-6 shadow-[6px_6px_0_var(--pl-navy)]">
                <span className="parlor-display text-4xl text-[var(--pl-red)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-[var(--pl-navy)]">
                  {pickLocale(item.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--pl-soft)]">
                  {pickLocale(item.description, locale)}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
