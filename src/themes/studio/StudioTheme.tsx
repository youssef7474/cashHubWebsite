"use client";

import type { ShopWebsiteData } from "@/lib/shops/types";
import { StudioNav } from "./Nav";
import { StudioHero } from "./Hero";
import { StudioStory } from "./Story";
import { StudioBook } from "./Book";
import { StudioFind } from "./Find";
import { StudioFooter } from "./Footer";
import { ShopFaqSection } from "@/components/shop/ShopFaq";
import "./studio.css";

type StudioThemeProps = {
  shop: ShopWebsiteData;
};

/**
 * Template 3 — Studio
 * Hero → About → Book → FAQ → Contact
 */
export function StudioTheme({ shop }: StudioThemeProps) {
  return (
    <div
      className="studio-theme"
      data-template="3"
      data-audience={shop.audience}
    >
      <StudioNav shop={shop} />
      <main>
        <StudioHero shop={shop} />
        <StudioStory shop={shop} />
        <StudioBook shop={shop} />
        <ShopFaqSection shop={shop} variant="studio" />
        <StudioFind shop={shop} />
      </main>
      <StudioFooter shop={shop} />
    </div>
  );
}
