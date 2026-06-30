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
    x: 220,
    y: 180,
    interactionType: 'modal',
    modalType: 'projects',
  },
  {
    id: 'resume',
    label: '이력서 보드',
    x: 500,
    y: 145,
    interactionType: 'modal',
    modalType: 'resume',
  },
  {
    id: 'components',
    label: '컴포넌트 연구실',
    x: 760,
    y: 220,
    interactionType: 'modal',
    modalType: 'experience',
    experienceId: 'components',
  },
  {
    id: 'performance',
    label: '성능 모니터',
    x: 705,
    y: 430,
    interactionType: 'modal',
    modalType: 'experience',
    experienceId: 'performance',
  },
  {
    id: 'troubleshooting',
    label: '문제 해결실',
    x: 335,
    y: 455,
    interactionType: 'modal',
    modalType: 'experience',
    experienceId: 'troubleshooting',
  },
  {
    id: 'contact',
    label: '연락처 터미널',
    x: 145,
    y: 340,
    interactionType: 'modal',
    modalType: 'contact',
  },
];
