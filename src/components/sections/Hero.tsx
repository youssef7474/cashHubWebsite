"use client";

import Image from "next/image";
import { useLocale, useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import dashboardScreenshot from "@/assets/images/dashboard.png";

export function Hero() {
  const t = useTranslation();
  const { locale } = useLocale();
  const whatsappUrl = getWhatsAppUrl(locale);

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 start-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-100/60 to-transparent blur-3xl" />
        <div className="absolute top-20 end-0 h-72 w-72 rounded-full bg-rose-100/40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-up">
            <Badge>{t.hero.badge}</Badge>
          </div>

          <h1 className="animate-fade-up animation-delay-100 mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-900 sm:text-5xl lg:text-6xl xl:text-[4rem]">
            {t.hero.title}{" "}
            <span className="text-gradient-gold">{t.hero.titleHighlight}</span>
          </h1>

          <p className="animate-fade-up animation-delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t.hero.subtitle}
          </p>

          <div className="animate-fade-up animation-delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="secondary" size="lg" href={whatsappUrl}>
              {t.hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" href="#demo">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              {t.hero.ctaSecondary}
            </Button>
          </div>

          <div className="animate-fade-up animation-delay-400 mt-16 grid grid-cols-3 gap-6 border-t border-brand-200/60 pt-10 sm:gap-12">
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-brand-900 sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up animation-delay-400 relative mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-brand-200 bg-white p-2 shadow-xl">
            <Image
              src={dashboardScreenshot}
              alt={t.demo.screenshots.dashboard}
              className="h-auto w-full rounded-xl"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
          <div className="absolute -bottom-4 inset-x-8 h-8 rounded-full bg-brand-900/5 blur-2xl" />
        </div>
      </Container>
    </section>
  );
}
