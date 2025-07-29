'use client'

import { useEffect } from 'react'

export default function ToolbarProvider() {
  useEffect(() => {
    // 개발 환경에서만 툴바 초기화
    if (process.env.NODE_ENV === 'development') {
      const initializeToolbar = async () => {
        try {
          const { initToolbar } = await import('@21st-extension/toolbar')
          
          const stagewiseConfig = {
            plugins: [],
          }
          
          initToolbar(stagewiseConfig)
          console.log('🚀 21st Extension Toolbar initialized successfully!')
        } catch (error) {
          console.warn('Failed to initialize 21st Extension Toolbar:', error)
        }
      }
      
      initializeToolbar()
    }
  }, [])

  // 개발 환경이 아니거나 툴바가 필요하지 않을 때는 아무것도 렌더링하지 않음
  return null
} 