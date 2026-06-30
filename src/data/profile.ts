export type Profile = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumePdfUrl: string;
};

export const profile: Profile = {
  name: 'DDoni',
  role: '프론트엔드 개발자',
  headline:
    '접근성과 유지보수성을 고려한 React 인터페이스를 제품 관점으로 설계하고 구현합니다.',
  summary:
    'React, Next.js, TypeScript 기반 UI 아키텍처, 성능 개선, 운영 이슈 해결 경험을 보여주는 프론트엔드 포트폴리오입니다.',
  // TODO: DDoni가 공개해도 되는 지역 정보로 교체하세요.
  location: '지역 입력 필요',
  // TODO: DDoni의 공개 이메일로 교체하세요.
  email: '',
  // TODO: DDoni의 공개 GitHub 프로필 URL로 교체하세요.
  github: '',
  // TODO: DDoni의 공개 LinkedIn 프로필 URL로 교체하세요.
  linkedin: '',
  // TODO: 실제 이력서 PDF를 public/resume/resume.pdf에 추가하세요.
  resumePdfUrl: '/resume/resume.pdf',
};
