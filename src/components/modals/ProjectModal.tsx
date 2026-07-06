'use client';

import { portfolioProjects } from '@/data/projects';
import { BaseModal } from './BaseModal';

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      title="프로젝트"
      description="주요 프로젝트의 문제, 역할, 기술 스택, 구현 내용과 결과입니다."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-body">
          실제 업무에서 맡았던 프로젝트를 채용 담당자가 빠르게 훑어볼 수
          있도록 핵심 내용 중심으로 정리했습니다.
        </p>
        <div className="grid gap-4">
          {portfolioProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-md border border-hairline bg-canvas p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-body">
                    {project.company}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-body">
                  {project.period}
                </span>
              </div>

              <dl className="mt-5 grid gap-3 text-sm leading-6 text-body">
                <div>
                  <dt className="font-semibold text-ink">문제</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">역할</dt>
                  <dd>{project.role}</dd>
                </div>
              </dl>

              <section className="mt-5">
                <h4 className="text-sm font-black uppercase text-ink">
                  Tech Stack
                </h4>
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

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <section>
                  <h4 className="font-semibold text-ink">구현</h4>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-body">
                    {project.implementations.map((implementation) => (
                      <li key={implementation}>{implementation}</li>
                    ))}
                  </ul>
                </section>
                <section className="border-t border-[#c8ad79]/35 pt-4 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                  <h4 className="font-semibold text-ink">결과</h4>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-body">
                    {project.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="mt-5 border-t border-[#c8ad79]/35 pt-4">
                <h4 className="font-semibold text-ink">배운 점</h4>
                <p className="mt-2 text-sm leading-6 text-body">
                  {project.learning}
                </p>
              </section>
            </article>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}
