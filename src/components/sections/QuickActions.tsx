'use client';

import { usePortfolioStore, type ModalType } from '@/store/portfolioStore';

const quickActions = [
  {
    title: '이력서 보기',
    description: '경력 요약과 이력서 PDF 자리표시자를 확인합니다.',
    modal: 'resume',
  },
  {
    title: '프로젝트 보기',
    description: '구조화된 프론트엔드 프로젝트 사례를 확인합니다.',
    modal: 'projects',
  },
  {
    title: '기술 보기',
    description: '프론트엔드 기술 스택과 강점을 확인합니다.',
    modal: 'skills',
  },
  {
    title: '연락하기',
    description: '공개 연락처 자리표시자를 확인합니다.',
    modal: 'contact',
  },
] satisfies {
  title: string;
  description: string;
  modal: Exclude<ModalType, null>;
}[];

export function QuickActions() {
  const openModal = usePortfolioStore((state) => state.openModal);

  return (
    <section aria-labelledby="quick-actions-title" className="bg-ink py-8">
      <div className="mx-auto max-w-6xl px-5">
        <h2 id="quick-actions-title" className="sr-only">
          빠른 포트폴리오 이동
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={() => openModal(action.modal)}
              className="rounded-md border border-white/10 bg-white/5 p-4 text-left text-white outline-none transition motion-safe:hover:-translate-y-0.5 hover:bg-white/10 focus-visible:shadow-focus"
            >
              <span className="block font-bold">{action.title}</span>
              <span className="mt-2 block text-sm leading-6 text-slate-300">
                {action.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
