# Freak Makers 홈페이지 UI/UX 개선

2026-11-01 · 프로젝트 로컬 소스와 로컬 Chromium 기준

## Mode / Chosen skills

`audit → build-marketing → verify`

- `senior-ui-ux-orchestrator`: 범위, 우선순위, 검증 기준 결정.
- `ux-audit-skill`: 기존 탐색, 문의, 키보드 접근, 모바일 가독성 분석.
- `marketing-site-skill`: 홈페이지와 공유 헤더·푸터 개선.
- `ui-ux-pro-max`: 로컬 디자인 데이터에서 절제된 타이포그래피, 단일 강조색, 폼 레이블, 모션 감소 원칙 참고.

Privacy mode: `local-first`. 프로젝트 코드·스크린샷·입력 데이터를 외부 디자인 서비스로 전송하지 않았다. 브라우저 검사 중 문의 POST는 모의 응답으로 처리했으며 실제 문의는 보내지 않았다.

## Work completed

기존 검정·앰버 계열과 브랜드 문구를 유지하면서 서비스 이해 → 업무 방식 → FAQ → 문의 순서로 구성했다. 서비스 범위는 기존 `frontend/analysis.md` 및 회사소개 페이지에 있는 내용을 사용했다. 새 고객 실적, 가격, 납기 보장, 고객 후기는 만들지 않았다.

| 우선순위 | 기존 문제 / 근거 | 적용 결과 |
| --- | --- | --- |
| P1 | 문의 대상 `/api/contact.php`가 저장소에 없고 로컬 응답은 404. source, automated | 접수 성공은 서버 성공 응답에서만 표시. 오류 시 입력값 유지, 재시도 가능, 15초 제한, 이메일 대체 경로 제공. **실제 접수 서버 연결은 미완료.** |
| P1 | 데스크톱 회사 메뉴가 비대화형 div이며, 모바일 메뉴와 개인정보 창에 포커스 제어가 부족함. source | 실제 링크, native dialog, Tab/Shift+Tab 순환, Escape 닫기, 포커스 복귀, 스크롤 잠금·해제 적용. |
| P2 | 홈페이지의 공유 헤더·푸터를 포함한 빈 `href="#"` 링크 13개. 기존 브라우저 측정 | 실제 회사소개 경로와 서비스·업무 방식·FAQ·문의 앵커로 연결. 최종 빈 링크 0개. |
| P2 | 첫 화면에 H1 3개, 구체적 서비스 안내와 즉시 문의 동선 부족. source, Manual | H1 하나, 개발 범위 설명, 문의 기본 CTA, 서비스 탐색 보조 CTA 및 3가지 서비스 영역 추가. |
| P2 | 모바일 비교 영역이 질문·VS·답변 3열을 유지해 문장이 지나치게 잘게 줄바꿈됨. source, screenshot, Manual | 모바일에서는 질문 뒤에 답변을 세로 배치하고 답변에 앰버 선으로 위계 제공. |
| P2 | 입력 필드의 이름이 placeholder에만 있고 입력 후 사라짐. source | 지속 표시 label, 이름·회사·이메일·전화 자동완성, 필수 안내, 인라인 상태 알림 적용. |
| P2 | 카드와 제목이 애니메이션 전까지 숨겨지고 모션 감소 설정이 없음. source, screenshot | 콘텐츠를 즉시 표시하고 전역 `prefers-reduced-motion` 처리, 본문 바로가기와 명확한 focus 표시 추가. |
| P2 | FAQ 열림 상태 및 패널 연결이 접근성 속성에 반영되지 않음. source | aria-expanded / aria-controls / region 및 닫힌 패널 hidden 처리. |
| P3 | 푸터에 예시 사업자번호·전화·주소와 연결되지 않는 소셜 링크가 있음. source, Manual | 검증되지 않은 예시 정보와 빈 소셜 링크 제거. 기존 개인정보 안내에 있던 이메일로 통일. |

## Ran

- 프로덕션 빌드 및 빌드 내 TypeScript 검사 통과: `reports/ui-ux/build.txt`.
- `npm run lint`: 오류 0개. 회사소개 페이지의 기존 `<img>` 경고 8개가 남음: `reports/ui-ux/lint.txt`.
- 별도 `tsc --noEmit --incremental false` 종료 코드 0: `reports/ui-ux/typecheck.txt`는 진단 없이 종료한 원본 출력이다.
- 실제 Chromium 1440×1000 / 768×1024 / 390×844 / 320×740에서 가로 넘침, 런타임 오류, 빈 링크, 누락 앵커 없음: `reports/ui-ux/browser-checks.json`.
- 모바일 메뉴 Tab 순환·Escape·포커스 복귀·스크롤 해제, 서비스 앵커 이동, FAQ 열고 닫기, 개인정보 창 포커스 순환, 회사소개에서 홈 문의 이동 검증: `reports/ui-ux/browser-checks.json`.
- 모의 503 실패 응답에서 입력 보존·에러 안내·버튼 복구, 모의 성공 응답에서 성공 알림·폼 초기화 검증: `reports/ui-ux/browser-checks.json`. 실제 문의 수신 검증을 의미하지 않는다.
- axe-core의 WCAG 2 A/AA 및 2.1 A/AA 태그로 데스크톱 홈·모바일 홈·모바일 메뉴·개인정보 창 검사: 자동 위반 0건. 홈에서 수동 판단이 필요한 incomplete 항목은 남아 있어 전체 접근성 적합 인증을 의미하지 않는다: `reports/ui-ux/browser-checks.json`.
- 빌드된 실제 HTML의 메타데이터 검사: title, description, Open Graph title/description, Twitter card, H1 확인. canonical과 og:image 누락을 포함해 전체 메타데이터 게이트는 통과하지 않음: `reports/ui-ux/metadata.json`.
- 스킬의 HTTP smoke 도구로 로컬 홈페이지 200 및 HTML 응답 확인: `reports/ui-ux/http-smoke/summary.json`. 해당 도구 자체에는 스크린샷 기능이 없으며 실제 화면 검증은 별도의 Chromium 검사로 수행했다.

## Manual

변경 후 데스크톱 전체 화면과 모바일 전체·첫 화면 스크린샷을 직접 검토했다. 텍스트 위계, 배경 이미지 위 가독성, 비교 문단의 폭, 문의 필드 레이블, 모바일 메뉴 버튼의 식별성을 확인했다. 성능 점수나 전환율 향상 수치는 측정하지 않았다.

브랜드 컬러를 유지한 절제된 편집형 레이아웃을 선택했다. 장식적 모션과 고객 수치 추가보다 사실에 근거한 서비스 설명과 안정적인 문의 동선을 우선했다. 한 페이지와 공유 컴포넌트 범위의 단일 세션 작업으로 별도 멀티에이전트·위키 운영은 적용하지 않았다.

## Artifacts

- [데스크톱 첫 화면](after-desktop-first-screen.png)
- [모바일 첫 화면](after-mobile-first-screen.png)
- [데스크톱 전체](after-desktop.png)
- [모바일 전체](after-mobile.png)
- [브라우저·접근성 결과](browser-checks.json)

## Skipped / Risks / Next step

1. **실제 문의 수신:** API 구현·배포 설정·메일 서비스 연결이 저장소에 없어 검증하지 못했다. 접수 서버 또는 올바른 API 경로를 연결하고 실제 수신을 확인해야 한다.
2. **운영 정보 확인:** 표시한 이메일은 기존 개인정보 안내에서 가져왔다. 메일함 수신 가능 여부는 확인하지 않았다. 제거한 예시 기업 정보는 실제 사업 정보로 확인 후 추가해야 한다. 개인정보 안내 본문은 법률 검토 없이 유지했다.
3. **canonical / 공유 이미지:** 공식 운영 도메인과 승인된 소셜 이미지가 없어 임의 URL을 넣지 않았다. 도메인 확정 후 metadataBase·canonical·OG 이미지를 설정해야 한다.
4. **Lighthouse / 전체 접근성 인증:** Lighthouse, 스크린리더, 실제 휴대기기, Safari·Firefox 검사는 수행하지 않았다. 검사 범위는 로컬 Chromium과 명시한 자동 규칙이다.
5. **회사소개 페이지:** 공유 헤더·푸터와 본문 바로가기 목적지만 반영했다. 회사소개 콘텐츠 전체를 재설계하거나 해당 페이지 전체 접근성을 감사한 것은 아니다.
6. `frontend/AGENTS.md`는 설치된 Next.js의 `next dev`가 자동 생성한 프레임워크 안내 파일이다. 앱 의존성은 추가하거나 변경하지 않았다.
