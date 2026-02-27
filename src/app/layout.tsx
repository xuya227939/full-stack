import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import "./global.css";
import { Toaster } from "../components/ui/sonner";
import { defaultMetadata } from "./metadata";
import { I18nProvider } from "@/components/providers/i18nProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Metadata } from "next";
import { CookieConsent } from "@/components/cookieConsent";
import {
  WebSiteSchema,
  OrganizationSchema,
} from "@/components/seo/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// @ts-ignore
export const metadata: Metadata = defaultMetadata;

import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class">
          <Toaster />

          <I18nProvider>
            <SessionProvider>
              <div className="bg-black">{children}</div>
              <CookieConsent />
            </SessionProvider>
          </I18nProvider>

          {/* 预连接优化 */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          {/* 移动端优化 */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />

          {/* 安全相关 */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="referrer" content="strict-origin-when-cross-origin" />

          {/* 默认拒绝所有 Cookie（符合 GDPR 要求） */}
          <Script
            id="gtag-consent"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500
              });
            `,
            }}
          ></Script>

          {/* Microsoft Clarity 脚本 - 延迟加载 */}
          <Script
            id="clarity-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function (c, l, a, r, i, t, y) {
                    c[a] =
                        c[a] ||
                        function () {
                            (c[a].q = c[a].q || []).push(arguments);
                        };
                t = l.createElement(r);
                t.async = 1;
                t.src = 'https://www.clarity.ms/tag/' + i;
                y = l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t, y);
              })(window, document, 'clarity', 'script', 's6j33jmsyd');
             `,
            }}
          />
          {/* Google Analytics - afterInteractive 确保 gtag 在 CookieConsent 执行时可用 */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-SXTKY0GWZ7"
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SXTKY0GWZ7');
  `,
            }}
          />

          {/* 结构化数据 */}
          <WebSiteSchema />
          <OrganizationSchema />
        </ThemeProvider>
      </body>
    </html>
  );
}
