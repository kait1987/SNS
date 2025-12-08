/**
 * @file app/instruments/page.tsx
 * @description Supabase 공식 가이드 예시 페이지
 *
 * Supabase 공식 Next.js 가이드에 따라 작성된 예시 페이지입니다.
 * instruments 테이블의 데이터를 조회하여 표시합니다.
 *
 * 참고: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
 */

import { createClient } from "@/lib/supabase/server-official";
import { Suspense } from "react";

/**
 * Instruments 데이터 컴포넌트
 *
 * Supabase에서 instruments 테이블의 데이터를 조회합니다.
 */
async function InstrumentsData() {
  const supabase = await createClient();
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select();

  if (error) {
    console.error("Error fetching instruments:", error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-800">데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p className="text-red-600 text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  if (!instruments || instruments.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-800">데이터가 없습니다.</p>
        <p className="text-yellow-600 text-sm mt-2">
          Supabase 대시보드에서 instruments 테이블을 생성하고 데이터를 추가하세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">악기 목록</h2>
      <ul className="space-y-2">
        {instruments.map((instrument: { id: number; name: string }) => (
          <li
            key={instrument.id}
            className="p-3 bg-white border border-gray-200 rounded shadow-sm"
          >
            <span className="font-medium">{instrument.name}</span>
            <span className="text-gray-500 text-sm ml-2">(ID: {instrument.id})</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
        <p className="text-sm text-gray-600">
          <strong>참고:</strong> 이 페이지는 Supabase 공식 Next.js 가이드의 예시입니다.
          데이터를 확인하려면 Supabase 대시보드에서 instruments 테이블을 생성하세요.
        </p>
      </div>
    </div>
  );
}

/**
 * Instruments 페이지
 *
 * Supabase 공식 가이드 예시를 보여주는 페이지입니다.
 */
export default function Instruments() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Supabase Instruments 예시</h1>
      <Suspense
        fallback={
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-blue-800">악기 목록을 불러오는 중...</p>
          </div>
        }
      >
        <InstrumentsData />
      </Suspense>
    </div>
  );
}

