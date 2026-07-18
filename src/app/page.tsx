import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { SeoJsonLd } from "@/lib/seo/json-ld";
import { ar } from "@/lib/i18n/locales/ar";

export const metadata: Metadata = {
  title: {
    absolute: ar.meta.title,
  },
  description: ar.meta.description,
  openGraph: {
    title: ar.meta.ogTitle,
    description: ar.meta.ogDescription,
  },
  twitter: {
    title: ar.meta.ogTitle,
    description: ar.meta.ogDescription,
  },
};

export default function Home() {
  return (
    <>
      <SeoJsonLd />
      <LandingPage />
    </>
  );
}
