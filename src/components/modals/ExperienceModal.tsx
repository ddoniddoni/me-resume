'use client';

import { experiences } from '@/data/experiences';
import type { ExperienceId } from '@/store/portfolioStore';
import { BaseModal } from './BaseModal';

type ExperienceModalProps = {
  isOpen: boolean;
  experienceId?: ExperienceId;
  onClose: () => void;
};

export function ExperienceModal({
  isOpen,
  experienceId,
  onClose,
}: ExperienceModalProps) {
  const selectedExperience =
    experiences.find((experience) => experience.id === experienceId) ??
    experiences[0];

  return (
    <BaseModal
      isOpen={isOpen}
      title={selectedExperience.title}
      description={`${selectedExperience.title} 요약과 주요 내용입니다.`}
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-body">{selectedExperience.summary}</p>
        <div className="rounded-3xl border border-hairline bg-panel p-6">
          <h3 className="font-semibold text-ink">주요 내용</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-body">
            {selectedExperience.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </BaseModal>
  );
}
