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
      <div className="mx-auto grid min-h-[calc(100vh-65px)] max-w-6xl content-center gap-12 px-5 py-20 md:grid-cols-[1fr_0.92fr] md:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-5 w-fit rounded-full bg-dark-elevated px-4 py-2 text-sm font-semibold text-white">
            {profile.name}
          </p>
          <h1 className="max-w-3xl text-balance text-5xl font-normal leading-none tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            {profile.role}
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
                    ? 'inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white outline-none transition hover:bg-primary-active focus-visible:shadow-focus'
                    : 'inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-dark-elevated px-8 py-4 text-base font-semibold text-white outline-none transition hover:border-white/40 hover:bg-white/10 focus-visible:shadow-focus'
                }
              >
                {cta.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center md:justify-end">
          <div className="relative w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-dark-elevated p-6 shadow-soft">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-muted-soft">포트폴리오 상태</p>
                  <p className="mt-1 text-2xl font-normal tracking-[-0.02em]">
                    탐색 준비 완료
                  </p>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  MVP
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ['이력서', '즉시 열기'],
                  ['프로젝트', '사례 확인'],
                  ['기술', '스택 보기'],
                  ['연락처', '준비 중'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex min-h-14 items-center justify-between rounded-2xl bg-ink px-4"
                  >
                    <span className="text-sm text-muted-soft">{label}</span>
                    <span className="text-sm font-semibold text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-8 -left-4 hidden w-56 rotate-[-3deg] rounded-3xl border border-white/10 bg-white p-5 text-ink shadow-soft sm:block">
              <p className="text-sm font-semibold text-body">다음 목적지</p>
              <p className="mt-2 text-2xl font-normal tracking-[-0.02em]">
                포트폴리오 지도
              </p>
              <div className="mt-4 h-2 rounded-full bg-strong">
                <div className="h-2 w-2/3 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
