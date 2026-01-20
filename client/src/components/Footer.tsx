import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export function Footer({ setCurrentPage }) {
  const currentYear = new Date().getFullYear();

  const navigateToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><button onClick={() => navigateToPage('home')} className="hover:text-white transition-colors">Features</button></li>
              <li><button onClick={() => navigateToPage('home')} className="hover:text-white transition-colors">Pricing</button></li>
              <li><button onClick={() => navigateToPage('seo-analysis')} className="hover:text-white transition-colors">SEO Analysis</button></li>
              <li><button onClick={() => navigateToPage('explore')} className="hover:text-white transition-colors">Explore Blogs</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
              <li><button onClick={() => navigateToPage('community')} className="hover:text-white transition-colors">Community</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><button onClick={() => navigateToPage('about')} className="hover:text-white transition-colors">About</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><button onClick={() => navigateToPage('contact')} className="hover:text-white transition-colors">Contact</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><button onClick={() => navigateToPage('privacy')} className="hover:text-white transition-colors">Privacy</button></li>
              <li><button onClick={() => navigateToPage('terms')} className="hover:text-white transition-colors">Terms</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <button onClick={() => navigateToPage('home')} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BG</span>
            </div>
            <span className="font-bold text-white">BlogGalaxy AI</span>
          </button>

          <p className="text-sm text-gray-400">
            © {currentYear} BlogGalaxy AI. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}