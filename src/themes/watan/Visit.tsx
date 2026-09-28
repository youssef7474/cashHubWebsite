"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { ShopMapEmbed } from "@/components/shop/ShopMapEmbed";
import { getShopDirectionsUrl, getShopMapUrl } from "@/lib/shops/location";
import { getBarberUi } from "@/themes/barber/ui";
import { getWatanCopy } from "./Ticker";

type WatanVisitProps = {
  shop: ShopWebsiteData;
};

export function WatanVisit({ shop }: WatanVisitProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const wt = getWatanCopy(locale);
  const { contact, hours } = shop;
  const mapUrl = getShopMapUrl(contact);
  const directionsUrl = getShopDirectionsUrl(contact);

  return (
    <section
      id="visit"
      className="relative overflow-hidden border-t border-[var(--wt-line)] bg-[var(--wt-deep)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgb(29 185 84 / 0.12), transparent 60%)",
        }}
      />

      <div className="watan-shell relative py-20 lg:py-28">
        <Reveal>
          <p className="watan-eyebrow">{ui.contactBadge}</p>
          <h2 className="watan-display mt-4 text-5xl text-[var(--wt-white)] sm:text-6xl">
            {ui.contactTitle}
          </h2>
          <p className="mt-3 max-w-md text-[var(--wt-muted)]">
            {ui.contactSubtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={50}>
            <div className="border border-[var(--wt-line)] bg-[var(--wt-panel)]/50 p-6 sm:p-8">
              <p className="text-[0.65rem] font-bold tracking-[0.22em] text-[var(--wt-gold)] uppercase">
                {ui.addressTitle}
              </p>
              <p className="watan-display mt-4 text-3xl leading-none text-[var(--wt-white)] sm:text-4xl">
                {pickLocale(contact.address, locale)}
              </p>
              <ShopMapEmbed
                contact={contact}
                title={ui.mapTitle}
                className="mt-6 border border-[var(--wt-line)]"
              />

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {mapUrl ? (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watan-btn watan-btn-ghost"
                    style={{ clipPath: "none" }}
                  >
                    {ui.openMap}
                  </a>
                ) : null}
                {directionsUrl ? (
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watan-btn watan-btn-ghost"
                    style={{ clipPath: "none" }}
                  >
                    {ui.directions}
                  </a>
                ) : null}
                <a
                  href={`tel:${contact.phone}`}
                  className="watan-btn watan-btn-primary"
                >
                  {ui.callUs}
                </a>
              </div>

              <dl className="mt-8 space-y-4 border-t border-[var(--wt-line)] pt-6">
                <div>
                  <dt className="text-[0.62rem] font-bold tracking-[0.18em] text-[var(--wt-muted)] uppercase">
                    {ui.callUs}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-lg text-[var(--wt-soft)] hover:text-[var(--wt-gold)]"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <ShopSocialLinks
                contact={contact}
                shopName={shop.name}
                variant="watan"
                className="mt-8"
                label={ui.socialTitle}
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[0.65rem] font-bold tracking-[0.22em] text-[var(--wt-gold)] uppercase">
                  {ui.hoursTitle}
                </p>
                <span className="text-[0.58rem] font-bold tracking-[0.14em] text-[var(--wt-green)] uppercase">
                  {wt.pride}
                </span>
              </div>
              <ul>
                {hours.map((row) => (
                  <li
                    key={pickLocale(row.day, locale)}
                    className="flex items-baseline justify-between gap-6 border-b border-[var(--wt-line)] py-4 first:border-t"
                  >
                    <span className="font-semibold tracking-wide text-[var(--wt-soft)]">
                      {pickLocale(row.day, locale)}
                    </span>
                    <span className="font-mono text-sm font-bold text-[var(--wt-gold)]">
                      {pickLocale(row.hours, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
