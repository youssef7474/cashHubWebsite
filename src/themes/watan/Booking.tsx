"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils/cn";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { isShopReservationFeatureEnabled, pickLocale } from "@/lib/shops/types";
import { ShopPaymentMethods } from "@/components/shop/ShopPaymentMethods";
import { hasTimeSlotEnded } from "@/lib/shops/time";
import { ReservationModal } from "@/components/reservation/ReservationModal";
import { useBookedSlots } from "@/components/reservation/useBookedSlots";
import {
  getBarberUi,
  getBookingDayOptions,
  getDefaultBookingDayOffset,
  type BookingDayOffset,
} from "@/themes/barber/ui";
import { getWatanCopy } from "./Ticker";

type WatanBookingProps = {
  shop: ShopWebsiteData;
};

/**
 * Booking board: service cards + a green-and-gold day/time panel.
 */
export function WatanBooking({ shop }: WatanBookingProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const wt = getWatanCopy(locale);
  const canBook = isShopReservationFeatureEnabled(shop);
  const dayOptions = useMemo(
    () => getBookingDayOptions(locale, shop.workingDays),
    [locale, shop.workingDays],
  );
  // No booking → no availability lookups.
  const bookingDates = useMemo(
    () =>
      canBook ? dayOptions.filter((d) => d.isOpen).map((d) => d.dateISO) : [],
    [canBook, dayOptions],
  );
  const [categoryId, setCategoryId] = useState(shop.categories[0]?.id ?? "");
  const [dayOffset, setDayOffset] = useState<BookingDayOffset | null>(() =>
    getDefaultBookingDayOffset(dayOptions),
  );
  const [timeId, setTimeId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const activeCategory =
    shop.categories.find((c) => c.id === categoryId) ?? shop.categories[0];
  const selectedDay = dayOptions.find(
    (d) => d.offset === dayOffset && d.isOpen,
  );
  const {
    bookedSlots,
    isLoading: slotsLoading,
    refresh: refreshBookedSlots,
  } = useBookedSlots(shop.id, bookingDates, selectedDay?.dateISO);

  const activeTimeId =
    timeId && !bookedSlots.has(timeId) ? timeId : null;

  const selectedTime = shop.timeSlots.find(
    (t) =>
      t.id === activeTimeId &&
      !hasTimeSlotEnded(t.id, dayOffset) &&
      !bookedSlots.has(t.id),
  );

  const canConfirm = Boolean(selectedDay && selectedTime);

  return (
    <section id="booking" className="relative py-20 lg:py-28">
      <div className="watan-pattern pointer-events-none absolute inset-0 opacity-20" />

      <div className="watan-shell relative">
        <Reveal>
          <div>
            <p className="watan-eyebrow">
              {canBook ? ui.bookBadge : ui.servicesBadge}
            </p>
            <h2 className="watan-display mt-3 text-5xl text-[var(--wt-white)] sm:text-6xl">
              {canBook ? ui.bookTitle : ui.servicesTitle}
            </h2>
            <p className="mt-3 max-w-md text-[var(--wt-muted)]">
              {canBook ? ui.bookSubtitle : ui.servicesSubtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={50}>
          <div
            className="mt-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label={ui.pickCategory}
          >
            {shop.categories.map((cat) => {
              const active = cat.id === activeCategory?.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategoryId(cat.id)}
                  className={cn(
                    "border px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.14em] uppercase transition-colors",
                    active
                      ? "border-[var(--wt-green)] bg-[var(--wt-green)] text-[#04140a]"
                      : "border-[var(--wt-line)] text-[var(--wt-muted)] hover:border-[var(--wt-gold)] hover:text-[var(--wt-gold)]",
                  )}
                >
                  {pickLocale(cat.name, locale)}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div
            className={cn("min-w-0", canBook ? "lg:col-span-7" : "lg:col-span-12")}
          >
            <div className="mb-4">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] text-[var(--wt-muted)] uppercase">
                {ui.pickServiceHint}
              </p>
            </div>

            <ul
              className={cn(
                "grid auto-rows-fr gap-3 sm:grid-cols-2",
                !canBook && "lg:grid-cols-3",
              )}
            >
              {(activeCategory?.services ?? []).map((service, index) => {
                return (
                  <Reveal
                    key={service.id}
                    delay={Math.min(index * 40, 160)}
                    className="h-full"
                  >
                    <li className="h-full">
                      <article className="relative flex h-full min-h-[9.5rem] w-full flex-col gap-2 border border-[var(--wt-line)] bg-[var(--wt-panel)]/60 p-4 text-start">
                        <span className="watan-display absolute end-3 top-2 text-3xl text-[var(--wt-white)]/10">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-bold text-[var(--wt-white)]">
                          {pickLocale(service.name, locale)}
                        </span>
                        <span className="flex-1 text-sm leading-relaxed text-[var(--wt-muted)]">
                          {pickLocale(service.description, locale)}
                        </span>
                        <span className="mt-auto pt-1 font-mono text-sm font-bold text-[var(--wt-gold)]">
                          {pickLocale(service.price, locale)}
                        </span>
                      </article>
                    </li>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={120}>
              <ShopPaymentMethods shop={shop} variant="watan" className="mt-8" />
            </Reveal>
          </div>

          {/* Booking panel */}
          {canBook ? (
          <div className="min-w-0 lg:col-span-5">
            <Reveal delay={80}>
              <aside className="border-2 border-[var(--wt-gold)]/40 bg-[var(--wt-deep)] lg:sticky lg:top-28">
                <div className="flex items-center justify-between border-b border-[var(--wt-line)] bg-[var(--wt-gold)] px-4 py-3 text-[var(--wt-night)]">
                  <span className="text-[0.65rem] font-extrabold tracking-[0.2em] uppercase">
                    {wt.day}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-[0.65rem] font-bold tracking-[0.2em] text-[var(--wt-muted)] uppercase">
                    {ui.pickDay}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {dayOptions.map((day) => {
                      const active = dayOffset === day.offset;
                      return (
                        <button
                          key={day.offset}
                          type="button"
                          disabled={!day.isOpen}
                          onClick={() => {
                            if (!day.isOpen) return;
                            setDayOffset(day.offset);
                            setTimeId(null);
                          }}
                          className={cn(
                            "flex flex-col items-center gap-1 border px-1 py-3 transition-colors",
                            !day.isOpen
                              ? "cursor-not-allowed border-[var(--wt-line)] text-[var(--wt-muted)] opacity-50"
                              : active
                              ? "border-[var(--wt-green)] bg-[var(--wt-green)] text-[#04140a]"
                              : "border-[var(--wt-line)] text-[var(--wt-soft)] hover:border-[var(--wt-gold)]",
                          )}
                        >
                          <span className="text-[0.62rem] font-bold tracking-wide uppercase">
                            {day.label}
                          </span>
                          <span className="text-[0.65rem] opacity-80">
                            {day.isOpen ? day.dateLabel : ui.dayClosed}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-7 text-[0.65rem] font-bold tracking-[0.2em] text-[var(--wt-muted)] uppercase">
                    {ui.pickTime}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {shop.timeSlots.map((slot) => {
                      const active = activeTimeId === slot.id;
                      const ended =
                        !selectedDay || hasTimeSlotEnded(slot.id, dayOffset);
                      const booked =
                        Boolean(selectedDay) && bookedSlots.has(slot.id);
                      const pending = Boolean(selectedDay) && slotsLoading;
                      const disabled =
                        !selectedDay || ended || booked || pending;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={disabled}
                          onClick={() => setTimeId(slot.id)}
                          className={cn(
                            "flex flex-col items-center border px-2 py-2 text-sm font-semibold transition-colors",
                            booked
                              ? "cursor-not-allowed border-gray-600 bg-gray-800 text-gray-400"
                              : ended || pending
                              ? "cursor-not-allowed border-gray-700 bg-gray-800/40 text-gray-500"
                              : active
                              ? "border-[var(--wt-gold)] bg-[var(--wt-gold)] text-[var(--wt-night)]"
                              : "border-[var(--wt-line)] text-[var(--wt-soft)] hover:border-[var(--wt-green)]",
                          )}
                        >
                          {pickLocale(slot.label, locale)}
                          {booked ? (
                            <span className="text-[10px] font-semibold uppercase">
                              {ui.slotFullyBooked}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>

                  {canConfirm ? (
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="watan-btn watan-btn-green mt-6 w-full"
                      style={{ clipPath: "none" }}
                    >
                      {ui.confirmBooking}
                    </button>
                  ) : (
                    <p className="mt-6 text-center text-xs leading-relaxed text-[var(--wt-muted)]">
                      {ui.needServiceDayAndTime}
                    </p>
                  )}
                </div>
              </aside>
            </Reveal>
          </div>
          ) : null}
        </div>
      </div>

      {canBook && selectedDay && selectedTime ? (
        <ReservationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onAvailabilityChanged={refreshBookedSlots}
          shopId={shop.id}
          locale={locale}
          dayText={`${selectedDay.label} — ${selectedDay.dateLabel}`}
          dateISO={selectedDay.dateISO}
          timeText={pickLocale(selectedTime.label, locale)}
          time24={selectedTime.id}
        />
      ) : null}
    </section>
  );
}
