// Supabase Storage를 위한 헬퍼 함수들
import { supabaseAdmin } from './supabase-admin'

// 파일 업로드 함수 (바꿔치기 방식)
export async function uploadVersionFile(file: File, platform: string, versionType: string) {
  try {
    // 원본 파일명 그대로 사용
    const fileName = file.name
    const filePath = `releases/${fileName}`

    console.log('📁 [storage] Uploading file:', {
      fileName,
      filePath,
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`
    })

    // Supabase Storage에 파일 업로드 (덮어쓰기)
    const { data, error } = await supabaseAdmin.storage
      .from('app-releases') // 버킷 이름
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true // 덮어쓰기 허용
      })

    if (error) {
      console.error('❌ [storage] Upload failed:', error)
      
      // Supabase Storage 특정 에러 처리
      if (error.message.includes('exceeded the maximum allowed size')) {
        throw new Error('파일 크기가 Supabase Storage 제한(5GB)을 초과했습니다. 파일 크기를 줄여서 다시 시도해주세요.')
      } else if (error.message.includes('Invalid file type')) {
        throw new Error('지원하지 않는 파일 형식입니다. .dmg, .exe, .msi, .pkg, .zip 파일만 업로드 가능합니다.')
      } else {
        throw new Error(`파일 업로드 실패: ${error.message}`)
      }
    }

    // 공개 URL 가져오기
    const { data: urlData } = supabaseAdmin.storage
      .from('app-releases')
      .getPublicUrl(filePath)

    console.log('✅ [storage] Upload successful:', {
      path: data.path,
      publicUrl: urlData.publicUrl
    })

    return {
      success: true,
      fileName: file.name, // 원본 파일명 반환
      filePath: data.path,
      publicUrl: urlData.publicUrl,
      fileSize: file.size
    }

  } catch (error) {
    console.error('❌ [storage] Upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }
  }
}

// 파일 삭제 함수 (필요시)
export async function deleteVersionFile(filePath: string) {
  try {
    const { error } = await supabaseAdmin.storage
      .from('app-releases')
      .remove([filePath])

    if (error) {
      console.error('❌ [storage] Delete failed:', error)
      throw new Error(`파일 삭제 실패: ${error.message}`)
    }

    console.log('✅ [storage] File deleted:', filePath)
    return { success: true }

  } catch (error) {
    console.error('❌ [storage] Delete error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }
  }
}

// 파일 목록 조회 (필요시)
export async function listVersionFiles() {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from('app-releases')
      .list('releases', {
        limit: 100,
        offset: 0
      })

    if (error) {
      console.error('❌ [storage] List failed:', error)
      throw new Error(`파일 목록 조회 실패: ${error.message}`)
    }

    return { success: true, files: data }

  } catch (error) {
    console.error('❌ [storage] List error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }
  }
}
