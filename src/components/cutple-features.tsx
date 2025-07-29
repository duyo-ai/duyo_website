'use client'

import { BentoCard } from './bento-card'
import { Container } from './Container'
import { Heading, Subheading } from './text'
import { Keyboard } from './keyboard'
import { LogoCluster } from './logo-cluster'
import { Map } from './map'

export function CutpleFeatures() {
  return (
    <Container className="pt-32">
      <Subheading>기능</Subheading>
      <Heading
        as="h3"
        className="max-w-3xl bg-gradient-to-br from-black/90 to-black/80 bg-clip-text text-transparent dark:from-white dark:to-white/40"
      >
        영상 제작의 모든 과정을 AI가 자동화합니다.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Script"
          title="고품질 대본 자동 생성"
          description="실제 바이럴 포맷 구조에 기반하여 키워드만으로 완성도 높은 대본을 생성합니다. 더 이상 빈 화면을 바라보며 고민할 필요가 없습니다."
          graphic={
            <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/ghyfFEStl6BNusZl0ZQd5r7JpM.png)] object-fill" />
          }
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="AI Voice & Image"
          title="감정까지 담는 AI 목소리와 이미지"
          description="문의 감정에 따라 목소리 톤을 조절하고, 문맥에 맞는 이미지를 자동 생성하여 배치합니다. Typecast, 볼리, ElevenLabs를 통합 지원합니다."
          graphic={
            <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/7CJtT0Pu3w1vNADktNltoMFC9J4.png)] object-fill" />
          }
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Easy Drag"
          title="드래그 한 번으로 완성"
          description="스톡 이미지나 웹상의 이미지, GIF를 드래그 한 번으로 바로 삽입할 수 있습니다. 복잡한 편집 과정 없이 즉시 적용됩니다."
          graphic={
            <div className="flex size-full pl-10 pt-10">
              <Keyboard highlighted={['LeftCommand', 'LeftShift', 'D']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Auto Subtitle"
          title="자동 자막 삽입"
          description="음성을 자동으로 분석하여 정확한 자막을 생성하고 삽입합니다. 올인원 프로세스로 별도 작업이 필요 없습니다."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Auto Upload"
          title="멀티 플랫폼 동시 업로드"
          description="완성된 영상을 유튜브 쇼츠, 인스타 릴스, 틱톡에 동시 업로드하고, 동적 레이아웃으로 시청 지속력을 높입니다."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
} 