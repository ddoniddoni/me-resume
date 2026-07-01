export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: 'Framework',
    items: ['Next.js', 'Angular', 'TypeScript', 'JavaScript'],
  },
  {
    category: 'UI & State',
    items: ['Recoil', 'Jotai', 'TanStack Query', 'REST API', 'i18n'],
  },
  {
    category: '스타일링',
    items: ['Sass', 'CSS Modules', 'Responsive UI'],
  },
  {
    category: '성능',
    items: ['렌더링 최적화', '초기 로딩 개선', '불필요한 리렌더 정리'],
  },
  {
    category: '업무 강점',
    items: [
      'UI/UX 개선',
      '공통 컴포넌트 설계',
      '관리자 페이지 개발',
      '운영 이슈 대응',
      '문서화',
    ],
  },
  {
    category: '시각화/운영 UI',
    items: ['Visualization', 'Chart UI', 'Drag & Drop', '대시보드 구성'],
  },
];
