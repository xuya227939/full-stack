import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { LOCALE_CODES } from "@/lib/i18n";

// 博客内容映射表
interface BlogContent {
  attributes: any;
  markdown: string;
}

type BlogContents = Record<
  string,
  {
    [id: string]: BlogContent;
  }
>;

// 有独立博客目录的语言（可扩展）
const BLOG_DATA_LOCALES = ["zh", "en", "ja", "ko", "hi"] as const;

export async function getWeeklyPosts(): Promise<BlogContents> {
  const blogContents: BlogContents = {} as BlogContents;
  for (const locale of LOCALE_CODES) {
    blogContents[locale] = {};
  }

  const postsEnDirectory = path.join(
    process.cwd(),
    "src/app/[lang]/blog/data/en"
  );

  const postsZhDirectory = path.join(
    process.cwd(),
    "src/app/[lang]/blog/data/zh"
  );

  const postsJaDirectory = path.join(
    process.cwd(),
    "src/app/[lang]/blog/data/ja"
  );

  const postsKoDirectory = path.join(
    process.cwd(),
    "src/app/[lang]/blog/data/ko"
  );

  const postsHiDirectory = path.join(
    process.cwd(),
    "src/app/[lang]/blog/data/hi"
  );

  let filenamesEn = await fs.promises.readdir(postsEnDirectory);
  filenamesEn = filenamesEn.reverse();

  let filenamesJa = await fs.promises.readdir(postsJaDirectory);
  filenamesJa = filenamesJa.reverse();

  let filenamesKo = await fs.promises.readdir(postsKoDirectory);
  filenamesKo = filenamesKo.reverse();

  let filenamesHi = await fs.promises.readdir(postsHiDirectory);
  filenamesHi = filenamesHi.reverse();

  let filenamesZh = await fs.promises.readdir(postsZhDirectory);
  filenamesZh = filenamesZh.reverse();

  const postsZhContents = await Promise.all(
    filenamesZh.map(async (filename) => {
      const fullPath = path.join(postsZhDirectory, filename);
      const fileContents = await fs.promises.readFile(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      blogContents.zh[filename.replace(/\.md/, "")] = {
        attributes: data,
        markdown: content,
      };
      return {
        attributes: data,
        markdown: content,
      };
    })
  );

  const postsEnContents = await Promise.all(
    filenamesEn.map(async (filename) => {
      const fullPath = path.join(postsEnDirectory, filename);
      const fileContents = await fs.promises.readFile(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      blogContents.en[filename.replace(/\.md/, "")] = {
        attributes: data,
        markdown: content,
      };
      return {
        attributes: data,
        markdown: content,
      };
    })
  );

  const postsJaContents = await Promise.all(
    filenamesJa.map(async (filename) => {
      const fullPath = path.join(postsJaDirectory, filename);
      const fileContents = await fs.promises.readFile(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      blogContents.ja[filename.replace(/\.md/, "")] = {
        attributes: data,
        markdown: content,
      };
      return {
        attributes: data,
        markdown: content,
      };
    })
  );

  const postsKoContents = await Promise.all(
    filenamesKo.map(async (filename) => {
      const fullPath = path.join(postsKoDirectory, filename);
      const fileContents = await fs.promises.readFile(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      blogContents.ko[filename.replace(/\.md/, "")] = {
        attributes: data,
        markdown: content,
      };
      return {
        attributes: data,
        markdown: content,
      };
    })
  );

  const postsHiContents = await Promise.all(
    filenamesHi.map(async (filename) => {
      const fullPath = path.join(postsHiDirectory, filename);
      const fileContents = await fs.promises.readFile(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      blogContents.hi[filename.replace(/\.md/, "")] = {
        attributes: data,
        markdown: content,
      };
      return {
        attributes: data,
        markdown: content,
      };
    })
  );

  // 新语言无独立目录时，回退到 en 内容
  const fallbackLocales = LOCALE_CODES.filter(
    (l) => !BLOG_DATA_LOCALES.includes(l as (typeof BLOG_DATA_LOCALES)[number]),
  );
  for (const locale of fallbackLocales) {
    blogContents[locale] = { ...blogContents.en };
  }

  return blogContents;
}
