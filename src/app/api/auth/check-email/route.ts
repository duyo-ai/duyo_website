import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const email: string | undefined = body?.email
    if (!email) {
      return Response.json({ ok: false, error: 'MISSING_EMAIL' }, { status: 400 })
    }

    // 우선 auth.users를 직접 조회 (service role이므로 허용)
    const { data, error } = await supabaseAdmin
      .from('auth.users')
      .select('id, email, identities')
      .eq('email', email)
      .limit(1)

    if (error) {
      console.error('[check-email] auth.users query error:', error)
      return Response.json({ ok: false, error: 'QUERY_FAILED', details: error.message }, { status: 500 })
    }

    const exists = !!(data && data.length > 0)
    let providers: string[] = []
    if (exists) {
      try {
        const identities = (data![0] as any).identities as any[] | null
        if (Array.isArray(identities)) {
          providers = identities.map((i: any) => i?.provider || i?.identity_provider).filter(Boolean)
        }
      } catch (_) {}
    }

    return Response.json({ ok: true, exists, providers })
  } catch (err) {
    console.error('[check-email] unexpected error:', err)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}


