# DDoni의 프론트엔드 퀘스트

프론트엔드 개발자 DDoni의 포트폴리오입니다. `/` 진입 시 전체 화면 2D 게임 맵이 먼저 열리고, 채용 담당자가 이력서, 프로젝트, 기술, 연락처를 바로 확인할 수 있도록 페이지 보기와 직접 접근 버튼을 함께 제공합니다.

## 기술 스택

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Phaser
- Zustand
- npm

## 로컬 실행

```bash
npm install
npm run dev
```

기본 주소는 `http://localhost:3000`입니다. 이미 포트가 사용 중이면 Next.js가 다른 포트를 안내합니다.

## 검증 명령

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run format
```

현재 테스트 스크립트는 테스트 파일이 없어도 통과하도록 설정되어 있습니다.

## 게임 에셋 생성

현재 게임은 Phaser가 `public/assets`의 PNG 타일셋, 스프라이트시트, Tiled 호환 JSON 맵을 로드하는 구조입니다.

```bash
npm run assets:generate
```

생성되는 파일:

- `public/assets/tiles/portfolio-campus.png`
- `public/assets/sprites/player.png`
- `public/assets/sprites/stations.png`
- `public/assets/maps/portfolio-campus.json`

## 콘텐츠 수정 위치

- 프로필과 연락처: `src/data/profile.ts`
- 프로젝트: `src/data/projects.ts`
- 기술 스택: `src/data/skills.ts`
- 경험 섹션: `src/data/experiences.ts`
- 이력서 PDF: `public/resume/resume.pdf`

개인정보는 공개 가능한 값만 입력합니다. 이메일, GitHub, LinkedIn, 이력서 PDF는 실제 공개 정보가 준비된 뒤 교체하세요.

## 디자인 기준

`DESIGN.md`를 기준으로 흰 캔버스, 조용한 타이포그래피, 단일 블루 액센트, pill CTA, 큰 radius의 feature card를 사용합니다. Coinbase 전용 폰트는 사용하지 않고 한국어 환경에 맞는 시스템 폰트 fallback을 사용합니다.

## 게임 지도

Phaser 지도는 기본 경험이지만, 필수 접근 경로는 아닙니다. 모든 주요 정보는 HUD 버튼과 페이지 보기의 일반 HTML 섹션에서도 접근할 수 있습니다.

게임 코드는 클라이언트에서 동적으로 로드합니다. `prefers-reduced-motion`이 켜져 있으면 게임 로딩을 멈추고 바로가기 버튼과 페이지 보기 사용을 안내합니다.

## Git 규칙

- 기본 개발 브랜치: `develop`
- 작업 브랜치 예시: `feature/performance-polish`
- 커밋 형식: Conventional Commits

예시:

```bash
git commit -m "feat(ui): add project modal"
git commit -m "fix(ui): improve responsive accessibility"
```
