"use client";

import { useLocale } from "@/components/preferences/LocaleProvider";

import { trapDialogFocus } from "@/lib/dialog-focus";
import { useEffect, useRef } from "react";
import Link from "@/components/LocalizedLink";
import styles from "./Header.module.css";
import PreferencesControls from "@/components/preferences/PreferencesControls";

const links = [
  { href: "/introduce", label: "회사소개" },
  { href: "/#services", label: "만드는 것들", submenu: true },
  { href: "/#how-we-work", label: "일하는 방식" },
  { href: "/#faq", label: "자주 묻는 질문" },
];

export default function Header() {
  const { t } = useLocale();
  const menuRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => menuRef.current?.close();

  const renderNavLink = (link: (typeof links)[number], mobile = false) =>
    link.submenu ? (
      <details
        key={link.href}
        className={styles.submenu}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            event.currentTarget.open = false;
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && event.currentTarget.open) {
            event.preventDefault();
            event.stopPropagation();
            event.currentTarget.open = false;
            event.currentTarget.querySelector("summary")?.focus();
          }
        }}
      >
        <summary>
          {t(link.label)}
          <span className={styles.chevron} aria-hidden="true">⌄</span>
        </summary>
        <div className={styles.submenuPanel}>
          <Link
            href="/websites"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("홈페이지 (새 탭에서 열기)")}
            onClick={(event) => {
              const details = event.currentTarget.closest("details");
              if (details) details.open = false;
              if (mobile) closeMenu();
            }}
          >
            {t("홈페이지")}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </details>
    ) : (
      <Link key={link.href} href={link.href} onClick={mobile ? closeMenu : undefined}>
        {t(link.label)}
        {mobile && <span aria-hidden="true">↗</span>}
      </Link>
    );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1101px)");
    const onResize = () => {
      if (media.matches) menuRef.current?.close();
    };
    media.addEventListener("change", onResize);
    return () => {
      media.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
          aria-label={t("Freak Makers 홈")}
        >
          Freak<span> Makers</span>
          <i aria-hidden="true">.</i>
        </Link>
        <nav className={styles.nav} aria-label={t("주 메뉴")}>
          {links.map((link) => renderNavLink(link))}
        </nav>
        <div className={styles.actions}>
          <PreferencesControls />
          <Link className={styles.cta} href="/#contact">
            {t("프로젝트 문의")}
            <span aria-hidden="true">↗</span>
          </Link>
          <button
            ref={triggerRef}
            className={styles.toggle}
            type="button"
            aria-label={t("메뉴 열기")}
            aria-haspopup="dialog"
            aria-controls="mobile-menu"
            onClick={() => {
              menuRef.current?.showModal();
              document.body.style.overflow = "hidden";
            }}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <dialog
        onKeyDown={trapDialogFocus}
        ref={menuRef}
        id="mobile-menu"
        className={styles.menu}
        aria-labelledby="menu-title"
        onClose={() => {
          document.body.style.overflow = "";
          triggerRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className={styles.menuInner}>
          <div className={styles.menuHeader}>
            <span id="menu-title">Freak Makers.</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label={t("메뉴 닫기")}
            >
              ×
            </button>
          </div>
          <nav aria-label={t("모바일 주 메뉴")}>
            {links.map((link) => renderNavLink(link, true))}
          </nav>
          <Link className={styles.cta} href="/#contact" onClick={closeMenu}>
            {t("프로젝트 문의 ↗")}
          </Link>
        </div>
      </dialog>
    </header>
  );
}
