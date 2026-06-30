'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import { ContactModal } from './ContactModal';
import { ExperienceModal } from './ExperienceModal';
import { ProjectModal } from './ProjectModal';
import { ResumeModal } from './ResumeModal';
import { SkillsModal } from './SkillsModal';

export function PortfolioModals() {
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const activeExperienceId = usePortfolioStore(
    (state) => state.activeExperienceId,
  );
  const closeModal = usePortfolioStore((state) => state.closeModal);

  return (
    <>
      <ResumeModal isOpen={activeModal === 'resume'} onClose={closeModal} />
      <ProjectModal isOpen={activeModal === 'projects'} onClose={closeModal} />
      <SkillsModal isOpen={activeModal === 'skills'} onClose={closeModal} />
      <ExperienceModal
        isOpen={activeModal === 'experience'}
        experienceId={activeExperienceId}
        onClose={closeModal}
      />
      <ContactModal isOpen={activeModal === 'contact'} onClose={closeModal} />
    </>
  );
}
