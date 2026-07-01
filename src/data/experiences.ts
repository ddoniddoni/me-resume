export type Experience = {
  id: 'components' | 'performance' | 'troubleshooting';
  title: string;
  summary: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: 'components',
    title: '공통 컴포넌트 구조화',
    summary:
      '서비스와 관리자 화면에서 반복되는 UI 로직을 공통 컴포넌트 구조로 정리해 코드 일관성, 재사용성, 확장성을 높였습니다.',
    highlights: [
      '더블다운게임즈에서 중복 UI 로직을 공통 컴포넌트 구조로 재설계했습니다.',
      '나임네트웍스에서 차트, Drag & Drop, 대시보드 구성 요소를 개발하고 공통 UI를 정리했습니다.',
      '화면별 요구사항을 흡수하면서도 유지보수 가능한 컴포넌트 책임 분리를 지향했습니다.',
    ],
  },
  {
    id: 'performance',
    title: '렌더링과 UX 흐름 개선',
    summary:
      '초기 로딩 지연과 불필요한 리렌더 구간을 분석해 렌더링 구조와 클라이언트 상태를 정리하고 체감 성능과 안정성을 개선했습니다.',
    highlights: [
      'Next.js, React 기반 플랫폼 웹 애플리케이션에서 렌더링 병목을 분석했습니다.',
      '클라이언트 상태와 화면 흐름을 정리해 주요 화면의 사용성을 개선했습니다.',
      '성과 수치를 과장하지 않고 실제 경험 중심으로 성능 개선 내용을 설명합니다.',
    ],
  },
  {
    id: 'troubleshooting',
    title: '운영 이슈 대응',
    summary:
      '서비스 페이지, 관리자 화면, 인프라 관리 UI에서 발생하는 오류 케이스를 정리하고 안정적인 사용 흐름으로 연결했습니다.',
    highlights: [
      '관리자 페이지 신규 기능과 오류 케이스를 정리해 운영 편의성을 높였습니다.',
      '현장 구축과 테스트를 함께 수행하며 고객 요구사항 대응과 안정성 검증을 진행했습니다.',
      '대규모 인프라 자산 관리 화면에서 등록, 수정, Export 등 운영 흐름을 UI로 구현했습니다.',
    ],
  },
];
