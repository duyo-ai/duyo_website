import { NextRequest } from 'next/server'
import { clearAdminSession } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  clearAdminSession()
  return Response.json({ ok: true })
}


