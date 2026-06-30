'use client';

import { useEffect, useRef, useState } from 'react';
import {
  portfolioInteractables,
  type InteractableObject,
} from '@/game/interactions';
import { usePortfolioStore } from '@/store/portfolioStore';

type GameStatus = 'loading' | 'ready' | 'unavailable' | 'reduced-motion';

export function GameSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<GameStatus>('loading');
  const openModal = usePortfolioStore((state) => state.openModal);

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

    void bootGame();

    return () => {
      isMounted = false;
      game?.destroy(true);
    };
  }, [openModal]);

  const handleOpen = (interactable: InteractableObject) => {
    openModal(
      interactable.modalType,
      interactable.experienceId
        ? { experienceId: interactable.experienceId }
        : undefined,
    );
  };

  return (
    <section aria-labelledby="game-title" className="bg-panel py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="order-2 rounded-3xl border border-hairline bg-canvas p-4 shadow-soft sm:p-6 lg:order-1">
            <p className="w-fit rounded-full bg-strong px-4 py-2 text-xs font-semibold text-ink">
              선택형 탐색
            </p>
            <h2
              id="game-title"
              className="mt-5 text-balance text-4xl font-normal tracking-[-0.03em] text-ink"
            >
              포트폴리오 지도
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-body">
              WASD 또는 방향키로 이동하세요. 오브젝트 가까이에서 Enter를 누르면
              아래에서도 접근 가능한 같은 포트폴리오 섹션이 열립니다.
            </p>
            <div
              ref={containerRef}
              aria-label="인터랙티브 포트폴리오 지도 캔버스"
              className="portfolio-game-canvas mt-6 h-[320px] overflow-hidden rounded-3xl border border-hairline bg-strong sm:h-[420px] lg:h-[520px]"
            >
              {status !== 'ready' ? (
                <div className="flex h-full min-h-[280px] items-center justify-center px-4 text-center text-sm font-semibold text-body">
                  {status === 'loading' ? (
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
            className="order-1 rounded-3xl border border-hairline bg-canvas p-5 shadow-soft lg:order-2"
          >
            <p className="w-fit rounded-full bg-strong px-4 py-2 text-xs font-semibold text-ink">
              바로가기
            </p>
            <div className="mt-4 grid gap-3">
              {portfolioInteractables.map((interactable) => (
                <button
                  key={interactable.id}
                  type="button"
                  onClick={() => handleOpen(interactable)}
                  className="min-h-12 rounded-full bg-strong px-4 py-2 text-left text-sm font-semibold text-ink outline-none transition hover:bg-primary hover:text-white focus-visible:shadow-focus"
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
