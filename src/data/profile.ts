export type Profile = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  blog: string;
  resumeSourceUrl: string;
};

export const profile: Profile = {
  name: '박상돈',
  role: '프론트엔드 개발자',
  headline: '사용자의 필요를 넘어 기대까지 고려하는 프론트엔드를 만듭니다.',
  summary:
    '4년 차 프론트엔드 개발자로 Next.js, React, Angular 기반 서비스에서 UI/UX 개선, 성능 최적화, 공통 컴포넌트 설계, 운영 이슈 대응을 맡아왔습니다.',
  location: '서울시 송파구',
  email: 'psdkei@naver.com',
  github: 'https://github.com/ddoniddoni',
  blog: 'https://velog.io/@psdkey/posts',
  resumeSourceUrl: 'https://github.com/ddoniddoni/resume',
};

export type CareerItem = {
  company: string;
  period: string;
  summary: string;
  roles: string[];
};

export const careerItems: CareerItem[] = [
  {
    company: '더블다운게임즈',
    period: '2024.06 - 2025.04, 2026.01 - 2026.03',
    summary:
      'Next.js, React 기반 웹 플랫폼 프론트엔드 개발을 맡아 UI/UX 개선, 성능 최적화, 재사용 가능한 컴포넌트 설계, 관리자 페이지 신규 기능 개발을 수행했습니다.',
    roles: [
      'Next.js',
      'React',
      'TypeScript',
      'Recoil',
      'TanStack Query',
      'Zustand',
      'HTML',
      'SCSS',
    ],
  },
  {
    company: '나임네트웍스',
    period: '2020.11 - 2023.11',
    summary:
      'Angular 기반 SDDC 솔루션 프론트엔드 개발 및 유지보수를 맡아 자산관리, Rack 관리, 대시보드, 구성도, 다국어 UI, 핵심 컴포넌트를 개발했습니다.',
    roles: ['Angular', 'TypeScript', 'HTML', 'SCSS'],
  },
];

export type EducationItem = {
  period: string;
  title: string;
  detail: string;
};

export const educationItems: EducationItem[] = [
  {
    period: '2011 - 2018',
    title: '신한대학교 컴퓨터공학 학사',
    detail: '2011년 입학, 2018년 졸업 / 학점 4.12 / 4.5',
  },
  {
    period: '2019.05.22',
    title: '정보처리기사',
    detail: '국가공인 자격 취득',
  },
  {
    period: '2025.06',
    title: 'TOEIC Speaking IM2',
    detail: '영어 회화 자격',
  },
];
