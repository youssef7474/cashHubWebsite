"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils/cn";
import type { ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { hasTimeSlotEnded } from "@/lib/shops/time";
import { ReservationModal } from "@/components/reservation/ReservationModal";
import { useBookedSlots } from "@/components/reservation/useBookedSlots";
import { ClockIcon } from "./icons";
import {
  getBarberUi,
  getBookingDayOptions,
  type BookingDayOffset,
} from "./ui";

type BarberReservationProps = {
  shop: ShopWebsiteData;
};

export function BarberReservation({ shop }: BarberReservationProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const dayOptions = useMemo(() => getBookingDayOptions(locale), [locale]);
  const bookingDates = useMemo(
    () => dayOptions.map((d) => d.dateISO),
    [dayOptions],
  );
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    shop.categories[0]?.id ?? "all",
  );
  const [dayOffset, setDayOffset] = useState<BookingDayOffset | null>(0);
  const [timeId, setTimeId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
      className="border-t border-border-subtle bg-white py-[var(--section-py)]"
    >
      <Container>
        <Reveal>
          <SectionHeader
            badge={ui.bookBadge}
            title={ui.bookTitle}
            subtitle={ui.bookSubtitle}
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-8">
          <Reveal delay={60}>
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-wide text-brand-700 uppercase">
                  {ui.pickService}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {ui.pickServiceHint}
                </span>
              </div>

              {/* Category tabs */}
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
                      ? "bg-brand-900 text-white"
                      : "bg-brand-100 text-brand-700 hover:bg-brand-200",
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
                          ? "bg-brand-900 text-white"
                          : "bg-brand-100 text-brand-700 hover:bg-brand-200",
                      )}
                    >
                      {pickLocale(category.name, locale)}
                    </button>
                  );
                })}
              </div>

              {/* Compact service list */}
              <div className="overflow-hidden rounded-2xl border border-brand-200 bg-white">
                {visibleCategories.map((category, catIndex) => (
                  <div
                    key={category.id}
                    className={cn(
                      catIndex > 0 && "border-t border-brand-100",
                    )}
                  >
                    {activeCategoryId === "all" ? (
                      <div className="bg-brand-50/80 px-4 py-2.5">
                        <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">
                          {pickLocale(category.name, locale)}
                        </p>
                      </div>
                    ) : null}

                    <ul className="divide-y divide-brand-100">
                      {category.services.map((service) => {
                        return (
                          <li key={service.id}>
                            <div className="flex w-full items-center gap-3 px-4 py-3.5 text-start">
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-brand-900">
                                  {pickLocale(service.name, locale)}
                                </span>
                                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                                  {pickLocale(service.description, locale)}
                                </span>
                              </span>
                              <span className="shrink-0 text-sm font-bold text-accent-600">
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
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-brand-700 uppercase">
                {ui.pickDay}
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-3">
                {dayOptions.map((day) => {
                  const selected = dayOffset === day.offset;
                  return (
                    <li key={day.offset}>
                      <button
                        type="button"
                        onClick={() => {
                          setDayOffset(day.offset);
                          setTimeId(null);
                        }}
                        className={cn(
                          "flex w-full flex-col items-start rounded-2xl border px-4 py-3.5 text-start transition-all duration-200",
                          selected
                            ? "border-accent-400 bg-accent-100/70 shadow-sm"
                            : "border-brand-200 bg-white hover:border-brand-300",
                        )}
                      >
                        <span className="text-sm font-semibold text-brand-900">
                          {day.label}
                        </span>
                        <span className="mt-1 text-xs text-muted-foreground">
                          {day.dateLabel}
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
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-700 uppercase">
                <ClockIcon className="h-4 w-4 text-accent-600" />
                {ui.pickTime}
              </h3>
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {shop.timeSlots.map((slot) => {
                  const selected = activeTimeId === slot.id;
                  const ended = hasTimeSlotEnded(slot.id, dayOffset);
                  const booked = Boolean(selectedDay) && bookedSlots.has(slot.id);
                  const pending = Boolean(selectedDay) && slotsLoading;
                  const disabled = ended || booked || pending;
                  return (
                    <li key={slot.id}>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => setTimeId(slot.id)}
                        className={cn(
                          "flex w-full flex-col items-center rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200",
                          booked
                            ? "cursor-not-allowed border-gray-300 bg-gray-200 text-gray-500"
                            : ended || pending
                            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                            : selected
                            ? "border-brand-900 bg-brand-900 text-white"
                            : "border-brand-200 bg-white text-brand-700 hover:border-brand-300",
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
            <div className="flex flex-col items-center gap-3 border-t border-brand-100 pt-8">
              <Button
                variant="secondary"
                size="lg"
                disabled={!canConfirm}
                onClick={() => setModalOpen(true)}
              >
                {ui.confirmBooking}
              </Button>
              {!canConfirm ? (
                <p className="text-sm text-muted-foreground">
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
