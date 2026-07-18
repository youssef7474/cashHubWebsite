"use client";

import { useLocale, useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function CTA() {
  const t = useTranslation();
  const { locale } = useLocale();
  const whatsappUrl = getWhatsAppUrl(locale);

  return (
    <section className="py-[var(--section-py)]">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-8 py-16 text-center sm:px-16 lg:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 start-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-500/20 blur-3xl" />
            <div className="absolute -bottom-10 end-0 h-48 w-48 rounded-full bg-rose-500/10 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-brand-400 sm:text-lg">
              {t.cta.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white bg-white px-7 text-base font-semibold text-white transition-all duration-200 hover:bg-white/90"
                style={{ color: "#ffffff", backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                {t.cta.primary}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white bg-transparent px-7 text-base font-medium text-white transition-all duration-200 hover:bg-white/10"
                style={{ color: "#ffffff" }}
              >
                {t.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
