import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Cutple로 얼마나 빨리 영상을 만들 수 있나요?',
      answer:
        '키워드 입력부터 완성된 영상까지 평균 5분 이내에 제작할 수 있습니다. 대본 생성, 음성 변환, 이미지 배치까지 모든 과정이 자동화되어 있습니다.',
    },
    {
      question: '어떤 플랫폼에 업로드할 수 있나요?',
      answer: '유튜브 쇼츠, 인스타그램 릴스, 틱톡에 자동으로 동시 업로드가 가능합니다.',
    },
    {
      question: '편집 경험이 없어도 사용할 수 있나요?',
      answer:
        '네, 전혀 문제없습니다. 편집 지식이나 기술적 배경 없이도 아이디어만 있으면 바로 시작할 수 있도록 설계되었습니다.',
    },
  ],
  [
    {
      question: 'AI 음성은 어떤 종류를 지원하나요?',
      answer:
        'Typecast, 볼리, ElevenLabs 등 다양한 AI 음성 플랫폼을 통합하여 감정과 톤에 맞는 자연스러운 음성을 제공합니다.',
    },
    {
      question: '생성된 영상의 품질은 어느 정도인가요?',
      answer:
        '실제 바이럴 포맷 구조에 기반한 고품질 대본과 전문적인 편집 효과로 바로 업로드 가능한 수준의 영상을 생성합니다.',
    },
    {
      question: '저작권 문제는 없나요?',
      answer:
        'AI로 생성되는 모든 콘텐츠(대본, 이미지, 음성)는 저작권 걱정 없이 상업적으로도 자유롭게 사용할 수 있습니다.',
    },
  ],
  [
    {
      question: '월 몇 개의 영상을 만들 수 있나요?',
      answer:
        '요금제에 따라 다르지만, 기본 플랜도 월 50개 이상의 영상을 제작할 수 있으며, 무제한 플랜도 제공합니다.',
    },
    {
      question: '다른 영상 편집 툴과 연동이 가능한가요?',
      answer: '생성된 영상은 모든 주요 편집 프로그램에서 추가 편집이 가능한 형태로 다운로드됩니다.',
    },
    {
      question: '계정 관련 문제가 생기면 어떻게 하나요?',
      answer:
        '24시간 고객지원 채팅을 통해 즉시 도움을 받을 수 있으며, 이메일로도 문의 가능합니다.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative   overflow-hidden  py-20 sm:py-32"
    >
      <div className="absolute top-0 z-[0] h-full w-screen bg-[#1A0540]/20  bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(106,20,255,0.3),rgba(255,255,255,0))]"></div>

   
      <Container className="relative">
        <div className="mx-auto max-w-3xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-gray-200 sm:text-4xl"
          >
            자주 묻는 질문
          </h2>
          <p className="mt-4 text-lg tracking-tight text-gray-400">
            궁금한 점이 해결되지 않으셨다면 고객지원팀에 문의해 주세요.
            빠른 시간 내에 답변드리겠습니다.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-gray-200">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-400">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
