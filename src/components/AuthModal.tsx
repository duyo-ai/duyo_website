'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/components/ToolbarProvider'
import { supabase } from '@/lib/supabase'
import { dictionaries } from '@/i18n/dictionary'
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthMode = 'login' | 'signup' | 'forgot'

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { lang } = useLang()
  const t = dictionaries[lang]
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      // 모달이 닫힐 때 상태 초기화
      setError('')
      setSuccess('')
      setFieldErrors({ email: '', password: '', name: '', confirmPassword: '' })
      setMode('login')
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // 입력 시 전역 에러와 해당 필드 에러 클리어
    if (error) setError('')
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateField = (name: string, value: string) => {
    let errorMsg = ''

    switch (name) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMsg = t['auth.error.email.invalid']
        }
        break
      
      case 'name':
        if (mode === 'signup' && !value.trim()) {
          errorMsg = lang === 'ko' ? '이름을 입력해주세요.' : 'Please enter your name.'
        }
        break
      
      case 'password':
        if (mode !== 'forgot' && value) {
          if (value.length < 8) {
            errorMsg = t['auth.error.password.minLength']
          } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            errorMsg = t['auth.error.password.specialChar']
          }
        }
        break
      
      case 'confirmPassword':
        if (mode === 'signup' && value && value !== formData.password) {
          errorMsg = lang === 'ko' ? '비밀번호가 일치하지 않습니다.' : 'Passwords do not match.'
        }
        break
    }

    setFieldErrors(prev => ({
      ...prev,
      [name]: errorMsg
    }))
  }

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  // Supabase 에러를 사용자 친화적인 메시지로 변환
  const getErrorMessage = (error: any): string => {
    if (!error) return t['auth.error.unknown']
    
    const errorMessage = error.message?.toLowerCase() || ''
    
    if (errorMessage.includes('invalid login credentials') || 
        errorMessage.includes('invalid email or password')) {
      return t['auth.error.invalidCredentials']
    }
    if (errorMessage.includes('user not found') || 
        errorMessage.includes('no user found')) {
      return t['auth.error.userNotFound']
    }
    if (errorMessage.includes('email already exists') || 
        errorMessage.includes('user already registered')) {
      return t['auth.error.emailAlreadyExists']
    }
    if (errorMessage.includes('password is too weak') || 
        errorMessage.includes('weak password')) {
      return t['auth.error.weakPassword']
    }
    if (errorMessage.includes('too many requests') || 
        errorMessage.includes('rate limit')) {
      return t['auth.error.tooManyRequests']
    }
    if (errorMessage.includes('network') || 
        errorMessage.includes('fetch')) {
      return t['auth.error.networkError']
    }
    
    return t['auth.error.unknown']
  }

  const validateForm = () => {
    if (!formData.email) {
      setError(lang === 'ko' ? '이메일을 입력해주세요.' : 'Please enter your email.')
      return false
    }
    if (mode !== 'forgot' && !formData.password) {
      setError(lang === 'ko' ? '비밀번호를 입력해주세요.' : 'Please enter your password.')
      return false
    }
    if (mode === 'signup') {
      if (!formData.name) {
        setError(lang === 'ko' ? '이름을 입력해주세요.' : 'Please enter your name.')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError(lang === 'ko' ? '비밀번호가 일치하지 않습니다.' : 'Passwords do not match.')
        return false
      }
      if (formData.password.length < 8) {
        setError(lang === 'ko' ? '비밀번호는 8자 이상이어야 합니다.' : 'Password must be at least 8 characters.')
        return false
      }
      // 특수문자 포함 검증
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
      if (!specialCharRegex.test(formData.password)) {
        setError(lang === 'ko' ? '비밀번호에 특수문자가 하나 이상 포함되어야 합니다.' : 'Password must contain at least one special character.')
        return false
      }
      if (!agreeTerms) {
        setError(lang === 'ko' ? '약관에 동의해 주세요.' : 'You must agree to the terms.')
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'login') {
        // Supabase 로그인
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          setError(getErrorMessage(error))
          return
        }

        // 성공 시 모달 닫기 (인증 상태가 변경되면서 헤더도 업데이트됨)
        onClose()
      } else if (mode === 'signup') {
        // 이메일 존재/공급자 확인 선행
        try {
          const checkRes = await fetch('/api/auth/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email })
          })
          const check = await checkRes.json().catch(()=>({}))
          if (check?.ok && check.exists) {
            const providers: string[] = check.providers || []
            if (providers.includes('google')) {
              setError(lang==='ko' ? '이미 구글로 가입된 이메일입니다. 상단의 Google로 계속하기 버튼을 사용해주세요.' : 'This email is already registered with Google. Please use "Continue with Google" above.')
              return
            } else {
              setError(lang==='ko' ? '이미 가입된 이메일입니다. 로그인으로 이동해주세요.' : 'This email is already registered. Please sign in instead.')
              return
            }
          }
        } catch (_) {}

        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email, 
            password: formData.password, 
            name: formData.name, 
            redirectTo: `${window.location.origin}/auth/callback` 
          }),
        })
        const data = await response.json()
        
        if (data.ok) {
          setSuccess(lang === 'ko' ? '확인 이메일이 발송되었습니다. 이메일을 확인해주세요.' : 'Verification email sent. Please check your email.')
        } else {
          setError(data.error || (lang === 'ko' ? '회원가입에 실패했습니다.' : 'Signup failed.'))
        }
      } else if (mode === 'forgot') {
        const response = await fetch('/api/auth/password/reset-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email, 
            redirectTo: `${window.location.origin}/auth/reset` 
          }),
        })
        const data = await response.json()
        
        if (data.ok) {
          setSuccess(lang === 'ko' ? '비밀번호 재설정 이메일이 발송되었습니다.' : 'Password reset email sent.')
        } else {
          setError(data.error || (lang === 'ko' ? '비밀번호 재설정 요청에 실패했습니다.' : 'Password reset request failed.'))
        }
      }
    } catch (err) {
      setError(lang === 'ko' ? '네트워크 오류가 발생했습니다.' : 'Network error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.error('Google login error:', error)
        setError(getErrorMessage(error))
        setGoogleLoading(false)
      }
      // OAuth는 리디렉션되므로 여기서 onClose() 호출하지 않음
    } catch (error) {
      console.error('Google login error:', error)
      setError(lang === 'ko' ? 'Google 로그인에 실패했습니다.' : 'Google login failed.')
      setGoogleLoading(false)
    }
  }

  const getTitle = () => {
    switch (mode) {
      case 'login': return lang === 'ko' ? 'Cutple에 로그인' : 'Log in to Cutple'
      case 'signup': return lang === 'ko' ? 'Cutple 회원가입' : 'Create a Cutple account'
      case 'forgot': return lang === 'ko' ? '비밀번호 찾기' : 'Reset your password'
    }
  }

  const getSubtitle = () => {
    switch (mode) {
      case 'login': return lang === 'ko' ? '계정에 로그인하여 영상 제작을 시작하세요' : 'Sign in to start creating videos'
      case 'signup': return lang === 'ko' ? '새 계정을 만들어 영상 제작을 시작하세요' : 'Create an account to start creating videos'
      case 'forgot': return lang === 'ko' ? '이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다' : 'Enter your email address and we\'ll send you a password reset link'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 모달 컨테이너 */}
      <div className="relative w-full max-w-md transform transition-all">
        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 shadow-2xl">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* 헤더 */}
          <div className="mb-8 text-center">
            {mode === 'forgot' && (
                              <button
                  onClick={() => {
                    setMode('login')
                    setError('')
                    setSuccess('')
                    setFieldErrors({ email: '', password: '', name: '', confirmPassword: '' })
                  }}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm">{lang === 'ko' ? '로그인으로 돌아가기' : 'Back to login'}</span>
                </button>
            )}
            <h2 className="text-2xl font-semibold text-white mb-2">
              {getTitle()}
            </h2>
            <p className="text-gray-400 text-sm">
              {getSubtitle()}
            </p>
          </div>

          {/* 에러/성공 메시지 */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              {success}
            </div>
          )}

          {/* 구글 로그인 버튼 (비밀번호 찾기가 아닐 때만) */}
          {mode !== 'forgot' && (
            <>
              <button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-semibold mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className={`w-5 h-5 ${googleLoading ? 'opacity-60' : ''}`} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {googleLoading ? (
                  <span className="inline-flex items-center gap-2">
                    {lang === 'ko' ? '로그인 중...' : 'Signing in...'}
                  </span>
                ) : (
                  (lang === 'ko' ? 'Google로 계속하기' : 'Continue with Google')
                )}
              </button>

              {/* 구분선 */}
              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-white/10 w-full"></div>
                <span className="px-4 text-center text-gray-400 text-xs bg-black/40 whitespace-nowrap">{lang === 'ko' ? '이메일 로그인' : 'Email Login'}</span>
                <div className="border-t border-white/10 w-full"></div>
              </div>
            </>
          )}

          {/* 이메일 로그인 폼 */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder={lang === 'ko' ? '이름' : 'Name'}
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    onInvalid={(e)=> e.preventDefault()}
                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      fieldErrors.name 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-purple-500 focus:border-transparent'
                    }`}
                    required={mode === 'signup'}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-red-400 text-xs">{fieldErrors.name}</p>
                )}
              </div>
            )}

            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  placeholder={lang === 'ko' ? '이메일' : 'Email'}
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  onInvalid={(e)=> e.preventDefault()}
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/10 focus:ring-purple-500 focus:border-transparent'
                  }`}
                  required
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-400 text-xs">{fieldErrors.email}</p>
              )}
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={lang === 'ko' ? '비밀번호' : 'Password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    onInvalid={(e)=> e.preventDefault()}
                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      fieldErrors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-purple-500 focus:border-transparent'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-red-400 text-xs">{fieldErrors.password}</p>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder={lang === 'ko' ? '비밀번호 확인' : 'Confirm password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    onInvalid={(e)=> e.preventDefault()}
                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      fieldErrors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-purple-500 focus:border-transparent'
                    }`}
                    required={mode === 'signup'}
                  />
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-red-400 text-xs">{fieldErrors.confirmPassword}</p>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div className="flex items-start gap-3 text-xs text-gray-300 pt-1">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e)=> setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent"
                />
                <label htmlFor="agreeTerms" className="leading-5">
                  {lang==='ko' ? '서비스 이용약관과 개인정보 처리방침에 동의합니다.' : 'I agree to the Terms of Service and Privacy Policy.'}
                  {' '}
                  <Link href="/terms" className="underline underline-offset-2 hover:text-white">{lang==='ko' ? '이용약관' : 'Terms'}</Link>
                  {' · '}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-white">{lang==='ko' ? '개인정보 처리방침' : 'Privacy'}</Link>
                </label>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot')
                    setError('')
                    setSuccess('')
                    setFieldErrors({ email: '', password: '', name: '', confirmPassword: '' })
                  }}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {lang === 'ko' ? '비밀번호를 잊으셨나요?' : 'Forgot your password?'}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (lang === 'ko' ? '처리 중...' : 'Processing...') : (() => {
                switch (mode) {
                  case 'login': return lang === 'ko' ? '로그인' : 'Log in'
                  case 'signup': return lang === 'ko' ? '회원가입' : 'Sign up'
                  case 'forgot': return lang === 'ko' ? '재설정 링크 보내기' : 'Send reset link'
                }
              })()}
            </button>
          </form>

          {/* 모드 전환 */}
          <div className="mt-6 text-center space-y-2">
            {mode === 'login' && (
              <p className="text-gray-400 text-sm">
                {lang === 'ko' ? '계정이 없으신가요?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => {
                    setMode('signup')
                    setError('')
                    setSuccess('')
                    setFieldErrors({ email: '', password: '', name: '', confirmPassword: '' })
                  }}
                  className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  {lang === 'ko' ? '회원가입' : 'Sign up'}
                </button>
              </p>
            )}
            
            {mode === 'signup' && (
              <p className="text-gray-400 text-sm">
                {lang === 'ko' ? '이미 계정이 있으신가요?' : 'Already have an account?'}{' '}
                <button
                  onClick={() => {
                    setMode('login')
                    setError('')
                    setSuccess('')
                    setFieldErrors({ email: '', password: '', name: '', confirmPassword: '' })
                  }}
                  className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  {lang === 'ko' ? '로그인' : 'Log in'}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
