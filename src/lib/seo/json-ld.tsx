import { ar } from "@/lib/i18n/locales/ar";
import { en } from "@/lib/i18n/locales/en";
import { getSiteUrl, siteConfig } from "./config";

type JsonLd = Record<string, unknown>;

function JsonLdScript({ id, data }: { id: string; data: JsonLd }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SeoJsonLd() {
  const siteUrl = getSiteUrl();
  const meta = ar.meta;
  const features = [
    ...ar.features.items.map((item) => item.title),
    ...en.features.items.map((item) => item.title),
  ];
  const lowestPrice = Math.min(...ar.pricing.plans.map((p) => p.priceNum));
  const highestPrice = Math.max(...ar.pricing.plans.map((p) => p.priceNum));

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    alternateName: [siteConfig.nameAr, "كاشهاب"],
    url: siteUrl,
    logo: `${siteUrl}/opengraph-image`,
    description: meta.description,
    email: siteConfig.contactEmail,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${siteConfig.whatsapp}`,
        availableLanguage: ["Arabic", "English"],
        areaServed: ["SA", "EG", "AE", "KW", "QA", "BH", "OM", "JO"],
      },
    ],
    sameAs: siteConfig.sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: meta.siteName,
    description: meta.description,
    inLanguage: ["ar-SA", "en-US"],
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#software`,
    name: siteConfig.name,
    alternateName: siteConfig.nameAr,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Salon Management Software",
    operatingSystem: "Web",
    url: siteUrl,
    description: meta.description,
    inLanguage: ["ar", "en"],
    featureList: features,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "SAR",
      lowPrice: String(lowestPrice),
      highPrice: String(highestPrice),
      offerCount: ar.pricing.plans.length,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/#pricing`,
    },
    provider: { "@id": `${siteUrl}/#organization` },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: ar.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: meta.title,
    description: meta.description,
    inLanguage: "ar-SA",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#software` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}/opengraph-image`,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.nameAr,
        item: siteUrl,
      },
    ],
  };

  return (
    <>
      <JsonLdScript id="ld-organization" data={organization} />
      <JsonLdScript id="ld-website" data={website} />
      <JsonLdScript id="ld-webpage" data={webPage} />
      <JsonLdScript id="ld-software" data={software} />
      <JsonLdScript id="ld-faq" data={faq} />
      <JsonLdScript id="ld-breadcrumb" data={breadcrumb} />
    </>
  );
}
