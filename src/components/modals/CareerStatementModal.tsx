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
      <div className="grid gap-5">
        <p className="leading-7 text-body">
          회사별 담당 업무, 프로젝트 수행 내역, 구현 내용과 성과를 정리한
          경력기술서입니다.
        </p>
        <div className="grid gap-4">
          {careerStatementItems.map((career) => (
            <article
              key={`${career.company}-${career.period}`}
              className="rounded-2xl border border-hairline bg-canvas p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-ink">
                    {career.company}
                    <span className="font-normal text-body">
                      {' '}
                      · {career.position}
                    </span>
                  </h3>
                </div>
                <span className="shrink-0 text-sm font-semibold text-body">
                  {career.period}
                </span>
              </div>
              <section className="mt-5">
                <h4 className="text-sm font-black uppercase text-ink">
                  Tech Stack
                </h4>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {career.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex min-h-8 items-center rounded-full border-2 border-[#5f3b22] bg-[#e5b76c] px-3.5 py-1 text-sm font-black leading-none text-[#2d1a0f] shadow-[inset_0_2px_0_rgba(255,255,255,0.4),0_2px_0_rgba(95,59,34,0.38)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
              <section className="mt-5">
                <h4 className="font-semibold text-ink">담당 업무</h4>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-body">
                  {career.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </section>
              <section className="mt-6">
                <h4 className="font-semibold text-ink">프로젝트 수행 내역</h4>
                <div className="mt-3 grid gap-4">
                  {career.projects.map((project) => (
                    <article
                      key={project.title}
                      className="rounded-2xl border border-hairline bg-panel p-4"
                    >
                      <h5 className="text-base font-semibold text-ink">
                        {project.title}
                      </h5>
                      <dl className="mt-3 grid gap-2 text-sm leading-6 text-body">
                        <div>
                          <dt className="font-semibold text-ink">내용</dt>
                          <dd>{project.content}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-ink">역할</dt>
                          <dd>{project.role}</dd>
                        </div>
                      </dl>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <h6 className="text-sm font-semibold text-ink">
                            주요 구현 내용
                          </h6>
                          <ul className="mt-2 grid gap-2 text-sm leading-6 text-body">
                            {project.implementations.map((implementation) => (
                              <li key={implementation}>{implementation}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="border-t border-[#c8ad79]/35 pt-4 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                          <h6 className="text-sm font-semibold text-ink">
                            성과
                          </h6>
                          <ul className="mt-2 grid gap-2 text-sm leading-6 text-body">
                            {project.results.map((result) => (
                              <li key={result}>{result}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
              <section className="mt-6">
                <h4 className="font-semibold text-ink">기타 성과</h4>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-body">
                  {career.extraAchievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </section>
            </article>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}
