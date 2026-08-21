const WHATSAPP_NUMBER = "201020233296";

// Emoji here must stay within the Basic Multilingual Plane (no surrogate
// pairs) — WhatsApp's wa.me -> web.whatsapp.com redirect corrupts 4-byte
// emoji passed in the `text=` param into a single replacement character.
const TEMPLATES = {
  ar: "أهلاً فريق كاش هاب ✨\n\nأنا جاهز أبدأ اليوم!\nعايز أشغّل صالوني باحتراف وأزود حجوزاتي وإيراداتي.\n\nجهزولي حسابي وقولولي الخطوة الجاية ⚡️",
  en: "Hey CashHub team ✨\n\nI'm ready to start today!\nI want to run my salon like a pro and grow my bookings & revenue.\n\nSet up my account and tell me the next step ⚡️",
} as const;

export function getWhatsAppUrl(locale: "ar" | "en" = "ar") {
  const text = encodeURIComponent(TEMPLATES[locale]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

const SHOP_TEMPLATES = {
  ar: (greeting: string) =>
    `أهلاً${greeting} ✨\n\nحابب أعرف تفاصيل أكتر واحجز موعد.\nإيه أقرب معاد متاح؟`,
  en: (greeting: string) =>
    `Hi${greeting} ✨\n\nI'd like to know more and book an appointment.\nWhat's the nearest available slot?`,
} as const;

/** Builds a wa.me link for a shop's own WhatsApp number, pre-filled with a booking inquiry. */
export function getShopWhatsAppUrl(
  whatsappNumber: string,
  shopName: string,
  locale: "ar" | "en" = "ar",
) {
  const greeting = shopName.trim() ? ` ${shopName.trim()}` : "";
  const text = encodeURIComponent(SHOP_TEMPLATES[locale](greeting));
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}
