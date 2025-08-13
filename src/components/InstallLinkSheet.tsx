'use client'

import { useEffect, useState } from 'react'
import { Send, Check, X } from 'lucide-react'
import { useLang } from '@/components/ToolbarProvider'
import { useAuth } from '@/components/AuthContext'
import { dictionaries } from '@/i18n/dictionary'

type Props = {
  open: boolean
  onClose: () => void
}

export default function InstallLinkSheet({ open, onClose }: Props) {
  const { lang } = useLang()
  const { user } = useAuth()
  const t = dictionaries[lang]
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // 로그인된 사용자의 이메일을 자동으로 설정
  useEffect(() => {
    if (user?.email && open) {
      setEmail(user.email)
    }
  }, [user, open])
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (!open) {
      setEmail('')
      setSending(false)
      setSent(false)
      setAnimateIn(false)
      return
    }
    document.body.style.overflow = 'hidden'
    // slight delay to trigger CSS transition
    const id = requestAnimationFrame(() => setAnimateIn(true))
    return () => {
      document.body.style.overflow = 'unset'
      cancelAnimationFrame(id)
    }
  }, [open])

  if (!open) return null

  const handleDismiss = () => {
    setAnimateIn(false)
    setTimeout(() => onClose(), 250)
  }

  const submit = async () => {
    if (!email) return
    setSending(true)
    
    try {
      // 다운로드 링크 요청 API 호출
      const response = await fetch('/api/download/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          platform: 'macOS' // 기본값, 나중에 플랫폼 감지로 개선 가능
        }),
      })
      
      const data = await response.json()
      if (data.ok) {
        setSent(true)
        setShowToast(true)
        // 토스트 메시지 3초 후 자동 숨김
        setTimeout(() => {
          setShowToast(false)
          // 토스트 사라진 후 1초 뒤 모달 닫기
          setTimeout(() => {
            onClose()
          }, 1000)
        }, 3000)
      } else {
        console.error('Failed to send download link:', data.error)
        alert(lang === 'ko' ? '다운로드 요청에 실패했습니다.' : 'Failed to request download link.')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert(lang === 'ko' ? '네트워크 오류가 발생했습니다.' : 'Network error occurred.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[70]">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={handleDismiss} />

      {/* bottom sheet */}
      <div className="absolute inset-x-0 bottom-0">
        <div className={`mx-auto max-w-xl rounded-t-2xl border border-white/10 backdrop-blur-xl p-8 pb-14 shadow-2xl transform-gpu transition-transform duration-300 ease-out ${animateIn ? 'translate-y-0' : 'translate-y-full'} bg-[rgba(10,10,14,0.94)]`}>
          <div>
            <h3 className="text-2xl font-semibold text-white">{t['install.title']}</h3>
            <p className="text-gray-300 text-sm mt-2">{t['install.subtitle.1']}</p>
            <p className="text-gray-400 text-sm">{t['install.subtitle.2']}</p>
          </div>

          <div className="mt-7 pb-8 sm:pb-10">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t['install.placeholder.email']}
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={submit}
                disabled={sending || !email}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white text-gray-900 hover:bg-white disabled:opacity-50"
                aria-label="send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {sent && (
              <p className="mt-2 text-sm text-green-300">{t['install.toast.sent']}</p>
            )}
          </div>
        </div>
      </div>

      {/* 토스트 메시지 */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[80] animate-in slide-in-from-top-4 duration-300">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Check className="h-5 w-5" />
            <span className="font-medium">
              {lang === 'ko' ? '다운로드 링크 요청이 전송되었습니다!' : 'Download link request sent successfully!'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}


