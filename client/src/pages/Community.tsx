import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Award,
  Video,
  FileText,
  Calendar,
  Trophy,
  Star,
  ExternalLink
} from 'lucide-react';

const stats = [
  { label: 'Active Members', value: '15,000+', icon: Users },
  { label: 'Monthly Posts', value: '3,500+', icon: MessageCircle },
  { label: 'Weekly Discussions', value: '250+', icon: TrendingUp },
  { label: 'Expert Contributors', value: '120+', icon: Award },
];

const forumTopics = [
  {
    title: 'SEO Optimization Tips & Tricks',
    posts: 1245,
    replies: 8932,
    lastActive: '2 min ago',
    category: 'SEO',
    hot: true,
  },
  {
    title: 'AI Blogging Best Practices',
    posts: 987,
    replies: 6543,
    lastActive: '15 min ago',
    category: 'Tips',
    hot: true,
  },
  {
    title: 'Platform Updates & Announcements',
    posts: 452,
    replies: 3210,
    lastActive: '1 hour ago',
    category: 'Updates',
    hot: false,
  },
  {
    title: 'Content Strategy Discussion',
    posts: 876,
    replies: 5421,
    lastActive: '3 hours ago',
    category: 'Strategy',
    hot: false,
  },
  {
    title: 'Feature Requests & Feedback',
    posts: 654,
    replies: 4123,
    lastActive: '5 hours ago',
    category: 'Feedback',
    hot: false,
  },
];

const resources = [
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step guides and walkthroughs',
    count: '50+ videos',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Comprehensive guides and API docs',
    count: '100+ articles',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Calendar,
    title: 'Webinars',
    description: 'Live sessions with experts',
    count: 'Weekly events',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FileText,
    title: 'Templates',
    description: 'Ready-to-use content templates',
    count: '200+ templates',
    color: 'from-green-500 to-emerald-500',
  },
];

const topContributors = [
  { name: 'Sarah Chen', points: 12500, badge: 'Expert', posts: 450 },
  { name: 'Michael Rodriguez', points: 11200, badge: 'Pro', posts: 389 },
  { name: 'Emily Watson', points: 10800, badge: 'Expert', posts: 367 },
  { name: 'Alex Johnson', points: 9500, badge: 'Pro', posts: 325 },
  { name: 'Lisa Anderson', points: 8900, badge: 'Active', posts: 298 },
];

export function Community({ theme, toggleTheme, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />
      
      <div className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Join Our Creator Community
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Connect with fellow content creators, share insights, and grow together in the AI blogging ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                  Join Discord Community
                </button>
                <button className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                  Browse Forum
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <Icon className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Forum Preview */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Discussions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Join the conversation on trending topics
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Forum Topics */}
              <div className="lg:col-span-2 space-y-4">
                {forumTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                            {topic.title}
                          </h3>
                          {topic.hot && (
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Hot
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                            {topic.category}
                          </span>
                          <span>{topic.posts} posts</span>
                          <span>{topic.replies} replies</span>
                          <span className="text-xs">Last active: {topic.lastActive}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Top Contributors */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24">
                  <div className="flex items-center gap-2 mb-6">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Top Contributors
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {topContributors.map((contributor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-600' :
                            'bg-gradient-to-br from-blue-500 to-purple-600'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white truncate">
                              {contributor.name}
                            </span>
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full flex-shrink-0">
                              {contributor.badge}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>{contributor.points.toLocaleString()} points</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-gray-50 dark:bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Community Resources
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn, grow, and master AI blogging
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {resource.description}
                    </p>
                    <p className="text-xs font-semibold text-blue-500 dark:text-blue-400">
                      {resource.count}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Join Options */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ways to Connect
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choose how you want to engage with the community
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Discord Server',
                  description: 'Real-time chat with 15,000+ members. Get instant help and make friends.',
                  icon: MessageCircle,
                  cta: 'Join Discord',
                  color: 'from-indigo-500 to-purple-600',
                },
                {
                  title: 'Community Forum',
                  description: 'In-depth discussions, tutorials, and knowledge sharing hub.',
                  icon: Users,
                  cta: 'Browse Forum',
                  color: 'from-blue-500 to-cyan-600',
                },
                {
                  title: 'Live Events',
                  description: 'Weekly webinars, Q&A sessions, and exclusive workshops.',
                  icon: Calendar,
                  cta: 'View Calendar',
                  color: 'from-pink-500 to-red-600',
                },
              ].map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {option.description}
                    </p>
                    <button className={`w-full px-6 py-3 bg-gradient-to-r ${option.color} text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200`}>
                      {option.cta}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
