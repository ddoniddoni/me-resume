'use client';

import { create } from 'zustand';

export type ModalType =
  'resume' | 'projects' | 'skills' | 'experience' | 'contact' | null;

export type ExperienceId = 'components' | 'performance' | 'troubleshooting';

type OpenModalOptions = {
  experienceId?: ExperienceId;
};

type PortfolioState = {
  activeModal: ModalType;
  activeExperienceId?: ExperienceId;
  openModal: (
    modal: Exclude<ModalType, null>,
    options?: OpenModalOptions,
  ) => void;
  closeModal: () => void;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeModal: null,
  activeExperienceId: undefined,
  openModal: (modal, options) =>
    set({
      activeModal: modal,
      activeExperienceId: options?.experienceId,
    }),
  closeModal: () =>
    set({
      activeModal: null,
      activeExperienceId: undefined,
    }),
}));
