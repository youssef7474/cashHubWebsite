import type { ShopFaq, ShopWebsiteData } from "./types";
import { localizedFriendlyTime } from "./time";

function timeSlot(time: string) {
  return { id: time, label: localizedFriendlyTime(time) };
}

/**
 * Dummy shop websites. Later this will be replaced by an API call
 * that returns bilingual website content + templateId.
 */

const MEN_FAQS: ShopFaq[] = [
  {
    id: "faq-m1",
    question: {
      ar: "هل لازم أحجز قبل الزيارة؟",
      en: "Do I need to book before visiting?",
    },
    answer: {
      ar: "نعم، الحجز بيضمنلك الموعد المناسب من غير انتظار. تقدر تحجز من الموقع وتأكد عبر واتساب.",
      en: "Yes — booking keeps your slot reserved with no waiting. You can book here and confirm on WhatsApp.",
    },
  },
  {
    id: "faq-m2",
    question: {
      ar: "ممكن أحجز أكثر من خدمة في نفس الموعد؟",
      en: "Can I book more than one service in the same visit?",
    },
    answer: {
      ar: "أكيد. اختار كل الخدمات اللي محتاجها أثناء الحجز، وهنرتب الوقت عشان تخلص في جلسة واحدة.",
      en: "Absolutely. Select every service you need while booking and we’ll plan the time for one visit.",
    },
  },
  {
    id: "faq-m3",
    question: {
      ar: "هل الأدوات بتتعقم قبل كل عميل؟",
      en: "Are tools sanitized before every client?",
    },
    answer: {
      ar: "نعم، التعقيم والنظافة جزء أساسي من كل جلسة قبل وبعد الخدمة.",
      en: "Yes. Cleaning and sanitizing tools is part of every session, before and after service.",
    },
  },
  {
    id: "faq-m4",
    question: {
      ar: "إزاي أغير أو ألغي الموعد؟",
      en: "How do I change or cancel an appointment?",
    },
    answer: {
      ar: "ابعتلنا رسالة على واتساب في أقرب وقت، وهنساعدك تغيّر الموعد أو تلغيه بسهولة.",
      en: "Message us on WhatsApp as early as you can and we’ll help you reschedule or cancel.",
    },
  },
];

const WOMEN_FAQS: ShopFaq[] = [
  {
    id: "faq-w1",
    question: {
      ar: "هل الحجز مطلوب قبل الزيارة؟",
      en: "Is booking required before visiting?",
    },
    answer: {
      ar: "نعم، الحجز بيساعدنا نخصصلك الوقت المناسب ونجهّز الخدمة بشكل مرتب.",
      en: "Yes. Booking helps us reserve the right time and prepare your service properly.",
    },
  },
  {
    id: "faq-w2",
    question: {
      ar: "ممكن أحجز باقة كاملة زي شعر ومكياج مع بعض؟",
      en: "Can I book a full package like hair and makeup together?",
    },
    answer: {
      ar: "نعم، تقدري تختاري أكثر من خدمة أو باقة أثناء الحجز، ونأكد معاكي التفاصيل على واتساب.",
      en: "Yes — choose multiple services or a package while booking, and we’ll confirm details on WhatsApp.",
    },
  },
  {
    id: "faq-w3",
    question: {
      ar: "هل في استشارة قبل الصبغة أو الكيراتين؟",
      en: "Is there a consultation before color or keratin?",
    },
    answer: {
      ar: "أيوه، بنبدأ باستشارة سريعة عشان نحدد اللي يناسب شعرك ونتيجتك المطلوبة.",
      en: "Yes. We start with a quick consult so the result matches your hair and your goal.",
    },
  },
  {
    id: "faq-w4",
    question: {
      ar: "إزاي أقدر أتواصل معاكي بسرعة؟",
      en: "What’s the fastest way to reach you?",
    },
    answer: {
      ar: "واتساب هو أسرع طريقة. كمان تقدري تتابعينا على إنستغرام وفيسبوك وتيك توك.",
      en: "WhatsApp is fastest. You can also follow us on Instagram, Facebook, and TikTok.",
    },
  },
];

const DUMMY_SHOPS: ShopWebsiteData[] = [
  {
    id: "shop-001",
    slug: "elite-barber",
    templateId: 1,
    languageMode: "bilingual",
    audience: "men",
    name: {
      ar: "صالون إليت",
      en: "Elite Barber",
    },
    tagline: {
      ar: "قصة كلاسيكية. لمسة عصرية.",
      en: "Classic cuts. Modern finish.",
    },
    description: {
      ar: "صالون حلاقة رجالي في القاهرة يقدّم قصات دقيقة، لحية مرتبة، وتجربة هادئة من أول دخولك حتى آخر لمسة.",
      en: "A men’s barbershop in Cairo for precise cuts, clean beards, and a calm experience from the first welcome to the last detail.",
    },
    about: {
      title: {
        ar: "من نحن",
        en: "About us",
      },
      body: {
        ar: "بدأنا بإيمان بسيط: الحلاقة الجيدة ما هي بس قصة شعر. هي وقت تهدأ فيه، وثقة تنعكس في مرآتك. فريقنا يهتم بالتفاصيل — من خط اللحية إلى نظافة الأدوات — عشان تطلع بشكل يليق فيك.",
        en: "We started with a simple belief: a great cut is more than hair. It’s a calm pause and confidence you can see. Our team obsesses over the details — from the beard line to clean tools — so you leave looking like yourself, sharpened.",
      },
      highlights: [
        {
          id: "hl-1",
          icon: "experience",
          title: {
            ar: "أكثر من 12 سنة خبرة",
            en: "Over 12 years of craft",
          },
          description: {
            ar: "فريق محترف اشتغل على آلاف القصات ويعرف الفرق الصغير اللي يفرق.",
            en: "A skilled team with thousands of cuts behind them — and an eye for the small details.",
          },
        },
        {
          id: "hl-2",
          icon: "sanitized",
          title: {
            ar: "أدوات معقّمة في كل جلسة",
            en: "Sanitized tools every visit",
          },
          description: {
            ar: "تعقيم وتنظيف قبل وبعد كل عميل عشان تكون مرتاح وآمن.",
            en: "Tools cleaned and sanitized before and after every client so you can relax.",
          },
        },
        {
          id: "hl-3",
          icon: "products",
          title: {
            ar: "منتجات عناية مختارة بعناية",
            en: "Carefully chosen products",
          },
          description: {
            ar: "نستخدم منتجات مناسبة للشعر والبشرة — من غير مبالغة.",
            en: "We use products that suit hair and skin — effective, never overdone.",
          },
        },
      ],
    },
    categories: [
      {
        id: "haircuts",
        name: { ar: "قصات الشعر", en: "Haircuts" },
        services: [
          {
            id: "svc-classic",
            name: { ar: "قصة كلاسيكية", en: "Classic haircut" },
            description: {
              ar: "قصة نظيفة حسب شكل الوجه مع غسيل وتسريح.",
              en: "A clean cut shaped to your face, with wash and style.",
            },
            price: { ar: "150 ج.م", en: "150 EGP" },
          },
          {
            id: "svc-fade",
            name: { ar: "فيد تدريجي", en: "Skin fade" },
            description: {
              ar: "فيد ناعم من الجوانب مع تشطيب دقيق.",
              en: "A smooth fade with a sharp, clean finish.",
            },
            price: { ar: "180 ج.م", en: "180 EGP" },
          },
          {
            id: "svc-scissors",
            name: { ar: "قصة بالمقص", en: "Scissor cut" },
            description: {
              ar: "قصة بالمقص فقط لمظهر طبيعي ومرتب.",
              en: "Scissor-only cut for a natural, tidy look.",
            },
            price: { ar: "200 ج.م", en: "200 EGP" },
          },
          {
            id: "svc-kids",
            name: { ar: "قصة أطفال", en: "Kids cut" },
            description: {
              ar: "قصة مريحة للأولاد مع صبر وترتيب.",
              en: "A calm kids cut — patient, neat, and quick.",
            },
            price: { ar: "120 ج.م", en: "120 EGP" },
          },
        ],
      },
      {
        id: "beard",
        name: { ar: "اللحية", en: "Beard" },
        services: [
          {
            id: "svc-beard-trim",
            name: { ar: "تهذيب لحية", en: "Beard trim" },
            description: {
              ar: "تحديد وتشكيل اللحية بلمسة دقيقة.",
              en: "Sharp beard shaping with clean lines.",
            },
            price: { ar: "80 ج.م", en: "80 EGP" },
          },
          {
            id: "svc-beard-full",
            name: { ar: "لحية كاملة + زيت", en: "Full beard + oil" },
            description: {
              ar: "تهذيب كامل مع زيت عناية للحية.",
              en: "Full trim with nourishing beard oil.",
            },
            price: { ar: "120 ج.م", en: "120 EGP" },
          },
          {
            id: "svc-mustache",
            name: { ar: "تهذيب شارب", en: "Mustache trim" },
            description: {
              ar: "ضبط الشارب بحد مرتب ومتناسق.",
              en: "A clean mustache line that stays balanced.",
            },
            price: { ar: "50 ج.م", en: "50 EGP" },
          },
        ],
      },
      {
        id: "packages",
        name: { ar: "باقات", en: "Packages" },
        services: [
          {
            id: "svc-royal",
            name: { ar: "باقة ملكية", en: "Royal package" },
            description: {
              ar: "قصة + لحية + ماسك وجه وتجربة متكاملة.",
              en: "Haircut + beard + face mask — a full reset.",
            },
            price: { ar: "280 ج.م", en: "280 EGP" },
          },
          {
            id: "svc-quick",
            name: { ar: "باقة سريعة", en: "Express package" },
            description: {
              ar: "قصة + تهذيب لحية خفيف في جلسة واحدة.",
              en: "Haircut plus a light beard tidy-up in one visit.",
            },
            price: { ar: "220 ج.م", en: "220 EGP" },
          },
          {
            id: "svc-groom",
            name: { ar: "باقة عريس", en: "Groom package" },
            description: {
              ar: "قصة، لحية، عناية بشرة، وتسريح للمناسبة.",
              en: "Cut, beard, skin care, and styling for the big day.",
            },
            price: { ar: "450 ج.م", en: "450 EGP" },
          },
        ],
      },
      {
        id: "color-care",
        name: { ar: "صبغات وعناية", en: "Color & care" },
        services: [
          {
            id: "svc-color",
            name: { ar: "صبغة رجالية", en: "Men’s color" },
            description: {
              ar: "تغطية شعر رمادي بلون طبيعي ومتوازن.",
              en: "Natural gray coverage with a balanced tone.",
            },
            price: { ar: "250 ج.م", en: "250 EGP" },
          },
          {
            id: "svc-mask",
            name: { ar: "ماسك شعر", en: "Hair mask" },
            description: {
              ar: "ترطيب عميق للشعر التالف أو الجاف.",
              en: "Deep moisture for dry or stressed hair.",
            },
            price: { ar: "100 ج.م", en: "100 EGP" },
          },
          {
            id: "svc-face",
            name: { ar: "عناية بشرة الوجه", en: "Face treatment" },
            description: {
              ar: "تنظيف خفيف وانتعاش للبشرة بعد الحلاقة.",
              en: "A light cleanse and refresh after the shave.",
            },
            price: { ar: "90 ج.م", en: "90 EGP" },
          },
        ],
      },
      {
        id: "extras",
        name: { ar: "إضافات", en: "Extras" },
        services: [
          {
            id: "svc-wash",
            name: { ar: "غسيل وتسريح", en: "Wash & style" },
            description: {
              ar: "غسيل احترافي مع تسريح حسب رغبتك.",
              en: "Professional wash with styling to finish.",
            },
            price: { ar: "70 ج.م", en: "70 EGP" },
          },
          {
            id: "svc-eyebrows",
            name: { ar: "تهذيب حواجب", en: "Eyebrow tidy" },
            description: {
              ar: "تنظيم خفيف للحواجب بشكل طبيعي.",
              en: "A subtle tidy for a natural brow shape.",
            },
            price: { ar: "40 ج.م", en: "40 EGP" },
          },
          {
            id: "svc-wax",
            name: { ar: "إزالة شعر الأذن/الأنف", en: "Ear / nose wax" },
            description: {
              ar: "لمسة نظافة سريعة ومريحة.",
              en: "A quick, clean finishing touch.",
            },
            price: { ar: "60 ج.م", en: "60 EGP" },
          },
        ],
      },
    ],
    timeSlots: [
      timeSlot("10:00"),
      timeSlot("11:30"),
      timeSlot("13:00"),
      timeSlot("15:30"),
      timeSlot("17:00"),
      timeSlot("19:30"),
      timeSlot("21:00"),
    ],
    hours: [
      {
        day: { ar: "السبت — الخميس", en: "Sat — Thu" },
        hours: { ar: "10 صباحاً — 11 مساءً", en: "10 AM — 11 PM" },
      },
      {
        day: { ar: "الجمعة", en: "Friday" },
        hours: { ar: "4 مساءً — 11 مساءً", en: "4 PM — 11 PM" },
      },
    ],
    contact: {
      phone: "+201000000001",
      whatsapp: "201000000001",
      address: {
        ar: "شارع 26 يوليو، الزمالك، القاهرة",
        en: "26 July Street, Zamalek, Cairo",
      },
      mapUrl: "https://maps.google.com",
      facebook: "https://facebook.com/elitebarber",
      instagram: "https://instagram.com/elitebarber",
      tiktok: "https://tiktok.com/@elitebarber",
    },
    faqs: MEN_FAQS,
    seo: {
      title: { ar: "", en: "" },
      description: { ar: "", en: "" },
      keywords: { ar: [], en: [] },
      location: { ar: "القاهرة", en: "Cairo" },
      country: { ar: "مصر", en: "Egypt" },
      businessType: { ar: "صالون حلاقة", en: "Barbershop" },
    },
  },
  {
    id: "shop-002",
    slug: "luxe-salon",
    templateId: 1,
    languageMode: "bilingual",
    audience: "women",
    name: {
      ar: "صالون لوكس",
      en: "Luxe Salon",
    },
    tagline: {
      ar: "جمال بتفاصيل راقية.",
      en: "Beauty, refined.",
    },
    description: {
      ar: "صالون نسائي في القاهرة يقدّم قصات، عناية بالشعر، أظافر، ومكياج — بتجربة مرتبة ومريحة.",
      en: "A women’s salon in Cairo for hair, nails, and makeup — calm, polished, and welcoming.",
    },
    about: {
      title: {
        ar: "من نحن",
        en: "About us",
      },
      body: {
        ar: "هنهتم إن كل زيارة تكون مريحة ومضبوطة. من أول استشارة لحد آخر لمسة، هدفنا شكل يناسبك ويخلّيكِ مرتاحة.",
        en: "Every visit should feel calm and considered. From the first consult to the last touch, we aim for a look that feels like you — only fresher.",
      },
      highlights: [
        {
          id: "hl-w1",
          icon: "experience",
          title: {
            ar: "أكثر من 10 سنوات خبرة",
            en: "Over 10 years of craft",
          },
          description: {
            ar: "فريق متخصص في القصات والعناية والجمال اليومي والمناسبات.",
            en: "A team specialized in everyday beauty and special occasions.",
          },
        },
        {
          id: "hl-w2",
          icon: "sanitized",
          title: {
            ar: "أدوات معقّمة في كل جلسة",
            en: "Sanitized tools every visit",
          },
          description: {
            ar: "نظافة وتعقيم قبل وبعد كل عميلة.",
            en: "Clean and sanitized before and after every client.",
          },
        },
        {
          id: "hl-w3",
          icon: "products",
          title: {
            ar: "منتجات مختارة بعناية",
            en: "Carefully chosen products",
          },
          description: {
            ar: "نستخدم منتجات مناسبة لأنواع الشعر والبشرة المختلفة.",
            en: "Products suited to different hair and skin needs.",
          },
        },
      ],
    },
    categories: [
      {
        id: "hair",
        name: { ar: "الشعر", en: "Hair" },
        services: [
          {
            id: "w-cut",
            name: { ar: "قصة وتصفيف", en: "Cut & style" },
            description: {
              ar: "قصة حسب شكل الوجه مع تصفيف نهائي.",
              en: "A shape that suits your face, finished with styling.",
            },
            price: { ar: "250 ج.م", en: "250 EGP" },
          },
          {
            id: "w-blowout",
            name: { ar: "سشوار", en: "Blow dry" },
            description: {
              ar: "تصفيف سشوار مرتب يدوم معاكِ.",
              en: "A smooth blow dry that holds through the day.",
            },
            price: { ar: "180 ج.م", en: "180 EGP" },
          },
          {
            id: "w-keratin",
            name: { ar: "كيراتين", en: "Keratin" },
            description: {
              ar: "تنعيم وعناية للشعر التالف أو المجعد.",
              en: "Smoothing care for frizz-prone or stressed hair.",
            },
            price: { ar: "1200 ج.م", en: "1200 EGP" },
          },
        ],
      },
      {
        id: "color-care",
        name: { ar: "صبغات وعناية", en: "Color & care" },
        services: [
          {
            id: "w-color",
            name: { ar: "صبغة كاملة", en: "Full color" },
            description: {
              ar: "لون متجانس مع عناية بعد الصبغة.",
              en: "Even color with aftercare for healthier hair.",
            },
            price: { ar: "600 ج.م", en: "600 EGP" },
          },
          {
            id: "w-highlights",
            name: { ar: "هايلايت", en: "Highlights" },
            description: {
              ar: "إضاءات طبيعية تضيف عمق للون.",
              en: "Soft highlights that add depth and light.",
            },
            price: { ar: "800 ج.م", en: "800 EGP" },
          },
          {
            id: "w-mask",
            name: { ar: "ماسك ترطيب", en: "Hydrating mask" },
            description: {
              ar: "ترطيب عميق للشعر الجاف.",
              en: "Deep moisture for dry hair.",
            },
            price: { ar: "150 ج.م", en: "150 EGP" },
          },
        ],
      },
      {
        id: "nails",
        name: { ar: "الأظافر", en: "Nails" },
        services: [
          {
            id: "w-manicure",
            name: { ar: "مانيكير", en: "Manicure" },
            description: {
              ar: "عناية وتنظيف مع طلاء حسب اختيارك.",
              en: "Care and tidy finishing with polish of your choice.",
            },
            price: { ar: "120 ج.م", en: "120 EGP" },
          },
          {
            id: "w-gel",
            name: { ar: "أظافر جل", en: "Gel nails" },
            description: {
              ar: "جل يدوم أطول بمظهر أنيق.",
              en: "Longer-lasting gel with a clean finish.",
            },
            price: { ar: "280 ج.م", en: "280 EGP" },
          },
          {
            id: "w-pedicure",
            name: { ar: "بديكير", en: "Pedicure" },
            description: {
              ar: "عناية كاملة للقدمين والأظافر.",
              en: "Full care for feet and nails.",
            },
            price: { ar: "160 ج.م", en: "160 EGP" },
          },
        ],
      },
      {
        id: "makeup",
        name: { ar: "مكياج", en: "Makeup" },
        services: [
          {
            id: "w-soft",
            name: { ar: "مكياج يومي", en: "Soft glam" },
            description: {
              ar: "مكياج خفيف ومرتب للاستخدام اليومي.",
              en: "Light, polished makeup for everyday wear.",
            },
            price: { ar: "350 ج.م", en: "350 EGP" },
          },
          {
            id: "w-event",
            name: { ar: "مكياج مناسبات", en: "Event makeup" },
            description: {
              ar: "مكياج كامل للسهرة أو المناسبة.",
              en: "Full makeup for evenings and special events.",
            },
            price: { ar: "550 ج.م", en: "550 EGP" },
          },
        ],
      },
      {
        id: "packages",
        name: { ar: "باقات", en: "Packages" },
        services: [
          {
            id: "w-bride",
            name: { ar: "باقة عروس", en: "Bridal package" },
            description: {
              ar: "شعر + مكياج للعروس مع تجربة متكاملة.",
              en: "Hair + makeup for the bride — a full experience.",
            },
            price: { ar: "2500 ج.م", en: "2500 EGP" },
          },
          {
            id: "w-day",
            name: { ar: "باقة يوم كامل", en: "Full day package" },
            description: {
              ar: "شعر، أظافر، وعناية خفيفة في زيارة واحدة.",
              en: "Hair, nails, and light care in one visit.",
            },
            price: { ar: "900 ج.م", en: "900 EGP" },
          },
        ],
      },
    ],
    timeSlots: [
      timeSlot("10:00"),
      timeSlot("11:30"),
      timeSlot("13:00"),
      timeSlot("15:30"),
      timeSlot("17:00"),
      timeSlot("19:00"),
    ],
    hours: [
      {
        day: { ar: "السبت — الخميس", en: "Sat — Thu" },
        hours: { ar: "10 صباحاً — 10 مساءً", en: "10 AM — 10 PM" },
      },
      {
        day: { ar: "الجمعة", en: "Friday" },
        hours: { ar: "2 مساءً — 10 مساءً", en: "2 PM — 10 PM" },
      },
    ],
    contact: {
      phone: "+201000000002",
      whatsapp: "201000000002",
      address: {
        ar: "شارع النيل، المهندسين، الجيزة",
        en: "Nile Street, Mohandessin, Giza",
      },
      mapUrl: "https://maps.google.com",
      facebook: "https://facebook.com/luxesalon",
      instagram: "https://instagram.com/luxesalon",
      tiktok: "https://tiktok.com/@luxesalon",
    },
    faqs: WOMEN_FAQS,
    seo: {
      title: { ar: "", en: "" },
      description: { ar: "", en: "" },
      keywords: { ar: [], en: [] },
      location: { ar: "الجيزة", en: "Giza" },
      country: { ar: "مصر", en: "Egypt" },
      businessType: { ar: "صالون نسائي", en: "Beauty salon" },
    },
  },
];

/** Same shop content, dark theme (template 2) for preview. */
const DARK_SHOPS: ShopWebsiteData[] = [
  {
    ...DUMMY_SHOPS[0],
    id: "shop-003",
    slug: "elite-barber-dark",
    templateId: 2,
  },
  {
    ...DUMMY_SHOPS[1],
    id: "shop-004",
    slug: "luxe-salon-dark",
    templateId: 2,
  },
];

/** Same shop content, studio theme (template 3) for preview. */
const STUDIO_SHOPS: ShopWebsiteData[] = [
  {
    ...DUMMY_SHOPS[0],
    id: "shop-005",
    slug: "elite-barber-studio",
    templateId: 3,
  },
  {
    ...DUMMY_SHOPS[1],
    id: "shop-006",
    slug: "luxe-salon-studio",
    templateId: 3,
  },
];

/** Same shop content, maison theme (template 4) for preview. */
const MAISON_SHOPS: ShopWebsiteData[] = [
  {
    ...DUMMY_SHOPS[0],
    id: "shop-007",
    slug: "elite-barber-maison",
    templateId: 4,
  },
  {
    ...DUMMY_SHOPS[1],
    id: "shop-008",
    slug: "luxe-salon-maison",
    templateId: 4,
  },
];

/** Same shop content, stadium / match-day edition (template 5) for preview. */
const KICKOFF_SHOPS: ShopWebsiteData[] = [
  {
    ...DUMMY_SHOPS[0],
    id: "shop-009",
    slug: "elite-barber-kickoff",
    templateId: 5,
  },
  {
    ...DUMMY_SHOPS[1],
    id: "shop-010",
    slug: "luxe-salon-kickoff",
    templateId: 5,
  },
];

/** Same shop content, fleur — elite feminine beauty center (template 6). */
const FLEUR_SHOPS: ShopWebsiteData[] = [
  {
    ...DUMMY_SHOPS[1],
    id: "shop-011",
    slug: "luxe-salon-fleur",
    templateId: 6,
  },
];

const ALL_SHOPS: ShopWebsiteData[] = [
  ...DUMMY_SHOPS,
  ...DARK_SHOPS,
  ...STUDIO_SHOPS,
  ...MAISON_SHOPS,
  ...KICKOFF_SHOPS,
  ...FLEUR_SHOPS,
];

export async function getShopWebsite(
  shopSlug: string,
  shopId: string,
): Promise<ShopWebsiteData | null> {
  // Future: const res = await fetch(`/api/shops/${shopSlug}/${shopId}`)
  // templateId 1–6 share the same ShopWebsiteData shape
  const shop = ALL_SHOPS.find((s) => s.slug === shopSlug && s.id === shopId);
  if (!shop) return null;

  return {
    ...shop,
    audience: shop.audience === "women" ? "women" : "men",
  };
}
