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
                        <div>
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
