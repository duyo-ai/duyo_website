import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const { email, password, name, redirectTo } = body || {}

    if (!email || !password) {
      return Response.json({ ok: false, error: 'MISSING_FIELDS' }, { status: 400 })
    }

    // Supabase 회원가입
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

    return Response.json({ 
      ok: true, 
      message: 'Verification email sent. Please check your email.',
      user: data.user 
    })
  } catch (err) {
    console.error('[signup:unexpected]', err)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}


