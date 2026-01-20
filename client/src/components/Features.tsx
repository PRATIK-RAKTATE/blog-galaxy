import { motion } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  Shield, 
  Zap, 
  Users, 
  Code 
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Article Generation',
    description: 'Generate comprehensive, SEO-optimized articles in seconds with GPT-4 powered AI.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Search,
    title: 'SEO Keyword Research',
    description: 'Discover high-ranking keywords and optimize your content for search engines automatically.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Plagiarism Checker',
    description: 'Ensure 100% original content with our advanced plagiarism detection system.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Bulk Content Generation',
    description: 'Create dozens of articles at once with our batch processing feature.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together with your team, assign roles, and manage content workflows.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Code,
    title: 'WordPress Integration',
    description: 'Publish directly to WordPress or export to any platform with one click.',
    color: 'from-teal-500 to-cyan-500',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Scale Content
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful features designed for content creators, marketers, and agencies.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-2xl transition-all duration-300"
                style={{
                  backgroundImage: 'linear-gradient(to bottom right, transparent, transparent)',
                }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
