'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const [state, setState] = useState<'verifying'|'done'|'error'>('verifying')
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { supabase } = await import('@/lib/supabase')
        
        // URL에서 세션 정보 추출
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          setState('error')
          setMessage('Authentication failed. Please try again.')
          return
        }

        if (data.session) {
          setState('done')
          setMessage('Successfully authenticated! Redirecting...')
          // 2초 후 홈페이지로 리디렉션
          setTimeout(() => {
            router.push('/')
          }, 2000)
        } else {
          setState('error')
          setMessage('No session found. Please try logging in again.')
        }
      } catch (error) {
        console.error('Callback processing error:', error)
        setState('error')
        setMessage('An unexpected error occurred.')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center text-white max-w-md">
        {state === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Verifying your authentication...</p>
          </>
        )}
        {state === 'done' && (
          <>
            <div className="text-green-400 text-2xl mb-4">✓</div>
            <p className="text-green-400">{message}</p>
          </>
        )}
        {state === 'error' && (
          <>
            <div className="text-red-400 text-2xl mb-4">✗</div>
            <p className="text-red-400">{message}</p>
            <button 
              onClick={() => router.push('/')}
              className="mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              Go to Homepage
            </button>
          </>
        )}
      </div>
    </div>
  )
}


