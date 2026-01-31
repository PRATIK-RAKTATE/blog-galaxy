import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProblemSolution } from '../components/ProblemSolution';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { LiveDemo } from '../components/LiveDemo';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { Integrations } from '../components/Integrations';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { MobileStickyCTA } from '../components/MobileStickyCTA';

export function LandingPage({ theme, toggleTheme, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />
      <Hero />
      <LiveDemo />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Pricing />
      {/* <Testimonials /> */}
      <Integrations />
      <FAQ />
      <FinalCTA />
      <Footer setCurrentPage={setCurrentPage} />
      <MobileStickyCTA />
    </div>
  );
}
