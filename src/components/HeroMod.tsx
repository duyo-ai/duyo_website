'use client'

import { ChevronRight, Download } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from './Button'

import TextRotate from '../../components/farmui/RotateText'
import DashboardDemo from './DashboardShowcase'
import { AuthModal } from './AuthModal'
import InstallLinkSheet from '@/components/InstallLinkSheet'
import { useLang } from './ToolbarProvider'
import { useAuth } from './AuthContext'
import { dictionaries } from '@/i18n/dictionary'

type GlowRingWrapperProps = {
  children: React.ReactNode
  variant?: 'primary' | 'neutral'
}

function GlowRingWrapper({ children, variant = 'primary' }: GlowRingWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const targetXRef = useRef<number>(0)
  const targetYRef = useRef<number>(0)
  const currentXRef = useRef<number>(0)
  const currentYRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    // 초기값: 중앙
    const rect = el.getBoundingClientRect()
    targetXRef.current = rect.width / 2
    targetYRef.current = rect.height / 2
    currentXRef.current = targetXRef.current
    currentYRef.current = targetYRef.current
    el.style.setProperty('--mx', `${currentXRef.current}px`)
    el.style.setProperty('--my', `${currentYRef.current}px`)

    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      // 마우스 추적 범위를 확장하여 더 먼 거리에서도 작동
      const centerX = r.left + r.width / 2
      const centerY = r.top + r.height / 2
      const mouseX = e.clientX
      const mouseY = e.clientY
      
      // 버튼 중심에서 최대 800px까지 영향 받음 - 매우 넓은 범위
      const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2))
      const maxDistance = 800
      
      if (distance <= maxDistance) {
        targetXRef.current = e.clientX - r.left
        targetYRef.current = e.clientY - r.top
      }
    }

    const smoothFollow = () => {
      const lerp = 0.2 // 매우 부드러운 딜레이 (작을수록 더 느림)
      const nx = currentXRef.current + (targetXRef.current - currentXRef.current) * lerp
      const ny = currentYRef.current + (targetYRef.current - currentYRef.current) * lerp
      currentXRef.current = nx
      currentYRef.current = ny
      el.style.setProperty('--mx', `${nx.toFixed(2)}px`)
      el.style.setProperty('--my', `${ny.toFixed(2)}px`)
      rafRef.current = requestAnimationFrame(smoothFollow)
    }

    rafRef.current = requestAnimationFrame(smoothFollow)
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const ringRadius = 10 // px rounded radius for smoother corners
  const gapPx = 6 // visual gap between ring and button
  const ringThicknessPx = 0.8 // slightly thicker ring

  const highlightGradient =
    variant === 'primary'
      ? `radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,1), rgba(99,102,241,0.9) 25%, rgba(99,102,241,0.6) 50%, rgba(255,255,255,0) 70%)` // much stronger glow
      : `radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(212,212,216,1), rgba(228,228,231,0.9) 25%, rgba(212,212,216,0.6) 50%, rgba(255,255,255,0) 70%)`

  const baseTintGradient =
    variant === 'primary'
      ? 'linear-gradient(0deg, rgba(99,102,241,0.45), rgba(99,102,241,0.45))' // solid indigo tone
      : 'linear-gradient(90deg, rgba(212,212,216,0.35), rgba(228,228,231,0.35))'

  const hoverSolidGradient =
    variant === 'primary'
      ? 'linear-gradient(0deg, rgba(99,102,241,0.95), rgba(99,102,241,0.95))'
      : 'linear-gradient(0deg, rgba(212,212,216,0.95), rgba(212,212,216,0.95))'

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex"
      style={{ borderRadius: `${ringRadius}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base ring (static) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: `${ringRadius}px`,
          padding: `${ringThicknessPx}px`,
          backgroundImage: [highlightGradient, baseTintGradient].join(', '),
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Hover overlay ring (fades in/out) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: `${ringRadius}px`,
          padding: `${ringThicknessPx}px`,
          backgroundImage: hoverSolidGradient,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Gap spacer to keep ring detached from button */}
      <div
        className="relative z-10"
        style={{
          borderRadius: `${ringRadius - 2}px`,
          margin: `${gapPx}px`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

const HeroMod = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [osType, setOsType] = useState<'mac' | 'windows' | 'other'>('other')
  const { lang } = useLang()
  const { user, loading } = useAuth()
  const t = dictionaries[lang]
  const [isMobile, setIsMobile] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  // OS 타입은 UA로 한번만 판단
  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.includes('mac') && !/iphone|ipad|ipod/.test(ua)) {
      setOsType('mac')
    } else if (ua.includes('win')) {
      setOsType('windows')
    } else {
      setOsType('other')
    }
  }, [])

  // 모바일 여부는 뷰포트 폭 기준(md < 768px)
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleDownload = () => {
    if (isMobile) {
      setOpenSheet(true)
      return
    }
    window.location.href = '/download'
  }
  return (
    <>
      <section className="min-h-screen w-full relative mb-0">
        {/* Top hero-only gradient (doesn't stick on scroll) */}
        <div className="pointer-events-none absolute inset-x-0 -top-10 h-[70vh] -z-10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(106,20,255,0.2),rgba(255,255,255,0))]" />
        {/* Bottom rising blue glow (hero only) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[120vh] -z-10 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,160,255,0.3),transparent)]" />
        {/* Grid background removed */}

        <div className="relative z-10 mx-auto max-w-screen-xl gap-6 px-4 py-6 sm:py-10 text-gray-600 md:px-8">
          <div className="leading-0 mx-auto max-w-6xl space-y-2 sm:space-y-3 px-4 sm:px-6 lg:px-10 text-center lg:leading-5">

            <h2 className="sm:mt-28 mt-20 font-extrabold mx-auto bg-white bg-clip-text text-3xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent mb-2 sm:mb-3 leading-[1.15] ">
              {lang==='en' ? 'Make viral shorts from a single line' : '텍스트 한 줄로 만드는 바이럴 숏폼'}{' '}<br />
              <span className="bg-white bg-clip-text text-transparent block mt-5 sm:mt-9">
                {lang==='en' ? 'Script, voice, and images in a few clicks.' : '대본, 목소리, 이미지까지,'}<br className="sm:hidden" />
                {lang==='en' ? 'Even scene spacing auto-optimized.' : ' 클릭 몇 번으로 쉽게.'}
              </span>
            </h2>

            <p className="pt-10 sm:pt-18 text-sm sm:text-base md:text-lg mx-auto max-w-[32rem] sm:max-w-2xl text-gray-500 px-4 sm:px-0 break-keep">
              {lang==='en' ? 'Type keywords to get a script; AI voice and images are laid out. ' : '키워드를 입력하면 대본이 나오고, 목소리가 입혀지고, 이미지가 배치됩니다. '}
              <br className="hidden sm:block" />
              {lang==='en' ? 'Even scene spacing is optimized by AI.' : '심지어 장면 간의 간격까지 AI가 조절합니다.'}
            </p>
            
            <div className="flex pt-10 lg:pt-16 flex-row flex-nowrap items-center justify-center gap-5 sm:gap-9 px-3">
              {/* Primary CTA with glow ring wrapper - 로딩 중이거나 로그인 안된 경우만 표시 */}
              {!loading && !user && (
                <GlowRingWrapper variant="primary">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="font-semibold whitespace-nowrap group z-10 relative flex items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,#6A14FF_0%,#00A0FF_100%)] px-4 py-2 text-sm sm:px-8 sm:py-4 text-center sm:text-lg lg:text-xl tracking-tighter text-zinc-50"
                  >
                    {lang === 'ko' ? '지금 시작하기' : 'Get started'}{' '}
                    <ChevronRight className="inline-flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </GlowRingWrapper>
              )}
              
              {/* 로딩 중에는 아무것도 표시하지 않음 (플레이스홀더 제거) */}

              {(osType === 'mac' || osType === 'windows') && (
               <GlowRingWrapper variant="neutral">
                  <button
                    onClick={handleDownload}
                    className="font-semibold whitespace-nowrap group z-10 relative flex items-center justify-center gap-2 rounded-md bg-white text-gray-900 px-4 py-2 text-sm sm:px-8 sm:py-4 text-center sm:text-lg lg:text-xl tracking-tighter transition-colors hover:bg-gray-100"
                  >
                    {osType === 'mac' ? (
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801" />
                      </svg>
                    )}
                    Download for {osType === 'mac' ? 'macOS' : 'Windows'}
                  </button>
                 </GlowRingWrapper>
              )}
            </div>
          </div>
        </div>
        <div className="relative mt-10 sm:mt-24 max-w-full">
          <DashboardDemo />
        </div>

      </section>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      <InstallLinkSheet open={openSheet} onClose={() => setOpenSheet(false)} />
    </>
  )
}

export default HeroMod
