import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const email: string | undefined = body?.email
    if (!email) {
      return Response.json({ ok: false, error: 'MISSING_EMAIL' }, { status: 400 })
    }

    // Admin API로 사용자 목록 조회 후 이메일 존재 여부 확인
    const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    if (listError) {
      console.error('[check-email] listUsers error:', listError)
      return Response.json({ ok: false, error: 'QUERY_FAILED', details: (listError as any).message || String(listError) }, { status: 500 })
    }

    const users = listData?.users || []
    const user = users.find((u: any) => (u.email || '').toLowerCase() === email.toLowerCase())
    const exists = !!user
    const providers: string[] = exists
      ? (Array.isArray((user as any).identities)
          ? (user as any).identities
              .map((i: any) => i?.provider || i?.identity_provider)
              .filter(Boolean)
          : [])
      : []

    return Response.json({ ok: true, exists, providers })
  } catch (err) {
    console.error('[check-email] unexpected error:', err)
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}


