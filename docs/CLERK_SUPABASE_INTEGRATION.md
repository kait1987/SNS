# Clerk + Supabase 통합 가이드

이 문서는 2025년 권장 방식인 Clerk와 Supabase의 네이티브 통합을 설정하는 방법을 설명합니다.

## 개요

2025년 4월 1일부터 Clerk의 Supabase JWT 템플릿이 deprecated되었고, **네이티브 Supabase 통합**이 권장됩니다.

### 네이티브 통합의 장점

- ✅ 각 Supabase 요청마다 새 토큰을 가져올 필요 없음
- ✅ Supabase JWT secret key를 Clerk와 공유할 필요 없음
- ✅ 더 간단한 설정 및 유지보수

## 설정 단계

### 1단계: Clerk Dashboard에서 Supabase 통합 활성화

1. [Clerk Dashboard](https://dashboard.clerk.com)에 로그인
2. **Setup** > **Supabase** 메뉴로 이동
   - 또는 직접 링크: https://dashboard.clerk.com/setup/supabase
3. 설정 옵션을 선택하고 **"Activate Supabase integration"** 클릭
4. 표시되는 **Clerk domain**을 복사해두세요
   - 예: `your-app.clerk.accounts.dev`

### 2단계: Supabase Dashboard에서 Clerk를 Third-Party Auth Provider로 추가

1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. 프로젝트 선택
3. **Authentication** > **Sign In / Up** > **Third Party Auth** 메뉴로 이동
   - 또는 직접 링크: https://supabase.com/dashboard/project/_/auth/third-party
4. **"Add provider"** 버튼 클릭
5. **"Clerk"** 선택
6. 1단계에서 복사한 **Clerk domain**을 붙여넣기
7. 저장

### 3단계: 환경 변수 확인

`.env` 파일에 다음 변수들이 설정되어 있는지 확인하세요:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 코드 구조

프로젝트는 이미 Clerk와 Supabase 통합을 위한 코드가 준비되어 있습니다:

### Client Component용

```typescript
// lib/supabase/clerk-client.ts
import { useClerkSupabaseClient } from '@/lib/supabase/clerk-client';

// 컴포넌트 내에서
const supabase = useClerkSupabaseClient();
```

### Server Component용

```typescript
// lib/supabase/server.ts
import { createClerkSupabaseClient } from '@/lib/supabase/server';

// Server Component 또는 Server Action에서
const supabase = createClerkSupabaseClient();
```

## Row Level Security (RLS) 정책

Supabase의 RLS 정책을 사용하여 사용자가 자신의 데이터에만 접근할 수 있도록 제한할 수 있습니다.

### RLS 정책에서 Clerk User ID 사용

RLS 정책에서는 `auth.jwt()->>'sub'`를 사용하여 Clerk user ID를 확인합니다:

```sql
-- 예시: 사용자가 자신의 데이터만 조회 가능
CREATE POLICY "Users can view their own data"
ON "public"."your_table"
FOR SELECT
TO authenticated
USING (
  ((select auth.jwt()->>'sub') = (user_id)::text)
);
```

### 현재 프로젝트의 RLS 설정

개발 단계에서는 RLS가 비활성화되어 있습니다. 프로덕션 배포 전에는 적절한 RLS 정책을 설정해야 합니다.

RLS 정책 예시는 `supabase/migrations/` 디렉토리의 마이그레이션 파일을 참고하세요.

## 사용자 동기화

Clerk 사용자는 자동으로 Supabase `users` 테이블에 동기화됩니다:

- `SyncUserProvider`가 RootLayout에서 자동 실행
- 로그인 시 `/api/sync-user` API를 호출하여 사용자 정보 동기화
- `clerk_id` 컬럼에 Clerk user ID 저장

## 테스트

통합이 제대로 작동하는지 확인하려면:

1. 개발 서버 실행: `pnpm dev`
2. 로그인 후 `/auth-test` 페이지에서 테스트
3. Supabase Dashboard에서 데이터 확인

## 참고 자료

- [Clerk 공식 문서: Supabase 통합](https://clerk.com/docs/guides/development/integrations/databases/supabase)
- [Supabase 공식 문서: Third-Party Auth](https://supabase.com/docs/guides/auth/third-party/overview)
- [Supabase 공식 문서: Clerk 통합](https://supabase.com/docs/guides/auth/third-party/clerk)

## 문제 해결

### "Unauthorized" 오류가 발생하는 경우

1. Clerk Dashboard에서 Supabase 통합이 활성화되었는지 확인
2. Supabase Dashboard에서 Clerk provider가 추가되었는지 확인
3. Clerk domain이 올바르게 입력되었는지 확인

### RLS 정책이 작동하지 않는 경우

1. RLS가 활성화되어 있는지 확인: `ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;`
2. 정책이 올바르게 생성되었는지 확인
3. `auth.jwt()->>'sub'`가 올바른 Clerk user ID를 반환하는지 확인

