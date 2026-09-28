import type { ShopContact, ShopCoordinates } from "./types";

const pair = ({ lat, lng }: ShopCoordinates) => `${lat},${lng}`;

export type ShopMapLink = {
  href: string;
  /** Which barber-ui label the button uses. */
  labelKey: "directions" | "openMap";
};

/**
 * The one location button: directions to the owner's saved pin (opens the
 * Maps app on phones), else the map link set on the website config.
 */
export function getShopMapLink(contact: ShopContact): ShopMapLink | null {
  if (contact.coordinates) {
    return {
      href: `https://www.google.com/maps/dir/?api=1&destination=${pair(contact.coordinates)}`,
      labelKey: "directions",
    };
  }
  if (contact.mapUrl) return { href: contact.mapUrl, labelKey: "openMap" };
  return null;
}

/** Keyless Google Maps embed centred on the pin. */
export function getShopMapEmbedUrl(coordinates: ShopCoordinates, locale: string): string {
  return `https://maps.google.com/maps?q=${pair(coordinates)}&z=16&hl=${locale}&output=embed`;
}
