# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성
1. https://supabase.com 에서 새 프로젝트 생성
2. 프로젝트 설정에서 API 키와 URL 확인

## 2. 환경변수 설정
`.env.local` 파일에 다음 환경변수들을 추가하세요:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration  
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

## 3. 데이터베이스 스키마 적용
`database/schema.sql` 파일의 내용을 Supabase SQL Editor에서 실행하세요.

### 주요 테이블:
- `public.users`: 사용자 정보 (auth.users 확장)
- `public.download_requests`: 다운로드 요청 기록

## 4. Google OAuth 설정 (선택사항)
1. Supabase Dashboard → Authentication → Providers
2. Google 활성화 및 클라이언트 ID/Secret 설정
3. 리디렉션 URL: `{your-site-url}/auth/callback`

## 5. 관리자 계정 설정
관리자 기능을 사용하려면 `admin@cutple.com` 이메일로 사용자를 생성하거나, 코드에서 관리자 이메일을 변경하세요.

## 6. Row Level Security (RLS) 정책
스키마 파일에 포함된 RLS 정책들:
- 사용자는 자신의 프로필만 조회/수정 가능
- 다운로드 요청은 누구나 생성 가능, 관리자만 조회/수정 가능

## 트러블슈팅
- 환경변수가 제대로 로드되지 않으면 개발 서버를 재시작하세요
- OAuth 로그인 후 리디렉션 문제가 있으면 URL 설정을 확인하세요
- 권한 오류가 발생하면 RLS 정책과 사용자 권한을 확인하세요
