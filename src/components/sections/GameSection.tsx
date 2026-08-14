'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { InteractableObject } from '@/game/interactions';
import { usePortfolioStore } from '@/store/portfolioStore';

type GameStatus =
  'waiting' | 'loading' | 'ready' | 'unavailable' | 'reduced-motion';

type GameSectionProps = {
  loadStrategy?: 'visible' | 'immediate';
};

type CanvasFrame = {
  height: number;
  left: number;
  top: number;
  width: number;
};

const GAME_CANVAS_HEIGHT = 736;
const GAME_CANVAS_WIDTH = 1280;
const LOADING_DELAY_MS = 1500;
const HOME_FENCE_TILE_SIZE = 24;
const HOME_SIGN_BODY_HEIGHT = 40;
const HOME_SIGN_POST_HEIGHT = 24;
const HOME_SIGN_TILE_INDEX_FROM_CORNER = 4;
const HOME_SIGN_TILE_CENTER_OFFSET = HOME_FENCE_TILE_SIZE / 2;

const homeFenceRegions = [
  {
    label: '이력서',
    x: 196,
    y: 112,
  },
  // 프로젝트 영역은 내용 보강 전까지 숨깁니다.
  // {
  //   label: '프로젝트',
  //   x: 868,
  //   y: 112,
  // },
  {
    label: '경력기술서',
    x: 532,
    y: 112,
  },
  {
    label: '자기소개서',
    x: 302,
    y: 408,
  },
  {
    label: '연락처',
    x: 762,
    y: 408,
  },
] as const;

const homeRegionSigns = homeFenceRegions.map((region) => ({
  label: region.label,
  x:
    region.x +
    HOME_FENCE_TILE_SIZE * HOME_SIGN_TILE_INDEX_FROM_CORNER +
    HOME_SIGN_TILE_CENTER_OFFSET,
  y: region.y - HOME_SIGN_BODY_HEIGHT / 2 - HOME_SIGN_POST_HEIGHT,
}));

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function GameSection({ loadStrategy = 'visible' }: GameSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasFrame, setCanvasFrame] = useState<CanvasFrame | null>(null);
  const [status, setStatus] = useState<GameStatus>('waiting');
  const openModal = usePortfolioStore((state) => state.openModal);
  const titleId = useId();
  const descriptionId = useId();

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
        setStatus('loading');
        const [{ createPortfolioGame }] = await Promise.all([
          import('@/game/PhaserGame'),
          wait(LOADING_DELAY_MS),
        ]);

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

  useEffect(() => {
    if (status !== 'ready') {
      setCanvasFrame(null);
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    let animationFrame = 0;

    const updateCanvasFrame = () => {
      const canvas = container.querySelector('canvas');

      if (!canvas) {
        animationFrame = window.requestAnimationFrame(updateCanvasFrame);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const nextFrame = {
        height: canvasRect.height,
        left: canvasRect.left - containerRect.left,
        top: canvasRect.top - containerRect.top,
        width: canvasRect.width,
      };

      setCanvasFrame((currentFrame) => {
        if (
          currentFrame &&
          Math.abs(currentFrame.height - nextFrame.height) < 0.5 &&
          Math.abs(currentFrame.left - nextFrame.left) < 0.5 &&
          Math.abs(currentFrame.top - nextFrame.top) < 0.5 &&
          Math.abs(currentFrame.width - nextFrame.width) < 0.5
        ) {
          return currentFrame;
        }

        return nextFrame;
      });
    };

    updateCanvasFrame();
    animationFrame = window.requestAnimationFrame(updateCanvasFrame);

    const resizeObserver = new ResizeObserver(updateCanvasFrame);

    resizeObserver.observe(container);
    window.addEventListener('resize', updateCanvasFrame);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCanvasFrame);
    };
  }, [status]);

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      <h1 id={titleId} className="sr-only">
        DDoni Resume Map
      </h1>
      <p id={descriptionId} className="sr-only">
        이력서 맵은 시각적 탐색 경험입니다.
      </p>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="portfolio-game-canvas absolute inset-0 h-full w-full bg-ink"
      >
        {status !== 'ready' ? (
          <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-5 px-4 text-center">
            <div
              aria-hidden="true"
              className="game-loading-character"
            />
            <p className="text-sm font-black text-white">불러오는 중</p>
          </div>
        ) : null}
      </div>
      {canvasFrame ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-[5]"
          style={{
            height: canvasFrame.height,
            left: canvasFrame.left,
            top: canvasFrame.top,
            width: canvasFrame.width,
          }}
        >
          {homeRegionSigns.map((sign) => (
            <div
              key={sign.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(sign.x / GAME_CANVAS_WIDTH) * 100}%`,
                top: `${(sign.y / GAME_CANVAS_HEIGHT) * 100}%`,
              }}
            >
              <div
                className="relative flex h-10 w-36 items-center justify-center whitespace-nowrap border-[3px] border-[#5f3b22] bg-[#e5b76c] px-5 text-[15px] font-black leading-none text-[#2d1a0f] shadow-[inset_0_3px_0_rgba(255,255,255,0.42),0_3px_0_rgba(59,38,24,0.62),0_5px_10px_rgba(16,20,27,0.18)] after:absolute after:left-1/2 after:top-full after:h-6 after:w-3.5 after:-translate-x-1/2 after:border-x-[3px] after:border-[#5f3b22] after:bg-[#8a5a35] after:content-['']"
                style={{
                  textShadow:
                    '0 1px 0 rgba(255,255,255,0.38), 0 2px 0 rgba(95,59,34,0.22)',
                }}
              >
                {sign.label}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {status === 'ready' ? (
        <div className="pointer-events-none absolute left-4 top-4 z-10 sm:left-5 sm:top-5">
          <div className="flex flex-wrap items-center gap-2 border-2 border-[#8fb56b] bg-[#25431d] px-3 py-2 text-white shadow-[0_3px_0_rgba(19,27,15,0.42)]">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#f4c95d]">
              이동
            </span>
            <kbd className="border border-[#d7efb8] bg-[#5f7f3d] px-2 py-1 text-sm font-black leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              WASD
            </kbd>
            <span className="text-xs font-bold text-[#d7efb8]">또는</span>
            <kbd className="border border-[#d7efb8] bg-[#5f7f3d] px-2 py-1 text-sm font-black leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              방향키
            </kbd>
          </div>
        </div>
      ) : null}
    </section>
  );
}
