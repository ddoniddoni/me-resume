export type Profile = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  blog: string;
  linkedin: string;
  resumePdfUrl: string;
  resumeSourceUrl: string;
};

export const profile: Profile = {
  name: '박상돈',
  role: '프론트엔드 개발자',
  headline: '사용자의 필요를 넘어 기대까지 고려하는 프론트엔드를 만듭니다.',
  summary:
    '5년 차 프론트엔드 개발자로 Next.js, React, Angular 기반 서비스에서 UI/UX 개선, 성능 최적화, 공통 컴포넌트 설계, 운영 이슈 대응을 맡아왔습니다.',
  location: '서울시 송파구',
  email: 'psdkei@naver.com',
  github: 'https://github.com/ddoniddoni',
  blog: 'https://velog.io/@psdkey/posts',
  // TODO: 공개 LinkedIn 프로필이 준비되면 URL을 입력하세요.
  linkedin: '',
  // TODO: 실제 이력서 PDF를 public/resume/resume.pdf에 추가한 뒤 경로를 입력하세요.
  resumePdfUrl: '',
  resumeSourceUrl: 'https://github.com/ddoniddoni/resume',
};

export type CareerItem = {
  company: string;
  period: string;
  summary: string;
  roles: string[];
  details: {
    title: string;
    period: string;
    description: string;
  }[];
};

export const careerItems: CareerItem[] = [
  {
    company: '더블다운게임즈',
    period: '2024.06 - 2025.04',
    summary:
      'Next.js, React 기반 플랫폼 웹 애플리케이션을 개발하며 서비스와 관리자 페이지의 UI/UX 개선, 성능 최적화, 공통 컴포넌트 구조 설계를 담당했습니다.',
    roles: ['Next.js', 'React', 'TypeScript', 'Recoil', 'Sass'],
    details: [
      {
        title: '커스텀 방 만들기 기능 개발',
        period: '2024.09 - 2025.02',
        description:
          '사용자 커스텀 방 생성, 수정, 삭제 UI를 구현하고 친구 목록, 쪽지, 선물, 방 관리 기능까지 연계해 사용자 참여 경험과 운영 효율을 함께 높였습니다.',
      },
      {
        title: '렌더링 병목 및 UX 흐름 개선',
        period: '2024 하반기',
        description:
          '초기 로딩 지연과 불필요한 리렌더 구간을 분석해 렌더링 구조와 클라이언트 상태를 정리했고, 주요 화면의 체감 성능과 안정성을 개선했습니다.',
      },
      {
        title: '공통 컴포넌트 구조화 및 운영 화면 고도화',
        period: '2024 - 2025',
        description:
          '중복 UI 로직을 공통 컴포넌트 구조로 재설계하고 관리자 페이지 신규 기능과 오류 케이스를 정리해 유지보수성과 사용 편의성을 높였습니다.',
      },
    ],
  },
  {
    company: '나임네트웍스',
    period: '2020.11 - 2023.11',
    summary:
      'SDDC 솔루션 프론트엔드 개발과 유지보수를 맡아 가상화 및 클라우드 인프라 관리 화면, 물리/논리 인프라 구조 시각화, 다국어 UI를 구현했습니다.',
    roles: ['Angular', 'TypeScript', 'Sass', 'Visualization', 'i18n'],
    details: [
      {
        title: '서울대병원 SDDC 솔루션 구축',
        period: '2021.06 - 2022.01',
        description:
          'Excel 기반 자산 일괄 등록, 수정, Export 기능과 Rack 실장도를 구현해 대규모 인프라 자산을 직관적으로 관리할 수 있는 UI를 개발했습니다.',
      },
      {
        title: '한국수력원자력 납품 및 테마 기능 개발',
        period: '2022.08',
        description:
          '사용자별 theme 값 기반 디자인 전환 구조를 설계하고 현장 구축과 테스트까지 수행해 고객 요구사항 대응과 서비스 안정성 검증을 함께 진행했습니다.',
      },
      {
        title: '공통 UI 구조화와 화면 최적화',
        period: '2020.11 - 2023.11',
        description:
          '차트, Drag & Drop, 대시보드 구성 요소를 개발하고 공통 UI 컴포넌트를 정리해 코드 일관성, 재사용성, 확장성을 높였습니다.',
      },
    ],
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
