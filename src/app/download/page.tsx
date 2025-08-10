'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Download, Monitor, Smartphone, Laptop, Computer } from 'lucide-react'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const DownloadPage = () => {
  const [activeVersion, setActiveVersion] = useState<'stable' | 'beta'>('stable')
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

  const stableVersions = {
    macSilicon: { version: '1.8.2', name: 'macOS (Apple Silicon)' },
    macIntel: { version: '1.8.2', name: 'macOS (Intel)' },
    windows: { version: '1.8.2', name: 'Windows 64-bit' }
  }

  const betaVersions = {
    macSilicon: { version: '2.0-beta.3', name: 'macOS (Apple Silicon)' },
    macIntel: { version: '2.0-beta.3', name: 'macOS (Intel)' },
    windows: { version: '2.0-beta.3', name: 'Windows 64-bit' }
  }

  const currentVersions = activeVersion === 'stable' ? stableVersions : betaVersions

  const handleDownload = (platform: string, version: string) => {
    console.log(`Downloading ${platform} - Version ${version}`)
    // 실제 다운로드 로직 구현
  }

  return (
    <div className="bg-slate-950">
      <Header />

      <main className="pt-20">
        <Container>
          <div className="relative z-10 py-20">
            {/* Header Section */}
            <div className="text-center mb-5">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-200 bg-purple-500/20 rounded-full border border-purple-400/30 mb-6">
                Desktop & Mobile
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6">
                Download Cutple.
              </h1>

              <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
                Mac, Windows에서 사용 가능합니다. Apple Silicon에 최적화되어 있습니다.
              </p>

              {/* Version Toggle */}

            </div>
            {/* Primary Download Button - Current OS */}
            {(osType === 'mac' || osType === 'windows') && (
              <div className="relative z-30 text-center mb-16 pointer-events-auto">
                <div className="inline-flex">
                  <button
                    onClick={() => handleDownload(osType, currentVersions[osType === 'mac' ? 'macSilicon' : 'windows'].version)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3.5 text-white font-semibold shadow-lg ring-2 ring-indigo-500/30 ring-offset-2 ring-offset-slate-950 transition-all hover:opacity-80 text-base sm:text-lg"
                  >
                    <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="font-semibold tracking-tight">Download for {osType === 'mac' ? 'macOS' : 'Windows'}</span>
                    <span className="ml-2 text-xs sm:text-sm text-white/80">
                      v{currentVersions[osType === 'mac' ? 'macSilicon' : 'windows'].version}
                    </span>
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  {osType === 'mac' ? 'Apple Silicon에 최적화' : 'Windows 10 이상 지원'}
                </p>
              </div>
            )}

            {/* Download showcase image (plain) */}
            <div className="relative z-10 mx-auto max-w-xl -mt-52">
              <Image
                src="/download_asset.svg"
                alt="Cutple download showcase"
                width={700}
                height={700}
                priority
                className="w-full h-auto"
              />
            </div>

            {/* Spacer below showcase */}
            <div className='mt-20 flex justify-center'>
              <div className="inline-flex  items-center justify-center bg-white/5 rounded-xl p-1 border border-white/10 mb-5">
                <button
                  onClick={() => setActiveVersion('stable')}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${activeVersion === 'stable'
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  정식 버전
                </button>
                <button
                  onClick={() => setActiveVersion('beta')}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${activeVersion === 'beta'
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  베타 버전
                </button>
              </div>
            </div>

            {/* Mac Downloads */}
            <div className="mb-16">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white">
                  Cutple for Mac {activeVersion === 'beta' && 'Beta'}
                </h2>
              </div>
              <p className="text-gray-200 mb-8">
                {activeVersion === 'stable' ? 'Apple Silicon과 Intel 모두 지원합니다.' : '최신 기능을 먼저 경험해보세요.'}
              </p>

              <div className="space-y-4">
                {/* macOS Apple Silicon */}
                <div className={`p-6 rounded-xl border transition-all hover:bg-white/5 ${osType === 'mac' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/10'
                  }`}>
                  <div className="flex items-center justify-between">
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
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Version</p>
                        <p className="text-sm font-semibold text-white">{currentVersions.macSilicon.version}</p>
                      </div>
                      <button
                        onClick={() => handleDownload('macOS Apple Silicon', currentVersions.macSilicon.version)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeVersion === 'stable'
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
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white">
                  Cutple for Windows {activeVersion === 'beta' && 'Beta'}
                </h2>
              </div>
              <p className="text-gray-200 mb-8">
                {activeVersion === 'stable' ? 'Windows 10 이상에서 사용 가능합니다.' : '최신 기능을 먼저 경험해보세요.'}
              </p>

              <div className="space-y-4">
                {/* Windows */}
                <div className={`p-6 rounded-xl border transition-all hover:bg-white/5 ${osType === 'windows' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/10'
                  }`}>
                  <div className="flex items-center justify-between">
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
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Version</p>
                        <p className="text-sm font-semibold text-white">{currentVersions.windows.version}</p>
                      </div>
                      <button
                        onClick={() => handleDownload('Windows', currentVersions.windows.version)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeVersion === 'stable'
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



            {/* Footer Note */}
            <div className="text-center mt-16 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                시스템 요구사항 및 자세한 정보는{' '}
                <a href="https://slashpage.com/cutple" className="text-purple-400 hover:text-purple-300 transition-colors">
                  문서
                </a>
                를 참고하세요.
              </p>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default DownloadPage