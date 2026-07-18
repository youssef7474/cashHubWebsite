"use client";

import { useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowItWorks() {
  const t = useTranslation();

  return (
    <section className="bg-white py-[var(--section-py)]">
      <Container>
        <SectionHeader
          badge={t.howItWorks.badge}
          title={t.howItWorks.title}
          subtitle={t.howItWorks.subtitle}
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute top-12 hidden h-0.5 w-full bg-gradient-to-r from-transparent via-accent-300 to-transparent md:block" />

          {t.howItWorks.steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-900 text-xl font-bold text-accent-400 shadow-lg">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-brand-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
