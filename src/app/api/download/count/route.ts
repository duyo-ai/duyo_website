import { supabaseAdmin } from '@/lib/supabase-admin'

// 다운로드 카운트 증가
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { platform, version_type } = body

    if (!platform || !version_type) {
      return Response.json({ 
        ok: false, 
        error: 'MISSING_PARAMS',
        message: 'platform과 version_type이 필요합니다.' 
      }, { status: 400 })
    }

    // 현재 카운트 조회 후 1 증가
    const { data: currentData, error: selectError } = await supabaseAdmin
      .from('app_versions')
      .select('download_count')
      .eq('platform', platform)
      .eq('version_type', version_type)
      .single()

    if (selectError) {
      console.error('❌ [download:count] Select failed:', selectError)
      return Response.json({ 
        ok: false, 
        error: 'SELECT_FAILED',
        details: selectError.message 
      }, { status: 500 })
    }

    const newCount = (currentData.download_count || 0) + 1

    // 다운로드 카운트 업데이트
    const { data, error } = await supabaseAdmin
      .from('app_versions')
      .update({ download_count: newCount })
      .eq('platform', platform)
      .eq('version_type', version_type)
      .select('download_count')
      .single()

    if (error) {
      console.error('❌ [download:count] Update failed:', error)
      return Response.json({ 
        ok: false, 
        error: 'UPDATE_FAILED',
        details: error.message 
      }, { status: 500 })
    }

    console.log('✅ [download:count] Updated:', { platform, version_type, new_count: data.download_count })
    return Response.json({ 
      ok: true, 
      download_count: data.download_count 
    })

  } catch (error) {
    console.error('❌ [download:count:error]', error)
    return Response.json({ 
      ok: false, 
      error: 'UNEXPECTED',
      message: '다운로드 카운트 업데이트 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}
