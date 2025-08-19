'use client'

import { Container } from '@/components/Container'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'

const FooterInfoItem = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="flex gap-2 text-sm">
      <span className="font-semibold">{name}</span>
      <span className="font-normal">{value}</span>
    </div>
  )
}

export function Footer() {
  const { lang } = useLang()
  const t = dictionaries[lang]
  return (
    <footer className="rounded-xs relative border-t border-white/10">
      <Container>
        <div className="lg:py- py-5 sm:py-5" />

        <div className="grid grid-cols-1 gap-12 text-gray-200 lg:grid-cols-2 lg:items-end">
          <div className="space-y-6">
            {/* 가벼운 정적 로고 (모바일 최적화) */}
            <img
              src="/logo_white.svg"
              alt="Cutple"
              width={120}
              height={32}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto sm:h-14"
            />
            <div>
              <h3 className="mb-2 font-semibold">
                {lang === 'ko'
                  ? t['footer2.customer.title']
                  : t['footer2.customer.title']}
              </h3>
              <p className="text-sm">
                {t['footer2.customer.email']}&nbsp;&nbsp; contact@cutple.ai
              </p>
              <p className="text-sm">
                {t['footer2.customer.hours']}&nbsp;&nbsp; 09:00 ~ 21:00
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-end gap-8 self-end p-4">
            <div className="flex gap-4 text-sm font-semibold text-gray-400">
              <a href="/policy/terms">이용약관</a>
              <a href="/policy/privacy">개인정보처리방침</a>
            </div>
            <div className="flex flex-col items-end justify-end gap-4">
              <h3 className="font-semibold">{t['footer2.company.title']}</h3>
              {/* <div className="grid grid-cols-1 justify-end gap-x-8 gap-y-1 text-end sm:grid-cols-2"> */}
              <div className="flex flex-col justify-end gap-1 text-end">
                <div className="flex justify-end gap-3">
                  <FooterInfoItem
                    name={t['footer2.company.company']}
                    value="두요"
                  />
                  <FooterInfoItem
                    name={t['footer2.company.ceo']}
                    value="김진우"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <FooterInfoItem
                    name={t['footer2.company.address']}
                    value="서울 동작구 상도로55길 6"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <FooterInfoItem
                    name={t['footer2.company.business']}
                    value="826-08-02196"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <FooterInfoItem
                    name={t['footer2.company.privacy']}
                    value="김진우"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 sm:py-10">
          <p className="text-center text-xs text-gray-400 sm:text-sm">
            {t['footer2.copyright']}
          </p>
        </div>
      </Container>
    </footer>
  )
}
