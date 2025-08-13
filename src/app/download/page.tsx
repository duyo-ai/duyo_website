'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Monitor, Smartphone, Laptop, Computer } from 'lucide-react'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import InstallLinkSheet from '@/components/InstallLinkSheet'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'

interface VersionInfo {
  platform: string
  version_type: string
  version_number: string
  file_name: string
  file_size: number
  file_url: string
  download_count: number
}

type GlowRingWrapperProps = {
  children: React.ReactNode
  variant?: 'primary' | 'neutral'
}

function GlowRingWrapper({ children, variant = 'neutral' }: GlowRingWrapperProps) {
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

  const ringRadius = 10
  const gapPx = 6
  const ringThicknessPx = 0.8

  const highlightGradient =
    variant === 'primary'
      ? `radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,1), rgba(99,102,241,0.9) 25%, rgba(99,102,241,0.6) 50%, rgba(255,255,255,0) 70%)`
      : `radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(212,212,216,1), rgba(228,228,231,0.9) 25%, rgba(212,212,216,0.6) 50%, rgba(255,255,255,0) 70%)`

  const baseTintGradient =
    variant === 'primary'
      ? 'linear-gradient(0deg, rgba(99,102,241,0.3), rgba(99,102,241,0.3))'
      : 'linear-gradient(0deg, rgba(212,212,216,0.2), rgba(212,212,216,0.2))'

  const hoverSolidGradient =
    variant === 'primary'
      ? 'linear-gradient(0deg, rgba(99,102,241,0.9), rgba(99,102,241,0.9))'
      : 'linear-gradient(0deg, rgba(212,212,216,0.9), rgba(212,212,216,0.9))'

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex"
      style={{ borderRadius: `${ringRadius}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base ring */}
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
      {/* Hover overlay ring */}
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

const DownloadPage = () => {
  const { lang } = useLang()
  const t = dictionaries[lang]
  const [activeVersion, setActiveVersion] = useState<'stable' | 'beta'>('stable')
  const [osType, setOsType] = useState<'mac' | 'windows' | 'other'>('other')
  const [isMobile, setIsMobile] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)
  const [versions, setVersions] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  // 버전 정보 로드
  useEffect(() => {
    const loadVersions = async () => {
      try {
        const response = await fetch('/api/versions')
        const data = await response.json()
        if (data.ok) {
          setVersions(data.versions)
        } else {
          console.error('Failed to load versions:', data.error)
        }
      } catch (error) {
        console.error('Error loading versions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadVersions()
  }, [])

  // 실제 DB에서 가져온 버전 정보 사용
  const getVersionInfo = (platform: 'macOS' | 'Windows', type: 'stable' | 'beta') => {
    if (!versions) return null
    return versions[platform]?.[type]
  }

  const handleDownload = (platform: 'macOS' | 'Windows', type: 'stable' | 'beta') => {
    const versionInfo = getVersionInfo(platform, type)
    if (versionInfo && versionInfo.file_url) {
      // 다운로드 카운트 업데이트 (옵션)
      fetch('/api/download/count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, version_type: type })
      }).catch(console.error)

      // 실제 파일 다운로드
      window.open(versionInfo.file_url, '_blank')
    } else {
      alert('다운로드 링크를 찾을 수 없습니다.')
    }
  }

  const handleDownloadClick = (platform: string, version: string) => {
    if (isMobile) {
      setOpenSheet(true)
      return
    }
    
    // 플랫폼 이름 매핑
    const platformMap: { [key: string]: 'macOS' | 'Windows' } = {
      'macOS (Apple Silicon)': 'macOS',
      'macOS (Intel)': 'macOS', 
      'Windows 64-bit': 'Windows'
    }
    
    const mappedPlatform = platformMap[platform]
    if (mappedPlatform) {
      handleDownload(mappedPlatform, activeVersion)
    }
  }

  // Spotlight는 부모 요소에 hover/move 이벤트를 자체 바인딩합니다.

  return (
    <div className="bg-slate-950">
      <Header />

      <main className="pt-20">
        <Container>
          <div className="relative z-10 py-20">
            {/* Header Section */}
            <div className="text-center mb-5">
              <div className="relative z-10 mx-auto max-w-xs sm:max-w-[500px] -mt-20 sm:-mt-36 sm:-mb-14 -mb-10">
                <Image
                  src="/download_asset.svg"
                  alt="Cutple download showcase"
                  width={700}
                  height={700}
                  priority
                  className="w-full h-auto"
                />
              </div>


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-5">
                {t['download.title']}
              </h1>
              {/* Version Toggle */}
            </div>
            {/* Primary Download Button - Current OS */}
            {(osType === 'mac' || osType === 'windows') && (
              <div className="relative z-30 text-center mb-16 pointer-events-auto">
                <div className="inline-flex flex-row flex-nowrap">
                  <GlowRingWrapper variant="neutral">
                    <button
                      onClick={() => handleDownloadClick(osType === 'mac' ? 'macOS (Apple Silicon)' : 'Windows 64-bit', getVersionInfo(osType === 'mac' ? 'macOS' : 'Windows', activeVersion)?.version_number || '')}
                      className='relative inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md bg-white dark:bg-black px-5 py-2.5 sm:px-4 sm:py-3.5 text-black dark:text-white font-semibold text-sm sm:text-lg'
                    >
                      {osType === 'mac' ? (
                        <svg className="h-5 w-5 sm:h-6 sm:w-6 text-black dark:text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 sm:h-6 sm:w-6 text-black dark:text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801" />
                        </svg>
                      )}
                      <span className="font-semibold tracking-tight">Download for {osType === 'mac' ? 'macOS' : 'Windows'}</span>
                       <span className="text-xs sm:text-sm opacity-70">
                        {loading ? 'v...' : `v${getVersionInfo(osType === 'mac' ? 'macOS' : 'Windows', activeVersion)?.version_number || 'N/A'}`}
                      </span>
                    </button>
                  </GlowRingWrapper>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  {osType === 'mac' ? t['download.mac.optimized'] : t['download.windows.support']}
                </p>

              </div>

            )}

            {/* Download showcase image (plain) */}


            {/* Version toggle (smaller, left-aligned) */}
            <div className='mt-20 sm:mt-12 flex justify-start'>
              <div className="inline-flex items-center justify-center bg-white/5 rounded-lg p-0.5 border border-white/10 mb-5 sm:mb-8">
                <button
                  onClick={() => setActiveVersion('stable')}
                  className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors ${activeVersion === 'stable'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white'
                    }`}
                  aria-pressed={activeVersion === 'stable'}
                >
                  {t['download.toggle.stable']}
                </button>
                <button
                  onClick={() => setActiveVersion('beta')}
                  className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors ${activeVersion === 'beta'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white'
                    }`}
                  aria-pressed={activeVersion === 'beta'}
                >
                  {t['download.toggle.beta']}
                </button>
              </div>
            </div>

            {/* 사용자 OS에 따른 다운로드 섹션 순서 변경 */}
            {osType === 'mac' ? (
              <>
                {/* Mac Downloads - 우선 표시 */}
                <div className="mb-16">
                  <div className="sm:mb-8 mb-4">
                    <h2 className="text-2xl font-semibold text-white">
                      {activeVersion === 'stable' ? t['download.mac.title'] : t['download.mac.beta']}
                    </h2>
                  </div>
                  <p className="text-gray-200 mb-4">
                    {activeVersion === 'stable' ? t['download.mac.desc.stable'] : t['download.mac.desc.beta']}
                  </p>

                  <div className="space-y-4">
                    {/* macOS Apple Silicon */}
                    <div className="p-4 sm:p-5 md:p-6 rounded-xl border transition-all hover:bg-white/5 bg-purple-500/10 border-purple-500/30">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                            <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-white">macOS</h3>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-md ${activeVersion === 'stable'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-orange-500/20 text-orange-300'
                                }`}>
                                {activeVersion === 'stable' ? 'Apple Silicon' : 'Beta • Apple Silicon'}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">macOS 11.0 이상</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full md:w-auto">
                          <div className="text-left md:text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Version</p>
                            <p className="text-sm font-semibold text-white">
                              {loading ? '로딩 중...' : getVersionInfo('macOS', activeVersion)?.version_number || 'N/A'}
                            </p>
                          </div>
                           <button
                             onClick={() => handleDownloadClick('macOS (Apple Silicon)', getVersionInfo('macOS', activeVersion)?.version_number || '')}
                            className={`w-full md:w-auto px-6 py-2 rounded-lg font-semibold transition-all ${activeVersion === 'stable'
                              ? 'bg-white text-gray-900 hover:bg-gray-100'
                              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                              }`}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Windows Downloads */}
                <div className="mb-16">
                  <div className="sm:mb-8 mb-4">
                    <h2 className="text-2xl font-semibold text-white">
                      {activeVersion === 'stable' ? t['download.windows.title'] : t['download.windows.beta']}
                    </h2>
                  </div>
                  <p className="text-gray-200 mb-4">
                    {activeVersion === 'stable' ? t['download.windows.desc.stable'] : t['download.windows.desc.beta']}
                  </p>

                  <div className="space-y-4">
                    {/* Windows */}
                    <div className="p-4 sm:p-5 md:p-6 rounded-xl border transition-all hover:bg-white/5 bg-white/5 border-white/10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                            <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-white">Windows</h3>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-md ${activeVersion === 'stable'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-orange-500/20 text-orange-300'
                                }`}>
                                {activeVersion === 'stable' ? '64-bit' : 'Beta • 64-bit'}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">Windows 10 이상</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full md:w-auto">
                          <div className="text-left md:text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Version</p>
                            <p className="text-sm font-semibold text-white">
                              {loading ? '로딩 중...' : getVersionInfo('Windows', activeVersion)?.version_number || 'N/A'}
                            </p>
                          </div>
                           <button
                             onClick={() => handleDownloadClick('Windows 64-bit', getVersionInfo('Windows', activeVersion)?.version_number || '')}
                            className={`w-full md:w-auto px-6 py-2 rounded-lg font-semibold transition-all ${activeVersion === 'stable'
                              ? 'bg-white text-gray-900 hover:bg-gray-100'
                              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                              }`}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Windows Downloads - 우선 표시 */}
                <div className="mb-16">
                  <div className="sm:mb-8 mb-4">
                    <h2 className="text-2xl font-semibold text-white">
                      {activeVersion === 'stable' ? t['download.windows.title'] : t['download.windows.beta']}
                    </h2>
                  </div>
                  <p className="text-gray-200 mb-4">
                    {activeVersion === 'stable' ? t['download.windows.desc.stable'] : t['download.windows.desc.beta']}
                  </p>

                  <div className="space-y-4">
                    {/* Windows */}
                    <div className={`p-4 sm:p-5 md:p-6 rounded-xl border transition-all hover:bg-white/5 ${osType === 'windows' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/10'}`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                            <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-white">Windows</h3>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-md ${activeVersion === 'stable'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-orange-500/20 text-orange-300'
                                }`}>
                                {activeVersion === 'stable' ? '64-bit' : 'Beta • 64-bit'}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">Windows 10 이상</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full md:w-auto">
                          <div className="text-left md:text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Version</p>
                            <p className="text-sm font-semibold text-white">
                              {loading ? '로딩 중...' : getVersionInfo('Windows', activeVersion)?.version_number || 'N/A'}
                            </p>
                          </div>
                           <button
                             onClick={() => handleDownloadClick('Windows 64-bit', getVersionInfo('Windows', activeVersion)?.version_number || '')}
                            className={`w-full md:w-auto px-6 py-2 rounded-lg font-semibold transition-all ${activeVersion === 'stable'
                              ? 'bg-white text-gray-900 hover:bg-gray-100'
                              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                              }`}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mac Downloads */}
                <div className="mb-16">
                  <div className="sm:mb-8 mb-4">
                    <h2 className="text-2xl font-semibold text-white">
                      {activeVersion === 'stable' ? t['download.mac.title'] : t['download.mac.beta']}
                    </h2>
                  </div>
                  <p className="text-gray-200 mb-4">
                    {activeVersion === 'stable' ? t['download.mac.desc.stable'] : t['download.mac.desc.beta']}
                  </p>

                  <div className="space-y-4">
                    {/* macOS Apple Silicon */}
                    <div className="p-4 sm:p-5 md:p-6 rounded-xl border transition-all hover:bg-white/5 bg-white/5 border-white/10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                            <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-white">macOS</h3>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-md ${activeVersion === 'stable'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-orange-500/20 text-orange-300'
                                }`}>
                                {activeVersion === 'stable' ? 'Apple Silicon' : 'Beta • Apple Silicon'}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">macOS 11.0 이상</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full md:w-auto">
                          <div className="text-left md:text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Version</p>
                            <p className="text-sm font-semibold text-white">
                              {loading ? '로딩 중...' : getVersionInfo('macOS', activeVersion)?.version_number || 'N/A'}
                            </p>
                          </div>
                           <button
                             onClick={() => handleDownloadClick('macOS (Apple Silicon)', getVersionInfo('macOS', activeVersion)?.version_number || '')}
                            className={`w-full md:w-auto px-6 py-2 rounded-lg font-semibold transition-all ${activeVersion === 'stable'
                              ? 'bg-white text-gray-900 hover:bg-gray-100'
                              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                              }`}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}



            {/* Footer Note */}
            <div className="text-center mt-16 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                {t['download.footer.note']}{' '}
                <a href="https://slashpage.com/cutple" className="text-purple-400 hover:text-purple-300 transition-colors">
                  {t['download.footer.docs']}
                </a>
                {t['download.footer.reference']}
              </p>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
      <InstallLinkSheet open={openSheet} onClose={() => setOpenSheet(false)} />
    </div>
  )
}

export default DownloadPage