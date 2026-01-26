import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header.tsx';
import { Footer } from '../components/Footer';

export const BlogPage = ({ theme }) => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  useEffect(() => {
    fetch(`${VITE_API_BASE_URL}/api/v1/blog/all`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setBlogs(data.blogs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // View 2: Detailed View
  if (selectedBlog) {
    return (
      <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setSelectedBlog(null)} className="mb-6 text-blue-500 font-medium hover:underline">
            ← Back to Explore
          </button>
          <img src={selectedBlog.coverImage} className="w-full h-96 object-cover rounded-2xl mb-8 shadow-lg" alt="cover" />
          <h1 className="text-4xl font-extrabold mb-4">{selectedBlog.title}</h1>
          <div className="flex gap-2 mb-6">
            {selectedBlog.tags?.map((t, i) => (
              <span key={i} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">#{t}</span>
            ))}
          </div>
          <p className="text-lg leading-relaxed whitespace-pre-wrap opacity-90">{selectedBlog.content}</p>
        </div>
      </div>
    );
  }

  // View 1: Grid View (3 per row)
  return (
    <>
    <Header />
    <br />
    <br />
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Insights & Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div 
              key={blog._id} 
              onClick={() => setSelectedBlog(blog)}
              className={`cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
            >
              <img src={blog.coverImage} className="w-full h-52 object-cover" alt="thumb" />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{blog.title}</h3>
                <p className="opacity-70 text-sm line-clamp-3 mb-4">{blog.content}</p>
                <span className="text-blue-500 text-sm font-semibold">Read Full Post →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
    
  );
};