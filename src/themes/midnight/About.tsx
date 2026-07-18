"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { HIGHLIGHT_ICONS } from "@/themes/barber/icons";
import { getBarberUi } from "@/themes/barber/ui";

type MidnightAboutProps = {
  shop: ShopWebsiteData;
};

export function MidnightAbout({ shop }: MidnightAboutProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { about } = shop;

  return (
    <section
      id="about"
      className="border-t border-brand-800 bg-brand-900/40 py-[var(--section-py)]"
    >
      <Container>
        <Reveal>
          <div className="flex max-w-3xl flex-col items-start gap-4 text-start">
            <Badge className="border-accent-500/30 bg-accent-500/10 text-accent-400">
              {ui.aboutBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-brand-50 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {pickLocale(about.title, locale)}
            </h2>
            <p className="text-lg leading-relaxed text-brand-400">
              {pickLocale(about.body, locale)}
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {about.highlights.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[item.icon];
            return (
              <Reveal key={item.id} delay={index * 100}>
                <li className="flex h-full flex-col rounded-2xl border border-brand-800 bg-brand-950/80 p-6 transition-all duration-300 hover:border-accent-500/40 hover:bg-brand-900">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-brand-50">
                    {pickLocale(item.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-400">
                    {pickLocale(item.description, locale)}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
