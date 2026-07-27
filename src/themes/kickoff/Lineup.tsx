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
  getDefaultBookingDayOffset,
  type BookingDayOffset,
} from "@/themes/barber/ui";
import { getKickoffCopy } from "./Ticker";

type KickoffLineupProps = {
  shop: ShopWebsiteData;
};

/**
 * Lineup board: jersey-style service picks + scoreboard day/time confirm.
 */
export function KickoffLineup({ shop }: KickoffLineupProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const ko = getKickoffCopy(locale);
  const dayOptions = useMemo(
    () => getBookingDayOptions(locale, shop.workingDays),
    [locale, shop.workingDays],
  );
  const bookingDates = useMemo(
    () => dayOptions.filter((d) => d.isOpen).map((d) => d.dateISO),
    [dayOptions],
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
    <section id="lineup" className="relative py-20 lg:py-28">
      <div className="kickoff-pitch-bg pointer-events-none absolute inset-0 opacity-20" />

      <div className="kickoff-shell relative">
        <Reveal>
          <div>
            <p className="kickoff-eyebrow">{ui.bookBadge}</p>
            <h2 className="kickoff-display mt-3 text-5xl text-[var(--ko-white)] sm:text-6xl">
              {ui.bookTitle}
            </h2>
            <p className="mt-3 max-w-md text-[var(--ko-muted)]">
              {ui.bookSubtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={50}>
          <div
            className="mt-10 flex gap-2 overflow-x-auto pb-1"
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
                    "shrink-0 border px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.14em] uppercase transition-colors",
                    active
                      ? "border-[var(--ko-pitch)] bg-[var(--ko-pitch)] text-[#04140a]"
                      : "border-[var(--ko-line)] text-[var(--ko-muted)] hover:border-[var(--ko-gold)] hover:text-[var(--ko-gold)]",
                  )}
                >
                  {pickLocale(cat.name, locale)}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="mb-4">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] text-[var(--ko-muted)] uppercase">
                {ui.pickServiceHint}
              </p>
            </div>

            <ul className="grid auto-rows-fr gap-3 sm:grid-cols-2">
              {(activeCategory?.services ?? []).map((service, index) => {
                return (
                  <Reveal
                    key={service.id}
                    delay={Math.min(index * 40, 160)}
                    className="h-full"
                  >
                    <li className="h-full">
                      <article className="relative flex h-full min-h-[9.5rem] w-full flex-col gap-2 border border-[var(--ko-line)] bg-[var(--ko-panel)]/60 p-4 text-start">
                        <span className="kickoff-display absolute end-3 top-2 text-3xl text-[var(--ko-white)]/10">
                          {String(index + 10)}
                        </span>
                        <span className="font-bold text-[var(--ko-white)]">
                          {pickLocale(service.name, locale)}
                        </span>
                        <span className="flex-1 text-sm leading-relaxed text-[var(--ko-muted)]">
                          {pickLocale(service.description, locale)}
                        </span>
                        <span className="mt-auto pt-1 font-mono text-sm font-bold text-[var(--ko-gold)]">
                          {pickLocale(service.price, locale)}
                        </span>
                      </article>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* Scoreboard panel */}
          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <aside className="border-2 border-[var(--ko-gold)]/40 bg-[var(--ko-deep)] lg:sticky lg:top-28">
                <div className="flex items-center justify-between border-b border-[var(--ko-line)] bg-[var(--ko-gold)] px-4 py-3 text-[var(--ko-night)]">
                  <span className="text-[0.65rem] font-extrabold tracking-[0.2em] uppercase">
                    {ko.wc}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-[0.65rem] font-bold tracking-[0.2em] text-[var(--ko-muted)] uppercase">
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
                              ? "cursor-not-allowed border-[var(--ko-line)] text-[var(--ko-muted)] opacity-50"
                              : active
                              ? "border-[var(--ko-pitch)] bg-[var(--ko-pitch)] text-[#04140a]"
                              : "border-[var(--ko-line)] text-[var(--ko-soft)] hover:border-[var(--ko-gold)]",
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

                  <p className="mt-7 text-[0.65rem] font-bold tracking-[0.2em] text-[var(--ko-muted)] uppercase">
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
                              ? "border-[var(--ko-gold)] bg-[var(--ko-gold)] text-[var(--ko-night)]"
                              : "border-[var(--ko-line)] text-[var(--ko-soft)] hover:border-[var(--ko-pitch)]",
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
                      className="kickoff-btn kickoff-btn-pitch mt-6 w-full"
                      style={{ clipPath: "none" }}
                    >
                      {ui.confirmBooking}
                    </button>
                  ) : (
                    <p className="mt-6 text-center text-xs leading-relaxed text-[var(--ko-muted)]">
                      {ui.needServiceDayAndTime}
                    </p>
                  )}
                </div>
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
