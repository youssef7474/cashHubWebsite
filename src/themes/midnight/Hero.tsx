"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi, getHeroBadge } from "@/themes/barber/ui";

type MidnightHeroProps = {
  shop: ShopWebsiteData;
};

export function MidnightHero({ shop }: MidnightHeroProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 start-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-500/15 to-transparent blur-3xl" />
        <div className="absolute top-32 end-0 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(41_37_36_/_0.5),transparent_55%)]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up">
            <Badge className="border-accent-500/30 bg-accent-500/10 text-accent-400">
              {getHeroBadge(locale, shop.audience)}
            </Badge>
          </div>

          <h1 className="animate-fade-up animation-delay-100 mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-50 sm:text-5xl lg:text-6xl">
            {pickLocale(shop.hero?.title ?? shop.name, locale)}
          </h1>

          <p className="animate-fade-up animation-delay-200 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-400 sm:text-xl">
            {pickLocale(shop.hero?.subtitle ?? shop.tagline, locale)}
          </p>

          <p className="animate-fade-up animation-delay-300 mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-500">
            {pickLocale(shop.description, locale)}
          </p>

          <div className="animate-fade-up animation-delay-400 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="secondary" size="lg" href="#reservation">
              {(shop.hero && pickLocale(shop.hero.ctaText, locale)) ||
                ui.heroCta}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#about"
              className="border-brand-700 bg-transparent text-brand-200 hover:border-accent-500/50 hover:bg-brand-900 hover:text-accent-400"
            >
              {ui.heroSecondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
