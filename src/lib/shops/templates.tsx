import type { ComponentType } from "react";
import type { ShopTemplateId, ShopWebsiteData } from "./types";
import { BarberTheme } from "@/themes/barber/BarberTheme";
import { MidnightTheme } from "@/themes/midnight/MidnightTheme";
import { StudioTheme } from "@/themes/studio/StudioTheme";
import { MaisonTheme } from "@/themes/maison/MaisonTheme";
import { KickoffTheme } from "@/themes/kickoff/KickoffTheme";
import { FleurTheme } from "@/themes/fleur/FleurTheme";

export type ShopThemeProps = {
  shop: ShopWebsiteData;
};

export function ShopTemplate({ shop }: ShopThemeProps) {
  switch (shop.templateId) {
    case 2:
      return <MidnightTheme shop={shop} />;
    case 3:
      return <StudioTheme shop={shop} />;
    case 4:
      return <MaisonTheme shop={shop} />;
    case 5:
      return <KickoffTheme shop={shop} />;
    case 6:
      return <FleurTheme shop={shop} />;
    default:
      return <BarberTheme shop={shop} />;
  }
}

/**
 * Template registry
 * 1 = light salon (CashHub style)
 * 2 = dark midnight salon
 * 3 = studio — coral / soft landing
 * 4 = maison — elite noir maison
 * 5 = kickoff — stadium / match-day edition
 * 6 = fleur — elite feminine beauty center
 */
const TEMPLATES: Record<ShopTemplateId, ComponentType<ShopThemeProps>> = {
  1: BarberTheme,
  2: MidnightTheme,
  3: StudioTheme,
  4: MaisonTheme,
  5: KickoffTheme,
  6: FleurTheme,
};

export function getShopTemplate(
  templateId: ShopTemplateId,
): ComponentType<ShopThemeProps> {
  return TEMPLATES[templateId] ?? TEMPLATES[1];
}
