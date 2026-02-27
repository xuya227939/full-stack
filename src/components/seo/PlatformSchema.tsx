import { getPlatformTheme, type PlatformKey } from "@/constants/platformThemes";

interface PlatformSchemaProps {
  platform: PlatformKey;
  title: string;
  description: string;
  url: string;
}

export function PlatformSchema({
  platform,
  title,
  description,
  url,
}: PlatformSchemaProps) {
  const theme = getPlatformTheme(platform);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${title} - SnapVee`,
    description,
    url: `https://snapvee.com${url}`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1250",
    },
    screenshot: `https://oss.api-service.net.cn/snapvee/images/${platform}-hero.png`,
    author: {
      "@type": "Organization",
      name: "SnapVee",
      url: "https://snapvee.com",
      logo: "https://oss.api-service.net.cn/snapvee/images/logo.png",
    },
    downloadUrl: `https://snapvee.com${url}`,
    softwareVersion: "2.0.0",
    releaseNotes: `Latest update: Enhanced ${theme.name} video download support`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface PlatformVideoSchemaProps {
  platform: PlatformKey;
  videoName: string;
  videoDescription: string;
}

export function PlatformVideoSchema({
  platform,
  videoName,
  videoDescription,
}: PlatformVideoSchemaProps) {
  const theme = getPlatformTheme(platform);

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: videoName,
    description: videoDescription,
    thumbnailUrl: `https://oss.api-service.net.cn/snapvee/images/${platform}-thumbnail.png`,
    uploadDate: new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "SnapVee",
    },
    publisher: {
      "@type": "Organization",
      name: theme.name,
      logo: `https://oss.api-service.net.cn/snapvee/images/${platform}-logo.png`,
    },
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: {
        "@type": "DownloadAction",
      },
      userInteractionCount: "1000000+",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
