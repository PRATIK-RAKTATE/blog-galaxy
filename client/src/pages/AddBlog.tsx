import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const AddBlog = ({ theme }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    content: '',
    coverimage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${VITE_API_BASE_URL}/api/v1/blog/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Blog published successfully!');
        // Redirect to the blogs list after 2 seconds
        setTimeout(() => navigate('/blogs'), 2000);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Failed to connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full p-3 rounded-lg border outline-none transition-all ${
    theme === 'dark' 
    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
  }`;

  return (
    <>
      <Header theme={theme} />
      <br />
      <br />
      <div className={`min-h-screen py-12 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Create New Post
        </h2>

        {message && (
          <div className={`p-4 mb-6 rounded-lg text-sm font-medium ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Blog Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a catchy title..."
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Tag (Optional)</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="e.g. Technology"
                className={inputClass}
              />
            </div>
            <div>
              <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Cover Image URL</label>
              <input
                type="text"
                name="coverimage"
                value={formData.coverimage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Content</label>
            <textarea
              name="content"
              required
              rows={8}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-bold text-black bg-gradient-to-r from-blue-500 to-purple-600 transition-all transform hover:scale-[1.01] active:scale-[0.99] ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};