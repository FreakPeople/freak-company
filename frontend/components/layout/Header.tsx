"use client";

import { trapDialogFocus } from "@/lib/dialog-focus";
import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const links = [
  { href: "/introduce", label: "회사소개" },
  { href: "/#services", label: "만드는 것들" },
  { href: "/#how-we-work", label: "일하는 방식" },
  { href: "/#faq", label: "자주 묻는 질문" },
];

export default function Header() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => menuRef.current?.close();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
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
        <Link href="/" className={styles.logo} aria-label="Freak Makers 홈">
          Freak<span> Makers</span>
          <i aria-hidden="true">.</i>
        </Link>
        <nav className={styles.nav} aria-label="주 메뉴">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className={styles.cta} href="/#contact">
          프로젝트 문의 <span aria-hidden="true">↗</span>
        </Link>
        <button
          ref={triggerRef}
          className={styles.toggle}
          type="button"
          aria-label="메뉴 열기"
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
            <button type="button" onClick={closeMenu} aria-label="메뉴 닫기">
              ×
            </button>
          </div>
          <nav aria-label="모바일 주 메뉴">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <Link className={styles.cta} href="/#contact" onClick={closeMenu}>
            프로젝트 문의 ↗
          </Link>
        </div>
      </dialog>
    </header>
  );
}
