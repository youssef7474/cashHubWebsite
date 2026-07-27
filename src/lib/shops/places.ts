import type { LocalizedString } from "./types";

/** Common backend place names → Arabic / English labels. */
const PLACE_NAMES: Record<string, LocalizedString> = {
  // Egypt
  egypt: { ar: "مصر", en: "Egypt" },
  eg: { ar: "مصر", en: "Egypt" },
  // Governorates / cities
  cairo: { ar: "القاهرة", en: "Cairo" },
  giza: { ar: "الجيزة", en: "Giza" },
  alexandria: { ar: "الإسكندرية", en: "Alexandria" },
  alex: { ar: "الإسكندرية", en: "Alexandria" },
  luxor: { ar: "الأقصر", en: "Luxor" },
  aswan: { ar: "أسوان", en: "Aswan" },
  asyut: { ar: "أسيوط", en: "Asyut" },
  assiut: { ar: "أسيوط", en: "Asyut" },
  sohag: { ar: "سوهاج", en: "Sohag" },
  qena: { ar: "قنا", en: "Qena" },
  minya: { ar: "المنيا", en: "Minya" },
  "el minya": { ar: "المنيا", en: "Minya" },
  fayoum: { ar: "الفيوم", en: "Fayoum" },
  fayum: { ar: "الفيوم", en: "Fayoum" },
  beni: { ar: "بني سويف", en: "Beni Suef" },
  "beni suef": { ar: "بني سويف", en: "Beni Suef" },
  "beni-suef": { ar: "بني سويف", en: "Beni Suef" },
  damietta: { ar: "دمياط", en: "Damietta" },
  dakahlia: { ar: "الدقهلية", en: "Dakahlia" },
  sharqia: { ar: "الشرقية", en: "Sharqia" },
  sharkia: { ar: "الشرقية", en: "Sharqia" },
  gharbia: { ar: "الغربية", en: "Gharbia" },
  monufia: { ar: "المنوفية", en: "Monufia" },
  menoufia: { ar: "المنوفية", en: "Monufia" },
  beheira: { ar: "البحيرة", en: "Beheira" },
  "kafr el sheikh": { ar: "كفر الشيخ", en: "Kafr El Sheikh" },
  "kafr el-sheikh": { ar: "كفر الشيخ", en: "Kafr El Sheikh" },
  ismailia: { ar: "الإسماعيلية", en: "Ismailia" },
  suez: { ar: "السويس", en: "Suez" },
  "port said": { ar: "بورسعيد", en: "Port Said" },
  portsaid: { ar: "بورسعيد", en: "Port Said" },
  "red sea": { ar: "البحر الأحمر", en: "Red Sea" },
  "south sinai": { ar: "جنوب سيناء", en: "South Sinai" },
  "north sinai": { ar: "شمال سيناء", en: "North Sinai" },
  matrouh: { ar: "مطروح", en: "Matrouh" },
  "new valley": { ar: "الوادي الجديد", en: "New Valley" },
  qalyubia: { ar: "القليوبية", en: "Qalyubia" },
  "6th of october": { ar: "السادس من أكتوبر", en: "6th of October" },
  october: { ar: "السادس من أكتوبر", en: "6th of October" },
  "sheikh zayed": { ar: "الشيخ زايد", en: "Sheikh Zayed" },
  helwan: { ar: "حلوان", en: "Helwan" },
  maadi: { ar: "المعادي", en: "Maadi" },
  nasr: { ar: "مدينة نصر", en: "Nasr City" },
  "nasr city": { ar: "مدينة نصر", en: "Nasr City" },
  zamalek: { ar: "الزمالك", en: "Zamalek" },
  mohandessin: { ar: "المهندسين", en: "Mohandessin" },
  mohandiseen: { ar: "المهندسين", en: "Mohandessin" },
  dokki: { ar: "الدقي", en: "Dokki" },
  haram: { ar: "الهرم", en: "Haram" },
  "new cairo": { ar: "القاهرة الجديدة", en: "New Cairo" },
  mansoura: { ar: "المنصورة", en: "Mansoura" },
  tanta: { ar: "طنطا", en: "Tanta" },
  zagazig: { ar: "الزقازيق", en: "Zagazig" },
  hurghada: { ar: "الغردقة", en: "Hurghada" },
  sharm: { ar: "شرم الشيخ", en: "Sharm El Sheikh" },
  "sharm el sheikh": { ar: "شرم الشيخ", en: "Sharm El Sheikh" },
  "sharm el-sheikh": { ar: "شرم الشيخ", en: "Sharm El Sheikh" },
};

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Localize a single place token from the backend (e.g. "giza" → الجيزة). */
export function localizePlaceName(value: string): LocalizedString {
  const trimmed = value.trim();
  if (!trimmed) return { ar: "", en: "" };

  const known = PLACE_NAMES[normalizeKey(trimmed)];
  if (known) return known;

  return { ar: trimmed, en: trimmed };
}

/**
 * Localize a free-form place/address string.
 * Comma-separated segments are localized independently.
 */
export function localizePlaceText(value: string): LocalizedString {
  const trimmed = value.trim();
  if (!trimmed) return { ar: "", en: "" };

  const parts = trimmed
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) return localizePlaceName(trimmed);

  return {
    ar: parts.map((part) => localizePlaceName(part).ar).join("، "),
    en: parts.map((part) => localizePlaceName(part).en).join(", "),
  };
}

/** Build a bilingual address from location + country backend fields. */
export function localizeAddressParts(
  ...parts: Array<string | null | undefined>
): LocalizedString {
  const filtered = parts
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part));

  return {
    ar: filtered.map((part) => localizePlaceName(part).ar).join("، "),
    en: filtered.map((part) => localizePlaceName(part).en).join(", "),
  };
}
