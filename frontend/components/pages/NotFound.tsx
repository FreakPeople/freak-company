"use client";

import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { useLocale } from "@/components/preferences/LocaleProvider";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const { locale } = useLocale();
  const en = locale === "en";
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={styles.scene} aria-hidden="true">
        <span className={styles.starOne}>✦</span><span className={styles.starTwo}>✧</span><span className={styles.starThree}>✦</span>
        <div className={styles.orbit} />
        <div className={styles.code}><span>4</span><span className={styles.planet}>0<i /><i /></span><span>4</span></div>
        <Image className={styles.astronaut} src="/back-to-top.svg" width={180} height={180} alt="" unoptimized preload />
        <span className={styles.bubble}>{en ? "Oops! Wrong planet?" : "어라, 여기가 아닌가?"}</span>
      </div>
      <div className={styles.copy}>
        <p className={styles.label}>404 · {en ? "A little detour" : "잠깐의 우주 미아"}</p>
        <h1>{en ? "This page is still" : "앗, 여긴 아직"}<br />{en ? "uncharted space." : "미지의 행성이에요."}</h1>
        <p className={styles.description}>{en ? "The page may have moved, or it might still be getting ready for launch. Let’s head back somewhere familiar." : "페이지가 이사를 갔거나, 아직 출발을 준비하고 있나 봐요. 우리, 익숙한 곳으로 돌아갈까요?"}</p>
        <div className={styles.actions}><Link className={styles.primary} href="/websites">{en ? "Back to the collection" : "홈페이지 컬렉션으로"}<span aria-hidden="true">↗</span></Link><Link className={styles.secondary} href="/">{en ? "Go home" : "메인으로 돌아가기"}</Link></div>
        <p className={styles.note}>{en ? "Our astronaut is finding the way back. You’re in good company." : "길을 잃어도 괜찮아요. 프릭이 함께 돌아갈게요."}</p>
      </div>
    </main>
  );
}
