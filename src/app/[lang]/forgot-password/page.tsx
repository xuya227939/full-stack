"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getText } from "@/lib/i18n";
import { useLocale } from "@/hooks/useLocale";
import { Mail, Lock, MailCheck, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layouts/mainLayout";
import axios from "axios";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { currentLocale } = useLocale();
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSendCode = async () => {
    if (!formData.email.trim()) {
      toast.error(
        getText("auth.email.required", currentLocale) ||
          "Please enter your email",
      );
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(
        getText("auth.email.invalid", currentLocale) || "Invalid email format",
      );
      return;
    }

    setIsSendingCode(true);
    try {
      const response = await axios.post("/api/auth/send-password-change-code", {
        email: formData.email.trim(),
        locale: currentLocale,
      });
      const data = response.data;
      if (data.code !== 0) {
        toast.error(
          data.msg ||
            getText("auth.forgotPassword.sendCode.error", currentLocale) ||
            "Failed to send code",
        );
        setIsSendingCode(false);
        return;
      }
      toast.success(
        getText("auth.forgotPassword.sendCode.success", currentLocale) ||
          getText("profile.password.codeSent", currentLocale) ||
          "Verification code sent",
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
      const msg =
        error.response?.data?.msg ||
        getText("auth.forgotPassword.sendCode.error", currentLocale) ||
        "Failed to send code";
      toast.error(msg);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error(
        getText("auth.email.required", currentLocale) ||
          "Please enter your email",
      );
      return;
    }
    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      toast.error(
        getText("auth.forgotPassword.code.required", currentLocale) ||
          getText("profile.password.error.codeInvalid", currentLocale) ||
          "Please enter the 6-digit code",
      );
      return;
    }
    if (!formData.newPassword || formData.newPassword.length < 6) {
      toast.error(
        getText("auth.forgotPassword.newPassword.required", currentLocale) ||
          (currentLocale === "zh"
            ? "密码至少6位"
            : "Password at least 6 characters"),
      );
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(
        getText("profile.password.error.mismatch", currentLocale) ||
          "Passwords do not match",
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/change-password", {
        email: formData.email.trim(),
        verificationCode: formData.verificationCode.trim(),
        newPassword: formData.newPassword,
        locale: currentLocale,
      });
      const data = response.data;
      if (data.code !== 0) {
        toast.error(
          data.msg ||
            getText("auth.forgotPassword.reset.error", currentLocale) ||
            "Failed to reset password",
        );
        setIsLoading(false);
        return;
      }
      toast.success(
        getText("auth.forgotPassword.success", currentLocale) ||
          "Password reset successfully",
      );
      router.push(`/${currentLocale}/signin`);
      router.refresh();
    } catch (error: any) {
      const msg =
        error.response?.data?.msg ||
        getText("auth.forgotPassword.reset.error", currentLocale) ||
        "Failed to reset password";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md mt-28">
          <div className="rounded-sm border border-gray-800 bg-gray-900/50 p-8 shadow-xl backdrop-blur-sm">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white">
                {getText("auth.forgotPassword.title", currentLocale) ||
                  "Forgot Password"}
              </h1>
              <p className="mt-2 text-gray-400">
                {getText("auth.forgotPassword.subtitle", currentLocale) ||
                  "Enter your email to receive a verification code and reset your password"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  {getText("auth.email", currentLocale) || "Email"}
                </label>
                <div className="flex w-full gap-2">
                  <div className="min-w-0 flex-1">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={
                        getText("auth.email.placeholder", currentLocale) ||
                        "Enter your email"
                      }
                      leftIcon={<Mail className="h-5 w-5" />}
                      className="w-full bg-gray-800/50 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSendCode}
                    disabled={isSendingCode || countdown > 0}
                    className="shrink-0 border-gray-600 bg-gray-800 text-white hover:bg-purple-600 hover:border-purple-600 hover:text-white disabled:opacity-50"
                  >
                    {countdown > 0
                      ? `${countdown}s`
                      : getText(
                          "auth.forgotPassword.sendCode",
                          currentLocale,
                        ) ||
                        getText("profile.password.sendCode", currentLocale) ||
                        "Send Code"}
                  </Button>
                </div>
              </div>

              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  {getText("auth.forgotPassword.code", currentLocale) ||
                    getText("profile.password.code", currentLocale) ||
                    "Verification Code"}
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={formData.verificationCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      verificationCode: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  placeholder={
                    getText(
                      "auth.verification.code.placeholder",
                      currentLocale,
                    ) || "Enter 6-digit code"
                  }
                  leftIcon={<MailCheck className="h-5 w-5" />}
                  className="w-full bg-gray-800/50 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  {getText("auth.forgotPassword.newPassword", currentLocale) ||
                    getText("profile.password.new", currentLocale) ||
                    "New Password"}
                </label>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  leftIcon={<Lock className="h-5 w-5" />}
                  minLength={6}
                  className="bg-gray-800/50 text-white placeholder:text-gray-500"
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
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  {getText(
                    "auth.forgotPassword.confirmPassword",
                    currentLocale,
                  ) ||
                    getText("profile.password.confirm", currentLocale) ||
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
                  placeholder="••••••••"
                  leftIcon={<Lock className="h-5 w-5" />}
                  minLength={6}
                  className="bg-gray-800/50 text-white placeholder:text-gray-500"
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
                className="w-full bg-purple-600 !text-white hover:bg-purple-700"
              >
                {isLoading
                  ? "..."
                  : getText("auth.forgotPassword.submit", currentLocale) ||
                    "Reset Password"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <Link
                href={`/${currentLocale}/signin`}
                className="font-semibold text-purple-400 hover:text-purple-300"
              >
                {getText("auth.forgotPassword.backToSignIn", currentLocale) ||
                  "Back to Sign In"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
