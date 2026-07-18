"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { cn } from "@/lib/utils/cn";
import type { ShopContact } from "@/lib/shops/types";
import { getBarberUi } from "@/themes/barber/ui";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "./social-icons";

export type ShopSocialVariant =
  | "barber"
  | "midnight"
  | "studio"
  | "maison"
  | "kickoff"
  | "fleur";

type ShopSocialLinksProps = {
  contact: ShopContact;
  variant?: ShopSocialVariant;
  className?: string;
  label?: string;
};

const VARIANT_STYLES: Record<
  ShopSocialVariant,
  { wrap: string; link: string; label: string }
> = {
  barber: {
    wrap: "gap-2.5",
    link: "border-brand-200 bg-white text-brand-700 hover:border-accent-400 hover:bg-accent-50 hover:text-accent-600",
    label: "text-brand-500",
  },
  midnight: {
    wrap: "gap-2.5",
    link: "border-brand-700 bg-brand-950 text-brand-200 hover:border-accent-500/50 hover:bg-brand-900 hover:text-accent-400",
    label: "text-brand-500",
  },
  studio: {
    wrap: "gap-2.5",
    link: "border-white/20 bg-white/10 text-white hover:bg-white/20",
    label: "text-white/55",
  },
  maison: {
    wrap: "gap-2.5",
    link: "border-[var(--maison-line)] bg-transparent text-[var(--maison-soft)] hover:border-[var(--maison-champagne)] hover:text-[var(--maison-champagne)]",
    label: "text-[var(--maison-muted)]",
  },
  kickoff: {
    wrap: "gap-2.5",
    link: "border-[var(--ko-line)] bg-[var(--ko-panel)] text-[var(--ko-soft)] hover:border-[var(--ko-gold)] hover:text-[var(--ko-gold)]",
    label: "text-[var(--ko-muted)]",
  },
  fleur: {
    wrap: "gap-2.5",
    link: "border-[var(--fleur-line)] bg-[var(--fleur-panel)] text-[var(--fleur-soft)] hover:border-[var(--fleur-rose)] hover:text-[var(--fleur-rose-deep)]",
    label: "text-[var(--fleur-muted)]",
  },
};

function buildSocialItems(contact: ShopContact) {
  const items = [
    {
      key: "facebook" as const,
      href: contact.facebook,
      Icon: FacebookIcon,
    },
    {
      key: "instagram" as const,
      href: contact.instagram,
      Icon: InstagramIcon,
    },
    {
      key: "tiktok" as const,
      href: contact.tiktok,
      Icon: TikTokIcon,
    },
    {
      key: "whatsapp" as const,
      href: contact.whatsapp
        ? `https://wa.me/${contact.whatsapp}`
        : undefined,
      Icon: WhatsAppIcon,
    },
  ];

  return items.filter(
    (item): item is typeof item & { href: string } => Boolean(item.href),
  );
}

export function ShopSocialLinks({
  contact,
  variant = "barber",
  className,
  label,
}: ShopSocialLinksProps) {
  const { locale } = useLocale();
  const ui = getBarberUi(locale);
  const items = buildSocialItems(contact);
  if (items.length === 0) return null;

  const styles = VARIANT_STYLES[variant];
  const labels = {
    facebook: ui.socialFacebook,
    instagram: ui.socialInstagram,
    tiktok: ui.socialTikTok,
    whatsapp: ui.socialWhatsApp,
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label !== undefined ? (
        <p
          className={cn(
            "text-[0.65rem] font-semibold tracking-[0.22em] uppercase",
            styles.label,
          )}
        >
          {label || ui.socialTitle}
        </p>
      ) : null}
      <ul className={cn("flex flex-wrap items-center", styles.wrap)}>
        {items.map(({ key, href, Icon }) => (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels[key]}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                styles.link,
              )}
            >
              <Icon className="h-4.5 w-4.5 h-[1.1rem] w-[1.1rem]" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
