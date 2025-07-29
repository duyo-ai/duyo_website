'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-features.jpg'
import usageScriptGeneration from '@/images/usage/script-generation.gif'
import usageAiVoice from '@/images/usage/ai-voice.gif'
import usageBackgroundImage from '@/images/usage/background-image.gif'
import usageDragDrop from '@/images/usage/drag-drop.gif'
import usageTextAdjust from '@/images/usage/text-adjust.gif'
import usageOriginalStory from '@/images/usage/original-story.gif'
import usageSpacing from '@/images/usage/spacing-adjust.gif'

const features = [
  {
    title: '대본 생성',
    description: '실제 바이럴 포맷 구조에 기반한 고품질 대본 생성',
    image: usageScriptGeneration,
  },
  {
    title: 'AI 목소리',
    description: '감정대로, 다양한 AI 음성 (Typecast, 볼리, ElevenLabs 통합)',
    image: usageAiVoice,
  },
  {
    title: 'AI 이미지',
    description: '문맥 기반 이미지 생성 + 컷 자동 배치',
    image: usageBackgroundImage,
  },
  {
    title: '드래그로 더 쉽게',
    description: '드래그로 쉽고 빠른 스톡 추가, 웹상의 이미지/GIF도 드래그 한번으로 바로 삽입',
    image: usageDragDrop,
  },
  {
    title: '자동 자막',
    description: '자동 자막 삽입까지 포함된 올인원 프로세스',
    image: usageTextAdjust,
  },
  {
    title: '자동 업로드',
    description: '유튜브 쇼츠, 인스타 릴스, 틱톡 동시 업로드 지원',
    image: usageOriginalStory,
  },
  {
    title: '자동 레이아웃',
    description: '이미지를 동적으로 움직이게 하여, 쇼츠 지속력을 높입니다',
    image: usageSpacing,
  },
]

export function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  )
  let [expandedTab, setExpandedTab] = useState<number | null>(0)

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="features"
      aria-label="AI 기반 동영상 제작 기능들"
      className="relative overflow-hidden min-h-screen pt-12 sm:pt-20 pb-12 sm:pb-20"
      style={{
        background: 'radial-gradient(ellipse 50% 80% at 20% 40%, rgba(93, 52, 221, 0.1), transparent)'
      }}
    >
      <div
        className="absolute inset-0 blur-xl h-full"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(30, 20, 60, 0) 20.79%, rgba(60, 50, 80, 0.15) 40.92%, rgba(40, 30, 70, 0) 70.35%)",
        }}
      ></div>
      <Container className="relative z-30">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl tracking-tighter font-sans text-white md:text-4xl lg:text-5xl">
            <span className='font-medium bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent'>AI 기반</span> 동영상 제작 플랫폼
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg tracking-tight font-normal font-sans text-blue-100">
            콘텐츠 제작부터 업로드까지, 모든 과정을 AI가 자동화합니다.
          </p>
        </div>
        <TabGroup
          as="div"
          className="mt-8 sm:mt-16 md:mt-20 mb-8 sm:mb-16"
          vertical={tabOrientation === 'vertical'}
        >
          <div className="lg:flex">
            <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:mx-0 lg:block lg:w-1/4 lg:flex-shrink-0 lg:pb-0">
              <TabList className="relative z-10 flex gap-x-2 sm:gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block space-y-2 sm:space-y-4 lg:space-y-6 lg:whitespace-normal">
                {features.map((feature, featureIndex) => (
                  <Tab
                    as="div"
                    key={feature.title}
                    className={({ selected }) =>
                      clsx(
                                                'group relative rounded-full px-3 py-1 sm:px-4 lg:rounded-l-lg lg:rounded-r-none lg:border-r-0 lg:p-6 text-left transition-[background-color,color,border] duration-200 ui-not-focus-visible:outline-none lg:overflow-hidden transform-gpu lg:bg-white/5 before:absolute before:inset-0 before:rounded-l-lg before:border-2 before:border-r-0 before:border-transparent hover:before:border-[#904fff]/50 before:transition-colors',
                          selected ? 'before:!border-[#904fff] lg:bg-white/10' : ''
                      )
                    }
                    onClick={() =>
                      setExpandedTab(
                        expandedTab === featureIndex ? null : featureIndex,
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                                                 <div className={clsx(
                            "absolute inset-y-0 left-0 w-4 sm:w-5 flex items-start justify-center pt-2 sm:pt-3",
                            selected ? "bg-[#904fff]" : "bg-[#9456ff98]"
                          )}>
                           <span className="text-xs font-semibold text-[#391690]">{featureIndex + 1}</span>
                          </div>
                        <h3
                          className={clsx(
                            'font-display text-sm sm:text-lg pl-2',
                            selected
                              ? 'text-blue-600 lg:text-white pl-2'
                              : 'text-blue-100 hover:text-white lg:text-white  pl-2',
                          )}
                        >
                          {feature.title}
                        </h3>
                        <div
                          className={clsx(
                            'overflow-hidden transition-[max-height,opacity,margin] duration-300 transform-gpu [will-change:max-height,opacity,margin] pl-2',
                            expandedTab === featureIndex
                              ? 'max-h-20 opacity-100 mt-1 sm:mt-2'
                              : 'max-h-0 opacity-0 mt-0',
                          )}
                        >
                          <p
                            className={clsx(
                              'text-xs sm:text-sm',
                              selected
                                ? 'text-white break-keep'
                                : 'text-blue-100 group-hover:text-whiteb break-keep',
                            )}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </>
                    )}
                  </Tab>
                ))}
              </TabList>
            </div>
            <TabPanels className="lg:flex-1 lg:overflow-visible lg:mr-[-10vw]">
              {features.map((feature) => (
                <TabPanel key={feature.title} unmount={false}>
                  <div className="relative sm:px-6 lg:hidden">
                    <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                    <p className="relative mx-auto max-w-2xl text-sm sm:text-base text-white sm:text-center px-4 sm:px-0">
                      {feature.description}
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-10 w-full overflow-visible shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 px-4 sm:px-0">
                    <Image
                      className="w-full lg:scale-[1.03] lg:origin-left rounded-lg sm:rounded-xl"
                      src={feature.image}
                      alt=""
                      priority
                      sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                    />
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </div>
        </TabGroup>
      </Container>
    </section>
  )
}
