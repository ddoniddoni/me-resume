import type { ExperienceId, ModalType } from '@/store/portfolioStore';

export type InteractableId =
  | 'projects'
  | 'resume'
  | 'components'
  | 'performance'
  | 'troubleshooting'
  | 'contact';

export type InteractableObject = {
  id: InteractableId;
  label: string;
  x: number;
  y: number;
  interactionType: 'modal';
  modalType: Exclude<ModalType, null>;
  experienceId?: ExperienceId;
};

export const portfolioInteractables: InteractableObject[] = [
  {
    id: 'projects',
    label: '프로젝트 노트북',
    x: 304,
    y: 246,
    interactionType: 'modal',
    modalType: 'projects',
  },
  {
    id: 'resume',
    label: '이력서 보드',
    x: 640,
    y: 178,
    interactionType: 'modal',
    modalType: 'resume',
  },
  {
    id: 'components',
    label: '컴포넌트 연구실',
    x: 1010,
    y: 270,
    interactionType: 'modal',
    modalType: 'experience',
    experienceId: 'components',
  },
  {
    id: 'performance',
    label: '성능 모니터',
    x: 930,
    y: 552,
    interactionType: 'modal',
    modalType: 'experience',
    experienceId: 'performance',
  },
  {
    id: 'troubleshooting',
    label: '문제 해결실',
    x: 460,
    y: 560,
    interactionType: 'modal',
    modalType: 'experience',
    experienceId: 'troubleshooting',
  },
  {
    id: 'contact',
    label: '연락처 터미널',
    x: 202,
    y: 442,
    interactionType: 'modal',
    modalType: 'contact',
  },
];
