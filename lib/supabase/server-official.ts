/**
 * @file server-official.ts
 * @description Supabase 공식 방식 서버 클라이언트 (Cookie-based Auth)
 *
 * 이 파일은 Supabase 공식 Next.js 가이드에 따른 Cookie-based 인증 방식을 사용합니다.
 * Clerk를 사용하지 않는 경우 또는 Supabase 자체 인증을 사용하는 경우에 사용합니다.
 *
 * Supabase 공식 문서:
 * https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
 *
 * @example
 * ```tsx
 * // Server Component
 * import { createClient } from '@/lib/supabase/server-official';
 *
 * export default async function MyPage() {
 *   const supabase = await createClient();
 *   const { data } = await supabase.from('instruments').select();
 *   return <div>...</div>;
 * }
 * ```
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase 공식 방식 서버 클라이언트 생성
 *
 * Next.js 15 App Router에서 Cookie-based 인증을 사용하는 Supabase 클라이언트를 생성합니다.
 * 이 함수는 Server Component나 Server Action에서 사용할 수 있습니다.
 *
 * @returns Supabase 클라이언트 인스턴스
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

