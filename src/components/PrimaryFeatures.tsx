'use client'

import { useState } from 'react'
import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'
import usageScriptGeneration from '@/images/usage/script-generation.gif'
import usageAiVoice from '@/images/usage/ai-voice.gif'
import usageBackgroundImage from '@/images/usage/background-image.gif'
import usageDragDrop from '@/images/usage/drag-drop.gif'
import usageTextAdjust from '@/images/usage/text-adjust.gif'
import usageSpacing from '@/images/usage/spacing-adjust.gif'

// AI features - titles and descriptions will be handled via dictionary
const aiFeatures = [
  {
    key: 'voice',
    image: usageAiVoice,
  },
  {
    key: 'script',
    image: usageScriptGeneration,
  },
  {
    key: 'image',
    image: usageBackgroundImage,
  },
]

// Edit features - titles and descriptions will be handled via dictionary
const editFeatures = [
  {
    key: 'drag',
    image: usageDragDrop,
  },
  {
    key: 'spacing',
    image: usageTextAdjust,
  },
  {
    key: 'sound',
    image: usageSpacing,
  },
]

// AI 섹션 (3개 카드 한 줄)
function AISection() {
  const { lang } = useLang()
  const t = dictionaries[lang]
  return (
    <div className="mb-32">
      {/* 제목 섹션 */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
          <span className="font-bold bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 bg-clip-text text-transparent">
            {t['features.ai.title']}
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
          {t['features.ai.subtitle']}
        </p>
      </div>

      {/* 3개 카드 한 줄 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {aiFeatures.map((feature, index) => (
          <div key={feature.key} className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={feature.image}
                alt={t[`features.ai.${feature.key}.title`]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-3">{t[`features.ai.${feature.key}.title`]}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{t[`features.ai.${feature.key}.desc`]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 편집 도구 섹션 (창의적 레이아웃)
function EditSection() {
  const { lang } = useLang()
  const t = dictionaries[lang]
  return (
    <div className="space-y-16">
      {/* 제목 */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
          <span className="font-bold bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 bg-clip-text text-transparent">
            {t['features.edit.title']}
          </span>
        </h2>
        
      </div>

      {/* 메인 피처 (드래그&드롭) - 큰 카드 */}
      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              {t[`features.edit.${editFeatures[0].key}.title`]}
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              {t[`features.edit.${editFeatures[0].key}.desc`]}
            </p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={editFeatures[0].image}
                alt={t[`features.edit.${editFeatures[0].key}.title`]}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 나머지 두 피처 - 사이드바이사이드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {editFeatures.slice(1).map((feature, index) => (
          <div key={feature.key} className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={feature.image}
                alt={t[`features.edit.${feature.key}.title`]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 " />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                {t[`features.edit.${feature.key}.title`]}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t[`features.edit.${feature.key}.desc`]}
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
