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
    <section aria-labelledby="game-title" className="bg-panel py-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="order-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:order-1">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
              Optional exploration
            </p>
            <h2 id="game-title" className="mt-3 text-2xl font-black text-ink">
              Quest map
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              Move with WASD / Arrow Keys. Press Enter near an object to open
              the same portfolio sections available below.
            </p>
            <div
              ref={containerRef}
              aria-label="Interactive portfolio map canvas"
              className="mt-5 aspect-[12/7] min-h-[280px] overflow-hidden rounded-md border border-slate-300 bg-slate-100"
            >
              {status !== 'ready' ? (
                <div className="flex h-full min-h-[280px] items-center justify-center px-4 text-center text-sm font-bold text-slate-600">
                  {status === 'loading' ? (
                    <>Loading interactive map&hellip;</>
                  ) : status === 'reduced-motion' ? (
                    'Interactive map is paused because reduced motion is enabled. Use the direct buttons nearby or the full portfolio sections below.'
                  ) : (
                    'Interactive map is unavailable. Use the direct buttons nearby or the full portfolio sections below.'
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <aside
            aria-label="Direct access to game destinations"
            className="order-1 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:order-2"
          >
            <p className="text-sm font-black uppercase tracking-[0.16em] text-circuit">
              Direct access
            </p>
            <div className="mt-4 grid gap-3">
              {portfolioInteractables.map((interactable) => (
                <button
                  key={interactable.id}
                  type="button"
                  onClick={() => handleOpen(interactable)}
                  className="min-h-11 rounded-md border border-slate-300 px-3 py-2 text-left text-sm font-bold text-ink outline-none transition hover:border-circuit hover:text-circuit focus-visible:shadow-focus"
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
