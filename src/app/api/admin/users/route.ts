import { getAdminUsers, supabaseAdmin } from '@/lib/supabase-admin'
import { verifyAdminRequest } from '@/lib/admin-auth'

export async function GET(req: Request) {
  const auth = verifyAdminRequest()
  if (!auth.ok) {
    return Response.json({ ok: false, error: 'UNAUTHORIZED' }, { status: 401 })
  }
  try {
    console.log('🚀 [admin:users] Fetching users with admin client...')
    const users = await getAdminUsers()
    
    console.log('📊 [admin:users] Raw users from DB:', users.length, 'users found')
    console.log('👤 [admin:users] Sample user:', users[0])
    
    // 관리자 페이지에서 사용하기 쉬운 형태로 변환
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name || 'Unknown',
      email: user.email,
      signupDate: new Date(user.created_at).toISOString().split('T')[0],
      status: user.email_verified ? 'verified' : 'pending',
      lastLogin: user.last_sign_in_at ? new Date(user.last_sign_in_at).toISOString().split('T')[0] : null
    }))

    console.log('✅ [admin:users] Formatted users:', formattedUsers.length)
    return Response.json({ ok: true, users: formattedUsers })
  } catch (err) {
    console.error('❌ [admin:users:error]', err)
    return Response.json({ ok: false, error: 'FETCH_FAILED', details: err }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const auth = verifyAdminRequest()
  if (!auth.ok) {
    return Response.json({ ok: false, error: 'UNAUTHORIZED' }, { status: 401 })
  }
  try {
    const body = await req.json().catch(() => ({})) as any
    const { id } = body || {}
    if (!id) {
      return Response.json({ ok: false, error: 'MISSING_USER_ID' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(id)
    if (error) {
      console.error('❌ [admin:users:delete]', error)
      return Response.json({ ok: false, error: error.message || 'DELETE_FAILED' }, { status: 500 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('❌ [admin:users:delete:unexpected]', err)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}
