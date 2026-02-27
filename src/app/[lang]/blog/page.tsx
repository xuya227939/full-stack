import { BlogList } from "./list";
import { Metadata } from "next";
import { metadata } from "@/constants/metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// 支持的语言
import { LOCALE_CODES, type Locale } from "@/lib/i18n";

// 生成动态元数据
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  // 使用类型断言（如果确定类型）
  const resolvedParams = (await params) as { lang: string };
  const resolvedSearchParams = (await searchParams) as { lang?: string };

  let targetLang = resolvedParams.lang;

  // 如果 searchParams 中有语言参数，使用它
  if (
    resolvedSearchParams.lang &&
    ["en", "zh", "ja", "ko", "hi"].includes(resolvedSearchParams.lang)
  ) {
    targetLang = resolvedSearchParams.lang;
  }

  const isTargetLang =
    targetLang === "en"
      ? "en"
      : targetLang === "ja"
        ? "ja"
        : targetLang === "ko"
          ? "ko"
          : targetLang === "hi"
            ? "hi"
            : "zh";

  // @ts-ignore
  return {
    ...metadata.blog[isTargetLang],
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLocale = LOCALE_CODES.includes(lang as Locale)
    ? (lang as Locale)
    : "en";

  return (
    <main className="min-h-screen transition-colors duration-300">
      <BlogList currentLocale={currentLocale} />
    </main>
  );
}
