'use client'

import { useId, useEffect, useState, useRef } from 'react'
import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import screenshotContacts from '@/images/usage/text-adjust.gif'
import screenshotInventory from '@/images/usage/script-generation.gif'
import screenshotProfitLoss from '@/images/usage/original-story.gif'

interface Feature {
  name: React.ReactNode
  summary: string
  description: string
  image: ImageProps['src']
  icon: React.ComponentType
}

const features: Array<Feature> = [
  {
    name: '키워드 입력',
    summary: '원하는 콘텐츠의 키워드를 간단히 입력하세요.',
    description: '',
    image: screenshotProfitLoss,
    icon: function KeywordIcon() {
      let id = useId()
      return (
        <>
          <defs>
            <linearGradient
              id={id}
              x1="11.5"
              y1={18}
              x2={36}
              y2="15.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".194" stopColor="#fff" />
              <stop offset={1} stopColor="#6692F1" />
            </linearGradient>
          </defs>
          <path
            d="M8 12h8m-8 6h8m2-6h8m-8 6h8"
            stroke={`url(#${id})`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )
    },
  },
  {
    name: '템플릿 선택',
    summary: '음성, 이미지를 포함한 다양한 템플릿 중 선택하세요.',
    description: '',
    image: screenshotInventory,
    icon: function TemplateIcon() {
      return (
        <>
          <path
            opacity=".5"
            d="M8 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4Z"
            fill="#fff"
          />
          <path
            opacity=".3"
            d="M8 18a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4Z"
            fill="#fff"
          />
          <path
            d="M8 26a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2Z"
            fill="#fff"
          />
        </>
      )
    },
  },
  {
    name: '90% 초안에서 최종 수정',
    summary: '거의 완성된 초안을 최종 검토하고 세부 수정하세요.',
    description: '',
    image: screenshotContacts,
    icon: function EditIcon() {
      return (
        <>
          <path
            opacity=".5"
            d="M20 20L8 8l12 12Z"
            fill="#fff"
          />
          <path
            d="m22 10-8 8-4-4 8-8 4 4ZM8 28h16"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )
    },
  },
]

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: Feature
  isActive: boolean
}) {
  return (
    <div
      className={clsx(
        className, 
        'transition-all duration-700 ease-in-out',
        !isActive && 'opacity-50 scale-95'
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        {/* 좌측 원형 숫자 배지 */}
        <div
          className={clsx(
            'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 flex-shrink-0',
                            isActive ? 'bg-white/10 ring-2 ring-gradient-to-r ring-purple-400/40 backdrop-blur-md shadow-lg shadow-purple-500/20' : 'bg-white/5 ring-1 ring-purple-300/20',
          )}
        >
          <span className="text-white font-semibold text-lg">
            {features.findIndex(f => f === feature) + 1}
          </span>
        </div>

        {/* 우측 텍스트 영역 */}
        <div className="flex-1 min-w-0">
          <h3
            className={clsx(
              'text-xl font-bold transition-colors duration-500 leading-tight',
              isActive ? 'text-indigo-400' : 'text-gray-400',
            )}
          >
            {feature.name}
          </h3>
          <p className={clsx(
            'mt-2 font-display text-base transition-colors duration-500 leading-relaxed',
            isActive ? 'text-gray-100' : 'text-gray-400'
          )}>
            {feature.summary}
          </p>
        </div>
      </div>

      {/* 연결선 (마지막 요소가 아닐 때만) */}
      {features.findIndex(f => f === feature) < features.length - 1 && (
        <div className="flex justify-start mt-4 mb-2">
          <div className="ml-6 w-px h-8 bg-gradient-to-b from-indigo-500/30 to-transparent" />
        </div>
      )}
    </div>
  )
}



function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature, index) => (
        <div key={feature.summary}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/10 ring-2 ring-purple-400/40 backdrop-blur-md flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
              {index + 1}
            </div>
            <div className="h-px bg-gray-600 flex-1" />
          </div>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-gray-200/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={feature.image}
                alt=""
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSticky, setIsSticky] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // 섹션 상단이 뷰포트 상단에 닿았을 때 sticky 활성화
      if (sectionRect.top <= 40) { // top-10 = 2.5rem = 40px
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }

      // 섹션이 화면에 보이는 동안에만 작동
      if (sectionRect.top <= windowHeight * 0.3 && sectionRect.bottom >= windowHeight * 0.7) {
        
        // 🔧 전체 스크롤 가능 거리 계산 (섹션 높이 - 뷰포트 높이)
        const totalScrollableHeight = sectionRef.current.offsetHeight - windowHeight
        
        // 현재 스크롤된 거리 (0~100% 비율로 정규화)
        const scrolled = Math.max(0, windowHeight * 0.3 - sectionRect.top)
        const scrollProgress = Math.min(scrolled / totalScrollableHeight, 1)
        
        // 🎯 3단계를 더 짧게, 빠져나가기 구간 확보
        // 0~30% = 1단계, 30~60% = 2단계, 60~80% = 3단계, 80~100% = 빠져나가기
        let currentStep
        if (scrollProgress < 0.3) {
          currentStep = 0  // 1단계 (30% 구간)
        } else if (scrollProgress < 0.6) {
          currentStep = 1  // 2단계 (30% 구간)
        } else if (scrollProgress < 0.8) {
          currentStep = 2  // 3단계 (20% 구간 - 더 짧게!)
        } else {
          currentStep = -1  // 80% 이후 빠져나가기 - 모든 단계 비활성화
        }
        
        setCurrentStep(currentStep)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 상태 설정

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

      return (
      <div ref={sectionRef} className="hidden lg:block lg:mt-20" style={{ height: '600vh' }}>
      <div 
        ref={contentRef}
        className={clsx(
          "pt-0",
          isSticky ? "sticky top-10" : "relative"
        )}
      >
        <div className="w-full">
          <div className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.summary}
                feature={feature}
                isActive={featureIndex === currentStep}
                className="relative"
              />
            ))}
          </div>
          
          <div className={clsx(
            "relative mt-0 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16 transition-opacity duration-700",
            currentStep === -1 ? "opacity-30" : "opacity-100"
          )}>
            <div className="relative">
              <div className="w-full overflow-hidden rounded-xl bg-white shadow-lg shadow-gray-200/5 ring-1 ring-slate-500/10">
                <Image
                  className="w-full transition-opacity duration-700 rounded-2xl"
                  src={features[Math.max(0, currentStep)].image}
                  alt=""
                  sizes="52.75rem"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-gray-200/10" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="bg-page-gradient bg-hero-gradient relative"
    >
      <Container>
        <div className="py-8 sm:py-14 lg:py-20 xl:py-32">
          <div className="-z-1 absolute inset-x-0 -top-0 h-[600px]  w-full bg-transparent bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]  bg-[size:6rem_4rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          <div
            className="h-full absolute inset-0 rotate-180 blur-lg"
            style={{
              background:
                'linear-gradient(143.6deg, rgba(52, 103, 235, 0) 15%, rgba(111,79,249, 0.35) 40%, rgba(111,79,249, 0) 50%)',
            }}
          ></div>
          
          <div className="mr-auto max-w-2xl md:text-start px-4 sm:px-0">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl tracking-tight text-gray-200">
              <span className="bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent">
                간단한 3단계로{' '}
              </span>{' '}<br/>              콘텐츠 제작 완성.
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg tracking-tight text-gray-100">
              키워드만 입력하면 AI가 템플릿 추천부터 최종 완성까지 
              모든 과정을 도와드립니다.
            </p>
          </div>
          <FeaturesMobile />
          <FeaturesDesktop />
        </div>
      </Container>
    </section>
  )
}
