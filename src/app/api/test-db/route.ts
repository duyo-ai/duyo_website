import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('🔍 Testing database connection...')
    
    // 1. Supabase 연결 테스트
    const { data: connectionTest, error: connectionError } = await supabase
      .from('users')
      .select('count(*)')
      .single()
    
    console.log('Connection test:', { connectionTest, connectionError })
    
    // 2. public.users 테이블 직접 조회
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
    
    console.log('Users query result:', { 
      usersCount: users?.length || 0, 
      users: users?.slice(0, 2), // 처음 2개만 로그
      usersError 
    })
    
    // 3. auth.users 정보 (admin API 필요)
    let authUsers = null
    let authError = null
    try {
      // 일반 클라이언트에서는 auth.admin을 사용할 수 없으므로 생략
      console.log('Auth users check skipped (requires service role)')
    } catch (e) {
      authError = e
    }
    
    // 4. 현재 세션 확인
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    console.log('Current session:', { 
      hasSession: !!session?.session,
      user: session?.session?.user?.email,
      sessionError 
    })
    
    return Response.json({
      ok: true,
      results: {
        connection: { success: !connectionError, error: connectionError },
        users: { 
          count: users?.length || 0, 
          data: users?.map(u => ({ id: u.id, email: u.email, name: u.name })),
          error: usersError 
        },
        session: { 
          authenticated: !!session?.session,
          userEmail: session?.session?.user?.email,
          error: sessionError 
        }
      }
    })
    
  } catch (error) {
    console.error('❌ Database test failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Database test failed'
    return Response.json({
      ok: false,
      error: errorMessage,
      details: error
    }, { status: 500 })
  }
}
