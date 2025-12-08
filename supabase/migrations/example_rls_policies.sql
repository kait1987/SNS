-- RLS 정책 예시 (개발용)
-- 
-- 주의: 이 파일은 예시입니다. 실제 프로덕션에서는
-- 각 테이블의 특성에 맞게 RLS 정책을 작성해야 합니다.
--
-- 개발 단계에서는 RLS가 비활성화되어 있지만,
-- 프로덕션 배포 전에는 이 예시를 참고하여 적절한 정책을 설정하세요.

-- ============================================
-- Users 테이블 RLS 정책 예시
-- ============================================

-- Users 테이블에 RLS 활성화 (프로덕션용)
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 사용자가 자신의 정보만 조회 가능
-- CREATE POLICY "Users can view own profile"
-- ON public.users
-- FOR SELECT
-- TO authenticated
-- USING (
--   clerk_id = (SELECT auth.jwt()->>'sub')
-- );

-- 사용자가 자신의 정보만 업데이트 가능
-- CREATE POLICY "Users can update own profile"
-- ON public.users
-- FOR UPDATE
-- TO authenticated
-- USING (
--   clerk_id = (SELECT auth.jwt()->>'sub')
-- )
-- WITH CHECK (
--   clerk_id = (SELECT auth.jwt()->>'sub')
-- );

-- ============================================
-- 일반적인 테이블 RLS 정책 패턴
-- ============================================

-- 예시: tasks 테이블 (user_id 컬럼이 있는 경우)
-- 
-- CREATE TABLE IF NOT EXISTS public.tasks (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   name TEXT NOT NULL,
--   user_id TEXT NOT NULL DEFAULT (SELECT auth.jwt()->>'sub'),
--   created_at TIMESTAMPTZ DEFAULT now() NOT NULL
-- );
--
-- ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
--
-- -- SELECT: 사용자가 자신의 tasks만 조회 가능
-- CREATE POLICY "Users can view their own tasks"
-- ON public.tasks
-- FOR SELECT
-- TO authenticated
-- USING (
--   user_id = (SELECT auth.jwt()->>'sub')
-- );
--
-- -- INSERT: 사용자가 자신의 tasks만 생성 가능
-- CREATE POLICY "Users can insert their own tasks"
-- ON public.tasks
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (
--   user_id = (SELECT auth.jwt()->>'sub')
-- );
--
-- -- UPDATE: 사용자가 자신의 tasks만 업데이트 가능
-- CREATE POLICY "Users can update their own tasks"
-- ON public.tasks
-- FOR UPDATE
-- TO authenticated
-- USING (
--   user_id = (SELECT auth.jwt()->>'sub')
-- )
-- WITH CHECK (
--   user_id = (SELECT auth.jwt()->>'sub')
-- );
--
-- -- DELETE: 사용자가 자신의 tasks만 삭제 가능
-- CREATE POLICY "Users can delete their own tasks"
-- ON public.tasks
-- FOR DELETE
-- TO authenticated
-- USING (
--   user_id = (SELECT auth.jwt()->>'sub')
-- );

-- ============================================
-- RLS 정책 확인 쿼리
-- ============================================

-- 특정 테이블의 RLS 상태 확인
-- SELECT
--   schemaname,
--   tablename,
--   rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
--   AND tablename = 'users';

-- 특정 테이블의 모든 정책 확인
-- SELECT
--   schemaname,
--   tablename,
--   policyname,
--   permissive,
--   roles,
--   cmd,
--   qual,
--   with_check
-- FROM pg_policies
-- WHERE schemaname = 'public'
--   AND tablename = 'users';

-- ============================================
-- 참고: auth.jwt() 함수 사용법
-- ============================================

-- Clerk user ID 가져오기
-- SELECT auth.jwt()->>'sub' AS clerk_user_id;

-- JWT의 모든 클레임 확인 (디버깅용)
-- SELECT auth.jwt() AS full_jwt;

-- 특정 클레임 확인
-- SELECT auth.jwt()->>'role' AS user_role;  -- 'authenticated' 또는 'anon'

