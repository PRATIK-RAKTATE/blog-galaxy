import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DocumentationPage } from './footer/Documentation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Helper to scroll to top when a link is clicked to prevent landing at the bottom of the new page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Product */}
          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/seo-analysis" onClick={scrollToTop} className="hover:text-white transition-colors">SEO Analysis</Link></li>
              <li><Link to="/explore" onClick={scrollToTop} className="hover:text-white transition-colors">Explore Blogs</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/documentation" onClick={scrollToTop} className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/explore" onClick={scrollToTop} className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/explore" onClick={scrollToTop} className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link to="/community" onClick={scrollToTop} className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/careers" onClick={scrollToTop} className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" onClick={scrollToTop} className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" onClick={scrollToTop} className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/security" onClick={scrollToTop} className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BG</span>
            </div>
            <span className="font-bold text-white">BlogGalaxy AI</span>
          </Link>

          <p className="text-sm text-gray-400">
            © {currentYear} BlogGalaxy AI. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {/* External Links use <a> for proper browser behavior */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:contact@bloggalaxy.ai" className="hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}