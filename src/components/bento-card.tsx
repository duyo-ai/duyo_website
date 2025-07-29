'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import React, { useState, useRef } from 'react'
import { Subheading } from './text'

export function BentoCard({
  dark = false,
  className = '',
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
  globalMousePosition,
}: {
  dark?: boolean
  className?: string
  eyebrow: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  graphic: React.ReactNode
  fade?: ('top' | 'bottom')[]
  globalMousePosition?: { x: number; y: number }
}) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [glowIntensity, setGlowIntensity] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  // 전역 마우스 위치에 따른 거리 계산 및 효과 적용
  React.useEffect(() => {
    if (!cardRef.current || !globalMousePosition) return

    const rect = cardRef.current.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(globalMousePosition.x - cardCenterX, 2) + 
      Math.pow(globalMousePosition.y - cardCenterY, 2)
    )
    
    // 300px 내에서 효과 적용
    const maxDistance = 300
    const intensity = Math.max(0, 1 - distance / maxDistance)
    
    setGlowIntensity(intensity)
    
    if (intensity > 0) {
      // 카드 상대 위치로 변환
      const x = ((globalMousePosition.x - rect.left) / rect.width) * 100
      const y = ((globalMousePosition.y - rect.top) / rect.height) * 100
      setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
    }
  }, [globalMousePosition])

  return (
    <motion.div
      ref={cardRef}
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}

      className={clsx(
        className,
        'group relative flex flex-col overflow-hidden rounded-lg',
        'bg-transparent shadow-sm ring-white/15 transition-all duration-300',
      )}
      style={{
        background: 'bg-black',
        border: '1px solid rgba(255,255,255,.1)',
        boxShadow: '0 -20px 80px -20px #8686f01f inset'
      }}
    >
      {/* 마우스 추적 테두리 효과 */}
      {glowIntensity > 0 && (
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, ${0.8 * glowIntensity}), rgba(59, 130, 246, ${0.6 * glowIntensity}), transparent 60%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            padding: '1px',
          }}
        />
      )}
      
      <div className="relative h-[29rem] shrink-0 overflow-hidden will-change-transform group-hover:scale-105 transition-transform duration-300">
        {graphic}
        {fade.includes('top') && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 from-[-25%] to-50% opacity-25" />
        )}
        {fade.includes('bottom') && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 from-[-25%] to-50% opacity-25" />
        )}
      </div>
      <div className="relative p-10 z-20 isolate mt-[-110px] h-[14rem] backdrop-blur-xl bg-black/0">
        <Subheading as="h3" dark={dark}>
          {eyebrow}
        </Subheading>
        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-400">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
