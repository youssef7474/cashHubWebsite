"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useLocale, useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  BILLING_PERIODS,
  PRICING_COUNTRIES,
  countryFlag,
  detectPricingCountry,
  formatPrice,
  priceFor,
  type BillingPeriod,
  type PricedItem,
  type PricingCountry,
} from "@/lib/pricing";
import type { Dictionary } from "@/lib/i18n/types";

type PricingTexts = Dictionary["pricing"];

// The time zone never changes during a visit, so there is nothing to subscribe to.
const subscribeNever = () => () => {};

function Flag({ country, className }: { country: PricingCountry; className?: string }) {
  return (
    <Image
      src={countryFlag(country)}
      alt=""
      width={24}
      height={18}
      unoptimized
      className={cn("h-[18px] w-6 shrink-0 rounded-[3px] shadow-sm ring-1 ring-black/10", className)}
    />
  );
}

/** Two-option pill switch used for country and billing period. */
function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; content: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-brand-200 bg-white p-1 shadow-sm">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
              active ? "bg-brand-900 text-white shadow" : "text-brand-700 hover:bg-brand-50",
            )}
          >
            {option.content}
          </button>
        );
      })}
    </div>
  );
}

/** Period price: the full price crossed out, what you pay, and the per-month hint. */
function PeriodPrice({
  texts,
  country,
  period,
  item,
  align = "start",
}: {
  texts: PricingTexts["controls"];
  country: PricingCountry;
  period: BillingPeriod;
  item: PricedItem;
  align?: "start" | "end";
}) {
  const price = priceFor(country, item, period);
  const currency = texts.currency[country];
  const discounted = price.total < price.original;

  return (
    <div className={cn("flex flex-col gap-1.5", align === "end" ? "items-start sm:items-end" : "items-start")}>
      {discounted ? (
        <div className="flex items-center gap-2">
          <span className="text-base text-muted-foreground line-through decoration-2">
            {formatPrice(price.original)} {currency}
          </span>
          <span className="rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-bold text-accent-600">
            {texts.save.replace("{percent}", String(price.discountPercent))}
          </span>
        </div>
      ) : null}
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-brand-900">{formatPrice(price.total)}</span>
        <span className="text-sm text-muted-foreground">
          {currency} {texts.per[period]}
        </span>
      </div>
      {price.months > 1 ? (
        <span className="text-xs text-muted-foreground">
          {texts.perMonth.replace("{price}", formatPrice(price.perMonth)).replace("{currency}", currency)}
        </span>
      ) : null}
    </div>
  );
}

function StarBadge({ label }: { label: string }) {
  return (
    <div className="absolute -top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2">
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-linear-to-r from-accent-400 to-accent-500 px-5 py-1.5 text-xs font-bold text-brand-950 shadow-lg shadow-accent-500/30 ring-2 ring-white">
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.11l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
        {label}
      </span>
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs text-accent-600">
      ✓
    </span>
  );
}

export function Pricing() {
  const t = useTranslation();
  const { locale } = useLocale();
  const whatsappUrl = getWhatsAppUrl(locale);
  const controls = t.pricing.controls;
  // Saudi visitors start on Saudi prices; the server renders Egypt, and the
  // browser's time zone takes over on hydration. A flag click overrides it.
  const detectedCountry = useSyncExternalStore(
    subscribeNever,
    detectPricingCountry,
    () => "EG" as PricingCountry,
  );
  const [chosenCountry, setCountry] = useState<PricingCountry | null>(null);
  const country = chosenCountry ?? detectedCountry;
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <section id="pricing" className="py-[var(--section-py)]">
      <Container>
        <SectionHeader
          badge={t.pricing.badge}
          title={t.pricing.title}
          subtitle={t.pricing.subtitle}
        />

        <div className="mt-10 flex flex-col items-center gap-3">
          <Segmented
            label={controls.countryLabel}
            value={country}
            onChange={setCountry}
            options={PRICING_COUNTRIES.map((code) => ({
              value: code,
              content: (
                <>
                  <Flag country={code} />
                  {controls.countries[code]}
                </>
              ),
            }))}
          />
          <Segmented
            label={controls.periodLabel}
            value={period}
            onChange={setPeriod}
            options={BILLING_PERIODS.map(({ key, discount }) => ({
              value: key,
              content: (
                <>
                  {controls.periods[key]}
                  {discount > 0 ? (
                    <span dir="ltr" className="rounded-full bg-accent-100 px-1.5 text-[11px] font-bold text-accent-600">
                      −{Math.round(discount * 100)}%
                    </span>
                  ) : null}
                </>
              ),
            }))}
          />
        </div>

        {/* Core plans */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {t.pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 pt-10 transition-shadow",
                plan.highlighted
                  ? "border-accent-400 bg-white shadow-xl ring-1 ring-accent-400/30"
                  : "border-brand-200 bg-white shadow-sm hover:shadow-md"
              )}
            >
              {plan.badge && <StarBadge label={plan.badge} />}

              <h3 className="text-lg font-bold text-brand-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

              <div className="mt-6">
                <PeriodPrice
                  texts={controls}
                  country={country}
                  period={period}
                  item={plan.name === "Pro" ? "Pro" : "Starter"}
                />
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-brand-700">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "secondary" : "outline"}
                className="mt-8 w-full"
                href={whatsappUrl}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Website-only add-on */}
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-brand-200 bg-brand-50/60 p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-brand-900">
                {t.pricing.addon.name}
              </h3>

              <ul className="mt-5 space-y-3">
                {t.pricing.addon.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-700">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
              <PeriodPrice texts={controls} country={country} period={period} item="website" align="end" />
              <Button variant="outline" href={whatsappUrl} className="w-full sm:w-auto">
                {t.pricing.addon.cta}
              </Button>
            </div>
          </div>
        </div>

        {/* Social media packages and bundles — offered in Egypt only */}
        {country === "EG" ? (
        <>
        <div className="mt-20">
          <SectionHeader
            title={t.pricing.social.title}
            subtitle={t.pricing.social.subtitle}
          />

          <p className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-semibold text-brand-800 shadow-sm">
            <Flag country="EG" />
            {controls.socialEgyptOnly}
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {t.pricing.social.plans.map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col rounded-2xl border border-brand-200 bg-white p-8 shadow-sm"
              >
                <h3 className="text-lg font-bold text-brand-900">{plan.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent-500">
                  {plan.includesNote}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-brand-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {plan.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center gap-1 rounded-xl bg-brand-50 px-2 py-4 text-center"
                    >
                      <span className="text-2xl font-extrabold text-brand-900">
                        {stat.value}
                      </span>
                      <span className="text-xs leading-tight text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3 text-sm text-brand-700">
                  <CheckIcon />
                  {plan.editingLabel}
                </div>

                <Button variant="outline" className="mt-8 w-full" href={whatsappUrl}>
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50 px-6 py-5 text-center">
            <p className="text-sm font-semibold leading-relaxed text-amber-900 sm:text-base">
              {t.pricing.social.note}
            </p>
            <p className="text-sm font-semibold leading-relaxed text-amber-900 sm:text-base">
              {t.pricing.social.trialNote}
            </p>
          </div>
        </div>

        {/* Bundles */}
        <div className="mt-20">
          <SectionHeader
            title={t.pricing.bundles.title}
            subtitle={t.pricing.bundles.subtitle}
          />

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {t.pricing.bundles.items.map((bundle) => (
              <div
                key={bundle.name}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-8 pt-10 transition-shadow",
                  bundle.highlighted
                    ? "border-accent-400 bg-white shadow-xl ring-1 ring-accent-400/30"
                    : "border-brand-200 bg-white shadow-sm hover:shadow-md"
                )}
              >
                {bundle.badge && <StarBadge label={bundle.badge} />}

                <h3 className="text-lg font-bold text-brand-900">{bundle.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {bundle.description}
                </p>

                <div className="mt-6 flex flex-wrap items-baseline gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    {bundle.originalPrice}
                  </span>
                  <span className="text-4xl font-extrabold text-brand-900">
                    {bundle.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {bundle.period}
                  </span>
                </div>

                <span className="mt-3 inline-flex w-fit items-center rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-600">
                  {bundle.savings}
                </span>

                {bundle.noTrialNote && (
                  <p className="mt-4 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {bundle.noTrialNote}
                  </p>
                )}

                <Button
                  variant={bundle.highlighted ? "secondary" : "outline"}
                  className={cn("w-full", bundle.noTrialNote ? "mt-6" : "mt-8")}
                  href={whatsappUrl}
                >
                  {bundle.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
        </>
        ) : null}
      </Container>
    </section>
  );
}
