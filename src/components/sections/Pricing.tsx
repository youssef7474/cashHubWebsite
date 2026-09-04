"use client";

import { useLocale, useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { getWhatsAppUrl } from "@/lib/whatsapp";

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

  return (
    <section id="pricing" className="py-[var(--section-py)]">
      <Container>
        <SectionHeader
          badge={t.pricing.badge}
          title={t.pricing.title}
          subtitle={t.pricing.subtitle}
        />

        {/* Core plans */}
        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
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

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-brand-900">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
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
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-brand-900">
                  {t.pricing.addon.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t.pricing.addon.period}
                </span>
              </div>
              <Button variant="outline" href={whatsappUrl} className="w-full sm:w-auto">
                {t.pricing.addon.cta}
              </Button>
            </div>
          </div>
        </div>

        {/* Social media packages */}
        <div className="mt-20">
          <SectionHeader
            title={t.pricing.social.title}
            subtitle={t.pricing.social.subtitle}
          />

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
      </Container>
    </section>
  );
}
