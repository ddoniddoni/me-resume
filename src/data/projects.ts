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
    slug: 'custom-room-platform',
    title: '커스텀 방 만들기 기능',
    subtitle:
      '사용자 커스텀 방 생성과 관리 흐름을 연결한 플랫폼 웹 기능입니다.',
    period: '2024.09 - 2025.02',
    role: '프론트엔드 개발자',
    techStack: ['Next.js', 'React', 'TypeScript', 'Recoil', 'Sass'],
    summary:
      '더블다운게임즈에서 사용자 커스텀 방 생성, 수정, 삭제 UI와 친구 목록, 쪽지, 선물, 방 관리 기능을 연계해 구현했습니다.',
    problem:
      '사용자가 직접 방을 만들고 관리하는 과정에서 여러 기능 흐름이 연결되어야 했고, 운영 관점에서도 관리가 쉬운 UI가 필요했습니다.',
    solution: [
      '방 생성, 수정, 삭제 화면을 사용자 흐름에 맞춰 구현했습니다.',
      '친구 목록, 쪽지, 선물, 방 관리 기능과 이어지는 화면 상태를 정리했습니다.',
      '서비스 UI와 관리자 관점의 유지보수성을 함께 고려했습니다.',
    ],
    impact: [
      '사용자가 커스텀 방을 더 직관적으로 관리할 수 있는 참여 경험을 제공했습니다.',
      '운영자가 관련 기능을 다루기 쉬운 구조로 UI 흐름을 정리했습니다.',
    ],
    learned: [
      '사용자 기능은 단일 화면 완성도뿐 아니라 주변 기능과의 연결 흐름이 중요하다는 점을 경험했습니다.',
    ],
  },
  {
    slug: 'sddc-infrastructure-management',
    title: 'SDDC 인프라 관리 UI',
    subtitle:
      '대규모 인프라 자산을 관리하고 시각화하는 솔루션 프론트엔드입니다.',
    period: '2021.06 - 2022.01',
    role: '프론트엔드 개발자',
    techStack: ['Angular', 'TypeScript', 'Sass', 'Visualization', 'i18n'],
    summary:
      '나임네트웍스에서 서울대병원 SDDC 솔루션 구축에 참여해 Excel 기반 자산 관리와 Rack 실장도 UI를 구현했습니다.',
    problem:
      '대규모 물리/논리 인프라 자산을 사람이 읽고 관리하기 쉬운 화면으로 제공해야 했습니다.',
    solution: [
      'Excel 기반 자산 일괄 등록, 수정, Export 기능을 구현했습니다.',
      'Rack 실장도를 통해 인프라 구성을 직관적으로 파악할 수 있게 했습니다.',
      '가상화 및 클라우드 인프라 관리 화면의 유지보수를 담당했습니다.',
    ],
    impact: [
      '복잡한 인프라 자산을 화면에서 더 쉽게 확인하고 관리할 수 있게 했습니다.',
      '운영 업무에 필요한 등록, 수정, 내보내기 흐름을 프론트엔드에서 지원했습니다.',
    ],
    learned: [
      '업무 도메인이 복잡할수록 화면 구조와 정보 밀도 조절이 사용성에 직접적인 영향을 준다는 점을 배웠습니다.',
    ],
  },
  {
    slug: 'theme-delivery-system',
    title: '사용자별 테마 전환 기능',
    subtitle:
      '고객 요구사항에 맞춘 테마 구조와 현장 검증을 함께 수행한 작업입니다.',
    period: '2022.08',
    role: '프론트엔드 개발자',
    techStack: ['Angular', 'TypeScript', 'Sass'],
    summary:
      '한국수력원자력 납품 과정에서 사용자별 theme 값 기반 디자인 전환 구조를 설계하고 현장 구축과 테스트를 수행했습니다.',
    problem:
      '현장 요구사항에 맞춰 사용자별로 다른 화면 테마를 안정적으로 제공해야 했습니다.',
    solution: [
      '사용자별 theme 값을 기준으로 디자인이 전환되는 구조를 설계했습니다.',
      '현장 구축 환경에서 기능 동작과 화면 안정성을 함께 확인했습니다.',
      '고객 요구사항 대응 과정에서 테스트와 수정 흐름을 반복했습니다.',
    ],
    impact: [
      '고객 환경에 맞는 테마 전환 요구사항을 실제 운영 환경에 반영했습니다.',
      '납품 과정에서 서비스 안정성을 검증하고 대응 속도를 높였습니다.',
    ],
    learned: [
      '프론트엔드 기능은 개발 완료 이후 실제 환경 검증까지 포함해야 비로소 사용자에게 전달된다는 점을 체감했습니다.',
    ],
  },
];
