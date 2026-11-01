"use client";

import { useLocale } from "@/components/preferences/LocaleProvider";

import { useState, useEffect } from "react";
import Link from "@/components/LocalizedLink";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const checkScroll = () => setIsVisible(window.scrollY > 600);
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div>
            <h2>
              {t("다음 아이디어,")}
              <br />
              {t("함께 만들어볼까요?")}
            </h2>
            <Link className={styles.contact} href="/#contact">
              {t("프로젝트 이야기하기")}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <nav aria-label={t("하단 메뉴")}>
            <Link href="/introduce">{t("회사소개")}</Link>
            <Link href="/#services">{t("만드는 것들")}</Link>
            <Link href="/#how-we-work">{t("일하는 방식")}</Link>
            <Link href="/#faq">{t("자주 묻는 질문")}</Link>
          </nav>
        </div>
        <div className={styles.bottom}>
          <div>
            <Link href="/" className={styles.logo}>
              Freak Makers.
            </Link>
            <p>{t("아이디어를 실제 서비스로 만드는 개발 파트너")}</p>
          </div>
          <a href="mailto:freakmakers@gmail.com">freakmakers@gmail.com ↗</a>
        </div>
        <p className={styles.copyright}>
          © 2026 Freak Makers. All rights reserved.
        </p>
      </div>
      <button
        className={styles.backTop}
        hidden={!isVisible}
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          })
        }
        aria-label={t("페이지 맨 위로")}
      >
        <Image
          src="/back-to-top.svg"
          alt=""
          width={64}
          height={64}
          unoptimized
        />
      </button>
    </footer>
  );
}
