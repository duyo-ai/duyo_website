import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const { email, password, name, redirectTo } = body || {}

    if (!email || !password) {
      return Response.json({ ok: false, error: 'MISSING_FIELDS' }, { status: 400 })
    }

    // 1) 이미 가입된 이메일인지 선조회 (관리자 권한)
    const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    if (listError) {
      console.error('[signup:precheck:listUsers:error]', listError)
    }
    const exists = (listData?.users || []).some((u: any) => (u.email || '').toLowerCase() === String(email).toLowerCase())
    if (exists) {
      return Response.json({ ok: false, error: 'EMAIL_ALREADY_EXISTS' }, { status: 400 })
    }

    // 2) Supabase 회원가입 (인증 메일 전송)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          name: name || ''
        }
      }
    })

    if (error) {
      console.error('[signup:error]', error)
      return Response.json({ 
        ok: false, 
        error: error.message || 'SIGNUP_FAILED' 
      }, { status: 400 })
    }

    return Response.json({ ok: true, message: 'VERIFICATION_EMAIL_SENT', user: data.user })
  } catch (err) {
    console.error('[signup:unexpected]', err)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}


