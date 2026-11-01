"use client";

import { useLocale } from "@/components/preferences/LocaleProvider";

import { trapDialogFocus } from "@/lib/dialog-focus";
import { useState, useEffect, useRef } from "react";
import styles from "@/app/Home.module.css";
import Image from "next/image";
import Link from "@/components/LocalizedLink";

const principles = [
  {
    title: "같은 편에서 시작합니다",
    description:
      "일을 받는 입장이 아니라, 같은 목표를 바라보는 파트너로 함께합니다.",
  },
  {
    title: "전체를 먼저 봅니다",
    description:
      "홈페이지 하나에 앞서 비즈니스가 어떻게 움직이는지 이해합니다.",
  },
  {
    title: "필요한 만큼 제안합니다",
    description:
      "지금 필요한 기능과 작업을 정리하고, 과하지 않은 범위를 설계합니다.",
  },
  {
    title: "운영까지 생각합니다",
    description:
      "화면을 만드는 데서 끝나지 않도록, 실제 운영과 다음 변화를 고려합니다.",
  },
];

const faqItems = [
  {
    id: 1,
    question: "1차 미팅 전, 어떤 것을 준비하면 좋을까요?",
    answer:
      "대략적인 생각만 있어도 충분합니다. 원하시는 홈페이지의 분위기나 참고 사이트가 있다면 함께 공유해 주세요.",
  },
  {
    id: 2,
    question: "프로젝트 진행 절차는 어떻게 되나요?",
    answer:
      "아래 순서로 진행됩니다.<br>" +
      "1. 문의하기를 통해 상담을 신청합니다.<br>" +
      "2. 개발자와 직접 미팅을 진행합니다.<br>" +
      "3. 필요한 내용을 정리하고, 실현 가능한 방향을 제안합니다.<br>" +
      "4. 진행 중에도 대표님과 계속 소통합니다.<br>" +
      "5. 최종 확인 후 결과물을 전달합니다.<br><br>" +
      "처음부터 끝까지 같은 담당자가 함께해, 진행 상황을 놓치지 않고 공유합니다.",
  },
  {
    id: 3,
    question: "유지보수는 어떤 범위까지 제공되나요?",
    answer:
      "영상 및 이미지 교체, 텍스트 수정 등 콘텐츠 변경은 기본적으로 지원합니다.<br>또한 전체 구조를 변경하지 않는 범위 내에서는 디자인 수정도 가능합니다.<br> 보다 큰 구조 변경이나 기능 추가가 필요한 경우에는 사전에 협의하여 진행합니다.",
  },
];

export default function Home() {
  const { t } = useLocale();
  const privacyRef = useRef<HTMLDialogElement>(null);
  const privacyTriggerRef = useRef<HTMLButtonElement>(null);
  const [activeFaqId, setActiveFaqId] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contact: "",
    inquiry: "",
    privacyAgree: false,
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const toggleFaq = (id: number) => {
    setActiveFaqId((prev) => (prev === id ? 0 : id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.privacyAgree) {
      setSubmitStatus({
        type: "error",
        message: t("개인정보 수집 및 이용에 동의해 주세요."),
      });
      setIsSubmitting(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/contact.php", {
        signal: controller.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          contact: formData.contact,
          inquiry: formData.inquiry,
          secret: "MY_SIMPLE_SECRET",
          website: formData.website,
        }),
      });

      if (!response.ok) throw new Error(t("문의 접수 실패"));
      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: t(
            "문의가 접수되었습니다. 남겨주신 연락처로 안내드리겠습니다.",
          ),
        });
        setFormData({
          name: "",
          company: "",
          email: "",
          contact: "",
          inquiry: "",
          privacyAgree: false,
          website: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: t(
            "문의가 접수되지 않았습니다. 입력 내용은 유지됩니다. 아래 이메일로 문의해 주세요.",
          ),
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: t(
          "문의가 접수되지 않았습니다. 입력 내용은 유지됩니다. 다시 시도하거나 아래 이메일로 문의해 주세요.",
        ),
      });
    } finally {
      window.clearTimeout(timeout);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const dialog = privacyRef.current;
    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isOpen && dialog?.open) {
      dialog.close();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <main id="main-content" tabIndex={-1} className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles["hero-layout"]}>
          <div className={styles["hero-content"]}>
            <h1 className={styles["hero-title"]}>
              {t("상상은 자유롭게,")}
              <br />
              {t("없으면 만듭니다.")}
            </h1>
            <p className={styles["hero-subtitle"]}>
              {t("웹사이트, 플랫폼, SaaS.")}
              <br />
              {t("아이디어를 실제 서비스로 만드는 프릭입니다.")}
            </p>
            <div className={styles["hero-actions"]}>
              <a className={styles["primary-link"]} href="#contact">
                {t("프로젝트 이야기하기")}
              </a>
              <a className={styles["secondary-link"]} href="#services">
                {t("만드는 것들 살펴보기")}
              </a>
            </div>
            <p className={styles["hero-note"]}>
              {t("아직 정리되지 않은 아이디어도 괜찮습니다.")}
            </p>
          </div>
          <figure
            className={styles["launch-sketch"]}
            aria-label={t("아이디어를 실제 서비스로 구현하는 프릭")}
          >
            <div className={styles["idea-note"]}>
              {t("“이런 것도")}
              <br />
              {t("만들 수 있나요?”")}
            </div>
            <div className={styles["launch-path"]} aria-hidden="true" />
            <Image
              className={styles["hero-rocket"]}
              src="/back-to-top.svg"
              alt={t("로켓을 타고 출발하는 우주인")}
              width={280}
              height={280}
              preload
              unoptimized
            />
            <figcaption className={styles["launch-caption"]}>
              <span>{t("아이디어에서")}</span>
              <strong>{t("실제 서비스로.")}</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="services"
        className={styles["services-section"]}
        aria-labelledby="services-title"
      >
        <div className={styles.container}>
          <div className={styles["section-heading"]}>
            <h2 id="services-title">{t("어떤 걸 만들고 싶으세요?")}</h2>
            <p>{t("지금 비즈니스에 필요한 디지털 제품을 함께 설계합니다.")}</p>
          </div>
          <div className={styles["service-grid"]}>
            {[
              {
                category: t("웹사이트"),
                title: t("웹사이트 제작"),
                description: t(
                  "기업 홈페이지, 브랜드 사이트, 랜딩 페이지. 비즈니스를 이해하고 방문자의 다음 행동을 설계합니다.",
                ),
                tags: [
                  t("기업 홈페이지"),
                  t("브랜드 사이트"),
                  t("랜딩 페이지"),
                ],
              },
              {
                category: t("플랫폼"),
                title: t("플랫폼 · SaaS 개발"),
                description: t(
                  "커뮤니티, 예약 시스템부터 업무 소프트웨어까지. 서비스의 흐름과 확장을 고려해 만듭니다.",
                ),
                tags: [t("플랫폼"), "SaaS", t("업무 자동화")],
              },
              {
                category: t("제품 검증"),
                title: t("MVP · QA 테스트"),
                description: t(
                  "핵심 기능으로 아이디어를 검증하고, 사용자 시나리오에 따라 서비스 품질을 점검합니다.",
                ),
                tags: [t("아이디어 검증"), "MVP", t("품질 점검")],
              },
            ].map((service) => (
              <article
                key={service.category}
                className={styles["service-item"]}
              >
                <h3>{t(service.title)}</h3>
                <div className={styles["service-description"]}>
                  <p>{t(service.description)}</p>
                  <ul>
                    {service.tags.map((tag) => (
                      <li key={t(tag)}>{t(tag)}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  aria-label={`${t("이 서비스 문의하기")}: ${t(service.title)}`}
                >
                  {t("이 서비스 문의하기")}
                </a>
              </article>
            ))}
          </div>
          <Link href="/introduce" className={styles["text-link"]}>
            {t("프릭과 제공 서비스 자세히 알아보기")}
          </Link>
        </div>
      </section>

      <section id="how-we-work" className={styles["why-section"]}>
        <div className={styles.container}>
          <div className={styles["principles-layout"]}>
            <div>
              <h2 className={styles["section-title"]}>
                {t("만드는 건 달라도,")}
                <br />
                {t("일하는 태도는 같습니다.")}
              </h2>
              <p className={styles["section-subtitle"]}>
                {t("기획부터 개발, 운영까지.")}
                <br />
                {t("같은 목표를 바라보며 함께합니다.")}
              </p>
            </div>
            <div className={styles["principles-list"]}>
              {principles.map((item) => (
                <article key={t(item.title)}>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.description)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        className={styles["process-section"]}
        aria-labelledby="process-title"
      >
        <div className={styles.container}>
          <h2 id="process-title" className={styles["section-title"]}>
            {t("첫 대화부터, 만드는 과정까지.")}
          </h2>
          <ol className={styles["process-list"]}>
            <li>
              <span aria-hidden="true">1</span>
              <h3>{t("이야기하고 정리합니다")}</h3>
              <p>
                {t(
                  "개발자와 직접 만나 아이디어, 필요한 기능, 작업 범위를 함께 정리합니다.",
                )}
              </p>
            </li>
            <li>
              <span aria-hidden="true">2</span>
              <h3>{t("설계하고 만듭니다")}</h3>
              <p>
                {t(
                  "구현 가능한 방향을 제안하고, 진행 상황을 공유하며 기획과 개발을 이어갑니다.",
                )}
              </p>
            </li>
            <li>
              <span aria-hidden="true">3</span>
              <h3>{t("확인하고 이어갑니다")}</h3>
              <p>
                {t(
                  "결과물을 함께 확인합니다. 운영 중 필요한 유지보수와 기능 확장은 범위를 협의합니다.",
                )}
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles["faq-section"]}>
        <div className={styles.container}>
          <h2 className={styles["faq-section-title"]}>
            {t("가장 많이 물어보시는 질문")}
          </h2>
          <div className={styles["faq-content"]}>
            <div className={styles["faq-list"]}>
              {faqItems.map((item) => (
                <div
                  key={item.id}
                  className={`${styles["faq-item"]} ${activeFaqId === item.id ? styles.active : ""}`}
                >
                  <button
                    id={`faq-question-${item.id}`}
                    className={styles["faq-question"]}
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={activeFaqId === item.id}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span className={styles["faq-question-text"]}>
                      {t(item.question)}
                    </span>
                    <span className={styles["faq-icon"]}>
                      {activeFaqId === item.id ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    hidden={activeFaqId !== item.id}
                    className={styles["faq-answer-wrapper"]}
                  >
                    <div
                      className={styles["faq-answer"]}
                      dangerouslySetInnerHTML={{ __html: t(item.answer) }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <aside className={styles["faq-help"]}>
              <h3>{t("내 질문은 조금 다른가요?")}</h3>
              <p>
                {t("만들고 싶은 것부터 현재 고민까지, 편하게 이야기해 주세요.")}
              </p>
              <a href="#contact">{t("프로젝트 이야기하기")}</a>
            </aside>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles["contact-section"]}>
        <div className={styles.container}>
          <div className={styles["contact-heading"]}>
            <h2 className={styles["section-title"]}>
              {t("이제, 대표님의")}
              <br />
              {t("아이디어를 들려주세요.")}
            </h2>
            <p className={styles["contact-intro"]}>
              {t(
                "만들고 싶은 서비스가 있나요? 아이디어와 고민을 편하게 남겨주세요.",
              )}
            </p>
            <p className={styles["contact-help"]}>
              {t(
                "모든 항목은 필수입니다. 참고 사이트, 필요한 기능, 희망 일정이 있다면 함께 알려주세요.",
              )}
            </p>
          </div>
          <div className={styles["contact-content"]}>
            <div className={styles["contact-form-wrapper"]}>
              <form
                onSubmit={handleSubmit}
                className={styles["contact-form"]}
                aria-busy={isSubmitting}
              >
                {/* Honeypot */}
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, website: e.target.value }))
                  }
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                />

                <div className={styles["form-row"]}>
                  <div className={styles["form-group"]}>
                    <label htmlFor="contact-name">
                      {t("성함")}
                      <span>{t("(필수)")}</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder={t("성함*")}
                      required
                    />
                  </div>
                  <div className={styles["form-group"]}>
                    <label htmlFor="contact-company">
                      {t("업체명")}
                      <span>{t("(필수)")}</span>
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      autoComplete="organization"
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, company: e.target.value }))
                      }
                      placeholder={t("업체명*")}
                      required
                    />
                  </div>
                </div>

                <div className={styles["form-row"]}>
                  <div className={styles["form-group"]}>
                    <label htmlFor="contact-email">
                      {t("이메일")}
                      <span>{t("(필수)")}</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder={t("이메일*")}
                      required
                    />
                  </div>
                  <div className={styles["form-group"]}>
                    <label htmlFor="contact-contact">
                      {t("연락처")}
                      <span>{t("(필수)")}</span>
                    </label>
                    <input
                      id="contact-contact"
                      name="contact"
                      autoComplete="tel"
                      type="tel"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, contact: e.target.value }))
                      }
                      placeholder={t("연락처*")}
                      required
                    />
                  </div>
                </div>

                <div
                  className={`${styles["form-group"]} ${styles["form-full"]}`}
                >
                  <label htmlFor="contact-inquiry">
                    {t("프로젝트 내용")}
                    <span>{t("(필수)")}</span>
                  </label>
                  <textarea
                    id="contact-inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, inquiry: e.target.value }))
                    }
                    placeholder={t(
                      "어떤 서비스를 만들고 싶으신가요? 필요한 기능이나 현재 고민을 알려주세요.",
                    )}
                    rows={6}
                    required
                  />
                </div>

                <div
                  className={`${styles["form-group"]} ${styles["checkbox-group"]}`}
                >
                  <div className={styles["form-group-bottom"]}>
                    <label className={styles["checkbox-label"]}>
                      <input
                        type="checkbox"
                        checked={formData.privacyAgree}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            privacyAgree: e.target.checked,
                          }))
                        }
                        required
                      />
                      <span>{t("개인정보 수집 및 이용 동의")}</span>
                    </label>
                    <button
                      type="button"
                      ref={privacyTriggerRef}
                      className={styles["privacy-link"]}
                      onClick={(e) => {
                        e.preventDefault();
                        openModal();
                      }}
                    >
                      {t("개인정보 처리방침 보기")}
                    </button>

                    {/* Privacy Modal */}
                    <dialog
                      onKeyDown={trapDialogFocus}
                      ref={privacyRef}
                      className={styles["modal-overlay"]}
                      aria-labelledby="privacy-title"
                      onClose={() => {
                        setIsOpen(false);
                        document.body.style.overflow = "";
                        privacyTriggerRef.current?.focus();
                      }}
                      onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                      }}
                    >
                      <div className={styles.modal}>
                        <button
                          type="button"
                          className={styles["modal-close"]}
                          onClick={closeModal}
                          aria-label={t("개인정보 처리방침 닫기")}
                        >
                          &times;
                        </button>
                        <h3
                          id="privacy-title"
                          className={styles["modal-title"]}
                        >
                          {t("개인정보 처리방침")}
                        </h3>
                        <div className={styles["modal-content"]}>
                          <div className={styles["policy-section"]}>
                            <p>
                              <strong>{t("'프릭'")}</strong>
                              {t(
                                "은 고객님의 개인정보를 중요하게 생각하며, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」을 준수하고 있습니다.",
                              )}
                            </p>
                            <p>
                              {t(
                                "회사는 개인정보처리방침을 통해 고객님께서 제공하신 개인정보가 어떤 용도와 방식으로 이용되는지, 그리고 개인정보 보호를 위해 어떤 조치를 취하고 있는지 안내드립니다.",
                              )}
                            </p>
                            <p>
                              {t(
                                "개인정보처리방침이 개정되는 경우, 웹사이트 공지사항 또는 개별 공지를 통해 안내드립니다.",
                              )}
                            </p>
                          </div>
                          <div className={styles["policy-section"]}>
                            <h4>{t("■ 수집하는 개인정보 항목")}</h4>
                            <p>
                              {t(
                                "회사는 상담 및 고객 문의를 위해 아래와 같은 개인정보를 수집합니다.",
                              )}
                            </p>
                            <ul>
                              <li>
                                {t("수집 항목: 이름, 업체명, 연락처, 이메일")}
                              </li>
                              <li>
                                {t("수집 방법: 홈페이지 문의하기를 통한 접수")}
                              </li>
                            </ul>
                          </div>
                          <div className={styles["policy-section"]}>
                            <h4>{t("■ 개인정보의 수집 및 이용 목적")}</h4>
                            <ul>
                              <li>{t("문의 내용 확인 및 안내를 위한 연락")}</li>
                            </ul>
                          </div>
                          <div className={styles["policy-section"]}>
                            <h4>{t("■ 개인정보의 보유 및 이용 기간")}</h4>
                            <p>
                              {t(
                                "개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기하며, 보유 기간은 최대 3년을 초과하지 않는 것을 원칙으로 합니다.",
                              )}
                            </p>
                          </div>
                          <div className={styles["policy-section"]}>
                            <h4>
                              {t(
                                "■ 개인정보 자동 수집 장치의 설치·운영 및 거부",
                              )}
                            </h4>
                            <p>
                              {t(
                                "본 웹사이트는 이용자에게 맞춤 서비스를 제공하기 위한 쿠키(cookie)를 사용하지 않습니다.",
                              )}
                            </p>
                          </div>
                          <div className={styles["policy-section"]}>
                            <h4>{t("■ 개인정보 관련 민원 서비스")}</h4>
                            <p>
                              {t(
                                "개인정보 보호 및 관련 민원 처리를 위해 아래와 같이 개인정보관리책임자를 지정하고 있습니다.",
                              )}
                            </p>
                            <ul>
                              <li>{t("개인정보관리책임자: 황유정")}</li>
                              <li>{t("이메일: freakmakers@gmail.com")}</li>
                            </ul>
                          </div>
                          <div
                            className={`${styles["policy-section"]} ${styles["policy-date"]}`}
                          >
                            <p>
                              {t("본 방침은")}
                              <strong>{t("2026년 02월 15일")}</strong>
                              {t("부터 시행됩니다.")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles["submit-button"]}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("전송 중...") : t("프로젝트 문의 보내기")}
                </button>
                {submitStatus && (
                  <p
                    role={submitStatus.type === "error" ? "alert" : "status"}
                    className={styles["form-status"]}
                    data-status={submitStatus.type}
                  >
                    {submitStatus.message}
                  </p>
                )}
                <p className={styles["email-fallback"]}>
                  {t("이메일로도 이야기 나눌 수 있어요.")}{" "}
                  <a href="mailto:freakmakers@gmail.com">
                    freakmakers@gmail.com ↗
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
