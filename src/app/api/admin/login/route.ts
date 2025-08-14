import { NextRequest } from 'next/server'
import { setAdminSession } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password } = body || {}

    const envUser = process.env.ADMIN_USERNAME
    const envPass = process.env.ADMIN_PASSWORD

    if (!envUser || !envPass) {
      return Response.json({ ok: false, error: 'SERVER_MISCONFIG', message: 'ADMIN_USERNAME/ADMIN_PASSWORD not set' }, { status: 500 })
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      return Response.json({ ok: false, error: 'INVALID_INPUT' }, { status: 400 })
    }

    if (username !== envUser || password !== envPass) {
      return Response.json({ ok: false, error: 'INVALID_CREDENTIALS' }, { status: 401 })
    }

    setAdminSession(username)
    return Response.json({ ok: true })
  } catch (error) {
    return Response.json({ ok: false, error: 'UNEXPECTED' }, { status: 500 })
  }
}


