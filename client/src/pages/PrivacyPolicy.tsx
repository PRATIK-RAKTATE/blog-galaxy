import { useState } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Search, Calendar } from 'lucide-react';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-collection', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'data-sharing', title: 'Data Sharing and Disclosure' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'cookies', title: 'Cookies and Tracking' },
  { id: 'children', title: 'Children\'s Privacy' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
];

export function PrivacyPolicy({ theme, toggleTheme, setCurrentPage }) {
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
                Privacy Policy
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
                placeholder="Search within policy..."
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
                <section id="introduction" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Welcome to BlogGalaxy AI's Privacy Policy. Your privacy is important to us, and we are committed to protecting your personal information. This policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Important:</strong> By using BlogGalaxy AI, you agree to the collection and use of information in accordance with this policy.
                    </p>
                  </div>
                </section>

                <section id="information-collection" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We collect several types of information for various purposes to provide and improve our service to you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li><strong>Personal Data:</strong> Name, email address, payment information</li>
                    <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent</li>
                    <li><strong>Content Data:</strong> Blog posts, articles, and content you create using our service</li>
                    <li><strong>Communication Data:</strong> Support tickets, emails, and feedback</li>
                  </ul>
                </section>

                <section id="how-we-use" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    BlogGalaxy AI uses the collected data for various purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>To provide and maintain our service</li>
                    <li>To notify you about changes to our service</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information to improve our service</li>
                    <li>To monitor the usage of our service</li>
                    <li>To detect, prevent and address technical issues</li>
                  </ul>
                </section>

                <section id="data-sharing" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Sharing and Disclosure</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We may share your personal information in the following situations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li><strong>Service Providers:</strong> We may employ third-party companies to facilitate our service</li>
                    <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of assets</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  </ul>
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-500 p-4 rounded-r-lg mt-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Note:</strong> We will never sell your personal data to third parties for marketing purposes.
                    </p>
                  </div>
                </section>

                <section id="data-security" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    The security of your data is important to us. We use commercially acceptable means to protect your personal information, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Access controls and authentication measures</li>
                    <li>SOC 2 Type II compliance</li>
                  </ul>
                </section>

                <section id="your-rights" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    You have certain rights regarding your personal data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                    <li><strong>Deletion:</strong> Request deletion of your data</li>
                    <li><strong>Portability:</strong> Request transfer of your data</li>
                    <li><strong>Objection:</strong> Object to processing of your data</li>
                  </ul>
                </section>

                <section id="cookies" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies and Tracking</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We use cookies and similar tracking technologies to track activity on our service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  </p>
                </section>

                <section id="children" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children's Privacy</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our service does not address anyone under the age of 13. We do not knowingly collect personal information from children under 13.
                  </p>
                </section>

                <section id="changes" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <p className="text-gray-900 dark:text-white mb-2"><strong>Email:</strong> privacy@BlogGalaxy.ai</p>
                    <p className="text-gray-900 dark:text-white mb-2"><strong>Address:</strong> AP. sinnar nashik Maharashtra India</p>
                    <p className="text-gray-900 dark:text-white"><strong>Phone:</strong> +91 88304-38869</p>
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
