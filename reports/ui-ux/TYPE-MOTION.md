# 폰트·모션 정리

2026-11-01 · 범위: 홈, 회사소개, 공유 헤더·푸터

## Chosen skills / Work completed

`senior-ui-ux-orchestrator`의 기존 공개 홈페이지 개선 흐름에서 `marketing-site-skill` 기준으로 적용했다. 개인정보나 프로젝트 자료를 외부 서비스에 업로드하지 않았다.

- 공식 Pretendard v1.3.9 가변 글꼴과 SIL OFL 라이선스를 `frontend/app/fonts/`에 저장했다. `next/font/local`로 프로젝트에서 직접 제공하며 방문자의 브라우저가 외부 폰트 CDN을 호출하지 않는다.
- 제목·본문·설명·보조문구에 공통 크기 변수를 도입했다. 본문 16px, 보조문구 14px, 섹션 제목 28–40px, 홈 대표 제목 38–64px를 기준으로 화면 크기에 따라 조정한다.
- 제목은 700, 강조는 600, 본문은 400을 기본으로 사용한다. 임의의 650·750·800 굵기를 정리하고, 회사소개 숫자 배지의 Comic Sans와 SVG 숫자의 Arial 지정도 제거했다.
- 후기 문구의 지나치게 좁은 줄 높이 0.6을 1.7로 수정했다.
- 후기의 5초 자동 전환과 타이머를 제거했다. 이전·다음 버튼으로만 이동하며 버튼에 접근성 이름을 추가했다.
- 카드 hover 시 위로 떠오르는 효과와 버튼 확대를 제거했다. 색상·테두리 반응 160ms, 수동 후기 전환 200ms만 유지했다. FAQ 높이 변화의 긴 애니메이션은 제거했다.
- 기존 `prefers-reduced-motion` 설정을 유지했다. 배경 이미지의 정적인 확대는 흐림 처리 가장자리를 가리는 용도이며 애니메이션이 아니다.

## Ran

- `reports/ui-ux/type-motion-build.txt`: 최종 Next.js 프로덕션 빌드 및 TypeScript 검사 통과.
- `reports/ui-ux/type-motion-lint.txt`: 린트 오류 0개, 회사소개 페이지 기존 이미지 경고 8개.
- `reports/ui-ux/type-motion-checks.json`: 홈·회사소개 각각 1440 / 768 / 390 / 320px 너비에서 실제 폰트 로딩, 표시 텍스트의 글꼴 일치, 문서 가로 넘침 없음, 런타임 오류 없음 확인.
- 같은 브라우저 검사에서 후기가 5.5초 동안 자동 이동하지 않는 점, 다음 버튼으로 이동하는 점, 200ms 전환, 모션 감소 시 전환 시간 감소, 카드 hover 시 transform 없음 확인.

브라우저 결과의 `overflow` 배열은 화면 밖으로 배치된 개별 요소의 진단 목록이다. 회사소개 배경의 정적 확대와 캐러셀의 비활성 슬라이드는 부모에 의해 잘리며 문서 가로 넘침은 없다. 실제 문서 폭은 `scrollWidth`와 `width`로 검증했다. `fonts` 목록의 Next.js 개발 도구용 Geist는 앱 콘텐츠에 쓰이는 글꼴이 아니다.

## Manual / Artifacts

홈과 회사소개 모바일 스크린샷에서 한글·영문 두께, 제목 줄바꿈, 본문 간격을 직접 검토했다.

- [홈 모바일](type-motion-home-390.png)
- [회사소개 모바일](type-motion-company-390.png)
- [홈 데스크톱](type-motion-home-1440.png)
- [회사소개 데스크톱](type-motion-company-1440.png)

## Skipped / Risks

폰트·모션 변경이므로 메타데이터 검사를 다시 수행하지 않았다. 실제 기기 및 Safari·Firefox 검사는 수행하지 않았다. 문의 API 등 기존 서버 연결 상태는 이번 변경 범위가 아니다. npm 의존성은 변경하지 않았다.

폰트 출처: https://github.com/orioncactus/pretendard/tree/v1.3.9
