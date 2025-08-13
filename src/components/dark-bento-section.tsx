'use client'

import { useState } from 'react'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'
import { BentoCard } from './bento-card'
import { Container } from './Container'

export function DarkBentoSection() {
  const [globalMousePosition, setGlobalMousePosition] = useState({ x: 0, y: 0 })
  const { lang } = useLang()
  const t = dictionaries[lang]

  const handleGlobalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setGlobalMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div 
      className="mx-2 mt-2 rounded-4xl py-16 sm:py-24 lg:py-32"
      onMouseMove={handleGlobalMouseMove}
    >
      <Container>
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-6xl text-white leading-tight mb-6">
              <span className="font-bold bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent">
                {lang==='ko' ? '누구나 쉽게 만드는' : 'Easy for everyone'}
              </span>{' '}<br />
              {lang==='ko' ? '프로급 숏폼 영상' : 'Pro-level short-form videos'}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
              {lang==='ko' ? '경험이나 기술적 배경과 상관없이, 아이디어만 있으면 바로 시작할 수 있습니다.' : 'Start instantly with just your idea—no experience or technical background required.'}
              <br/>
              {lang==='ko' ? '간단한 키워드 입력부터 완성된 영상까지, 모든 과정이 자동화됩니다.' : 'From simple keywords to a finished video, every step is automated.'}
            </p>
          </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
            eyebrow={t['bento.1.eyebrow']}
            title={t['bento.1.title']}
            description={t['bento.1.desc']}
            graphic={
              <img 
                  src="/example.png" 
                  alt={t['bento.1.title']} 
                  className="w-full h-full object-cover"
                />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
            globalMousePosition={globalMousePosition}
          />
          <BentoCard
            eyebrow={t['bento.2.eyebrow']}
            title={t['bento.2.title']}
            description={t['bento.2.desc']}
            graphic={
              <div className="h-full flex items-center justify-center overflow-hidden ">
                <img 
                  src="/faceless-creator.png" 
                  alt={t['bento.2.title']} 
                  className="w-full h-full object-cover"
                />
              </div>
            }
            className="lg:col-span-2 lg:rounded-tr-4xl"
            globalMousePosition={globalMousePosition}
          />
          <BentoCard
            dark={true}
            eyebrow={t['bento.3.eyebrow']}
            title={t['bento.3.title']}
            description={t['bento.3.desc']}
            graphic={
              <div className="h-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/image.png" 
                  alt={t['bento.3.title']} 
                  className="w-full h-full object-cover"
                />
              </div>
            }
            className="lg:col-span-2 lg:rounded-bl-4xl"
            globalMousePosition={globalMousePosition}
          />
          <BentoCard
            dark={true}
            eyebrow={t['bento.4.eyebrow']}
            title={t['bento.4.title']}
            description={t['bento.4.desc']}
            graphic={
              <img 
                  src="/example.png" 
                  alt={t['bento.4.title']} 
                  className="w-full h-full object-cover"
                />
            }
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
            globalMousePosition={globalMousePosition}
          />
        </div>
      </Container>
    </div>
  )
} 