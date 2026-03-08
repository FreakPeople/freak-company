'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';

const featureCards = [
  {
    title: '같은 편에서<br>시작합니다',
    description: '일을 받는 입장이 아니라<br>같은 목표를 바라보는 파트너로 시작합니다.',
    image: '/how-we-work1.png',
    alt: '회의실에서 발표를 듣는 인물',
  },
  {
    title: '전체를 먼저<br>봅니다',
    description: '홈페이지 하나만 보지 않습니다.<br>비즈니스 전체 흐름을 먼저 이해합니다.',
    image: '/how-we-work3.png',
    alt: '업무 회의를 진행하는 인물들',
  },
  {
    title: '꼭 필요한 것만<br>제안합니다',
    description: '지금 시점에 정말 필요한 것만 뽑아<br>과하지 않게 설계합니다.',
    image: '/how-we-work2.png',
    alt: '디자인 작업 화면을 바라보는 손',
  },
  {
    title: '결과를 만드는<br>구조를 만듭니다',
    description: '예쁘기만 한 홈페이지가 아닌<br>목표를 달성하는 구조를 설계합니다.',
    image: '/how-we-work4.png',
    alt: '회의 중 토론하는 인물',
  },
];

const faqItems = [
  {
    id: 1,
    question: '1차 미팅 전, 어떤 것을 준비하면 좋을까요?',
    answer:
      '대략적인 생각만 있어도 충분합니다. 원하시는 홈페이지의 분위기나 참고 사이트가 있다면 함께 공유해 주세요.',
  },
  {
    id: 2,
    question: '프로젝트 진행 절차는 어떻게 되나요?',
    answer:
      '아래 순서로 진행됩니다.<br>' +
      '1. 문의하기를 통해 상담을 신청합니다.<br>' +
      '2. 개발자와 직접 미팅을 진행합니다.<br>' +
      '3. 필요한 내용을 정리하고, 실현 가능한 방향을 제안합니다.<br>' +
      '4. 진행 중에도 대표님과 계속 소통합니다.<br>' +
      '5. 최종 확인 후 결과물을 전달합니다.<br><br>' +
      '처음부터 끝까지 같은 담당자가 함께해, 진행 상황을 놓치지 않고 공유합니다.',
  },
  {
    id: 3,
    question: '유지보수는 어떤 범위까지 제공되나요?',
    answer:
      '영상 및 이미지 교체, 텍스트 수정 등 콘텐츠 변경은 기본적으로 지원합니다.<br>또한 전체 구조를 변경하지 않는 범위 내에서는 디자인 수정도 가능합니다.<br> 보다 큰 구조 변경이나 기능 추가가 필요한 경우에는 사전에 협의하여 진행합니다.',
  },
];

export default function Home() {
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const [isFeatureVisible, setIsFeatureVisible] = useState(false);
  const [activeFaqId, setActiveFaqId] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    contact: '',
    inquiry: '',
    privacyAgree: false,
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollOnePage = () => {
    window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: 'smooth' });
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const toggleFaq = (id: number) => {
    setActiveFaqId((prev) => (prev === id ? 0 : id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!formData.privacyAgree) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          contact: formData.contact,
          inquiry: formData.inquiry,
          secret: 'MY_SIMPLE_SECRET',
          website: formData.website,
        }),
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (result.success) {
        alert('문의가 정상적으로 접수되었습니다.');
        setFormData({
          name: '',
          company: '',
          email: '',
          contact: '',
          inquiry: '',
          privacyAgree: false,
          website: '',
        });
      } else {
        alert('문의 전송 중 오류가 발생했습니다.');
      }
    } catch {
      alert('일시적으로 문의접수가 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ESC key handler for modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Hash scroll on mount
  useEffect(() => {
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  // Feature cards IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFeatureVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (featureCardsRef.current) {
      observer.observe(featureCardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles['hero-background']}>
          <div className={styles['hero-overlay']} />
        </div>
        <div className={styles['hero-content']}>
          <h1 className={styles['hero-title']}>이런 거 있으면 좋을텐데</h1>
          <h1 className={styles['hero-title']}>상상은 자유롭게,</h1>
          <h1 className={styles['hero-title']} style={{ color: '#ffc263' }}>
            없으면 만듭니다.
          </h1>
          <br />
          <br />
          <p className={styles['hero-subtitle']}>
            프릭은 무엇이든 만듭니다.
            <br />
            불필요한 비용은 걷어내고, 고객이 알아본 것보다 더 합리적으로 제공합니다.
          </p>
        </div>

        {/* Scroll Down Button */}
        <button className={styles['scroll-down-btn']} aria-label="Scroll Down" onClick={scrollOnePage}>
          <img src="/scroll-down.svg" alt="" />
        </button>
      </section>

      {/* Why Section */}
      <section className={styles['why-section']}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>프릭은 이렇게 일합니다</h2>
          <p className={styles['section-subtitle']}>하나의 목표만 봅니다. 클라이언트의 &apos;성과&apos;</p>
          <div className={styles['feature-cards']} ref={featureCardsRef}>
            {featureCards.map((card, index) => (
              <div
                key={index}
                className={`${styles['feature-card']} ${isFeatureVisible ? styles.animate : ''}`}
              >
                <div className={styles['feature-media']}>
                  <img
                    src={card.image}
                    alt={card.alt}
                    className={styles['feature-img']}
                    loading="lazy"
                  />
                  <div className={styles['feature-overlay']} />
                </div>
                <div className={styles['feature-content']}>
                  <h3
                    className={styles['feature-title']}
                    dangerouslySetInnerHTML={{ __html: card.title }}
                  />
                  <p
                    className={styles['feature-description']}
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={styles['comparison-section']}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>
            그래서
            <br />
            <span className={styles['highlight-text']}>프릭은</span> 무엇이 다를까요
          </h2>

          <div className={styles['comparison-grid']}>
            {/* Comparison 1 */}
            <div className={styles['comparison-row']}>
              <div className={`${styles['comparison-card']} ${styles.wrong}`}>
                <div className={styles['icon-wrapper']}>
                  <svg
                    className={styles['icon-x']}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <p className={styles['comparison-text']}>&quot;퀄리티 있게 하려면 가격이 부담되지 않나요?&quot;</p>
              </div>
              <div className={styles['vs-badge']}>VS</div>
              <div className={`${styles['comparison-card']} ${styles.right}`}>
                <div className={styles['icon-wrapper']}>
                  <svg
                    className={styles['icon-check']}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <p className={styles['comparison-text']}>
                  비용이 커지는 이유부터 정리합니다. <br />
                  불필요한 작업을 덜어내 합리적인 범위로 맞춥니다.
                </p>
              </div>
            </div>

            {/* Comparison 2 */}
            <div className={styles['comparison-row']}>
              <div className={`${styles['comparison-card']} ${styles.wrong}`}>
                <div className={styles['icon-wrapper']}>
                  <svg
                    className={styles['icon-x']}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <p className={styles['comparison-text']}>
                  &quot;기획 단계에서는 가능하다고 했는데, 개발 단계에서 안 된다는 말을 들었어요.&quot;
                </p>
              </div>
              <div className={styles['vs-badge']}>VS</div>
              <div className={`${styles['comparison-card']} ${styles.right}`}>
                <div className={styles['icon-wrapper']}>
                  <svg
                    className={styles['icon-check']}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <p className={styles['comparison-text']}>
                  초기 미팅부터 개발자가 직접 참여합니다. 구현 가능 여부를 현장에서 바로 판단해,
                  불필요한 소통과 수정 비용을 줄입니다.
                </p>
              </div>
            </div>

            {/* Comparison 3 */}
            <div className={styles['comparison-row']}>
              <div className={`${styles['comparison-card']} ${styles.wrong}`}>
                <div className={styles['icon-wrapper']}>
                  <svg
                    className={styles['icon-x']}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <p className={styles['comparison-text']}>&quot;홈페이지 제작 후에도 관리가 될까요?&quot;</p>
              </div>
              <div className={styles['vs-badge']}>VS</div>
              <div className={`${styles['comparison-card']} ${styles.right}`}>
                <div className={styles['icon-wrapper']}>
                  <svg
                    className={styles['icon-check']}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <p className={styles['comparison-text']}>
                  제작으로 끝나지 않습니다. 실제 운영 중인 서비스를 개발·유지보수하는 개발자가
                  운영의 파트너로 함께합니다.
                </p>
              </div>
            </div>

            {/* Comparison 4 */}
            <div className={styles['comparison-row']}>
              <div className={`${styles['comparison-card']} ${styles.wrong}`}>
                <div className={styles['icon-wrapper']}>
                  <svg
                    className={styles['icon-x']}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <p className={styles['comparison-text']}>&quot;기술적인 내용은 잘 모르는데 괜찮을까요?&quot;</p>
              </div>
              <div className={styles['vs-badge']}>VS</div>
              <div className={`${styles['comparison-card']} ${styles.right}`}>
                <div className={styles['icon-wrapper']}>
                  <svg
                    className={styles['icon-check']}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <p className={styles['comparison-text']}>
                  무엇을 만들지부터 정리하고, 초등학생도 이해할 수 있게 설명합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles['faq-section']}>
        <div className={styles.container}>
          <h2 className={styles['faq-section-title']}>가장 많이 물어보시는 질문</h2>
          <div className={styles['faq-content']}>
            <div className={styles['faq-list']}>
              {faqItems.map((item) => (
                <div
                  key={item.id}
                  className={`${styles['faq-item']} ${activeFaqId === item.id ? styles.active : ''}`}
                >
                  <button className={styles['faq-question']} onClick={() => toggleFaq(item.id)}>
                    <span className={styles['faq-question-text']}>{item.question}</span>
                    <span className={styles['faq-icon']}>
                      {activeFaqId === item.id ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </span>
                  </button>
                  <div className={styles['faq-answer-wrapper']}>
                    <div
                      className={styles['faq-answer']}
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles['faq-image-wrapper']}>
              <img src="/faq-image.jpg" alt="FAQ 이미지" className={styles['faq-image']} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles['contact-section']}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>문의하기</h2>
          <p className={styles['section-subtitle']} />
          <div className={styles['contact-content']}>
            <div className={styles['contact-form-wrapper']}>
              <form onSubmit={handleSubmit} className={styles['contact-form']} autoComplete="off">
                {/* Honeypot */}
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                />

                <div className={styles['form-row']}>
                  <div className={styles['form-group']}>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="성함*"
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                      placeholder="업체명*"
                      required
                    />
                  </div>
                </div>

                <div className={styles['form-row']}>
                  <div className={styles['form-group']}>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="이메일*"
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <input
                      type="tel"
                      value={formData.contact}
                      onChange={(e) => setFormData((p) => ({ ...p, contact: e.target.value }))}
                      placeholder="연락처*"
                      required
                    />
                  </div>
                </div>

                <div className={`${styles['form-group']} ${styles['form-full']}`}>
                  <textarea
                    value={formData.inquiry}
                    onChange={(e) => setFormData((p) => ({ ...p, inquiry: e.target.value }))}
                    placeholder="문의내용"
                    rows={6}
                    required
                  />
                </div>

                <div className={`${styles['form-group']} ${styles['checkbox-group']}`}>
                  <div className={styles['form-group-bottom']}>
                    <label className={styles['checkbox-label']}>
                      <input
                        type="checkbox"
                        checked={formData.privacyAgree}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, privacyAgree: e.target.checked }))
                        }
                        required
                      />
                      <span>개인정보 수집 및 이용 동의</span>
                    </label>
                    <a
                      href="#"
                      className={styles['privacy-link']}
                      onClick={(e) => {
                        e.preventDefault();
                        openModal();
                      }}
                    >
                      [자세히 보기]
                    </a>

                    {/* Privacy Modal */}
                    {isOpen && (
                      <div className={styles['modal-overlay']} onClick={closeModal}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                          <button className={styles['modal-close']} onClick={closeModal}>
                            &times;
                          </button>
                          <h3 className={styles['modal-title']}>개인정보 처리방침</h3>
                          <div className={styles['modal-content']}>
                            <div className={styles['policy-section']}>
                              <p>
                                <strong>&apos;프릭&apos;</strong>은 고객님의 개인정보를 중요하게
                                생각하며, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」을
                                준수하고 있습니다.
                              </p>
                              <p>
                                회사는 개인정보처리방침을 통해 고객님께서 제공하신 개인정보가 어떤
                                용도와 방식으로 이용되는지, 그리고 개인정보 보호를 위해 어떤 조치를
                                취하고 있는지 안내드립니다.
                              </p>
                              <p>
                                개인정보처리방침이 개정되는 경우, 웹사이트 공지사항 또는 개별
                                공지를 통해 안내드립니다.
                              </p>
                            </div>
                            <div className={styles['policy-section']}>
                              <h4>■ 수집하는 개인정보 항목</h4>
                              <p>회사는 상담 및 고객 문의를 위해 아래와 같은 개인정보를 수집합니다.</p>
                              <ul>
                                <li>수집 항목: 이름, 업체명, 연락처, 이메일</li>
                                <li>수집 방법: 홈페이지 문의하기를 통한 접수</li>
                              </ul>
                            </div>
                            <div className={styles['policy-section']}>
                              <h4>■ 개인정보의 수집 및 이용 목적</h4>
                              <ul>
                                <li>문의 내용 확인 및 안내를 위한 연락</li>
                              </ul>
                            </div>
                            <div className={styles['policy-section']}>
                              <h4>■ 개인정보의 보유 및 이용 기간</h4>
                              <p>
                                개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기하며, 보유
                                기간은 최대 3년을 초과하지 않는 것을 원칙으로 합니다.
                              </p>
                            </div>
                            <div className={styles['policy-section']}>
                              <h4>■ 개인정보 자동 수집 장치의 설치·운영 및 거부</h4>
                              <p>
                                본 웹사이트는 이용자에게 맞춤 서비스를 제공하기 위한 쿠키(cookie)를
                                사용하지 않습니다.
                              </p>
                            </div>
                            <div className={styles['policy-section']}>
                              <h4>■ 개인정보 관련 민원 서비스</h4>
                              <p>
                                개인정보 보호 및 관련 민원 처리를 위해 아래와 같이
                                개인정보관리책임자를 지정하고 있습니다.
                              </p>
                              <ul>
                                <li>개인정보관리책임자: 황유정</li>
                                <li>이메일: freakmakers@gmail.com</li>
                              </ul>
                            </div>
                            <div className={`${styles['policy-section']} ${styles['policy-date']}`}>
                              <p>
                                본 방침은 <strong>2026년 02월 15일</strong>부터 시행됩니다.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className={styles['submit-button']} disabled={isSubmitting}>
                  {isSubmitting ? '전송 중...' : '문의하기'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
