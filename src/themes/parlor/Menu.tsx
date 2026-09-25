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
import { getParlorCopy } from "./copy";

type ParlorMenuProps = {
  shop: ShopWebsiteData;
};

/**
 * Old barbershop price list (name ······ price) beside a perforated
 * booking ticket for picking the day and time.
 */
export function ParlorMenu({ shop }: ParlorMenuProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const pl = getParlorCopy(locale);
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

  const activeTimeId = timeId && !bookedSlots.has(timeId) ? timeId : null;

  const selectedTime = shop.timeSlots.find(
    (t) =>
      t.id === activeTimeId &&
      !hasTimeSlotEnded(t.id, dayOffset) &&
      !bookedSlots.has(t.id),
  );

  const canConfirm = Boolean(selectedDay && selectedTime);

  return (
    <section id="menu" className="parlor-paper py-20 lg:py-28">
      <div className="parlor-shell">
        <Reveal className="text-center">
          <p className="parlor-eyebrow justify-center">
            {canBook ? ui.bookBadge : ui.servicesBadge}
          </p>
          <h2 className="parlor-display mt-3 text-4xl text-[var(--pl-navy)] sm:text-5xl">
            {canBook ? ui.bookTitle : ui.servicesTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--pl-soft)]">
            {canBook ? ui.bookSubtitle : ui.servicesSubtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Price list */}
          <div className={cn("min-w-0", canBook ? "lg:col-span-7" : "lg:col-span-12")}>
            <Reveal>
              <div className="parlor-frame bg-[var(--pl-card)] p-5 sm:p-8">
                <p className="parlor-display text-center text-2xl text-[var(--pl-navy)] sm:text-3xl">
                  {pl.menu}
                </p>
                <div className="parlor-ornament mx-auto mt-3 max-w-[8rem]" aria-hidden>
                  <span className="text-xs">✦</span>
                </div>

                <div
                  className="mt-6 flex flex-wrap justify-center gap-2"
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
                          "border-2 px-4 py-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase transition-colors",
                          active
                            ? "border-[var(--pl-navy)] bg-[var(--pl-navy)] text-[var(--pl-paper)]"
                            : "border-[var(--pl-line)] text-[var(--pl-soft)] hover:border-[var(--pl-navy)]",
                        )}
                      >
                        {pickLocale(cat.name, locale)}
                      </button>
                    );
                  })}
                </div>

                <ul className="mt-8 space-y-6">
                  {(activeCategory?.services ?? []).map((service) => (
                    <li key={service.id}>
                      <div className="flex items-end gap-3">
                        <span className="text-base font-bold text-[var(--pl-navy)] sm:text-lg">
                          {pickLocale(service.name, locale)}
                        </span>
                        <span className="parlor-leader" aria-hidden />
                        <span className="parlor-display shrink-0 text-lg text-[var(--pl-red)] sm:text-xl">
                          {pickLocale(service.price, locale)}
                        </span>
                      </div>
                      {pickLocale(service.description, locale) ? (
                        <p className="mt-1 text-sm leading-relaxed text-[var(--pl-muted)]">
                          {pickLocale(service.description, locale)}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>

                <ShopPaymentMethods shop={shop} variant="parlor" className="mt-8" />
              </div>
            </Reveal>
          </div>

          {/* Booking ticket */}
          {canBook ? (
            <div className="min-w-0 lg:col-span-5">
              <Reveal delay={80}>
                <aside className="parlor-ticket lg:sticky lg:top-28">
                  <div className="flex items-center justify-between bg-[var(--pl-navy)] px-5 py-3 text-[var(--pl-paper)]">
                    <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase">
                      {pl.ticket}
                    </span>
                    <span aria-hidden>✂</span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-[0.7rem] font-bold tracking-[0.2em] text-[var(--pl-muted)] uppercase">
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
                              "flex flex-col items-center gap-1 border-2 px-1 py-3 transition-colors",
                              !day.isOpen
                                ? "cursor-not-allowed border-[var(--pl-line)] text-[var(--pl-muted)] opacity-50"
                                : active
                                ? "border-[var(--pl-red)] bg-[var(--pl-red)] text-white"
                                : "border-[var(--pl-line)] text-[var(--pl-navy)] hover:border-[var(--pl-navy)]",
                            )}
                          >
                            <span className="text-[0.66rem] font-bold tracking-wide uppercase">
                              {day.label}
                            </span>
                            <span className="text-[0.68rem] opacity-80">
                              {day.isOpen ? day.dateLabel : ui.dayClosed}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="parlor-ticket-perf" aria-hidden />

                  <div className="p-5 sm:p-6">
                    <p className="text-[0.7rem] font-bold tracking-[0.2em] text-[var(--pl-muted)] uppercase">
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
                              "flex flex-col items-center border-2 px-2 py-2 text-sm font-semibold transition-colors",
                              booked
                                ? "cursor-not-allowed border-gray-300 bg-gray-200 text-gray-500"
                                : ended || pending
                                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                                : active
                                ? "border-[var(--pl-navy)] bg-[var(--pl-navy)] text-[var(--pl-paper)]"
                                : "border-[var(--pl-line)] text-[var(--pl-navy)] hover:border-[var(--pl-red)]",
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
                        className="parlor-btn parlor-btn-primary mt-6 w-full"
                      >
                        {ui.confirmBooking}
                      </button>
                    ) : (
                      <p className="mt-6 text-center text-xs leading-relaxed text-[var(--pl-muted)]">
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
