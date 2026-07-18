const WHATSAPP_NUMBER = "201020233296";

const TEMPLATES = {
  ar: "أهلاً فريق كاش هاب 👋\n\nأنا جاهز أبدأ اليوم!\nعايز أشغّل صالوني باحتراف وأزود حجوزاتي وإيراداتي.\n\nجهزولي حسابي وقولولي الخطوة الجاية 🚀",
  en: "Hey CashHub team 👋\n\nI'm ready to start today!\nI want to run my salon like a pro and grow my bookings & revenue.\n\nSet up my account and tell me the next step 🚀",
} as const;

export function getWhatsAppUrl(locale: "ar" | "en" = "ar") {
  const text = encodeURIComponent(TEMPLATES[locale]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
