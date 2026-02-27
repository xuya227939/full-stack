import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRedis } from "@/lib/redis";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * 修改/重置密码（一个接口两用，验证码校验）
 * - 已登录：用当前用户校验验证码并改密（个人中心）
 * - 未登录：body 传 email + verificationCode + newPassword（忘记密码）
 * POST /api/auth/change-password
 * Body: { verificationCode, newPassword, locale?, email? } 未登录时必传 email
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json().catch(() => ({}));
    const { verificationCode, newPassword, email: bodyEmail } = body;
    const locale = (body.locale as string) || "en";

    if (!verificationCode || typeof verificationCode !== "string") {
      return NextResponse.json(
        {
          code: 1004,
          msg:
            locale === "zh"
              ? "验证码不能为空"
              : "Verification code is required",
        },
        { status: 400 },
      );
    }

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        {
          code: 1001,
          msg: locale === "zh" ? "新密码不能为空" : "New password is required",
        },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        {
          code: 1002,
          msg:
            locale === "zh"
              ? "密码至少6位"
              : "Password must be at least 6 characters",
        },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();
    let email: string;
    let userId: string;

    if (session?.user?.id && session?.user?.email) {
      email = session.user.email;
      userId = session.user.id;
    } else if (bodyEmail && typeof bodyEmail === "string") {
      email = bodyEmail.trim();
      if (!email) {
        return NextResponse.json(
          {
            code: 1001,
            msg: locale === "zh" ? "邮箱不能为空" : "Email is required",
          },
          { status: 400 },
        );
      }
      const { data: userRow, error: selectError } = await supabase
        .from("snapvee_users")
        .select("id")
        .eq("email", email)
        .maybeSingle();
      if (selectError || !userRow?.id) {
        return NextResponse.json(
          {
            code: 1007,
            msg:
              locale === "zh"
                ? "未找到该邮箱对应的账户"
                : "Account not found for this email",
          },
          { status: 400 },
        );
      }
      userId = userRow.id;
    } else {
      return NextResponse.json(
        { code: 401, msg: "Unauthorized" },
        { status: 401 },
      );
    }

    const redis = getRedis();
    const key = `password_change_code:${email}`;
    const storedCode = await redis.get(key);

    if (!storedCode) {
      return NextResponse.json(
        {
          code: 1005,
          msg:
            locale === "zh"
              ? "验证码已过期或不存在，请重新获取"
              : "Verification code expired or not found. Please request a new one",
        },
        { status: 400 },
      );
    }

    if (storedCode !== verificationCode.trim()) {
      return NextResponse.json(
        {
          code: 1006,
          msg: locale === "zh" ? "验证码错误" : "Invalid verification code",
        },
        { status: 400 },
      );
    }

    await redis.del(key);

    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (error) {
      console.error("[change-password] Supabase updateUserById error:", error);
      return NextResponse.json(
        {
          code: 5001,
          msg:
            locale === "zh"
              ? "密码更新失败，请稍后重试"
              : "Failed to update password. Please try again later.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ code: 0, msg: "success" });
  } catch (err: unknown) {
    console.error("Change password error:", err);
    return NextResponse.json(
      { code: 5000, msg: "Internal server error" },
      { status: 500 },
    );
  }
}
