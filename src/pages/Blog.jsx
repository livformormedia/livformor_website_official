import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { getAllPosts } from '@/data/blogData';

export default function Blog() {
  const posts = getAllPosts();

  useEffect(() => {
    document.title = 'Blog - Mental Health Clinic Marketing Insights | LivForMor Media';

    const setMeta = (attr, key, val) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr === 'property' ? 'property' : 'name', key); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };

    setMeta('name', 'description', 'Expert insights on mental health clinic marketing, patient acquisition strategies, and growth tactics for TMS, Ketamine, Spravato, and Psychedelic therapy clinics.');
    setMeta('name', 'keywords', 'mental health marketing blog, TMS clinic marketing tips, ketamine clinic growth, clinic patient acquisition, healthcare marketing insights');
    setMeta('name', 'robots', 'index, follow');
    setMeta('property', 'og:title', 'Mental Health Clinic Marketing Blog | LivForMor Media');
    setMeta('property', 'og:description', 'Expert insights on mental health clinic marketing, patient acquisition strategies, and growth tactics.');
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl('Home')} className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Marketing Insights
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Mental Health Clinic Marketing Blog
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Proven strategies, expert insights, and actionable tactics to grow your practice
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">We're working on amazing content for you. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={createPageUrl(`BlogPost?slug=${post.slug}`)} className="block group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Hero gradient when no image */}
                    <div className="aspect-video overflow-hidden relative">
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <div className="text-center px-6">
                            <BookOpen className="w-10 h-10 text-white/40 mx-auto mb-3" />
                            <p className="text-white/60 text-xs font-medium uppercase tracking-widest">LivForMor Media</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(post.published_date)}
                        {post.reading_time && (
                          <span className="ml-4">{post.reading_time} min read</span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-teal-600 font-semibold group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}