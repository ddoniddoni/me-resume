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
      title="Contact"
      description="Public contact link placeholders for email, GitHub, and LinkedIn."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-slate-700">
          Add DDoni&apos;s public contact links here when they are ready.
          Private personal information should stay out of the repository unless
          explicitly provided.
        </p>
        <ContactLinks profile={profile} />
      </div>
    </BaseModal>
  );
}
