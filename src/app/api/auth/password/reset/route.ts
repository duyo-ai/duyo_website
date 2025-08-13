import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const { accessToken, newPassword, newEmail } = body || {}
    
    if (!accessToken || !newPassword) {
      return Response.json({ ok: false, error: 'MISSING_FIELDS' }, { status: 400 })
    }

    // Supabase에서 세션 설정
    const { data: { user }, error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: accessToken // 임시로 같은 토큰 사용
    })

    if (sessionError || !user) {
      console.error('[password-reset:session-error]', sessionError)
      return Response.json({ 
        ok: false, 
        error: 'Invalid or expired token' 
      }, { status: 400 })
    }

    // 비밀번호와 선택적으로 이메일 업데이트
    const updateData: any = { password: newPassword }
    if (newEmail) {
      updateData.email = newEmail
    }

    const { error: updateError } = await supabase.auth.updateUser(updateData)

    if (updateError) {
      console.error('[password-reset:update-error]', updateError)
      return Response.json({ 
        ok: false, 
        error: updateError.message || 'PASSWORD_UPDATE_FAILED' 
      }, { status: 400 })
    }

    return Response.json({ 
      ok: true, 
      message: 'Password updated successfully.' 
    })
  } catch (e) {
    console.error('[password-reset:unexpected]', e)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}


