"use client";

import { useLocale, useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { getWhatsAppUrl } from "@/lib/whatsapp";

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

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
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
              {plan.highlighted && (
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
                    {t.pricing.popular}
                  </span>
                </div>
              )}

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
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs text-accent-600">
                      ✓
                    </span>
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

          {[0, 1].map((placeholder) => (
            <div
              key={placeholder}
              className="relative flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-2xl border border-brand-200/80 bg-linear-to-b from-brand-50 to-white p-8 text-center"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 0%, var(--color-accent-100, rgba(0,0,0,0.04)) 0%, transparent 60%)",
                }}
              />

              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-brand-200">
                <svg
                  className="h-6 w-6 text-brand-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </div>

              <span className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
                </span>
                {t.pricing.comingSoon}
              </span>

              <p className="relative mt-3 max-w-52 text-sm text-muted-foreground">
                {t.pricing.comingSoonDescription}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
