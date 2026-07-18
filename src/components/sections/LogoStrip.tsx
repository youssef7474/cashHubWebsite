"use client";

import { useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";

export function LogoStrip() {
  const t = useTranslation();

  return (
    <section className="border-y border-border-subtle bg-white py-10">
      <Container>
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          {t.logos.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {t.logos.items.map((salon) => (
            <span
              key={salon.name}
              className="text-sm font-semibold tracking-wide text-brand-300 uppercase"
            >
              {salon.name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
