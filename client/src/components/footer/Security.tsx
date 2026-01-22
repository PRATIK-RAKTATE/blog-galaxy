import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
// Replaced FileShield with Shield
import { Search, ShieldCheck, Lock, Server, Eye, Shield, Zap, Radio } from 'lucide-react';

const sections = [
  { id: 'overview', title: 'Security Overview', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'infrastructure', title: 'Infrastructure Security', icon: <Server className="w-4 h-4" /> },
  { id: 'data-encryption', title: 'Data Encryption', icon: <Lock className="w-4 h-4" /> },
  { id: 'access-control', title: 'Access Control', icon: <Eye className="w-4 h-4" /> },
  { id: 'compliance', title: 'Compliance & Standards', icon: <Shield className="w-4 h-4" /> },
  { id: 'vulnerability', title: 'Vulnerability Management', icon: <Zap className="w-4 h-4" /> },
  { id: 'incident-response', title: 'Incident Response', icon: <Radio className="w-4 h-4" /> },
  { id: 'contact', title: 'Report a Vulnerability', icon: <Search className="w-4 h-4" /> },
];

interface SecurityPageProps {
  theme: string;
  toggleTheme: () => void;
  setCurrentPage: (page: string) => void;
}

export function SecurityPage({ theme, toggleTheme, setCurrentPage }: SecurityPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 font-sans">
      <Header theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Security at BlogGalaxy AI
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Enterprise-grade security measures to protect your data and content.
              </p>
            </motion.div>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search security protocols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sticky Navigation */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Security Content</h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="flex items-center gap-3 w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors py-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      {section.icon}
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content Section */}
            <main className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700 prose dark:prose-invert max-w-none">
                
                <section id="overview" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Security Overview</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    BlogGalaxy AI treats security as a core pillar of our platform. We leverage modern cloud architecture to ensure your personal data remain protected 24/7.
                  </p>
                  <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-5 rounded-r-lg">
                    <p className="text-sm text-green-800 dark:text-green-300">
                      <strong>Uptime:</strong> We maintain a 99.9% uptime SLA across multiple geographic regions.
                    </p>
                  </div>
                </section>

                <section id="infrastructure" className="mb-16">
                  <div className="flex items-center gap-3 mb-4">
                    <Server className="text-blue-500 w-8 h-8" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0">Infrastructure Security</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                      <h4 className="font-bold mb-2">Network Isolation</h4>
                      <p className="text-sm text-gray-500">VPC with strict firewall rules and no public database access.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                      <h4 className="font-bold mb-2">DDoS Mitigation</h4>
                      <p className="text-sm text-gray-500">Advanced edge protection to ensure global availability.</p>
                    </div>
                  </div>
                </section>

                

                <section id="data-encryption" className="mb-16">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Encryption</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/50">
                      <Lock className="shrink-0 text-blue-500" />
                      <div>
                        <strong className="block text-gray-900 dark:text-white">In Transit</strong>
                        <span className="text-sm text-gray-500">All data is encrypted using TLS 1.3.</span>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/50">
                      <ShieldCheck className="shrink-0 text-blue-500" />
                      <div>
                        <strong className="block text-gray-900 dark:text-white">At Rest</strong>
                        <span className="text-sm text-gray-500">Databases are encrypted using AES-256 standards.</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="incident-response" className="mb-16">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Incident Response</h2>
                  <div className="border-l-2 border-gray-200 dark:border-gray-700 ml-4 pl-6 space-y-8 mt-6">
                    <div className="relative">
                      <span className="absolute -left-[31px] top-0 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-800"></span>
                      <h4 className="text-sm font-bold uppercase text-blue-500">Detection</h4>
                      <p className="text-sm text-gray-500">Real-time monitoring for automated threat detection.</p>
                    </div>
                  </div>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Report a Vulnerability</h2>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-blue-500 hover:underline cursor-pointer font-semibold">security@BlogGalaxy.ai</p>
                    <p className="text-xs text-gray-500 mt-2 italic">Response time is usually within 24 hours.</p>
                  </div>
                </section>

              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}