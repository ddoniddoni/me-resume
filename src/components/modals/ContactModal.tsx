'use client';

import { ContactLinks } from '@/components/portfolio/ContactLinks';
import { profile } from '@/data/profile';
import { BaseModal } from './BaseModal';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      title="연락처"
      description="이메일, GitHub, Blog 공개 연락처입니다."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-body">
          공개 이력서에 명시된 이메일, GitHub, Blog 링크입니다. LinkedIn은 공개
          프로필이 준비되면 추가합니다.
        </p>
        <ContactLinks profile={profile} />
      </div>
    </BaseModal>
  );
}
