import { Metadata } from "next";
import { defaultMetadata } from "@/app/metadata";
import { LOCALE_CODES, type Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureIntroduction } from "@/components/landing/FeatureIntroduction";
import { ProductHighlights } from "@/components/landing/ProductHighlights";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { TargetAudienceSection } from "@/components/landing/TargetAudienceSection";
import LandingPriceSection from "@/components/landing/LandingPriceSection";
import LandingFAQSection from "@/components/landing/LandingFAQSection";
import LandingLayout from "@/components/layouts/LandingLayout";

export const revalidate = 300;

// 生成静态路径
export async function generateStaticParams() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}

// 生成动态元数据
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const resolvedParams = (await params) as { lang: string };
  const resolvedSearchParams = (await searchParams) as { lang?: string };

  let targetLang = resolvedParams.lang;

  const validLocales = LOCALE_CODES as readonly string[];
  if (
    resolvedSearchParams.lang &&
    validLocales.includes(resolvedSearchParams.lang)
  ) {
    targetLang = resolvedSearchParams.lang;
  }

  const isTargetLang = validLocales.includes(targetLang)
    ? (targetLang as Locale)
    : "en";

  const meta = defaultMetadata[isTargetLang];
  return meta ? ({ ...meta } as Metadata) : ({ ...defaultMetadata.en } as Metadata);
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = (await params) as { lang: string };
  const currentLocale: Locale = LOCALE_CODES.includes(
    resolvedParams.lang as Locale,
  )
    ? (resolvedParams.lang as Locale)
    : "en";

  return (
    <LandingLayout isLanding={true} currentLocale={currentLocale}>
      <main className="min-h-screen transition-colors duration-300 ">
        {/* Hero Section */}
        <HeroSection currentLocale={currentLocale} />

        {/* Features Section */}
        <FeatureIntroduction currentLocale={currentLocale} />

        {/* Product Highlights Section */}
        <ProductHighlights currentLocale={currentLocale} />

        {/* Target Audience Section */}
        <TargetAudienceSection currentLocale={currentLocale} />

        {/* Pricing Section */}
        <LandingPriceSection currentLocale={currentLocale} />

        {/* Testimonials Section */}
        <TestimonialsSection currentLocale={currentLocale} />

        {/* FAQ Section */}
        <LandingFAQSection currentLocale={currentLocale} />
      </main>
    </LandingLayout>
  );
}
