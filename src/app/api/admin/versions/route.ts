import { supabaseAdmin } from '@/lib/supabase-admin'

// 4개 고정 버전 조회 (macOS/Windows × stable/beta)
export async function GET(req: Request) {
  try {
    const { data: versions, error } = await supabaseAdmin
      .from('app_versions')
      .select('id, platform, version_type, version_number, file_name, file_size, file_url, download_count')
      .order('platform', { ascending: true })
      .order('version_type', { ascending: false }) // beta가 먼저 오도록

    if (error) {
      console.error('❌ [admin:versions:get]', error)
      return Response.json({ ok: false, error: 'FETCH_FAILED' }, { status: 500 })
    }

    console.log('✅ [admin:versions:get]', { count: versions?.length || 0 })
    return Response.json({ ok: true, versions: versions || [] })

  } catch (error) {
    console.error('❌ [admin:versions:get:error]', error)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}

// 버전 정보 수정만 가능 (추가/삭제 불가)
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, version_number, file_name, file_size, file_url } = body

    if (!id) {
      return Response.json({ ok: false, error: 'MISSING_VERSION_ID' }, { status: 400 })
    }

    // 수정 가능한 필드만 업데이트
    const updateData: any = {}
    if (version_number !== undefined) updateData.version_number = version_number
    if (file_name !== undefined) updateData.file_name = file_name
    if (file_size !== undefined) updateData.file_size = parseInt(file_size) || 0
    if (file_url !== undefined) updateData.file_url = file_url

    const { data: updatedVersion, error } = await supabaseAdmin
      .from('app_versions')
      .update(updateData)
      .eq('id', id)
      .select('id, platform, version_type, version_number, file_name, file_size, file_url, download_count')
      .single()

    if (error) {
      console.error('❌ [admin:versions:put]', error)
      return Response.json({ 
        ok: false, 
        error: 'UPDATE_FAILED',
        details: error.message 
      }, { status: 500 })
    }

    console.log('✅ [admin:versions:put]', { id, updated: Object.keys(updateData) })
    return Response.json({ ok: true, version: updatedVersion })

  } catch (error) {
    console.error('❌ [admin:versions:put:error]', error)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}
