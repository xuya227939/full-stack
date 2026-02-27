import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRedis } from "@/lib/redis";
import { sendPasswordChangeCodeEmail } from "@/lib/resend";
import { checkEmailExistsInDatabase } from "@/utils/auth-utils";

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * 发送修改/重置密码验证码（一个接口两用）
 * - 已登录：发到当前用户邮箱（个人中心）
 * - 未登录：body 传 email，校验已注册后发送（忘记密码）
 * POST /api/auth/send-password-change-code
 * Body: { locale?, email? } 未登录时必传 email
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json().catch(() => ({}));
    const locale = (body.locale as string) || "en";
    const bodyEmail = (body.email as string)?.trim();

    let email: string;
    if (session?.user?.email) {
      email = session.user.email;
    } else if (bodyEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(bodyEmail)) {
        return NextResponse.json(
          {
            code: 1002,
            msg: locale === "zh" ? "邮箱格式不正确" : "Invalid email format",
          },
          { status: 400 },
        );
      }
      const emailExists = await checkEmailExistsInDatabase(bodyEmail);
      if (!emailExists) {
        return NextResponse.json(
          {
            code: 1003,
            msg:
              locale === "zh"
                ? "该邮箱未注册，请先注册或检查邮箱是否正确"
                : "This email is not registered. Please sign up or check your email",
          },
          { status: 400 },
        );
      }
      email = bodyEmail;
    } else {
      return NextResponse.json(
        { code: 401, msg: "Unauthorized" },
        { status: 401 },
      );
    }

    const code = generateVerificationCode();
    const redis = getRedis();
    const key = `password_change_code:${email}`;
    await redis.setex(key, 300, code);

    try {
      await sendPasswordChangeCodeEmail(email, code, locale);
    } catch (emailError: any) {
      console.error("Failed to send password change code email:", emailError);
      await redis.del(key);
      return NextResponse.json(
        {
          code: 2001,
          msg:
            locale === "zh"
              ? "验证码发送失败"
              : "Failed to send verification email",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ code: 0, msg: "success" });
  } catch (error: any) {
    console.error("Send password change code error:", error);
    return NextResponse.json(
      { code: 5000, msg: "Internal server error" },
      { status: 500 },
    );
  }
}
