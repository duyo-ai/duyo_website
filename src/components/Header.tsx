'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { AuthModal } from './AuthModal'
import { useLang } from '@/components/ToolbarProvider'
import { useAuth } from '@/components/AuthContext'
import { dictionaries } from '@/i18n/dictionary'

export function Header() {
  const { lang, setLang } = useLang()
  const { user, loading, signOut } = useAuth()
  const t = dictionaries[lang]
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
  const isDesktop = viewportWidth >= 768

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      const y = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 히스테리시스(상승/하강 임계값 분리)로 점멸 방지
          setIsScrolled(prev => (y > 80 ? true : y < 40 ? false : prev))
          // 스크롤 진행도(0~1)
          const p = Math.min(1, Math.max(0, y / 160))
          setScrollProgress(p)
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setIsMobileMenuOpen(false)
  }

  const getUserDisplayName = () => {
    if (!user) return ''
    return user.user_metadata?.name || user.email?.split('@')[0] || 'User'
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        // 데스크톱에서만 좌우/상하 여백을 보간하여 수축 효과 적용
        paddingLeft: `${isDesktop ? Math.max(0, (viewportWidth - 1280) / 2) * scrollProgress : 0}px`,
        paddingRight: `${isDesktop ? Math.max(0, (viewportWidth - 1280) / 2) * scrollProgress : 0}px`,
        paddingTop: `${isDesktop ? scrollProgress * 6 : 0}px`,
        paddingBottom: `${isDesktop ? scrollProgress * 6 : 0}px`,
        transition: 'padding 200ms ease-out',
      }}
    >
      <div className="w-full">
        <nav
          className="relative flex items-center justify-between backdrop-blur-md border border-white/10"
          style={{
            paddingLeft: `${isDesktop ? 20 - 8 * scrollProgress : 16}px`,
            paddingRight: `${isDesktop ? 20 - 8 * scrollProgress : 16}px`,
            paddingTop: `${isDesktop ? 16 + 2 * scrollProgress : 16}px`,
            paddingBottom: `${isDesktop ? 16 + 2 * scrollProgress : 16}px`,
            borderRadius: `${isDesktop ? 2 + scrollProgress * 16 : 0}px`,
            backgroundColor: `${isDesktop ? `rgba(0,0,0,${0.4 - scrollProgress * 0.2})` : 'rgba(0,0,0,0.4)'}`,
            transform: `${isDesktop ? `scale(${1 - scrollProgress * 0.02})` : 'none'}`,
            transition: 'padding 600ms ease-out, border-radius 600ms ease-out, background-color 600ms ease-out, transform 600ms ease-out',
          }}
        >
          {/* Logo */}
          <div
            className="flex-shrink-0 transform-gpu"
            style={{ transform: `translate3d(${isDesktop ? scrollProgress * 12 : 0}px, 0, 0)` }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_white.svg"
                alt="Company Logo"
                width={120}
                height={32}
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>

          {/* 내비게이션 (데스크톱) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/#features" className="text-gray-300 hover:text-white transition-colors">
              {t['nav.features']}
            </Link>
            <Link href="/#secondary-features" className="text-gray-300 hover:text-white transition-colors">
              {t['nav.solutions']}
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              {t['nav.pricing']}
            </Link>
            <Link href="/download" className="text-gray-300 hover:text-white transition-colors">
              {t['nav.download']}
            </Link>
            <Link href="https://slashpage.com/cutple" target="_blank" className="text-gray-300 hover:text-white transition-colors">
              {t['nav.docs']}
            </Link>
            {/* 개발용 관리자 링크 */}
            <Link href="/admin" className="text-orange-400 hover:text-orange-300 transition-colors text-sm">
              🔧 {lang === 'ko' ? '관리자' : 'Admin'}
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div
            className="hidden md:flex items-center gap-4 transform-gpu"
            style={{ transform: `translate3d(${-scrollProgress * 12}px, 0, 0)` }}
          >
            {/* Language Toggle */}
            <div className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 backdrop-blur px-2 py-1 text-xs text-gray-200">
              <button 
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${lang === 'ko' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`} 
                onClick={() => setLang('ko')}
              >
                KO
              </button>
              <button 
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${lang === 'en' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`} 
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            {loading ? (
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">
                  {lang === 'ko' ? `안녕하세요, ${getUserDisplayName()}님` : `Hello, ${getUserDisplayName()}`}
                </span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center rounded-2xl bg-red-200/10 backdrop-blur-md border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/20 hover:border-red-500/30 transition-all shadow-lg"
                >
                  {lang === 'ko' ? '로그아웃' : 'Logout'}
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
                >
                  {t['nav.login']}
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-3xl bg-purple-200/10 backdrop-blur-md border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all shadow-lg"
                >
                  {t['nav.getStarted']}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div
            className="md:hidden flex items-center space-x-2 transform-gpu"
            style={{ transform: 'none' }}
          >
            {/* Mobile Language Toggle */}
            <div className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 backdrop-blur px-1.5 py-1 text-xs text-gray-200">
              <button 
                className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${lang === 'ko' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`} 
                onClick={() => setLang('ko')}
              >
                KO
              </button>
              <button 
                className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${lang === 'en' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`} 
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : user ? (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-2xl bg-red-200/10 backdrop-blur-md border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/20 hover:border-red-500/30 transition-all shadow-lg"
              >
                {lang === 'ko' ? '로그아웃' : 'Logout'}
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl bg-purple-200/10 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all shadow-lg"
              >
                {t['nav.getStarted']}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-4 space-y-3">
              <Link href="/#features" className="block text-gray-300 hover:text-white transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>{t['nav.features']}</Link>
              <Link href="/#secondary-features" className="block text-gray-300 hover:text-white transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>{t['nav.solutions']}</Link>
              <Link 
                href="/pricing" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t['nav.pricing']}
              </Link>
              <Link 
                href="/download" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t['nav.download']}
              </Link>
              <Link 
                href="https://slashpage.com/cutple" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t['nav.docs']}
              </Link>
              {/* 개발용 관리자 링크 */}
              <Link 
                href="/admin" 
                className="block text-orange-400 hover:text-orange-300 transition-colors py-2 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🔧 {lang === 'ko' ? '관리자' : 'Admin'}
              </Link>
              <div className="border-t border-white/10 pt-3 mt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300 py-1">
                      {lang === 'ko' ? `안녕하세요, ${getUserDisplayName()}님` : `Hello, ${getUserDisplayName()}`}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left text-red-400 hover:text-red-300 transition-colors py-2"
                    >
                      {lang === 'ko' ? '로그아웃' : 'Logout'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
                  >
                    {t['nav.login']}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  )
}
