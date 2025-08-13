import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('📁 [storage-upload] Starting upload process')
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const platform = formData.get('platform') as string
    const versionType = formData.get('versionType') as string
    
    if (!file || !platform || !versionType) {
      return Response.json({ 
        ok: false, 
        error: 'MISSING_DATA',
        message: '파일, 플랫폼, 버전타입이 모두 필요합니다.' 
      }, { status: 400 })
    }

    console.log('📁 [storage-upload] File info:', {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      type: file.type,
      platform,
      versionType
    })

    // 서버사이드에서 Supabase Admin으로 업로드 (RLS 우회)
    const filePath = `releases/${file.name}`
    
    // 기존 파일 삭제 (무시해도 됨)
    await supabaseAdmin.storage
      .from('app-releases')
      .remove([filePath])
      .catch(() => {}) // 에러 무시

    console.log('📁 [storage-upload] Uploading to path:', filePath)

    // Admin 클라이언트로 업로드 (RLS 정책 우회)
    const { data, error } = await supabaseAdmin.storage
      .from('app-releases')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('❌ [storage-upload] Upload failed:', error)
      
      if (error.message.includes('exceeded the maximum allowed size')) {
        return Response.json({
          ok: false,
          error: 'FILE_TOO_LARGE',
          message: '파일 크기가 Supabase Storage 제한(5GB)을 초과했습니다.'
        }, { status: 400 })
      }
      
      return Response.json({
        ok: false,
        error: 'UPLOAD_FAILED',
        message: `업로드 실패: ${error.message}`
      }, { status: 500 })
    }

    // 공개 URL 생성
    const { data: urlData } = supabaseAdmin.storage
      .from('app-releases')
      .getPublicUrl(filePath)

    console.log('✅ [storage-upload] Upload successful:', {
      path: data.path,
      publicUrl: urlData.publicUrl
    })

    return Response.json({
      ok: true,
      file: {
        name: file.name,
        originalName: file.name,
        size: file.size,
        url: urlData.publicUrl,
        path: data.path,
        platform,
        versionType
      },
      message: 'File uploaded successfully'
    })

  } catch (error) {
    console.error('❌ [storage-upload] Unexpected error:', error)
    return Response.json({
      ok: false,
      error: 'UNEXPECTED_ERROR',
      message: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  }
}

// Note: In App Router, body size limits are handled differently
// and this config is not needed/supported
