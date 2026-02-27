export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SnapVee - Universal Social Media Video Downloader",
    alternateName: "SnapVee",
    url: "https://snapvee.com",
    description:
      "SnapVee is the ultimate social media video downloader. Download videos from TikTok, Instagram, YouTube, Facebook, Twitter, Bilibili, Douyin, Kuaishou, Threads and more platforms. Free, fast, no watermark.",
    inLanguage: ["en", "zh", "ja", "ko", "hi"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://snapvee.com/download",
      "query-input": "required name=url",
    },
    author: {
      "@type": "Organization",
      name: "SnapVee",
      url: "https://snapvee.com",
      logo: "https://oss.api-service.net.cn/snapvee/images/logo.png",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SnapVee",
    url: "https://snapvee.com",
    logo: "https://oss.api-service.net.cn/snapvee/images/logo.png",
    description:
      "SnapVee is the ultimate social media video downloader supporting 50+ platforms worldwide.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://snapvee.com",
    },
    sameAs: [
      "https://x.com/snapvee",
      "https://twitter.com/snapvee",
      "https://www.facebook.com/snapvee",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; item: string }>;
  url: string;
}

export function BreadcrumbSchema({ items, url }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://snapvee.com${item.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  questions: Array<{ question: string; answer: string }>;
  url: string;
}

export function FAQSchema({ questions, url }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
    url: `https://snapvee.com${url}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
