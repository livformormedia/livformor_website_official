import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Clock, ArrowRight, Stethoscope, Shield, List, ChevronRight, ChevronDown, Lightbulb, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { getPostBySlug, getAllPosts } from '@/data/blogData';
import ReactMarkdown from 'react-markdown';

/* ═══════ TABLE OF CONTENTS EXTRACTOR ═══════ */
function extractTOC(markdown) {
  const headings = [];
  const lines = markdown.split('\n');
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const raw = match[2].replace(/\*\*/g, '').replace(/[`*_~]/g, '').trim();
      const text = raw;
      const id = raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ level, text, id });
    }
  }
  return headings;
}

/* ═══════ READING PROGRESS BAR ═══════ */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-100">
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #0d9488, #2563eb)'
        }}
      />
    </div>
  );
}

/* ═══════ SIDEBAR TOC ═══════ */
function TableOfContents({ headings, activeId }) {
  if (!headings.length) return null;

  return (
    <nav className="space-y-1">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
        <List className="w-3.5 h-3.5" />
        In This Article
      </p>
      {headings.filter(h => h.level === 2).map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 hover:text-teal-600 ${activeId === h.id
            ? 'border-teal-500 text-teal-600 font-semibold bg-teal-50/50'
            : 'border-gray-200 text-gray-500'
            }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

/* ═══════ CUSTOM MARKDOWN COMPONENTS ═══════ */
const mdComponents = {
  h2: ({ children, ...props }) => {
    const text = typeof children === 'string' ? children :
      Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : c?.props?.children || '').join('') : '';
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return (
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-gray-900 mt-14 mb-5 pb-3 border-b-2 border-teal-100 scroll-mt-20"
        {...props}
      >
        <span className="relative">
          {children}
        </span>
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const text = typeof children === 'string' ? children : '';
    const isKeyTakeaways = text === 'Key Takeaways';
    if (isKeyTakeaways) {
      return (
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-10 mb-4 flex items-center gap-2" {...props}>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100">
            <Lightbulb className="w-4 h-4 text-teal-600" />
          </span>
          {children}
        </h3>
      );
    }
    return (
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 mb-4" {...props}>
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }) => (
    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5" {...props}>
      {children}
    </p>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-600" {...props}>
      {children}
    </em>
  ),
  blockquote: ({ children, ...props }) => (
    <div className="my-8 bg-gradient-to-r from-teal-50 to-emerald-50 border-l-4 border-teal-500 rounded-r-xl p-5 sm:p-6 shadow-sm" {...props}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center mt-0.5">
          <Lightbulb className="w-4 h-4 text-teal-600" />
        </div>
        <div className="flex-1 text-gray-700 text-sm sm:text-base [&>p]:mb-0 [&>p]:text-gray-700">
          {children}
        </div>
      </div>
    </div>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-5 space-y-2.5 pl-0" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-5 space-y-3 pl-0 counter-reset-list" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ordered, ...props }) => (
    <li className="flex items-start gap-3 text-gray-700 text-base sm:text-lg leading-relaxed" {...props}>
      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5" />
      <span className="flex-1">{children}</span>
    </li>
  ),
  hr: () => (
    <div className="my-10 flex items-center justify-center gap-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-teal-600 font-medium underline decoration-teal-300 underline-offset-2 hover:decoration-teal-500 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    <figure className="my-8 sm:my-10">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-auto rounded-xl shadow-lg border border-gray-100"
        {...props}
      />
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
};

/* ═══════ FAQ ACCORDION ═══════ */
function FAQSection({ faq }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faq?.length) return null;

  return (
    <div className="mt-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-teal-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-3">
        {faq.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden hover:border-teal-200 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180 text-teal-500' : ''
                  }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 sm:px-6 pb-5 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-4">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  const post = slug ? getPostBySlug(slug) : null;
  const [activeHeading, setActiveHeading] = useState('');

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);

  const toc = useMemo(() => post ? extractTOC(post.content) : [], [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /* Intersection Observer for active heading tracking */
  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );
    // Small delay to let markdown render
    const timer = setTimeout(() => {
      toc.filter(h => h.level === 2).forEach(h => {
        const el = document.getElementById(h.id);
        if (el) observer.observe(el);
      });
    }, 300);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [toc]);

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

    // Article JSON-LD
    const articleScript = document.createElement('script');
    articleScript.type = 'application/ld+json';
    articleScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.meta_description || post.excerpt,
      author: { '@type': 'Person', name: post.author },
      datePublished: post.published_date,
      publisher: { '@type': 'Organization', name: 'LivForMor Media' },
      ...(post.featured_image ? { image: post.featured_image } : {})
    });
    document.head.appendChild(articleScript);

    // FAQPage JSON-LD
    let faqScript;
    if (post.faq?.length) {
      faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map(q => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer
          }
        }))
      });
      document.head.appendChild(faqScript);
    }

    return () => {
      try { document.head.removeChild(articleScript); } catch (e) { }
      try { if (faqScript) document.head.removeChild(faqScript); } catch (e) { }
    };
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
      <ReadingProgress />

      {/* ═══════ HERO ═══════ */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link to={createPageUrl('Blog')} className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Category badge */}
          <div className="mb-5">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Marketing Strategy
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-3xl leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  {post.author?.charAt(0) || 'O'}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{post.author}</p>
                  <p className="text-gray-500 text-xs">Founder, LivForMor Media</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.published_date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════ FEATURED IMAGE ═══════ */}
      {post.featured_image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img src={post.featured_image} alt={post.title} className="w-full h-auto" />
          </motion.div>
        </div>
      )}

      {/* ═══════ MOBILE TOC ═══════ */}
      {toc.length > 0 && (
        <div className="lg:hidden max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <details className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
              <span className="flex items-center gap-2">
                <List className="w-4 h-4 text-teal-600" />
                Table of Contents
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-5 pb-4 space-y-1">
              {toc.filter(h => h.level === 2).map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="block text-sm py-1.5 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-teal-400" />
                    {h.text}
                  </span>
                </a>
              ))}
            </div>
          </details>
        </div>
      )}

      {/* ═══════ CONTENT + SIDEBAR LAYOUT ═══════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex gap-12">
          {/* Main content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 max-w-4xl"
          >
            <ReactMarkdown components={mdComponents}>{post.content}</ReactMarkdown>

            {/* ═══════ FAQ SECTION ═══════ */}
            <FAQSection faq={post.faq} />

            {/* ═══════ AUTHOR BIO ═══════ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-14 p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {post.author?.charAt(0) || 'O'}
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-1">About the Author</p>
                  <p className="text-xl font-bold text-gray-900 mb-2">{post.author}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Founder of LivForMor Media — a growth marketing agency that works exclusively with ketamine, TMS, and Spravato clinics. We build conversion-optimized systems that turn inquiries into booked patients.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ═══════ DUAL CTA ═══════ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready to Stop Making These Mistakes?
              </h3>
              <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                We build patient acquisition systems specifically for mental health clinics. Choose the path that fits your practice:
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                <Link to={createPageUrl('cash-offer')} className="group block">
                  <div className="rounded-2xl border border-teal-500/30 hover:border-teal-400 bg-teal-500/10 hover:bg-teal-500/20 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4 mx-auto">
                      <Stethoscope className="w-6 h-6 text-teal-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Cash-Pay Clinic?</h4>
                    <p className="text-gray-400 text-sm mb-5">
                      TMS, Ketamine, or Spravato — we'll build a performance marketing system that fills your schedule.
                    </p>
                    <span className="inline-flex items-center text-teal-400 font-semibold text-sm group-hover:gap-2 transition-all">
                      See Our Cash-Pay Offer
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>

                <Link to={createPageUrl('services')} className="group block">
                  <div className="rounded-2xl border border-blue-500/30 hover:border-blue-400 bg-blue-500/10 hover:bg-blue-500/20 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 mx-auto">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Insurance-Based Clinic?</h4>
                    <p className="text-gray-400 text-sm mb-5">
                      We help insurance-accepting clinics streamline patient acquisition and maximize revenue.
                    </p>
                    <span className="inline-flex items-center text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
                      View Our Services
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* ═══════ READ NEXT ═══════ */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16 pt-12 border-t border-gray-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Read Next</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {relatedPosts.map(rp => (
                    <Link key={rp.id} to={createPageUrl(`BlogPost?slug=${rp.slug}`)} className="group block">
                      <div className="bg-gray-50 rounded-xl p-6 hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                        <p className="text-xs text-gray-500 mb-2 font-medium">{formatDate(rp.published_date)} · {rp.reading_time || '8'} min read</p>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">{rp.title}</h4>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{rp.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══════ DISCLAIMER ═══════ */}
            <p className="mt-16 text-xs text-gray-400 text-center">
              This article was last reviewed in February 2026. Ketamine therapy marketing regulations vary by state.
              Always consult with a healthcare compliance attorney regarding advertising claims for ketamine and esketamine therapies.
            </p>
          </motion.article>

          {/* ═══════ DESKTOP SIDEBAR TOC ═══════ */}
          {toc.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-20">
                <TableOfContents headings={toc} activeId={activeHeading} />

                {/* Sidebar CTA */}
                <div className="mt-8 p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl">
                  <p className="text-white font-bold text-sm mb-2">Need help with your clinic's marketing?</p>
                  <p className="text-gray-400 text-xs mb-4">Schedule a free growth audit.</p>
                  <Link
                    to={createPageUrl('cash-offer')}
                    className="block w-full text-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    Free Growth Audit →
                  </Link>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}