## Freak 홈페이지

홈페이지 코드는 `frontend/`에 있습니다.

### 로컬 개발

프로젝트 루트에서 실행합니다. Node.js 20.9 이상이 필요하며, `.nvmrc`는 Node.js 24를 사용합니다.

```sh
nvm use
npm --prefix frontend ci
npm run dev
```

Node.js 24가 설치되어 있지 않으면 먼저 `nvm install`을 실행하세요.
개발 서버 실행 후 http://localhost:3000 에서 홈페이지를 확인할 수 있습니다.

루트에서 `npm run build`, `npm start`, `npm run lint`도 실행할 수 있습니다.

### 홈페이지 포트폴리오

`/websites`(영어: `/en/websites`)에서 5개 샘플을 캐러셀로 확인할 수 있습니다.
샘플 정보는 `frontend/lib/website-portfolio.ts`에서 관리합니다.
각 항목의 `url`에 실제 주소를 추가하면 미리보기 그림과 사이트 열기 버튼 모두 해당 주소를 새 탭으로 엽니다.
URL이 있는 샘플은 현재 선택한 사이트를 iframe으로 직접 렌더링합니다.
URL만 추가하면 미리보기가 표시되며 PNG 파일은 필요하지 않습니다.
미리보기 영역을 클릭하면 해당 사이트가 새 탭으로 열립니다.
샘플 5는 임시 콘셉트 미리보기입니다.
URL이 없는 그림도 클릭 가능하며, 임시 주소의 404 페이지를 새 탭으로 엽니다.
404 화면은 `/404`에서 확인할 수 있습니다.
