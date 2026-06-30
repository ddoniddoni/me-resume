import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PortfolioModals } from '@/components/modals/PortfolioModals';
import { FallbackPortfolio } from '@/components/sections/FallbackPortfolio';
import { GameSection } from '@/components/sections/GameSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickActions } from '@/components/sections/QuickActions';

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:shadow-focus"
      >
        포트폴리오 본문으로 이동
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <QuickActions />
        <GameSection />
        <FallbackPortfolio />
      </main>
      <Footer />
      <PortfolioModals />
    </div>
  );
}
