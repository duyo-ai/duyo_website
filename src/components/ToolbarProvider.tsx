'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Lang = 'ko' | 'en'

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'ko', setLang: () => {} })
export const useLang = () => useContext(LangContext)

export default function ToolbarProvider({ children }: { children?: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko')

  useEffect(() => {
    // 개발 환경에서만 툴바 초기화
    if (process.env.NODE_ENV === 'development') {
      const initializeToolbar = async () => {
        try {
          const { initToolbar } = await import('@21st-extension/toolbar')
          const stagewiseConfig = { plugins: [] }
          initToolbar(stagewiseConfig)
        } catch {
          // ignore
        }
      }
      initializeToolbar()
    }
  }, [])

  useEffect(() => {
    try {
      const navLang = (navigator.languages?.[0] || navigator.language || 'ko').toLowerCase()
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
      const isKorean = navLang.startsWith('ko') || tz.includes('Seoul')
      const stored = typeof window !== 'undefined' ? (localStorage.getItem('cutple.lang') as Lang | null) : null
      setLang(stored || (isKorean ? 'ko' : 'en'))
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('cutple.lang', lang) } catch {}
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}