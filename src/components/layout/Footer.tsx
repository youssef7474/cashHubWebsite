"use client";

import { useLocale, useTranslation } from "@/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const productLinks = ["features", "pricing", "demo"] as const;
const companyLinks = ["about", "contact"] as const;
const legalLinks = ["privacy", "terms"] as const;

export function Footer() {
  const t = useTranslation();
  const { locale } = useLocale();
  const whatsappUrl = getWhatsAppUrl(locale);

  return (
    <footer className="border-t border-border bg-brand-900 text-brand-300">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="inline-flex items-center" aria-label="CashHub">
              <BrandLogo variant="dark" className="h-10 lg:h-11" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-400">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              {t.footer.product}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key === "demo" ? "demo" : key}`}
                    className="text-sm transition-colors hover:text-accent-400"
                  >
                    {t.footer.links[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              {t.footer.company}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((key) => (
                <li key={key}>
                  <a
                    href={key === "contact" ? whatsappUrl : "#"}
                    target={key === "contact" ? "_blank" : undefined}
                    rel={key === "contact" ? "noopener noreferrer" : undefined}
                    className="text-sm transition-colors hover:text-accent-400"
                  >
                    {t.footer.links[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              {t.footer.legal}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((key) => (
                <li key={key}>
                  <a href="#" className="text-sm transition-colors hover:text-accent-400">
                    {t.footer.links[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-800 pt-8 text-center text-sm text-brand-500">
          {t.footer.copyright}
        </div>
      </Container>
    </footer>
  );
}
