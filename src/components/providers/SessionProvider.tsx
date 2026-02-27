"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <NextAuthSessionProvider
      refetchInterval={0} // 禁用自动定期刷新
      refetchOnWindowFocus={false} // 禁用窗口获得焦点时自动刷新
      refetchWhenOffline={false} // 禁用离线时刷新
    >
      {children}
    </NextAuthSessionProvider>
  );
}
