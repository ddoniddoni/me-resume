import { PortfolioModals } from '@/components/modals/PortfolioModals';
import { GameSection } from '@/components/sections/GameSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:shadow-focus"
      >
        이력서 본문으로 이동
      </a>
      <main id="main-content" tabIndex={-1}>
        <GameSection loadStrategy="immediate" />
      </main>
      <PortfolioModals />
    </div>
  );
}
