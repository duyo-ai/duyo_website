'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'
import clsx from 'clsx'

type BillingCycle = 'monthly' | 'yearly'

type Plan = {
  id: string
  name: string
  description: string
  price: { monthly: number; yearly: number }
  cta: string
  href: string
  features: string[]
  highlight?: boolean
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: '프리',
    description: '가볍게 시작하는 개인 프로젝트용',
    price: { monthly: 0, yearly: 0 },
    cta: '무료로 시작',
    href: '/#signup',
    features: [
      '월 3개의 프로젝트',
      '기본 템플릿 및 프리셋',
      '워터마크 포함 내보내기',
    ],
  },
  {
    id: 'lite',
    name: '라이트',
    description: '개인 크리에이터를 위한 기능 모음',
    price: { monthly: 7, yearly: 5.83 },
    cta: '시작하기',
    href: '/#signup',
    features: [
      '무제한 프로젝트',
      '템플릿 커스텀',
      '워터마크 제거',
      '기본 분석 리포트',
    ],
  },
  {
    id: 'standard',
    name: '스탠다드',
    description: '팀의 협업을 위한 추천 플랜',
    price: { monthly: 12, yearly: 10.83 },
    cta: '시작하기',
    href: '/#signup',
    highlight: true,
    features: [
      '팀 멤버 5인 포함',
      '역할/권한 관리',
      '프리미엄 템플릿 전체',
      '버전 관리 및 승인 워크플로우',
      '우선 지원',
    ],
  },
  {
    id: 'business',
    name: '비즈니스',
    description: '브랜드 규모에 맞춘 고급 협업 및 보안',
    price: { monthly: 27, yearly: 24.17 },
    cta: '영업 문의',
    href: '#contact',
    features: [
      '무제한 멤버',
      'SSO / 감사 로그',
      '워크스페이스 정책 관리',
      '전용 SLA & 기술지원',
    ],
  },
]

function BasicButton({ href, children, variant = 'primary' as 'primary' | 'outline' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'outline' }) {
  const base = 'block w-full rounded-xl px-4 py-2.5 text-center font-semibold transition-colors duration-300 ease-out'
  const cls =
    variant === 'primary'
      ? 'bg-purple-200/10 text-white backdrop-blur-md  hover:bg-white/20'
      : 'bg-purple-200/10 text-white backdrop-blur-md hover:bg-white/20'
  return (
    <a href={href} className={`${base} ${cls}`}>{children}</a>
  )
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>('monthly')

  const badgeText = '연간 결제 2개월 할인'

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
              <h1 className="text-3xl sm:text-4xl md:text-4xl font-semibold tracking-tight text-white">
                간결한 요금제, 팀의 성장에 맞춰 확장됩니다
              </h1>
              <p className="mt-4 text-sm sm:text-base text-gray-400">
                모든 가격은 VAT 별도입니다.
              </p>

              <div className="mt-6 flex items-center justify-center">
                <div className="relative inline-flex items-center">
                  <div className="inline-flex items-center justify-center bg-white/10 rounded-lg p-0.5">
                    <button
                      onClick={() => setBilling('monthly')}
                      className={clsx(
                        'px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors',
                        billing === 'monthly' ? 'bg-white/15 text-white' : 'text-gray-300 hover:text-white'
                      )}
                    >
                      월간
                    </button>
                    <button
                      onClick={() => setBilling('yearly')}
                      className={clsx(
                        'px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors',
                        billing === 'yearly' ? 'bg-white/15 text-white' : 'text-gray-300 hover:text-white'
                      )}
                    >
                      연간
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
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {PLANS.map((plan) => {
                const priceValue = plan.price[billing]
                const isFree = priceValue === 0
                return (
                  <article
                    key={plan.id}
                    className={clsx(
                      'relative rounded-2xl bg-white/5 backdrop-blur-md p-7 sm:p-8]'
                      , plan.highlight && ''
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
                      style={{
                        background: `rgba(93, 52, 221, 0.05)`,
                      }}
                    />
                    {/* 추천 배지 제거 */}

                    <div className="relative z-[1] space-y-3 bg-">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-gray-300 text-sm font-medium">{plan.name}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                          {isFree ? '무료' : `$${priceValue.toFixed(2)}`}
                        </span>
                        {!isFree && (
                          <span className="text-base text-gray-400">/mo</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed">{plan.description}</p>
                    </div>

                    <div className="mt-4">
                      {plan.highlight ? (
                        <BasicButton href={plan.href} variant="primary">{plan.cta}</BasicButton>
                      ) : (
                        <BasicButton href={plan.href} variant="outline">{plan.cta}</BasicButton>
                      )}
                    </div>

                    <ul className="mt-5 space-y-2 text-sm text-gray-200">
                      {plan.features.map((f) => (
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

                    
                  </article>
                )
              })}
            </div>
          </Container>
          {/* Team/Business callouts inspired by reference layout */}
          <div className="mt-12 sm:mt-16">
          <Container className="pb-20 sm:pb-36">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-md [box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
                <h3 className="text-white text-xl font-semibold">같이 쓰는 순간, 팀 협업이 쉬워집니다</h3>
                <p className="mt-2 text-sm text-gray-400">
                  프로젝트 공유, 승인 워크플로우까지. 스탠다드 이상에서 팀 협업 기능을 모두 활용해 보세요.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-200">
                  <div className="space-y-2">
                    <p>• 역할/권한 · 멤버 초대</p>
                    <p>• 템플릿 잠금 및 가이드</p>
                    <p>• 변경 이력 · 버전 복원</p>
                  </div>
                  <div className="space-y-2">
                    <p>• 댓글 · 멘션 · 알림</p>
                    <p>• 승인/배포 워크플로우</p>
                    <p>• 기본 보안/감사 로그</p>
                  </div>
                </div>
                <div className="mt-5">
                  <BasicButton href="/#signup" variant="primary">2주 무료로 시작</BasicButton>
                </div>
              </div>

              <div id="contact" className="rounded-2xl bg-white/5 p-6 backdrop-blur-md [box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
                <h3 className="text-white text-xl font-semibold">엔터프라이즈</h3>
                <p className="mt-2 text-sm text-gray-400">
                  대규모 조직, 규제 산업을 위한 확장 보안과 전용 지원을 제공합니다.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-200">
                  <li>• 전용 SLA, 기술지원 채널</li>
                  <li>• SSO, 사용자 프로비저닝(SCIM)</li>
                  <li>• 데이터 보존 정책, 컴플라이언스</li>
                </ul>
                <div className="mt-5">
                  <BasicButton href="mailto:contact@duyo.ai" variant="outline">영업팀에 문의하기</BasicButton>
                </div>
              </div>
            </div>
          </Container>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}


