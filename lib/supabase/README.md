# Supabase 클라이언트 가이드

이 디렉토리에는 Supabase 클라이언트가 여러 방식으로 제공됩니다. 프로젝트의 요구사항에 맞는 클라이언트를 선택하여 사용하세요.

## 클라이언트 종류

### 1. Clerk 통합 클라이언트 (권장: Clerk 사용 시)

Clerk 인증을 사용하는 경우 이 클라이언트를 사용하세요.

#### Server Component용
```typescript
// lib/supabase/server.ts
import { createClerkSupabaseClient } from '@/lib/supabase/server';

const supabase = createClerkSupabaseClient();
```

#### Client Component용
```typescript
// lib/supabase/clerk-client.ts
import { useClerkSupabaseClient } from '@/lib/supabase/clerk-client';

const supabase = useClerkSupabaseClient();
```

**특징:**
- Clerk 세션 토큰을 자동으로 Supabase에 전달
- 2025년 권장 네이티브 통합 방식
- JWT 템플릿 불필요

### 2. Supabase 공식 방식 클라이언트 (Supabase 자체 인증 사용 시)

Supabase 자체 인증(Cookie-based)을 사용하는 경우 이 클라이언트를 사용하세요.

#### Server Component용
```typescript
// lib/supabase/server-official.ts
import { createClient } from '@/lib/supabase/server-official';

const supabase = await createClient();
```

#### Client Component용
```typescript
// lib/supabase/client-official.ts
import { createClient } from '@/lib/supabase/client-official';

const supabase = createClient();
```

**특징:**
- Supabase 공식 Next.js 가이드 방식
- Cookie-based 인증
- `@supabase/ssr` 패키지 사용

### 3. 공개 데이터용 클라이언트

인증이 필요 없는 공개 데이터에 접근할 때 사용합니다.

```typescript
// lib/supabase/client.ts
import { supabase } from '@/lib/supabase/client';

// RLS 정책이 'anon' 역할에 허용된 데이터만 접근 가능
```

### 4. 관리자 권한 클라이언트

RLS를 우회하여 모든 데이터에 접근해야 할 때 사용합니다. **서버 사이드에서만 사용**하세요.

```typescript
// lib/supabase/service-role.ts
import { getServiceRoleClient } from '@/lib/supabase/service-role';

const supabase = getServiceRoleClient();
```

**주의:** Service Role Key는 절대 클라이언트에 노출되면 안 됩니다!

## 사용 가이드

### Clerk를 사용하는 경우 (현재 프로젝트 기본 설정)

```tsx
// Server Component
import { createClerkSupabaseClient } from '@/lib/supabase/server';

export default async function MyPage() {
  const supabase = createClerkSupabaseClient();
  const { data } = await supabase.from('users').select();
  return <div>...</div>;
}
```

```tsx
// Client Component
'use client';
import { useClerkSupabaseClient } from '@/lib/supabase/clerk-client';

export default function MyComponent() {
  const supabase = useClerkSupabaseClient();
  // ...
}
```

### Supabase 자체 인증을 사용하는 경우

```tsx
// Server Component
import { createClient } from '@/lib/supabase/server-official';

export default async function MyPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('instruments').select();
  return <div>...</div>;
}
```

```tsx
// Client Component
'use client';
import { createClient } from '@/lib/supabase/client-official';

export default function MyComponent() {
  const supabase = createClient();
  // ...
}
```

## 참고 자료

- [Clerk + Supabase 통합 가이드](../docs/CLERK_SUPABASE_INTEGRATION.md)
- [Supabase 공식 Next.js 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase SSR 문서](https://supabase.com/docs/guides/auth/server-side/creating-a-client)

