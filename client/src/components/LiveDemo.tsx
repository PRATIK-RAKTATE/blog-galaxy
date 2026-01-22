import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ContentLoader } from "./ContentLoader";
import { generateAI } from "../api/ai"; // ✅ adjust path if different

export function LiveDemo() {
  const [topic, setTopic] = useState("Benefits of Remote Work for Productivity");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleGenerate = async () => {
    // reset UI states
    setError("");
    setOutput("");
    setIsGenerating(true);
    setShowResult(false);

    try {
      // ✅ send a prompt to backend
      const prompt = `Write an engaging blog intro (120-180 words) on the topic: "${topic}".`;

      const text = await generateAI(prompt);

      setOutput(text);
      setShowResult(true);
    } catch (e: any) {
      setError(e?.message || "Failed to generate content");
      setShowResult(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Watch how BlogGalaxy AI transforms a simple topic into content.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Enter Your Topic
                </label>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Benefits of Remote Work"
                  />

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 transition-all duration-200"
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <p className="mt-3 text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>

              <AnimatePresence mode="wait">
                {isGenerating && (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ContentLoader theme="light" />
                  </motion.div>
                )}

                {showResult && !isGenerating && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {topic.trim()}
                      </h3>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {output}
                      </p>

                      {/* Optional fake badges (keep for UI) */}
                      <div className="flex flex-wrap items-center gap-3 text-sm mt-4">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                          Generated
                        </span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                          {Math.max(60, Math.min(1800, output.length))} chars
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {!isGenerating && !showResult && (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-gray-400 dark:text-gray-600"
                  >
                    Click "Generate" to see the magic happen ✨
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
