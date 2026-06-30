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
      description="이메일, GitHub, LinkedIn 공개 연락처 자리표시자입니다."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-slate-700">
          DDoni의 공개 연락처 링크가 준비되면 여기에 추가하세요. 비공개
          개인정보는 명시적으로 제공된 경우가 아니면 저장소에 넣지 않습니다.
        </p>
        <ContactLinks profile={profile} />
      </div>
    </BaseModal>
  );
}
