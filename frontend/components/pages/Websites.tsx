"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/LocalizedLink";
import { useLocale } from "@/components/preferences/LocaleProvider";
import { localizedHref } from "@/lib/i18n";
import { websitePortfolio, type WebsiteSample } from "@/lib/website-portfolio";
import styles from "./Websites.module.css";

function LiveWebsitePreview({ sample, active }: { sample: WebsiteSample; active: boolean }) {
  const { locale } = useLocale();
  const en = locale === "en";
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1440));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const previewHref = sample.url ?? localizedHref(locale, "/404");

  return (
    <div className={styles.screenshotFrame}>
      <div className={styles.browserBar} aria-hidden="true"><span>● ● ●</span><span>{sample.url ? new URL(sample.url).hostname : en ? "Coming soon" : "새로운 사이트 준비 중"}</span><span>↗</span></div>
      <div ref={frameRef} className={styles.liveViewport}>
        {active && scale > 0 && <iframe
          className={styles.liveFrame}
          src={previewHref}
          title={`${sample.name[locale]} ${en ? "preview" : "미리보기"}`}
          width={1440}
          height={900}
          style={{ transform: `scale(${scale})` }}
          tabIndex={-1}
          aria-hidden="true"
          sandbox={!sample.url || sample.previewScripts === false ? "allow-same-origin" : "allow-scripts allow-same-origin"}
          referrerPolicy="no-referrer"
        />}
        <a
          className={styles.previewOverlay}
          href={previewHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${sample.name[locale]} — ${en ? "open website in a new tab" : "새 탭에서 열기"}`}
        />
      </div>
    </div>
  );
}

export default function Websites() {
  const { locale } = useLocale();
  const en = locale === "en";
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const move = (delta: number) => setActive((value) => (value + delta + websitePortfolio.length) % websitePortfolio.length);

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <Link href="/" className={styles.back}>{en ? "Home" : "메인으로"} <span aria-hidden="true">↗</span></Link>
          <div className={styles.intro}>
            <h1>{en ? "Different stories." : "서로 다른 이야기,"}<br />{en ? "Websites that fit." : "그에 맞는 홈페이지."}</h1>
            <div className={styles.introSide}><p>{en ? "Explore five directions for your next website. Find the starting point that feels like you." : "브랜드의 첫인상부터 방문자의 다음 행동까지. 다섯 가지 홈페이지 샘플에서 우리에게 맞는 방향을 찾아보세요."}</p><a href="#portfolio">{en ? "Explore the samples" : "샘플 둘러보기"} <span aria-hidden="true">↓</span></a></div>
          </div>
        </div>
      </section>

      <section id="portfolio" className={styles.portfolio} aria-label={en ? "Website sample carousel" : "홈페이지 샘플 캐러셀"} aria-roledescription={en ? "carousel" : "캐러셀"}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}><h2>{en ? "Website collection" : "홈페이지 컬렉션"}</h2><span>{en ? "5 concepts. Your next beginning." : "다섯 가지 콘셉트, 새로운 시작."}</span></div>
          <div className={styles.viewport}
            onTouchStart={(event) => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }}
            onTouchCancel={() => { touchStart.current = null; }}
            onTouchEnd={(event) => {
              const start = touchStart.current;
              touchStart.current = null;
              if (!start) return;
              const touch = event.changedTouches[0];
              const dx = touch.clientX - start.x;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(touch.clientY - start.y)) move(dx < 0 ? 1 : -1);
            }}>
            <div className={styles.track} style={{ transform: `translateX(-${active * 100}%)` }}>
              {websitePortfolio.map((sample, index) => (
                <article key={sample.id} id={`sample-${sample.id}`} className={styles.slide} aria-hidden={active !== index} inert={active !== index} aria-roledescription={en ? "slide" : "슬라이드"} aria-label={`${index + 1} / 5`}>
                  <div className={styles.preview}>
                    <LiveWebsitePreview sample={sample} active={active === index} />
                    <p className={styles.previewNote}>{sample.url
                      ? en ? "Select the preview to visit the website ↗" : "미리보기를 누르면 사이트가 새 탭으로 열립니다 ↗"
                      : en ? "Select the preview to open a temporary 404 page ↗" : "그림을 누르면 임시 404 페이지가 새 탭으로 열립니다 ↗"}</p>
                  </div>
                  <div className={styles.details}><span className={styles.category}>Sample {sample.id} <span> / {sample.category}</span></span><h3>{sample.name[locale]}</h3>
                    {!sample.url && <p>{en ? "A new brand story is getting ready for launch. We’ll meet you here when it’s ready." : "새로운 브랜드의 이야기를 담아 차근차근 만들고 있어요. 준비가 끝나면 이곳에서 만나요."}</p>}
                    {sample.url && <div className={styles.tags}><span>{en ? "Desktop & mobile" : "PC · 모바일"}</span><span>{en ? "Live website preview" : "실제 사이트 미리보기"}</span></div>}
                    {sample.url ? <a className={styles.primary} href={sample.url} target="_blank" rel="noopener noreferrer">{en ? "Visit sample website" : "샘플 사이트 열기"}<span aria-hidden="true">↗</span></a> : <div className={styles.pending}><span className={styles.statusDot} />{en ? "Getting ready for launch" : "다음 이야기를 위해 출발 준비 중"}</div>}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.controls}>
            <p aria-live="polite" aria-atomic="true"><b>{String(active + 1).padStart(2, "0")}</b><span> / 05</span><span className={styles.currentName}> {`Portfolio ${active + 1}`}</span></p>
            <div className={styles.arrows}><button type="button" onClick={() => move(-1)} aria-label={en ? "Previous sample" : "이전 샘플"}>←</button><button type="button" onClick={() => move(1)} aria-label={en ? "Next sample" : "다음 샘플"}>→</button></div>
          </div>
          <div className={styles.selector} aria-label={en ? "Choose a sample" : "샘플 선택"}>
            {websitePortfolio.map((sample, index) => <button type="button" key={sample.id} onClick={() => setActive(index)} aria-pressed={active === index} aria-controls={`sample-${sample.id}`}><span>Portfolio {index + 1}</span></button>)}
          </div>
        </div>
      </section>

      <section className={styles.contact}><div className={styles.container}><div><h2>{en ? "A website that feels like you." : "우리다운 홈페이지의 시작."}</h2><p>{en ? "Tell us what caught your eye. We’ll shape it around your business." : "마음에 드는 방향이 있다면 들려주세요. 비즈니스에 맞는 구조와 디자인을 함께 구체화합니다."}</p></div><Link className={styles.primary} href="/#contact">{en ? "Let’s talk about your project" : "프로젝트 이야기하기"}<span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
