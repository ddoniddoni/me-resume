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
    label: 'Laptop',
    x: 220,
    y: 180,
    interactionType: 'modal',
    modalType: 'projects',
  },
  {
    id: 'resume',
    label: 'Resume Board',
    x: 500,
    y: 145,
    interactionType: 'modal',
    modalType: 'resume',
  },
  {
    id: 'components',
    label: 'Component Lab',
    x: 760,
    y: 220,
    interactionType: 'modal',
    modalType: 'experience',
    experienceId: 'components',
  },
  {
    id: 'performance',
    label: 'Performance Monitor',
    x: 705,
    y: 430,
    interactionType: 'modal',
    modalType: 'experience',
    experienceId: 'performance',
  },
  {
    id: 'troubleshooting',
    label: 'Trouble Room',
    x: 335,
    y: 455,
    interactionType: 'modal',
    modalType: 'experience',
    experienceId: 'troubleshooting',
  },
  {
    id: 'contact',
    label: 'Contact Terminal',
    x: 145,
    y: 340,
    interactionType: 'modal',
    modalType: 'contact',
  },
];
