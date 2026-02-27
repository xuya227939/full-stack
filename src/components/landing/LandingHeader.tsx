import Link from "next/link";
import {
  DownloadCloud,
  ChevronDown,
  FileVideo,
  FileAudio,
  Image,
  Combine,
  Menu,
} from "lucide-react";
import { LogoText } from "@/components/logoText";
import { getText, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";
import type { ComponentType } from "react";

type NavLinkItem = {
  id: string;
  nameKey: string;
  url: string;
  external?: boolean;
  isDropdown?: false;
};

type NavLinkDropdown = {
  id: string;
  nameKey: string;
  isDropdown: true;
  dropdownItems: {
    id: string;
    nameKey: string;
    url: string;
    icon: ComponentType<{ className?: string }>;
  }[];
};

type NavLink = NavLinkItem | NavLinkDropdown;

const buildNavLinks = (locale: Locale): NavLink[] => [
  {
    id: "home",
    nameKey: "header.nav.home",
    url: `/${locale}`,
  },
  {
    id: "download",
    nameKey: "header.nav.download",
    url: `/${locale}/download`,
  },
  {
    id: "tools",
    nameKey: "header.nav.tools",
    isDropdown: true,
    dropdownItems: [
      {
        id: "convert-video",
        nameKey: "convert.hub.videoTitle",
        url: `/${locale}/convert/video`,
        icon: FileVideo,
      },
      {
        id: "convert-image",
        nameKey: "convert.hub.imageTitle",
        url: `/${locale}/convert/image`,
        icon: Image,
      },
      {
        id: "convert-audio",
        nameKey: "convert.hub.audioTitle",
        url: `/${locale}/convert/audio`,
        icon: FileAudio,
      },
      {
        id: "merge",
        nameKey: "header.nav.merge",
        url: `/${locale}/merge`,
        icon: Combine,
      },
    ],
  },
  {
    id: "pricing",
    nameKey: "header.nav.pricing",
    url: `/${locale}/pricing`,
  },
  {
    id: "roadmap",
    nameKey: "footer.pages.roadmap",
    url: "https://neonbit.featurebase.app/roadmap",
    external: true,
  },
];

const languageEntries = Object.entries(SUPPORTED_LOCALES);

export default function LandingHeader({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const navLinks = buildNavLinks(currentLocale);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${currentLocale}`} className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black border-gray-800">
            <DownloadCloud className="h-8 w-8 text-white" />
          </div>
          <LogoText className="cursor-pointer text-xl text-white sm:text-2xl !mr-0" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id} className="text-sm font-medium text-white">
                {link.isDropdown ? (
                  <details className="group relative">
                    <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-white transition-colors hover:text-gray-300 [&::-webkit-details-marker]:hidden">
                      {getText(link.nameKey, currentLocale) ||
                        link.nameKey.split(".").pop()}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="invisible absolute left-0 top-full mt-2 w-52 rounded-lg border border-gray-800 bg-gray-900/95 p-2 opacity-0 shadow-xl transition-all duration-200 group-open:visible group-open:opacity-100">
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.url}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white hover:bg-gray-800"
                        >
                          <item.icon className="h-4 w-4 text-gray-400" />
                          {getText(item.nameKey, currentLocale) ||
                            item.nameKey.split(".").pop()}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : link.external ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white transition-colors hover:text-gray-300"
                  >
                    {getText(link.nameKey, currentLocale) ||
                      link.nameKey.split(".").pop()}
                  </a>
                ) : (
                  <Link
                    href={link.url}
                    className="text-sm font-medium text-white transition-colors hover:text-gray-300"
                  >
                    {getText(link.nameKey, currentLocale) ||
                      link.nameKey.split(".").pop()}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full border border-gray-700 bg-gray-900/40 px-3 py-1 text-xs text-white [&::-webkit-details-marker]:hidden">
              {SUPPORTED_LOCALES[currentLocale] || currentLocale}
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="invisible absolute right-0 top-full mt-2 w-36 rounded-lg border border-gray-800 bg-gray-900/95 p-2 opacity-0 shadow-xl transition-all duration-200 group-open:visible group-open:opacity-100">
              {languageEntries.map(([locale, name]) => (
                <Link
                  key={locale}
                  href={`/${locale}`}
                  className="block rounded-md px-3 py-2 text-sm text-white hover:bg-gray-800"
                >
                  {name}
                </Link>
              ))}
            </div>
          </details>

          <Link
            href={`/${currentLocale}/signin`}
            className="rounded-sm bg-[#824ac8] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#6639a3]"
          >
            {getText("header.button.login", currentLocale) || "Login"}
          </Link>
        </div>

        {/* Mobile nav */}
        <details className="group relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-gray-700 px-3 py-2 text-sm text-white [&::-webkit-details-marker]:hidden">
            <Menu className="h-4 w-4" />
            {getText("header.nav.menu", currentLocale, "Menu")}
          </summary>
          <div className="absolute right-0 top-full mt-3 w-72 rounded-xl border border-gray-800 bg-black/95 p-4 shadow-2xl">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <div key={link.id}>
                  {link.isDropdown ? (
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 [&::-webkit-details-marker]:hidden">
                        {getText(link.nameKey, currentLocale) ||
                          link.nameKey.split(".").pop()}
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-2 space-y-1 rounded-lg border border-gray-800 bg-gray-900/70 p-2">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.id}
                            href={item.url}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white hover:bg-gray-800"
                          >
                            <item.icon className="h-4 w-4 text-gray-400" />
                            {getText(item.nameKey, currentLocale) ||
                              item.nameKey.split(".").pop()}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : link.external ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                      {getText(link.nameKey, currentLocale) ||
                        link.nameKey.split(".").pop()}
                    </a>
                  ) : (
                    <Link
                      href={link.url}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                      {getText(link.nameKey, currentLocale) ||
                        link.nameKey.split(".").pop()}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-gray-800 pt-4">
              <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">
                {getText("header.nav.language", currentLocale, "Language")}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {languageEntries.map(([locale, name]) => (
                  <Link
                    key={locale}
                    href={`/${locale}`}
                    className="rounded-md border border-gray-800 px-3 py-2 text-xs text-white hover:bg-gray-800"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={`/${currentLocale}/signin`}
              className="mt-4 block rounded-lg bg-[#824ac8] px-4 py-3 text-center text-sm font-medium text-white hover:bg-[#6639a3]"
            >
              {getText("header.button.login", currentLocale) || "Login"}
            </Link>
          </div>
        </details>
      </nav>
    </header>
  );
}
