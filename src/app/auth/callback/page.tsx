'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const go = async () => {
      try {
        const { supabase } = await import('@/lib/supabase')
        // 세션이 준비되었는지만 확인하고 즉시 리다이렉트
        await supabase.auth.getSession()
      } catch (_) {
        // no-op
      } finally {
        router.replace('/')
      }
    }
    go()
  }, [router])

  // 보이지 않는 콜백 페이지 (즉시 리다이렉트)
  return null
}


