"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getText } from "@/lib/i18n";
import { useLocale } from "@/hooks/useLocale";
import {
  Mail,
  Lock,
  MailCheck,
  ExternalLink,
  Copy,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";

// 检测是否在嵌入式 WebView 中（微信、抖音、小红书等应用内浏览器）
function isEmbeddedWebView(): boolean {
  if (typeof window === "undefined") return false;
  
  const ua = navigator.userAgent.toLowerCase();
  
  // 常见的嵌入式浏览器标识
  const webViewPatterns = [
    /micromessenger/i,     // 微信
    /weixin/i,             // 微信
    /wechat/i,             // 微信
    /qq\//i,               // QQ
    /mqqbrowser/i,         // QQ浏览器
    /douyin/i,             // 抖音
    /tiktok/i,             // TikTok
    /bytedance/i,          // 字节跳动系
    /aweme/i,              // 抖音
    /xiaohongshu/i,        // 小红书
    /redbook/i,            // 小红书
    /weibo/i,              // 微博
    /alipayclient/i,       // 支付宝
    /dingtalk/i,           // 钉钉
    /line\//i,             // Line
    /fbav/i,               // Facebook App
    /fban/i,               // Facebook App
    /instagram/i,          // Instagram App
    /twitter/i,            // Twitter App (旧版)
    /snapchat/i,           // Snapchat
    /linkedin/i,           // LinkedIn App
    /telegram/i,           // Telegram
  ];
  
  return webViewPatterns.some(pattern => pattern.test(ua));
}

export default function SignInClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentLocale } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isWebView, setIsWebView] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    agreedToTerms: true,
  });
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 检测 WebView
  useEffect(() => {
    setIsWebView(isEmbeddedWebView());
  }, []);

  const callbackUrl = searchParams.get("callbackUrl") || `/download`;
  const referralCode = searchParams.get("ref"); // 从 URL 参数获取邀请码

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 验证邮箱
      if (!formData.email.trim()) {
        toast.error(
          getText("auth.email.required", currentLocale) ||
            "Please enter your email",
        );
        setIsLoading(false);
        return;
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error(
          getText("auth.email.invalid", currentLocale) ||
            "Invalid email format",
        );
        setIsLoading(false);
        return;
      }

      // 验证密码
      if (!formData.password) {
        toast.error(
          getText("auth.password.required", currentLocale) ||
            "Please enter your password",
        );
        setIsLoading(false);
        return;
      }

      // 注册时的额外验证
      if (isSignUp) {
        // 验证码
        if (!formData.verificationCode || formData.verificationCode.length !== 6) {
          toast.error(
            getText("auth.verification.code.required", currentLocale) ||
              "Please enter the 6-digit verification code",
          );
          setIsLoading(false);
          return;
        }

        // 确认密码
        if (!formData.confirmPassword) {
          toast.error(
            getText("auth.password.confirm.required", currentLocale) ||
              "Please confirm your password",
          );
          setIsLoading(false);
          return;
        }

        // 密码匹配
        if (formData.password !== formData.confirmPassword) {
          toast.error(
            getText("auth.password.mismatch", currentLocale) ||
              "Passwords do not match",
          );
          setIsLoading(false);
          return;
        }
      }

      // 检查是否同意条款
      if (!formData.agreedToTerms) {
        toast.error(
          getText("auth.terms.required", currentLocale) ||
            "Please agree to the Terms of Service and Privacy Policy",
        );
        setIsLoading(false);
        return;
      }

      if (isSignUp) {
        try {
          // 调用注册 API
          const response = await axios.post("/api/auth/register", {
            email: formData.email,
            password: formData.password,
            verificationCode: formData.verificationCode,
            locale: currentLocale,
            referralCode: referralCode, // 传递邀请码
          });

          const data = response.data;

          // 检查返回的 code 是否为 0（成功）
          if (data.code !== 0) {
            toast.error(data.msg || getText("auth.register.error", currentLocale) || "Registration failed");
            setIsLoading(false);
            return;
          }

          // 注册成功后自动登录
          toast.success(
            getText("auth.register.success", currentLocale) ||
              "Registration successful! Signing you in...",
          );

          // 使用注册的邮箱和密码自动登录
          const loginResult = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });

          if (loginResult?.error) {
            // 自动登录失败，提示用户手动登录
            toast.error(
              getText("auth.auto.signin.failed", currentLocale) ||
                "Registration successful, but automatic sign-in failed. Please sign in manually.",
            );
            setIsSignUp(false);
            setFormData({
              email: formData.email, // 保留邮箱，方便用户直接登录
              password: "",
              confirmPassword: "",
              verificationCode: "",
              agreedToTerms: true,
            });
            setCodeSent(false);
            setCountdown(0);
          } else {
            // 自动登录成功，跳转到目标页面
            toast.success(
              getText("auth.signin.success", currentLocale) ||
                "Signed in successfully!",
            );
            router.push(callbackUrl);
            router.refresh();
          }
        } catch (error: any) {
          // axios 错误处理：从 error.response.data 中提取错误信息
          const errorData = error.response?.data;
          const errorMsg = errorData?.msg || getText("auth.register.error", currentLocale) || "Registration failed";
          
          // 如果是验证码过期，重置验证码相关状态
          if (errorData?.code === 1005) {
            setCodeSent(false);
            setCountdown(0);
            setFormData({
              ...formData,
              verificationCode: "",
            });
          }
          
          toast.error(errorMsg);
          setIsLoading(false);
          return;
        }
      } else {
        // 登录逻辑
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error(
            getText("auth.signin.error", currentLocale) ||
              "Invalid email or password",
          );
        } else {
          toast.success(
            getText("auth.signin.success", currentLocale) ||
              "Signed in successfully!",
          );
          router.push(callbackUrl);
          router.refresh();
        }
      }
    } catch (error) {
      toast.error(getText("auth.error", currentLocale) || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google") => {
    // 如果在 WebView 中，提示用户在外部浏览器打开
    if (isWebView) {
      toast.error(
        getText("auth.webview.google.blocked", currentLocale) || 
        "Google login is not supported in this browser. Please open in Safari/Chrome.",
        { duration: 5000 }
      );
      return;
    }
    
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl });
    } catch (error) {
      toast.error(
        getText("auth.oauth.error", currentLocale) || "OAuth sign in failed",
      );
      setIsLoading(false);
    }
  };

  // 复制链接到剪贴板
  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.success(
        getText("auth.link.copied", currentLocale) || 
        "Link copied! Please paste in Safari/Chrome to sign in.",
        { duration: 3000 }
      );
    } catch (error) {
      toast.error(
        getText("auth.link.copy.failed", currentLocale) || 
        "Failed to copy link",
      );
    }
  };

  const handleSendVerificationCode = async () => {
    if (!formData.email) {
      toast.error(
        getText("auth.email.required", currentLocale) ||
          "Please enter your email first",
      );
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(
        getText("auth.email.invalid", currentLocale) || "Invalid email format",
      );
      return;
    }

    setIsSendingCode(true);
    try {
      const response = await axios.post("/api/auth/send-verification-code", {
        email: formData.email,
        locale: currentLocale,
      });

      const data = response.data;

      // 检查返回的 code 是否为 0（成功）
      if (data.code !== 0) {
        toast.error(data.msg || getText("auth.verification.send.error", currentLocale) || "Failed to send verification code");
        setIsSendingCode(false);
        return;
      }

      toast.success(
        getText("auth.verification.send.success", currentLocale) ||
          "Verification code sent to your email",
      );
      setCodeSent(true);
      setCountdown(60); // 60秒倒计时

      // 倒计时
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      // axios 错误处理：从 error.response.data 中提取错误信息
      const errorData = error.response?.data;
      const errorMsg = errorData?.msg || getText("auth.verification.send.error", currentLocale) || "Failed to send verification code";
      toast.error(errorMsg);
    } finally {
      setIsSendingCode(false);
    }
  };

  return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md mt-28">
          <div className="rounded-sm border border-gray-800 bg-gray-900/50 p-8 shadow-xl backdrop-blur-sm">
            {/* WebView Warning Banner */}
            {isWebView && (
              <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-500">
                      {getText("auth.webview.warning.title", currentLocale) || 
                       "In-app browser detected"}
                    </p>
                    <p className="mt-1 text-xs text-yellow-500/80">
                      {getText("auth.webview.warning.message", currentLocale) || 
                       "Google login doesn't work in WeChat/TikTok/etc. Please open in Safari or Chrome."}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                      className="mt-3 h-8 border-yellow-500/50 bg-transparent text-yellow-500 hover:bg-yellow-500/20 hover:border-yellow-500"
                    >
                      <Copy className="mr-2 h-3.5 w-3.5" />
                      {getText("auth.webview.copy.link", currentLocale) || "Copy link to browser"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white">
                {isSignUp
                  ? getText("auth.signup.title", currentLocale) ||
                    "Create Account"
                  : getText("auth.signin.title", currentLocale) || "Sign In"}
              </h1>
              <h2 className="sr-only">
                {(isSignUp
                  ? getText("auth.signup.title", currentLocale) ||
                    "Create Account"
                  : getText("auth.signin.title", currentLocale) || "Sign In") +
                  " - SnapVee"}
              </h2>
              <h3 className="sr-only">
                {isSignUp
                  ? getText("auth.signup.subtitle", currentLocale) ||
                    "Create a new account to get started"
                  : getText("auth.signin.subtitle", currentLocale) ||
                    "Sign in to your account to continue"}
              </h3>
              <p className="mt-2 text-gray-400">
                {isSignUp
                  ? getText("auth.signup.subtitle", currentLocale) ||
                    "Create a new account to get started"
                  : getText("auth.signin.subtitle", currentLocale) ||
                    "Sign in to your account to continue"}
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="mb-6 space-y-3">
              <Button
                type="button"
                variant="outline"
                className={`w-full border-gray-700 bg-transparent text-white hover:bg-purple-600 hover:border-purple-600 hover:text-white ${
                  isWebView ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleOAuthSignIn("google")}
                disabled={isLoading || isWebView}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isWebView 
                  ? (getText("auth.oauth.google.webview", currentLocale) || "Google (open in browser)")
                  : (getText("auth.oauth.google", currentLocale) || "Continue with Google")
                }
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-900 px-2 text-gray-400">
                  {getText("auth.or", currentLocale) || "Or"}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  {getText("auth.email", currentLocale) || "Email"}
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setCodeSent(false);
                      setCountdown(0);
                    }}
                    placeholder={
                      getText("auth.email.placeholder", currentLocale) ||
                      "Enter your email"
                    }
                    leftIcon={<Mail className="h-5 w-5" />}
                    className={isSignUp ? "pr-28" : ""}
                  />
                  {isSignUp && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendVerificationCode}
                      disabled={
                        isSendingCode || countdown > 0 || !formData.email
                      }
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-[calc(100%-0.5rem)] border-gray-600 bg-gray-800/80 text-white hover:bg-purple-600 hover:border-purple-600 hover:text-white whitespace-nowrap px-4 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingCode
                        ? getText("auth.verification.sending", currentLocale) ||
                          "Sending..."
                        : countdown > 0
                          ? `${countdown}s`
                          : getText("auth.verification.send", currentLocale) ||
                            "Send Code"}
                    </Button>
                  )}
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    {getText("auth.verification.code", currentLocale) ||
                      "Verification Code"}
                  </label>
                  <Input
                    type="text"
                    value={formData.verificationCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        verificationCode: e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6),
                      })
                    }
                    placeholder={
                      getText(
                        "auth.verification.code.placeholder",
                        currentLocale,
                      ) || "Enter 6-digit code"
                    }
                    leftIcon={<MailCheck className="h-5 w-5" />}
                    maxLength={6}
                  />
                </div>
              )}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-300">
                    {getText("auth.password", currentLocale) || "Password"}
                  </label>
                  {!isSignUp && (
                    <Link
                      href={`/${currentLocale}/forgot-password`}
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      {getText("auth.forgotPassword.link", currentLocale) ||
                        "Forgot password?"}
                    </Link>
                  )}
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder={
                    getText("auth.password.placeholder", currentLocale) ||
                    "Enter your password"
                  }
                  leftIcon={<Lock className="h-5 w-5" />}
                  rightIcon={
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition-colors hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    {getText("auth.password.confirm", currentLocale) ||
                      "Confirm Password"}
                  </label>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder={
                      getText(
                        "auth.password.confirm.placeholder",
                        currentLocale,
                      ) || "Confirm your password"
                    }
                    leftIcon={<Lock className="h-5 w-5" />}
                    rightIcon={
                      <button
                        type="button"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                        aria-pressed={showConfirmPassword}
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition-colors hover:text-white"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                  />
                </div>
              )}

              {/* Terms and Privacy Agreement */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreedToTerms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      agreedToTerms: e.target.checked,
                    })
                  }
                  className="mt-0.5 h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-400">
                  {getText("auth.terms.agree", currentLocale) ||
                    "I agree to the"}{" "}
                  <Link
                    href={`${currentLocale}/service`}
                    className="text-purple-400 hover:text-purple-300 underline"
                    target="_blank"
                  >
                    {getText("auth.terms.service", currentLocale) ||
                      "Terms of Service"}
                  </Link>{" "}
                  {getText("auth.terms.and", currentLocale) || "and"}{" "}
                  <Link
                    href={`${currentLocale}/privacy`}
                    className="text-purple-400 hover:text-purple-300 underline"
                    target="_blank"
                  >
                    {getText("auth.terms.privacy", currentLocale) ||
                      "Privacy Policy"}
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
                loading={isLoading}
              >
                {isSignUp
                  ? getText("auth.signup.button", currentLocale) || "Sign Up"
                  : getText("auth.signin.button", currentLocale) || "Sign In"}
              </Button>
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-400">
                {isSignUp
                  ? getText("auth.already.have.account", currentLocale) ||
                    "Already have an account?"
                  : getText("auth.dont.have.account", currentLocale) ||
                    "Don't have an account?"}{" "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                    verificationCode: "",
                    agreedToTerms: true,
                  });
                  setCodeSent(false);
                  setCountdown(0);
                }}
                className="font-semibold text-purple-400 hover:text-purple-300"
              >
                {isSignUp
                  ? getText("auth.signin.link", currentLocale) || "Sign In"
                  : getText("auth.signup.link", currentLocale) || "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
