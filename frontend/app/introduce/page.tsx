'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Introduce.module.css';

const governmentProjects = [
  { icon: 'medal-star', title: '기업 홈페이지', shortTitle: '기업 홈페이지' },
  { icon: 'medal-star', title: '브랜드 사이트', shortTitle: '브랜드 사이트' },
  { icon: 'badge-star', title: '랜딩 페이지', shortTitle: '랜딩 페이지' },
  { icon: 'medal-number', number: '1', title: '커뮤니티 플랫폼', shortTitle: '커뮤니티' },
  { icon: 'badge-star-banner', title: '매칭 서비스', shortTitle: '매칭 서비스' },
  { icon: 'medal-number', number: '1', title: '예약 시스템', shortTitle: '예약 시스템' },
  { icon: 'trophy', title: 'B2B SaaS', shortTitle: 'B2B SaaS' },
  { icon: 'trophy', title: '업무 자동화 시스템', shortTitle: '업무 자동화' },
  { icon: 'flags', title: 'MVP 개발', shortTitle: 'MVP 개발' },
  { icon: 'star', title: 'QA 테스트 서비스', shortTitle: 'QA 테스트' },
];

const faqItems = [
  {
    id: 1,
    question: '아이디어만 있는데 개발이 가능한가요?',
    answer: [
      '가능합니다.',
      '아이디어 단계에서도 서비스 구조 설계와 기능 정의부터 함께 시작합니다.',
      'MVP 제작까지 전 과정을',
      'FreakMakers가 함께 진행합니다.',
    ],
  },
  {
    id: 2,
    question: '개발 기간은 얼마나 걸리나요?',
    answer: [
      '프로젝트 규모에 따라 다르지만 일반적으로 다음과 같습니다.',
      '랜딩 페이지: 1~2주 / 웹사이트: 3~4주',
      '플랫폼 / SaaS: 2~4개월',
      '정확한 일정은 상담을 통해 안내해드리겠습니다.',
    ],
  },
  {
    id: 3,
    question: '외주 개발을 이미 진행했는데 QA만 맡길 수 있나요?',
    answer: [
      '가능합니다.',
      '외주 개발 이후 개발자 관점의 QA 테스트를 통해',
      'UI, 기능, API, 사용자 시나리오 테스트를 진행하고',
      'QA 리포트를 제공합니다.',
    ],
  },
  {
    id: 4,
    question: 'MVP 개발도 가능한가요?',
    answer: [
      '가능합니다.',
      '빠른 MVP 제작 → 시장 검증 → 기능 확장 방식으로 진행합니다.',
      '초기 MVP라도 향후 확장을 고려한 구조로 설계하여',
      '서비스가 성장해도 문제없는 시스템을 만들어 드립니다.',
    ],
  },
];

const testimonials = [
  {
    id: 1,
    image: '/testimonial-01.jpg',
    text: [
      '아이디어만 가지고 왔는데',
      '기획부터 개발까지 전부 함께해주셨어요.',
      '생각보다 훨씬 빠르게 서비스가 나왔습니다!',
      '정말 든든한 파트너입니다.',
    ],
    author: '스타트업 창업자',
  },
  {
    id: 2,
    image: '/testimonial-02.jpg',
    text: [
      '외주 개발 후 QA를 맡겼는데',
      '미처 발견하지 못한 버그를 전부 잡아주셨어요.',
      '리포트도 꼼꼼하게 작성해주셔서 감사합니다!',
    ],
    author: 'SaaS 서비스 운영자',
  },
  {
    id: 3,
    image: '/testimonial-03.jpg',
    text: ['MVP를 빠르게 만들어준 덕분에', '투자 유치에 성공했습니다.', '확장성 있는 구조 덕분에 지금도 잘 운영 중이에요.'],
    author: '플랫폼 서비스 대표님',
  },
];

const achievementItems = [
  {
    image: '/achievement-01.jpg',
    title:
      '기획부터 개발까지,<br> <span class="underline">원스톱으로 함께합니다.</span>',
    description:
      'FreakMakers는 아이디어 정리, 서비스 구조 설계, UI/UX 설계, 개발, 테스트, 배포까지 전 과정을 하나의 팀에서 진행합니다. 여러 팀을 조율할 필요 없이 한 곳에서 모든 것이 해결됩니다.',
  },
  {
    image: '/achievement-02.jpg',
    title:
      '완벽한 제품보다 빠른 실행.<br> <span class="underline">MVP 중심으로 개발합니다.</span>',
    description:
      '스타트업과 신규 서비스에 중요한 것은 빠른 실행과 검증입니다. FreakMakers는 빠르게 만들고, 빠르게 테스트하고, 빠르게 개선하는 MVP 중심 개발 방식을 사용합니다.',
  },
  {
    image: '/achievement-03.jpg',
    title:
      '지금 MVP라도, <span class="underline">서비스 성장을 위한<br> 구조로 설계합니다.</span>',
    description:
      '초기 MVP라도 향후 서비스 확장을 고려한 구조로 설계합니다. 서비스가 성장해도 시스템 구조가 발목을 잡지 않도록 확장 가능한 설계를 기본으로 합니다.',
  },
];

function ProjectIcon({ project }: { project: (typeof governmentProjects)[0] }) {
  if (project.icon === 'medal-star') {
    return (
      <svg className={styles['feature-icon']} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#a855f7" opacity="0.2" />
        <path
          d="M12 7L13.09 10.26L16.5 10.5L13.82 12.74L14.59 16.18L12 14.5L9.41 16.18L10.18 12.74L7.5 10.5L10.91 10.26L12 7Z"
          fill="#764ba2"
        />
      </svg>
    );
  }
  if (project.icon === 'badge-star') {
    return (
      <svg className={styles['feature-icon']} viewBox="0 0 24 24" fill="none">
        <rect x="5" y="7" width="14" height="10" rx="2" fill="#a855f7" opacity="0.2" />
        <rect x="5" y="7" width="14" height="10" rx="2" stroke="#764ba2" strokeWidth="1.5" fill="none" />
        <path
          d="M12 9L13.09 12.26L16.5 12.5L13.82 14.74L14.59 18.18L12 16.5L9.41 18.18L10.18 14.74L7.5 12.5L10.91 12.26L12 9Z"
          fill="#764ba2"
        />
      </svg>
    );
  }
  if (project.icon === 'medal-number') {
    return (
      <svg className={styles['feature-icon']} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#a855f7" opacity="0.2" />
        <circle cx="12" cy="12" r="7" fill="#764ba2" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          {project.number}
        </text>
      </svg>
    );
  }
  if (project.icon === 'badge-star-banner') {
    return (
      <svg className={styles['feature-icon']} viewBox="0 0 24 24" fill="none">
        <rect x="5" y="7" width="14" height="9" rx="2" fill="#a855f7" opacity="0.2" />
        <rect x="5" y="7" width="14" height="9" rx="2" stroke="#764ba2" strokeWidth="1.5" fill="none" />
        <path
          d="M12 9L13.09 12.26L16.5 12.5L13.82 14.74L14.59 18.18L12 16.5L9.41 18.18L10.18 14.74L7.5 12.5L10.91 12.26L12 9Z"
          fill="#764ba2"
        />
        <rect x="7" y="16" width="10" height="2" rx="1" fill="#764ba2" />
      </svg>
    );
  }
  if (project.icon === 'trophy') {
    return (
      <svg className={styles['feature-icon']} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#a855f7" opacity="0.2" />
        <path d="M9 9H15V11C15 12.5 13.5 14 12 14C10.5 14 9 12.5 9 11V9Z" fill="#764ba2" />
        <path d="M10 14H14V15H10V14Z" fill="#764ba2" />
        <path d="M11 15H13V17H11V15Z" fill="#764ba2" />
        <path d="M10.5 17H13.5L13 19H11L10.5 17Z" fill="#764ba2" />
      </svg>
    );
  }
  if (project.icon === 'flags') {
    return (
      <svg className={styles['feature-icon']} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#a855f7" opacity="0.2" />
        <path
          d="M8 8L9.5 10L8 12L9.5 14L8 16"
          stroke="#764ba2"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M14 8L15.5 10L14 12L15.5 14L14 16"
          stroke="#764ba2"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="9.5" cy="10" r="1.5" fill="#764ba2" />
      </svg>
    );
  }
  // star
  return (
    <svg className={styles['feature-icon']} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#a855f7" opacity="0.2" />
      <path
        d="M12 6L13.09 9.26L16.5 9.5L13.82 11.74L14.59 15.18L12 13.5L9.41 15.18L10.18 11.74L7.5 9.5L10.91 9.26L12 6Z"
        fill="#764ba2"
      />
      <path
        d="M12 13L12.5 14.5L14 15L12.5 15.5L12 17L11.5 15.5L10 15L11.5 14.5L12 13Z"
        fill="#764ba2"
      />
    </svg>
  );
}

export default function Introduce() {
  const [activeFaqId, setActiveFaqId] = useState<number | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleFaq = (id: number) => {
    setActiveFaqId((prev) => (prev === id ? null : id));
  };

  const nextSlide = () =>
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);

  const prevSlide = () =>
    setCurrentTestimonialIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const stopAutoSlide = () => {
    if (autoSlideRef.current !== null) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideRef.current = setInterval(
      () => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length),
      5000
    );
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.introduce}>
      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <div className={styles['hero-background']}>
          <img src="/hero-intro.jpg" alt="Hero background" className={styles['hero-bg-image']} />
          <div className={styles['hero-overlay']} />
        </div>
        <div className={styles['hero-content']}>
          <div className={styles['hero-text-left']}>
            <p className={styles['hero-line-1']}>아이디어를 실제 서비스로</p>
            <p className={styles['hero-line-2']}>구현합니다.</p>
            <p className={styles['hero-line-3']}>FreakMakers와 함께라면</p>
            <p className={styles['hero-line-4']}>무엇이든 만들 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* Purple Gradient Section */}
      <section className={styles['purple-gradient-section']}>
        <div className={styles.container}>
          <p className={styles['gradient-main-text']}>
            아이디어만 있어도 괜찮습니다. <br />
            나머지는 FreakMakers가 함께합니다.
          </p>
          <p className={styles['gradient-sub-text']}>
            많은 기업과 창업자가 아이디어를 가지고 있지만,
            <br /> 이를 실제 서비스로 만들기 위해서는 기획, 설계, 개발, 테스트, 배포까지 필요합니다.
            <br /> FreakMakers가 전 과정을 함께하는 원스톱 디지털 제품 제작 팀입니다.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles['team-section']}>
        <div className={styles.container}>
          {/* Element 1: Text Left, Image Right */}
          <div className={`${styles['team-element']} ${styles['team-element-1']}`}>
            <div className={styles['team-text-block']}>
              <div className={styles['team-number-badge']}>1</div>
              <h2 className={styles['team-title']}>
                아이디어를 구조화하고
                <br />
                서비스로 <span className={styles['highlight-quote']}>&apos;설계&apos;</span>합니다
              </h2>
              <p className={styles['team-description']}>
                막연한 아이디어도 괜찮습니다.
                <br />
                서비스 구조 설계, 핵심 기능 정의, UI/UX 설계까지
                <br />
                개발 전 단계를 함께 준비해드립니다.
              </p>
            </div>
            <div className={styles['team-image-block']}>
              <img
                src="/team-element-1.jpg"
                alt="Team element 1"
                className={styles['element-image']}
              />
            </div>
          </div>

          {/* Element 2: Image Left, Text Right */}
          <div className={`${styles['team-element']} ${styles['team-element-2']}`}>
            <div className={styles['team-image-block']}>
              <img
                src="/team-element-2.jpg"
                alt="Team element 2"
                className={styles['element-image']}
              />
            </div>
            <div className={styles['team-text-block']}>
              <div className={styles['team-number-badge']}>2</div>
              <h2 className={styles['team-title']}>
                빠르게 만들고, 빠르게 검증하고,
                <br /> 빠르게 개선합니다.
              </h2>
              <p className={styles['team-description']}>
                스타트업에게 중요한 것은 완벽한 제품이 아니라
                <br />
                빠른 실행과 검증입니다.
                <br />
                MVP 중심 개발로 시장에 먼저 도달합니다.
              </p>
            </div>
          </div>

          {/* Element 3: Text Left, Image Right */}
          <div className={`${styles['team-element']} ${styles['team-element-3']}`}>
            <div className={styles['team-text-block']}>
              <div className={styles['team-number-badge']}>3</div>
              <h2 className={styles['team-title']}>
                지금은 MVP라도,
                <br />
                미래 확장까지 고려해 설계합니다.
              </h2>
              <p className={styles['team-description']}>
                서비스가 성장해도 시스템 구조가 발목을 잡지 않도록
                <br />
                처음부터 확장 가능한 구조로 설계합니다.
                <br />
                장기적으로 함께하는 제작 파트너가 되겠습니다.
              </p>
            </div>
            <div className={styles['team-image-block']}>
              <img
                src="/team-element-3.jpg"
                alt="Team element 3"
                className={styles['element-image']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className={styles['results-section']}>
        <div className={styles.container}>
          <h2 className={styles['results-title']}>FreakMakers 제작 실적</h2>
          <p className={styles['results-description']}>
            아이디어를 실제 서비스로 만든 결과입니다.
          </p>
          <div className={styles['results-metrics']}>
            <div className={styles['metric-box']}>
              <h3 className={styles['metric-title']}>완료 프로젝트</h3>
              <p className={styles['metric-value']}>50건 이상</p>
            </div>
            <div className={styles['metric-box']}>
              <h3 className={styles['metric-title']}>서비스 유형</h3>
              <p className={styles['metric-value']}>6가지 이상</p>
            </div>
            <div className={styles['metric-box']}>
              <h3 className={styles['metric-title']}>고객 만족도</h3>
              <p className={styles['metric-value']}>100%</p>
            </div>
            <div className={styles['metric-box']}>
              <h3 className={styles['metric-title']}>재의뢰율</h3>
              <p className={styles['metric-value']}>80% 이상</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles['features-section']}>
        <div className={styles.container}>
          <div className={styles['features-content']}>
            <div className={styles['features-grid']}>
              {governmentProjects.map((project, index) => (
                <div key={index} className={styles['feature-card']}>
                  <div className={styles['feature-icon-wrapper']}>
                    <ProjectIcon project={project} />
                  </div>
                  <p className={styles['feature-title-text']}>
                    <span className={styles['feature-title-full']}>{project.title}</span>
                    <span className={styles['feature-title-short']}>{project.shortTitle}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className={styles['features-text-block']}>
              <h2 className={styles['features-title']}>FreakMakers 핵심 서비스</h2>
              <p className={styles['features-description']}>
                웹사이트, 플랫폼, SaaS, 자동화 시스템, MVP, QA까지
                <br />
                디지털 제품이라면 어떤 형태든 제작 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className={styles['testimonials-section']}>
        <div className={styles.container}>
          <div className={styles['testimonials-carousel-wrapper']}>
            <button
              className={styles['carousel-button']}
              onClick={prevSlide}
              onMouseEnter={stopAutoSlide}
              onMouseLeave={startAutoSlide}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className={styles['testimonials-carousel']}>
              <div
                className={styles['testimonials-track']}
                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className={styles['testimonial-card']}>
                    <div className={styles['testimonial-content']}>
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className={styles['testimonial-image']}
                      />
                      <div className={styles['testimonial-text']}>
                        {testimonial.text.map((line, index) => (
                          <p key={index} className={styles['testimonial-line']}>
                            {line}
                          </p>
                        ))}
                      </div>
                      <p className={styles['testimonial-author']}>{testimonial.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={styles['carousel-button']}
              onClick={nextSlide}
              onMouseEnter={stopAutoSlide}
              onMouseLeave={startAutoSlide}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className={styles['achievement-section']}>
        <div className={styles.container}>
          <div className={styles['achievement-header']}>
            <p className={styles['achievement-category']}>FreakMakers 경쟁력</p>
            <h2 className={styles['achievement-title']}>
              고객이 <span className={styles['highlight-purple']}>다시 찾아오는</span> 제작팀,
              <br />
              그 이유가 바로 <span className={styles['highlight-purple']}>&apos;이것&apos;</span>{' '}
              때문입니다.
            </h2>
          </div>

          <div className={styles['achievement-cards']}>
            {achievementItems.map((item, index) => (
              <div key={index} className={styles['achievement-card']}>
                <div className={styles['achievement-card-image']}>
                  <img
                    src={item.image}
                    alt={item.title.replace(/<[^>]*>/g, '')}
                    className={styles['achievement-image']}
                  />
                </div>
                <div className={styles['achievement-card-content']}>
                  <h3
                    className={styles['achievement-card-title']}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <p
                    className={styles['achievement-card-description']}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles['services-section']}>
        <div className={styles.container}>
          <h2 className={styles['services-title']}>FreakMakers</h2>
          <p className={styles['services-description']}>
            아이디어 정리부터 서비스 설계, 개발, 테스트, 배포까지
            <br />
            디지털 제품 제작의 전 과정을 하나의 팀에서 올인원으로 제공합니다.
          </p>
          <img src="/hero-intro.jpg" alt="Hero background" className={styles['handy-bg-image']} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles['faq-section']}>
        <div className={styles.container}>
          <div className={styles['faq-header']}>
            <span className={styles['faq-label']}>FAQ</span>
            <h2 className={styles['faq-title']}>자주 묻는 질문</h2>
          </div>
          <div className={styles['faq-divider']} />
          <div className={styles['faq-list']}>
            {faqItems.map((item) => (
              <div
                key={item.id}
                className={`${styles['faq-item']} ${activeFaqId === item.id ? styles.active : ''}`}
              >
                <button className={styles['faq-question']} onClick={() => toggleFaq(item.id)}>
                  <span className={styles['faq-question-text']}>{item.question}</span>
                  <svg
                    className={`${styles['faq-icon']} ${activeFaqId === item.id ? styles.rotated : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <div
                  className={`${styles['faq-answer-wrapper']} ${activeFaqId === item.id ? styles.open : ''}`}
                >
                  <div className={styles['faq-answer']}>
                    {item.answer.map((line, index) => (
                      <p key={index} className={styles['faq-answer-line']}>
                        {item.id === 1 && index === 3 ? (
                          <>
                            <span className={styles['underlined-text']}>
                              FreakMakers가 함께 진행합니다.
                            </span>
                          </>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner Section */}
      <section className={styles['contact-banner-section']}>
        <div className={styles['contact-banner-background']}>
          <img
            src="/contact-banner.jpg"
            alt="Contact banner background"
            className={styles['contact-banner-image']}
          />
          <div className={styles['contact-banner-overlay']} />
        </div>
        <div className={styles['contact-banner-content']}>
          <div className={styles['contact-banner-text-block']}>
            <h2 className={styles['contact-banner-title']}>프로젝트 문의하기</h2>
            <p className={styles['contact-banner-description']}>
              아이디어가 있다면 언제든지 문의주세요.
              <br />
              기획부터 개발, 배포까지 함께 만들어 드리겠습니다.
            </p>
          </div>
          <div className={styles['contact-banner-button-block']}>
            <button className={styles['contact-banner-button']}>프로젝트 상담 신청</button>
          </div>
        </div>
      </section>
    </div>
  );
}
