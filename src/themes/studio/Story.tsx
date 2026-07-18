"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { HIGHLIGHT_ICONS } from "@/themes/barber/icons";
import { getBarberUi } from "@/themes/barber/ui";

type StudioStoryProps = {
  shop: ShopWebsiteData;
};

export function StudioStory({ shop }: StudioStoryProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { about } = shop;

  return (
    <section id="story" className="border-y border-[var(--studio-line)] bg-[var(--studio-surface)] py-20 lg:py-28">
      <div className="studio-shell">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="studio-title text-3xl sm:text-4xl lg:text-5xl">
              {pickLocale(about.title, locale)}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[var(--studio-ink-soft)] sm:text-lg">
              {pickLocale(about.body, locale)}
            </p>
            <a
              href="#book"
              className="studio-btn studio-btn-primary mt-8"
            >
              {ui.bookNow}
            </a>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {about.highlights.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[item.icon];
            return (
              <Reveal key={item.id} delay={index * 90}>
                <li className="group flex h-full flex-col rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-bg)]/70 p-6 transition-all duration-300 hover:border-[var(--studio-accent)]/35 hover:bg-white hover:shadow-[0_16px_40px_rgb(20_22_26_/_0.06)] sm:p-7">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--studio-blush)] text-[var(--studio-accent)] transition-colors group-hover:bg-[var(--studio-accent)] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-base font-bold leading-snug text-[var(--studio-ink)]">
                    {pickLocale(item.title, locale)}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--studio-muted)]">
                    {pickLocale(item.description, locale)}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
