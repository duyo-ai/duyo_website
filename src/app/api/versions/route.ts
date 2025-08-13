import { supabase } from '@/lib/supabase'
export const revalidate = 300 // 5분 TTL, CDN 캐시 허용

// 공개 API: 현재 버전 정보 조회 (다운로드 페이지용)
export async function GET(req: Request) {
  try {
    const { data: versions, error } = await supabase
      .from('app_versions')
      .select('platform, version_type, version_number, file_name, file_size, file_url, download_count')
      .order('platform', { ascending: true })
      .order('version_type', { ascending: false }) // beta가 먼저 오도록

    if (error) {
      console.error('❌ [public:versions:get]', error)
      return Response.json({ ok: false, error: 'FETCH_FAILED' }, { status: 500 })
    }

    // 플랫폼별로 그룹화
    const groupedVersions = {
      macOS: {
        stable: versions.find(v => v.platform === 'macOS' && v.version_type === 'stable'),
        beta: versions.find(v => v.platform === 'macOS' && v.version_type === 'beta')
      },
      Windows: {
        stable: versions.find(v => v.platform === 'Windows' && v.version_type === 'stable'),
        beta: versions.find(v => v.platform === 'Windows' && v.version_type === 'beta')
      }
    }

    console.log('✅ [public:versions:get]', { count: versions?.length || 0 })
    return new Response(JSON.stringify({ ok: true, versions: groupedVersions }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // CDN: 5분 동안 신선, 그 후에는 오래된 응답을 즉시 제공하고 백그라운드 재검증
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    })

  } catch (error) {
    console.error('❌ [public:versions:get:error]', error)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}
