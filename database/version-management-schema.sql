-- 버전 관리 시스템 DB 스키마

-- 1. 앱 버전 정보 테이블
CREATE TABLE public.app_versions (
  id bigserial primary key,
  version_number text not null, -- 예: "1.2.3", "2.0.0-beta.1"
  version_type text not null check (version_type in ('stable', 'beta', 'alpha')),
  platform text not null check (platform in ('macOS', 'Windows')),
  
  -- 파일 정보
  file_name text not null,
  file_size bigint not null, -- bytes
  file_url text not null, -- CDN/S3 URL
  download_count bigint default 0,
  
  -- 버전 정보
  release_notes text,
  is_active boolean default true,
  is_latest boolean default false, -- 각 타입별로 하나만 true
  
  -- 메타데이터
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references public.users(id),
  
  -- 유니크 제약: 같은 플랫폼의 같은 타입에서는 하나의 버전만 latest
  unique(platform, version_type, version_number)
);

-- 2. 다운로드 로그 테이블 (기존 download_requests 확장)
ALTER TABLE public.download_requests ADD COLUMN IF NOT EXISTS version_id bigint references public.app_versions(id);
ALTER TABLE public.download_requests ADD COLUMN IF NOT EXISTS user_agent text;
ALTER TABLE public.download_requests ADD COLUMN IF NOT EXISTS download_ip inet;

-- 3. 인덱스 생성
CREATE INDEX idx_app_versions_platform_type ON public.app_versions(platform, version_type);
CREATE INDEX idx_app_versions_is_latest ON public.app_versions(is_latest) WHERE is_latest = true;
CREATE INDEX idx_app_versions_is_active ON public.app_versions(is_active) WHERE is_active = true;
CREATE INDEX idx_app_versions_created_at ON public.app_versions(created_at);

-- 4. RLS 정책
ALTER TABLE public.app_versions ENABLE ROW LEVEL SECURITY;

-- 누구나 활성화된 버전 조회 가능
CREATE POLICY "Anyone can view active versions" 
  ON public.app_versions 
  FOR SELECT 
  USING (is_active = true);

-- 인증된 사용자는 모든 버전 조회 가능 (관리자용)
CREATE POLICY "Authenticated users can view all versions" 
  ON public.app_versions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- 인증된 사용자는 버전 생성/수정 가능 (관리자용)
CREATE POLICY "Authenticated users can manage versions" 
  ON public.app_versions 
  FOR ALL 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 5. 버전 관리 함수들

-- latest 버전 설정 시 다른 버전들의 latest를 false로 변경
CREATE OR REPLACE FUNCTION public.set_latest_version()
RETURNS TRIGGER AS $$
BEGIN
  -- 새로 latest로 설정되는 경우
  IF NEW.is_latest = true AND (OLD.is_latest IS NULL OR OLD.is_latest = false) THEN
    -- 같은 플랫폼, 같은 타입의 다른 버전들의 latest를 false로 변경
    UPDATE public.app_versions 
    SET is_latest = false 
    WHERE platform = NEW.platform 
      AND version_type = NEW.version_type 
      AND id != NEW.id 
      AND is_latest = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS trigger_set_latest_version ON public.app_versions;
CREATE TRIGGER trigger_set_latest_version
  BEFORE UPDATE ON public.app_versions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_latest_version();

-- 6. 샘플 데이터 삽입
INSERT INTO public.app_versions (
  version_number, version_type, platform, 
  file_name, file_size, file_url, 
  release_notes, is_latest, created_by
) VALUES 
-- macOS 버전들
('1.0.0', 'stable', 'macOS', 'Cutple-1.0.0-macOS.dmg', 524288000, 'https://cdn.cutple.com/releases/Cutple-1.0.0-macOS.dmg', 
 '첫 번째 안정 버전 출시\n- AI 기반 숏폼 제작\n- 자동 음성 생성\n- 이미지 배치 최적화', true, null),

('1.1.0-beta.1', 'beta', 'macOS', 'Cutple-1.1.0-beta1-macOS.dmg', 530000000, 'https://cdn.cutple.com/releases/beta/Cutple-1.1.0-beta1-macOS.dmg', 
 '베타 버전 - 새로운 기능 테스트\n- 향상된 AI 엔진\n- 새로운 템플릿 추가\n- 성능 개선', true, null),

-- Windows 버전들  
('1.0.0', 'stable', 'Windows', 'Cutple-Setup-1.0.0.exe', 520000000, 'https://cdn.cutple.com/releases/Cutple-Setup-1.0.0.exe', 
 '첫 번째 안정 버전 출시\n- AI 기반 숏폼 제작\n- 자동 음성 생성\n- 이미지 배치 최적화', true, null),

('1.1.0-beta.1', 'beta', 'Windows', 'Cutple-Setup-1.1.0-beta1.exe', 525000000, 'https://cdn.cutple.com/releases/beta/Cutple-Setup-1.1.0-beta1.exe', 
 '베타 버전 - 새로운 기능 테스트\n- 향상된 AI 엔진\n- 새로운 템플릿 추가\n- 성능 개선', true, null)

ON CONFLICT DO NOTHING;

-- 7. 유용한 뷰 생성
CREATE OR REPLACE VIEW public.latest_versions AS
SELECT 
  platform,
  version_type,
  version_number,
  file_name,
  file_size,
  file_url,
  release_notes,
  download_count,
  created_at
FROM public.app_versions 
WHERE is_latest = true AND is_active = true
ORDER BY platform, version_type;
