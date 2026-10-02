import type { ShopTemplateId } from "./types";

/** Colors of the rules page, taken from each website template. */
export type RulesPalette = {
  background: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
};

const PALETTES: Record<ShopTemplateId, RulesPalette> = {
  // 1 — light salon (globals.css brand / accent)
  1: {
    background: "#fafaf9",
    surface: "#ffffff",
    border: "#e7e5e4",
    text: "#1c1917",
    muted: "#78716c",
    accent: "#c9a227",
  },
  // 2 — midnight
  2: {
    background: "#0c0a09",
    surface: "#1c1917",
    border: "#292524",
    text: "#f5f5f4",
    muted: "#a8a29e",
    accent: "#d4af37",
  },
  // 3 — studio (studio.css)
  3: {
    background: "#f5f6f8",
    surface: "#ffffff",
    border: "#e4e7ec",
    text: "#14161a",
    muted: "#7a808c",
    accent: "#e35d4a",
  },
  // 4 — maison (maison.css)
  4: {
    background: "#080706",
    surface: "#1a1714",
    border: "rgb(196 165 116 / 0.18)",
    text: "#f3ebe0",
    muted: "#8a8074",
    accent: "#c4a574",
  },
  // 5 — kickoff (kickoff.css)
  5: {
    background: "#07111f",
    surface: "#12233a",
    border: "rgb(240 193 75 / 0.22)",
    text: "#f4f7fb",
    muted: "#7a8fa8",
    accent: "#f0c14b",
  },
  // 6 — fleur (fleur.css)
  6: {
    background: "#fdf9f7",
    surface: "#ffffff",
    border: "rgb(183 110 121 / 0.22)",
    text: "#43293c",
    muted: "#a2879b",
    accent: "#b76e79",
  },
  // 7 — watani (watan.css)
  7: {
    background: "#00331a",
    surface: "#0b5230",
    border: "rgb(212 175 55 / 0.24)",
    text: "#ffffff",
    muted: "#8fbba1",
    accent: "#d4af37",
  },
  // 8 — atiq / parlor (parlor.css)
  8: {
    background: "#f6eee0",
    surface: "#fbf6ec",
    border: "rgb(29 42 68 / 0.18)",
    text: "#1d2a44",
    muted: "#7a7f8f",
    accent: "#b8372b",
  },
};

export function getRulesPalette(templateId: ShopTemplateId): RulesPalette {
  return PALETTES[templateId] ?? PALETTES[1];
}
