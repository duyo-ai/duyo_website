import { GlareCard } from '@/components/Glare'
import React from 'react'

export default function FUIFeatureSectionWithCards() {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
      title: '빠른 생성',
      desc: '키워드 입력 후 5분 이내에 완성된 영상을 제작할 수 있습니다. 대본부터 편집까지 모든 과정이 자동화되어 있습니다.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
      title: '성과 분석',
      desc: '생성된 영상의 조회수, 참여도, 댓글 등을 실시간으로 분석하여 더 나은 콘텐츠 제작을 도와드립니다.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
      title: '안전한 보안',
      desc: '엔터프라이즈급 보안 시스템으로 개인정보와 콘텐츠를 안전하게 보호합니다. 모든 데이터는 암호화되어 저장됩니다.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
      title: '맞춤형 제작',
      desc: '브랜드 톤앤매너와 개인의 스타일에 맞춘 영상을 제작합니다. 템플릿부터 완전 커스텀까지 자유롭게 선택하세요.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      title: '검증된 안전성',
      desc: 'AI 생성 콘텐츠의 저작권 문제 없이 안전하게 상업적 이용이 가능합니다. 모든 콘텐츠가 원본성을 보장합니다.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      ),
      title: '유연한 활용',
      desc: '다양한 플랫폼과 포맷에 맞는 영상을 동시에 생성합니다. 유튜브, 인스타그램, 틱톡 등 어디든 활용 가능합니다.',
    },
  ]

  return (
    <section className="relative py-14 z-20 rounded-xs">
      <img
        src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
        alt=""
        className="z-2 absolute -top-0 left-10 rounded-xs"
      />
      <div className="mx-auto max-w-screen-xl px-4 text-gray-400 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter text-gray-200 sm:text-4xl md:text-5xl">
              {/* Let's help power your SaaS */}
            </h3>
            {/* <p className="mt-3 font-geist text-gray-200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              congue, nisl eget molestie varius, enim ex faucibus purus.
            </p> */}
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px] rounded-xs"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)',
            }}
          ></div>
        </div>
        {/* <hr className="mx-auto inivisible z-20 h-[0.2px] w-1/2 bg-whi" /> */}
        <div className="relative mt-[24rem] z-20">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <GlareCard key={idx}>
                <li
                  key={idx}
                  className="group z-20 transform-gpu space-y-4 rounded-xl bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/50 p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 backdrop-blur-sm"
                >
                  <div className="w-fit p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-105">
                    <div className="text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-geist text-lg font-semibold tracking-tight text-slate-200 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">{item.desc}</p>
                </li>
              </GlareCard>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
