"use client";

import type { ShopWebsiteData } from "@/lib/shops/types";
import { KickoffHeader } from "./Header";
import { KickoffTicker } from "./Ticker";
import { KickoffHero } from "./Hero";
import { KickoffSquad } from "./Squad";
import { KickoffLineup } from "./Lineup";
import { KickoffStadium } from "./Stadium";
import { KickoffFooter } from "./Footer";
import { ShopFaqSection } from "@/components/shop/ShopFaq";
import "./kickoff.css";

type KickoffThemeProps = {
  shop: ShopWebsiteData;
};

/**
 * Template 5 — Kickoff
 * Stadium / match-day edition: ticker → header → hero → squad → lineup → FAQ → stadium
 */
export function KickoffTheme({ shop }: KickoffThemeProps) {
  return (
    <div
      className="kickoff-theme"
      data-template="5"
      data-audience={shop.audience}
    >
      <KickoffTicker />
      <KickoffHeader shop={shop} />
      <main>
        <KickoffHero shop={shop} />
        <KickoffSquad shop={shop} />
        <KickoffLineup shop={shop} />
        <ShopFaqSection shop={shop} variant="kickoff" />
        <KickoffStadium shop={shop} />
      </main>
      <KickoffFooter shop={shop} />
    </div>
  );
}
