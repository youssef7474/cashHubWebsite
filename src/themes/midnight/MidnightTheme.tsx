"use client";

import type { ShopWebsiteData } from "@/lib/shops/types";
import { MidnightHeader } from "./Header";
import { MidnightFooter } from "./Footer";
import { MidnightHero } from "./Hero";
import { MidnightAbout } from "./About";
import { MidnightReservation } from "./Reservation";
import { MidnightContact } from "./Contact";
import { ShopFaqSection } from "@/components/shop/ShopFaq";

type MidnightThemeProps = {
  shop: ShopWebsiteData;
};

/** Template 2 — dark salon theme (same data shape as template 1). */
export function MidnightTheme({ shop }: MidnightThemeProps) {
  return (
    <div
      className="min-h-screen bg-brand-950 text-brand-100"
      data-template="2"
      data-audience={shop.audience}
    >
      <MidnightHeader shop={shop} />
      <main>
        <MidnightHero shop={shop} />
        <MidnightAbout shop={shop} />
        <MidnightReservation shop={shop} />
        <ShopFaqSection shop={shop} variant="midnight" />
        <MidnightContact shop={shop} />
      </main>
      <MidnightFooter shop={shop} />
    </div>
  );
}
