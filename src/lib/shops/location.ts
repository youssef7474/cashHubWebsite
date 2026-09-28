import type { ShopContact, ShopCoordinates } from "./types";

const pair = ({ lat, lng }: ShopCoordinates) => `${lat},${lng}`;

/** Where "Open map" goes: the owner's saved pin, else the link set on the website config. */
export function getShopMapUrl(contact: ShopContact): string | undefined {
  if (contact.coordinates) {
    return `https://www.google.com/maps/search/?api=1&query=${pair(contact.coordinates)}`;
  }
  return contact.mapUrl;
}

/** Google Maps directions from the visitor's location to the shop (opens the Maps app on phones). */
export function getShopDirectionsUrl(contact: ShopContact): string | undefined {
  if (!contact.coordinates) return undefined;
  return `https://www.google.com/maps/dir/?api=1&destination=${pair(contact.coordinates)}`;
}

/** Keyless Google Maps embed centred on the pin. */
export function getShopMapEmbedUrl(coordinates: ShopCoordinates, locale: string): string {
  return `https://maps.google.com/maps?q=${pair(coordinates)}&z=16&hl=${locale}&output=embed`;
}
