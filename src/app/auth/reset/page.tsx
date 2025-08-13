'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PasswordResetPage() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [validToken, setValidToken] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // URL에서 토큰 확인
    const hash = window.location.hash.replace(/^#/, '')
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    
    if (!accessToken || !refreshToken) {
      setValidToken(false)
      setError('Invalid or expired reset link. Please request a new password reset.')
    }
  }, [])

  const submit = async () => {
    setError('')
    
    // 클라이언트 측 검증
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('Password must contain at least one special character')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setSubmitting(true)
    try {
      const { supabase } = await import('@/lib/supabase')
      
      // 비밀번호 업데이트
      const updateData: any = { password }
      if (email) {
        updateData.email = email
      }

      const { error } = await supabase.auth.updateUser(updateData)

      if (error) {
        setError(error.message || 'Failed to update password')
        return
      }

      setDone(true)
      
      // 3초 후 홈페이지로 리디렉션
      setTimeout(() => {
        router.push('/')
      }, 3000)
      
    } catch (error) {
      console.error('Password reset error:', error)
      setError('An unexpected error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  if (!validToken) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center text-white max-w-md">
          <div className="text-red-400 text-2xl mb-4">✗</div>
          <h1 className="text-2xl font-bold mb-4 text-red-400">Reset Link Invalid</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 px-6 py-10 text-center text-white max-w-md">
          <div className="text-green-400 text-2xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-4 text-green-400">Password Reset Successful</h1>
          <p className="text-gray-300 mb-4">Your password has been updated. You can now log in with your new password.</p>
          <p className="text-sm text-gray-400">Redirecting to homepage...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6 text-white">
        <h1 className="text-xl font-semibold mb-4">Reset password</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <div>
            <input 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              type="password" 
              placeholder="New password" 
              className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2" 
            />
            <p className="text-xs text-gray-400 mt-1">At least 8 characters with one special character</p>
          </div>
          
          <input 
            value={confirmPassword} 
            onChange={e=>setConfirmPassword(e.target.value)} 
            type="password" 
            placeholder="Confirm new password" 
            className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2" 
          />
          
          <div>
            <input 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              type="email" 
              placeholder="(Optional) Change email" 
              className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2" 
            />
            <p className="text-xs text-gray-400 mt-1">Leave empty to keep current email</p>
          </div>
          
          <button 
            onClick={submit} 
            disabled={submitting || !password || !confirmPassword} 
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 font-semibold transition-all"
          >
            {submitting ? 'Processing...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  )
}


