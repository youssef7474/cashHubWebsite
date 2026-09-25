"use client";

import type { ShopWebsiteData } from "@/lib/shops/types";
import { ParlorHeader } from "./Header";
import { ParlorHero } from "./Hero";
import { ParlorStory } from "./Story";
import { ParlorMenu } from "./Menu";
import { ParlorVisit } from "./Visit";
import { ParlorFooter } from "./Footer";
import { ShopFaqSection } from "@/components/shop/ShopFaq";
import "./parlor.css";

type ParlorThemeProps = {
  shop: ShopWebsiteData;
};

/**
 * Template 8 — Atiq (عتيق), vintage barber parlor.
 * Cream paper, deep navy, barber-pole red and brass:
 * pole header → poster hero → story → price list + ticket → FAQ → sign → footer
 */
export function ParlorTheme({ shop }: ParlorThemeProps) {
  return (
    <div className="parlor-theme" data-template="8" data-audience={shop.audience}>
      <ParlorHeader shop={shop} />
      <main>
        <ParlorHero shop={shop} />
        <ParlorStory shop={shop} />
        <ParlorMenu shop={shop} />
        <ShopFaqSection shop={shop} variant="parlor" />
        <ParlorVisit shop={shop} />
      </main>
      <ParlorFooter shop={shop} />
    </div>
  );
}
