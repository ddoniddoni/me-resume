'use client';

import { ContactLinks } from '@/components/portfolio/ContactLinks';
import { ExperienceTimeline } from '@/components/portfolio/ExperienceTimeline';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { SkillInventory } from '@/components/portfolio/SkillInventory';
import { experiences } from '@/data/experiences';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import {
  usePortfolioStore,
  type ExperienceId,
  type ModalType,
} from '@/store/portfolioStore';

const fallbackActions = [
  {
    title: '이력서',
    description: '경력 요약, 주요 경력, 학력과 자격 정보를 확인합니다.',
    modal: 'resume',
  },
  {
    title: '프로젝트',
    description: '구조화된 프론트엔드 프로젝트 사례를 확인합니다.',
    modal: 'projects',
  },
  {
    title: '기술',
    description: '작업 영역별 프론트엔드 기술 스택을 확인합니다.',
    modal: 'skills',
  },
  {
    title: '컴포넌트 연구실',
    description: '재사용 가능한 UI와 아키텍처 경험을 확인합니다.',
    modal: 'experience',
    experienceId: 'components',
  },
  {
    title: '성능 모니터',
    description: '렌더링, 로딩, 반응성 개선 경험을 확인합니다.',
    modal: 'experience',
    experienceId: 'performance',
  },
  {
    title: '문제 해결실',
    description: '디버깅과 이슈 대응 경험을 확인합니다.',
    modal: 'experience',
    experienceId: 'troubleshooting',
  },
  {
    title: '연락처',
    description: '공개 이메일, GitHub, Blog 링크를 확인합니다.',
    modal: 'contact',
  },
] satisfies {
  title: string;
  description: string;
  modal: Exclude<ModalType, null>;
  experienceId?: ExperienceId;
}[];

export function FallbackPortfolio() {
  const openModal = usePortfolioStore((state) => state.openModal);

  return (
    <section className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-5">
        <section aria-labelledby="fallback-title" className="scroll-mt-24">
          <p className="w-fit rounded-md bg-strong px-3 py-1.5 text-xs font-semibold uppercase text-ink">
            전체 접근
          </p>
          <h2
            id="fallback-title"
            className="mt-5 text-balance text-4xl font-semibold text-ink sm:text-5xl"
          >
            포트폴리오 바로가기
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-body">
            게임 지도를 사용하지 않아도 모든 주요 정보를 여기서 바로 열 수
            있습니다.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fallbackActions.map((action) => (
              <button
                key={action.title}
                type="button"
                onClick={() =>
                  openModal(
                    action.modal,
                    action.experienceId
                      ? { experienceId: action.experienceId }
                      : undefined,
                  )
                }
                className="min-h-32 rounded-lg border border-hairline bg-canvas p-5 text-left outline-none transition hover:-translate-y-0.5 hover:border-primary hover:shadow-soft focus-visible:shadow-focus motion-reduce:hover:translate-y-0"
              >
                <span className="block text-base font-semibold text-ink">
                  {action.title}
                </span>
                <span className="mt-3 block text-sm leading-6 text-body">
                  {action.description}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section
          id="resume"
          aria-labelledby="resume-title"
          className="scroll-mt-24"
        >
          <p className="w-fit rounded-md bg-strong px-3 py-1.5 text-xs font-semibold uppercase text-ink">
            이력서
          </p>
          <h2
            id="resume-title"
            className="mt-5 text-balance text-4xl font-semibold text-ink"
          >
            경력 요약
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-body">
            {profile.summary}
          </p>
          <button
            type="button"
            onClick={() => openModal('resume')}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-strong px-5 py-2 text-sm font-semibold text-ink outline-none transition hover:bg-primary hover:text-white focus-visible:shadow-focus"
          >
            이력서 모달 열기
          </button>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-title"
          className="scroll-mt-24"
        >
          <p className="w-fit rounded-md bg-strong px-3 py-1.5 text-xs font-semibold uppercase text-ink">
            프로젝트
          </p>
          <h2
            id="projects-title"
            className="mt-5 text-balance text-4xl font-semibold text-ink"
          >
            주요 작업
          </h2>
          <div className="mt-5 grid gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => openModal('projects')}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-strong px-5 py-2 text-sm font-semibold text-ink outline-none transition hover:bg-primary hover:text-white focus-visible:shadow-focus"
          >
            프로젝트 모달 열기
          </button>
        </section>

        <section
          id="skills"
          aria-labelledby="skills-title"
          className="scroll-mt-24"
        >
          <p className="w-fit rounded-md bg-strong px-3 py-1.5 text-xs font-semibold uppercase text-ink">
            기술
          </p>
          <h2
            id="skills-title"
            className="mt-5 text-balance text-4xl font-semibold text-ink"
          >
            프론트엔드 도구함
          </h2>
          <div className="mt-5">
            <SkillInventory skills={skills} />
          </div>
          <button
            type="button"
            onClick={() => openModal('skills')}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-strong px-5 py-2 text-sm font-semibold text-ink outline-none transition hover:bg-primary hover:text-white focus-visible:shadow-focus"
          >
            기술 모달 열기
          </button>
        </section>

        <section aria-labelledby="experience-title" className="scroll-mt-24">
          <p className="w-fit rounded-md bg-strong px-3 py-1.5 text-xs font-semibold uppercase text-ink">
            경험
          </p>
          <h2
            id="experience-title"
            className="mt-5 text-balance text-4xl font-semibold text-ink"
          >
            기술적 강점
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
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-strong px-5 py-2 text-sm font-semibold text-ink outline-none transition hover:bg-primary hover:text-white focus-visible:shadow-focus"
              >
                {experience.title} 열기
              </button>
            ))}
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="scroll-mt-24 rounded-lg bg-ink p-8 text-white sm:p-10"
        >
          <p className="w-fit rounded-md bg-dark-elevated px-3 py-1.5 text-xs font-semibold uppercase text-white">
            연락처
          </p>
          <h2
            id="contact-title"
            className="mt-5 text-balance text-4xl font-semibold"
          >
            공개 연락처
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted-soft">
            공개 이력서에 명시된 이메일, GitHub, Blog 링크를 연결했습니다.
          </p>
          <div className="mt-5">
            <ContactLinks profile={profile} />
          </div>
          <button
            type="button"
            onClick={() => openModal('contact')}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white outline-none transition hover:bg-primary-active focus-visible:shadow-focus"
          >
            연락처 모달 열기
          </button>
        </section>
      </div>
    </section>
  );
}
