import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
});

const nextConfig: NextConfig = {
  env: {
    APP_ENV: process.env.APP_ENV || "development",
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  compiler: {
    // 生产环境只移除 console.log，保留 console.error 和 console.warn 用于调试
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  reactStrictMode: true,
  devIndicators: false,
  productionBrowserSourceMaps: false, // 生产环境关闭 source maps 提升性能

  // 性能优化配置
  experimental: {
    optimizeCss: true,
    // 仅在生产环境启用包优化，开发环境禁用以避免 HMR 问题
    ...(process.env.NODE_ENV === "production" && {
      optimizePackageImports: [
        "lucide-react",
        "@radix-ui/react-icons",
        "react-icons",
        "framer-motion",
      ],
    }),
  },

  // Next.js 16: Turbopack 现在是默认打包器
  // 如果需要使用 webpack，可以设置 webpack: true，但不推荐

  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oss.api-service.net.cn",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 压缩配置
  compress: true,

  // 静态文件优化
  trailingSlash: false,

  // 页面扩展
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // 头部配置 - SEO和安全优化
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },

  // 重定向配置
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "/en/x",
        permanent: true,
      },
      
      // ===== 修复 404 错误：旧语言代码重定向 =====
      // /kr → /ko (韩语旧代码)
      {
        source: "/kr",
        destination: "/ko",
        permanent: true,
      },
      {
        source: "/kr/:path*",
        destination: "/ko/:path*",
        permanent: true,
      },
      // /zh_CN → /zh (中文旧格式)
      {
        source: "/zh_CN",
        destination: "/zh",
        permanent: true,
      },
      {
        source: "/zh_CN/:path*",
        destination: "/zh/:path*",
        permanent: true,
      },
      
      // ===== 修复 404 错误：平台页面无语言前缀 =====
      {
        source: "/youtube",
        destination: "/en/youtube",
        permanent: true,
      },
      {
        source: "/tiktok",
        destination: "/en/tiktok",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "/en/instagram",
        permanent: true,
      },
      {
        source: "/facebook",
        destination: "/en/facebook",
        permanent: true,
      },
      {
        source: "/bilibili",
        destination: "/en/bilibili",
        permanent: true,
      },
      {
        source: "/douyin",
        destination: "/en/douyin",
        permanent: true,
      },
      {
        source: "/kuaishou",
        destination: "/en/kuaishou",
        permanent: true,
      },
      {
        source: "/xiaohongshu",
        destination: "/en/xiaohongshu",
        permanent: true,
      },
      {
        source: "/threads",
        destination: "/en/threads",
        permanent: true,
      },
      {
        source: "/x",
        destination: "/en/x",
        permanent: true,
      },
      
      // ===== 修复 404 错误：其他页面无语言前缀 =====
      {
        source: "/pricing",
        destination: "/en/pricing",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/en/faq",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/en/privacy",
        permanent: true,
      },
      {
        source: "/service",
        destination: "/en/service",
        permanent: true,
      },
      {
        source: "/download",
        destination: "/en/download",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/en/settings",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/signin",
        permanent: true,
      },
      
      // ===== 修复 404 错误：博客页面 =====
      {
        source: "/blog/:slug*",
        destination: "/en/blog/:slug*",
        permanent: true,
      },
      
      // ===== 修复尾部斜杠问题 =====
      {
        source: "/en/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/zh/",
        destination: "/zh",
        permanent: true,
      },
      {
        source: "/ja/",
        destination: "/ja",
        permanent: true,
      },
      {
        source: "/ko/",
        destination: "/ko",
        permanent: true,
      },
      {
        source: "/hi/",
        destination: "/hi",
        permanent: true,
      },
    ];
  },

  // 重写配置：已移除 sitemap 重写
  // App Router 的 app/sitemap.ts 已原生提供 /sitemap.xml
  // 原 rewrite 指向不存在的 /api/sitemap，会导致 404，影响 Bing 等抓取
  async rewrites() {
    return [];
  },
};

export default withMDX(nextConfig);
