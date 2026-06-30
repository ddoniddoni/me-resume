'use client';

import { useState, useTransition } from 'react';
import { Footer } from '@/components/layout/Footer';
import { FallbackPortfolio } from '@/components/sections/FallbackPortfolio';
import { GameSection } from '@/components/sections/GameSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickActions } from '@/components/sections/QuickActions';
import { profile } from '@/data/profile';
import { cn } from '@/lib/cn';
import { SITE_NAME } from '@/lib/constants';
import { usePortfolioStore, type ModalType } from '@/store/portfolioStore';

type PortfolioView = 'game' | 'page';

const viewOptions = [
  {
    label: 'Game으로 보기',
    value: 'game',
  },
  {
    label: '페이지로 보기',
    value: 'page',
  },
] satisfies {
  label: string;
  value: PortfolioView;
}[];

const directActions = [
  {
    label: '이력서',
    modal: 'resume',
  },
  {
    label: '프로젝트',
    modal: 'projects',
  },
  {
    label: '기술',
    modal: 'skills',
  },
  {
    label: '연락처',
    modal: 'contact',
  },
] satisfies {
  label: string;
  modal: Exclude<ModalType, null>;
}[];

export function HomeExperience() {
  const [view, setView] = useState<PortfolioView>('game');
  const [isPending, startTransition] = useTransition();
  const openModal = usePortfolioStore((state) => state.openModal);

  const switchView = (nextView: PortfolioView) => {
    startTransition(() => {
      setView(nextView);
    });
  };

  const isGameView = view === 'game';

  return (
    <>
      <header
        id="top"
        className={cn(
          'sticky top-0 z-30 border-b backdrop-blur',
          isGameView
            ? 'border-white/10 bg-ink/95 text-white'
            : 'border-hairline-soft bg-canvas/95 text-ink',
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <a
              href="#top"
              className={cn(
                'block w-fit text-sm font-semibold outline-none transition focus-visible:rounded-full focus-visible:shadow-focus',
                isGameView
                  ? 'text-white hover:text-muted-soft'
                  : 'text-primary hover:text-primary-active',
              )}
            >
              {SITE_NAME}
            </a>
            <p
              className={cn(
                'mt-1 text-sm leading-5',
                isGameView ? 'text-muted-soft' : 'text-body',
              )}
            >
              {profile.role} · {profile.headline}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between lg:justify-end">
            <div
              aria-label="포트폴리오 보기 방식"
              className={cn(
                'grid grid-cols-2 rounded-full p-1',
                isGameView ? 'bg-white/10' : 'bg-strong',
              )}
              role="group"
            >
              {viewOptions.map((option) => {
                const isActive = option.value === view;

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isActive}
                    disabled={isPending}
                    onClick={() => switchView(option.value)}
                    className={cn(
                      'min-h-10 rounded-full px-4 py-2 text-sm font-semibold outline-none transition focus-visible:shadow-focus disabled:cursor-wait',
                      isActive
                        ? 'bg-primary text-white'
                        : isGameView
                          ? 'text-white hover:bg-white/10'
                          : 'text-body hover:bg-canvas hover:text-ink',
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <nav aria-label="주요 포트폴리오 바로가기">
              <ul className="flex flex-wrap gap-2">
                {directActions.map((action) => (
                  <li key={action.modal}>
                    <button
                      type="button"
                      onClick={() => openModal(action.modal)}
                      className={cn(
                        'inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold outline-none transition focus-visible:shadow-focus',
                        isGameView
                          ? 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-strong text-ink hover:bg-primary hover:text-white',
                      )}
                    >
                      {action.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        {isGameView ? (
          <GameSection
            loadStrategy="immediate"
            onSwitchToPage={() => switchView('page')}
            variant="home"
          />
        ) : (
          <>
            <HeroSection />
            <QuickActions />
            <FallbackPortfolio />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
