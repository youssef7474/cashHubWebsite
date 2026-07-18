"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi, getHeroBadge } from "./ui";

type BarberHeroProps = {
  shop: ShopWebsiteData;
};

export function BarberHero({ shop }: BarberHeroProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 start-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-100/60 to-transparent blur-3xl" />
        <div className="absolute top-20 end-0 h-72 w-72 rounded-full bg-rose-100/40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up">
            <Badge>{getHeroBadge(locale, shop.audience)}</Badge>
          </div>

          <h1 className="animate-fade-up animation-delay-100 mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-900 sm:text-5xl lg:text-6xl">
            {pickLocale(shop.hero?.title ?? shop.name, locale)}
          </h1>

          <p className="animate-fade-up animation-delay-200 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {pickLocale(shop.hero?.subtitle ?? shop.tagline, locale)}
          </p>

          <p className="animate-fade-up animation-delay-300 mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-600">
            {pickLocale(shop.description, locale)}
          </p>

          <div className="animate-fade-up animation-delay-400 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="secondary" size="lg" href="#reservation">
              {(shop.hero && pickLocale(shop.hero.ctaText, locale)) ||
                ui.heroCta}
            </Button>
            <Button variant="outline" size="lg" href="#about">
              {ui.heroSecondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
