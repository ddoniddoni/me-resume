'use client';

import { careerItems, educationItems, profile } from '@/data/profile';
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
      description="경력 요약, 주요 경력, 학력과 자격 정보입니다."
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
        <div className="rounded-3xl border border-hairline bg-panel p-6">
          <h4 className="font-semibold text-ink">경력 요약</h4>
          <p className="mt-3 leading-7 text-body">{profile.summary}</p>
        </div>
        <div className="grid gap-4">
          <h4 className="font-semibold text-ink">주요 경력</h4>
          {careerItems.map((career) => (
            <article
              key={`${career.company}-${career.period}`}
              className="rounded-2xl border border-hairline bg-canvas p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h5 className="text-lg font-semibold text-ink">
                  {career.company}
                </h5>
                <span className="text-sm font-semibold text-body">
                  {career.period}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-body">
                {career.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {career.roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-md bg-strong px-2.5 py-1 text-xs font-semibold text-ink"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="rounded-3xl border border-hairline bg-panel p-6">
          <h4 className="font-semibold text-ink">학력 및 자격</h4>
          <ul className="mt-3 grid gap-3 text-sm leading-6 text-body">
            {educationItems.map((item) => (
              <li key={`${item.title}-${item.period}`}>
                <span className="font-semibold text-ink">{item.title}</span>
                <span className="text-body"> · {item.period}</span>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <a
          href={profile.resumeSourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-5 py-2 text-center text-sm font-semibold text-white outline-none transition hover:bg-primary-active focus-visible:shadow-focus sm:w-fit"
        >
          GitHub 이력서 저장소 보기
        </a>
      </div>
    </BaseModal>
  );
}
