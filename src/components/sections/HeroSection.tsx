'use client';

import { profile } from '@/data/profile';
import { usePortfolioStore, type ModalType } from '@/store/portfolioStore';

const ctas = [
  {
    label: 'Resume',
    modal: 'resume',
    variant: 'primary',
  },
  {
    label: 'Projects',
    modal: 'projects',
    variant: 'secondary',
  },
  {
    label: 'Contact',
    modal: 'contact',
    variant: 'secondary',
  },
] satisfies {
  label: string;
  modal: Exclude<ModalType, null>;
  variant: 'primary' | 'secondary';
}[];

export function HeroSection() {
  const openModal = usePortfolioStore((state) => state.openModal);

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl content-center gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-circuit">
            {profile.name}
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">
            {profile.role}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            {profile.headline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {ctas.map((cta) => (
              <button
                key={cta.modal}
                type="button"
                onClick={() => openModal(cta.modal)}
                className={
                  cta.variant === 'primary'
                    ? 'inline-flex min-h-12 items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-bold text-white outline-none transition hover:bg-slate-800 focus-visible:shadow-focus'
                    : 'inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus'
                }
              >
                {cta.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center md:justify-end">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-panel p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">
                Quest Map
              </span>
              <span className="rounded-full bg-signal/25 px-3 py-1 text-xs font-bold text-ink">
                MVP shell
              </span>
            </div>
            <div className="grid aspect-[4/3] grid-cols-4 gap-3 rounded-md border border-dashed border-slate-300 bg-white p-4">
              {['Home', 'Resume', 'Projects', 'Skills', 'Contact', 'Next'].map(
                (label) => (
                  <div
                    key={label}
                    className="flex items-center justify-center rounded-md border border-slate-200 bg-panel text-xs font-bold text-slate-700"
                  >
                    {label}
                  </div>
                ),
              )}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              The interactive 2D map below lets visitors explore the same
              resume, project, experience, and contact paths without making the
              canvas required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
