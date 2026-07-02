'use client';

import { careerItems } from '@/data/profile';
import { BaseModal } from './BaseModal';

type CareerStatementModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CareerStatementModal({
  isOpen,
  onClose,
}: CareerStatementModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      title="경력기술서"
      description="회사별 주요 업무와 프로젝트 상세 내용입니다."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-body">
          공개 이력서에 정리된 회사별 담당 업무와 프로젝트 중심의 경력 상세
          내용입니다.
        </p>
        <div className="grid gap-4">
          {careerItems.map((career) => (
            <article
              key={`${career.company}-${career.period}`}
              className="rounded-2xl border border-hairline bg-canvas p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-ink">
                    {career.company}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-body">
                    {career.summary}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-body">
                  {career.period}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {career.roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-md bg-strong px-2.5 py-1 text-xs font-semibold text-ink"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-body">
                {career.details.map((detail) => (
                  <li key={`${detail.title}-${detail.period}`}>
                    <p className="font-semibold text-ink">
                      {detail.title}
                      <span className="font-normal text-body">
                        {' '}
                        · {detail.period}
                      </span>
                    </p>
                    <p className="mt-1">{detail.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}
