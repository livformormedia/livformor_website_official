import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Clock, ArrowRight, Stethoscope, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { getPostBySlug, getAllPosts } from '@/data/blogData';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  const post = slug ? getPostBySlug(slug) : null;

  // Get other posts for "Read Next" section
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    document.title = `${post.title} | LivForMor Media`;

    const setMeta = (attr, key, val) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr === 'property' ? 'property' : 'name', key); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };

    setMeta('name', 'description', post.meta_description || post.excerpt);
    if (post.keywords?.length) setMeta('name', 'keywords', post.keywords.join(', '));
    setMeta('property', 'og:title', post.title);
    setMeta('property', 'og:description', post.meta_description || post.excerpt);
    setMeta('property', 'og:type', 'article');
    setMeta('name', 'twitter:card', 'summary_large_image');
    if (post.featured_image) setMeta('property', 'og:image', post.featured_image);

    // Article structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.meta_description || post.excerpt,
      author: { '@type': 'Person', name: post.author },
      datePublished: post.published_date,
      publisher: { '@type': 'Organization', name: 'LivForMor Media' },
      ...(post.featured_image ? { image: post.featured_image } : {})
    });
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch (e) { } };
  }, [post]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link to={createPageUrl('Blog')}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold hover:shadow-lg transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = post.reading_time || Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl('Blog')} className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/90 text-sm sm:text-base">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.published_date)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {readingTime} min read
              </div>
              {post.author && (
                <div>By {post.author}</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-teal-600 prose-strong:text-gray-900 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/50 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-4 prose-li:text-gray-700"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.article>

        {/* About the Author */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">About the Author</p>
          <p className="text-lg font-bold text-gray-900 mb-1">{post.author}</p>
          <p className="text-gray-600 text-sm">Founder of LivForMor Media — a growth marketing agency that works exclusively with ketamine, TMS, and Spravato clinics. We build conversion-optimized systems that turn inquiries into booked patients.</p>
        </motion.div>

        {/* ═══════ DUAL CTA SECTION ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            Ready to Stop Making These Mistakes?
          </h3>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            We build patient acquisition systems specifically for mental health clinics. Choose the path that fits your practice:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Cash-Pay CTA */}
            <Link to={createPageUrl('cash-offer')} className="group block">
              <div className="relative overflow-hidden rounded-2xl border-2 border-teal-200 hover:border-teal-400 bg-gradient-to-br from-teal-50 to-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-teal-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Cash-Pay Clinic?</h4>
                <p className="text-gray-600 text-sm mb-6">
                  TMS, Ketamine, or Spravato — we'll build a performance marketing system that fills your schedule with cash-pay patients.
                </p>
                <div className="flex items-center text-teal-600 font-semibold group-hover:gap-2 transition-all">
                  See Our Cash-Pay Offer
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Insurance-Based CTA */}
            <Link to={createPageUrl('services')} className="group block">
              <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Insurance-Based Clinic?</h4>
                <p className="text-gray-600 text-sm mb-6">
                  We help insurance-accepting clinics streamline patient acquisition and maximize revenue across all carrier panels.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  View Our Services
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Read Next */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 pt-12 border-t border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Read Next</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={createPageUrl(`BlogPost?slug=${rp.slug}`)} className="group block">
                  <div className="bg-gray-50 rounded-xl p-6 hover:bg-teal-50/50 transition-colors">
                    <p className="text-sm text-gray-500 mb-2">{formatDate(rp.published_date)}</p>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">{rp.title}</h4>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{rp.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <p className="mt-16 text-xs text-gray-400 text-center">
          This article was last reviewed in February 2026. Ketamine therapy marketing regulations vary by state.
          Always consult with a healthcare compliance attorney regarding advertising claims for ketamine and esketamine therapies.
        </p>
      </div>
    </div>
  );
}