"use client";

import { useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Testimonials() {
  const t = useTranslation();

  return (
    <section className="bg-white py-[var(--section-py)]">
      <Container>
        <SectionHeader
          badge={t.testimonials.badge}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item) => (
            <blockquote
              key={item.name}
              className="flex flex-col rounded-2xl border border-brand-200 bg-brand-50 p-8"
            >
              <div className="mb-4 flex gap-0.5 text-accent-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-brand-700">
                &ldquo;{item.quote}&rdquo;
              </p>

              <footer className="mt-6 border-t border-brand-200 pt-4">
                <div className="font-bold text-brand-900">{item.name}</div>
                <div className="text-xs text-muted-foreground">
                  {item.role} — {item.business}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
