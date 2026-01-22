import { useState } from "react";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  Search,
  TrendingUp,
  Target,
  BarChart3,
  Eye,
  Link2,
  ChevronDown,
  Check,
  AlertCircle,
  ExternalLink,
  History,
  Filter,
} from "lucide-react";

import { analyzeSeo } from "../api/seo"; // ✅ add this

export function SEOAnalysisDashboard({ theme, toggleTheme, setCurrentPage }) {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL or topic.");
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false);

    try {
      const data = await analyzeSeo(url.trim());
      setResult(data);
      setShowResults(true);
    } catch (e: any) {
      setError(e?.message || "Failed to analyze.");
      setResult(null);
      setShowResults(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // helper for badge colors
  const competitionClass = (c: string) =>
    c === "Low"
      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
      : c === "Medium"
      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";

  const priorityClass = (p: string) =>
    p === "High"
      ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
      : p === "Medium"
      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
      : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";

  const daWidth = (da: number) => `${Math.max(0, Math.min(100, da))}%`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              SEO Analysis Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Analyze your blog's SEO performance and get actionable insights
            </p>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter blog URL or topic to analyze..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition-all duration-200"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze"}
                </button>
                <button className="px-4 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <History className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                <Filter className="w-4 h-4 inline mr-2" />
                All Metrics
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Keywords Only
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Technical SEO
              </button>
            </div>
          </motion.div>

          {showResults && result && (
            <>
              {/* Main Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {/* SEO Score */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      SEO Score
                    </h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>

                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - result.summary.seoScore.percent)}`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {result.summary.seoScore.value}
                      </span>
                    </div>
                  </div>

                  <p className="text-center text-sm text-green-600 dark:text-green-400">
                    {result.summary.seoScore.label}
                  </p>
                </motion.div>

                {/* Keyword Difficulty */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Keyword Difficulty
                    </h3>
                    <Target className="w-5 h-5 text-orange-500" />
                  </div>

                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {result.summary.keywordDifficulty.value}
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                      style={{ width: `${result.summary.keywordDifficulty.percent * 100}%` }}
                    />
                  </div>

                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    {result.summary.keywordDifficulty.label}
                  </p>
                </motion.div>

                {/* Search Volume */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Search Volume
                    </h3>
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                  </div>

                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {result.summary.searchVolume.display}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly searches</p>

                  {result.summary.searchVolume.trend && (
                    <div className="mt-2 flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>
                        {result.summary.searchVolume.trend.direction === "up" ? "+" : "-"}
                        {result.summary.searchVolume.trend.percent}% this month
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Readability */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Readability
                    </h3>
                    <Eye className="w-5 h-5 text-purple-500" />
                  </div>

                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {result.summary.readability.score}
                  </div>

                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    {result.summary.readability.label}
                  </p>

                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Grade level: {result.summary.readability.gradeLevel}
                  </div>
                </motion.div>

                {/* Backlink Potential */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Backlink Potential
                    </h3>
                    <Link2 className="w-5 h-5 text-cyan-500" />
                  </div>

                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {result.summary.backlinkPotential.label}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {result.summary.backlinkPotential.opportunities} opportunities
                  </p>

                  <div className="mt-2 text-xs text-cyan-600 dark:text-cyan-400">
                    +{result.summary.backlinkPotential.deltaThisWeek} this week
                  </div>
                </motion.div>
              </div>

              {/* Two column */}
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Keyword Insights */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Keyword Insights
                    </h3>

                    <div className="mb-6">
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 block">
                        Primary Keyword
                      </label>
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {result.keywordInsights.primaryKeyword}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 block">
                        Related Keywords
                      </label>
                      <div className="space-y-2">
                        {result.keywordInsights.relatedKeywords.map((item: any) => (
                          <div
                            key={item.keyword}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                          >
                            <span className="text-sm text-gray-900 dark:text-white">
                              {item.keyword}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${competitionClass(item.competition)}`}>
                              {item.competition}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 block">
                        Long Tail Suggestions
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {result.keywordInsights.longTailSuggestions.map((keyword: string) => (
                          <span
                            key={keyword}
                            className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content Optimization + Competitors */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="lg:col-span-2 space-y-8"
                >
                  {/* Content Optimization */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Content Optimization
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {result.contentOptimization.completedCount}/{result.contentOptimization.totalCount} completed
                      </span>
                    </div>

                    <div className="space-y-3">
                      {result.contentOptimization.items.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                item.completed ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                              }`}
                            >
                              {item.completed ? (
                                <Check className="w-4 h-4 text-white" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                            <span
                              className={`text-sm ${
                                item.completed
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {item.text}
                            </span>
                          </div>

                          <span className={`text-xs px-2 py-1 rounded-full ${priorityClass(item.priority)}`}>
                            {item.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Competitors */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Competitor Comparison
                      </h3>
                      <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
                        View All
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                              Domain
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                              Traffic
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                              Domain Authority
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                              Backlinks
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400"></th>
                          </tr>
                        </thead>

                        <tbody>
                          {result.competitors.items.map((c: any) => (
                            <tr
                              key={c.domain}
                              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                    {c.domain.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {c.domain}
                                  </span>
                                </div>
                              </td>

                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                                {c.trafficDisplay}/mo
                              </td>

                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {c.domainAuthority}
                                  </span>
                                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div
                                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full"
                                      style={{ width: daWidth(c.domainAuthority) }}
                                    />
                                  </div>
                                </div>
                              </td>

                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                                {c.backlinksDisplay}
                              </td>

                              <td className="py-4 px-4">
                                {c.url ? (
                                  <a
                                    href={c.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-500 hover:text-blue-600 inline-flex"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                ) : (
                                  <button className="text-blue-500 hover:text-blue-600">
                                    <ExternalLink className="w-4 h-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
