"use client";

import { useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils/cn";

function AudienceCard({
  title,
  description,
  highlights,
  variant,
}: {
  title: string;
  description: string;
  highlights: string[];
  variant: "barber" | "salon";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-8 lg:p-10",
        variant === "barber"
          ? "border-brand-200 bg-brand-900 text-white"
          : "border-rose-200 bg-gradient-to-br from-rose-100 to-white"
      )}
    >
      <div
        className={cn(
          "mb-6 inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider",
          variant === "barber"
            ? "bg-accent-500/20 text-accent-300"
            : "bg-rose-500/10 text-rose-500"
        )}
      >
        {variant === "barber" ? "✂️" : "💅"} {title}
      </div>

      <p
        className={cn(
          "text-base leading-relaxed",
          variant === "barber" ? "text-brand-300" : "text-brand-600"
        )}
      >
        {description}
      </p>

      <ul className="mt-8 space-y-3">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs",
                variant === "barber"
                  ? "bg-accent-500 text-brand-950"
                  : "bg-rose-500 text-white"
              )}
            >
              ✓
            </span>
            <span className={variant === "barber" ? "text-brand-200" : "text-brand-700"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Audience() {
  const t = useTranslation();

  return (
    <section className="bg-white py-[var(--section-py)]">
      <Container>
        <SectionHeader
          badge={t.audience.badge}
          title={t.audience.title}
          subtitle={t.audience.subtitle}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <AudienceCard
            variant="barber"
            title={t.audience.barbers.title}
            description={t.audience.barbers.description}
            highlights={t.audience.barbers.highlights}
          />
          <AudienceCard
            variant="salon"
            title={t.audience.salons.title}
            description={t.audience.salons.description}
            highlights={t.audience.salons.highlights}
          />
        </div>
      </Container>
    </section>
  );
}
