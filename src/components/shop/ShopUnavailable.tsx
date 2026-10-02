import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

/**
 * Full-page screens shown instead of a shop's pages (main page and rules
 * page) when its subscription has ended or its plan has no website.
 */
export function SubscriptionEnded() {
  return (
    <main
      className="relative grid min-h-screen place-items-center overflow-hidden bg-brand-950 px-6 py-16 text-center text-white"
      dir="rtl"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.18),transparent_48%)]"
      />
      <section className="relative mx-auto flex w-full max-w-xl flex-col items-center">
        <BrandLogo
          variant="dark"
          priority
          className="mb-10 h-auto w-56 max-w-full sm:w-72"
        />
        <div className="mb-6 h-px w-20 bg-accent-400" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          انتهى الاشتراك
        </h1>
        <p className="mt-5 max-w-md text-lg leading-8 text-brand-300">
          عذرًا، انتهى اشتراك هذا المتجر ولم يعد الموقع متاحًا حاليًا.
        </p>
        <p
          className="mt-3 max-w-md font-english text-sm leading-6 text-brand-400"
          dir="ltr"
          lang="en"
        >
          This shop&apos;s subscription has ended, and its website is currently
          unavailable.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-accent-400 px-7 py-3 font-bold text-brand-950 transition-colors hover:bg-accent-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400"
        >
          العودة إلى موقع CashHub
        </Link>
      </section>
    </main>
  );
}

export function WebsiteFeatureUnavailable() {
  return (
    <main
      className="relative grid min-h-screen place-items-center overflow-hidden bg-brand-950 px-6 py-16 text-center text-white"
      dir="rtl"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.18),transparent_48%)]"
      />
      <section className="relative mx-auto flex w-full max-w-xl flex-col items-center">
        <BrandLogo
          variant="dark"
          priority
          className="mb-10 h-auto w-56 max-w-full sm:w-72"
        />
        <div className="mb-6 h-px w-20 bg-accent-400" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          الميزة غير متاحة في الخطة
        </h1>
        <p className="mt-5 max-w-md text-lg leading-8 text-brand-300">
          عذرًا، ميزة الموقع غير متاحة في خطة هذا المتجر. يمكنك الترقية لخطة تدعم
          موقع الصالون.
        </p>
        <p
          className="mt-3 max-w-md font-english text-sm leading-6 text-brand-400"
          dir="ltr"
          lang="en"
        >
          The website feature is not included in this shop&apos;s plan. Upgrade
          to a plan that includes the salon website.
        </p>
        <Link
          href="/#pricing"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-accent-400 px-7 py-3 font-bold text-brand-950 transition-colors hover:bg-accent-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400"
        >
          عرض الخطط
        </Link>
      </section>
    </main>
  );
}

/** Rules page of a shop whose Advanced HR feature is off. */
export function RulesUnavailable() {
  return (
    <main
      className="relative grid min-h-screen place-items-center overflow-hidden bg-brand-950 px-6 py-16 text-center text-white"
      dir="rtl"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.18),transparent_48%)]"
      />
      <section className="relative mx-auto flex w-full max-w-xl flex-col items-center">
        <BrandLogo
          variant="dark"
          priority
          className="mb-10 h-auto w-56 max-w-full sm:w-72"
        />
        <div className="mb-6 h-px w-20 bg-accent-400" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          الصفحة غير متاحة
        </h1>
        <p className="mt-5 max-w-md text-lg leading-8 text-brand-300">
          عذرًا، صفحة قواعد هذا المتجر غير متاحة حاليًا.
        </p>
        <p
          className="mt-3 max-w-md font-english text-sm leading-6 text-brand-400"
          dir="ltr"
          lang="en"
        >
          Sorry, this shop&apos;s rules page is currently unavailable.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-accent-400 px-7 py-3 font-bold text-brand-950 transition-colors hover:bg-accent-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400"
        >
          العودة إلى موقع CashHub
        </Link>
      </section>
    </main>
  );
}
