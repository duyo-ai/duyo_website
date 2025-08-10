import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

export function Footer() {
  return (
    <footer className="relative rounded-xs border-t border-white/10">
      <Container>
        <div className="py-8 sm:py-12 lg:py-16">
          <nav className="text-sm" aria-label="사이트 링크">
            <div className="flex justify-end gap-x-6 flex-wrap text-gray-300">
              <Link href="#">회사소개</Link>
              <Link href="#">이용약관</Link>
              <Link href="#">개인정보처리방침</Link>
              <Link href="#">이용안내</Link>
            </div>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-gray-200">
          <div className="space-y-6">
            <Logo />
            <div>
              <h3 className="font-semibold mb-2">고객센터 정보</h3>
              <p className="text-sm">상담/주문전화&nbsp;&nbsp; 070-7666-9891</p>
              <p className="text-sm">상담/주문 이메일&nbsp;&nbsp; contact@duyo.ai</p>
              <p className="text-sm">CS운영시간&nbsp;&nbsp; 09:00 ~ 21:00</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">결제 정보</h3>
              <p className="text-sm">무통장 계좌정보</p>
              <p className="text-sm">토스뱅크&nbsp;&nbsp; 100045939891&nbsp;&nbsp; 김진우</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">쇼핑몰 기본정보</h3>
            <p className="text-sm">상호명&nbsp; 두오&nbsp;&nbsp; 대표자명&nbsp; 김진우</p>
            <p className="text-sm">사업장 주소&nbsp; 06978 서울 동작구 상도로55길 6 304-2호</p>
            <p className="text-sm">대표 전화&nbsp; 070-7666-9891&nbsp;&nbsp; 사업자 등록번호&nbsp; 826-08-02196</p>
            <p className="text-sm">통신판매업 신고번호&nbsp; 2023-서울관악-2318 [사업자정보확인]</p>
            <p className="text-sm">개인정보보호책임자&nbsp; 김진우</p>
          </div>
        </div>

        <div className="py-6 sm:py-10">
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Copyright &copy; 두요(DUYO) | 두고두고 요긴한 업무 자동화 솔루션. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
