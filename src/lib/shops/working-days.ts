/** Canonical weekday keys used in shops.working_days. */
export const WEEKDAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type WeekdayKey = (typeof WEEKDAY_KEYS)[number];

export function normalizeWorkingDays(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const days = value
    .filter((day): day is string => typeof day === "string")
    .map((day) => day.trim().toLowerCase())
    .filter(Boolean);

  return WEEKDAY_KEYS.filter((day) => days.includes(day));
}

export function weekdayKeyFromDate(date: Date): WeekdayKey {
  return WEEKDAY_KEYS[date.getDay()];
}

/**
 * Whether the shop accepts bookings on this calendar date.
 * Missing/empty workingDays keeps all days open (legacy shops).
 */
export function isShopOpenOnDate(
  date: Date,
  workingDays?: string[] | null,
): boolean {
  if (!workingDays || workingDays.length === 0) return true;
  return workingDays.includes(weekdayKeyFromDate(date));
}
