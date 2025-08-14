import { NextRequest } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  const session = getAdminSession()
  return Response.json({ ok: true, ...session })
}


