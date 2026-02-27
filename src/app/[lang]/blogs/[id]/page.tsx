import { getWeeklyPosts } from "@/app/[lang]/blog/data";
import React from "react";
import ServerMainLayout from "@/components/layouts/ServerMainLayout";
import { Dot } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { Fragment } from "react";
import dayjs from "dayjs";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getText } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { LOCALE_CODES, type Locale } from "@/lib/i18n";

// 生成动态元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}): Promise<Metadata | undefined> {
  // 等待 params 解析
  const resolvedParams = await params;
  const blogContents = await getWeeklyPosts();

  // 尝试从对应语言博客中查找
  let post = blogContents[resolvedParams.lang]?.[resolvedParams.id];
  if (!post) {
    // 如果当前语言没有，尝试英文
    post = blogContents.en?.[resolvedParams.id];
  }

  if (!post) {
    // 如果英文没有，尝试中文
    post = blogContents.zh?.[resolvedParams.id];
  }

  // 如果找不到文章，返回默认元数据
  if (!post) {
    return {
      title: getText("meta.title.blogNotFound", resolvedParams.lang),
      description: getText(
        "meta.description.blogNotFound",
        resolvedParams.lang
      ),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // 根据语言生成元数据（新语言无翻译时用 en）
  const BLOG_DISPLAY_LOCALES = ["zh", "en", "ja", "ko", "hi"] as const;
  const isTargetLang = BLOG_DISPLAY_LOCALES.includes(resolvedParams.lang as any)
    ? (resolvedParams.lang as (typeof BLOG_DISPLAY_LOCALES)[number])
    : "en";

  const baseUrl = "https://snapvee.com";
  const currentUrl = `${baseUrl}/${resolvedParams.lang}/blogs/${resolvedParams.id}`;

  // 生成标题和描述
  const title = `${post.attributes.title} - ${getText("meta.title.blog", isTargetLang)}`;

  const description = post.attributes.description || post.attributes.title;
  const keywords =
    post.attributes.tags?.join(", ") ||
    getText("meta.keywords.blog", isTargetLang);

  // 生成图片
  const imageUrl =
    post.attributes.image ||
    "https://oss.api-service.net.cn/snapvee/images/logo.png";
  const imageAlt = post.attributes.title;

  // 生成作者信息
  const author =
    post.attributes.author || getText("meta.author.blog", isTargetLang);

  // 生成结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.attributes.title,
    description: description,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "SnapVee",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: "https://oss.api-service.net.cn/snapvee/images/logo.png",
      },
    },
    datePublished: post.attributes.date,
    dateModified: post.attributes.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    articleSection: getText("meta.articleSection.blog", isTargetLang),
    keywords: keywords,
    about: [
      {
        "@type": "Thing",
        name: getText("meta.articleSection.blog", isTargetLang),
        description: getText(
          "meta.articleSection.blog.description",
          isTargetLang
        ),
      },
    ],
  };

  // 生成 Open Graph 数据
  const openGraph = {
    title: title,
    description: description,
    type: "article" as const,
    url: currentUrl,
    siteName: "SnapVee",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: imageAlt,
      },
    ],
    locale: isTargetLang,
    publishedTime: post.attributes.date,
    authors: [author],
    tags: post.attributes.tags || [],
  };

  // 生成 Twitter Card 数据
  const twitter = {
    card: "summary_large_image" as const,
    title: post.attributes.title,
    description: description,
    images: [imageUrl],
    site: "@snapvee",
  };

  // 生成语言版本链接
  const alternates = {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/en/blogs/${resolvedParams.id}`,
      zh: `${baseUrl}/zh/blogs/${resolvedParams.id}`,
      ja: `${baseUrl}/ja/blogs/${resolvedParams.id}`,
      ko: `${baseUrl}/ko/blogs/${resolvedParams.id}`,
      hi: `${baseUrl}/hi/blogs/${resolvedParams.id}`,
      "x-default": `${baseUrl}/en/blogs/${resolvedParams.id}`,
    },
  };

  // 生成 robots 配置
  const robots = {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };

  return {
    title,
    description,
    keywords,
    openGraph,
    twitter,
    // @ts-ignore
    robots,
    alternates,
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
}

// 页面组件
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) {
  // 等待 params 解析
  const resolvedParams = await params;
  const blogContents = await getWeeklyPosts();

  let post =
    blogContents[resolvedParams.lang]?.[resolvedParams.id] ||
    blogContents.en?.[resolvedParams.id] ||
    blogContents.zh?.[resolvedParams.id] ||
    blogContents.ja?.[resolvedParams.id] ||
    blogContents.ko?.[resolvedParams.id] ||
    blogContents.hi?.[resolvedParams.id];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">
            {getText("meta.title.blogNotFound", resolvedParams.lang)}
          </h1>
          <p className="text-gray-400">
            {getText("meta.description.blogNotFound", resolvedParams.lang)}
          </p>
        </div>
      </div>
    );
  }

  const { attributes, markdown } = post;
  const date = dayjs(attributes.date).format("YYYY-MM-DD");

  const breadcrumbItems = [
    {
      label: getText("meta.breadcrumb.blog", resolvedParams.lang),
      href: `/${resolvedParams.lang}/blog`,
    },
    { label: attributes.title, current: true },
  ];

  return (
    <ServerMainLayout isLanding={false}>
      <main className="container mt-32">
        <Breadcrumb items={breadcrumbItems} className="mb-4" />

        {/* 文章标题 */}
        <h1 className="text-center text-4xl font-bold mb-4 text-white">
          {attributes.title}
        </h1>

        {/* 文章元信息 */}
        <div className="mt-4 flex items-center justify-center text-gray-400 mb-6">
          <span>{attributes.author}</span>
          <Dot className="text-gray-500 mx-2" />
          <time dateTime={date}>{date}</time>
        </div>

        {/* 文章标签 */}
        {attributes.tags && attributes.tags.length > 0 && (
          <div className="mt-4 flex items-center justify-center text-gray-400 mb-8">
            {attributes.tags.map((tag: string, index: number) => (
              <Fragment key={index}>
                <span className="cursor-pointer underline decoration-gray-400 decoration-1 underline-offset-4 hover:text-white transition-colors">
                  {tag}
                </span>
                {index < attributes.tags.length - 1 && (
                  <Dot className="text-gray-500 mx-2" />
                )}
              </Fragment>
            ))}
          </div>
        )}

        {/* 文章描述 */}
        {attributes.description && (
          <div className="mx-auto max-w-prose mb-8">
            <blockquote className="border-l-purple-500 border-l-4 pl-4 text-lg text-gray-300 italic">
              {attributes.description}
            </blockquote>
          </div>
        )}

        {/* 文章内容 */}
        <div className="mx-auto max-w-prose">
          <Markdown text={markdown} type="blog" />
        </div>
      </main>
    </ServerMainLayout>
  );
}
