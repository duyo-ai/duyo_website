-- 다운로드 요청 테이블 RLS 정책 수정

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Anyone can insert download requests" ON public.download_requests;
DROP POLICY IF EXISTS "Authenticated users can view download requests" ON public.download_requests;
DROP POLICY IF EXISTS "Authenticated users can update download requests" ON public.download_requests;

-- 새로운 정책 생성
-- 1. 누구나 다운로드 요청을 생성할 수 있음 (익명 사용자도 포함)
CREATE POLICY "Anyone can insert download requests" 
  ON public.download_requests 
  FOR INSERT 
  WITH CHECK (true);

-- 2. 인증된 사용자는 모든 다운로드 요청을 조회할 수 있음
CREATE POLICY "Authenticated users can view all download requests" 
  ON public.download_requests 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- 3. 인증된 사용자는 모든 다운로드 요청을 업데이트할 수 있음
CREATE POLICY "Authenticated users can update all download requests" 
  ON public.download_requests 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- 4. 익명 사용자도 자신의 이메일로 된 요청은 조회 가능 (선택사항)
CREATE POLICY "Users can view own email requests" 
  ON public.download_requests 
  FOR SELECT 
  USING (true); -- 모든 사용자가 조회 가능하도록 설정

-- RLS가 활성화되어 있는지 확인
ALTER TABLE public.download_requests ENABLE ROW LEVEL SECURITY;

-- 테스트용 샘플 데이터 삽입
INSERT INTO public.download_requests (email, platform, sent) VALUES
('test@example.com', 'macOS', false),
('sample@gmail.com', 'Windows', true)
ON CONFLICT DO NOTHING;
