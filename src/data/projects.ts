export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  period?: string;
  role: string;
  techStack: string[];
  summary: string;
  problem: string;
  solution: string[];
  impact: string[];
  learned: string[];
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'frontend-quest-portfolio',
    title: '프론트엔드 퀘스트 포트폴리오',
    subtitle: '채용 담당자가 바로 확인할 수 있는 인터랙티브 포트폴리오입니다.',
    role: '프론트엔드 개발자',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    summary:
      '빠르게 정보를 확인할 수 있는 전문 포트폴리오 화면에 선택형 2D 탐색 경험을 더한 프로젝트입니다.',
    problem:
      '일반적인 포트폴리오는 기억에 남기 어렵고, 지나치게 게임적인 포트폴리오는 채용 담당자가 필요한 정보를 찾기 어렵습니다.',
    solution: [
      '이력서, 프로젝트, 기술 스택, 연락처를 직접 CTA로 접근할 수 있게 유지했습니다.',
      '포트폴리오 내용을 구조화된 데이터로 분리해 업데이트하기 쉽게 만들었습니다.',
      '게임형 상호작용은 필수 경로가 아닌 선택형 경험으로 제한했습니다.',
    ],
    impact: [
      '핵심 정보 접근을 막지 않으면서 기억에 남는 첫인상을 제공합니다.',
      '프론트엔드 아키텍처, 접근성, 제품적 판단을 함께 보여줍니다.',
    ],
    learned: [
      '표현력 있는 UI 아이디어와 채용 담당자 사용성, 유지보수 가능한 코드 사이의 균형이 중요하다는 점을 반영했습니다.',
    ],
  },
];
