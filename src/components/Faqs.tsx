'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'

const faqs = [
  {
    question: 'Cutple로 얼마나 빨리 영상을 만들 수 있나요?',
    answer:
      '키워드 입력부터 완성된 영상까지 평균 5분 이내에 제작할 수 있습니다. 대본 생성, 음성 변환, 이미지 배치까지 모든 과정에 자동화 도움을 받을 수 있습니다.',
  },
  {
    question: '어떤 플랫폼에 업로드할 수 있나요?',
    answer: '현재는 유튜브 쇼츠 만 가능하며, 인스타그램 릴스, 틱톡에도 추가 지원 예정입니다.',
  },
  {
    question: '편집 경험이 없어도 사용할 수 있나요?',
    answer:
      '네, 전혀 문제없습니다. 컷플은 아이디어만으로 영상제작을 빠르게 하도록 최적화 되어있습니다.',
  },
  {
    question: 'AI 음성은 어떤 종류를 지원하나요?',
    answer:
      '\'타입캐스트\', \'볼리\'를 지원합니다. 추가로 일레븐 랩스 등은 추가 예정입니다.',
  },
  {
    question: '생성된 영상의 품질은 어느 정도인가요?',
    answer:
      '컷플의 영상으로 100만 조회수 영상 제작이 가능하며 실제 바이럴이 될 수있는 구조에 기반한 대본과 빠르게 편집 효과를 삽입하여 바로 업로드 가능한 수준의 영상을 생성합니다.',
  },
  {
    question: '저작권 문제는 없나요?',
    answer:
      'AI로 생성되는 모든 콘텐츠(대본, 이미지, 음성)는 저작권 걱정 없이 상업적으로도 자유롭게 사용할 수 있습니다.',
  },
]

export function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden py-20 sm:py-32"
    >
      <div className="absolute top-0 z-[0] h-full w-screen bg-[#1A0540]/20 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(106,20,255,0.3),rgba(255,255,255,0))]"></div>
      
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-gray-200 sm:text-4xl md:text-5xl"
          >
            자주 묻는 질문
          </h2>
          <p className="mt-4 text-base sm:text-lg tracking-tight text-gray-400">
            궁금한 점이 해결되지 않으셨다면 고객지원팀에 문의해 주세요.
            빠른 시간 내에 답변드리겠습니다.
          </p>
        </div>
        
        <div className="mx-auto mt-12 sm:mt-16 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-display text-base sm:text-lg leading-7 text-gray-200 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-4 pt-4">
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
