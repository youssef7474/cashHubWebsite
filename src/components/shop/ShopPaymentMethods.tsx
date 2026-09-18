"use client";

import type { ComponentType, SVGProps } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { cn } from "@/lib/utils/cn";
import type { ShopPaymentMethod, ShopWebsiteData } from "@/lib/shops/types";
import type { ShopSocialVariant } from "./ShopSocialLinks";

type IconProps = SVGProps<SVGSVGElement>;

function baseProps(props: IconProps): IconProps {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

function CashIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.5v.01M18 14.5v.01" />
    </svg>
  );
}

function VisaIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 9.5h19M6 15h4" />
    </svg>
  );
}

function InstaPayIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M13.2 2.8 5 13.4h5.6l-.8 7.8 8.2-10.6h-5.6l.8-7.8Z" />
    </svg>
  );
}

function WalletIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M19 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-2" />
      <path d="M21 12h-5a2 2 0 0 0 0 4h5v-4Z" />
      <path d="M3 8h14" />
    </svg>
  );
}

const METHODS: Record<
  ShopPaymentMethod,
  { Icon: ComponentType<IconProps>; ar: string; en: string }
> = {
  cash: { Icon: CashIcon, ar: "كاش", en: "Cash" },
  visa: { Icon: VisaIcon, ar: "فيزا", en: "Visa" },
  instapay: { Icon: InstaPayIcon, ar: "إنستاباي", en: "InstaPay" },
  wallet: { Icon: WalletIcon, ar: "محفظة إلكترونية", en: "Mobile wallet" },
};

const TITLE = { ar: "طرق الدفع المتاحة", en: "Accepted payment methods" };

const VARIANT_STYLES: Record<
  ShopSocialVariant,
  { title: string; item: string; icon: string }
> = {
  barber: {
    title: "text-brand-500",
    item: "rounded-full border-brand-200 bg-white text-brand-700",
    icon: "text-accent-600",
  },
  midnight: {
    title: "text-brand-500",
    item: "rounded-full border-brand-800 bg-brand-900/50 text-brand-200",
    icon: "text-accent-400",
  },
  studio: {
    title: "text-[var(--studio-muted)]",
    item: "rounded-full border-[var(--studio-line)] bg-white text-[var(--studio-ink-soft)]",
    icon: "text-[var(--studio-accent)]",
  },
  maison: {
    title: "text-[var(--maison-muted)]",
    item: "border-[var(--maison-line)] text-[var(--maison-soft)]",
    icon: "text-[var(--maison-champagne)]",
  },
  kickoff: {
    title: "text-[var(--ko-muted)]",
    item: "border-[var(--ko-line)] bg-[var(--ko-panel)] text-[var(--ko-soft)]",
    icon: "text-[var(--ko-gold)]",
  },
  fleur: {
    title: "text-[var(--fleur-muted)]",
    item: "rounded-full border-[var(--fleur-line)] bg-[var(--fleur-panel)] text-[var(--fleur-soft)]",
    icon: "text-[var(--fleur-rose-deep)]",
  },
};

type ShopPaymentMethodsProps = {
  shop: Pick<ShopWebsiteData, "paymentMethods">;
  variant?: ShopSocialVariant;
  className?: string;
};

/** "We accept" row: one icon + label per payment method the shop has enabled. */
export function ShopPaymentMethods({
  shop,
  variant = "barber",
  className,
}: ShopPaymentMethodsProps) {
  const { locale } = useLocale();
  const methods = shop.paymentMethods ?? [];
  const styles = VARIANT_STYLES[variant];

  if (methods.length === 0) return null;

  return (
    <div className={className}>
      <p
        className={cn(
          "text-[0.65rem] font-semibold tracking-[0.18em] uppercase",
          styles.title,
        )}
      >
        {TITLE[locale]}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {methods.map((method) => {
          const { Icon, ...labels } = METHODS[method];
          return (
            <li
              key={method}
              className={cn(
                "inline-flex items-center gap-2 border px-3.5 py-2 text-sm font-medium",
                styles.item,
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", styles.icon)} />
              {labels[locale]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
