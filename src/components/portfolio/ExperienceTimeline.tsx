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
          className="rounded-lg border border-hairline bg-canvas p-6 shadow-soft"
        >
          <h3 className="text-lg font-semibold text-ink">{experience.title}</h3>
          <p className="mt-3 text-sm leading-6 text-body">
            {experience.summary}
          </p>
        </article>
      ))}
    </div>
  );
}
