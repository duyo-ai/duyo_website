'use client'

import { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'

type Props = {
  open: boolean
  onClose: () => void
}

export default function InstallLinkSheet({ open, onClose }: Props) {
  const { lang } = useLang()
  const t = dictionaries[lang]
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
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
    await new Promise(r => setTimeout(r, 800))
    setSending(false)
    setSent(true)
    // 실제 이메일 발송 API 연동 지점
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
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white/20 text-gray-900 hover:bg-white/80 disabled:opacity-50"
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
    </div>
  )
}


