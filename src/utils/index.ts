import type { ClassValue } from "clsx";
import { toast } from "@/components/ui/use-toast";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

const SOCIAL_MEDIA_REGEX =
  /https?:\/\/(?:[\w-]+\.)*(?:youtube\.com|youtu\.be|facebook\.com|snapchat\.com|instagram\.com|twitter\.com|x\.com|tiktok\.com|douyin\.com|xiaohongshu\.com|bilibili\.com|b23\.tv|xhslink\.com|reddit\.com|redd\.it|tumblr\.com|t\.umblr\.com|vk\.com|vk\.cc|bsky\.app|threads\.com|kuaishou\.com)\/[\w\-.~:/?#[\]@!$&'()*+,;=%]+/i;

// 使用示例
export function extractSocialMediaLinks(text: string) {
  const matches = text.match(SOCIAL_MEDIA_REGEX);
  return matches ? matches[0] : "";
}

export function formatDuration(seconds: number): string {
  if (!seconds) return "0";

  // 直接除以60得到分钟数
  const minutes = Math.floor(seconds / 60);

  return `${minutes}`;
}

export function convertBytes(
  bytes: number,
  to: "B" | "KB" | "MB" | "GB" | "TB",
): number {
  const units = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  };

  return Number((bytes / units[to]).toFixed(2));
}

// 创建可以在任何地方调用的函数
export function showToast(props: any) {
  return toast(props);
}

// 删除cookie
export function deleteCookie() {
  document.cookie = "token=";
}

export const donwloadUrl = async (url: string) => {
  try {
    const newUrl = url.replace(/^http:/, "https:");
    const response = await axios.get(newUrl, {
      responseType: "blob",
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = response.data;
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = newUrl.split("/").pop() || "download";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(objectUrl);
    return true;
  } catch (error) {
    showToast({
      variant: "destructive",
      title: "Download Error",
      description: "跨域请求失败，请检查服务器配置",
    });
    throw error;
  }
};

export function isValidUrl(str: string) {
  try {
    return Boolean(new URL(str));
  } catch {
    return false;
  }
}

export function isEmpty<T>(value: T | null | undefined): boolean {
  if (value === null || value === undefined) return true;

  if (typeof value === "string" && value.trim() === "") return true;

  if (Array.isArray(value) && value.length === 0) return true;

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  return false;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function detectEnvironment() {
  // 检查是否在浏览器环境中
  if (typeof window === "undefined") {
    return "server";
  }

  // 检查常见的移动设备特征
  const userAgent = window.navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    "android",
    "webos",
    "iphone",
    "ipad",
    "ipod",
    "blackberry",
    "windows phone",
  ];

  // 检查屏幕宽度（可选）
  const isMobileWidth = window.innerWidth <= 768;

  // 如果用户代理包含移动关键字或屏幕宽度符合移动设备，则认为是移动H5
  if (
    mobileKeywords.some((keyword) => userAgent.includes(keyword)) ||
    isMobileWidth
  ) {
    return "H5";
  }

  // 默认认为是桌面Web环境
  return "pc";
}
