import Image from 'next/image'

import { Container } from '@/components/Container'
import avatarImage1 from '@/images/avatars/avatar-1.png'
import avatarImage2 from '@/images/avatars/avatar-2.png'
import avatarImage3 from '@/images/avatars/avatar-3.png'
import avatarImage4 from '@/images/avatars/avatar-4.png'
import avatarImage5 from '@/images/avatars/avatar-5.png'

const testimonials = [
  [
    {
      content:
        '처음에는 반신반의했는데, 정말 5분 만에 완성도 높은 영상이 나왔습니다. 기존에 편집하던 시간을 생각하면 하루가 48시간이 된 기분이에요. 특히 대본 생성 기능이 정말 놀라워서, 제가 쓰던 스타일까지 학습해서 자연스러운 썰을 만들어줍니다. 이제 아이디어만 있으면 바로 영상으로 만들 수 있어서 콘텐츠 제작 속도가 10배는 빨라졌어요.',
      author: {
        name: '김태현',
        role: '구독자 8만 썰 유튜버',
        image: avatarImage1,
      },
    },
    {
      content:
        'AI가 생성한 이미지라고는 믿기 힘들 정도로 감정과 분위기를 정확히 담아냅니다. 특히 브랜드 톤앤매너에 맞는 이미지를 일관성 있게 만들어주는 게 가장 만족스러워요. 기존에 디자이너와 커뮤니케이션하며 수정 요청하던 시간이 완전히 사라졌습니다. 마케팅 캠페인용 숏폼을 대량으로 제작할 때 특히 유용하고, 퀄리티도 전혀 떨어지지 않아서 클라이언트들도 매우 만족해합니다.',
      author: {
        name: '정수영',
        role: '브랜드 마케팅 디렉터',
        image: avatarImage4,
      },
    },
  ],
  [
    {
      content:
        '가장 놀라운 건 이미지가 자동으로 맥락을 맞춰준다는 점입니다. 텍스트만 입력해도 스토리 흐름에 맞는 적절한 이미지를 배치해주고, 감정의 기복까지 시각적으로 표현해줘서 시청자들의 몰입도가 확실히 높아졌어요. 예전에는 스톡 이미지 찾느라 시간을 많이 썼는데, 이제는 그런 고민 없이 창작에만 집중할 수 있게 되었습니다. 특히 추상적인 개념도 이미지로 잘 표현해주는 게 신기해요.',
      author: {
        name: '김민수',
        role: '교육 콘텐츠 크리에이터',
        image: avatarImage5,
      },
    },
    {
      content:
        '유튜브 시작한 지 3개월 된 완전 초보인데, 이 툴 덕분에 하루에 3편씩도 무리 없이 제작하고 있어요. 처음에는 대본 쓰는 것부터 막막했는데, AI가 제안해주는 스토리 구조를 보고 많이 배웠습니다. 목소리 톤이나 속도도 자동으로 조절해줘서 마치 성우가 읽어주는 것 같아요. 구독자도 벌써 5천 명을 넘어서고, 댓글에서 퀄리티를 칭찬해주는 분들이 많아서 정말 뿌듯합니다.',
      author: {
        name: '이지원',
        role: '신입 유튜버',
        image: avatarImage2,
      },
    },
  ],
  [
    {
      content:
        '기획 단계 없이 바로 시작해도 완성도 높은 영상이 나오는 게 제일 편합니다. 회사에서 급하게 프로모션 영상이 필요할 때 정말 유용해요. 키워드 몇 개만 입력하면 스토리보드부터 최종 영상까지 자동으로 완성되니까, 마케팅 캠페인의 속도가 완전히 달라졌습니다. 특히 A/B 테스트용으로 여러 버전을 빠르게 만들 수 있어서 데이터 기반 마케팅을 할 때 정말 도움이 많이 됩니다.',
      author: {
        name: '박지영',
        role: '마케팅 매니저',
        image: avatarImage3,
      },
    },
    {
      content:
        '기존에 유료 작가에게 맡겼던 대본보다 훨씬 더 자연스럽고 매력적인 스토리가 나와서 깜짝 놀랐어요. AI가 최신 트렌드와 바이럴 요소까지 고려해서 대본을 짜주니까, 조회수도 이전보다 평균 3배 이상 늘었습니다. 특히 감정적인 몰입도가 높은 스토리를 만들어주는 능력이 정말 뛰어나요. 이제는 작가비 예산을 다른 곳에 투자할 수 있게 되어서 채널 운영에 여유가 생겼습니다.',
      author: {
        name: '이현수',
        role: '유튜브 채널 운영자 (구독자 15만)',
        image: avatarImage1,
      },
    },
  ],
]

function QuoteIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  )
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="relative   z-1"
    >
      <div
        className="absolute inset-0 blur-xl h-full"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(30, 20, 60, 0) 20.79%, rgba(60, 50, 80, 0.15) 40.92%, rgba(40, 30, 70, 0) 70.35%)",
        }}
      ></div>
      <Container>
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none px-4 sm:px-0">
          <h2 className="font-medium mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tighter text-transparent mb-6 sm:mb-10">
            실제 사용자들의{' '}<br/>
            <span className="bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent block mt-3 sm:mt-6">
              생생한 후기
            </span>
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg mx-auto max-w-2xl text-gray-300">
            전국의 크리에이터들이 이미 경험하고 있는 변화를 확인해보세요. <br className="hidden sm:block"/>간단한 키워드 입력만으로도 놀라운 결과를 만들어내고 있습니다.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-8 sm:mt-16 lg:mt-20 grid max-w-2xl grid-cols-1 gap-4 sm:gap-6 lg:gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-xl sm:rounded-2xl bg-transparent transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] p-4 sm:p-6 shadow-xl">
                      <QuoteIcon className="absolute left-4 sm:left-6 top-4 sm:top-6 fill-slate-950 w-16 h-12 sm:w-20 sm:h-15" />
                      <blockquote className="relative">
                        <p className="text-sm sm:text-base lg:text-lg tracking-tight text-gray-100 pt-8 sm:pt-6">
                          {testimonial.content}
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-4 sm:mt-6 flex items-center justify-between border-t border-slate-100/10 pt-4 sm:pt-6">
                        <div>
                          <div className="font-display text-sm sm:text-base text-gray-100">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-xs sm:text-sm text-slate-500">
                            {testimonial.author.role}
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <Image
                            className="h-10 w-10 sm:h-14 sm:w-14 object-cover"
                            src={testimonial.author.image}
                            alt=""
                            width={56}
                            height={56}
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      {/* <div className='bg-transparent bg-radial-faded mask-radial-faded pointer-events-none relative z-[-1] my-[-12.8rem] h-[60rem] overflow-hidden [--color:#7877C6] before:absolute before:inset-0 before:bg-radial-faded before:opacity-[0.4] after:absolute after:top-1/2 after:-left-1/2 after:h-[142.8%] after:w-[200%] after:rounded-[50%] after:border-t after:border-[rgba(120,119,198,0.4)] after:bg-black'>
    
      </div> */}
      </Container>
    </section>
  )
}
