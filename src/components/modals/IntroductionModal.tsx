'use client';

import { introductionSections } from '@/data/introduction';
import { profile } from '@/data/profile';
import { BaseModal } from './BaseModal';

type IntroductionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function IntroductionModal({
  isOpen,
  onClose,
}: IntroductionModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      title="자기소개서"
      description="프론트엔드 개발자로서의 강점과 일하는 방식입니다."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <div>
          <h3 className="flex flex-col gap-2 text-3xl font-semibold text-ink sm:flex-row sm:items-end sm:text-4xl">
            <span>{profile.name}</span>
            <span className="text-2xl font-normal text-body sm:text-3xl">
              {profile.role}
            </span>
          </h3>
          <p className="mt-3 leading-7 text-body">{profile.headline}</p>
        </div>
        <div className="grid gap-4">
          {introductionSections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-hairline bg-canvas p-5"
            >
              <h4 className="text-lg font-semibold text-ink">
                {section.title}
              </h4>
              <p className="mt-3 leading-7 text-body">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}
