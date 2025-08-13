import { uploadVersionFile } from '@/lib/supabase-storage'

// Supabase Storage를 사용한 실제 파일 업로드
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const platform = formData.get('platform') as string
    const versionType = formData.get('versionType') as string

    if (!file) {
      return Response.json({ ok: false, error: 'NO_FILE_PROVIDED' }, { status: 400 })
    }

    if (!platform || !versionType) {
      return Response.json({ 
        ok: false, 
        error: 'MISSING_METADATA',
        message: 'platform과 versionType이 필요합니다.' 
      }, { status: 400 })
    }

    // Supabase Storage 파일 크기 제한 (Pro 플랜: 5GB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024 // 5GB in bytes
    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ 
        ok: false, 
        error: 'FILE_TOO_LARGE',
        maxSize: '5GB (Supabase Pro 플랜)',
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
        message: 'Supabase Pro 플랜은 5GB까지 업로드 가능합니다. 파일이 너무 큽니다.'
      }, { status: 400 })
    }

    // 파일 확장자 검증
    const allowedExtensions = ['.dmg', '.exe', '.msi', '.pkg', '.zip']
    const fileExtension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0]
    
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return Response.json({ 
        ok: false, 
        error: 'INVALID_FILE_TYPE',
        allowed: allowedExtensions,
        received: fileExtension || 'none'
      }, { status: 400 })
    }

    // 플랫폼과 버전 타입 검증
    if (!['macOS', 'Windows'].includes(platform)) {
      return Response.json({ 
        ok: false, 
        error: 'INVALID_PLATFORM',
        allowed: ['macOS', 'Windows']
      }, { status: 400 })
    }

    if (!['stable', 'beta'].includes(versionType)) {
      return Response.json({ 
        ok: false, 
        error: 'INVALID_VERSION_TYPE',
        allowed: ['stable', 'beta']
      }, { status: 400 })
    }

    console.log('📁 [upload] Starting upload:', {
      fileName: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      type: file.type,
      platform,
      versionType
    })

    // Supabase Storage에 업로드
    const uploadResult = await uploadVersionFile(file, platform, versionType)

    if (!uploadResult.success) {
      return Response.json({
        ok: false,
        error: 'UPLOAD_FAILED',
        message: uploadResult.error
      }, { status: 500 })
    }

    return Response.json({
      ok: true,
      file: {
        name: uploadResult.fileName,
        originalName: file.name,
        size: uploadResult.fileSize,
        url: uploadResult.publicUrl,
        path: uploadResult.filePath,
        platform,
        versionType
      },
      message: 'File uploaded successfully to Supabase Storage'
    })

  } catch (error) {
    console.error('❌ [upload:error]', error)
    return Response.json({ 
      ok: false, 
      error: 'UPLOAD_FAILED',
      message: '파일 업로드 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

// 업로드 진행상황 체크는 브라우저의 XMLHttpRequest progress 이벤트 사용
export async function GET(req: Request) {
  return Response.json({
    ok: true,
    message: 'File upload progress is handled client-side via XMLHttpRequest progress events'
  })
}
