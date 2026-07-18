"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { HIGHLIGHT_ICONS } from "./icons";
import { getBarberUi } from "./ui";

type BarberAboutProps = {
  shop: ShopWebsiteData;
};

export function BarberAbout({ shop }: BarberAboutProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { about } = shop;

  return (
    <section id="about" className="border-t border-border-subtle bg-white py-[var(--section-py)]">
      <Container>
        <Reveal>
          <SectionHeader
            badge={ui.aboutBadge}
            title={pickLocale(about.title, locale)}
            subtitle={pickLocale(about.body, locale)}
            align="start"
            className="max-w-3xl"
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {about.highlights.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[item.icon];
            return (
              <Reveal key={item.id} delay={index * 100}>
                <li className="flex h-full flex-col rounded-2xl border border-brand-200 bg-brand-50/50 p-6 transition-all duration-300 hover:border-accent-300 hover:bg-white hover:shadow-md">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-brand-900">
                    {pickLocale(item.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
