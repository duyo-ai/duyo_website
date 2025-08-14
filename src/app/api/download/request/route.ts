import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const { email, platform } = body || {}

    // 이메일 형식 검증
    const isValidEmail = (v: unknown) => {
      if (typeof v !== 'string') return false
      const value = v.trim()
      if (!value || value.length > 254) return false
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      return re.test(value)
    }

    if (!isValidEmail(email)) {
      return Response.json({ ok: false, error: 'INVALID_EMAIL' }, { status: 400 })
    }

    if (!platform) {
      return Response.json({ ok: false, error: 'MISSING_PLATFORM' }, { status: 400 })
    }

    // 플랫폼 검증
    if (!['macOS', 'Windows'].includes(platform)) {
      return Response.json({ ok: false, error: 'INVALID_PLATFORM' }, { status: 400 })
    }

    // DB에 다운로드 요청 저장 (RLS 우회를 위해 admin 클라이언트 사용)
    console.log('[download-request] Attempting to save:', { email, platform })
    
    const { data, error } = await supabaseAdmin
      .from('download_requests')
      .insert([{ email: String(email).trim().toLowerCase(), platform, sent: false }])
      .select()
    
    if (error) {
      console.error('[download-request:db-error]', error)
      return Response.json({ 
        ok: false, 
        error: 'DB_SAVE_FAILED',
        details: error 
      }, { status: 500 })
    }
    
    console.log('[download-request:created]', { email, platform, id: data[0]?.id })

    return Response.json({ 
      ok: true, 
      message: 'Download request saved. Link will be sent to your email shortly.',
      request: data[0]
    })
  } catch (err) {
    console.error('[download-request:error]', err)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}
