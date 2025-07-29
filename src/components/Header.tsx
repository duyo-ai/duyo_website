'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="relative p-2 sm:p-4">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-md">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_white.svg"
                alt="Company Logo"
                width={120}
                height={32}
                className="h-6 w-auto sm:h-8"
              />
            </Link>
          </div>

          {/* Navigation Items - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
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
          </div>

          {/* Desktop Get Started Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-3xl bg-purple-200/10 backdrop-blur-md border border-white/10 px-6 py-2 text-sm font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all shadow-lg"
            >
              지금 시작하기
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-2xl bg-purple-200/10 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all shadow-lg"
            >
              지금 시작하기
            </Link>
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
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
