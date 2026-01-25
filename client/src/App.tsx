// App.tsx
import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { SEOAnalysisDashboard } from "./pages/SEOAnalysisDashboard";
import { ExploreBlogs } from "./pages/ExploreBlogs";
import { ContactUs } from "./pages/ContactUs";
import { AboutUs } from "./pages/AboutUs";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Community } from "./pages/Community";
import { LoadingScreen } from "./components/LoadingScreen";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DocumentationPage } from "./components/footer/Documentation";
import { CareersPage } from "./components/footer/Careers.jsx"
import { SecurityPage } from './components/footer/Security'
import { CreateBlog } from './components/CreateBlog.tsx'
import SeoTest  from './pages/SeoData.jsx';
import SeoAnalyzer from './components/SeoAnalyzer'; // Add this import


type Theme = "light" | "dark";

export type PageCommonProps = {
  theme: Theme;
  toggleTheme: () => void;
};

function AppLayout({
  theme,
  toggleTheme,
}: {
  theme: Theme;
  toggleTheme: () => void;
}): JSX.Element {
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {/* If you have a global navbar/header, keep it here once */}
      {/* <Navbar theme={theme} toggleTheme={toggleTheme} /> */}

      {/* Routed pages render here */}
      <Outlet />
    </div>
  );
}

export default function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const commonProps: PageCommonProps = useMemo(
    () => ({ theme, toggleTheme }),
    [theme]
  );

  if (isLoading) return <LoadingScreen theme={theme} />;

  return (
    <Routes>
      {/* Layout wrapper (keeps theme wrapper stable) */}
      <Route element={<AppLayout theme={theme} toggleTheme={toggleTheme} />}>
        <Route path="/" element={<LandingPage {...commonProps} />} />
        <Route path="/seo-analysis" element={<SEOAnalysisDashboard {...commonProps} />} />
        <Route path="/explore" element={<ExploreBlogs {...commonProps} />} />
        <Route path="/contact" element={<ContactUs {...commonProps} />} />
        <Route path="/about" element={<AboutUs {...commonProps} />} />
        <Route path="/privacy" element={<PrivacyPolicy {...commonProps} />} />
        <Route path="/terms" element={<TermsOfService {...commonProps} />} />
        <Route path="/community" element={<Community {...commonProps} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/documentation" element={<DocumentationPage/> }/>
        <Route path="/careers" element={<CareersPage/> }/>
        <Route path="/create" element={<CreateBlog/> }/>
        <Route path="/seo-test" element={<SeoTest/> }/>
          <Route path="/seo-analyzer" element={<SeoAnalyzer {...commonProps} />} /> {/* Add this route */}
        

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
