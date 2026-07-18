"use client";

import type { ShopWebsiteData } from "@/lib/shops/types";
import { MaisonHeader } from "./Header";
import { MaisonManifesto } from "./Manifesto";
import { MaisonAtelier } from "./Atelier";
import { MaisonReserve } from "./Reserve";
import { MaisonArrive } from "./Arrive";
import { MaisonColophon } from "./Colophon";
import { ShopFaqSection } from "@/components/shop/ShopFaq";
import "./maison.css";

type MaisonThemeProps = {
  shop: ShopWebsiteData;
};

/**
 * Template 4 — Maison
 * Header → Manifesto hero → Atelier → Reserve → FAQ → Arrive → Colophon
 */
export function MaisonTheme({ shop }: MaisonThemeProps) {
  return (
    <div
      className="maison-theme"
      data-template="4"
      data-audience={shop.audience}
    >
      <MaisonHeader shop={shop} />
      <main>
        <MaisonManifesto shop={shop} />
        <MaisonAtelier shop={shop} />
        <MaisonReserve shop={shop} />
        <ShopFaqSection shop={shop} variant="maison" />
        <MaisonArrive shop={shop} />
      </main>
      <MaisonColophon shop={shop} />
    </div>
  );
}
