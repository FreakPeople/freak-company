'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState<Record<string, boolean>>({
    company: false,
    business: false,
    products: false,
    support: false,
  });
  const dropdownTimeouts = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({
    company: null,
    business: null,
    products: null,
    support: null,
  });

  const scrollToContact = () => {
    closeMobileMenu();
    if (pathname !== '/') {
      router.push('/#contact');
      return;
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobileDropdown = (menuId: string) => {
    setShowDropdown((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  const handleDropdownEnter = (menuId: string) => {
    if (dropdownTimeouts.current[menuId]) {
      clearTimeout(dropdownTimeouts.current[menuId]!);
      dropdownTimeouts.current[menuId] = null;
    }
    setShowDropdown((prev) => ({ ...prev, [menuId]: true }));
  };

  const handleDropdownLeave = (menuId: string) => {
    dropdownTimeouts.current[menuId] = setTimeout(() => {
      setShowDropdown((prev) => ({ ...prev, [menuId]: false }));
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles['header-container']}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles['logo-text']}>Freak</span>
        </Link>

        {/* Navigation & CTA */}
        <div className={styles['nav-wrapper']}>
          <nav className={styles.nav}>
            {/* 회사소개 */}
            <div
              className={`${styles['nav-link']} ${styles['dropdown-trigger']}`}
              onMouseEnter={() => handleDropdownEnter('company')}
              onMouseLeave={() => handleDropdownLeave('company')}
            >
              회사소개
              {showDropdown.company && (
                <div
                  onMouseEnter={() => handleDropdownEnter('company')}
                  onMouseLeave={() => handleDropdownLeave('company')}
                />
              )}
            </div>

            {/* 사업분야 */}
            <div
              className={`${styles['nav-link']} ${styles['dropdown-trigger']}`}
              onMouseEnter={() => handleDropdownEnter('business')}
              onMouseLeave={() => handleDropdownLeave('business')}
            >
              사업분야
              {showDropdown.business && (
                <div
                  className={styles['dropdown-menu']}
                  onMouseEnter={() => handleDropdownEnter('business')}
                  onMouseLeave={() => handleDropdownLeave('business')}
                >
                  <a href="#" className={styles['dropdown-item']}>
                    정부지원사업
                  </a>
                  <a href="#" className={styles['dropdown-item']}>
                    웹 사이트 개발
                  </a>
                  <a href="#" className={styles['dropdown-item']}>
                    플랫폼 개발
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* CTA Button */}
          <button className={styles['cta-button']} onClick={scrollToContact}>
            3초만에 문의하기
          </button>
        </div>

        {/* 햄버거 버튼 (모바일) */}
        <button
          className={styles['mobile-menu-toggle']}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          style={{ visibility: isMobileMenuOpen ? 'hidden' : 'visible' }}
        >
          <span
            className={`${styles['hamburger-line']} ${isMobileMenuOpen ? styles.active : ''}`}
          />
          <span
            className={`${styles['hamburger-line']} ${isMobileMenuOpen ? styles.active : ''}`}
          />
          <span
            className={`${styles['hamburger-line']} ${isMobileMenuOpen ? styles.active : ''}`}
          />
        </button>

        {/* 모바일 메뉴 오버레이 */}
        <div
          className={`${styles['mobile-menu-overlay']} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={closeMobileMenu}
        >
          <div className={styles['mobile-menu']} onClick={(e) => e.stopPropagation()}>
            <div className={styles['mobile-menu-header']}>
              <Link href="/" className={styles['mobile-logo']} onClick={closeMobileMenu}>
                <span className={styles['logo-text']}>Freak</span>
              </Link>
              <button
                className={styles['mobile-menu-close']}
                onClick={closeMobileMenu}
                aria-label="메뉴 닫기"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav className={styles['mobile-nav']}>
              {/* 회사소개 */}
              <div className={styles['mobile-nav-item']}>
                <button
                  className={styles['mobile-nav-link']}
                  onClick={() => toggleMobileDropdown('company')}
                >
                  회사소개
                  <svg
                    className={`${styles['mobile-dropdown-icon']} ${showDropdown.company ? styles.active : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`${styles['mobile-dropdown-menu']} ${showDropdown.company ? styles.active : ''}`}
                >
                  <a
                    href="#"
                    className={styles['mobile-dropdown-item']}
                    onClick={closeMobileMenu}
                  >
                    회사소개
                  </a>
                </div>
              </div>

              {/* 사업분야 */}
              <div className={styles['mobile-nav-item']}>
                <button
                  className={styles['mobile-nav-link']}
                  onClick={() => toggleMobileDropdown('business')}
                >
                  사업분야
                  <svg
                    className={`${styles['mobile-dropdown-icon']} ${showDropdown.business ? styles.active : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`${styles['mobile-dropdown-menu']} ${showDropdown.business ? styles.active : ''}`}
                >
                  <a
                    href="#"
                    className={styles['mobile-dropdown-item']}
                    onClick={closeMobileMenu}
                  >
                    정부지원사업
                  </a>
                  <a
                    href="#"
                    className={styles['mobile-dropdown-item']}
                    onClick={closeMobileMenu}
                  >
                    웹 사이트 개발
                  </a>
                  <a
                    href="#"
                    className={styles['mobile-dropdown-item']}
                    onClick={closeMobileMenu}
                  >
                    플랫폼 개발
                  </a>
                </div>
              </div>
            </nav>

            <button className={styles['mobile-cta-button']} onClick={scrollToContact}>
              3초만에 문의하기
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
