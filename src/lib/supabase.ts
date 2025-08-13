import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 싱글톤 패턴으로 Supabase 클라이언트 생성
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storageKey: 'cutple-auth', // 고유한 storage key 사용
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      }
    })
  }
  return supabaseInstance
})()

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

// Helper functions
export const getUsers = async () => {
  // RLS 우회를 위해 service role key 사용 (서버사이드에서만 가능)
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('getUsers error:', error)
      throw error
    }
    
    console.log('getUsers success:', data?.length || 0, 'users found')
    return data || []
  } catch (error) {
    console.error('getUsers catch:', error)
    throw error
  }
}

export const getDownloadRequests = async () => {
  const { data, error } = await supabase
    .from('download_requests')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const updateDownloadRequestStatus = async (id: number, sent: boolean) => {
  const { data, error } = await supabase
    .from('download_requests')
    .update({ 
      sent,
      sent_at: sent ? new Date().toISOString() : null
    })
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data
}

export const createDownloadRequest = async (email: string, platform: string) => {
  const { data, error } = await supabase
    .from('download_requests')
    .insert([
      { email, platform, sent: false }
    ])
    .select()
  
  if (error) throw error
  return data
}
