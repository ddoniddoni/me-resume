'use client';

import { usePortfolioStore, type ModalType } from '@/store/portfolioStore';

const quickActions = [
  {
    title: 'Open Resume',
    description: 'View career summary and the resume PDF placeholder.',
    modal: 'resume',
  },
  {
    title: 'Review Projects',
    description: 'Scan structured frontend project case studies.',
    modal: 'projects',
  },
  {
    title: 'Check Skills',
    description: 'See the frontend stack and working strengths.',
    modal: 'skills',
  },
  {
    title: 'Contact',
    description: 'Find TODO placeholders for public contact links.',
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
          Quick portfolio actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={() => openModal(action.modal)}
              className="rounded-md border border-white/10 bg-white/5 p-4 text-left text-white outline-none transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:shadow-focus"
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
