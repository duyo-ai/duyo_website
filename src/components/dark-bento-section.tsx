'use client'

import { useState } from 'react'
import { BentoCard } from './bento-card'
import { Container } from './Container'

export function DarkBentoSection() {
  const [globalMousePosition, setGlobalMousePosition] = useState({ x: 0, y: 0 })

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
              누구나 쉽게 만드는
              </span>{' '}<br />              프로급 숏폼 영상
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            경험이나 기술적 배경과 상관없이, 아이디어만 있으면 바로 시작할 수 있습니다. <br/>간단한 키워드 입력부터 완성된 영상까지, 모든 과정이 자동화됩니다.
            </p>
          </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
            eyebrow="Beginner YouTuber"
            title="초보 유튜버"
            description="직접 영상 편집이 부담스러운 초보 유튜버들을 위해 설계되었습니다. 복잡한 편집 툴 없이도 전문적인 영상을 만들 수 있습니다."
            graphic={
              <img 
                  src="/example.png" 
                  alt="얼굴 없는 크리에이터" 
                  className="w-full h-full object-cover"
                />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
            globalMousePosition={globalMousePosition}
          />
          <BentoCard
            eyebrow="Content Creator"
            title="얼굴 없는 크리에이터"
            description="얼굴 노출 없이 전문 지식으로 콘텐츠를 만들고 싶은 크리에이터들에게 완벽한 솔루션입니다."
            graphic={
              <div className="h-full flex items-center justify-center overflow-hidden ">
                <img 
                  src="/faceless-creator.png" 
                  alt="얼굴 없는 크리에이터" 
                  className="w-full h-full object-cover"
                />
              </div>
            }
            className="lg:col-span-2 lg:rounded-tr-4xl"
            globalMousePosition={globalMousePosition}
          />
          <BentoCard
            dark={true}
            eyebrow="Content Manager"
            title="콘텐츠 운영자"
            description="매일 쇼츠 콘텐츠를 업로드해야 하는 운영자들을 위한 효율적인 대량 생산 시스템입니다."
            graphic={
              <div className="h-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/image.png" 
                  alt="콘텐츠 운영자" 
                  className="w-full h-full object-cover"
                />
              </div>
            }
            className="lg:col-span-2 lg:rounded-bl-4xl"
            globalMousePosition={globalMousePosition}
          />
          <BentoCard
            dark={true}
            eyebrow="Marketing & Sales"
            title="마케팅 에이전시 & 셀러"
            description="바이럴 영상 제작을 희망하는 마케팅 에이전시와 텍스트 기반 광고 콘텐츠가 필요한 셀러들을 지원합니다."
            graphic={
              <img 
                  src="/example.png" 
                  alt="얼굴 없는 크리에이터" 
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