"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";

type MaisonArriveProps = {
  shop: ShopWebsiteData;
};

/**
 * Immersive closer: address as a statement, hours as a quiet ledger.
 */
export function MaisonArrive({ shop }: MaisonArriveProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { contact, hours } = shop;

  return (
    <section
      id="arrive"
      className="relative overflow-hidden border-t border-[var(--maison-line)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgb(196 165 116 / 0.06) 100%), radial-gradient(ellipse 80% 60% at 50% 100%, rgb(196 165 116 / 0.1), transparent 60%)",
        }}
      />

      <div className="maison-shell relative py-20 lg:py-28">
        <Reveal>
          <p className="maison-eyebrow">{ui.contactBadge}</p>
          <h2 className="maison-display mt-5 max-w-2xl text-4xl text-[var(--maison-ivory)] sm:text-5xl lg:text-[3.5rem]">
            {ui.contactTitle}
          </h2>
          <p className="mt-4 max-w-md text-[var(--maison-muted)]">
            {ui.contactSubtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal delay={60}>
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-[var(--maison-muted)] uppercase">
                {ui.addressTitle}
              </p>
              <p className="maison-display mt-4 text-3xl leading-snug text-[var(--maison-ivory)] sm:text-4xl">
                {pickLocale(contact.address, locale)}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {contact.mapUrl ? (
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="maison-btn maison-btn-ghost"
                  >
                    {ui.openMap}
                  </a>
                ) : null}
                <a
                  href={`tel:${contact.phone}`}
                  className="maison-btn maison-btn-primary"
                >
                  {ui.callUs}
                </a>
              </div>

              <dl className="mt-10 space-y-4 border-t border-[var(--maison-line)] pt-8">
                <div>
                  <dt className="text-[0.65rem] font-semibold tracking-[0.22em] text-[var(--maison-muted)] uppercase">
                    {ui.callUs}
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-lg text-[var(--maison-soft)] transition-colors hover:text-[var(--maison-champagne)]"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <ShopSocialLinks
                contact={contact}
                shopName={shop.name}
                variant="maison"
                className="mt-8"
                label={ui.socialTitle}
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-[var(--maison-muted)] uppercase">
                {ui.hoursTitle}
              </p>
              <ul className="mt-6 space-y-0">
                {hours.map((row) => (
                  <li
                    key={pickLocale(row.day, locale)}
                    className="flex items-baseline justify-between gap-6 border-b border-[var(--maison-line)] py-4 first:border-t"
                  >
                    <span className="text-sm font-medium tracking-wide text-[var(--maison-soft)]">
                      {pickLocale(row.day, locale)}
                    </span>
                    <span className="font-mono text-sm text-[var(--maison-champagne)]">
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
