'use client'

import Image from 'next/image'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'

type Props = {
  open: boolean
  os: 'mac' | 'windows'
  onClose: () => void
}

export default function InstallGuideModal({ open, os, onClose }: Props) {
  const helpUrl = process.env.NEXT_PUBLIC_RUN_HELP_URL || 'https://slashpage.com/cutple'
  const { lang } = useLang()
  const t = dictionaries[lang]

  if (!open) return null

  const steps = os === 'windows'
    ? [
        { title: lang==='ko' ? '1. 다운로드된 파일을 실행합니다.' : '1. Run the downloaded file.', img: '/download_guide/window_1.png' },
        { title: lang==='ko' ? '2. Windows의 PC 보호 창이 뜨면, 추가 정보를 클릭합니다.' : '2. If “Windows protected your PC” appears, click “More info”.', img: '/download_guide/window_2.png' },
        { title: lang==='ko' ? '3. 실행 버튼을 눌러서 프로그램을 설치합니다.' : '3. Click “Run anyway” to install.', img: '/download_guide/window_3.png' },
      ]
    : [
        { title: lang==='ko' ? '1. 다운로드된 파일을 실행합니다.' : '1. Open the downloaded file.', img: '/download_guide/mac_1.png' },
        { title: lang==='ko' ? '2. 해당 창이 뜨면 드래그하여 Applications로 이동합니다.' : '2. Drag the app icon to Applications.', img: '/download_guide/mac_2.png' },
        { title: lang==='ko' ? '3. Cutple 앱을 실행합니다.' : '3. Launch the Cutple app.', img: '/download_guide/mac_3.png' },
      ]

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="relative mx-auto max-w-7xl w-full">
        <div className="rounded-2xl border border-white/10 bg-[#0b0b10] p-10 sm:p-12 shadow-2xl">
          <div className="mb-8 text-center">
            <h3 className="text-white text-3xl sm:text-4xl font-semibold">
              {os === 'windows' ? (lang==='ko' ? 'Windows 설치 안내' : 'Windows Installation Guide') : (lang==='ko' ? 'macOS 설치 안내' : 'macOS Installation Guide')}
            </h3>
          </div>

          <ol className="grid grid-cols-3 gap-6 sm:gap-8">
            {steps.map((s, idx) => (
              <li key={idx} className="flex flex-col">
                <div className="break-keep text-gray-100 text-base sm:text-lg font-medium mb-3 min-h-[56px] sm:min-h-[64px] md:min-h-[72px] flex items-start">
                  {s.title}
                </div>
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-black/20">
                  <Image src={s.img} alt={s.title} fill className="object-contain object-center p-2 sm:p-3" />
                </div>
              </li>
            ))}
          </ol>

          <div className="text-center">
            <a
              href={helpUrl as string}
              target="_blank"
              className="inline-flex items-center justify-center text-sm sm:text-base text-purple-300 hover:text-purple-200 underline underline-offset-4"
            >
              {lang==='ko' ? '실행이 안되시나요? (도움말)' : 'Having trouble running? (Help)'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


