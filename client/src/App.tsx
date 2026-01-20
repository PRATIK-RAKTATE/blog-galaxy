import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { SEOAnalysisDashboard } from './pages/SEOAnalysisDashboard';
import { ExploreBlogs } from './pages/ExploreBlogs';
import { ContactUs } from './pages/ContactUs';
import { AboutUs } from './pages/AboutUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Community } from './pages/Community';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (isLoading) {
    return <LoadingScreen theme={theme} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />;
      case 'seo-analysis':
        return <SEOAnalysisDashboard theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />;
      case 'explore':
        return <ExploreBlogs theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactUs theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutUs theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />;
      case 'privacy':
        return <PrivacyPolicy theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />;
      case 'terms':
        return <TermsOfService theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />;
      case 'community':
        return <Community theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />;
      default:
        return <LandingPage theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {renderPage()}
    </div>
  );
}
