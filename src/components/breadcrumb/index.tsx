import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <>
      <nav
        aria-label="breadcrumb"
        className={`flex items-center space-x-2 text-sm text-gray-400 ${className}`}
      >
        <Link
          href="/"
          className="flex items-center transition-colors duration-200 hover:text-white"
        >
          <Home className="h-4 w-4" />
          <span className="sr-only">首页</span>
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-gray-500" />
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  item.current
                    ? "font-medium text-purple-400"
                    : ""
                }
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
