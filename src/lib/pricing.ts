/**
 * Subscription prices per country and billing period.
 *
 * Monthly prices are the base; longer periods are paid up front with a
 * discount. Discounted totals round *down* to a clean number, so the visitor
 * always gets at least the advertised discount.
 */

export type PricingCountry = "EG" | "SA";
export type BillingPeriod = "monthly" | "quarterly" | "halfYearly" | "yearly";
export type PricedItem = "Starter" | "Pro" | "website";

export const PRICING_COUNTRIES: readonly PricingCountry[] = ["EG", "SA"];

export const BILLING_PERIODS: readonly {
  key: BillingPeriod;
  months: number;
  /** Fraction off the full price, e.g. 0.2 = 20%. */
  discount: number;
}[] = [
  { key: "monthly", months: 1, discount: 0 },
  { key: "quarterly", months: 3, discount: 0.05 },
  { key: "halfYearly", months: 6, discount: 0.1 },
  { key: "yearly", months: 12, discount: 0.2 },
];

const COUNTRY_PRICING: Record<
  PricingCountry,
  { monthly: Record<PricedItem, number>; roundTo: number; flag: string }
> = {
  EG: { monthly: { Starter: 400, Pro: 600, website: 250 }, roundTo: 5, flag: "/flags/eg.svg" },
  SA: { monthly: { Starter: 60, Pro: 70, website: 50 }, roundTo: 1, flag: "/flags/sa.svg" },
};

export function countryFlag(country: PricingCountry): string {
  return COUNTRY_PRICING[country].flag;
}

export type PeriodPrice = {
  /** What the visitor pays for the whole period. */
  total: number;
  /** Full price for the period before the discount (same as total when monthly). */
  original: number;
  /** total ÷ months, for the "that's X per month" hint. */
  perMonth: number;
  months: number;
  /** Whole-number percentage, e.g. 20. */
  discountPercent: number;
};

export function priceFor(
  country: PricingCountry,
  item: PricedItem,
  period: BillingPeriod,
): PeriodPrice {
  const { monthly, roundTo } = COUNTRY_PRICING[country];
  const { months, discount } = BILLING_PERIODS.find((p) => p.key === period) ?? BILLING_PERIODS[0];
  const original = monthly[item] * months;
  const total = Math.floor((original * (1 - discount)) / roundTo) * roundTo;
  return {
    total,
    original,
    perMonth: Math.round(total / months),
    months,
    discountPercent: Math.round(discount * 100),
  };
}

/** Visitors whose device is set to a Saudi time zone start on Saudi prices. */
export function detectPricingCountry(): PricingCountry {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return zone === "Asia/Riyadh" ? "SA" : "EG";
  } catch {
    return "EG";
  }
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
