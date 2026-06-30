# DDoni의 프론트엔드 퀘스트

프론트엔드 개발자 DDoni의 포트폴리오입니다. 채용 담당자가 이력서, 프로젝트, 기술, 연락처를 바로 확인할 수 있도록 구성하고, 선택형 2D 포트폴리오 지도를 더해 기억에 남는 탐색 경험을 제공합니다.

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

Phaser 지도는 필수 접근 경로가 아닙니다. 모든 주요 정보는 버튼과 일반 HTML 섹션에서도 접근할 수 있습니다.

성능을 위해 게임 코드는 페이지 진입 즉시 로드하지 않고, 게임 섹션이 화면 가까이에 왔을 때 동적으로 불러옵니다. `prefers-reduced-motion`이 켜져 있으면 게임 로딩을 멈추고 바로가기 버튼과 fallback 섹션 사용을 안내합니다.

## Git 규칙

- 기본 개발 브랜치: `develop`
- 작업 브랜치 예시: `feature/performance-polish`
- 커밋 형식: Conventional Commits

예시:

```bash
git commit -m "feat(ui): add project modal"
git commit -m "fix(ui): improve responsive accessibility"
```
