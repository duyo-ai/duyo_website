-- 단순화된 버전 관리 시스템 (베타/정식만)

-- 기존 테이블 삭제 (있다면)
DROP TABLE IF EXISTS public.app_versions CASCADE;

-- 1. 앱 버전 정보 테이블 (단순화)
CREATE TABLE public.app_versions (
  id bigserial primary key,
  platform text not null check (platform in ('macOS', 'Windows')),
  version_type text not null check (version_type in ('stable', 'beta')),
  
  -- 버전 정보 (수정 가능한 필드들)
  version_number text not null default '1.0.0',
  file_name text not null,
  file_size bigint not null default 0,
  file_url text not null,
  
  -- 다운로드 통계
  download_count bigint default 0,
  
  -- 메타데이터
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- 유니크 제약: 플랫폼당 버전 타입은 하나만 존재
  unique(platform, version_type)
);

-- 2. 기본 데이터 삽입 (4개 고정 버전)
INSERT INTO public.app_versions (platform, version_type, version_number, file_name, file_size, file_url) VALUES
-- macOS 버전들
('macOS', 'stable', '1.0.0', 'Cutple-1.0.0-macOS.dmg', 524288000, 'https://cdn.cutple.com/releases/Cutple-1.0.0-macOS.dmg'),
('macOS', 'beta', '1.1.0-beta.1', 'Cutple-1.1.0-beta1-macOS.dmg', 530000000, 'https://cdn.cutple.com/releases/beta/Cutple-1.1.0-beta1-macOS.dmg'),

-- Windows 버전들  
('Windows', 'stable', '1.0.0', 'Cutple-Setup-1.0.0.exe', 520000000, 'https://cdn.cutple.com/releases/Cutple-Setup-1.0.0.exe'),
('Windows', 'beta', '1.1.0-beta.1', 'Cutple-Setup-1.1.0-beta1.exe', 525000000, 'https://cdn.cutple.com/releases/beta/Cutple-Setup-1.1.0-beta1.exe')

ON CONFLICT (platform, version_type) DO UPDATE SET
  version_number = EXCLUDED.version_number,
  file_name = EXCLUDED.file_name,
  file_size = EXCLUDED.file_size,
  file_url = EXCLUDED.file_url,
  updated_at = timezone('utc'::text, now());

-- 3. 인덱스 생성
CREATE INDEX idx_app_versions_platform_type ON public.app_versions(platform, version_type);

-- 4. RLS 정책
ALTER TABLE public.app_versions ENABLE ROW LEVEL SECURITY;

-- 누구나 모든 버전 조회 가능
CREATE POLICY "Anyone can view versions" 
  ON public.app_versions 
  FOR SELECT 
  USING (true);

-- 인증된 사용자는 버전 수정 가능 (관리자용)
CREATE POLICY "Authenticated users can update versions" 
  ON public.app_versions 
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 5. 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS trigger_update_app_versions_updated_at ON public.app_versions;
CREATE TRIGGER trigger_update_app_versions_updated_at
  BEFORE UPDATE ON public.app_versions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 6. 유용한 뷰 생성
CREATE OR REPLACE VIEW public.current_versions AS
SELECT 
  platform,
  version_type,
  version_number,
  file_name,
  file_size,
  file_url,
  download_count,
  updated_at
FROM public.app_versions 
ORDER BY platform, version_type;
