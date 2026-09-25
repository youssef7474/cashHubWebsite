"use client";

import type { ShopWebsiteData } from "@/lib/shops/types";
import { WatanHeader } from "./Header";
import { WatanTicker } from "./Ticker";
import { WatanHero } from "./Hero";
import { WatanPride } from "./Pride";
import { WatanBooking } from "./Booking";
import { WatanVisit } from "./Visit";
import { WatanFooter } from "./Footer";
import { ShopFaqSection } from "@/components/shop/ShopFaq";
import "./watan.css";

type WatanThemeProps = {
  shop: ShopWebsiteData;
};

/**
 * Template 7 — Watani (وطني)
 * Saudi National Day edition in Saudi green, white and gold:
 * ticker → header → hero → pride → booking → FAQ → visit
 */
export function WatanTheme({ shop }: WatanThemeProps) {
  return (
    <div
      className="watan-theme"
      data-template="7"
      data-audience={shop.audience}
    >
      <WatanTicker />
      <WatanHeader shop={shop} />
      <main>
        <WatanHero shop={shop} />
        <WatanPride shop={shop} />
        <WatanBooking shop={shop} />
        <ShopFaqSection shop={shop} variant="watan" />
        <WatanVisit shop={shop} />
      </main>
      <WatanFooter shop={shop} />
    </div>
  );
}
