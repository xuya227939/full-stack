import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRedis } from "@/lib/redis";
import { checkEmailExistsInDatabase } from "@/utils/auth-utils";

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      verificationCode,
      locale = "en",
      referralCode,
    } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          code: 1001,
          msg:
            locale === "zh"
              ? "邮箱和密码不能为空"
              : "Email and password are required",
        },
        { status: 400 },
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          code: 1002,
          msg: locale === "zh" ? "邮箱格式不正确" : "Invalid email format",
        },
        { status: 400 },
      );
    }

    // 检查邮箱是否已注册（防止重复注册）
    const emailExists = await checkEmailExistsInDatabase(email);
    if (emailExists) {
      return NextResponse.json(
        {
          code: 1003,
          msg:
            locale === "zh"
              ? "该邮箱已被注册，请使用其他邮箱或直接登录"
              : "This email is already registered. Please use another email or sign in directly",
        },
        { status: 400 },
      );
    }

    // 验证验证码
    if (!verificationCode) {
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

    const redis = getRedis();
    const key = `verification_code:${email}`;
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

    if (storedCode !== verificationCode) {
      return NextResponse.json(
        {
          code: 1006,
          msg: locale === "zh" ? "验证码错误" : "Invalid verification code",
        },
        { status: 400 },
      );
    }

    // 验证码验证成功，删除 Redis 中的验证码
    await redis.del(key);

    const supabase = createClient();

    // 从邮箱自动生成用户名（邮箱@前面的部分）
    const generatedUsername = email.split("@")[0];

    // 注册用户
    let authData: any = null;
    let authError: any = null;
    let userId: string | null = null;

    const signUpResult = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: generatedUsername,
          locale: locale, // 保存用户语言偏好
        },
      },
    });

    authData = signUpResult.data;
    authError = signUpResult.error;

    // 如果邮箱在 Auth 中已存在（可能是另一个项目的用户）
    if (
      authError &&
      (authError.message.includes("already registered") ||
        authError.message.includes("already exists") ||
        authError.message.includes("User already registered"))
    ) {
      // 再次确认邮箱不在 snapvee_users 表中（防止并发问题）
      const emailExistsInSnapvee = await checkEmailExistsInDatabase(email);
      if (emailExistsInSnapvee) {
        return NextResponse.json(
          {
            code: 1003,
            msg:
              locale === "zh"
                ? "该邮箱已被注册，请使用其他邮箱或直接登录"
                : "This email is already registered. Please use another email or sign in directly",
          },
          { status: 400 },
        );
      }

      // 邮箱在 Auth 中存在，但在 snapvee_users 中不存在
      // 说明是另一个项目的用户，尝试使用该邮箱登录以获取用户 ID
      const signInResult = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInResult.error || !signInResult.data.user) {
        // 密码错误，说明是另一个项目的用户
        return NextResponse.json(
          {
            code: 1007,
            msg:
              locale === "zh"
                ? "该邮箱已被其他项目使用，请使用其他邮箱或直接登录"
                : "This email is already used by another project. Please use another email or sign in directly",
          },
          { status: 400 },
        );
      }

      // 密码正确，获取用户 ID
      userId = signInResult.data.user.id;
    } else if (authError) {
      // 其他错误
      return NextResponse.json(
        {
          code: 1008,
          msg: locale === "zh" ? "注册失败" : "Registration failed",
        },
        { status: 400 },
      );
    } else if (authData?.user) {
      // 注册成功
      userId = authData.user.id;
    }

    if (!userId) {
      return NextResponse.json(
        {
          code: 1009,
          msg: locale === "zh" ? "注册失败" : "Failed to create user",
        },
        { status: 500 },
      );
    }

    // 验证邀请码（如果提供）
    let referrerId: string | null = null;
    if (referralCode) {
      const adminSupabase = createAdminClient();
      const { data: referrer } = await adminSupabase
        .from("snapvee_users")
        .select("id, referral_reward_claimed, referral_suspended")
        .eq("referral_code", referralCode.toUpperCase())
        .single();

      if (referrer) {
        // 检查邀请人是否被冻结
        if (!referrer.referral_suspended) {
          // 检查邀请人是否已获得过奖励（每人限邀请1次）
          if (!referrer.referral_reward_claimed) {
            referrerId = referrer.id;
          }
        }
      }
    }

    // 确保用户记录在 snapvee_users 表中
    // trial_count: 1 (基础下载次数)
    // trial_limit: 3 (1基础 + 2邀请奖励上限)
    const { error: userError } = await supabase.from("snapvee_users").upsert({
      id: userId,
      email: email,
      username: generatedUsername,
      user_level: 0,
      trial_count: 1,
      trial_limit: 3,
      subscription_status: "trial",
      referred_by: referrerId,
    });

    if (userError) {
      console.error("Error creating user record:", userError);
      // 如果是唯一约束冲突，说明用户已经存在（可能是并发注册）
      if (userError.code === "23505") {
        return NextResponse.json(
          {
            code: 1003,
            msg:
              locale === "zh"
                ? "该邮箱已被注册，请使用其他邮箱或直接登录"
                : "This email is already registered. Please use another email or sign in directly",
          },
          { status: 400 },
        );
      }
      // 其他错误，返回通用错误
      return NextResponse.json(
        {
          code: 1010,
          msg:
            locale === "zh"
              ? "创建用户记录失败"
              : "Failed to create user record",
        },
        { status: 500 },
      );
    }

    // 如果有有效的邀请人，创建邀请记录（奖励待激活，等用户首次下载后发放）
    if (referrerId && referralCode) {
      const adminSupabase = createAdminClient();
      const { data: referralData, error: referralError } = await adminSupabase
        .from("snapvee_referrals")
        .insert({
          referrer_id: referrerId,
          referred_id: userId,
          referral_code: referralCode.toUpperCase(),
          reward_granted: false,
          reward_count: 2,
        })
        .select()
        .single();

      if (referralError) {
        console.error("Error creating referral record:", referralError);
        // 记录错误但不中断注册流程
      } else {
        console.log(
          `Referral record created: ${referrerId} -> ${userId}`,
          referralData,
        );
      }
    } else {
      // 记录为什么没有创建邀请记录
      if (referralCode && !referrerId) {
        console.log(
          `Referral code provided (${referralCode}) but no valid referrer found. Possible reasons: referrer suspended, already claimed, or invalid code.`,
        );
      }
    }

    // 发送欢迎邮件（邮箱注册不会触发 NextAuth 的 createUser 事件）
    try {
      const { sendWelcomeEmail } = await import("@/lib/resend");

      // 获取用户语言偏好
      // 1. 优先使用注册时传递的 locale
      // 2. 从邮箱域名推断（中国域名后缀或中国邮箱服务商）
      // 3. 默认使用英文
      let userLocale = locale || "en";

      // 如果 locale 没有明确指定，尝试从邮箱域名推断
      if (!locale || locale === "en") {
        const emailDomain = email.split("@")[1]?.toLowerCase() || "";

        // 中国域名后缀
        const chineseDomainSuffixes =
          /\.(cn|com\.cn|net\.cn|org\.cn|gov\.cn|edu\.cn)$/i;

        // 中国常见邮箱服务商
        const chineseEmailProviders = [
          "163.com",
          "126.com",
          "qq.com",
          "sina.com",
          "sina.cn",
          "sohu.com",
          "yeah.net",
          "139.com",
          "189.cn",
          "aliyun.com",
          "foxmail.com",
          "vip.163.com",
          "vip.126.com",
          "vip.qq.com",
        ];

        // 检查是否是中国域名或中国邮箱服务商
        if (
          chineseDomainSuffixes.test(emailDomain) ||
          chineseEmailProviders.includes(emailDomain)
        ) {
          userLocale = "zh";
        }
      }

      const result = await sendWelcomeEmail(
        email,
        generatedUsername,
        userLocale,
      );
    } catch (emailError: any) {
      console.error(
        "[Register API] Error sending welcome email:",
        emailError?.message || emailError,
        "Stack:",
        emailError?.stack,
      );
      // 不抛出错误，避免影响注册流程
    }

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: {
        id: userId,
        email: email,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { code: 5000, msg: "Internal server error" },
      { status: 500 },
    );
  }
}
