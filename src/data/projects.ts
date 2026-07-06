export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  summary: string;
  deployUrl: string;
  problem: string;
  demoAccounts: Array<{
    role: string;
    email: string;
    password: string;
  }>;
  users: Array<{
    role: string;
    goal: string;
    tasks: string;
  }>;
  aiFeatures: string[];
  operationFeatures: string[];
  techStack: string[];
};

export const supportFlowProject: PortfolioProject = {
  id: 'support-flow',
  title: 'AI Support Flow',
  category: 'AI 고객지원 운영 대시보드',
  summary:
    'AI가 문의 맥락을 정리해주고, 지원팀이 더 빠르게 우선순위를 판단하도록 돕는 AI 고객지원 운영 대시보드입니다.',
  deployUrl: 'https://support-flow-five.vercel.app/',
  problem:
    '고객지원팀은 문의가 많아질수록 답변 속도만으로 운영 품질을 유지하기 어렵습니다. 먼저 확인해야 할 문의, 위험 신호, 공개 답변과 내부 메모의 구분, 역할별 권한 분리를 한 흐름 안에서 관리해야 합니다.',
  demoAccounts: [
    {
      role: '고객',
      email: 'customer@test.com',
      password: '11111111',
    },
    {
      role: '상담원',
      email: 'agent@test.com',
      password: '11111111',
    },
    {
      role: '관리자',
      email: 'admin@test.com',
      password: '11111111',
    },
  ],
  users: [
    {
      role: '고객',
      goal: '문의 등록과 답변 확인',
      tasks: '문의 등록, 내 문의 조회, 공개 답변 확인',
    },
    {
      role: '상담원',
      goal: '배정된 문의 처리',
      tasks: '상태 변경, 고객 답변, 내부 메모, AI 분석 확인',
    },
    {
      role: '관리자',
      goal: '전체 지원 운영 관리',
      tasks: '전체 문의 조회, 담당자 배정, 우선순위 조정, 운영 지표 확인',
    },
  ],
  aiFeatures: [
    '문의 요약',
    '카테고리, 감정, 긴급도, 고객 의도 제안',
    '추천 우선순위와 추천 상태 제안',
    '답변 초안 생성',
    '검토 필요 여부 표시',
  ],
  operationFeatures: [
    '문의 접수부터 답변 완료까지의 상태 관리',
    '고객, 상담원, 관리자 역할별 정보 노출 분리',
    '고객 공개 답변과 내부 메모 분리',
    '담당자, 우선순위, 상태, 카테고리, SLA 위험 관리',
    'AI 답변 초안은 자동 발송하지 않고 상담원이 검토 후 사용',
  ],
  techStack: [
    'Next.js',
    'React',
    'TypeScript',
    'Supabase',
    'TanStack Query',
    'Zustand',
    'Tailwind CSS',
  ],
};
