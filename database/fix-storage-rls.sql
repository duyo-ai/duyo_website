-- Supabase Storage RLS 정책 수정 (관리자 업로드 허용)

-- 기존 정책들 제거
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can download files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;

-- 새로운 정책들 생성 (더 관대하게)

-- 인증된 사용자 업로드 허용 (더 간단한 조건)
CREATE POLICY "Allow authenticated uploads to app-releases" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'app-releases' 
    AND auth.uid() IS NOT NULL
  );

-- 누구나 다운로드 가능
CREATE POLICY "Allow public downloads from app-releases" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'app-releases');

-- 인증된 사용자 업데이트 허용
CREATE POLICY "Allow authenticated updates to app-releases" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'app-releases' 
    AND auth.uid() IS NOT NULL
  );

-- 인증된 사용자 삭제 허용
CREATE POLICY "Allow authenticated deletes from app-releases" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'app-releases' 
    AND auth.uid() IS NOT NULL
  );

-- app-releases 버킷이 존재하는지 확인하고 없으면 생성
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'app-releases', 
  'app-releases', 
  true,
  5368709120, -- 5GB in bytes
  ARRAY['application/octet-stream', 'application/x-apple-diskimage', 'application/x-msdownload', 'application/zip', 'application/x-zip-compressed']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5368709120,
  allowed_mime_types = ARRAY['application/octet-stream', 'application/x-apple-diskimage', 'application/x-msdownload', 'application/zip', 'application/x-zip-compressed'];
