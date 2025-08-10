'use client'

import { ChevronRight, Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './Button'
import AnimatedLogoCloud from './Company'
import TextRotate from '../../components/farmui/RotateText'
import DashboardDemo from './DashboardShowcase'
import { AuthModal } from './AuthModal'

const HeroMod = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [osType, setOsType] = useState<'mac' | 'windows' | 'other'>('other')

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.includes('mac')) {
      setOsType('mac')
    } else if (userAgent.includes('win')) {
      setOsType('windows')
    } else {
      setOsType('other')
    }
  }, [])

  const handleDownload = () => {
    // 다운로드 페이지로 이동
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

            <h2 className="sm:mt-36 mt-10 font-semibold mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent mb-2 sm:mb-3 leading-[1.12]">

              텍스트 한
              줄로 만드는 바이럴 숏폼{' '}<br />
              <span className="bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent block mt-1 sm:mt-2">
                대본, 목소리, 이미지까지,<br className="sm:hidden" />
                클릭 몇 번으로 쉽게.
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg mx-auto max-w-xl sm:max-w-2xl text-gray-300 px-4 sm:px-0 pb-10 lg:pb-40">
              키워드를 입력하면 대본이 나오고, 목소리가 입혀지고, 이미지가 배치됩니다. <br className="hidden sm:block" />심지어 장면 간의 간격까지 AI가 조절합니다.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="font-semibold group z-50 flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-700 px-6 py-3 sm:px-8 sm:py-4 text-center text-base sm:text-lg lg:text-xl tracking-tighter text-zinc-50 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-indigo-500/70"
              >
                지금 시작하기{' '}
                <ChevronRight className="inline-flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {(osType === 'mac' || osType === 'windows') && (
                <button
                  onClick={handleDownload}
                  className="font-semibold group z-50 flex items-center justify-center gap-2 rounded-md bg-white/[0.08] backdrop-blur-md border border-white/20 px-6 py-3 sm:px-8 sm:py-4 text-center text-base sm:text-lg lg:text-xl tracking-tighter text-white hover:bg-white/[0.12] hover:border-white/30 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                  Download for {osType === 'mac' ? 'Mac' : 'Windows'}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="relative max-w-full">
          <DashboardDemo />
        </div>
        <div className="pb-20">
          <AnimatedLogoCloud />
        </div>
      </section>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
}

export default HeroMod
