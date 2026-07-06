'use client';

import { supportFlowProject } from '@/data/projects';
import { BaseModal } from './BaseModal';

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const project = supportFlowProject;

  return (
    <BaseModal
      isOpen={isOpen}
      title={project.title}
      description={project.summary}
      headerAction={
        <a
          href={project.deployUrl}
          target="_blank"
          rel="noreferrer"
          className="pixel-modal-action inline-flex min-h-10 shrink-0 items-center justify-center border-[3px] border-[#5f3b22] bg-[#e5b76c] px-3.5 py-1.5 text-sm font-black leading-none text-[#2d1a0f] outline-none transition hover:-translate-y-0.5 hover:bg-[#f0ca7d] focus-visible:shadow-focus motion-reduce:hover:translate-y-0"
        >
          데모 체험
        </a>
      }
      onClose={onClose}
    >
      <div className="grid gap-6">
        <header className="grid gap-3">
          <p className="text-sm font-black uppercase text-[#e5b76c]">
            {project.category}
          </p>
          <p className="leading-7 text-body">{project.summary}</p>
        </header>

        <section className="rounded-md border border-hairline bg-canvas p-5">
          <h3 className="text-lg font-semibold text-ink">해결하려는 문제</h3>
          <p className="mt-3 leading-7 text-body">{project.problem}</p>
        </section>

        <section className="rounded-md border border-hairline bg-canvas p-5">
          <h3 className="text-lg font-semibold text-ink">데모 체험 계정</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {project.demoAccounts.map((account) => (
              <article
                key={account.email}
                className="rounded-md border border-hairline bg-panel p-4"
              >
                <h4 className="font-semibold text-ink">{account.role}</h4>
                <dl className="mt-3 grid gap-2 text-sm leading-6 text-body">
                  <div>
                    <dt className="font-semibold text-ink">이메일</dt>
                    <dd>{account.email}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">비밀번호</dt>
                    <dd>{account.password}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-hairline bg-canvas p-5">
          <h3 className="text-lg font-semibold text-ink">사용자 역할</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {project.users.map((user) => (
              <article
                key={user.role}
                className="rounded-md border border-hairline bg-panel p-4"
              >
                <h4 className="font-semibold text-ink">{user.role}</h4>
                <p className="mt-2 text-sm font-semibold text-body">
                  {user.goal}
                </p>
                <p className="mt-3 text-sm leading-6 text-body">
                  {user.tasks}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-md border border-hairline bg-canvas p-5">
            <h3 className="text-lg font-semibold text-ink">운영 기능</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-body">
              {project.operationFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-md border border-hairline bg-canvas p-5">
            <h3 className="text-lg font-semibold text-ink">AI 보조 방식</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-body">
              {project.aiFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-md border border-hairline bg-canvas p-5">
          <h3 className="text-lg font-semibold text-ink">Tech Stack</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex min-h-8 items-center rounded-full border-2 border-[#5f3b22] bg-[#e5b76c] px-3 py-1 text-sm font-black leading-none text-[#2d1a0f] shadow-[inset_0_2px_0_rgba(255,255,255,0.4),0_2px_0_rgba(95,59,34,0.38)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </BaseModal>
  );
}
