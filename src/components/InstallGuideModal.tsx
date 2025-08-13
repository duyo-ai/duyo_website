'use client'

import Image from 'next/image'

type Props = {
  open: boolean
  os: 'mac' | 'windows'
  onClose: () => void
}

export default function InstallGuideModal({ open, os, onClose }: Props) {
  if (!open) return null

  const helpUrl = process.env.NEXT_PUBLIC_RUN_HELP_URL || 'https://slashpage.com/cutple'

  const steps = os === 'windows'
    ? [
        { title: '1. 다운로드된 파일을 실행합니다.', img: '/download_asset.png' },
        { title: '2. Windows의 PC 보호 창이 뜨면, 추가 정보를 클릭합니다.', img: '/image.png' },
        { title: '3. 실행 버튼을 눌러서 프로그램을 설치합니다.', img: '/app.png' },
      ]
    : [
        { title: '1. 다운로드된 파일을 실행합니다.', img: '/download_asset.png' },
        { title: '2. 해당 창이 뜨면 드래그하여 Applications로 이동합니다.', img: '/image.png' },
        { title: '3. Cutple 앱을 실행합니다.', img: '/app.png' },
      ]

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative mx-auto max-w-6xl w-full">
        <div className="rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.96)] p-10 sm:p-12 shadow-2xl">
          <div className="mb-8 text-center">
            <h3 className="text-white text-3xl sm:text-4xl font-semibold">
              {os === 'windows' ? 'Windows 설치 안내' : 'macOS 설치 안내'}
            </h3>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => (
              <li key={idx} className="rounded-xl bg-white/5 border border-white/10 p-6 sm:p-7">
                <div className="text-gray-100 text-lg font-medium mb-5 leading-relaxed">{s.title}</div>
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-black/20">
                  <Image src={s.img} alt={s.title} fill className="object-contain" />
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 sm:mt-10 flex items-center justify-between">
            <a
              href={helpUrl as string}
              target="_blank"
              className="text-sm sm:text-base text-purple-300 hover:text-purple-200 underline underline-offset-4"
            >
              실행이 안되시나요? (도움말)
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg bg-white text-gray-900 px-6 py-3 text-sm sm:text-base font-semibold hover:bg-gray-100"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


