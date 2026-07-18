"use client";

import type { ShopWebsiteData } from "@/lib/shops/types";
import { FleurHeader } from "./Header";
import { FleurBloom } from "./Bloom";
import { FleurRituals } from "./Rituals";
import { FleurBooking } from "./Booking";
import { FleurVisit } from "./Visit";
import { FleurFooter } from "./Footer";
import { ShopFaqSection } from "@/components/shop/ShopFaq";
import "./fleur.css";

type FleurThemeProps = {
  shop: ShopWebsiteData;
};

/**
 * Template 6 — Fleur
 * Elite feminine beauty center: porcelain cream, blush rose, rose gold.
 * Header → Bloom hero → Rituals → Booking → FAQ → Visit → Footer
 */
export function FleurTheme({ shop }: FleurThemeProps) {
  return (
    <div
      className="fleur-theme"
      data-template="6"
      data-audience={shop.audience}
    >
      <FleurHeader shop={shop} />
      <main>
        <FleurBloom shop={shop} />
        <FleurRituals shop={shop} />
        <FleurBooking shop={shop} />
        <ShopFaqSection shop={shop} variant="fleur" />
        <FleurVisit shop={shop} />
      </main>
      <FleurFooter shop={shop} />
    </div>
  );
}
