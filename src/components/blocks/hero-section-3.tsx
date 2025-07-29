'use client'

import { ChevronRight, Play } from 'lucide-react'
import { Button } from '@/components/Button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-center">
        {/* Badge */}
        <div className="mx-auto mb-8 w-fit">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Welcome to Cutple
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        {/* Main headline */}
        <h1 className="mx-auto max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8">
          텍스트 한 줄로 만드는
          <span className="block mt-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            바이럴 숏폼
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
          대본, 목소리, 이미지까지, 클릭 몇 번으로 쉽게.<br />
          키워드를 입력하면 대본이 나오고, 목소리가 입혀지고, 이미지가 배치됩니다.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105 hover:shadow-purple-500/40"
            href="/register"
          >
            Get Started
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <button className="group flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900/50 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-gray-800/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
              <Play className="h-4 w-4 fill-white" />
            </div>
            Watch Demo
          </button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-purple-500/20 p-3">
              <div className="h-6 w-6 rounded-full bg-purple-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">AI 대본 생성</h3>
            <p className="text-sm text-gray-400">실제 바이럴 포맷 구조 기반</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-pink-500/20 p-3">
              <div className="h-6 w-6 rounded-full bg-pink-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">AI 음성</h3>
            <p className="text-sm text-gray-400">다양한 AI 음성 통합</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-blue-500/20 p-3">
              <div className="h-6 w-6 rounded-full bg-blue-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">자동 업로드</h3>
            <p className="text-sm text-gray-400">플랫폼 동시 업로드</p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
} 