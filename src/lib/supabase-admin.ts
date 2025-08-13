import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 관리자용 Supabase 클라이언트 (RLS 우회 가능)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database Types
export interface User {
  id: string
  email: string
  name: string | null
  created_at: string
  email_verified: boolean
  last_sign_in_at: string | null
}

export interface DownloadRequest {
  id: number
  email: string
  platform: string
  created_at: string
  sent: boolean
  sent_at: string | null
}

// 관리자용 헬퍼 함수들
export const getAdminUsers = async () => {
  try {
    console.log('🔍 [getAdminUsers] Fetching users with admin client...')
    
    // 먼저 auth.users에서 조회 시도
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers()
    console.log('📊 [getAdminUsers] Auth users:', authUsers?.users?.length || 0)
    
    // public.users에서 조회
    const { data: publicUsers, error: publicError } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    console.log('📊 [getAdminUsers] Public users:', publicUsers?.length || 0)
    if (publicError) console.error('❌ [getAdminUsers] Public users error:', publicError)
    
    // public.users가 비어있으면 auth.users 데이터로 변환
    if ((!publicUsers || publicUsers.length === 0) && authUsers?.users) {
      console.log('🔄 [getAdminUsers] Converting auth users to public format...')
      const convertedUsers = authUsers.users.map(user => ({
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || '',
        created_at: user.created_at,
        email_verified: !!user.email_confirmed_at,
        last_sign_in_at: user.last_sign_in_at
      }))
      return convertedUsers
    }
    
    return publicUsers || []
  } catch (error) {
    console.error('❌ [getAdminUsers] Error:', error)
    throw error
  }
}

export const getAdminDownloadRequests = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('download_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ [getAdminDownloadRequests] Error:', error)
      throw error
    }
    
    return data || []
  } catch (error) {
    console.error('❌ [getAdminDownloadRequests] Error:', error)
    throw error
  }
}

export const updateAdminDownloadRequestStatus = async (id: number, sent: boolean) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('download_requests')
      .update({ 
        sent,
        sent_at: sent ? new Date().toISOString() : null
      })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('❌ [updateAdminDownloadRequestStatus] Error:', error)
      throw error
    }
    
    return data
  } catch (error) {
    console.error('❌ [updateAdminDownloadRequestStatus] Error:', error)
    throw error
  }
}
