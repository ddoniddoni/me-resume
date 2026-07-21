import type { ExperienceId, ModalType } from '@/store/portfolioStore';

export type InteractableId =
  | 'resume'
  | 'projects'
  | 'career'
  | 'introduction'
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
    id: 'resume',
    label: '이력서 보드',
    x: 304,
    y: 178,
    interactionType: 'modal',
    modalType: 'resume',
  },
  {
    id: 'projects',
    label: '프로젝트 보드',
    x: 976,
    y: 178,
    interactionType: 'modal',
    modalType: 'projects',
  },
  {
    id: 'career',
    label: '경력기술서',
    x: 640,
    y: 178,
    interactionType: 'modal',
    modalType: 'career',
  },
  {
    id: 'introduction',
    label: '자기소개서',
    x: 410,
    y: 474,
    interactionType: 'modal',
    modalType: 'introduction',
  },
  {
    id: 'contact',
    label: '연락처 터미널',
    x: 870,
    y: 474,
    interactionType: 'modal',
    modalType: 'contact',
  },
];
