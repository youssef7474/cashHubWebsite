"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";

type FleurVisitProps = {
  shop: ShopWebsiteData;
};

/**
 * Contact closer: address as a statement card next to a quiet hours ledger.
 */
export function FleurVisit({ shop }: FleurVisitProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { contact, hours } = shop;

  return (
    <section
      id="visit"
      className="relative overflow-hidden border-t border-[var(--fleur-line)] bg-[var(--fleur-blush)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgb(183 110 121 / 0.1), transparent 60%)",
        }}
      />

      <div className="fleur-shell relative py-20 lg:py-28">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p className="fleur-eyebrow">{ui.contactBadge}</p>
          <h2 className="fleur-display mt-5 text-4xl text-[var(--fleur-plum)] sm:text-5xl lg:text-[3.5rem]">
            {ui.contactTitle}
          </h2>
          <p className="mt-4 text-[var(--fleur-soft)]">{ui.contactSubtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal delay={60}>
            <div className="fleur-card h-full p-7 sm:p-9">
              <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-[var(--fleur-muted)] uppercase">
                {ui.addressTitle}
              </p>
              <p className="fleur-display mt-4 text-3xl leading-snug text-[var(--fleur-plum)] sm:text-4xl">
                {pickLocale(contact.address, locale)}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {contact.mapUrl ? (
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fleur-btn fleur-btn-ghost"
                  >
                    {ui.openMap}
                  </a>
                ) : null}
                <a
                  href={`tel:${contact.phone}`}
                  className="fleur-btn fleur-btn-primary"
                >
                  {ui.callUs}
                </a>
              </div>

              <dl className="mt-10 space-y-4 border-t border-[var(--fleur-line)] pt-8">
                <div>
                  <dt className="text-[0.65rem] font-semibold tracking-[0.22em] text-[var(--fleur-muted)] uppercase">
                    {ui.callUs}
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-lg text-[var(--fleur-soft)] transition-colors hover:text-[var(--fleur-rose-deep)]"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <ShopSocialLinks
                contact={contact}
                variant="fleur"
                className="mt-8"
                label={ui.socialTitle}
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="fleur-card h-full p-7 sm:p-9">
              <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-[var(--fleur-muted)] uppercase">
                {ui.hoursTitle}
              </p>
              <ul className="mt-6 space-y-0">
                {hours.map((row) => (
                  <li
                    key={pickLocale(row.day, locale)}
                    className="flex items-baseline justify-between gap-6 border-b border-[var(--fleur-line)] py-4 last:border-b-0"
                  >
                    <span className="text-sm font-medium tracking-wide text-[var(--fleur-soft)]">
                      {pickLocale(row.day, locale)}
                    </span>
                    <span className="text-sm font-semibold text-[var(--fleur-rose-deep)]">
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
