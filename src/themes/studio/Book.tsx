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

type StudioBookProps = {
  shop: ShopWebsiteData;
};

export function StudioBook({ shop }: StudioBookProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
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

  const stepReady = {
    day: dayOffset !== null,
    time: activeTimeId !== null,
  };

  const canConfirm = Boolean(selectedDay && selectedTime);

  const steps = [
    { key: "day", label: locale === "ar" ? "اليوم" : "Day", done: stepReady.day },
    { key: "time", label: locale === "ar" ? "الوقت" : "Time", done: stepReady.time },
  ];

  return (
    <section id="book" className="py-20 lg:py-28">
      <div className="studio-shell">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="studio-eyebrow">{ui.bookBadge}</p>
            <h2 className="studio-title mt-4 text-3xl sm:text-4xl lg:text-5xl">
              {ui.bookTitle}
            </h2>
            <p className="mt-4 text-[var(--studio-muted)]">{ui.bookSubtitle}</p>
          </div>
        </Reveal>

        {/* Progress steps */}
        <Reveal delay={60}>
          <ol className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2">
            {steps.map((step, i) => (
              <li key={step.key} className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-bold transition-colors",
                    step.done
                      ? "bg-[var(--studio-accent)] text-white"
                      : "bg-[var(--studio-bg-soft)] text-[var(--studio-muted)]",
                  )}
                >
                  {step.done ? "✓" : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-semibold sm:inline",
                    step.done ? "text-[var(--studio-ink)]" : "text-[var(--studio-muted)]",
                  )}
                >
                  {step.label}
                </span>
                {i < steps.length - 1 ? (
                  <span className="mx-1 h-px w-6 bg-[var(--studio-line)] sm:w-10" />
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[2rem] border border-[var(--studio-line)] bg-[var(--studio-surface)] shadow-[0_20px_60px_rgb(20_22_26_/_0.06)]">
            <div className="border-b border-[var(--studio-line)] bg-[var(--studio-blush)]/50 px-5 py-4 sm:px-7">
              <p className="text-xs font-bold tracking-wide text-[var(--studio-ink-soft)] uppercase">
                {ui.pickService}
              </p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {shop.categories.map((category) => {
                  const selected = category.id === activeCategory?.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setCategoryId(category.id)}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                        selected
                          ? "bg-[var(--studio-deep)] text-white"
                          : "bg-white text-[var(--studio-ink-soft)] hover:bg-[var(--studio-bg-soft)]",
                      )}
                    >
                      {pickLocale(category.name, locale)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="mb-3 flex justify-end">
                <span className="text-xs text-[var(--studio-muted)]">
                  {ui.pickServiceHint}
                </span>
              </div>

              <ul className="space-y-2">
                {activeCategory?.services.map((service) => {
                  return (
                    <li key={service.id}>
                      <div className="flex w-full items-center gap-3 rounded-2xl border border-[var(--studio-line)] px-4 py-3.5 text-start">
                        <span className="min-w-0 flex-1 text-sm font-semibold">
                          {pickLocale(service.name, locale)}
                        </span>
                        <span className="text-sm font-bold text-[var(--studio-accent)]">
                          {pickLocale(service.price, locale)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 grid gap-6 border-t border-[var(--studio-line)] pt-7 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold tracking-wide text-[var(--studio-ink-soft)] uppercase">
                    01 · {ui.pickDay}
                  </p>
                  <div className="mt-3 space-y-2">
                    {dayOptions.map((day) => {
                      const selected = dayOffset === day.offset;
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
                            "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-colors",
                            !day.isOpen
                              ? "cursor-not-allowed border-[var(--studio-line)] bg-[var(--studio-bg)] text-[var(--studio-muted)] opacity-60"
                              : selected
                              ? "border-[var(--studio-deep)] bg-[var(--studio-deep)] text-white"
                              : "border-[var(--studio-line)] hover:bg-[var(--studio-bg)]",
                          )}
                        >
                          <span className="font-semibold">{day.label}</span>
                          <span
                            className={cn(
                              "text-xs",
                              !day.isOpen
                                ? "text-[var(--studio-muted)]"
                                : selected
                                ? "text-white/70"
                                : "text-[var(--studio-muted)]",
                            )}
                          >
                            {day.isOpen ? day.dateLabel : ui.dayClosed}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-wide text-[var(--studio-ink-soft)] uppercase">
                    02 · {ui.pickTime}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {shop.timeSlots.map((slot) => {
                      const selected = activeTimeId === slot.id;
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
                            "flex flex-col items-center rounded-full border px-2 py-2 text-sm font-semibold transition-colors",
                            booked
                              ? "cursor-not-allowed border-gray-300 bg-gray-200 text-gray-500"
                              : ended || pending
                              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                              : selected
                              ? "border-[var(--studio-accent)] bg-[var(--studio-accent)] text-white"
                              : "border-[var(--studio-line)] hover:border-[var(--studio-accent)]/40",
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
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 border-t border-[var(--studio-line)] pt-7">
                {canConfirm ? (
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="studio-btn studio-btn-primary w-full max-w-sm"
                  >
                    {ui.confirmBooking}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="studio-btn w-full max-w-sm cursor-not-allowed bg-[var(--studio-line)] text-[var(--studio-muted)]"
                  >
                    {ui.confirmBooking}
                  </button>
                )}
                {!canConfirm ? (
                  <p className="text-center text-xs text-[var(--studio-muted)]">
                    {ui.needServiceDayAndTime}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
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
