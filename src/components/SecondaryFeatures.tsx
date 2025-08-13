'use client'

import { useId, useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'
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

const featuresData: Array<{key: string, image: ImageProps['src'], icon: React.ComponentType}> = [
  {
    key: 'step1',
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
    key: 'step2',
    image: screenshotProfitLoss,
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
    key: 'step3',
    image: screenshotProfitLoss,
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
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: {key: string, image: ImageProps['src'], icon: React.ComponentType}
  isActive: boolean
  onClick?: () => void
}) {
  const { lang } = useLang()
  const t = dictionaries[lang]
  return (
    <div
      className={clsx(
        className,
        'transition-all duration-300 ease-in-out cursor-pointer rounded-xl p-4',
        !isActive && 'bg-slate-800/30  hover:bg-slate-700/40 active:scale-[0.98]',
        isActive && 'bg-gradient-to-br from-purple-900/20 to-blue-900/20'
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start gap-4">
        {/* 좌측 원형 숫자 배지 */}
        <div
          className={clsx(
            'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 flex-shrink-0',
            isActive ? 'bg-white/10' : 'bg-white/5 ',
          )}
        >
          <span className="text-white font-semibold text-lg">
            {featuresData.findIndex(f => f === feature) + 1}
          </span>
        </div>

        {/* 우측 텍스트 영역 */}
        <div className="flex-1 min-w-0">
          <h3
            className={clsx(
              'text-xl font-bold transition-colors duration-500 leading-tight',
              isActive ? 'text-purple-400' : 'text-gray-400',
            )}
          >
            {t[`features.${feature.key}.title`]}
          </h3>
          <p className={clsx(
            'mt-2 font-display text-sm transition-colors duration-500 leading-relaxed',
            isActive ? 'text-gray-100' : 'text-gray-400'
          )}>
            {t[`features.${feature.key}.desc`]}
          </p>
        </div>
      </div>

      {/* 연결선 (마지막 요소가 아닐 때만) */}

    </div>
  )
}



function FeaturesMobile() {
  const { lang } = useLang()
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
            {featuresData.map((feature, index) => (
        <div key={feature.key}>
         
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-300 sm:-inset-x-6" />
            <div className="relative mx-auto w-full overflow-hidden rounded-xl bg-white shadow-lg shadow-gray-200/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={feature.image}
                alt=""
                sizes="W-auto"
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
  const { lang } = useLang()

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  return (
    <div className="hidden lg:block lg:mt-20">
      <div className="pt-0 relative">
        <div className="w-full">
          {/* 버튼 영역 */}
          <div className="pb-12">
            <div className="grid grid-cols-3 gap-x-8">
            {featuresData.map((feature, featureIndex) => (
                <Feature
                  key={feature.key}
                  feature={feature}
                  isActive={featureIndex === currentStep}
                  onClick={() => handleStepClick(featureIndex)}
                  className="relative"
                />
              ))}
            </div>
          </div>

          {/* 이미지 영역 */}
          <div className="relative overflow-hidden rounded-4xl bg-transparent w-full mx-auto">
            <div className="relative">
              <div className="w-full overflow-hidden rounded-xl bg-white shadow-lg shadow-gray-200/5 ring-1 ring-slate-500/10">
                <Image
                  className="w-full transition-all duration-500 rounded-2xl"
                  src={featuresData[currentStep].image}
                  alt=""
                  sizes="52.75rem"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export function SecondaryFeatures() {
  const { lang } = useLang()
  const t = dictionaries[lang]
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="relative"
    >
      <Container>
        <div className="py-8 sm:py-14 lg:py-20 xl:py-32">

          <div
            className="h-full absolute inset-0 rotate-180 blur-lg"
            style={{
              background:
                'linear-gradient(143.6deg, rgba(52, 103, 235, 0) 15%, rgba(111,79,249, 0.2) 40%, rgba(111,79,249, 0) 50%)',
            }}
          ></div>

          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-6xl text-white leading-tight mb-6">
              <span className="font-bold bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent">
                {t['features.steps.title']}
              </span>{' '}<br />
              {t['features.steps.subtitle']}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
              {t['features.steps.desc']}
            </p>
          </div>
          <FeaturesMobile />
          <FeaturesDesktop />
        </div>
      </Container>
    </section>
  )
}
