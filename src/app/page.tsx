import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PortfolioModals } from '@/components/modals/PortfolioModals';
import { FallbackPortfolio } from '@/components/sections/FallbackPortfolio';
import { GameSection } from '@/components/sections/GameSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickActions } from '@/components/sections/QuickActions';

export default function Home() {
  return (
    <div className="min-h-screen bg-panel text-slate-950">
      <Header />
      <main>
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
