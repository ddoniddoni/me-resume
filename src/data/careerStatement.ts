export type CareerStatementProject = {
  title: string;
  content: string;
  role: string;
  implementations: string[];
  results: string[];
};

export type CareerStatementItem = {
  company: string;
  position: string;
  period: string;
  techStack: string[];
  responsibilities: string[];
  projects: CareerStatementProject[];
  extraAchievements: string[];
};

export const careerStatementItems: CareerStatementItem[] = [
  {
    company: '더블다운게임즈',
    position: '프론트엔드 개발',
    period: '2024.06 - 2025.04, 2026.01 - 2026.03',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Recoil',
      'TanStack Query',
      'Zustand',
      'HTML',
      'SCSS',
    ],
    responsibilities: [
      'Next.js & React 기반의 웹 플랫폼 프론트엔드 개발',
      'UI/UX 개선 및 프론트엔드 성능 최적화 수행',
      '재사용 가능한 컴포넌트 설계 및 코드 유지보수성 향상',
      '관리자 페이지 신규 기능 개발 및 운영 효율성 개선',
    ],
    projects: [
      {
        title: '커스텀 방 만들기 기능 개발',
        content: '사용자가 직접 커스텀 방을 만들 수 있는 기능 개발',
        role: '프론트엔드 전체 구현 및 관련 기능 연동',
        implementations: [
          '커스텀 방 생성/수정/삭제 UI 개발',
          '친구 목록 연동, 쪽지 보내기, 선물 기능, 방 관리 기능 등 연계 모듈 개발',
        ],
        results: [
          '신규 기능 추가로 사용자 참여도 증가 및 UX 강화',
          '기능 단위 컴포넌트화로 유지보수 및 기능 확장 용이',
          '관리자 페이지 기능과의 연동을 통해 운영 효율성 개선',
        ],
      },
    ],
    extraAchievements: [
      '성능 최적화 작업: 렌더링 병목 구간 개선, 불필요한 리렌더 제거',
      '공통 UI 컴포넌트 설계 및 라이브러리화',
      '개발 초기 단계부터 UI/UX 관점 고려로 사용자 편의성 향상',
    ],
  },
  {
    company: '나임네트웍스',
    position: '프론트엔드 개발',
    period: '2020.11 - 2023.11',
    techStack: ['Angular', 'TypeScript', 'HTML', 'SCSS'],
    responsibilities: [
      'Angular 기반 SDDC 솔루션 프론트엔드 개발 및 유지보수',
      '화면 설계 및 다국어 번역, UI/UX 기능 고도화',
      '자산관리, Rack 관리, 대시보드, 구성도 등 주요 화면 개발',
      '핵심 컴포넌트 개발',
      '솔루션 설치 환경 구성',
      'bugfix 및 유지보수 업무 수행',
    ],
    projects: [
      {
        title: '대학병원 SDDC 솔루션 구축',
        content: '서울대병원 전산센터 이전에 맞춰 SDDC 솔루션 도입',
        role: '프론트엔드 개발 담당',
        implementations: [
          'Excel 기반 자산 일괄 등록/수정/Export 기능',
          'Rack 실장도 구현: 최대 유휴 Unit 계산, 장비 이미지 연동 등',
          'i18n 다국어 지원',
        ],
        results: [
          '사용자 편의성 향상, 수작업 감소',
          '다국어 번역으로 해외 병원에도 대응 가능한 구조 마련',
        ],
      },
      {
        title: '공기업 SDDC 솔루션 납품',
        content: 'SDDC 솔루션 납품 및 테마 요청 대응',
        role: '테마 기능 개발, 구축 및 테스트',
        implementations: [
          '사용자별 theme 값 기반 CSS 전환 구조 설계 및 적용',
        ],
        results: ['고객 요청에 맞춘 테마 전환 구조 제공'],
      },
    ],
    extraAchievements: [
      'Chart 컴포넌트(Pie/Line), Drag & Drop, 대시보드 구성 컴포넌트 등 10종 이상 개발',
      '솔루션 공통 컴포넌트 구조화 및 재사용성 향상',
      '팀원 코드 리뷰 및 신규 기능 테스트에 적극 참여',
    ],
  },
];
