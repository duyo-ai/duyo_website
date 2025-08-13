import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const { email, redirectTo } = body || {}
    
    if (!email) {
      return Response.json({ ok: false, error: 'MISSING_EMAIL' }, { status: 400 })
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://duyo-website.vercel.app'}/auth/reset`
    })

    if (error) {
      console.error('[reset-request:error]', error)
      return Response.json({ 
        ok: false, 
        error: error.message || 'RESET_REQUEST_FAILED' 
      }, { status: 400 })
    }

    return Response.json({ 
      ok: true, 
      message: 'Password reset email sent. Please check your email.' 
    })
  } catch (e) {
    console.error('[reset-request:unexpected]', e)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}


