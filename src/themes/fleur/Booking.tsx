"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils/cn";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { hasTimeSlotEnded } from "@/lib/shops/time";
import { ReservationModal } from "@/components/reservation/ReservationModal";
import { useBookedSlots } from "@/components/reservation/useBookedSlots";
import {
  getBarberUi,
  getBookingDayOptions,
  type BookingDayOffset,
} from "@/themes/barber/ui";

type FleurBookingProps = {
  shop: ShopWebsiteData;
};

/**
 * Ritual booking: pill category tabs, soft service cards,
 * and a sticky summary panel for day/time confirmation.
 */
export function FleurBooking({ shop }: FleurBookingProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const dayOptions = useMemo(() => getBookingDayOptions(locale), [locale]);
  const bookingDates = useMemo(
    () => dayOptions.map((d) => d.dateISO),
    [dayOptions],
  );
  const [categoryId, setCategoryId] = useState(shop.categories[0]?.id ?? "");
  const [dayOffset, setDayOffset] = useState<BookingDayOffset | null>(0);
  const [timeId, setTimeId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const activeCategory =
    shop.categories.find((c) => c.id === categoryId) ?? shop.categories[0];
  const selectedDay = dayOptions.find((d) => d.offset === dayOffset);
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
    <section id="booking" className="py-20 lg:py-28">
      <div className="fleur-shell">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p className="fleur-eyebrow">{ui.bookBadge}</p>
          <h2 className="fleur-display mt-5 text-4xl text-[var(--fleur-plum)] sm:text-5xl lg:text-[3.5rem]">
            {ui.bookTitle}
          </h2>
          <p className="mt-4 text-[var(--fleur-soft)]">{ui.bookSubtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Services column */}
          <div className="lg:col-span-7">
            <Reveal delay={40}>
              <div
                className="flex gap-2 overflow-x-auto pb-1"
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
                        "shrink-0 rounded-full border px-4 py-2.5 text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition-colors",
                        active
                          ? "border-[var(--fleur-rose)] bg-[var(--fleur-rose)] text-white"
                          : "border-[var(--fleur-line)] text-[var(--fleur-soft)] hover:border-[var(--fleur-rose)]/60 hover:text-[var(--fleur-rose-deep)]",
                      )}
                    >
                      {pickLocale(cat.name, locale)}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-2 py-3">
                <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-[var(--fleur-muted)] uppercase">
                  {ui.pickServiceHint}
                </p>
              </div>
            </Reveal>

            <ul className="space-y-3">
              {(activeCategory?.services ?? []).map((service, index) => {
                return (
                  <Reveal key={service.id} delay={Math.min(index * 40, 200)}>
                    <li>
                      <article className="flex w-full items-start rounded-2xl border border-[var(--fleur-line)] bg-[var(--fleur-panel)] p-5 text-start sm:p-6">
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <span className="fleur-display text-xl text-[var(--fleur-plum)] sm:text-2xl">
                              {pickLocale(service.name, locale)}
                            </span>
                            <span className="text-sm font-semibold tracking-wide text-[var(--fleur-gold)]">
                              {pickLocale(service.price, locale)}
                            </span>
                          </span>
                          <span className="mt-1.5 block text-sm leading-relaxed text-[var(--fleur-muted)]">
                            {pickLocale(service.description, locale)}
                          </span>
                        </span>
                      </article>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* Sticky booking panel */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <aside className="fleur-card p-6 sm:p-8 lg:sticky lg:top-10">
                <p className="fleur-eyebrow">{ui.pickDay}</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {dayOptions.map((day) => {
                    const active = dayOffset === day.offset;
                    return (
                      <button
                        key={day.offset}
                        type="button"
                        onClick={() => {
                          setDayOffset(day.offset);
                          setTimeId(null);
                        }}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-xl border px-2 py-3 transition-colors",
                          active
                            ? "border-[var(--fleur-rose)] bg-[var(--fleur-rose)]/10 text-[var(--fleur-rose-deep)]"
                            : "border-[var(--fleur-line)] text-[var(--fleur-soft)] hover:border-[var(--fleur-rose)]/50",
                        )}
                      >
                        <span className="text-[0.65rem] font-semibold tracking-wider uppercase">
                          {day.label}
                        </span>
                        <span className="text-xs text-[var(--fleur-muted)]">
                          {day.dateLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="fleur-eyebrow mt-8">{ui.pickTime}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {shop.timeSlots.map((slot) => {
                    const active = activeTimeId === slot.id;
                    const ended = hasTimeSlotEnded(slot.id, dayOffset);
                    const booked =
                      Boolean(selectedDay) && bookedSlots.has(slot.id);
                    const pending = Boolean(selectedDay) && slotsLoading;
                    const disabled = ended || booked || pending;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => setTimeId(slot.id)}
                        className={cn(
                          "flex flex-col items-center rounded-full border px-2 py-2 text-sm transition-colors",
                          booked
                            ? "cursor-not-allowed border-gray-300 bg-gray-200 text-gray-500"
                            : ended || pending
                            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                            : active
                            ? "border-[var(--fleur-rose)] bg-[var(--fleur-rose)] text-white"
                            : "border-[var(--fleur-line)] text-[var(--fleur-soft)] hover:border-[var(--fleur-rose)]/50",
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
                    className="fleur-btn fleur-btn-primary mt-8 w-full"
                  >
                    {ui.confirmBooking}
                  </button>
                ) : (
                  <p className="mt-8 text-center text-xs leading-relaxed text-[var(--fleur-muted)]">
                    {ui.needServiceDayAndTime}
                  </p>
                )}
              </aside>
            </Reveal>
          </div>
        </div>
      </div>

      {selectedDay && selectedTime ? (
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
