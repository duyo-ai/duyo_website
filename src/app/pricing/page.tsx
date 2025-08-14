'use client'

import { useEffect, useRef, useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'
import clsx from 'clsx'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'

type BillingCycle = 'monthly' | 'yearly'

type Plan = {
  id: string
  // i18n fields
  nameKo: string
  nameEn: string
  descKo: string
  descEn: string
  ctaKo: string
  ctaEn: string
  featuresKo: string[]
  featuresEn: string[]
  // pricing/links
  price: { monthly: number; yearly: number }
  href: string
  highlight?: boolean
  credits?: number
}

// Glow ring wrapper copied from download page style (border-only lamp effect)
function GlowRingWrapper({ children, variant = 'primary' as 'primary' | 'neutral' }: { children: React.ReactNode; variant?: 'primary' | 'neutral' }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const targetXRef = useRef<number>(0)
  const targetYRef = useRef<number>(0)
  const currentXRef = useRef<number>(0)
  const currentYRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    targetXRef.current = rect.width / 2
    targetYRef.current = rect.height / 2
    currentXRef.current = targetXRef.current
    currentYRef.current = targetYRef.current
    el.style.setProperty('--mx', `${currentXRef.current}px`)
    el.style.setProperty('--my', `${currentYRef.current}px`)

    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const mx = e.clientX - r.left
      const my = e.clientY - r.top
      targetXRef.current = mx
      targetYRef.current = my
    }

    const tick = () => {
      const lerp = 0.2
      currentXRef.current += (targetXRef.current - currentXRef.current) * lerp
      currentYRef.current += (targetYRef.current - currentYRef.current) * lerp
      el.style.setProperty('--mx', `${currentXRef.current.toFixed(2)}px`)
      el.style.setProperty('--my', `${currentYRef.current.toFixed(2)}px`)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const ringRadius = 19 // match rounded-2xl (16px)
  const gapPx = 5
  const ringThicknessPx = 1
  const highlightGradient =
    variant === 'primary'
      ? `radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.6), rgba(99,102,241,0.45) 25%, rgba(99,102,241,0.25) 50%, rgba(255,255,255,0) 70%)`
      : `radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(212,212,216,0.6), rgba(228,228,231,0.45) 25%, rgba(212,212,216,0.25) 50%, rgba(255,255,255,0) 70%)`
  const baseTintGradient =
    variant === 'primary'
      ? 'linear-gradient(0deg, rgba(99,102,241,0.2), rgba(99,102,241,0.2))'
      : 'linear-gradient(90deg, rgba(212,212,216,0.18), rgba(228,228,231,0.18))'
  const hoverSolidGradient =
    variant === 'primary'
      ? 'linear-gradient(0deg, rgba(99,102,241,0.55), rgba(99,102,241,0.55))'
      : 'linear-gradient(0deg, rgba(212,212,216,0.6), rgba(212,212,216,0.6))'

  return (
    <div
      ref={wrapperRef}
      className="relative block w-full h-full"
      style={{ borderRadius: `${ringRadius}px`, padding: `${gapPx}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: `${ringRadius}px`,
          padding: `${ringThicknessPx}px`,
          backgroundImage: [highlightGradient, baseTintGradient].join(', '),
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: `${ringRadius}px`,
          padding: `${ringThicknessPx}px`,
          backgroundImage: hoverSolidGradient,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      <div className="relative z-10 h-full" style={{ borderRadius: `${ringRadius - 2}px` }}>
        {children}
      </div>
    </div>
  )
}

const PLANS: Plan[] = [
  {
    id: 'free',
    nameKo: 'Free',
    nameEn: 'Free',
    descKo: '쇼츠 제작을 체험해보세요',
    descEn: 'Try making shorts for free',
    price: { monthly: 0, yearly: 0 },
    ctaKo: '무료 시작하기',
    ctaEn: 'Start for free',
    href: '/#signup',
    credits: 300,
    featuresKo: ['이미지 생성 100장', 'TTS 음성 3,000자', '기본 템플릿 제공'],
    featuresEn: ['100 images generation', '3,000 chars TTS', 'Basic templates'],
  },
  {
    id: 'lite',
    nameKo: 'Basic',
    nameEn: 'Basic',
    descKo: '입문자와 쇼츠 제작 초보자용',
    descEn: 'For beginners and newcomers',
    price: { monthly: 33000, yearly: 33000 },
    ctaKo: '시작하기',
    ctaEn: 'Get started',
    href: '/#signup',
    credits: 8000,
    featuresKo: ['이미지 생성 533장', 'TTS 음성 32,000자','워터마크 제거'],
    featuresEn: ['533 images generation', '32,000 chars TTS','Remove watermark'],
  },
  {
    id: 'standard',
    nameKo: 'Pro',
    nameEn: 'Pro',
    descKo: '정기 제작자와 소상공인 마케팅용',
    descEn: 'For regular creators and SMB marketing',
    price: { monthly: 69000, yearly: 69000 },
    ctaKo: 'PRO 시작하기',
    ctaEn: 'Start Pro',
    href: '/#signup',
    highlight: true,
    credits: 20000,
    featuresKo: ['이미지 생성 1,333장', 'TTS 음성 80,000자','우선 처리 속도', '프리미엄 템플릿'],
    featuresEn: ['1,333 images generation', '80,000 chars TTS','Priority processing', 'Premium templates'],
  },
  {
    id: 'business',
    nameKo: 'Enterprise',
    nameEn: 'Enterprise',
    descKo: '대량 제작과 팀/스튜디오용',
    descEn: 'For teams/studios with large-scale production',
    price: { monthly: 129000, yearly: 129000 },
    ctaKo: '영업팀 문의',
    ctaEn: 'Contact Sales',
    href: '#contact',
    credits: 42000,
    featuresKo: ['이미지 생성 2,800장', 'TTS 음성 168,000자'],
    featuresEn: ['2,800 images generation', '168,000 chars TTS'],
  },
]

function BasicButton({ href, children, variant = 'primary' as 'primary' | 'outline' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'outline' }) {
  const base = 'font-geist block w-full rounded-md px-4 py-2 text-sm sm:px-8 sm:py-2 sm:text-lg text-center font-semibold transition-colors duration-300 ease-out tracking-tighter'
  const cls = variant === 'primary'
    ? 'bg-white text-gray-900 hover:bg-gray-100'
    : 'bg-white text-gray-900 hover:bg-gray-100'
  return (
    <a href={href} className={`${base} ${cls}`}>{children}</a>
  )
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>('yearly')
  const { lang } = useLang()
  const t = dictionaries[lang]
  const badgeText = t['pricing.badge.yearlyDiscount']

  return (
    <>
      <Header />
      <main className="">
        {/* Hero / Toggle */}
        <section className="relative">
          <div
            className="pointer-events-none absolute inset-0 -z-10 blur-xl h-full"
            style={{
              background:
                'radial-gradient(ellipse 50% 80% at 20% 40%, rgba(93, 52, 221, 0.05), transparent)',
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[100vh] -z-10" />
          <Container className="pt-20 sm:pt-36">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-white">
                {t['pricing.title']}
              </h1>
              <p className="mt-8 text-sm sm:text-base text-gray-500">{t['pricing.vat']}</p>

            <div className="mt-6 flex items-center justify-center">
                <div className="relative inline-flex items-center">
                  <div className="inline-flex items-center justify-center bg-white/5 rounded-lg p-0.5 border border-white/10">
                    <button
                      onClick={() => setBilling('monthly')}
                      className={clsx(
                        'px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors',
                        billing === 'monthly' ? 'bg-white/15 text-white' : 'text-gray-300 hover:text-white'
                      )}
                    >
                      {t['pricing.toggle.monthly']}
                    </button>
                    <button
                      onClick={() => setBilling('yearly')}
                      className={clsx(
                        'px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors',
                        billing === 'yearly' ? 'bg-white/15 text-white' : 'text-gray-300 hover:text-white'
                      )}
                    >
                      {t['pricing.toggle.yearly']}
                    </button>
                  </div>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center rounded-lg bg-white/10 px-3 py-1.5 text-xs text-gray-200 whitespace-nowrap">
                    {badgeText}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex sm:hidden justify-center">
                <span className="inline-flex items-center rounded-lg bg-white/10 px-3 py-1.5 text-xs text-gray-200">
                  {badgeText}
                </span>
              </div>
            </div>

            {/* Plan grid */}
            <div className="mb-10 sm:mb-20 mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
              {PLANS.map((plan) => {
                const priceValue = plan.price[billing]
                const isFree = priceValue === 0
                  const isKo = lang === 'ko'
                  const displayName = isKo ? plan.nameKo : plan.nameEn
                  const displayDesc = isKo ? plan.descKo : plan.descEn
                  const displayCta = isKo ? plan.ctaKo : plan.ctaEn
                  const displayFeatures = isKo ? plan.featuresKo : plan.featuresEn
                return (
                  <article key={plan.id} className={clsx("relative rounded-2xl h-full", plan.highlight && "z-10") }>
                    {plan.highlight && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20">
                        <span className="inline-flex items-center rounded-full bg-[linear-gradient(90deg,rgba(99,102,241,0.9),rgba(0,160,255,0.9))] px-3 py-1 text-[10px] sm:text-xs font-bold text-white">
                          {lang==='ko' ? '가장 인기있는 요금제' : 'Most popular'}
                        </span>
                      </div>
                    )}
                    <GlowRingWrapper variant="primary">
                      <div className={clsx(
                        "group rounded-2xl backdrop-blur-md p-7 sm:p-8 border transition-colors h-full flex flex-col min-h-[30rem] sm:min-h-[28rem]",
                        plan.highlight
                          ? "bg-white/10 border-[rgba(93,52,221,0.6)] shadow-[0_12px_48px_-12px_rgba(93,52,221,0.45)] ring-1 ring-[rgba(93,52,221,0.5)] transform-gpu scale-[1.02] sm:scale-[1.04]"
                          : "bg-white/5 border-[rgba(93,52,221,0.18)] hover:border-[rgba(93,52,221,0.28)]"
                      )}>
                        <div
                          className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
                          style={{
                            background:
                              'radial-gradient(ellipse 85% 110% at 50% -15%, rgba(93, 52, 221, 0.18), rgba(93, 52, 221, 0.08) 45%, transparent 80%)',
                          }}
                        />
                        <div
                          className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              'radial-gradient(ellipse 85% 110% at 50% -15%, rgba(93, 52, 221, 0.28), rgba(93, 52, 221, 0.16) 45%, transparent 80%)',
                          }}
                        />
                    {/* 추천 배지 제거 */}

                    <div className="relative z-[1] space-y-3 bg-">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{displayName}</span>
                      </div>
                      {/* 설명을 제목 바로 아래로 */}
                      <p className="text-sm leading-relaxed text-gray-500">{displayDesc}</p>
                      {/* 가격: 숫자 뒤에 단위(₩/월)를 작고 회색으로 */}
                      <div className="flex items-end justify-start gap-2">
                        <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-none sm:-mb-[7px]">
                          {isFree ? '0' : `${priceValue.toLocaleString()}`}
                        </span>
                        <span className="text-sm text-gray-400 leading-none">₩{!isFree ? (isKo ? ' /월' : ' /mo') : ''}</span>
                      </div>
                      {plan.credits !== undefined && (
                        <div className="text-sm text-gray-300 mt-1">{plan.credits.toLocaleString()} {isKo ? '크레딧/월' : 'credits/mo'}</div>
                      )}

                      <div className="mt-5 order-3">
                        {plan.highlight ? (
                          <BasicButton href={plan.href} variant="primary">{displayCta}</BasicButton>
                        ) : (
                          <BasicButton href={plan.href} variant="outline">{displayCta}</BasicButton>
                        )}
                      </div>
                    </div>

                    <ul className="order-2 mt-5 space-y-2 text-sm text-gray-200 flex-1">
                       {displayFeatures.map((f) => (
                         <li key={f} className="flex items-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          className="h-4 w-4 text-slate-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                           {f}
                        </li>
                      ))}
                    </ul>

                      </div>
                    </GlowRingWrapper>
                  </article>
                )
              })}
            </div>
          </Container>
          {/* Team/Business callouts disabled per request */}
          {/**
          <div className="mt-12 sm:mt-16">
            <Container className="pb-20 sm:pb-36">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-md [box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
                  <h3 className="text-white text-xl font-semibold">{lang==='en' ? 'Collaboration gets easier the moment you start working together' : '같이 쓰는 순간, 팀 협업이 쉬워집니다'}</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {lang==='en' ? 'From project sharing to approval workflows. Unlock full team features starting from Standard plan.' : '프로젝트 공유, 승인 워크플로우까지. 스탠다드 이상에서 팀 협업 기능을 모두 활용해 보세요.'}
                  </p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-200">
                    <div className="space-y-2">
                      <p>• {lang==='en' ? 'Roles/Permissions · Invite members' : '역할/권한 · 멤버 초대'}</p>
                      <p>• {lang==='en' ? 'Template lock & guides' : '템플릿 잠금 및 가이드'}</p>
                      <p>• {lang==='en' ? 'Change history · Version restore' : '변경 이력 · 버전 복원'}</p>
                    </div>
                    <div className="space-y-2">
                      <p>• {lang==='en' ? 'Comments · Mentions · Notifications' : '댓글 · 멘션 · 알림'}</p>
                      <p>• {lang==='en' ? 'Approval/Release workflow' : '승인/배포 워크플로우'}</p>
                      <p>• {lang==='en' ? 'Baseline security/Audit logs' : '기본 보안/감사 로그'}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <BasicButton href="/#signup" variant="primary">{lang==='en' ? 'Start free for 2 weeks' : '2주 무료로 시작'}</BasicButton>
                  </div>
                </div>

                <div id="contact" className="rounded-2xl bg-white/5 p-6 backdrop-blur-md [box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
                  <h3 className="text-white text-xl font-semibold">{lang==='en' ? 'Enterprise' : '엔터프라이즈'}</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {lang==='en' ? 'Advanced security and dedicated support for large organizations and regulated industries.' : '대규모 조직, 규제 산업을 위한 확장 보안과 전용 지원을 제공합니다.'}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-200">
                    <li>• {lang==='en' ? 'Dedicated SLA and support channels' : '전용 SLA, 기술지원 채널'}</li>
                    <li>• {lang==='en' ? 'SSO, user provisioning (SCIM)' : 'SSO, 사용자 프로비저닝(SCIM)'}</li>
                    <li>• {lang==='en' ? 'Data retention policy, compliance' : '데이터 보존 정책, 컴플라이언스'}</li>
                  </ul>
                  <div className="mt-5">
                    <BasicButton href="mailto:contact@duyo.ai" variant="outline">{lang==='en' ? 'Contact Sales' : '영업팀에 문의하기'}</BasicButton>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          */}
        </section>
      </main>
      <Footer />
    </>
  )
}


