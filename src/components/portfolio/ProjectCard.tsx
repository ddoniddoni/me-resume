import type { Project } from '@/data/projects';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-hairline bg-canvas p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-2xl font-normal tracking-[-0.02em] text-ink">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-body">{project.subtitle}</p>
        </div>
        {project.period ? (
          <p className="shrink-0 rounded-full bg-strong px-3 py-1 text-sm font-semibold text-ink">
            {project.period}
          </p>
        ) : null}
      </div>

      <p className="mt-5 leading-7 text-body">{project.summary}</p>

      <dl className="mt-5 grid gap-4">
        <div>
          <dt className="text-sm font-semibold text-muted">문제</dt>
          <dd className="mt-2 text-sm leading-6 text-body">
            {project.problem}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-muted">역할</dt>
          <dd className="mt-2 text-sm leading-6 text-body">{project.role}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-muted">기술 스택</dt>
          <dd className="mt-2 break-words text-sm leading-6 text-body">
            {project.techStack.join(', ')}
          </dd>
        </div>
      </dl>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <ProjectList title="구현" items={project.solution} />
        <ProjectList title="결과" items={project.impact} />
        <ProjectList title="배운 점" items={project.learned} />
      </div>
    </article>
  );
}

type ProjectListProps = {
  title: string;
  items: string[];
};

function ProjectList({ title, items }: ProjectListProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-muted">{title}</h4>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-body">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
