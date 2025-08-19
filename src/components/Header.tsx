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
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )
  const isDesktop = viewportWidth >= 768

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      const y = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 히스테리시스(상승/하강 임계값 분리)로 점멸 방지
          setIsScrolled((prev) => (y > 80 ? true : y < 40 ? false : prev))
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
      className="fixed left-0 right-0 top-0 z-50"
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
          className="relative flex items-center justify-between border border-white/10 backdrop-blur-md"
          style={{
            paddingLeft: `${isDesktop ? 20 - 8 * scrollProgress : 16}px`,
            paddingRight: `${isDesktop ? 20 - 8 * scrollProgress : 16}px`,
            paddingTop: `${isDesktop ? 16 + 2 * scrollProgress : 16}px`,
            paddingBottom: `${isDesktop ? 16 + 2 * scrollProgress : 16}px`,
            borderRadius: `${isDesktop ? 2 + scrollProgress * 16 : 0}px`,
            backgroundColor: `${isDesktop ? `rgba(0,0,0,${0.4 - scrollProgress * 0.2})` : 'rgba(0,0,0,0.4)'}`,
            transform: `${isDesktop ? `scale(${1 - scrollProgress * 0.02})` : 'none'}`,
            transition:
              'padding 600ms ease-out, border-radius 600ms ease-out, background-color 600ms ease-out, transform 600ms ease-out',
          }}
        >
          {/* Logo */}
          <div
            className="flex-shrink-0 transform-gpu"
            style={{
              transform: `translate3d(${isDesktop ? scrollProgress * 12 : 0}px, 0, 0)`,
            }}
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
          <div className="hidden items-center space-x-6 md:flex">
            <Link
              href="/#features"
              className="text-gray-300 transition-colors hover:text-white"
            >
              {t['nav.features']}
            </Link>
            <Link
              href="/#secondary-features"
              className="text-gray-300 transition-colors hover:text-white"
            >
              {t['nav.solutions']}
            </Link>
            <Link
              href="/pricing"
              className="text-gray-300 transition-colors hover:text-white"
            >
              {t['nav.pricing']}
            </Link>
            <Link
              href="/download"
              className="text-gray-300 transition-colors hover:text-white"
            >
              {t['nav.download']}
            </Link>
            <Link
              href="https://docs.cutple.com"
              target="_blank"
              className="text-gray-300 transition-colors hover:text-white"
            >
              {t['nav.docs']}
            </Link>
            {/* 관리자 메뉴 제거 */}
          </div>

          {/* Desktop Auth Buttons */}
          <div
            className="hidden transform-gpu items-center gap-4 md:flex"
            style={{
              transform: `translate3d(${-scrollProgress * 12}px, 0, 0)`,
            }}
          >
            {/* Language Toggle */}
            <div className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-xs text-gray-200 backdrop-blur">
              <button
                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${lang === 'ko' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setLang('ko')}
              >
                KO
              </button>
              <button
                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${lang === 'en' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            {loading ? null : user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">
                  {lang === 'ko'
                    ? `안녕하세요, ${getUserDisplayName()}님`
                    : `Hello, ${getUserDisplayName()}`}
                </span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center rounded-2xl border border-red-500/20 bg-red-200/10 px-3 py-1.5 text-xs font-semibold text-red-300 shadow-lg backdrop-blur-md transition-all hover:border-red-500/30 hover:bg-red-500/20"
                >
                  {lang === 'ko' ? '로그아웃' : 'Logout'}
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-sm font-semibold text-gray-300 transition-colors hover:text-white"
                >
                  {t['nav.login']}
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-purple-200/10 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/20"
                >
                  {t['nav.getStarted']}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div
            className="flex transform-gpu items-center space-x-2 md:hidden"
            style={{ transform: 'none' }}
          >
            {/* Mobile Language Toggle */}
            <div className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 px-1.5 py-1 text-xs text-gray-200 backdrop-blur">
              <button
                className={`rounded px-1.5 py-0.5 text-xs font-medium transition-colors ${lang === 'ko' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setLang('ko')}
              >
                KO
              </button>
              <button
                className={`rounded px-1.5 py-0.5 text-xs font-medium transition-colors ${lang === 'en' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            {loading ? null : user ? (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-2xl border border-red-500/20 bg-red-200/10 px-3 py-1.5 text-xs font-semibold text-red-300 shadow-lg backdrop-blur-md transition-all hover:border-red-500/30 hover:bg-red-500/20"
              >
                {lang === 'ko' ? '로그아웃' : 'Logout'}
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-purple-200/10 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/20"
              >
                {t['nav.getStarted']}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
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
          <div className="mt-2 md:hidden">
            <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-md">
              <Link
                href="/#features"
                className="block py-2 text-gray-300 transition-colors hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t['nav.features']}
              </Link>
              <Link
                href="/#secondary-features"
                className="block py-2 text-gray-300 transition-colors hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t['nav.solutions']}
              </Link>
              <Link
                href="/pricing"
                className="block py-2 text-gray-300 transition-colors hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t['nav.pricing']}
              </Link>
              <Link
                href="/download"
                className="block py-2 text-gray-300 transition-colors hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t['nav.download']}
              </Link>
              <Link
                href="https://docs.cutple.com"
                className="block py-2 text-gray-300 transition-colors hover:text-white"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t['nav.docs']}
              </Link>
              {/* 개발용 관리자 링크 */}
              {/* 관리자 메뉴 제거 (모바일) */}
              <div className="mt-3 border-t border-white/10 pt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="py-1 text-sm text-gray-300">
                      {lang === 'ko'
                        ? `안녕하세요, ${getUserDisplayName()}님`
                        : `Hello, ${getUserDisplayName()}`}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full py-2 text-left text-red-400 transition-colors hover:text-red-300"
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
                    className="block w-full py-2 text-left text-gray-300 transition-colors hover:text-white"
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
