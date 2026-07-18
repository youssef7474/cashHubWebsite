"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n";
import { getBarberUi } from "@/themes/barber/ui";
import {
  createReservation,
  findClientByPhone,
} from "@/lib/reservations/actions";

type LookupState =
  | { phase: "idle" }
  | { phase: "checking" }
  | { phase: "found"; clientId: string; name: string }
  | { phase: "not_found" }
  | { phase: "invalid" }
  | { phase: "error" };

export type ReservationModalProps = {
  open: boolean;
  onClose: () => void;
  onAvailabilityChanged?: () => void;
  shopId: string;
  locale: Locale;
  dayText: string;
  /** YYYY-MM-DD reservation date. */
  dateISO: string;
  timeText: string;
  /** 24-hour HH:MM slot value. */
  time24: string;
};

export function ReservationModal(props: ReservationModalProps) {
  // Mount the dialog only while open so its form state resets between uses.
  if (!props.open) return null;
  return <ReservationDialog {...props} />;
}

function ReservationDialog({
  onClose,
  onAvailabilityChanged,
  shopId,
  locale,
  dayText,
  dateISO,
  timeText,
  time24,
}: ReservationModalProps) {
  const ui = getBarberUi(locale);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [lookup, setLookup] = useState<LookupState>({ phase: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    "success" | "error" | "duplicate" | "slot_booked" | null
  >(null);
  const [nameError, setNameError] = useState(false);
  const lookupSeq = useRef(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [onClose]);

  const handlePhoneChange = (value: string) => {
    setPhone(value);

    const seq = ++lookupSeq.current;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    const digits = value.replace(/\D/g, "");
    if (digits.length < 8) {
      setLookup({ phase: "idle" });
      return;
    }

    setLookup({ phase: "checking" });
    debounceTimer.current = setTimeout(async () => {
      const res = await findClientByPhone(shopId, digits);
      if (seq !== lookupSeq.current) return;
      if (res.status === "found") {
        setLookup({ phase: "found", clientId: res.clientId, name: res.name });
        setName(res.name);
        setNameError(false);
      } else if (res.status === "not_found") {
        setLookup({ phase: "not_found" });
        setName("");
      } else if (res.status === "invalid_phone") {
        setLookup({ phase: "invalid" });
      } else {
        setLookup({ phase: "error" });
      }
    }, 450);
  };

  const found = lookup.phase === "found";
  const isNew = lookup.phase === "not_found";
  const nameDisabled = !isNew;
  const canSubmit =
    !submitting &&
    result !== "success" &&
    (found || (isNew && name.trim().length > 0));

  const handleSubmit = async () => {
    if (isNew && !name.trim()) {
      setNameError(true);
      return;
    }
    setSubmitting(true);
    setResult(null);
    const res = await createReservation({
      shopId,
      phone,
      name,
      clientId: found ? lookup.clientId : null,
      date: dateISO,
      time: time24,
    });
    setSubmitting(false);
    if (res.ok) {
      setResult("success");
      onAvailabilityChanged?.();
    } else if (res.error === "duplicate_daily_reservation") {
      setResult("duplicate");
    } else if (res.error === "slot_fully_booked") {
      setResult("slot_booked");
      onAvailabilityChanged?.();
    } else {
      setResult("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={ui.modalTitle}
    >
      <button
        type="button"
        aria-label={ui.modalClose}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 text-gray-900 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold">{ui.modalTitle}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.modalClose}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Booking summary */}
        <dl className="mt-5 space-y-2.5 rounded-2xl bg-gray-50 p-4 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="font-medium text-gray-500">{ui.modalSummaryDay}</dt>
            <dd className="text-end font-semibold">{dayText}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="font-medium text-gray-500">{ui.modalSummaryTime}</dt>
            <dd className="text-end font-semibold">{timeText}</dd>
          </div>
        </dl>

        {/* Phone */}
        <div className="mt-5">
          <label
            htmlFor="reservation-phone"
            className="mb-1.5 block text-sm font-semibold"
          >
            {ui.modalPhoneLabel}
          </label>
          <input
            id="reservation-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={ui.modalPhonePlaceholder}
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors",
              locale === "ar" ? "text-end" : "text-start",
              lookup.phase === "invalid"
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-gray-900",
            )}
          />
          <p
            className={cn(
              "mt-1.5 min-h-5 text-xs",
              found ? "text-green-600" : "text-gray-500",
              (lookup.phase === "invalid" || lookup.phase === "error") &&
                "text-red-500",
            )}
          >
            {lookup.phase === "checking"
              ? ui.modalChecking
              : found
                ? ui.modalWelcomeBack(lookup.name)
                : isNew
                  ? ui.modalNewClient
                  : lookup.phase === "invalid"
                    ? ui.modalInvalidPhone
                    : lookup.phase === "error"
                      ? ui.modalLookupError
                      : ""}
          </p>
        </div>

        {/* Name */}
        <div className="mt-2">
          <label
            htmlFor="reservation-name"
            className="mb-1.5 block text-sm font-semibold"
          >
            {ui.modalNameLabel}
          </label>
          <input
            id="reservation-name"
            type="text"
            autoComplete="name"
            value={name}
            disabled={nameDisabled}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.trim()) setNameError(false);
            }}
            placeholder={isNew ? ui.modalNamePlaceholder : ""}
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors",
              nameDisabled
                ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-500"
                : nameError
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-gray-900",
            )}
          />
          {nameError ? (
            <p className="mt-1.5 text-xs text-red-500">{ui.modalNameRequired}</p>
          ) : null}
        </div>

        {/* Result feedback */}
        {result === "success" ? (
          <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            {ui.modalSuccess}
          </p>
        ) : result === "error" ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {ui.modalError}
          </p>
        ) : result === "duplicate" ? (
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
            {ui.modalDuplicateReservation}
          </p>
        ) : result === "slot_booked" ? (
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
            {ui.modalSlotFullyBooked}
          </p>
        ) : null}

        <div className="mt-5 flex gap-3">
          {result === "success" ? (
            <button
              type="button"
              onClick={onClose}
              className="h-11 flex-1 rounded-full bg-gray-900 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              {ui.modalClose}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="h-11 flex-1 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
              >
                {ui.modalCancel}
              </button>
              <button
                type="button"
                disabled={!canSubmit}
                onClick={handleSubmit}
                className="h-11 flex-1 rounded-full bg-gray-900 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-40"
              >
                {submitting ? ui.modalSubmitting : ui.modalSubmit}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
