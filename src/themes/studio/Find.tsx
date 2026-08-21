"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { ShopSocialLinks } from "@/components/shop/ShopSocialLinks";
import { getBarberUi } from "@/themes/barber/ui";
import { getShopWhatsAppUrl } from "@/lib/whatsapp";

type StudioFindProps = {
  shop: ShopWebsiteData;
};

export function StudioFind({ shop }: StudioFindProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const { contact, hours } = shop;

  return (
    <section id="find" className="py-20 lg:py-28">
      <div className="studio-shell">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-[var(--studio-line)] bg-[var(--studio-surface)] shadow-[0_20px_50px_rgb(20_22_26_/_0.05)]">
            <div className="grid lg:grid-cols-2">
              {/* Contact / location */}
              <div className="relative overflow-hidden bg-[var(--studio-deep)] p-8 text-white sm:p-10 lg:p-12">
                <div
                  className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: "rgb(227 93 74 / 0.25)" }}
                  aria-hidden
                />

                <div className="relative">
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {ui.contactTitle}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
                    {ui.contactSubtitle}
                  </p>

                  <div className="mt-10">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-white/45 uppercase">
                      {ui.addressTitle}
                    </p>
                    <p className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">
                      {pickLocale(contact.address, locale)}
                    </p>
                  </div>

                  <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                        ☎
                      </span>
                      {contact.phone}
                    </a>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={getShopWhatsAppUrl(
                        contact.whatsapp,
                        pickLocale(shop.name, locale),
                        locale,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-btn studio-btn-primary"
                    >
                      {ui.contactUs}
                    </a>
                    {contact.mapUrl ? (
                      <a
                        href={contact.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="studio-btn border border-white/20 bg-white/10 text-white hover:bg-white/15"
                      >
                        {ui.openMap}
                      </a>
                    ) : null}
                  </div>

                  <ShopSocialLinks
                    contact={contact}
                    shopName={shop.name}
                    variant="studio"
                    className="mt-8"
                    label={ui.socialTitle}
                  />
                </div>
              </div>

              {/* Hours */}
              <div className="bg-[var(--studio-bg)]/50 p-8 sm:p-10 lg:p-12">
                <h3 className="text-lg font-extrabold text-[var(--studio-ink)]">
                  {ui.hoursTitle}
                </h3>
                <ul className="mt-8 space-y-0">
                  {hours.map((row) => (
                    <li
                      key={row.day.en}
                      className="flex items-baseline justify-between gap-4 border-b border-[var(--studio-line)] py-4 first:pt-0 last:border-0"
                    >
                      <span className="font-medium text-[var(--studio-ink-soft)]">
                        {pickLocale(row.day, locale)}
                      </span>
                      <span className="shrink-0 text-sm font-bold text-[var(--studio-ink)]">
                        {pickLocale(row.hours, locale)}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-sm leading-relaxed text-[var(--studio-muted)]">
                  {locale === "ar"
                    ? "تقدر تحجز أونلاين في أي وقت، ونأكد معاك الموعد على واتساب."
                    : "Book online anytime — we’ll confirm your slot on WhatsApp."}
                </p>
                <a
                  href="#book"
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--studio-accent)] underline-offset-4 hover:underline"
                >
                  {ui.bookNow} →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
