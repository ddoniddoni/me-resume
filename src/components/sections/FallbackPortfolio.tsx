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
    description: '경력 요약과 이력서 PDF 자리표시자를 확인합니다.',
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
    description: '공개 연락처 자리표시자를 확인합니다.',
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
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-5">
        <section aria-labelledby="fallback-title" className="scroll-mt-24">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            전체 접근
          </p>
          <h2
            id="fallback-title"
            className="mt-2 text-balance text-3xl font-black text-ink"
          >
            포트폴리오 바로가기
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
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
                className="min-h-24 rounded-md border border-slate-200 bg-panel p-4 text-left outline-none transition hover:border-circuit hover:bg-white focus-visible:shadow-focus"
              >
                <span className="block font-black text-ink">
                  {action.title}
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-700">
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
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            이력서
          </p>
          <h2
            id="resume-title"
            className="mt-2 text-balance text-3xl font-black text-ink"
          >
            경력 요약
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            {profile.summary}
          </p>
          <button
            type="button"
            onClick={() => openModal('resume')}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus"
          >
            이력서 모달 열기
          </button>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-title"
          className="scroll-mt-24"
        >
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            프로젝트
          </p>
          <h2
            id="projects-title"
            className="mt-2 text-balance text-3xl font-black text-ink"
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
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus"
          >
            프로젝트 모달 열기
          </button>
        </section>

        <section
          id="skills"
          aria-labelledby="skills-title"
          className="scroll-mt-24"
        >
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            기술
          </p>
          <h2
            id="skills-title"
            className="mt-2 text-balance text-3xl font-black text-ink"
          >
            프론트엔드 도구함
          </h2>
          <div className="mt-5">
            <SkillInventory skills={skills} />
          </div>
          <button
            type="button"
            onClick={() => openModal('skills')}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus"
          >
            기술 모달 열기
          </button>
        </section>

        <section aria-labelledby="experience-title" className="scroll-mt-24">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
            경험
          </p>
          <h2
            id="experience-title"
            className="mt-2 text-balance text-3xl font-black text-ink"
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
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus"
              >
                {experience.title} 열기
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
            연락처
          </p>
          <h2
            id="contact-title"
            className="mt-2 text-balance text-3xl font-black"
          >
            연락처 정보는 DDoni 입력이 필요합니다
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-200">
            입력 필요: 공개 이메일, GitHub, LinkedIn, 최종 이력서 PDF를
            추가하세요. 비공개 개인정보는 명시적으로 제공된 경우에만 넣어야
            합니다.
          </p>
          <div className="mt-5">
            <ContactLinks profile={profile} />
          </div>
          <button
            type="button"
            onClick={() => openModal('contact')}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-bold text-ink outline-none transition hover:bg-slate-100 focus-visible:shadow-focus"
          >
            연락처 모달 열기
          </button>
        </section>
      </div>
    </section>
  );
}
