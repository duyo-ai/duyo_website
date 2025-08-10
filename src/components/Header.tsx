'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { AuthModal } from './AuthModal'

export function Header() {
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
            transition: 'padding 200ms ease-out, border-radius 200ms ease-out, background-color 200ms ease-out, transform 200ms ease-out',
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

          {/* Navigation Items - 항상 표시 (데스크톱) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#solution" className="text-gray-300 hover:text-white transition-colors">
              Solution
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="https://slashpage.com/cutple" target="_blank" className="text-gray-300 hover:text-white transition-colors">
              Docs
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div
            className="hidden md:flex items-center gap-4 transform-gpu"
            style={{ transform: `translate3d(${-scrollProgress * 12}px, 0, 0)` }}
          >
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              로그인
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center justify-center rounded-3xl bg-purple-200/10 backdrop-blur-md border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all shadow-lg"
            >
              지금 시작하기
            </button>
          </div>

          {/* Mobile menu button */}
          <div
            className="md:hidden flex items-center space-x-2 transform-gpu"
            style={{ transform: 'none' }}
          >
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center justify-center rounded-2xl bg-purple-200/10 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all shadow-lg"
            >
              지금 시작하기
            </button>
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
              <Link 
                href="#features" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#solution" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solution
              </Link>
              <Link 
                href="#pricing" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="#about" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="https://slashpage.com/cutple" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Docs
              </Link>
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
