"use client"
import { Container } from '@/components/Container'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'
import avatarImage1 from '@/images/avatars/avatar-1.png'
import avatarImage2 from '@/images/avatars/avatar-2.png'
import avatarImage3 from '@/images/avatars/avatar-3.png'
import avatarImage4 from '@/images/avatars/avatar-4.png'
import avatarImage5 from '@/images/avatars/avatar-5.png'

const testimonialsKo = [
  [
    {
      content:
        '가격대가 좀 나가는 편이다 보니 오래 고민하고 구매했습니다! 그동안 가격도 약간 변동이 있었네요 ㅎㅅㅎ..! 아직은 제 마음처럼 뚝딱 만들긴 어렵지만, 기능들도 너무 신박하고, 만드는 재미도 있어서 얼른 적응해서 하루에 여러 개 뽑을 수 있게 연습해보려고 해요! 친절하게 알려주셔서 감사합니다! 앞으로도 잘 부탁드려요~!',
      author: {
        name: 'DailyHaon',
        role: '유튜버',
        image: avatarImage1,
      },
    },
    {
      content:
        '유튜브를 운영하실 분들이라면 이 프로그램을 놓치신다면 정말 땅을 치고 후회할 것입니다. 정말 혼자만 알고 싶고 알려주고 싶지 않지만 이 프로그램은 주변 사람들에게 꼭 알려주고 싶습니다 (제 경쟁사만 빼고..ㅎㅎ). 친절한 상담과 신속한 대응, 이해가 쏙쏙 되는 설명과 직관적인 프로그램 너무 감사드리고, 정말 큰 회사 되시길 바랍니다. 감사합니다.',
      author: {
        name: 'CreatorJin',
        role: '유튜버',
        image: avatarImage4,
      },
    },
    {
      content:
        '프로그램을 보면서 감탄이 나왔습니다. 아주 잘 활용할 수 있어 좋습니다. 열공해서 최고의 성과를 얻도록 하겠습니다. 좋은 프로그램 대단히 감사합니다.',
      author: {
        name: '영상장인 꾸리',
        role: '유튜버',
        image: avatarImage1,
      },
    },
  ],
  [
    {
      content:
        '우선 빠른 피드백과 구매 후 응대, 그리고 추후에 구매자들의 의견을 반영한 프로그램 업데이트만 보더라도, 구매 후 연락이 느리고 처음과 다른 답변을 하는 곳들과는 다릅니다. 프로그램도 당연히 사용자의 의견을 반영해 업데이트하고 있으니 사용하기 편리하고, 이후에 더 좋아질 것 같다는 생각이 강하게 듭니다. 여긴 리뷰 이벤트도 없었던 것 같은데, 내돈내산 리뷰네요ㅎㅎ 수익만 잘 나고 성과만 잘 난다면, 그때 다시 수정해서 추가 리뷰를 남겨보겠습니다.',
      author: {
        name: 'Shin’s Media Lab',
        role: '유튜버',
        image: avatarImage2,
      },
    },
    {
      content:
        '신속하고 친절한 답변에 정말 감사드립니다. 늦은 시간까지 많은 부분을 세심하게 공유해 주신 덕분에 궁금했던 점들을 명확하게 해결할 수 있었습니다. 앞으로도 궁금한 점에 대해 피드백을 주신다고 하니 큰 기대가 됩니다. 덕분에 더욱 열심히 노력해야겠다는 생각이 듭니다. 다시 한 번 감사드리며, 앞으로도 많은 도움 부탁드립니다.',
      author: {
        name: '하루기록소',
        role: '유튜버',
        image: avatarImage3,
      },
    },
    
  ],
  [
    {
      content:
        '쇼츠는 소재가 더 중요하다고 생각해요. 영상 편집에 들어가는 시간을 이 프로그램을 통해 획기적으로 줄일 수 있어 넘 만족합니다. 대응도 친절하고, 앞으로의 발전 계획과 방향성도 너무 훌륭한 것 같아요.',
      author: {
        name: '유튜버 ‘리얼크리에이트’',
        role: '고객 리뷰',
        image: avatarImage4,
      },
    },
    {
      content:
        '저는 영상 제작을 할 줄 아는 사람인데, 빠른 숏츠 제작을 위하여 구매하게 되었습니다. 프로그램도 깔끔하고, 덕분에 제작 시간이 상당히 줄어들었습니다. 감사합니다.',
      author: {
        name: '유튜버 ‘Min Film’',
        role: '고객 리뷰',
        image: avatarImage5,
      },
    },
    {
      content:
        '처음에는 어느 정도의 프로그램인지 고민을 많이 한 끝에 결제를 진행하였는데, 늦은 시간에도 친절한 설명과 안내를 받게 되었습니다. 이 프로그램은 쉬운 인터페이스 덕분에 초보자들도 복잡한 과정 없이 고퀄리티 콘텐츠를 쉽게 제작할 수 있을 것 같습니다. 안내를 받을 때 다양한 아이디어도 얻고, 피드백도 가능하셔서 그 점 또한 매우 마음에 드는 부분입니다. 전반적으로, 이 프로그램은 유튜브 쇼츠를 시작하고자 하는 누구에게나 강력히 추천할 만한 유용한 프로그램입니다.',
      author: {
        name: '소소한쇼츠',
        role: '유튜버',
        image: avatarImage5,
      },
    },
  ],
]

const testimonialsEn = [
  [
    {
      content:
        'I hesitated for a while because of the price, but finally decided to purchase. It’s not a one-click magic yet, but the features are genuinely innovative and fun to use. I’ll practice to pump out multiple Shorts a day soon. Thanks for the kind guidance—looking forward to using it more!',
      author: {
        name: 'DailyHaon',
        role: 'YouTuber',
        image: avatarImage1,
      },
    },
    {
      content:
        'If you plan to run a YouTube channel, you would regret missing this program. Honestly I want to keep it to myself, but I still recommend it to people around me (except my competitors 😄). Thanks for the friendly support, quick responses, clear explanations, and an intuitive product. Wishing you massive growth—thank you!',
      author: {
        name: 'CreatorJin',
        role: 'YouTuber',
        image: avatarImage4,
      },
    },
    {
      content:
        'I was amazed while using the program. It’s incredibly practical. I’ll study hard and aim for the best results. Thank you for building such a great product.',
      author: {
        name: 'Video Artisan Kkuri',
        role: 'YouTuber',
        image: avatarImage1,
      },
    },
  ],
  [
    {
      content:
        'Fast feedback, responsible support after purchase, and updates that reflect user feedback—this team is different. The product is already convenient and will only get better. This is a genuine review without any event. If my results go well, I’ll come back with an updated review.',
      author: {
        name: 'Shin’s Media Lab',
        role: 'YouTuber',
        image: avatarImage2,
      },
    },
    {
      content:
        'Thank you for the quick and kind responses. Even late at night, you shared details thoroughly and cleared up my questions. I look forward to continued feedback and support—it motivates me to work harder. Thanks again and please keep helping!',
      author: {
        name: 'Haru Records',
        role: 'YouTuber',
        image: avatarImage3,
      },
    },
  ],
  [
    {
      content:
        'In Shorts, the topic matters most. This program drastically reduces editing time, which I love. Support is friendly, and the roadmap and direction look excellent.',
      author: {
        name: 'RealCreate',
        role: 'YouTuber',
        image: avatarImage4,
      },
    },
    {
      content:
        'I already know video production, and I bought this for fast Shorts creation. The app is clean, and my production time has dropped significantly. Thank you!',
      author: {
        name: 'Min Film',
        role: 'YouTuber',
        image: avatarImage5,
      },
    },
    {
      content:
        'After much consideration, I purchased—and received kind guidance even late at night. Thanks to the simple UI, even beginners can create high-quality content without complex steps. I also got lots of ideas and feedback during guidance. Overall, I highly recommend it to anyone starting YouTube Shorts.',
      author: {
        name: 'Sosohan Shorts',
        role: 'YouTuber',
        image: avatarImage5,
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
  const { lang } = useLang()
  const isKo = lang === 'ko'
  const t = dictionaries[lang]
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="relative bg-slate-950 z-1 pt-20 "
    >
      <Container>
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-6xl text-white leading-tight mb-6">
              {t['testimonials.title']}{' '}<br /> 
              <span className="font-bold bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent">
                {t['testimonials.subtitle']}
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
              {t['testimonials.desc']}
            </p>
          </div>
        <ul
          role="list"
          className="mx-auto mt-8 sm:mt-16 lg:mt-20 grid max-w-2xl grid-cols-1 gap-4 sm:gap-6 lg:gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {(isKo ? testimonialsKo : testimonialsEn).map((column, columnIndex) => (
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
                        <div 
                          className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-slate-50 ring-1 ring-inset ring-white/10 overflow-hidden flex-shrink-0"
                          style={{
                            backgroundImage: `url(${testimonial.author.image.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '50%'
                          }}
                        />
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
