import { useState } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Search, Calendar, AlertTriangle } from 'lucide-react';

const sections = [
  { id: 'agreement', title: 'Agreement to Terms' },
  { id: 'use-license', title: 'Use License' },
  { id: 'user-accounts', title: 'User Accounts' },
  { id: 'prohibited-uses', title: 'Prohibited Uses' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'user-content', title: 'User Generated Content' },
  { id: 'payment-terms', title: 'Payment and Billing' },
  { id: 'termination', title: 'Termination' },
  { id: 'disclaimers', title: 'Disclaimers' },
  { id: 'limitation', title: 'Limitation of Liability' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'changes', title: 'Changes to Terms' },
];

export function TermsOfService({ theme, toggleTheme, setCurrentPage }) {
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-5 h-5" />
                <span>Last updated: January 16, 2026</span>
              </div>
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
                placeholder="Search within terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sticky Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors py-1"
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700 prose dark:prose-invert max-w-none">
                <section id="agreement" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Agreement to Terms</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    These Terms of Service constitute a legally binding agreement made between you and BlogGalaxy AI ("Company", "we", "us", or "our"), concerning your access to and use of the BlogGalaxy AI service.
                  </p>
                  <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 rounded-r-lg flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Important:</strong> By accessing or using our service, you agree that you have read, understood, and agree to be bound by these Terms. If you do not agree, you may not access the service.
                    </p>
                  </div>
                </section>

                <section id="use-license" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Use License</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    BlogGalaxy AI grants you a limited, non-exclusive, non-transferable license to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>Access and use the service for your personal or internal business purposes</li>
                    <li>Generate and use content created through our AI technology</li>
                    <li>Download and use our software applications in accordance with this agreement</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                    This license shall automatically terminate if you violate any of these restrictions.
                  </p>
                </section>

                <section id="user-accounts" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Accounts</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>Maintaining the security of your account and password</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                  </ul>
                </section>

                <section id="prohibited-uses" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prohibited Uses</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    You may not use our service to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>Generate content that violates any applicable laws or regulations</li>
                    <li>Create misleading, deceptive, or fraudulent content</li>
                    <li>Infringe upon the intellectual property rights of others</li>
                    <li>Harass, abuse, or harm another person</li>
                    <li>Attempt to bypass our security measures or access restrictions</li>
                    <li>Use our service to generate spam or malicious content</li>
                  </ul>
                </section>

                <section id="intellectual-property" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    The service and its original content, features, and functionality are owned by BlogGalaxy AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Note:</strong> You retain all rights to the content you generate using our AI service. We do not claim ownership of your generated content.
                    </p>
                  </div>
                </section>

                <section id="user-content" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Generated Content</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    You retain all rights to any content you submit, post, or display through the service. By submitting content, you grant us a worldwide, non-exclusive license to use, modify, and display your content for the purpose of providing and improving our service.
                  </p>
                </section>

                <section id="payment-terms" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payment and Billing</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    For paid subscriptions:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>All fees are in U.S. dollars and are non-refundable except as required by law</li>
                    <li>Subscriptions automatically renew unless cancelled</li>
                    <li>You must provide current and accurate payment information</li>
                    <li>We reserve the right to change our pricing with 30 days notice</li>
                  </ul>
                </section>

                <section id="termination" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the service will immediately cease.
                  </p>
                </section>

                <section id="disclaimers" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Disclaimers</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>The service will be uninterrupted or error-free</li>
                    <li>The results obtained from the service will be accurate or reliable</li>
                    <li>Any errors in the service will be corrected</li>
                  </ul>
                </section>

                <section id="limitation" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    IN NO EVENT SHALL BlogGalaxy AI BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                  </p>
                </section>

                <section id="governing-law" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section id="changes">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Contact Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      If you have any questions about these Terms, please contact us:
                    </p>
                    <p className="text-gray-900 dark:text-white mb-2"><strong>Email:</strong> legal@BlogGalaxy.ai</p>
                    <p className="text-gray-900 dark:text-white"><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
