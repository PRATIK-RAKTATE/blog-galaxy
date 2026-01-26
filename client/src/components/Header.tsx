import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";

// 1. IMPORT the logo here (This is the "magic" fix for Netlify)
import logo from "../../src/assets/logo.png"; 

type Theme = "light" | "dark";

type HeaderProps = {
  theme: Theme;
  toggleTheme: () => void;
};

export function Header({ theme, toggleTheme }: HeaderProps): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsBlogDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <button onClick={() => navigateTo("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              {/* 2. USE the imported logo variable here */}
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              BlogGalaxy AI
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 dark:text-white">
            <NavLink to="/" end className="nav-link">Home</NavLink>
            <NavLink to="/seo-analysis" className="nav-link">SEO Analysis</NavLink>

            {/* --- CENTERED BLOGS DROPDOWN --- */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsBlogDropdownOpen(true)}
                onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
                className={`flex items-center gap-1 nav-link transition-colors ${isBlogDropdownOpen ? 'text-blue-500' : ''}`}
              >
                Blogs
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isBlogDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isBlogDropdownOpen && (
                <div
                  onMouseLeave={() => setIsBlogDropdownOpen(false)}
                  // Centering logic: left-1/2 -translate-x-1/2
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 py-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <button onClick={() => navigateTo("/blogs")} className="w-full text-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Explore Blogs
                  </button>
                  <button onClick={() => navigateTo("/add-blog")} className="w-full text-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Add Blog
                  </button>
                  <button onClick={() => navigateTo("/create")} className="w-full text-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Create Post
                  </button>
                </div>
              )}
            </div>

            <NavLink to="/explore" className="nav-link">Explore</NavLink>
            <NavLink to="/community" className="nav-link">Community</NavLink>
          </nav>

          {/* Actions & Mobile Toggle (Keep your existing code) */}
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-4">
                <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300">
                  {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
                <button onClick={() => navigateTo("/login")} className="text-gray-600 dark:text-gray-300">Sign In</button>
                <button onClick={() => navigateTo("/register")} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-all">
                  Start Free Trial
                </button>
             </div>
             
             {/* Mobile Toggle */}
             <div className="flex md:hidden items-center gap-2">
                <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300">
                  {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300">
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
             </div>
          </div>
        </div>

        {/* Mobile Menu - Simplified Flat List */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col gap-5 px-4 text-center">
              <button onClick={() => navigateTo("/")} className="font-medium">Home</button>
              <button onClick={() => navigateTo("/seo-analysis")} className="font-medium">SEO Analysis</button>
              
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-1 mx-10" />
              
              <button onClick={() => navigateTo("/blogs")} className="text-blue-500 font-bold text-lg">Explore Blogs</button>
              <button onClick={() => navigateTo("/add-blog")} className="font-medium">Add Blog</button>
              <button onClick={() => navigateTo("/create")} className="font-medium">Create Post</button>
              
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-1 mx-10" />
              
              <button onClick={() => navigateTo("/explore")} className="font-medium">Explore</button>
              <button onClick={() => navigateTo("/community")} className="font-medium">Community</button>
              <button onClick={() => navigateTo("/login")} className="font-medium">Sign In</button>
              <button onClick={() => navigateTo("/register")} className="py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg">
                Start Free Trial
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}