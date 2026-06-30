'use client';

import { ContactLinks } from '@/components/portfolio/ContactLinks';
import { ExperienceTimeline } from '@/components/portfolio/ExperienceTimeline';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { SkillInventory } from '@/components/portfolio/SkillInventory';
import { experiences } from '@/data/experiences';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { usePortfolioStore } from '@/store/portfolioStore';

export function FallbackPortfolio() {
  const openModal = usePortfolioStore((state) => state.openModal);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-5">
        <section
          id="resume"
          aria-labelledby="resume-title"
          className="scroll-mt-24"
        >
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            Resume
          </p>
          <h2 id="resume-title" className="mt-2 text-3xl font-black text-ink">
            Career summary
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            {profile.summary}
          </p>
          <button
            type="button"
            onClick={() => openModal('resume')}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus"
          >
            Open resume modal
          </button>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-title"
          className="scroll-mt-24"
        >
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            Projects
          </p>
          <h2 id="projects-title" className="mt-2 text-3xl font-black text-ink">
            Selected work
          </h2>
          <div className="mt-5 grid gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => openModal('projects')}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus"
          >
            Open projects modal
          </button>
        </section>

        <section
          id="skills"
          aria-labelledby="skills-title"
          className="scroll-mt-24"
        >
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            Skills
          </p>
          <h2 id="skills-title" className="mt-2 text-3xl font-black text-ink">
            Frontend toolkit
          </h2>
          <div className="mt-5">
            <SkillInventory skills={skills} />
          </div>
          <button
            type="button"
            onClick={() => openModal('skills')}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus"
          >
            Open skills modal
          </button>
        </section>

        <section aria-labelledby="experience-title" className="scroll-mt-24">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            Experience
          </p>
          <h2
            id="experience-title"
            className="mt-2 text-3xl font-black text-ink"
          >
            Technical strengths
          </h2>
          <div className="mt-5">
            <ExperienceTimeline experiences={experiences} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {experiences.map((experience) => (
              <button
                key={experience.id}
                type="button"
                onClick={() =>
                  openModal('experience', { experienceId: experience.id })
                }
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus"
              >
                Open {experience.title}
              </button>
            ))}
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="scroll-mt-24 rounded-lg border border-slate-200 bg-ink p-6 text-white"
        >
          <p className="text-sm font-black uppercase tracking-[0.16em] text-signal">
            Contact
          </p>
          <h2 id="contact-title" className="mt-2 text-3xl font-black">
            Contact details need DDoni input
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-200">
            TODO: Add public email, GitHub, LinkedIn, and final resume PDF.
            Private personal details should only be added when explicitly
            provided.
          </p>
          <div className="mt-5">
            <ContactLinks profile={profile} />
          </div>
          <button
            type="button"
            onClick={() => openModal('contact')}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-bold text-ink outline-none transition hover:bg-slate-100 focus-visible:shadow-focus"
          >
            Open contact modal
          </button>
        </section>
      </div>
    </section>
  );
}
