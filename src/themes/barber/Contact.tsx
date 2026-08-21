"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { MapPinIcon, PhoneIcon, ClockIcon } from "./icons";
import { getBarberUi } from "./ui";
import { getShopWhatsAppUrl } from "@/lib/whatsapp";

type BarberContactProps = {
  shop: ShopWebsiteData;
};

export function BarberContact({ shop }: BarberContactProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { contact, hours } = shop;

  return (
    <section id="contact" className="border-t border-border-subtle py-[var(--section-py)]">
      <Container>
        <Reveal>
          <SectionHeader
            badge={ui.contactBadge}
            title={ui.contactTitle}
            subtitle={ui.contactSubtitle}
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal delay={80}>
            <div className="h-full rounded-2xl border border-brand-200 bg-white p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-brand-900">{ui.addressTitle}</h3>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                {pickLocale(contact.address, locale)}
              </p>
              {contact.mapUrl ? (
                <Button
                  variant="outline"
                  size="sm"
                  href={contact.mapUrl}
                  className="mt-6"
                >
                  {ui.openMap}
                </Button>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="h-full rounded-2xl border border-brand-200 bg-white p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-brand-900">{ui.hoursTitle}</h3>
              </div>
              <ul className="space-y-3">
                {hours.map((row) => (
                  <li
                    key={row.day.en}
                    className="flex items-baseline justify-between gap-4 border-b border-brand-100 pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-brand-700">
                      {pickLocale(row.day, locale)}
                    </span>
                    <span className="font-medium text-brand-900">
                      {pickLocale(row.hours, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240} className="md:col-span-2">
            <div className="flex flex-col gap-6 rounded-2xl border border-brand-200 bg-brand-50/70 p-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-sm">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-brand-500">{ui.callUs}</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="mt-1 block text-lg font-semibold text-brand-900 hover:text-accent-600"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 sm:items-end">
                <ShopSocialLinks
                  contact={contact}
                  shopName={shop.name}
                  variant="barber"
                  label={ui.socialTitle}
                />
                <Button
                  variant="secondary"
                  size="md"
                  href={getShopWhatsAppUrl(
                    contact.whatsapp,
                    pickLocale(shop.name, locale),
                    locale,
                  )}
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
