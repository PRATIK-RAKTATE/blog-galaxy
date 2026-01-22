import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Search, 
  Cpu, 
  BarChart3, 
  Settings, 
  ChevronRight, 
  ArrowLeft,
  FileText,
  Zap,
  Globe,
  Sparkles,
  MousePointer2,
  TrendingUp
} from 'lucide-react';

export function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: <Zap size={18} /> },
    { id: 'ai-writing', title: 'AI Content Generation', icon: <Cpu size={18} /> },
    { id: 'analytics', title: 'Analytics & Tracking', icon: <BarChart3 size={18} /> },
    { id: 'api-setup', title: 'API Integration', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xs">BG</span>
              </div>
              <span className="font-bold hidden sm:block tracking-tight">BlogGalaxy Docs</span>
            </div>
          </div>

          {/* Fixed Search UI */}
          <div className="relative w-full max-w-sm hidden md:block group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            </div>
            <input 
              type="text" 
              placeholder="  &nbsp; Search docs (Ctrl + K)" 
              className="w-full pl-10 pr-12 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-gray-400 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 hidden lg:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 p-6">
          <div className="mb-4 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Main Documentation</div>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                <span className={activeSection === section.id ? 'text-blue-500' : 'text-gray-400'}>
                  {section.icon}
                </span>
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-12 max-w-4xl">
          <div className="prose dark:prose-invert max-w-none">
            {activeSection === 'getting-started' && (
              <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-3">
                  Getting Started
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  BlogGalaxy AI is an end-to-end platform designed to bridge the gap between AI generation and search engine dominance.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-5 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Sparkles className="text-blue-600" size={20} />
                    </div>
                    <h3 className="font-bold flex items-center gap-2">Quick Start Guide <ChevronRight size={16} /></h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Set up your first automated blog post in under 5 minutes.</p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900/10 dark:to-transparent border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Globe className="text-purple-600" size={20} />
                    </div>
                    <h3 className="font-bold flex items-center gap-2">SEO Fundamentals <ChevronRight size={16} /></h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Learn how our AI analyzes keywords and competition.</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-4">Core Concepts</h2>
                <p>BlogGalaxy works by connecting your niche keywords to our proprietary <strong>NLP (Natural Language Processing)</strong> engine. Unlike standard AI writers, we focus on:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600 dark:text-gray-400">
                  <li><strong>Semantic Clustering:</strong> Automatically grouping related topics to build topical authority.</li>
                  <li><strong>Search Intent Mapping:</strong> Aligning content with whether users want to buy, learn, or find a specific site.</li>
                  <li><strong>Automatic Schema Markup:</strong> Injecting JSON-LD data so Google understands your reviews, recipes, or articles instantly.</li>
                </ul>
              </section>
            )}

            {activeSection === 'ai-writing' && (
              <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h1 className="text-4xl font-extrabold mb-4">AI Content Generation</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Our generation engine utilizes the BlogGalaxy-4 Turbo model, fine-tuned specifically for long-form editorial content.
                </p>

                <h2 className="text-2xl font-bold mb-4">Generation Modes</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <h4 className="font-bold mb-1">One-Click Article</h4>
                    <p className="text-sm text-gray-500">Input a single keyword, and get a 1,500-word post with images, headers, and meta tags.</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <h4 className="font-bold mb-1">Outline Builder</h4>
                    <p className="text-sm text-gray-500">Generate an H2/H3 structure first, customize the talking points, then generate the full text.</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-4">Anti-Hallucination Guardrails</h2>
                <p>BlogGalaxy uses <strong>RAG (Retrieval-Augmented Generation)</strong> to verify facts against real-time web search results before including them in your drafts.</p>
              </section>
            )}

            {activeSection === 'seo-optimization' && (
              <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h1 className="text-4xl font-extrabold mb-4">SEO Optimization</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Learn how to leverage our AI to hit a 90+ SEO score on every post.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-500">Keyword Density Analysis</h3>
                <p>Our AI automatically calculates LSI (Latent Semantic Indexing) keywords to ensure your content is relevant to search intent without being flagged for keyword stuffing.</p>
                
                <div className="my-8 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="p-4 font-bold">Feature</th>
                        <th className="p-4 font-bold">Benefit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      <tr>
                        <td className="p-4 font-medium">Auto-Meta Tags</td>
                        <td className="p-4 text-gray-500">Generates high-CTR title and description tags based on current top-10 rankings.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Internal Linking</td>
                        <td className="p-4 text-gray-500">Scans your published library to suggest relevant anchor text for new posts.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Image Alt Text</td>
                        <td className="p-4 text-gray-500">Uses computer vision to describe generated images for accessibility and SEO.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeSection === 'analytics' && (
              <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h1 className="text-4xl font-extrabold mb-4">Analytics & Tracking</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Monitor your content performance with our native Google Search Console integration.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                    <TrendingUp className="mx-auto text-blue-500 mb-2" size={24} />
                    <span className="block text-2xl font-bold">Impression Tracking</span>
                    <span className="text-xs text-gray-500 uppercase">Live Data</span>
                  </div>
                  <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20 text-center">
                    <MousePointer2 className="mx-auto text-purple-500 mb-2" size={24} />
                    <span className="block text-2xl font-bold">Click-Through Rate</span>
                    <span className="text-xs text-gray-500 uppercase">Per Article</span>
                  </div>
                  <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                    <Search className="mx-auto text-emerald-500 mb-2" size={24} />
                    <span className="block text-2xl font-bold">Keyword Ranking</span>
                    <span className="text-xs text-gray-500 uppercase">Daily Update</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">Connecting Search Console</h2>
                <p>Navigate to <strong>Settings {'>'} Integrations</strong> and click "Connect GSC". Once authorized, BlogGalaxy will automatically correlate your AI-generated posts with real ranking changes.</p>
              </section>
            )}

            {/* Placeholder for API Setup */}
            {activeSection === 'api-setup' && (
              <div className="py-20 text-center">
                <Settings size={48} className="mx-auto text-gray-300 mb-4 animate-spin-slow" />
                <h2 className="text-2xl font-bold italic">API Documentation</h2>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                  Integration docs for headless CMS deployments (WordPress, Ghost, and Webflow) are currently being finalized.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}