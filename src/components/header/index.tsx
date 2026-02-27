"use client";

import { LogoText } from "@/components/logoText";
import Link from "next/link";
import {
  DownloadCloud,
  Menu,
  User,
  LogOut,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  FileVideo,
  FileAudio,
  Image,
  Combine,
} from "lucide-react";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { getText } from "@/lib/i18n";
import { cn } from "@/utils/index";
import { Sheet, SheetContent, SheetClose } from "../ui/sheet";
import { useLocale } from "@/hooks/useLocale";
import { Globe, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useIsMobile } from "@/hooks/useMobile";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Header() {
  const { currentLocale, changeLocale, supportedLocales } = useLocale();
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  // 记住之前的认证状态，避免在加载时闪烁
  const [wasAuthenticated, setWasAuthenticated] = useState(false);
  // 记住试用次数，用于本地更新（当下载任务完成时）
  const [cachedTrialCount, setCachedTrialCount] = useState<number | null>(null);

  const isMobile = useIsMobile();

  // 更新记忆的认证状态和试用次数
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setWasAuthenticated(true);
      // 更新缓存的试用次数（如果 session 中有新值）
      if (session.user.trialCount !== undefined) {
        setCachedTrialCount(session.user.trialCount);
      }
    } else if (status === "unauthenticated") {
      setWasAuthenticated(false);
      setCachedTrialCount(null);
    }
    // loading 状态下不更新，保持之前的状态
  }, [status, session?.user?.trialCount]);

  // 监听下载任务完成事件，更新试用次数
  useEffect(() => {
    const handleDownloadComplete = () => {
      if (cachedTrialCount !== null && cachedTrialCount > 0) {
        const newCount = cachedTrialCount - 1;
        setCachedTrialCount(newCount);
      }
    };

    window.addEventListener("downloadTaskCompleted", handleDownloadComplete);

    return () => {
      window.removeEventListener(
        "downloadTaskCompleted",
        handleDownloadComplete,
      );
    };
  }, [cachedTrialCount]);

  // 在加载中时，使用记忆的状态；否则使用实际状态
  const isAuthenticated =
    status === "loading"
      ? wasAuthenticated
      : status === "authenticated" && !!session?.user;

  // 使用 useCallback 包装 update 调用，避免频繁触发
  // 只在真正需要时才刷新（比如支付完成后）
  const handleUpdateSession = useCallback(() => {
    if (status === "authenticated" && session?.user) {
      update();
    }
  }, [status, session?.user?.id, update]);

  // 移除自动刷新 session 的逻辑，避免不必要的网络请求
  // 支付成功后的更新由支付回调页面处理

  // 导航链接配置 - 使用 useMemo 避免每次渲染都重新创建
  // 使用 nameKey 而不是直接使用翻译文本，避免 hydration 错误
  // 使用带语言前缀的 URL，确保语言一致性
  const navLinks = useMemo(
    () => [
      {
        id: "home",
        nameKey: "header.nav.home",
        url: `/${currentLocale}`,
      },
      {
        id: "Download",
        nameKey: "header.nav.download",
        url: `/${currentLocale}/download`,
      },
      {
        id: "tools",
        nameKey: "header.nav.tools",
        isDropdown: true,
        dropdownItems: [
          //   {
          //     id: "convert",
          //     nameKey: "header.nav.convert",
          //     url: `/${currentLocale}/convert`,
          //     icon: RefreshCw,
          //   },
          {
            id: "convert-video",
            nameKey: "convert.hub.videoTitle",
            url: `/${currentLocale}/convert/video`,
            icon: FileVideo,
          },
          {
            id: "convert-image",
            nameKey: "convert.hub.imageTitle",
            url: `/${currentLocale}/convert/image`,
            icon: Image,
          },
          {
            id: "convert-audio",
            nameKey: "convert.hub.audioTitle",
            url: `/${currentLocale}/convert/audio`,
            icon: FileAudio,
          },
          {
            id: "merge",
            nameKey: "header.nav.merge",
            url: `/${currentLocale}/merge`,
            icon: Combine,
          },
        ],
      },
      {
        id: "pricing",
        nameKey: "header.nav.pricing",
        url: `/${currentLocale}/pricing`,
      },
      //   {
      //     id: "blog",
      //     nameKey: "header.nav.blog",
      //     url: `/${currentLocale}/blog`,
      //   },
      {
        id: "roadmap",
        nameKey: "footer.pages.roadmap",
        url: "https://neonbit.featurebase.app/roadmap",
        external: true,
      },
    ],
    [currentLocale], // 依赖 currentLocale，当语言变化时更新 URL
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  // 更新当前路径和监听语言变化
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);

      // 监听语言变化事件
      const handleLocaleChange = () => {
        setCurrentPath(window.location.pathname);
        setForceUpdate((prev) => prev + 1); // 强制更新组件
      };

      // 监听 localStorage 变化（跨标签页）
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "locale") {
          handleLocaleChange();
        }
      };

      window.addEventListener("localeChange", handleLocaleChange);
      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("localeChange", handleLocaleChange);
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [currentLocale]);

  const handleMobileMenuChange = (open: boolean) => {
    setIsMobileMenuOpen(open);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: `/`,
      redirect: true,
    });
  };

  // 点击外部关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // 移动端菜单关闭时，收起工具分组
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileToolsOpen(false);
    }
  }, [isMobileMenuOpen]);

  // 计算剩余次数和获取订阅信息（优先使用缓存值）
  const remainingTrials = useMemo(() => {
    // 优先使用缓存的试用次数（用于本地更新）
    if (cachedTrialCount !== null) {
      return cachedTrialCount;
    }
    // 否则使用 session 中的值
    return session?.user?.trialCount ?? 0;
  }, [cachedTrialCount, session?.user?.trialCount]);

  // 调试日志：记录当前 session 中的用户信息（只在关键数据变化时记录）
  const userId = session?.user?.id;
  const userLevel = session?.user?.userLevel ?? 0;
  const subscriptionStatus = session?.user?.subscriptionStatus ?? "trial";
  const isEarlyBird = session?.user?.isEarlyBird ?? false;
  const earlyBirdNumber = session?.user?.earlyBirdNumber;

  useEffect(() => {
    if (isAuthenticated && userId) {
    }
  }, [isAuthenticated, userId, userLevel, subscriptionStatus]); // 只依赖关键字段，而不是整个 session 对象

  // 获取用户套餐显示名
  const getUserPlanName = () => {
    if (isEarlyBird) {
      return getText("header.user.plan.lifetime", currentLocale) || "Lifetime";
    }
    if (userLevel === 2) {
      return getText("header.user.plan.pro", currentLocale) || "Pro";
    }
    if (userLevel === 1) {
      return getText("header.user.plan.basic", currentLocale) || "Basic";
    }
    return getText("header.user.plan.free", currentLocale) || "Free";
  };

  // 是否展示订阅状态（已订阅用户不展示“试用中”）
  const shouldShowSubscriptionStatus =
    subscriptionStatus !== "trial" || (userLevel === 0 && !isEarlyBird);

  // 获取订阅状态名称
  const getSubscriptionStatusName = () => {
    if (subscriptionStatus === "trial") {
      return getText("header.user.status.trial", currentLocale) || "Trial";
    } else if (subscriptionStatus === "active") {
      return getText("header.user.status.active", currentLocale) || "Active";
    } else if (subscriptionStatus === "expired") {
      return getText("header.user.status.expired", currentLocale) || "Expired";
    }
    return getText("header.user.status.trial", currentLocale) || "Trial";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/`} className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black border-gray-800">
              <DownloadCloud className="h-8 w-8 text-white" />
            </div>
            <LogoText className="cursor-pointer text-xl text-white sm:text-2xl !mr-0"></LogoText>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center gap-6">
              {/* Navigation Links */}
              <ul className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    {"isDropdown" in link && link.isDropdown ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-white transition-colors duration-200 hover:text-gray-300 outline-none">
                          {getText(link.nameKey, currentLocale) ||
                            link.nameKey.split(".").pop()}
                          <ChevronDown className="h-3.5 w-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="bg-gray-900/95 border-gray-700 backdrop-blur-sm min-w-[180px]"
                          align="start"
                        >
                          {link.dropdownItems?.map((item) => (
                            <DropdownMenuItem key={item.id} asChild>
                              <Link
                                href={item.url}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer"
                              >
                                {item.icon && (
                                  <item.icon className="h-4 w-4 text-gray-400" />
                                )}
                                {getText(item.nameKey, currentLocale) ||
                                  item.nameKey.split(".").pop()}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : "external" in link && link.external ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-white transition-colors duration-200 hover:text-gray-300"
                      >
                        {getText(link.nameKey, currentLocale) ||
                          link.nameKey.split(".").pop()}
                      </a>
                    ) : (
                      <Link
                        href={link.url!}
                        prefetch={true}
                        className={cn(
                          "text-sm font-medium text-white transition-colors duration-200 hover:text-gray-300",
                          currentPath === link.url ||
                            currentPath.startsWith(link.url + "/")
                            ? "text-white"
                            : "text-white",
                        )}
                        suppressHydrationWarning
                      >
                        {getText(link.nameKey, currentLocale) ||
                          link.nameKey.split(".").pop()}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Language Selector - Desktop */}
              <Select
                value={currentLocale}
                onValueChange={(value) => {
                  try {
                    changeLocale(value as any);
                  } catch (error) {
                    console.error("Failed to change locale:", error);
                  }
                }}
              >
                <SelectTrigger className="h-8 w-32 border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 focus:ring-purple-500">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <SelectValue>
                      {supportedLocales[currentLocale] || currentLocale}
                    </SelectValue>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-900/10 border-gray-800 backdrop-blur-sm">
                  {Object.entries(supportedLocales).map(([locale, name]) => (
                    <SelectItem
                      key={locale}
                      value={locale}
                      className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-purple-400"
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* User Menu or Login Button */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 px-4 py-2 rounded-sm hover:bg-gray-800 transition-colors"
                  >
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-medium">
                      {session?.user?.name?.charAt(0).toUpperCase() ||
                        session?.user?.email?.charAt(0).toUpperCase() ||
                        "U"}
                      {isEarlyBird && (
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 border-2 border-black">
                          <Sparkles className="h-2 w-2 text-white" />
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-white max-w-[100px] sm:max-w-[120px] truncate">
                      {session?.user?.name ||
                        session?.user?.email?.split("@")[0] ||
                        "User"}
                    </span>
                    {isEarlyBird && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-1.5 py-0.5 text-[10px] font-medium text-white shrink-0">
                        <Sparkles className="h-2.5 w-2.5" />#{earlyBirdNumber}
                      </span>
                    )}
                    <ChevronDown className="w-4 h-4 text-white" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-900/10 rounded-lg shadow-lg border border-gray-800 py-2 z-50 backdrop-blur-sm overflow-hidden">
                      <div className="px-4 py-2 border-b border-gray-800">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-white truncate">
                            {session?.user?.name || "User"}
                          </p>
                          {isEarlyBird && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-1.5 py-0.5 text-[10px] font-medium text-white shrink-0">
                              <Sparkles className="h-2.5 w-2.5" />#
                              {earlyBirdNumber}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 truncate">
                          {session?.user?.email}
                        </p>
                      </div>
                      {/* User Info: Daily Limit and Subscription */}
                      <div className="px-4 py-2 border-b border-gray-800 space-y-2">
                        {userLevel === 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {getText(
                                "header.user.dailyLimit",
                                currentLocale,
                              ) || "Daily Limit"}
                            </span>
                            <span className="text-xs font-medium text-white">
                              {getText(
                                "header.user.dailyLimitValue",
                                currentLocale,
                              ) || "1 download / day"}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                          <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                            {getText(
                              "header.user.subscription",
                              currentLocale,
                            ) || "Subscription"}
                          </span>
                          <div className="flex items-center gap-1.5 flex-nowrap min-w-0 ml-auto shrink overflow-hidden max-w-full">
                            <span className="text-xs font-medium text-purple-400 truncate min-w-0">
                              {getUserPlanName()}
                            </span>
                            {isEarlyBird && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-1.5 py-0.5 text-[10px] font-medium text-white shrink-0">
                                <Sparkles className="h-2.5 w-2.5" />#
                                {earlyBirdNumber}
                              </span>
                            )}
                            {shouldShowSubscriptionStatus && (
                              <>
                                <span className="text-xs text-gray-500 shrink-0">
                                  •
                                </span>
                                <span className="text-xs text-gray-300 truncate min-w-0">
                                  {getSubscriptionStatusName()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Early Bird Link */}
                      {isEarlyBird && (
                        <Link
                          href={`/${currentLocale}/early-bird`}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>
                            {getText("header.user.earlyBird", currentLocale) ||
                              "Early Adopter"}
                          </span>
                        </Link>
                      )}
                      <Link
                        href={`/${currentLocale}/profile`}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>
                          {getText(
                            "header.user.personalCenter",
                            currentLocale,
                          ) || "个人中心"}
                        </span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>
                          {getText("header.button.signout") || "Sign Out"}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={`/${currentLocale}/signin`}
                  className="px-6 py-2.5 bg-[#824ac8] hover:bg-[#6639a3] text-white font-medium rounded-sm transition-colors duration-200 text-sm"
                >
                  {getText("header.button.login") || "Login"}
                </Link>
              )}
            </div>
          )}

          {/* Mobile Controls - Only Logo and Menu Button */}
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className=" rounded-full hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Navigation Menu - Slides from Top */}
        <Sheet open={isMobileMenuOpen} onOpenChange={handleMobileMenuChange}>
          <SheetContent
            side="top"
            showClose={false}
            className="bg-black border-b border-gray-800 p-0 w-full h-auto max-h-[90vh] overflow-y-auto"
          >
            <SheetClose asChild>
              <button
                aria-label="Close menu"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-600 text-white transition-colors hover:border-gray-400 hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </SheetClose>
            {/* Navigation Links */}
            <div className="px-6 py-8">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    {"isDropdown" in link && link.isDropdown ? (
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setIsMobileToolsOpen((prev) => !prev)}
                          aria-expanded={isMobileToolsOpen}
                          className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-800"
                        >
                          <span>
                            {getText(link.nameKey, currentLocale) ||
                              link.nameKey.split(".").pop()}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isMobileToolsOpen ? "rotate-180" : "rotate-0",
                            )}
                          />
                        </button>
                        <div
                          aria-hidden={!isMobileToolsOpen}
                          className={cn(
                            "ml-2 grid gap-1 overflow-hidden origin-top transition-[max-height,opacity,transform] duration-300 ease-out",
                            isMobileToolsOpen
                              ? "max-h-96 opacity-100 translate-y-0 scale-100"
                              : "max-h-0 opacity-0 -translate-y-1 scale-95 pointer-events-none",
                          )}
                        >
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.id}
                              href={item.url}
                              prefetch={true}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800"
                            >
                              {item.icon && (
                                <item.icon className="h-4 w-4 text-gray-400" />
                              )}
                              {getText(item.nameKey, currentLocale) ||
                                item.nameKey.split(".").pop()}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : "external" in link && link.external ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block rounded-lg px-4 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800"
                      >
                        {getText(link.nameKey, currentLocale) ||
                          link.nameKey.split(".").pop()}
                      </a>
                    ) : (
                      <Link
                        href={link.url!}
                        prefetch={true}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block rounded-lg px-4 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800",
                          currentPath === link.url ||
                            currentPath.startsWith(link.url + "/")
                            ? "bg-gray-800 text-white"
                            : "text-white",
                        )}
                        suppressHydrationWarning
                      >
                        {getText(link.nameKey, currentLocale) ||
                          link.nameKey.split(".").pop()}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA Button or User Menu */}
              <div className="mt-6">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-white truncate">
                          {session?.user?.name || "User"}
                        </p>
                        {isEarlyBird && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-1.5 py-0.5 text-[10px] font-medium text-white shrink-0">
                            <Sparkles className="h-2.5 w-2.5" />#
                            {earlyBirdNumber}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-1">
                        {session?.user?.email}
                      </p>
                      {/* User Info: Daily Limit and Subscription */}
                      <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                        {userLevel === 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {getText(
                                "header.user.dailyLimit",
                                currentLocale,
                              ) || "Daily Limit"}
                            </span>
                            <span className="text-xs font-medium text-white">
                              {getText(
                                "header.user.dailyLimitValue",
                                currentLocale,
                              ) || "1 download / day"}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                          <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                            {getText(
                              "header.user.subscription",
                              currentLocale,
                            ) || "Subscription"}
                          </span>
                          <div className="flex items-center gap-1.5 flex-nowrap min-w-0 ml-auto shrink overflow-hidden max-w-full">
                            <span className="text-xs font-medium text-purple-400 truncate min-w-0">
                              {getUserPlanName()}
                            </span>
                            {isEarlyBird && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-1.5 py-0.5 text-[10px] font-medium text-white shrink-0">
                                <Sparkles className="h-2.5 w-2.5" />#
                                {earlyBirdNumber}
                              </span>
                            )}
                            {shouldShowSubscriptionStatus && (
                              <>
                                <span className="text-xs text-gray-500 shrink-0">
                                  •
                                </span>
                                <span className="text-xs text-gray-300 truncate min-w-0">
                                  {getSubscriptionStatusName()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Early Bird Link */}
                    {isEarlyBird && (
                      <Link
                        href={`/${currentLocale}/early-bird`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 rounded-lg transition-colors"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>
                          {getText("header.user.earlyBird", currentLocale) ||
                            "Early Adopter"}
                        </span>
                      </Link>
                    )}
                    <Link
                      href={`/${currentLocale}/profile`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>
                        {getText("header.user.personalCenter", currentLocale) ||
                          "个人中心"}
                      </span>
                    </Link>
                    {/* Language Selector */}
                    <Select
                      value={currentLocale}
                      onValueChange={(value) => {
                        try {
                          changeLocale(value as any);
                        } catch (error) {
                          console.error("Failed to change locale:", error);
                        }
                      }}
                    >
                      <SelectTrigger className="h-12 w-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 focus:ring-purple-500">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-5 h-5" />
                          <SelectValue>
                            {supportedLocales[currentLocale] || currentLocale}
                          </SelectValue>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900/10 border-gray-800 backdrop-blur-sm">
                        {Object.entries(supportedLocales).map(
                          ([locale, name]) => (
                            <SelectItem
                              key={locale}
                              value={locale}
                              className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-purple-400"
                            >
                              {name}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-3 text-base font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>
                        {getText("header.button.signout") || "Sign Out"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Language Selector for non-authenticated users */}
                    <div className="mb-6">
                      <Select
                        value={currentLocale}
                        onValueChange={(value) => {
                          try {
                            changeLocale(value as any);
                          } catch (error) {
                            console.error("Failed to change locale:", error);
                          }
                        }}
                      >
                        <SelectTrigger className="h-12 w-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 focus:ring-purple-500">
                          <div className="flex items-center space-x-2">
                            <Globe className="w-5 h-5" />
                            <SelectValue>
                              {supportedLocales[currentLocale] || currentLocale}
                            </SelectValue>
                          </div>
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900/10 border-gray-800 backdrop-blur-sm">
                          {Object.entries(supportedLocales).map(
                            ([locale, name]) => (
                              <SelectItem
                                key={locale}
                                value={locale}
                                className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-purple-400"
                              >
                                {name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <Link
                      href={`/${currentLocale}/signin`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#824ac8] hover:bg-[#6639a3] text-white font-medium rounded-lg transition-colors duration-200 text-base"
                    >
                      {getText("header.button.login") || "Login"}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
