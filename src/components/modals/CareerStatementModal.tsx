'use client';

import { careerStatementItems } from '@/data/careerStatement';
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
      <div className="grid gap-4">
        {careerStatementItems.map((career) => (
          <article
            key={`${career.company}-${career.period}`}
            className="rounded-2xl border border-hairline bg-canvas p-5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="text-xl font-semibold text-ink">
                {career.company}
                <span className="font-normal text-body">
                  {' '}
                  · {career.position}
                </span>
              </h3>
              <span className="shrink-0 text-sm font-semibold text-body">
                {career.period}
              </span>
            </div>

            <div className="mt-5 grid gap-4">
              {career.projects.map((project, index) => (
                <article
                  key={project.title}
                  className="rounded-2xl border border-hairline bg-panel p-4"
                >
                  <h4 className="text-base font-semibold text-ink">
                    {index + 1}. {project.title}
                  </h4>
                  <dl className="mt-4 grid gap-4 text-sm leading-6 text-body">
                    <div>
                      <dt className="font-semibold text-ink">배경</dt>
                      <dd className="mt-1">{project.background}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">역할</dt>
                      <dd className="mt-1">{project.role}</dd>
                    </div>
                  </dl>

                  <section className="mt-4">
                    <h5 className="text-sm font-semibold text-ink">
                      주요 업무
                    </h5>
                    <ul className="mt-2 grid gap-2 text-sm leading-6 text-body">
                      {project.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                  </section>

                  {project.results ? (
                    <section className="mt-4 border-t border-[#c8ad79]/35 pt-4">
                      <h5 className="text-sm font-semibold text-ink">성과</h5>
                      <ul className="mt-2 grid gap-2 text-sm leading-6 text-body">
                        {project.results.map((result) => (
                          <li key={result}>{result}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  <section className="mt-4 border-t border-[#c8ad79]/35 pt-4">
                    <h5 className="text-sm font-semibold text-ink">
                      기술 스택
                    </h5>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex min-h-8 items-center rounded-full border-2 border-[#5f3b22] bg-[#e5b76c] px-3.5 py-1 text-sm font-black leading-none text-[#2d1a0f] shadow-[inset_0_2px_0_rgba(255,255,255,0.4),0_2px_0_rgba(95,59,34,0.38)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>
    </BaseModal>
  );
}
