'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  portfolioInteractables,
  type InteractableObject,
} from '@/game/interactions';
import { profile } from '@/data/profile';
import { cn } from '@/lib/cn';
import { usePortfolioStore } from '@/store/portfolioStore';

type GameStatus =
  'waiting' | 'loading' | 'ready' | 'unavailable' | 'reduced-motion';

type GameSectionProps = {
  loadStrategy?: 'visible' | 'immediate';
  onSwitchToPage?: () => void;
  variant?: 'section' | 'home';
};

export function GameSection({
  loadStrategy = 'visible',
  onSwitchToPage,
  variant = 'section',
}: GameSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<GameStatus>('waiting');
  const openModal = usePortfolioStore((state) => state.openModal);
  const isHome = variant === 'home';
  const titleId = useId();
  const descriptionId = useId();
  const directActionsTitleId = useId();

  useEffect(() => {
    let isMounted = true;
    let game:
      | { destroy: (removeCanvas: boolean, noReturn?: boolean) => void }
      | undefined;

    const openInteractable = (interactable: InteractableObject) => {
      openModal(
        interactable.modalType,
        interactable.experienceId
          ? { experienceId: interactable.experienceId }
          : undefined,
      );
    };

    async function bootGame() {
      if (!containerRef.current) {
        return;
      }

      try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setStatus('reduced-motion');
          return;
        }

        setStatus('loading');
        const { createPortfolioGame } = await import('@/game/PhaserGame');

        if (!isMounted || !containerRef.current) {
          return;
        }

        game = createPortfolioGame(containerRef.current, {
          onInteract: openInteractable,
        });
        setStatus('ready');
      } catch {
        if (isMounted) {
          setStatus('unavailable');
        }
      }
    }

    const container = containerRef.current;

    if (!container) {
      return () => {
        isMounted = false;
      };
    }

    if (loadStrategy === 'immediate' || !('IntersectionObserver' in window)) {
      void bootGame();
      return () => {
        isMounted = false;
        game?.destroy(true);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          void bootGame();
        }
      },
      {
        rootMargin: '240px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(container);

    return () => {
      isMounted = false;
      observer.disconnect();
      game?.destroy(true);
    };
  }, [loadStrategy, openModal]);

  const handleOpen = (interactable: InteractableObject) => {
    openModal(
      interactable.modalType,
      interactable.experienceId
        ? { experienceId: interactable.experienceId }
        : undefined,
    );
  };

  if (isHome) {
    return (
      <section
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative min-h-[100svh] overflow-hidden bg-ink"
      >
        <p id={descriptionId} className="sr-only">
          포트폴리오 지도는 시각적 탐색 경험입니다. 모든 주요 정보는 화면의
          바로가기 버튼에서도 동일하게 열 수 있습니다.
        </p>
        <div
          ref={containerRef}
          aria-hidden="true"
          className="portfolio-game-canvas absolute inset-0 h-full w-full bg-ink"
        >
          {status !== 'ready' ? (
            <div className="flex h-full min-h-[420px] items-center justify-center px-4 text-center text-sm font-semibold text-muted-soft">
              {status === 'waiting'
                ? '인터랙티브 지도를 준비하고 있습니다.'
                : status === 'loading'
                  ? '인터랙티브 지도를 불러오는 중...'
                  : status === 'reduced-motion'
                    ? '동작 줄이기 설정이 켜져 있어 인터랙티브 지도를 멈췄습니다. 바로가기 버튼을 이용하세요.'
                    : '인터랙티브 지도를 표시할 수 없습니다. 바로가기 버튼을 이용하세요.'}
            </div>
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
          <div className="max-w-[min(30rem,calc(100vw-2rem))] border border-white/15 bg-ink/82 px-3 py-2 text-white backdrop-blur">
            <p className="text-xs font-semibold uppercase text-muted-soft">
              {profile.role}
            </p>
            <h1 id={titleId} className="mt-1 text-lg font-semibold leading-6">
              DDoni Frontend Quest
            </h1>
            <p className="mt-1 text-xs font-semibold text-muted-soft sm:text-sm">
              Move: WASD / Arrow Keys · Interact: Enter
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 max-h-[42svh] overflow-y-auto px-4 pb-4 sm:px-5">
          <div
            aria-labelledby={directActionsTitleId}
            className="pointer-events-auto ml-auto grid max-w-2xl grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end"
            role="group"
          >
            <h2 id={directActionsTitleId} className="sr-only">
              지도 목적지 바로가기
            </h2>
            {onSwitchToPage ? (
              <button
                type="button"
                onClick={onSwitchToPage}
                className="col-span-2 min-h-10 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white outline-none transition hover:bg-primary-active focus-visible:shadow-focus sm:col-span-1 sm:px-4 sm:text-sm"
              >
                페이지로 보기
              </button>
            ) : null}
            {portfolioInteractables.map((interactable) => (
              <button
                key={interactable.id}
                type="button"
                aria-label={`${interactable.label} 정보 열기`}
                onClick={() => handleOpen(interactable)}
                className="min-h-10 rounded-lg border border-white/20 bg-ink/85 px-3 py-2 text-xs font-semibold text-white outline-none backdrop-blur transition hover:border-primary hover:bg-primary focus-visible:shadow-focus sm:px-4 sm:text-sm"
              >
                {interactable.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={cn(
        isHome ? 'bg-ink px-4 py-4 sm:px-5 sm:py-6' : 'bg-panel py-24',
      )}
    >
      <p id={descriptionId} className="sr-only">
        포트폴리오 지도와 동일한 정보는 바로가기 버튼과 일반 HTML 포트폴리오
        섹션에서도 접근할 수 있습니다.
      </p>
      <div className={cn('mx-auto', isHome ? 'max-w-7xl' : 'max-w-6xl px-5')}>
        <div
          className={cn(
            'grid gap-6',
            isHome
              ? 'min-h-[calc(100svh-132px)] lg:grid-cols-[minmax(0,1fr)_340px]'
              : 'lg:grid-cols-[minmax(0,1fr)_320px]',
          )}
        >
          <div
            className={cn(
              'rounded-lg border p-4 shadow-soft sm:p-6',
              isHome
                ? 'order-1 border-white/10 bg-dark-elevated text-white'
                : 'order-2 border-hairline bg-canvas lg:order-1',
            )}
          >
            <p
              className={cn(
                'w-fit rounded-md px-3 py-1.5 text-xs font-semibold uppercase',
                isHome ? 'bg-white/10 text-white' : 'bg-strong text-ink',
              )}
            >
              {isHome ? 'Game으로 보기' : '선택형 탐색'}
            </p>
            <h2
              id={titleId}
              className={cn(
                'mt-5 text-balance text-4xl font-semibold',
                isHome ? 'text-white sm:text-5xl' : 'text-ink',
              )}
            >
              {isHome ? 'DDoni 포트폴리오 맵' : '포트폴리오 지도'}
            </h2>
            <p
              className={cn(
                'mt-4 max-w-3xl leading-7',
                isHome ? 'text-muted-soft' : 'text-body',
              )}
            >
              {isHome
                ? `${profile.role} ${profile.name}의 작업을 맵에서 바로 탐색하세요. WASD 또는 방향키로 이동하고, 오브젝트 가까이에서 Enter를 누르면 관련 정보가 열립니다.`
                : 'WASD 또는 방향키로 이동하세요. 오브젝트 가까이에서 Enter를 누르면 아래에서도 접근 가능한 같은 포트폴리오 섹션이 열립니다.'}
            </p>
            <div
              ref={containerRef}
              aria-hidden="true"
              className={cn(
                'portfolio-game-canvas mt-6 overflow-hidden rounded-lg border',
                isHome
                  ? 'h-[68svh] min-h-[360px] max-h-[680px] border-white/10 bg-ink sm:h-[calc(100svh-340px)] lg:h-[560px] xl:h-[620px]'
                  : 'h-[320px] border-hairline bg-strong sm:h-[420px] lg:h-[520px]',
              )}
            >
              {status !== 'ready' ? (
                <div
                  className={cn(
                    'flex h-full min-h-[280px] items-center justify-center px-4 text-center text-sm font-semibold',
                    isHome ? 'text-muted-soft' : 'text-body',
                  )}
                >
                  {status === 'waiting' ? (
                    isHome ? (
                      '인터랙티브 지도를 준비하고 있습니다.'
                    ) : (
                      '지도 영역에 가까워지면 인터랙티브 지도를 불러옵니다.'
                    )
                  ) : status === 'loading' ? (
                    <>인터랙티브 지도를 불러오는 중&hellip;</>
                  ) : status === 'reduced-motion' ? (
                    '동작 줄이기 설정이 켜져 있어 인터랙티브 지도를 멈췄습니다. 옆의 바로가기 버튼이나 아래 포트폴리오 섹션을 이용하세요.'
                  ) : (
                    '인터랙티브 지도를 표시할 수 없습니다. 옆의 바로가기 버튼이나 아래 포트폴리오 섹션을 이용하세요.'
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <aside
            aria-label="지도 목적지 바로가기"
            className={cn(
              'rounded-lg border p-5 shadow-soft',
              isHome
                ? 'order-2 border-white/10 bg-dark-elevated text-white'
                : 'order-1 border-hairline bg-canvas lg:order-2',
            )}
          >
            <p
              className={cn(
                'w-fit rounded-md px-3 py-1.5 text-xs font-semibold uppercase',
                isHome ? 'bg-white/10 text-white' : 'bg-strong text-ink',
              )}
            >
              {isHome ? '직접 열기' : '바로가기'}
            </p>
            {isHome ? (
              <div className="mt-5 rounded-lg border border-white/10 bg-ink p-4">
                <p className="text-sm font-semibold text-white">
                  게임 없이도 모든 정보에 접근할 수 있습니다.
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-soft">
                  채용자나 모바일 사용자는 바로가기 또는 페이지 보기를 사용하면
                  됩니다.
                </p>
                {onSwitchToPage ? (
                  <button
                    type="button"
                    onClick={onSwitchToPage}
                    className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white outline-none transition hover:bg-primary-active focus-visible:shadow-focus"
                  >
                    페이지로 보기
                  </button>
                ) : null}
              </div>
            ) : null}
            <div className="mt-4 grid gap-3">
              {portfolioInteractables.map((interactable) => (
                <button
                  key={interactable.id}
                  type="button"
                  aria-label={`${interactable.label} 정보 열기`}
                  onClick={() => handleOpen(interactable)}
                  className={cn(
                    'min-h-12 rounded-lg px-4 py-2 text-left text-sm font-semibold outline-none transition focus-visible:shadow-focus',
                    isHome
                      ? 'border border-white/10 bg-white/10 text-white hover:bg-primary'
                      : 'border border-hairline bg-strong text-ink hover:bg-primary hover:text-white',
                  )}
                >
                  {interactable.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
