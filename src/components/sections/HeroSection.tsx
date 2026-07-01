'use client';

import { profile } from '@/data/profile';
import { usePortfolioStore, type ModalType } from '@/store/portfolioStore';

const ctas = [
  {
    label: '이력서',
    modal: 'resume',
    variant: 'primary',
  },
  {
    label: '프로젝트',
    modal: 'projects',
    variant: 'secondary',
  },
  {
    label: '연락처',
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
    <section id="top" className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(255_255_255/0.08)_0_1px,transparent_1px_24px)] opacity-20" />
      <div className="relative mx-auto grid min-h-[calc(100vh-65px)] max-w-6xl content-center gap-12 px-5 py-20 md:grid-cols-[1fr_0.88fr] md:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-4 w-fit border border-white/15 bg-dark-elevated px-3 py-1.5 text-xs font-semibold uppercase text-muted-soft">
            {profile.role}
          </p>
          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-soft sm:text-lg">
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
                    ? 'inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-7 py-3 text-base font-semibold text-white outline-none transition hover:bg-primary-active focus-visible:shadow-focus'
                    : 'inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 bg-dark-elevated px-7 py-3 text-base font-semibold text-white outline-none transition hover:border-white/40 hover:bg-white/10 focus-visible:shadow-focus'
                }
              >
                {cta.label}
              </button>
            ))}
          </div>
          <dl className="mt-10 grid max-w-2xl gap-3 text-sm sm:grid-cols-3">
            {[
              ['Experience', '5 Years'],
              ['Domain', 'Platform / SDDC'],
              ['Mode', 'Game + Page'],
            ].map(([label, value]) => (
              <div key={label} className="border-l border-white/15 pl-4">
                <dt className="text-muted-soft">{label}</dt>
                <dd className="mt-1 font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex items-center md:justify-end">
          <div className="relative w-full max-w-md">
            <div className="rounded-lg border border-white/10 bg-dark-elevated p-6 shadow-soft">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-muted-soft">포트폴리오 상태</p>
                  <p className="mt-1 text-2xl font-semibold">탐색 준비 완료</p>
                </div>
                <span className="rounded-md bg-signal px-2.5 py-1 text-xs font-semibold text-ink">
                  MVP
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ['이력서', '즉시 열기'],
                  ['프로젝트', '사례 확인'],
                  ['기술', '스택 보기'],
                  ['연락처', '연결 완료'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex min-h-14 items-center justify-between rounded-lg bg-ink px-4"
                  >
                    <span className="text-sm text-muted-soft">{label}</span>
                    <span className="text-sm font-semibold text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-8 -left-4 hidden w-56 rotate-[-2deg] rounded-lg border border-hairline bg-white p-5 text-ink shadow-soft sm:block">
              <p className="text-sm font-semibold text-body">다음 목적지</p>
              <p className="mt-2 text-2xl font-semibold">포트폴리오 지도</p>
              <div className="mt-4 h-2 rounded bg-strong">
                <div className="h-2 w-2/3 rounded bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
