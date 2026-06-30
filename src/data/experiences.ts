export type Experience = {
  id: 'components' | 'performance' | 'troubleshooting';
  title: string;
  summary: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: 'components',
    title: '컴포넌트 아키텍처',
    summary:
      '재사용 가능한 UI 컴포넌트를 구축해 일관성, 유지보수성, 구현 속도를 개선했습니다.',
    highlights: [
      '콘텐츠, 레이아웃, 상호작용 책임을 분리했습니다.',
      '재사용과 테스트가 쉬운 컴포넌트 API를 설계했습니다.',
      '반응형 상태에서도 디자인 디테일이 일관되도록 관리했습니다.',
    ],
  },
  {
    id: 'performance',
    title: '성능 최적화',
    summary:
      '렌더링 동작, 로딩 순서, 에셋 무게를 점검해 프론트엔드 반응성을 개선했습니다.',
    highlights: [
      '부가 기능 코드보다 화면에 먼저 보여야 하는 콘텐츠를 우선했습니다.',
      '불필요한 클라이언트 작업을 줄이는 방향으로 구현했습니다.',
      '실제 지표가 제공되기 전까지는 성과를 과장하지 않고 정성적으로 표현했습니다.',
    ],
  },
  {
    id: 'troubleshooting',
    title: '디버깅과 이슈 대응',
    summary:
      'UI 이슈를 체계적으로 재현하고, 원인을 파악한 뒤 유지보수 가능한 프론트엔드 수정으로 연결했습니다.',
    highlights: [
      '구현을 바꾸기 전에 먼저 버그를 재현했습니다.',
      '상태, 레이아웃, 브라우저 동작을 함께 확인하며 원인을 추적했습니다.',
      '이후 유지보수를 위해 수정 내용을 명확히 기록했습니다.',
    ],
  },
];
