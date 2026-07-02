import type { ExperienceId, ModalType } from '@/store/portfolioStore';

export type InteractableId =
  | 'resume'
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
    x: 410,
    y: 178,
    interactionType: 'modal',
    modalType: 'resume',
  },
  {
    id: 'career',
    label: '경력기술서',
    x: 870,
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
