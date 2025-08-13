-- Supabase Storage 설정 (앱 릴리스 파일용)

-- 1. Storage bucket 생성 (Supabase Dashboard에서 수동으로 해야 함)
-- 버킷 이름: app-releases
-- 공개 접근: true (다운로드 가능하도록)
-- 파일 크기 제한: 500MB
-- 허용된 MIME 타입: application/octet-stream, application/x-apple-diskimage, application/x-msdownload

-- 2. Storage RLS 정책 설정

-- 누구나 파일을 다운로드할 수 있도록 (공개 읽기)
INSERT INTO storage.buckets (id, name, public)
VALUES ('app-releases', 'app-releases', true)
ON CONFLICT (id) DO UPDATE SET
  public = true;

-- 인증된 사용자만 파일 업로드 가능 (관리자만)
CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'app-releases' 
    AND auth.role() = 'authenticated'
  );

-- 누구나 파일 다운로드 가능
CREATE POLICY "Anyone can download files" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'app-releases');

-- 인증된 사용자만 파일 삭제 가능 (관리자만)
CREATE POLICY "Authenticated users can delete files" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'app-releases' 
    AND auth.role() = 'authenticated'
  );

-- 인증된 사용자만 파일 업데이트 가능 (관리자만)
CREATE POLICY "Authenticated users can update files" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'app-releases' 
    AND auth.role() = 'authenticated'
  );

-- 3. 폴더 구조 안내
-- releases/
--   ├── stable/
--   │   ├── macOS-stable-{timestamp}.dmg
--   │   └── Windows-stable-{timestamp}.exe
--   └── beta/
--       ├── macOS-beta-{timestamp}.dmg
--       └── Windows-beta-{timestamp}.exe
