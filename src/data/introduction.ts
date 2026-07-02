export type IntroductionSection = {
  title: string;
  body: string;
};

export const introductionSections: IntroductionSection[] = [
  {
    title: '사용자 기대를 기준으로 보는 프론트엔드',
    body:
      '사용자의 필요를 넘어 기대까지 고려하는 화면을 만드는 데 집중합니다. 기능 구현에서 멈추지 않고 흐름, 문구, 상태 변화, 오류 상황까지 함께 보며 서비스가 자연스럽게 느껴지도록 다듬습니다.',
  },
  {
    title: '반복을 구조로 바꾸는 개발 방식',
    body:
      'Next.js, React, Angular 기반 서비스에서 반복되는 UI 로직과 화면 패턴을 공통 컴포넌트로 정리해 왔습니다. 재사용성과 유지보수성을 높이되, 실제 화면 요구사항을 흡수할 수 있는 책임 분리를 중요하게 생각합니다.',
  },
  {
    title: '운영까지 생각하는 문제 해결',
    body:
      '관리자 화면, 서비스 페이지, 인프라 관리 UI에서 오류 케이스와 사용 흐름을 정리하며 안정적인 운영 경험을 만드는 일을 해왔습니다. 과장된 수치보다 실제로 맡았던 문제와 해결 과정을 명확히 설명하는 것을 선호합니다.',
  },
];
