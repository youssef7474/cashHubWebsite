"use client";

import { useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { FeatureIcon } from "@/components/icons/FeatureIcons";

export function Features() {
  const t = useTranslation();

  return (
    <section id="features" className="py-[var(--section-py)]">
      <Container>
        <SectionHeader
          badge={t.features.badge}
          title={t.features.title}
          subtitle={t.features.subtitle}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((feature) => (
            <Card key={feature.title} hover>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
                <FeatureIcon name={feature.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
