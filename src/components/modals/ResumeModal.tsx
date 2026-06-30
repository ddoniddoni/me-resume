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
      title="이력서"
      description="경력 요약, 이력서 PDF 자리표시자, 프로필 정보입니다."
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
          <h4 className="font-black text-ink">경력 요약</h4>
          <p className="mt-3 leading-7 text-slate-700">{profile.summary}</p>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            지역: {profile.location}
          </p>
        </div>
        <a
          href={profile.resumePdfUrl}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ink px-4 py-2 text-center text-sm font-bold text-white outline-none transition hover:bg-slate-800 focus-visible:shadow-focus sm:w-fit"
        >
          이력서 PDF 자리표시자 다운로드
        </a>
        <p className="text-sm leading-6 text-slate-600">
          입력 필요: 이 자리표시자를 DDoni의 실제 이력서 PDF와 검증된 경력
          정보로 교체하세요.
        </p>
      </div>
    </BaseModal>
  );
}
