import type { LocalizedString } from "./types";

export type TimePeriod = "AM" | "PM";

const TIME_24_PATTERN = /^(\d{2}):(\d{2})$/;

/**
 * Normalizes database time values such as "09:30:00" to the stored "HH:MM"
 * representation and rejects invalid clock values.
 */
export function normalizeTime24(timeStr: string): string {
  const value = timeStr.slice(0, 5);
  const match = TIME_24_PATTERN.exec(value);

  if (!match) {
    throw new RangeError(`Invalid time "${timeStr}". Expected HH:MM.`);
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) {
    throw new RangeError(`Invalid time "${timeStr}". Expected HH:MM.`);
  }

  return value;
}

export function time24ToMinutes(timeStr: string): number {
  const normalized = normalizeTime24(timeStr);
  const [hour, minute] = normalized.split(":").map(Number);
  return hour * 60 + minute;
}

export function hasTimeSlotEnded(
  timeStr: string,
  dayOffset: number | null,
  now = new Date(),
): boolean {
  if (dayOffset !== null && dayOffset !== 0) return false;

  return time24ToMinutes(timeStr) <= now.getHours() * 60 + now.getMinutes();
}

export function formatTimeFriendly(
  timeStr: string,
  locale: "ar" | "en",
): string {
  const normalized = normalizeTime24(timeStr);

  if (normalized === "00:00") {
    return locale === "ar" ? "12 منتصف الليل" : "12 Midnight";
  }

  if (normalized === "12:00") {
    return locale === "ar" ? "12 الظهر" : "12 Noon";
  }

  const [hour, minute] = normalized.split(":").map(Number);
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const minutePart = minute > 0 ? `:${String(minute).padStart(2, "0")}` : "";
  const period =
    locale === "ar"
      ? hour >= 12
        ? "مساءً"
        : "صباحاً"
      : hour >= 12
        ? "PM"
        : "AM";

  return `${hour12}${minutePart} ${period}`;
}

export function localizedFriendlyTime(timeStr: string): LocalizedString {
  return {
    ar: formatTimeFriendly(timeStr, "ar"),
    en: formatTimeFriendly(timeStr, "en"),
  };
}

export function toTime24(
  hour12: number,
  minute: number,
  period: TimePeriod,
): string {
  if (!Number.isInteger(hour12) || hour12 < 1 || hour12 > 12) {
    throw new RangeError("hour12 must be an integer from 1 to 12.");
  }

  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new RangeError("minute must be an integer from 0 to 59.");
  }

  if (period !== "AM" && period !== "PM") {
    throw new RangeError('period must be either "AM" or "PM".');
  }

  let hour24 = hour12 % 12;
  if (period === "PM") hour24 += 12;

  return `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export type ReservationSchedule = {
  /** Slot start times stored as zero-padded 24-hour HH:MM strings. */
  slots: string[];
  slotCount: number;
  totalBookings: number;
};

export function generateReservationSchedule(
  from: string,
  to: string,
  slotIntervalMinutes: number,
  numberOfChairs: number,
): ReservationSchedule {
  const start = time24ToMinutes(from);
  let end = time24ToMinutes(to);

  // Overnight shops (e.g. 12:00 → 03:00) wrap past midnight.
  if (end < start) {
    end += 24 * 60;
  }

  if (end <= start) {
    throw new RangeError("Working-hours end must be later than start.");
  }

  if (!Number.isInteger(slotIntervalMinutes) || slotIntervalMinutes < 15) {
    throw new RangeError("Slot interval must be an integer of at least 15 minutes.");
  }

  if (!Number.isInteger(numberOfChairs) || numberOfChairs < 1) {
    throw new RangeError("Number of chairs must be a positive integer.");
  }

  const totalMinutes = end - start;
  const slotCount = Math.floor(totalMinutes / slotIntervalMinutes);
  if (slotCount < 1) {
    throw new RangeError("Slot interval is too large for the working hours.");
  }

  const slots = Array.from({ length: slotCount }, (_, index) => {
    const total = start + index * slotIntervalMinutes;
    const hour = Math.floor(total / 60) % 24;
    const minute = total % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  });

  return {
    slots,
    slotCount,
    totalBookings: slotCount * numberOfChairs,
  };
}
