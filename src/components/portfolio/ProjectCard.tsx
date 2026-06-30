import type { Project } from '@/data/projects';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-panel p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-black text-ink">{project.title}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            {project.subtitle}
          </p>
        </div>
        {project.period ? (
          <p className="text-sm font-bold text-circuit">{project.period}</p>
        ) : null}
      </div>

      <p className="mt-4 leading-7 text-slate-700">{project.summary}</p>

      <dl className="mt-5 grid gap-4">
        <div>
          <dt className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
            Problem
          </dt>
          <dd className="mt-2 text-sm leading-6 text-slate-700">
            {project.problem}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
            Role
          </dt>
          <dd className="mt-2 text-sm leading-6 text-slate-700">
            {project.role}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
            Tech stack
          </dt>
          <dd className="mt-2 text-sm leading-6 text-slate-700">
            {project.techStack.join(', ')}
          </dd>
        </div>
      </dl>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <ProjectList title="Implementation" items={project.solution} />
        <ProjectList title="Result" items={project.impact} />
        <ProjectList title="Learning" items={project.learned} />
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
      <h4 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
        {title}
      </h4>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
