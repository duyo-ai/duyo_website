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

    // 1) auth.users (모든 공급자 포함: email, Google 등)
    const { data: authListData, error: authError } = await supabaseAdmin.auth.admin.listUsers()
    const authList = authListData?.users || []
    if (authError) console.error('❌ [getAdminUsers] Auth users error:', authError)
    console.log('📊 [getAdminUsers] Auth users:', authList.length)

    // 2) public.users (트리거/동기화 누락 가능성 있으므로 병합 대상)
    const { data: publicUsers, error: publicError } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    if (publicError) console.error('❌ [getAdminUsers] Public users error:', publicError)
    console.log('📊 [getAdminUsers] Public users:', publicUsers?.length || 0)

    // 3) 병합 (id 기준으로 통합, public 값 우선, auth로 보강)
    type AnyUser = {
      id: string
      email: string
      name: string | null
      created_at: string
      email_verified: boolean
      last_sign_in_at: string | null
    }

    const merged = new Map<string, AnyUser>()

    ;(publicUsers || []).forEach((u: any) => {
      merged.set(u.id, {
        id: u.id,
        email: u.email,
        name: u.name || null,
        created_at: u.created_at,
        email_verified: !!u.email_verified,
        last_sign_in_at: u.last_sign_in_at || null,
      })
    })

    authList.forEach((u: any) => {
      const existing = merged.get(u.id)
      const candidate: AnyUser = {
        id: u.id,
        email: u.email || existing?.email || '',
        name: existing?.name ?? u.user_metadata?.name ?? u.user_metadata?.full_name ?? null,
        created_at: existing?.created_at || u.created_at,
        email_verified: existing?.email_verified ?? !!u.email_confirmed_at,
        last_sign_in_at: existing?.last_sign_in_at ?? u.last_sign_in_at ?? null,
      }
      merged.set(u.id, candidate)
    })

    // 4) 정렬 (최신 가입/로그인 순서)
    const result = Array.from(merged.values()).sort((a, b) => (
      (b.last_sign_in_at || b.created_at).localeCompare(a.last_sign_in_at || a.created_at)
    ))

    return result
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
