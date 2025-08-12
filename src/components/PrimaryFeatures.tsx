'use client'

import { useState } from 'react'
import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import usageScriptGeneration from '@/images/usage/script-generation.gif'
import usageAiVoice from '@/images/usage/ai-voice.gif'
import usageBackgroundImage from '@/images/usage/background-image.gif'
import usageDragDrop from '@/images/usage/drag-drop.gif'
import usageTextAdjust from '@/images/usage/text-adjust.gif'
import usageSpacing from '@/images/usage/spacing-adjust.gif'

const aiFeatures = [
  {
    title: 'AI 목소리',
    description: '감정에 따라 톤을 조절하는 다양한 AI 음성을 지원합니다. Typecast, 볼리, ElevenLabs를 통합하여 자연스러운 음성을 제공합니다.',
    image: usageAiVoice,
  },
  {
    title: '대본 생성',
    description: '실제 바이럴 포맷 구조에 기반한 고품질 대본을 AI가 자동으로 생성합니다. 키워드만 입력하면 완성도 높은 스크립트가 완성됩니다.',
    image: usageScriptGeneration,
  },
  {
    title: 'AI 이미지',
    description: '문맥에 맞는 이미지를 자동 생성하여 컷에 배치합니다. 프롬프트 기반으로 영상에 어울리는 비주얼을 실시간 생성합니다.',
    image: usageBackgroundImage,
  },
]

const editFeatures = [
  {
    title: '드래그&드롭',
    description: '스톡 이미지나 웹 이미지를 드래그 한 번으로 바로 삽입할 수 있습니다. 복잡한 업로드 과정 없이 즉시 적용됩니다.',
    image: usageDragDrop,
  },
  {
    title: '간격 조절',
    description: '문장 간격과 타이밍을 자동으로 최적화하여 시청 몰입도를 높입니다. 자연스러운 흐름을 위한 스마트 타이밍 조절.',
    image: usageTextAdjust,
  },
  {
    title: '효과음 추가',
    description: '상황에 맞는 효과음을 자동으로 삽입하여 영상 완성도를 높입니다. 분위기와 내용에 맞는 사운드 이펙트를 제공합니다.',
    image: usageSpacing,
  },
]

// AI 섹션 (3개 카드 한 줄)
function AISection() {
  return (
    <div className="mb-32">
      {/* 제목 섹션 */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
          <span className="font-bold bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 bg-clip-text text-transparent">
            AI로 더 쉽게
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
          AI가 자동으로 콘텐츠를 생성하고 최적화합니다. 키워드만 입력하면 완성도 높은 영상이 자동으로 제작됩니다.
        </p>
      </div>

      {/* 3개 카드 한 줄 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {aiFeatures.map((feature, index) => (
          <div key={feature.title} className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 편집 도구 섹션 (창의적 레이아웃)
function EditSection() {
  return (
    <div className="space-y-16">
      {/* 제목 */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
          <span className="font-bold bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 bg-clip-text text-transparent">
            누구나 쉽게
          </span>
        </h2>
        
      </div>

      {/* 메인 피처 (드래그&드롭) - 큰 카드 */}
      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              {editFeatures[0].title}
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              {editFeatures[0].description}
            </p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={editFeatures[0].image}
                alt={editFeatures[0].title}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 나머지 두 피처 - 사이드바이사이드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {editFeatures.slice(1).map((feature, index) => (
          <div key={feature.title} className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 " />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="AI 기반 동영상 제작 기능들"
      className="relative overflow-hidden pt-16 sm:pt-24 pb-16 sm:pb-24"
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
        {/* AI 섹션 - 좌우 분할 */}
        <AISection />
        
        {/* 편집 도구 섹션 - 창의적 레이아웃 */}
        <EditSection />
      </Container>
    </section>
  )
}
