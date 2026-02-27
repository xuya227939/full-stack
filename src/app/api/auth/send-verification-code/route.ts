import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { sendVerificationCodeEmail } from "@/lib/resend";
import { checkEmailExistsInDatabase } from "@/utils/auth-utils";

/**
 * 生成6位数字验证码
 */
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * 发送验证码
 * POST /api/auth/send-verification-code
 */
export async function POST(request: NextRequest) {
  try {
    const { email, locale = "en" } = await request.json();

    if (!email) {
      return NextResponse.json(
        { code: 1001, msg: locale === "zh" ? "邮箱不能为空" : "Email is required" },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { code: 1002, msg: locale === "zh" ? "邮箱格式不正确" : "Invalid email format" },
        { status: 400 }
      );
    }

    // 检查邮箱是否已注册
    const emailExists = await checkEmailExistsInDatabase(email);
    if (emailExists) {
      return NextResponse.json(
        {
          code: 1003,
          msg: locale === "zh"
            ? "该邮箱已被注册，请使用其他邮箱或直接登录"
            : "This email is already registered. Please use another email or sign in directly",
        },
        { status: 400 }
      );
    }

    // 生成验证码
    const code = generateVerificationCode();

    // 存储到 Redis，5分钟有效期
    const redis = getRedis();
    const key = `verification_code:${email}`;
    await redis.setex(key, 300, code); // 300秒 = 5分钟

    // 发送邮件
    try {
      await sendVerificationCodeEmail(email, code, locale);
    } catch (emailError: any) {
      console.error("Failed to send verification email:", emailError);
      // 即使邮件发送失败，也删除 Redis 中的验证码
      await redis.del(key);
      return NextResponse.json(
        { code: 2001, msg: locale === "zh" ? "验证码发送失败" : "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      code: 0,
      msg: "success",
    });
  } catch (error: any) {
    console.error("Send verification code error:", error);
    return NextResponse.json(
      { code: 5000, msg: "Internal server error" },
      { status: 500 }
    );
  }
}
