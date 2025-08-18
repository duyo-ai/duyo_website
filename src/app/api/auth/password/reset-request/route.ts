import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const { email, redirectTo } = body || {}
    
    if (!email) {
      return Response.json({ ok: false, error: 'MISSING_EMAIL' }, { status: 400 })
    }

    // 요청 환경을 기준으로 안전한 기본 리다이렉트 기준 URL 계산
    const forwardedProto = req.headers.get('x-forwarded-proto') || undefined
    const host = req.headers.get('host') || undefined
    const computedOrigin = (forwardedProto && host) ? `${forwardedProto}://${host}` : undefined
    const origin = req.headers.get('origin') || computedOrigin || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cutple.com'

    // 1) 해당 이메일이 소셜 전용 계정인지 확인 (email/password 미보유시 차단)
    try {
      const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers()
      if (listError) {
        console.error('[reset-request:listUsers:error]', listError)
      }
      const authUsers = (listData?.users || []) as any[]
      const found = authUsers.find((u) => String(u.email || '').toLowerCase() === String(email).toLowerCase())
      if (found) {
        const providers: string[] = Array.isArray(found?.app_metadata?.providers)
          ? found.app_metadata.providers
          : (Array.isArray(found?.identities) ? found.identities.map((i: any) => i?.provider).filter(Boolean) : [])

        const hasEmailPassword = providers.includes('email') || providers.includes('password')
        if (!hasEmailPassword) {
          const acceptLang = (req.headers.get('accept-language') || '').toLowerCase()
          const isKo = acceptLang.includes('ko')
          return Response.json({
            ok: false,
            error: isKo 
              ? '해당 계정은 Google 등 소셜 로그인 전용입니다.' 
              : 'This account uses social login (e.g., Google) only.'
          }, { status: 400 })
        }
      }
    } catch (checkError) {
      console.error('[reset-request:provider-check:error]', checkError)
      // 체크 실패 시에는 계속 진행 (침묵 복구)
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || `${origin}/auth/reset`
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


