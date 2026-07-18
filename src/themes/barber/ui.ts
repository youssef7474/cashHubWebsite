import type { Locale } from "@/lib/i18n";
import type { ShopAudience } from "@/lib/shops/types";

export type BookingDayOffset = 0 | 1 | 2;

const ui = {
  ar: {
    heroBadgeMen: "صالون حلاقة",
    heroBadgeWomen: "صالون نسائي",
    navAbout: "من نحن",
    navBook: "احجز",
    navFaq: "الأسئلة",
    navContact: "تواصل",
    bookNow: "احجز الآن",
    heroCta: "احجز موعدك",
    heroSecondary: "تعرّف علينا",
    aboutBadge: "قصتنا",
    bookBadge: "الحجز",
    bookTitle: "احجز موعدك",
    bookSubtitle: "تصفح الخدمات، ثم اختر اليوم والوقت المناسب للحجز.",
    pickCategory: "الأقسام",
    allCategories: "الكل",
    pickService: "الخدمات",
    pickServiceHint: "الخدمات والأسعار للعرض",
    selectedCount: (count: number) => `تم اختيار ${count}`,
    clearSelection: "مسح",
    pickDay: "اختر اليوم",
    dayToday: "اليوم",
    dayTomorrow: "بكرة",
    dayAfterTomorrow: "بعد بكرة",
    pickTime: "اختر الوقت",
    confirmBooking: "تأكيد الحجز",
    needServiceDayAndTime: "اختر يومًا ووقتًا للمتابعة",
    modalTitle: "تأكيد الحجز",
    modalSummaryDay: "اليوم",
    modalSummaryTime: "الوقت",
    modalSummaryServices: "الخدمات",
    modalNoServices: "بدون خدمات محددة",
    modalPhoneLabel: "رقم الهاتف",
    modalPhonePlaceholder: "مثال: 01020233296",
    modalNameLabel: "الاسم",
    modalNamePlaceholder: "اكتب اسمك",
    modalCheckPhone: "تحقق من الرقم",
    modalChecking: "جارٍ البحث...",
    modalWelcomeBack: (name: string) => `أهلاً بعودتك، ${name}!`,
    modalNewClient: "رقم جديد — اكتب اسمك لإتمام الحجز",
    modalInvalidPhone: "رقم الهاتف غير صحيح",
    modalLookupError: "تعذر البحث عن العميل. تأكد من إعدادات الحجز وحاول مرة أخرى.",
    modalNameRequired: "الاسم مطلوب",
    modalSubmit: "تأكيد الحجز",
    modalSubmitting: "جارٍ الحجز...",
    modalSuccess: "تم الحجز بنجاح! نراك قريبًا.",
    modalError: "تعذر إتمام الحجز، حاول مرة أخرى.",
    modalDuplicateReservation: "لديك حجز بالفعل في هذا اليوم.",
    modalSlotFullyBooked: "هذا الموعد محجوز بالكامل. اختر وقتًا آخر.",
    modalClose: "إغلاق",
    modalCancel: "إلغاء",
    slotFullyBooked: "محجوز",
    contactBadge: "الموقع",
    contactTitle: "تواصل معنا",
    contactSubtitle: "زورنا أو راسلنا — نرد عليك بسرعة.",
    hoursTitle: "أوقات العمل",
    addressTitle: "العنوان",
    openMap: "فتح الخريطة",
    callUs: "اتصل بنا",
    emailUs: "البريد",
    contactUs: "تواصل معنا",
    socialTitle: "تابعنا",
    socialFacebook: "فيسبوك",
    socialInstagram: "إنستغرام",
    socialTikTok: "تيك توك",
    socialWhatsApp: "واتساب",
    faqBadge: "الدعم",
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle: "إجابات سريعة على أكثر الأسئلة اللي بتوصلنا.",
    poweredBy: "مدعوم من",
    bookingMessage: (
      shop: string,
      services: string,
      day: string,
      time: string,
    ) =>
      `مرحبًا، أرغب بالحجز في ${shop}\nالخدمات:\n${services}\nاليوم: ${day}\nالوقت: ${time}`,
  },
  en: {
    heroBadgeMen: "Barbershop",
    heroBadgeWomen: "Beauty salon",
    navAbout: "About",
    navBook: "Book",
    navFaq: "FAQ",
    navContact: "Contact",
    bookNow: "Book now",
    heroCta: "Book your visit",
    heroSecondary: "About us",
    aboutBadge: "Our story",
    bookBadge: "Booking",
    bookTitle: "Reserve a slot",
    bookSubtitle: "Browse the services, then choose a day and time to reserve.",
    pickCategory: "Categories",
    allCategories: "All",
    pickService: "Services",
    pickServiceHint: "Services and prices for viewing",
    selectedCount: (count: number) => `${count} selected`,
    clearSelection: "Clear",
    pickDay: "Choose a day",
    dayToday: "Today",
    dayTomorrow: "Tomorrow",
    dayAfterTomorrow: "Day after tomorrow",
    pickTime: "Choose a time",
    confirmBooking: "Confirm booking",
    needServiceDayAndTime: "Select a day and a time to continue",
    modalTitle: "Confirm your booking",
    modalSummaryDay: "Day",
    modalSummaryTime: "Time",
    modalSummaryServices: "Services",
    modalNoServices: "No specific services",
    modalPhoneLabel: "Phone number",
    modalPhonePlaceholder: "e.g. 01020233296",
    modalNameLabel: "Name",
    modalNamePlaceholder: "Enter your name",
    modalCheckPhone: "Check number",
    modalChecking: "Searching...",
    modalWelcomeBack: (name: string) => `Welcome back, ${name}!`,
    modalNewClient: "New number — enter your name to finish booking",
    modalInvalidPhone: "Invalid phone number",
    modalLookupError:
      "Could not look up this client. Check booking setup and try again.",
    modalNameRequired: "Name is required",
    modalSubmit: "Confirm booking",
    modalSubmitting: "Booking...",
    modalSuccess: "Booked successfully! See you soon.",
    modalError: "Could not complete the booking, please try again.",
    modalDuplicateReservation:
      "You already have a reservation on this day.",
    modalSlotFullyBooked:
      "This time is fully booked. Please choose another slot.",
    modalClose: "Close",
    modalCancel: "Cancel",
    slotFullyBooked: "Booked",
    contactBadge: "Location",
    contactTitle: "Contact us",
    contactSubtitle: "Visit us or message us — we’ll get back quickly.",
    hoursTitle: "Opening hours",
    addressTitle: "Address",
    openMap: "Open map",
    callUs: "Call us",
    emailUs: "Email",
    contactUs: "Contact us",
    socialTitle: "Follow us",
    socialFacebook: "Facebook",
    socialInstagram: "Instagram",
    socialTikTok: "TikTok",
    socialWhatsApp: "WhatsApp",
    faqBadge: "Support",
    faqTitle: "Frequently asked questions",
    faqSubtitle: "Quick answers to the questions we get most often.",
    poweredBy: "Powered by",
    bookingMessage: (
      shop: string,
      services: string,
      day: string,
      time: string,
    ) =>
      `Hi, I'd like to book at ${shop}\nServices:\n${services}\nDay: ${day}\nTime: ${time}`,
  },
} as const;

type BarberUiStaticKey = Exclude<
  keyof (typeof ui)["ar"],
  "bookingMessage" | "selectedCount" | "modalWelcomeBack"
>;

export type BarberUiCopy = {
  [K in BarberUiStaticKey]: string;
} & {
  selectedCount: (count: number) => string;
  modalWelcomeBack: (name: string) => string;
  bookingMessage: (
    shop: string,
    services: string,
    day: string,
    time: string,
  ) => string;
};

export function getBarberUi(locale: Locale): BarberUiCopy {
  return ui[locale];
}

export function getHeroBadge(
  locale: Locale,
  audience: ShopAudience,
): string {
  const copy = ui[locale];
  return audience === "women" ? copy.heroBadgeWomen : copy.heroBadgeMen;
}

function addDays(base: Date, days: number): Date {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date;
}

function formatBookingDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    numberingSystem: "latn",
  }).format(date);
}

function toLocalISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getBookingDayOptions(locale: Locale) {
  const now = new Date();
  const copy = ui[locale];
  const labels = [copy.dayToday, copy.dayTomorrow, copy.dayAfterTomorrow];

  return labels.map((label, offset) => {
    const date = addDays(now, offset);
    return {
      offset: offset as BookingDayOffset,
      label,
      dateLabel: formatBookingDate(date, locale),
      dateISO: toLocalISODate(date),
    };
  });
}
