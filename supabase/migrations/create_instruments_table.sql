-- Instruments 테이블 생성 (Supabase 공식 가이드 예시)
-- 
-- 이 파일은 Supabase 공식 Next.js 가이드의 예시를 따라 작성되었습니다.
-- https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
--
-- 사용 방법:
-- 1. Supabase Dashboard → SQL Editor
-- 2. 이 파일의 내용을 복사하여 실행
-- 3. /instruments 페이지에서 데이터 확인

-- 테이블 생성
CREATE TABLE IF NOT EXISTS public.instruments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 샘플 데이터 삽입
INSERT INTO public.instruments (name)
VALUES
  ('violin'),
  ('viola'),
  ('cello')
ON CONFLICT DO NOTHING;

-- RLS 활성화 (개발 단계에서는 선택사항)
-- ALTER TABLE public.instruments ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (anon 역할이 데이터를 읽을 수 있도록)
-- 개발 단계에서는 RLS가 비활성화되어 있으므로 이 정책은 필요 없습니다.
-- 프로덕션에서는 다음 정책을 활성화하세요:
--
-- CREATE POLICY "public can read instruments"
-- ON public.instruments
-- FOR SELECT
-- TO anon
-- USING (true);

-- 권한 부여
GRANT ALL ON TABLE public.instruments TO anon;
GRANT ALL ON TABLE public.instruments TO authenticated;
GRANT ALL ON TABLE public.instruments TO service_role;

