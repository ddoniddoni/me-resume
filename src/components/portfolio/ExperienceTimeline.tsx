import type { Experience } from '@/data/experiences';

type ExperienceTimelineProps = {
  experiences: Experience[];
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {experiences.map((experience) => (
        <article
          key={experience.id}
          className="rounded-lg border border-slate-200 bg-panel p-5"
        >
          <h3 className="font-black text-ink">{experience.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {experience.summary}
          </p>
        </article>
      ))}
    </div>
  );
}
