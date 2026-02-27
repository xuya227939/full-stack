"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/mainLayout";
import { useLocale } from "@/hooks/useLocale";
import { getText } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

interface ProfileIndexProps {
  lang: string;
}

export function Index({ lang }: ProfileIndexProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { currentLocale } = useLocale();
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${lang}/signin`);
    }
  }, [status, router, lang]);

  const handleSendCode = async () => {
    setIsSendingCode(true);
    try {
      const response = await axios.post(
        "/api/auth/send-password-change-code",
        { locale: currentLocale },
        { withCredentials: true },
      );
      const data = response.data;
      if (data.code !== 0) {
        toast.error(data.msg || "Failed to send code");
        setIsSendingCode(false);
        return;
      }
      toast.success(
        getText("profile.password.codeSent", currentLocale) || "验证码已发送",
      );
      setCountdown(60);
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
      const msg = error.response?.data?.msg || "Failed to send code";
      toast.error(msg);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.verificationCode?.trim()) {
      toast.error(
        getText("profile.password.error.codeInvalid", currentLocale) ||
          "请输入验证码",
      );
      return;
    }
    if (formData.verificationCode.length !== 6) {
      toast.error(
        getText("profile.password.error.codeInvalid", currentLocale) ||
          "验证码为6位数字",
      );
      return;
    }
    if (!formData.newPassword) {
      toast.error(
        getText("profile.password.new", currentLocale) || "请输入新密码",
      );
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error(
        currentLocale === "zh"
          ? "密码至少6位"
          : "Password at least 6 characters",
      );
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(
        getText("profile.password.error.mismatch", currentLocale) ||
          "两次输入不一致",
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/change-password",
        {
          verificationCode: formData.verificationCode.trim(),
          newPassword: formData.newPassword,
        },
        { withCredentials: true },
      );
      const data = response.data;
      if (
        response.status !== 200 ||
        (data.code !== undefined && data.code !== 0)
      ) {
        toast.error(data.msg || "修改失败");
        setIsLoading(false);
        return;
      }
      toast.success(
        getText("profile.password.success", currentLocale) || "密码已更新",
      );
      setFormData({
        verificationCode: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      const msg = error.response?.data?.msg || "修改失败";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-md px-4 pt-28 pb-12">
        <h1 className="mb-8 text-2xl font-bold text-white">
          {getText("profile.title", currentLocale) || "个人中心"}
        </h1>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-lg font-medium text-white">
            {getText("profile.password.title", currentLocale) || "修改密码"}
          </h2>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-gray-400">
              {getText("profile.password.email", currentLocale) || "验证邮箱"}
            </label>
            <Input
              type="email"
              value={session?.user?.email || ""}
              readOnly
              className="bg-gray-800/50 text-gray-300"
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2">
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder={
                getText("profile.password.code", currentLocale) || "验证码"
              }
              value={formData.verificationCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  verificationCode: e.target.value.replace(/\D/g, ""),
                })
              }
              className="w-full bg-gray-800/50 text-white placeholder:text-gray-500"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleSendCode}
              disabled={isSendingCode || countdown > 0}
              className="h-10 w-full border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:text-white disabled:opacity-50"
            >
              {countdown > 0
                ? `${countdown}s`
                : getText("profile.password.sendCode", currentLocale) ||
                  "发送验证码"}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                {getText("profile.password.new", currentLocale) || "新密码"}
              </label>
              <Input
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                placeholder="••••••••"
                className="bg-gray-800/50 text-gray-300 placeholder:text-gray-500"
                minLength={6}
                rightIcon={
                  <button
                    type="button"
                    aria-label={
                      showNewPassword ? "Hide new password" : "Show new password"
                    }
                    aria-pressed={showNewPassword}
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition-colors hover:text-white"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                {getText("profile.password.confirm", currentLocale) ||
                  "确认新密码"}
              </label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="••••••••"
                className="bg-gray-800/50 text-gray-300 placeholder:text-gray-500"
                minLength={6}
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
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#824ac8] hover:bg-[#6639a3]"
            >
              {isLoading
                ? "..."
                : getText("profile.password.submit", currentLocale) || "保存"}
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
