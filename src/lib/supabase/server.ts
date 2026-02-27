import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll: async () => (await cookieStore).getAll(),
        setAll: async (cookiesToSet: ResponseCookie[]) => {
          // @ts-ignore
          (await cookieStore).set(...cookiesToSet);
        },
      },
    }
  );
}
