export type Locale = "ar" | "en";

export type NavLink = {
  label: string;
  href: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export type Step = {
  title: string;
  description: string;
};

export type AudienceCard = {
  title: string;
  description: string;
  highlights: string[];
};

export type PricingPlan = {
  name: string;
  price: string;
  priceNum: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
};

export type PricingAddon = {
  name: string;
  price: string;
  priceNum: number;
  period: string;
  included: string[];
  cta: string;
};

export type PricingSocialPlan = {
  name: string;
  price: string;
  priceNum: number;
  period: string;
  includesNote: string;
  stats: { value: string; label: string }[];
  editingLabel: string;
  cta: string;
};

export type PricingBundle = {
  name: string;
  description: string;
  price: string;
  priceNum: number;
  originalPrice: string;
  period: string;
  savings: string;
  badge?: string;
  highlighted?: boolean;
  noTrialNote?: string;
  cta: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  business: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    siteName: string;
    category: string;
  };
  nav: {
    features: string;
    demo: string;
    pricing: string;
    faq: string;
    login: string;
    startFree: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  logos: {
    title: string;
    items: { name: string; city?: string }[];
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    items: Feature[];
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Step[];
  };
  demo: {
    badge: string;
    title: string;
    subtitle: string;
    screenshots: {
      dashboard: string;
      cashier: string;
      profitLoss: string;
      reports: string;
    };
  };
  audience: {
    badge: string;
    title: string;
    subtitle: string;
    barbers: AudienceCard;
    salons: AudienceCard;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    plans: PricingPlan[];
    addon: PricingAddon;
    social: {
      title: string;
      subtitle: string;
      plans: PricingSocialPlan[];
      note: string;
      trialNote: string;
    };
    bundles: {
      title: string;
      subtitle: string;
      items: PricingBundle[];
    };
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: FAQItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
  footer: {
    tagline: string;
    product: string;
    company: string;
    legal: string;
    links: {
      features: string;
      pricing: string;
      demo: string;
      about: string;
      contact: string;
      privacy: string;
      terms: string;
    };
    copyright: string;
  };
};
