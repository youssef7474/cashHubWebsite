"use client";

import { useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils/cn";
import type { ShopFaq, ShopWebsiteData } from "@/lib/shops/types";
import { pickLocale } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import type { ShopSocialVariant } from "./ShopSocialLinks";

type ShopFaqSectionProps = {
  shop: ShopWebsiteData;
  variant?: ShopSocialVariant;
  className?: string;
};

const VARIANT_STYLES: Record<
  ShopSocialVariant,
  {
    section: string;
    shell: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    list: string;
    item: string;
    question: string;
    answer: string;
    icon: string;
    iconOpen: string;
  }
> = {
  barber: {
    section: "border-t border-border-subtle bg-brand-50/40 py-[var(--section-py)]",
    shell: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8",
    eyebrow:
      "inline-flex rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-brand-600",
    title: "mt-4 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl",
    subtitle: "mt-3 text-base text-muted-foreground sm:text-lg",
    list: "mt-10 divide-y divide-brand-200 rounded-2xl border border-brand-200 bg-white",
    item: "px-5 py-5 sm:px-6",
    question: "font-semibold text-brand-900",
    answer: "text-sm leading-relaxed text-muted-foreground",
    icon: "bg-brand-100 text-brand-600",
    iconOpen: "rotate-180 bg-accent-100 text-accent-600",
  },
  midnight: {
    section: "border-t border-brand-800 bg-brand-950 py-[var(--section-py)]",
    shell: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8",
    eyebrow:
      "inline-flex rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent-400",
    title: "mt-4 text-3xl font-bold tracking-tight text-brand-50 sm:text-4xl",
    subtitle: "mt-3 text-base text-brand-400 sm:text-lg",
    list: "mt-10 divide-y divide-brand-800 rounded-2xl border border-brand-800 bg-brand-900/50",
    item: "px-5 py-5 sm:px-6",
    question: "font-semibold text-brand-50",
    answer: "text-sm leading-relaxed text-brand-400",
    icon: "bg-brand-800 text-brand-300",
    iconOpen: "rotate-180 bg-accent-500/15 text-accent-400",
  },
  studio: {
    section: "py-20 lg:py-28",
    shell: "studio-shell max-w-3xl",
    eyebrow:
      "text-[10px] font-bold tracking-[0.22em] text-[var(--studio-accent)] uppercase",
    title:
      "mt-3 text-3xl font-extrabold tracking-tight text-[var(--studio-ink)] sm:text-4xl",
    subtitle: "mt-3 text-base text-[var(--studio-muted)]",
    list: "mt-10 divide-y divide-[var(--studio-line)] overflow-hidden rounded-[1.75rem] border border-[var(--studio-line)] bg-[var(--studio-surface)]",
    item: "px-5 py-5 sm:px-6",
    question: "font-semibold text-[var(--studio-ink)]",
    answer: "text-sm leading-relaxed text-[var(--studio-muted)]",
    icon: "bg-[var(--studio-bg)] text-[var(--studio-ink-soft)]",
    iconOpen: "rotate-180 bg-[var(--studio-accent)]/10 text-[var(--studio-accent)]",
  },
  maison: {
    section: "border-y border-[var(--maison-line)] bg-[var(--maison-ink)] py-20 lg:py-28",
    shell: "maison-shell max-w-3xl",
    eyebrow: "maison-eyebrow",
    title:
      "maison-display mt-5 text-4xl text-[var(--maison-ivory)] sm:text-5xl",
    subtitle: "mt-4 text-[var(--maison-muted)]",
    list: "mt-12 divide-y divide-[var(--maison-line)] border-y border-[var(--maison-line)]",
    item: "py-5",
    question: "font-semibold text-[var(--maison-ivory)]",
    answer: "text-sm leading-relaxed text-[var(--maison-muted)]",
    icon: "border border-[var(--maison-line)] text-[var(--maison-soft)]",
    iconOpen:
      "rotate-180 border-[var(--maison-champagne)] text-[var(--maison-champagne)]",
  },
  kickoff: {
    section: "border-t border-[var(--ko-line)] bg-[var(--ko-deep)] py-20 lg:py-28",
    shell: "kickoff-shell max-w-3xl",
    eyebrow: "kickoff-eyebrow",
    title: "kickoff-display mt-4 text-5xl text-[var(--ko-white)] sm:text-6xl",
    subtitle: "mt-3 text-[var(--ko-muted)]",
    list: "mt-12 divide-y divide-[var(--ko-line)] border border-[var(--ko-line)] bg-[var(--ko-panel)]/40",
    item: "px-5 py-5 sm:px-6",
    question: "font-semibold text-[var(--ko-white)]",
    answer: "text-sm leading-relaxed text-[var(--ko-muted)]",
    icon: "border border-[var(--ko-line)] text-[var(--ko-soft)]",
    iconOpen: "rotate-180 border-[var(--ko-gold)] text-[var(--ko-gold)]",
  },
  fleur: {
    section: "border-y border-[var(--fleur-line)] bg-[var(--fleur-blush)] py-20 lg:py-28",
    shell: "fleur-shell max-w-3xl",
    eyebrow: "fleur-eyebrow",
    title: "fleur-display mt-5 text-4xl text-[var(--fleur-plum)] sm:text-5xl",
    subtitle: "mt-4 text-[var(--fleur-soft)]",
    list: "mt-12 divide-y divide-[var(--fleur-line)] overflow-hidden rounded-[1.75rem] border border-[var(--fleur-line)] bg-[var(--fleur-panel)]",
    item: "px-5 py-5 sm:px-6",
    question: "font-semibold text-[var(--fleur-plum)]",
    answer: "text-sm leading-relaxed text-[var(--fleur-muted)]",
    icon: "border border-[var(--fleur-line)] text-[var(--fleur-soft)]",
    iconOpen:
      "rotate-180 border-[var(--fleur-rose)] bg-[var(--fleur-rose)]/10 text-[var(--fleur-rose-deep)]",
  },
};

function FaqItem({
  item,
  open,
  onToggle,
  styles,
  locale,
}: {
  item: ShopFaq;
  open: boolean;
  onToggle: () => void;
  styles: (typeof VARIANT_STYLES)[ShopSocialVariant];
  locale: "ar" | "en";
}) {
  return (
    <div
      className={styles.item}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-start"
        aria-expanded={open}
      >
        <span className={styles.question} itemProp="name">
          {pickLocale(item.question, locale)}
        </span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300",
            styles.icon,
            open && styles.iconOpen,
          )}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300",
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div
          className="overflow-hidden"
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <p className={styles.answer} itemProp="text">
            {pickLocale(item.answer, locale)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ShopFaqSection({
  shop,
  variant = "barber",
  className,
}: ShopFaqSectionProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const [openId, setOpenId] = useState<string | null>(shop.faqs[0]?.id ?? null);
  const styles = VARIANT_STYLES[variant];

  if (!shop.faqs.length) return null;

  return (
    <section id="faq" className={cn(styles.section, className)}>
      <div className={styles.shell}>
        <Reveal>
          <div className="text-center">
            <p className={styles.eyebrow}>{ui.faqBadge}</p>
            <h2 className={styles.title}>{ui.faqTitle}</h2>
            <p className={styles.subtitle}>{ui.faqSubtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div
            className={styles.list}
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            {shop.faqs.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                open={openId === item.id}
                onToggle={() =>
                  setOpenId((current) => (current === item.id ? null : item.id))
                }
                styles={styles}
                locale={locale}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
