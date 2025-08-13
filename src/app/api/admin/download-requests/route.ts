import { getAdminDownloadRequests, updateAdminDownloadRequestStatus } from '@/lib/supabase-admin'

export async function GET(req: Request) {
  try {
    const downloadRequests = await getAdminDownloadRequests()
    
    // 관리자 페이지에서 사용하기 쉬운 형태로 변환
    const formattedRequests = downloadRequests.map(request => ({
      id: request.id,
      email: request.email,
      platform: request.platform,
      requestDate: new Date(request.created_at).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      sent: request.sent
    }))

    return Response.json({ ok: true, downloadRequests: formattedRequests })
  } catch (err) {
    console.error('[admin:download-requests:error]', err)
    return Response.json({ ok: false, error: 'FETCH_FAILED' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const { id, sent } = body || {}

    if (typeof id !== 'number' || typeof sent !== 'boolean') {
      return Response.json({ ok: false, error: 'INVALID_PARAMS' }, { status: 400 })
    }

    // 다운로드 요청 상태 업데이트
    await updateAdminDownloadRequestStatus(id, sent)
    
    console.log('[admin:update-download-status]', { id, sent, timestamp: new Date().toISOString() })
    return Response.json({ 
      ok: true, 
      message: `Download request ${sent ? 'marked as sent' : 'marked as pending'}.` 
    })
  } catch (err) {
    console.error('[admin:update-download-request:error]', err)
    return Response.json({ ok: false, error: 'UPDATE_FAILED' }, { status: 500 })
  }
}
