"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";
import { getKickoffCopy } from "./Ticker";

type KickoffStadiumProps = {
  shop: ShopWebsiteData;
};

export function KickoffStadium({ shop }: KickoffStadiumProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const ko = getKickoffCopy(locale);
  const { contact, hours } = shop;

  return (
    <section
      id="stadium"
      className="relative overflow-hidden border-t border-[var(--ko-line)] bg-[var(--ko-deep)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgb(29 185 84 / 0.12), transparent 60%)",
        }}
      />

      <div className="kickoff-shell relative py-20 lg:py-28">
        <Reveal>
          <p className="kickoff-eyebrow">{ui.contactBadge}</p>
          <h2 className="kickoff-display mt-4 text-5xl text-[var(--ko-white)] sm:text-6xl">
            {ui.contactTitle}
          </h2>
          <p className="mt-3 max-w-md text-[var(--ko-muted)]">
            {ui.contactSubtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={50}>
            <div className="border border-[var(--ko-line)] bg-[var(--ko-panel)]/50 p-6 sm:p-8">
              <p className="text-[0.65rem] font-bold tracking-[0.22em] text-[var(--ko-gold)] uppercase">
                {ui.addressTitle}
              </p>
              <p className="kickoff-display mt-4 text-3xl leading-none text-[var(--ko-white)] sm:text-4xl">
                {pickLocale(contact.address, locale)}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {contact.mapUrl ? (
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kickoff-btn kickoff-btn-ghost"
                    style={{ clipPath: "none" }}
                  >
                    {ui.openMap}
                  </a>
                ) : null}
                <a
                  href={`tel:${contact.phone}`}
                  className="kickoff-btn kickoff-btn-primary"
                >
                  {ui.callUs}
                </a>
              </div>

              <dl className="mt-8 space-y-4 border-t border-[var(--ko-line)] pt-6">
                <div>
                  <dt className="text-[0.62rem] font-bold tracking-[0.18em] text-[var(--ko-muted)] uppercase">
                    {ui.callUs}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-lg text-[var(--ko-soft)] hover:text-[var(--ko-gold)]"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <ShopSocialLinks
                contact={contact}
                shopName={shop.name}
                variant="kickoff"
                className="mt-8"
                label={ui.socialTitle}
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[0.65rem] font-bold tracking-[0.22em] text-[var(--ko-gold)] uppercase">
                  {ui.hoursTitle}
                </p>
                <span className="text-[0.58rem] font-bold tracking-[0.14em] text-[var(--ko-pitch)] uppercase">
                  {ko.cut}
                </span>
              </div>
              <ul>
                {hours.map((row) => (
                  <li
                    key={pickLocale(row.day, locale)}
                    className="flex items-baseline justify-between gap-6 border-b border-[var(--ko-line)] py-4 first:border-t"
                  >
                    <span className="font-semibold tracking-wide text-[var(--ko-soft)]">
                      {pickLocale(row.day, locale)}
                    </span>
                    <span className="font-mono text-sm font-bold text-[var(--ko-gold)]">
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
