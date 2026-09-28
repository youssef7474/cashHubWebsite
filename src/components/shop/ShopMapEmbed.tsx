"use client";

import { useLocale } from "@/providers/LocaleProvider";
import type { ShopContact } from "@/lib/shops/types";
import { getShopMapEmbedUrl } from "@/lib/shops/location";
import { cn } from "@/lib/utils/cn";

type ShopMapEmbedProps = {
  contact: ShopContact;
  title: string;
  /** Frame styling per theme (border, radius, height). */
  className?: string;
};

/** Live map of the shop's saved pin; renders nothing when the owner hasn't set one. */
export function ShopMapEmbed({ contact, title, className }: ShopMapEmbedProps) {
  const { locale } = useLocale();
  if (!contact.coordinates) return null;

  return (
    <div className={cn("h-56 w-full overflow-hidden sm:h-64", className)}>
      <iframe
        src={getShopMapEmbedUrl(contact.coordinates, locale)}
        title={title}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
