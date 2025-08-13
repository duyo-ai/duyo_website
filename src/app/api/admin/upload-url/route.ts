import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fileName, fileType, platform, versionType } = body
    
    if (!fileName || !platform || !versionType) {
      return Response.json({ 
        ok: false, 
        error: 'MISSING_DATA',
        message: '파일명, 플랫폼, 버전타입이 모두 필요합니다.' 
      }, { status: 400 })
    }

    console.log('🔗 [upload-url] Generating upload URL for:', {
      fileName,
      fileType,
      platform,
      versionType
    })

    // 파일 경로 생성
    const filePath = `releases/${fileName}`

    try {
      // Supabase Storage에서 Signed Upload URL 생성
      const { data, error } = await supabaseAdmin.storage
        .from('app-releases')
        .createSignedUploadUrl(filePath, {
          upsert: true // 덮어쓰기 허용
        })

      if (error) {
        console.error('❌ [upload-url] Failed to create signed URL:', error)
        return Response.json({
          ok: false,
          error: 'SIGNED_URL_FAILED',
          message: `Signed URL 생성 실패: ${error.message}`
        }, { status: 500 })
      }

      console.log('✅ [upload-url] Signed URL generated successfully')

      // Public URL도 미리 생성
      const { data: publicUrlData } = supabaseAdmin.storage
        .from('app-releases')
        .getPublicUrl(filePath)

      return Response.json({
        ok: true,
        uploadUrl: data.signedUrl,
        token: (data as any).token,
        publicUrl: publicUrlData.publicUrl,
        path: filePath,
        filePath,
        fileName,
        platform,
        versionType
      })

    } catch (error) {
      console.error('❌ [upload-url] Supabase error:', error)
      return Response.json({
        ok: false,
        error: 'SUPABASE_ERROR',
        message: error instanceof Error ? error.message : '알 수 없는 Supabase 오류'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('❌ [upload-url] Unexpected error:', error)
    return Response.json({
      ok: false,
      error: 'UNEXPECTED_ERROR',
      message: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  }
}
