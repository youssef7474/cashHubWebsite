"use client";

import Image, { type StaticImageData } from "next/image";
import { useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import cashierScreenshot from "@/assets/images/cashier.png";
import profitLossScreenshot from "@/assets/images/profit-loss.png";
import reportsScreenshot from "@/assets/images/reports.png";

type DemoShot = {
  src: StaticImageData;
  alt: string;
};

export function Demo() {
  const t = useTranslation();

  const gridShots: DemoShot[] = [
    { src: cashierScreenshot, alt: t.demo.screenshots.cashier },
    { src: reportsScreenshot, alt: t.demo.screenshots.reports },
  ];

  return (
    <section id="demo" className="py-[var(--section-py)]">
      <Container>
        <SectionHeader
          badge={t.demo.badge}
          title={t.demo.title}
          subtitle={t.demo.subtitle}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {gridShots.map((shot) => (
            <div
              key={shot.alt}
              className="group overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-lg">
          <Image
            src={profitLossScreenshot}
            alt={t.demo.screenshots.profitLoss}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </Container>
    </section>
  );
}
