import { useState } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { 
  Search, 
  TrendingUp, 
  Clock, 
  Eye, 
  Bookmark,
  Filter,
  ChevronDown,
  Sparkles
} from 'lucide-react';

const categories = ['All', 'Technology', 'Marketing', 'Finance', 'Health', 'Startups'];
const sortOptions = ['Latest', 'Trending', 'Most Read'];

const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI in Content Marketing: Trends for 2026',
    description: 'Discover how artificial intelligence is revolutionizing content marketing and what trends to watch in the coming year.',
    image: 'https://images.unsplash.com/photo-1620287341260-a9ecadfe7a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    category: 'Technology',
    readTime: '8 min read',
    views: '12.5K',
    author: 'Ganesh gaikwad',
    authorBadge: 'Pro',
    seoScore: 92,
    wordCount: 2150,
  },
  {
    id: 2,
    title: 'SEO Best Practices: How to Rank Higher in 2026',
    description: 'Learn the latest SEO strategies and techniques to improve your search engine rankings and drive more organic traffic.',
    image: 'https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    category: 'Marketing',
    readTime: '12 min read',
    views: '18.2K',
    author: 'Sahane shubham',
    authorBadge: 'Expert',
    seoScore: 95,
    wordCount: 3200,
  },
  {
    id: 3,
    title: 'Building a Successful Startup: Lessons from Y Combinator',
    description: 'Key insights and lessons learned from top Y Combinator startups that achieved product-market fit.',
    image: 'https://images.unsplash.com/photo-1634326080825-985cfc816db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    category: 'Startups',
    readTime: '10 min read',
    views: '9.8K',
    author: 'Patil om',
    authorBadge: 'Verified',
    seoScore: 88,
    wordCount: 2800,
  },
  {
    id: 4,
    title: 'Personal Finance 101: Investment Strategies for Beginners',
    description: 'A comprehensive guide to getting started with investing, from stocks to index funds and beyond.',
    image: 'https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    category: 'Finance',
    readTime: '15 min read',
    views: '22.1K',
    author: 'Ganesh wakchaure',
    authorBadge: 'Pro',
    seoScore: 91,
    wordCount: 4100,
  },
  {
    id: 5,
    title: 'Mental Health in the Digital Age: Finding Balance',
    description: 'Exploring the impact of technology on mental health and practical tips for maintaining wellbeing.',
    image: 'https://images.unsplash.com/photo-1758874385949-cec80d549f67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    category: 'Health',
    readTime: '7 min read',
    views: '15.7K',
    author: 'Dr. Prabhat Shelake',
    authorBadge: 'Expert',
    seoScore: 89,
    wordCount: 1900,
  },
  {
    id: 6,
    title: 'Remote Work Revolution: Tools and Tips for Productivity',
    description: 'Master the art of remote work with these proven tools and productivity strategies.',
    image: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    category: 'Technology',
    readTime: '9 min read',
    views: '13.4K',
    author: 'Lisa Anderson',
    authorBadge: 'Pro',
    seoScore: 93,
    wordCount: 2600,
  },
];

export function ExploreBlogs({ theme, toggleTheme, setCurrentPage }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [wordCountRange, setWordCountRange] = useState([0, 5000]);
  const [minSeoScore, setMinSeoScore] = useState(0);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWordCount = post.wordCount >= wordCountRange[0] && post.wordCount <= wordCountRange[1];
    const matchesSeoScore = post.seoScore >= minSeoScore;
    return matchesCategory && matchesSearch && matchesWordCount && matchesSeoScore;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Explore AI-Generated Blogs
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover trending content created by our community
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs by title or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>

          {/* Category Tabs & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      Sort by: {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Sidebar Filters (when toggled) */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Advanced Filters</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Word Count Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Word Count Range
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={wordCountRange[1]}
                    onChange={(e) => setWordCountRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0</span>
                    <span>{wordCountRange[1]} words</span>
                  </div>
                </div>

                {/* SEO Score Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Minimum SEO Score
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minSeoScore}
                    onChange={(e) => setMinSeoScore(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0</span>
                    <span>{minSeoScore}</span>
                  </div>
                </div>

                {/* Reset Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setWordCountRange([0, 5000]);
                      setMinSeoScore(0);
                    }}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-semibold text-gray-900 dark:text-white rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="w-8 h-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Bookmark className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>

                  {/* Author & SEO Score */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">
                          {post.author}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{post.authorBadge}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        SEO {post.seoScore}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
              Load More Articles
            </button>
          </div>
        </div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
