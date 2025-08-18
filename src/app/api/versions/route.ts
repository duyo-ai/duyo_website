import { supabase } from '@/lib/supabase'
export const revalidate = 0
export const dynamic = 'force-dynamic'

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
        // 즉시 반영을 위해 캐시 비활성화
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
      },
    })

  } catch (error) {
    console.error('❌ [public:versions:get:error]', error)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}
