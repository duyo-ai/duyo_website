'use client'

import { useEffect, useRef } from 'react'

export default function GridBackground() {
  const rectanglesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const rectangles = rectanglesRef.current.filter(Boolean)
    
    const createBlinkEffect = (element: HTMLDivElement, delay: number) => {
      setTimeout(() => {
        const blink = () => {
          if (element) {
            element.style.opacity = '0.3'
            setTimeout(() => {
              if (element) element.style.opacity = '1'
            }, 150)
          }
        }
        
        blink()
        setInterval(blink, Math.random() * 3000 + 2000) // 2-5초 랜덤 간격
      }, delay)
    }

    rectangles.forEach((rect, index) => {
      if (rect) {
        createBlinkEffect(rect, Math.random() * 2000) // 초기 0-2초 랜덤 딜레이
      }
    })
  }, [])

  const setRectRef = (index: number) => (el: HTMLDivElement | null) => {
    rectanglesRef.current[index] = el
  }
  return (
    <>
      {/* Background extends upward to cover header area */}
      <div className="absolute -top-28 inset-x-0 bottom-0 -z-10">
        {/* Main background gradient overlay - using our brand colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950/30 to-gray-950 opacity-40" />
        
        {/* Enhanced gradient with radial fade effect - our brand colors */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-950/60 via-indigo-900/20 to-gray-950/60"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, white 0%, rgba(255,255,255,0.6) 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, white 0%, rgba(255,255,255,0.6) 40%, transparent 100%)',
          }}
        />

        
        {/* Original BgGradient equivalent - reduced opacity */}
        <div className="absolute -top-0 inset-x-0 opacity-25">
          <div
            className="absolute left-[calc(50%-4rem)] top-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#200f3b] to-[#11002d] opacity-15"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
        </div>

        {/* Interactive Grid Rectangles using divs instead of SVG */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          {/* Grid Rectangle 1 */}
          <div 
            ref={setRectRef(0)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% - 200px)',
              top: '0px',
              backgroundColor: 'rgba(138, 68, 255, 0.15)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(138, 68, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138, 68, 255, 0.25)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(138, 68, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138, 68, 255, 0.15)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(138, 68, 255, 0.2)';
            }}
          />

          {/* Grid Rectangle 2 */}
          <div 
            ref={setRectRef(1)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% + 600px)',
              top: '0px',
              backgroundColor: 'rgba(107, 164, 255, 0.12)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(107, 164, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(107, 164, 255, 0.22)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(107, 164, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(107, 164, 255, 0.12)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(107, 164, 255, 0.2)';
            }}
          />

          {/* Grid Rectangle 3 */}
          <div 
            ref={setRectRef(2)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% - 400px)',
              top: '600px',
              backgroundColor: 'rgba(74, 15, 191, 0.18)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(74, 15, 191, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 15, 191, 0.28)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(74, 15, 191, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 15, 191, 0.18)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(74, 15, 191, 0.2)';
            }}
          />

          {/* Grid Rectangle 4 */}
          <div 
            ref={setRectRef(3)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% + 200px)',
              top: '800px',
              backgroundColor: 'rgba(156, 128, 255, 0.14)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(156, 128, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(156, 128, 255, 0.24)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(156, 128, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(156, 128, 255, 0.14)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(156, 128, 255, 0.2)';
            }}
          />

          {/* Grid Rectangle 5 */}
          <div 
            ref={setRectRef(4)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% + 0px)',
              top: '200px',
              backgroundColor: 'rgba(138, 68, 255, 0.12)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(138, 68, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138, 68, 255, 0.20)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(138, 68, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138, 68, 255, 0.12)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(138, 68, 255, 0.2)';
            }}
          />

          {/* Grid Rectangle 6 */}
          <div 
            ref={setRectRef(5)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% + 400px)',
              top: '400px',
              backgroundColor: 'rgba(107, 164, 255, 0.16)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(107, 164, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(107, 164, 255, 0.26)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(107, 164, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(107, 164, 255, 0.16)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(107, 164, 255, 0.2)';
            }}
          />

          {/* Additional rectangles for more coverage */}
          <div 
            ref={setRectRef(6)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% - 600px)',
              top: '-200px',
              backgroundColor: 'rgba(138, 68, 255, 0.10)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(138, 68, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138, 68, 255, 0.18)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(138, 68, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138, 68, 255, 0.10)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(138, 68, 255, 0.2)';
            }}
          />

          <div 
            ref={setRectRef(7)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% + 800px)',
              top: '200px',
              backgroundColor: 'rgba(74, 15, 191, 0.13)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(74, 15, 191, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 15, 191, 0.23)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(74, 15, 191, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 15, 191, 0.13)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(74, 15, 191, 0.2)';
            }}
          />

          {/* Adding more rectangles to cover the entire grid pattern */}
          <div 
            ref={setRectRef(8)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% - 800px)',
              top: '400px',
              backgroundColor: 'rgba(107, 164, 255, 0.11)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(107, 164, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(107, 164, 255, 0.19)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(107, 164, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(107, 164, 255, 0.11)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(107, 164, 255, 0.2)';
            }}
          />

          <div 
            ref={setRectRef(9)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% + 1000px)',
              top: '600px',
              backgroundColor: 'rgba(138, 68, 255, 0.13)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(138, 68, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138, 68, 255, 0.21)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(138, 68, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138, 68, 255, 0.13)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(138, 68, 255, 0.2)';
            }}
          />

          <div 
            ref={setRectRef(10)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% - 1000px)',
              top: '800px',
              backgroundColor: 'rgba(74, 15, 191, 0.10)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(74, 15, 191, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 15, 191, 0.18)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(74, 15, 191, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 15, 191, 0.10)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(74, 15, 191, 0.2)';
            }}
          />

          <div 
            ref={setRectRef(11)}
            className="absolute w-[201px] h-[201px] transition-all duration-300 ease-out cursor-pointer hover:brightness-125"
            style={{
              left: 'calc(50% + 200px)',
              top: '-400px',
              backgroundColor: 'rgba(156, 128, 255, 0.12)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(156, 128, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(156, 128, 255, 0.20)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 12px rgba(156, 128, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(156, 128, 255, 0.12)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(156, 128, 255, 0.2)';
            }}
          />
        </div>

        {/* Grid Pattern SVG - now just for the base grid lines */}
        <svg
          className="absolute inset-0 z-0 h-full w-full stroke-white/20 [mask-image:radial-gradient(100%_100%_at_top_left,white,transparent)] pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#grid-pattern)"
          />
        </svg>
      </div>
    </>
  )
} 