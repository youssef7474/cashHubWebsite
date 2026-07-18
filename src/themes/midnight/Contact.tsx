"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { MapPinIcon, PhoneIcon, ClockIcon } from "@/themes/barber/icons";
import { getBarberUi } from "@/themes/barber/ui";

type MidnightContactProps = {
  shop: ShopWebsiteData;
};

export function MidnightContact({ shop }: MidnightContactProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { contact, hours } = shop;

  return (
    <section
      id="contact"
      className="border-t border-brand-800 bg-brand-900/40 py-[var(--section-py)]"
    >
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge className="border-accent-500/30 bg-accent-500/10 text-accent-400">
              {ui.contactBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-brand-50 sm:text-4xl">
              {ui.contactTitle}
            </h2>
            <p className="text-lg leading-relaxed text-brand-400">
              {ui.contactSubtitle}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal delay={80}>
            <div className="h-full rounded-2xl border border-brand-800 bg-brand-950/80 p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-brand-50">{ui.addressTitle}</h3>
              </div>
              <p className="text-base leading-relaxed text-brand-400">
                {pickLocale(contact.address, locale)}
              </p>
              {contact.mapUrl ? (
                <Button
                  variant="outline"
                  size="sm"
                  href={contact.mapUrl}
                  className="mt-6 border-brand-700 bg-transparent text-brand-200 hover:border-accent-500/50 hover:bg-brand-900 hover:text-accent-400"
                >
                  {ui.openMap}
                </Button>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="h-full rounded-2xl border border-brand-800 bg-brand-950/80 p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-800 text-brand-300">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-brand-50">{ui.hoursTitle}</h3>
              </div>
              <ul className="space-y-3">
                {hours.map((row) => (
                  <li
                    key={row.day.en}
                    className="flex items-baseline justify-between gap-4 border-b border-brand-800 pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-brand-400">
                      {pickLocale(row.day, locale)}
                    </span>
                    <span className="font-medium text-brand-100">
                      {pickLocale(row.hours, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240} className="md:col-span-2">
            <div className="flex flex-col gap-6 rounded-2xl border border-brand-800 bg-brand-950/80 p-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-900 text-brand-300">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-brand-500">{ui.callUs}</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="mt-1 block text-lg font-semibold text-brand-50 hover:text-accent-400"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 sm:items-end">
                <ShopSocialLinks
                  contact={contact}
                  variant="midnight"
                  label={ui.socialTitle}
                />
                <Button
                  variant="secondary"
                  size="md"
                  href={`https://wa.me/${contact.whatsapp}`}
                >
                  {ui.contactUs}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
