import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// 辅助函数：通过邮箱查找 auth.users 中的用户
async function findAuthUserByEmail(email: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000, // 分页查找，如果用户量大需要优化
  });

  if (error) {
    console.error("[findAuthUserByEmail] Error listing users:", error);
    return null;
  }

  return data.users.find((u) => u.email === email) || null;
}

// 辅助函数：在 auth.users 中创建 OAuth 用户
async function createAuthUserForOAuth(
  email: string,
  name: string,
  provider: string,
  image?: string,
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    email_confirm: true, // OAuth 用户邮箱已验证
    user_metadata: {
      provider: provider,
      name: name,
      avatar_url: image,
      username: email.split("@")[0],
    },
  });

  if (error) {
    console.error("[createAuthUserForOAuth] Error creating user:", error);
    return null;
  }

  return data.user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 不使用 SupabaseAdapter，手动管理用户创建
  // 这样可以确保 Google 登录的用户也在 auth.users 中创建
  // 从而满足 snapvee_users 表的外键约束
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true, // 允许在生产环境中使用动态主机
  debug: process.env.NODE_ENV === "development", // 开发环境启用调试
  session: {
    strategy: "jwt", // 使用 JWT 策略，但保留 adapter 用于用户创建和账户链接
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      // 确保从 Google 获取邮箱和用户信息
      profile(profile) {
        // Google 应该总是提供邮箱，但为了安全起见，我们确保它存在
        if (!profile.email) {
          console.error("[GoogleProvider] Profile missing email:", profile);
          throw new Error("Google profile missing email");
        }
        return {
          id: profile.sub,
          name: profile.name || profile.email.split("@")[0],
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Email Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text", required: false },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const supabase = createClient();

          // 尝试使用邮箱登录
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (error || !data.user) {
            return null;
          }

          // 检查用户是否在 snapvee_users 表中
          const { data: userData, error: userError } = await supabase
            .from("snapvee_users")
            .select("*")
            .eq("id", data.user.id)
            .maybeSingle();

          // 如果用户不在 snapvee_users 表中，创建记录
          if (!userData) {
            const generatedUsername =
              data.user.email?.split("@")[0] ||
              `user_${data.user.id.slice(0, 8)}`;
            const { error: createError } = await supabase
              .from("snapvee_users")
              .upsert({
                id: data.user.id,
                email: data.user.email,
                username: generatedUsername,
                user_level: 0,
                trial_count: 1,
                trial_limit: 3,
                subscription_status: "trial",
              });

            if (createError) {
              console.error(
                "Error creating user record on login:",
                createError,
              );
              // 即使创建失败，也允许登录（可能是并发问题，记录已存在）
            }
          }

          // 获取最新的用户信息（如果刚刚创建了记录）
          const { data: latestUserData } = await supabase
            .from("snapvee_users")
            .select("*")
            .eq("id", data.user.id)
            .single();

          return {
            id: data.user.id,
            email: data.user.email,
            name: latestUserData?.username || data.user.email?.split("@")[0],
            image: data.user.user_metadata?.avatar_url,
          };
        } catch (error) {
          console.error("Credentials login error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // 对于 OAuth 登录（Google/GitHub），需要确保用户在 auth.users 中存在
      if (account?.provider === "google" || account?.provider === "github") {
        // 确保邮箱存在
        if (!user?.email) {
          console.error(
            "[SignIn Callback] OAuth user missing email:",
            user,
            profile,
          );
          if (profile?.email) {
            user.email = profile.email as string;
          } else {
            console.error(
              "[SignIn Callback] Cannot proceed without email for OAuth user",
            );
            return false;
          }
        }

        try {
          // 1. 检查邮箱是否已在 auth.users 中存在
          const existingAuthUser = await findAuthUserByEmail(user.email);

          // 标记是否为新用户，用于后续发送欢迎邮件
          let isNewUser = false;

          if (existingAuthUser) {
            // 2a. 用户已存在，使用现有用户的 ID
            // 这样可以实现：先邮箱注册，后 Google 登录，关联到同一个用户
            console.log(
              "[SignIn Callback] Found existing auth user:",
              existingAuthUser.id,
            );
            user.id = existingAuthUser.id;
          } else {
            // 2b. 用户不存在，在 auth.users 中创建新用户
            console.log(
              "[SignIn Callback] Creating new auth user for:",
              user.email,
            );
            const newAuthUser = await createAuthUserForOAuth(
              user.email,
              user.name || user.email.split("@")[0],
              account.provider,
              user.image || undefined,
            );

            if (newAuthUser) {
              user.id = newAuthUser.id;
              isNewUser = true; // 标记为新用户
              console.log("[SignIn Callback] Created new auth user:", user.id);
            } else {
              console.error(
                "[SignIn Callback] Failed to create auth user for:",
                user.email,
              );
              // 仍然允许登录，但 ID 会是 Google 提供的 sub
              // 后续 jwt callback 会尝试处理
            }
          }

          // 3. 确保 snapvee_users 表中有记录（触发器可能已经创建，但为了安全起见手动检查）
          const supabase = createAdminClient();
          const { data: snapveeUser } = await supabase
            .from("snapvee_users")
            .select("id")
            .eq("id", user.id)
            .maybeSingle();

          const generatedUsername =
            user.email?.split("@")[0] || `user_${user.id.slice(0, 8)}`;

          if (!snapveeUser) {
            // 手动创建 snapvee_users 记录（触发器可能在某些情况下不触发）
            console.log(
              "[SignIn Callback] Creating snapvee_users record for user:",
              user.id,
              user.email,
            );

            const { data: createdUser, error: createError } = await supabase
              .from("snapvee_users")
              .insert({
                id: user.id,
                email: user.email,
                username: generatedUsername,
                user_level: 0,
                trial_count: 1,
                trial_limit: 3,
                subscription_status: "trial",
                is_early_bird: false,
                early_bird_number: null,
              })
              .select()
              .single();

            if (createError) {
              console.error(
                "[SignIn Callback] Error creating snapvee_users record:",
                createError.code,
                createError.message,
                createError.details,
              );
              // 如果是外键约束错误，说明 user.id 不在 auth.users 中
              if (createError.code === "23503") {
                console.error(
                  "[SignIn Callback] Foreign key constraint failed. User ID may not exist in auth.users:",
                  user.id,
                );
              }
              // 不阻止登录，jwt callback 会再次尝试
            } else {
              console.log(
                "[SignIn Callback] Successfully created snapvee_users record:",
                createdUser,
              );
            }
          } else {
            console.log(
              "[SignIn Callback] snapvee_users record already exists for:",
              user.id,
            );
          }

          // 4. 如果是新用户，发送欢迎邮件
          if (isNewUser && user.email) {
            try {
              const { sendWelcomeEmail } = await import("@/lib/resend");

              // 根据邮箱域名推断语言偏好
              const emailDomain = user.email.split("@")[1]?.toLowerCase() || "";
              const chineseDomainSuffixes =
                /\.(cn|com\.cn|net\.cn|org\.cn|gov\.cn|edu\.cn)$/i;
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

              let userLocale = "en";
              if (
                chineseDomainSuffixes.test(emailDomain) ||
                chineseEmailProviders.includes(emailDomain)
              ) {
                userLocale = "zh";
              }

              await sendWelcomeEmail(user.email, generatedUsername, userLocale);
              console.log(
                "[SignIn Callback] Welcome email sent to:",
                user.email,
              );
            } catch (emailError) {
              console.error(
                "[SignIn Callback] Error sending welcome email:",
                emailError,
              );
              // 不阻止登录
            }
          }
        } catch (error) {
          console.error("[SignIn Callback] Error in OAuth flow:", error);
          // 继续登录流程，jwt callback 会尝试处理
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // redirect 回调处理登录后的跳转
      // 注意：这里不能做复杂的 Redis 检查，问卷检查逻辑在 download 页面处理

      // 如果 URL 是相对路径，使用 baseUrl
      if (url.startsWith("/")) {
        // 如果 URL 是错误页面或 signin 页面，跳转到 /en/download（默认语言）
        // download 页面会检查问卷状态并重定向
        if (url.includes("/error") || url.includes("/signin")) {
          return `${baseUrl}/en/download`;
        }
        return `${baseUrl}${url}`;
      }

      // 如果 URL 是绝对路径且在同一域名下
      try {
        const urlObj = new URL(url);
        if (urlObj.origin === baseUrl) {
          if (
            urlObj.pathname.includes("/error") ||
            urlObj.pathname.includes("/signin")
          ) {
            return `${baseUrl}/en/download`;
          }
          return url;
        }
        return url;
      } catch (e) {
        console.error("[Redirect Callback] URL parse error:", e);
      }

      // 默认跳转到 /en/download（带语言前缀）
      return `${baseUrl}/en/download`;
    },
    async jwt({ token, user, account, trigger }) {
      // 首次登录时，将用户信息添加到 token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      const userId = token.id as string;
      const userEmail = user?.email || (token.email as string);

      // 每次 JWT 回调时都从数据库获取最新的用户信息
      // 这样可以确保支付成功后，用户信息能够及时更新
      if (userId) {
        try {
          const supabase = createAdminClient();

          // 获取用户数据
          const { data: userData, error: userError } = await supabase
            .from("snapvee_users")
            .select("*")
            .eq("id", userId)
            .maybeSingle();

          if (userError) {
            console.error(
              "[JWT Callback] Error fetching user data:",
              userError,
            );
          }

          if (userData) {
            // 检查 Pro 订阅是否过期（用于月付/年付订阅）
            if (
              userData.user_level === 2 &&
              userData.subscription_status === "active"
            ) {
              const { data: subscriptionData } = await supabase
                .from("snapvee_subscriptions")
                .select("status, current_period_end, cancel_at_period_end")
                .eq("user_id", userId)
                .order("created_at", { ascending: false })
                .limit(1)
                .maybeSingle();

              const periodEnd = subscriptionData?.current_period_end
                ? new Date(subscriptionData.current_period_end).getTime()
                : null;
              const isExpired = periodEnd !== null && periodEnd <= Date.now();
              const isInactive =
                subscriptionData?.status &&
                subscriptionData.status !== "active";

              if (isExpired || isInactive) {
                await supabase
                  .from("snapvee_users")
                  .update({
                    user_level: 0,
                    subscription_status: "expired",
                  })
                  .eq("id", userId);

                userData.user_level = 0;
                userData.subscription_status = "expired";
              }
            }

            // 用户存在，更新 token 中的信息
            token.userLevel = userData.user_level;
            token.trialCount = userData.trial_count;
            token.trialLimit = userData.trial_limit;
            token.subscriptionStatus = userData.subscription_status;
            // 早鸟用户信息
            token.isEarlyBird = userData.is_early_bird || false;
            token.earlyBirdNumber = userData.early_bird_number || null;
          } else {
            // 用户记录不存在，无论是首次登录还是后续刷新，都尝试创建
            console.warn(
              "[JWT Callback] User record not found in snapvee_users, attempting to create:",
              userId,
            );

            if (userEmail) {
              const generatedUsername =
                userEmail.split("@")[0] || `user_${userId.slice(0, 8)}`;

              // 使用 insert 而不是 upsert，避免覆盖已存在的记录
              const { data: newUserData, error: createError } = await supabase
                .from("snapvee_users")
                .insert({
                  id: userId,
                  email: userEmail,
                  username: generatedUsername,
                  user_level: 0,
                  trial_count: 1,
                  trial_limit: 3,
                  subscription_status: "trial",
                  is_early_bird: false,
                  early_bird_number: null,
                })
                .select()
                .single();

              if (createError) {
                // 如果是唯一约束冲突（记录已存在），尝试重新获取
                if (createError.code === "23505") {
                  console.log(
                    "[JWT Callback] User record already exists, fetching again:",
                    userId,
                  );
                  const { data: existingUser } = await supabase
                    .from("snapvee_users")
                    .select("*")
                    .eq("id", userId)
                    .single();

                  if (existingUser) {
                    token.userLevel = existingUser.user_level;
                    token.trialCount = existingUser.trial_count;
                    token.trialLimit = existingUser.trial_limit;
                    token.subscriptionStatus = existingUser.subscription_status;
                    token.isEarlyBird = existingUser.is_early_bird || false;
                    token.earlyBirdNumber =
                      existingUser.early_bird_number || null;
                    return token;
                  }
                } else {
                  console.error(
                    "[JWT Callback] Error creating user record:",
                    createError,
                  );
                }
              } else if (newUserData) {
                console.log(
                  "[JWT Callback] Successfully created user record:",
                  userId,
                );
                token.userLevel = newUserData.user_level;
                token.trialCount = newUserData.trial_count;
                token.trialLimit = newUserData.trial_limit;
                token.subscriptionStatus = newUserData.subscription_status;
                token.isEarlyBird = newUserData.is_early_bird || false;
                token.earlyBirdNumber = newUserData.early_bird_number || null;
                return token;
              }
            }

            // 创建失败时使用默认值
            token.userLevel = token.userLevel ?? 0;
            token.trialCount = token.trialCount ?? 1;
            token.trialLimit = token.trialLimit ?? 3;
            token.subscriptionStatus = token.subscriptionStatus ?? "trial";
            token.isEarlyBird = token.isEarlyBird ?? false;
            token.earlyBirdNumber = token.earlyBirdNumber ?? null;
          }
        } catch (error) {
          console.error("[JWT Callback] Error:", error);
          // 发生错误时，保留现有值
          token.userLevel = token.userLevel ?? 0;
          token.trialCount = token.trialCount ?? 1;
          token.trialLimit = token.trialLimit ?? 3;
          token.subscriptionStatus = token.subscriptionStatus ?? "trial";
          token.isEarlyBird = token.isEarlyBird ?? false;
          token.earlyBirdNumber = token.earlyBirdNumber ?? null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.userLevel = token.userLevel as number;
        session.user.trialCount = token.trialCount as number;
        session.user.trialLimit = token.trialLimit as number;
        session.user.subscriptionStatus = token.subscriptionStatus as string;
        // 早鸟用户信息
        session.user.isEarlyBird = token.isEarlyBird as boolean;
        session.user.earlyBirdNumber = token.earlyBirdNumber as number | null;
      }
      return session;
    },
  },
  // 注意：由于不使用 adapter，createUser event 不会被触发
  // 用户创建逻辑已在 signIn callback 中处理
});
