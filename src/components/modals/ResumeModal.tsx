'use client';

import { profile } from '@/data/profile';
import { BaseModal } from './BaseModal';

type ResumeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      title="Resume"
      description="Career summary, resume PDF placeholder, and profile details."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            {profile.name}
          </p>
          <h3 className="mt-2 text-2xl font-black text-ink">{profile.role}</h3>
          <p className="mt-3 leading-7 text-slate-700">{profile.headline}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-panel p-5">
          <h4 className="font-black text-ink">Career Summary</h4>
          <p className="mt-3 leading-7 text-slate-700">{profile.summary}</p>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Location: {profile.location}
          </p>
        </div>
        <a
          href={profile.resumePdfUrl}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ink px-4 py-2 text-center text-sm font-bold text-white outline-none transition hover:bg-slate-800 focus-visible:shadow-focus sm:w-fit"
        >
          Download resume PDF placeholder
        </a>
        <p className="text-sm leading-6 text-slate-600">
          TODO: Replace this placeholder with DDoni&apos;s real resume PDF and
          verified career details.
        </p>
      </div>
    </BaseModal>
  );
}
