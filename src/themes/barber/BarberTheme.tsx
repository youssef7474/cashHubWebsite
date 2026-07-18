"use client";

import type { ShopWebsiteData } from "@/lib/shops/types";
import { BarberHeader } from "./Header";
import { BarberFooter } from "./Footer";
import { BarberHero } from "./Hero";
import { BarberAbout } from "./About";
import { BarberReservation } from "./Reservation";
import { BarberContact } from "./Contact";
import { ShopFaqSection } from "@/components/shop/ShopFaq";

type BarberThemeProps = {
  shop: ShopWebsiteData;
};

export function BarberTheme({ shop }: BarberThemeProps) {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      data-template="1"
      data-audience={shop.audience}
    >
      <BarberHeader shop={shop} />
      <main>
        <BarberHero shop={shop} />
        <BarberAbout shop={shop} />
        <BarberReservation shop={shop} />
        <ShopFaqSection shop={shop} variant="barber" />
        <BarberContact shop={shop} />
      </main>
      <BarberFooter shop={shop} />
    </div>
  );
}
