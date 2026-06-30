export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: '프론트엔드',
    items: ['React', 'Next.js', 'TypeScript'],
  },
  {
    category: '상태 관리',
    items: ['Zustand', 'React 상태 설계 패턴'],
  },
  {
    category: '스타일링',
    items: ['Tailwind CSS', '반응형 UI', '접근 가능한 포커스 상태'],
  },
  {
    category: '테스트',
    items: ['입력 필요: DDoni가 실제로 사용한 테스트 도구'],
  },
  {
    category: '성능',
    items: ['렌더링 최적화', '번들 크기 관리', 'Core Web Vitals'],
  },
  {
    category: '협업',
    items: ['코드 리뷰', '디자인 핸드오프', '이슈 디버깅'],
  },
  {
    category: '도구',
    items: ['npm', 'Git', 'Vercel'],
  },
];
