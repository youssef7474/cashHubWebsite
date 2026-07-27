"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils/cn";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { hasTimeSlotEnded } from "@/lib/shops/time";
import { ReservationModal } from "@/components/reservation/ReservationModal";
import { useBookedSlots } from "@/components/reservation/useBookedSlots";
import { ClockIcon } from "@/themes/barber/icons";
import {
  getBarberUi,
  getBookingDayOptions,
  getDefaultBookingDayOffset,
  type BookingDayOffset,
} from "@/themes/barber/ui";

type MidnightReservationProps = {
  shop: ShopWebsiteData;
};

export function MidnightReservation({ shop }: MidnightReservationProps) {
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
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    shop.categories[0]?.id ?? "all",
  );
  const [dayOffset, setDayOffset] = useState<BookingDayOffset | null>(() =>
    getDefaultBookingDayOffset(dayOptions),
  );
  const [timeId, setTimeId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const activeCategory =
    activeCategoryId === "all"
      ? null
      : shop.categories.find((c) => c.id === activeCategoryId);

  const visibleCategories = activeCategory
    ? [activeCategory]
    : shop.categories;

  const canConfirm = Boolean(selectedDay && selectedTime);

  return (
    <section
      id="reservation"
      className="border-t border-brand-800 py-[var(--section-py)]"
    >
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge className="border-accent-500/30 bg-accent-500/10 text-accent-400">
              {ui.bookBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-brand-50 sm:text-4xl">
              {ui.bookTitle}
            </h2>
            <p className="text-lg leading-relaxed text-brand-400">
              {ui.bookSubtitle}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-8">
          <Reveal delay={60}>
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-wide text-brand-400 uppercase">
                  {ui.pickService}
                </h3>
                <span className="text-xs text-brand-500">
                  {ui.pickServiceHint}
                </span>
              </div>

              <div
                className="mb-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label={ui.pickCategory}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategoryId === "all"}
                  onClick={() => setActiveCategoryId("all")}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    activeCategoryId === "all"
                      ? "bg-accent-500 text-brand-950"
                      : "bg-brand-900 text-brand-300 hover:bg-brand-800",
                  )}
                >
                  {ui.allCategories}
                </button>
                {shop.categories.map((category) => {
                  return (
                    <button
                      key={category.id}
                      type="button"
                      role="tab"
                      aria-selected={activeCategoryId === category.id}
                      onClick={() => setActiveCategoryId(category.id)}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        activeCategoryId === category.id
                          ? "bg-accent-500 text-brand-950"
                          : "bg-brand-900 text-brand-300 hover:bg-brand-800",
                      )}
                    >
                      {pickLocale(category.name, locale)}
                    </button>
                  );
                })}
              </div>

              <div className="overflow-hidden rounded-2xl border border-brand-800 bg-brand-900/50">
                {visibleCategories.map((category, catIndex) => (
                  <div
                    key={category.id}
                    className={cn(catIndex > 0 && "border-t border-brand-800")}
                  >
                    {activeCategoryId === "all" ? (
                      <div className="bg-brand-950/60 px-4 py-2.5">
                        <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">
                          {pickLocale(category.name, locale)}
                        </p>
                      </div>
                    ) : null}

                    <ul className="divide-y divide-brand-800">
                      {category.services.map((service) => {
                        return (
                          <li key={service.id}>
                            <div className="flex w-full items-center gap-3 px-4 py-3.5 text-start">
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-brand-50">
                                  {pickLocale(service.name, locale)}
                                </span>
                                <span className="mt-0.5 block text-xs leading-relaxed text-brand-500">
                                  {pickLocale(service.description, locale)}
                                </span>
                              </span>
                              <span className="shrink-0 text-sm font-bold text-accent-400">
                                {pickLocale(service.price, locale)}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-brand-400 uppercase">
                {ui.pickDay}
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-3">
                {dayOptions.map((day) => {
                  const selected = dayOffset === day.offset;
                  return (
                    <li key={day.offset}>
                      <button
                        type="button"
                        disabled={!day.isOpen}
                        onClick={() => {
                          if (!day.isOpen) return;
                          setDayOffset(day.offset);
                          setTimeId(null);
                        }}
                        className={cn(
                          "flex w-full flex-col items-start rounded-2xl border px-4 py-3.5 text-start transition-all duration-200",
                          !day.isOpen
                            ? "cursor-not-allowed border-brand-900 bg-brand-950/60 text-brand-700"
                            : selected
                            ? "border-accent-500/50 bg-accent-500/10"
                            : "border-brand-800 bg-brand-900/40 hover:border-brand-700",
                        )}
                      >
                        <span
                          className={cn(
                            "text-sm font-semibold",
                            day.isOpen ? "text-brand-50" : "text-brand-700",
                          )}
                        >
                          {day.label}
                        </span>
                        <span className="mt-1 text-xs text-brand-500">
                          {day.isOpen ? day.dateLabel : ui.dayClosed}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-400 uppercase">
                <ClockIcon className="h-4 w-4 text-accent-400" />
                {ui.pickTime}
              </h3>
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {shop.timeSlots.map((slot) => {
                  const selected = activeTimeId === slot.id;
                  const ended =
                    !selectedDay || hasTimeSlotEnded(slot.id, dayOffset);
                  const booked = Boolean(selectedDay) && bookedSlots.has(slot.id);
                  const pending = Boolean(selectedDay) && slotsLoading;
                  const disabled = !selectedDay || ended || booked || pending;
                  return (
                    <li key={slot.id}>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => setTimeId(slot.id)}
                        className={cn(
                          "flex w-full flex-col items-center rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200",
                          booked
                            ? "cursor-not-allowed border-brand-700 bg-brand-800/70 text-brand-500"
                            : ended || pending
                            ? "cursor-not-allowed border-brand-800 bg-brand-900/30 text-brand-600"
                            : selected
                            ? "border-accent-500 bg-accent-500 text-brand-950"
                            : "border-brand-700 bg-brand-900/40 text-brand-300 hover:border-brand-600",
                        )}
                      >
                        {pickLocale(slot.label, locale)}
                        {booked ? (
                          <span className="text-[10px] font-semibold uppercase">
                            {ui.slotFullyBooked}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="flex flex-col items-center gap-3 border-t border-brand-800 pt-8">
              <Button
                variant="secondary"
                size="lg"
                disabled={!canConfirm}
                onClick={() => setModalOpen(true)}
              >
                {ui.confirmBooking}
              </Button>
              {!canConfirm ? (
                <p className="text-sm text-brand-500">
                  {ui.needServiceDayAndTime}
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>

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
