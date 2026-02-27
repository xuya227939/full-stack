import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Google OAuth 回调处理
 * 将 /auth/callback 重定向到 NextAuth 的回调路径 /api/auth/callback/google
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  // 获取所有查询参数
  const searchParams = requestUrl.searchParams;

  // 构建 NextAuth 的回调 URL
  const nextAuthCallbackUrl = new URL(
    "/api/auth/callback/google",
    requestUrl.origin
  );

  // 将所有查询参数传递给 NextAuth
  searchParams.forEach((value, key) => {
    nextAuthCallbackUrl.searchParams.set(key, value);
  });

  // 重定向到 NextAuth 的回调处理
  return NextResponse.redirect(nextAuthCallbackUrl);
}
