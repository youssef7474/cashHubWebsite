"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";
import { getParlorCopy } from "./copy";

type ParlorVisitProps = {
  shop: ShopWebsiteData;
};

/** Address card + opening hours on a hanging shop sign. */
export function ParlorVisit({ shop }: ParlorVisitProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const pl = getParlorCopy(locale);
  const { contact, hours } = shop;

  return (
    <section id="visit" className="border-t-2 border-[var(--pl-navy)] bg-[var(--pl-paper-deep)] py-20 lg:py-28">
      <div className="parlor-shell">
        <Reveal className="text-center">
          <p className="parlor-eyebrow justify-center">{ui.contactBadge}</p>
          <h2 className="parlor-display mt-3 text-4xl text-[var(--pl-navy)] sm:text-5xl">
            {ui.contactTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--pl-soft)]">
            {ui.contactSubtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal delay={50}>
            <div className="h-full border-2 border-[var(--pl-navy)] bg-[var(--pl-card)] p-6 shadow-[6px_6px_0_var(--pl-navy)] sm:p-8">
              <p className="text-[0.7rem] font-bold tracking-[0.22em] text-[var(--pl-red)] uppercase">
                {ui.addressTitle}
              </p>
              <p className="parlor-display mt-4 text-2xl text-[var(--pl-navy)] sm:text-3xl">
                {pickLocale(contact.address, locale)}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                {contact.mapUrl ? (
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="parlor-btn parlor-btn-ghost"
                  >
                    {ui.openMap}
                  </a>
                ) : null}
                <a href={`tel:${contact.phone}`} className="parlor-btn parlor-btn-primary">
                  {ui.callUs}
                </a>
              </div>

              <p className="mt-8 border-t-2 border-dotted border-[var(--pl-line)] pt-5">
                <a
                  href={`tel:${contact.phone}`}
                  dir="ltr"
                  className="text-lg font-semibold text-[var(--pl-navy)] hover:text-[var(--pl-red)]"
                >
                  {contact.phone}
                </a>
              </p>

              <ShopSocialLinks
                contact={contact}
                shopName={shop.name}
                variant="parlor"
                className="mt-6"
                label={ui.socialTitle}
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            {/* Hanging sign */}
            <div className="mx-auto flex max-w-md flex-col items-center">
              <div className="flex w-2/3 justify-between" aria-hidden>
                <span className="h-8 w-0.5 bg-[var(--pl-brass)]" />
                <span className="h-8 w-0.5 bg-[var(--pl-brass)]" />
              </div>
              <div className="parlor-frame w-full bg-[var(--pl-navy)] px-6 py-7 text-[var(--pl-paper)]">
                <p className="text-center text-[0.7rem] font-bold tracking-[0.26em] text-[var(--pl-brass)] uppercase">
                  {ui.hoursTitle}
                </p>
                <p className="parlor-display mt-2 text-center text-2xl">{pl.sign}</p>
                <ul className="mt-6">
                  {hours.map((row) => (
                    <li
                      key={pickLocale(row.day, locale)}
                      className="flex items-baseline gap-3 border-b border-white/15 py-3 last:border-b-0"
                    >
                      <span className="font-semibold">{pickLocale(row.day, locale)}</span>
                      <span className="flex-1 border-b border-dotted border-white/25" aria-hidden />
                      <span className="font-mono text-sm font-bold text-[var(--pl-brass)]">
                        {pickLocale(row.hours, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
