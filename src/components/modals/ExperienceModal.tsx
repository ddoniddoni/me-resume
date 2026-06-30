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
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-slate-700">{selectedExperience.summary}</p>
        <div className="rounded-lg border border-slate-200 bg-panel p-5">
          <h3 className="font-black text-ink">Highlights</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {selectedExperience.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          TODO: Replace generalized examples with DDoni&apos;s verified project
          and work experience details.
        </p>
      </div>
    </BaseModal>
  );
}
