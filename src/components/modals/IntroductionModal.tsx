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
          <p className="w-fit rounded-full bg-strong px-4 py-2 text-xs font-semibold text-ink">
            {profile.name}
          </p>
          <h3 className="mt-4 text-2xl font-normal text-ink">
            {profile.headline}
          </h3>
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
