/**
 * @file client-official.ts
 * @description Supabase 공식 방식 클라이언트 클라이언트 (Browser-based)
 *
 * 이 파일은 Supabase 공식 Next.js 가이드에 따른 브라우저 클라이언트를 제공합니다.
 * Client Component에서 사용할 수 있습니다.
 *
 * Supabase 공식 문서:
 * https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { createClient } from '@/lib/supabase/client-official';
 *
 * export default function MyComponent() {
 *   const supabase = createClient();
 *   // ...
 * }
 * ```
 */

"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase 공식 방식 브라우저 클라이언트 생성
 *
 * Client Component에서 사용할 수 있는 Supabase 클라이언트를 생성합니다.
 *
 * @returns Supabase 클라이언트 인스턴스
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

