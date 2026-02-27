"use client";

import {
  WebSiteSchema,
  OrganizationSchema,
  BreadcrumbSchema,
  FAQSchema,
} from "@/components/seo/StructuredData";
import { usePathname } from "next/navigation";

export function SEOProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const items = [
      { name: "Home", item: "/" },
      ...pathSegments.map((segment, index) => ({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        item: "/" + pathSegments.slice(0, index + 1).join("/"),
      })),
    ];
    return items;
  };

  return (
    <>
      <WebSiteSchema />
      <OrganizationSchema />
      <BreadcrumbSchema items={getBreadcrumbs()} url={pathname} />
      {children}
    </>
  );
}
