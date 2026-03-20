import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* ─── Brand Tokens ─── */
const B = {
  dark: '#0d3b40',
  teal: '#0f766e',
  gold: '#c5b896',
  white: '#ffffff',
  body: 'rgba(255,255,255,0.9)',
};

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200..900;1,200..900&display=swap';

/* ─── Injected stylesheet ─── */
const STYLE_ID = 'db-viewer-styles';

const STYLES = `
  @keyframes db-spin { to { transform: rotate(360deg); } }
  @keyframes db-fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .db-viewer {
    min-height: 100vh;
    background: linear-gradient(170deg, ${B.dark} 0%, #0a3a3f 40%, ${B.dark} 100%);
    color: ${B.white};
    font-family: 'Nunito Sans', sans-serif;
    padding: 40px 24px 80px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  .db-viewer *, .db-viewer *::before, .db-viewer *::after { box-sizing: border-box; }

  .db-container {
    max-width: 960px;
    margin: 0 auto;
    animation: db-fadeIn 0.5s ease-out;
  }

  /* Links */
  .db-container a {
    color: ${B.gold};
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s;
  }
  .db-container a:hover { color: #ddd1b4; }

  /* Lists */
  .db-container ul, .db-container ol {
    margin: 0 0 20px;
    padding-left: 24px;
    color: ${B.body};
  }
  .db-container li { margin-bottom: 6px; }
  .db-container li::marker { color: ${B.gold}; }

  /* Images */
  .db-container img {
    max-width: 100%;
    border-radius: 10px;
    margin: 20px 0;
  }

  /* Code */
  .db-container pre {
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(197,184,150,0.2);
    border-radius: 8px;
    padding: 16px 20px;
    overflow-x: auto;
    margin: 20px 0;
    font-size: 0.88rem;
    line-height: 1.6;
  }
  .db-container code {
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 0.9em;
  }
  .db-container p code, .db-container li code {
    background: rgba(0,0,0,0.3);
    padding: 2px 6px;
    border-radius: 4px;
  }

  /* Loading / Error */
  .db-center {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: ${B.dark};
    font-family: 'Nunito Sans', sans-serif;
  }
  .db-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255,255,255,0.15);
    border-top-color: ${B.gold};
    border-radius: 50%;
    animation: db-spin 0.8s linear infinite;
  }
`;

/* ─── Custom renderers ─── */
const dbComponents = {
  h1: ({ children }) => (
    <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '48px 0 16px', color: B.gold }}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ fontSize: '1.9rem', fontWeight: 700, margin: '40px 0 14px', color: B.gold }}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '32px 0 12px', color: B.white }}>{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '28px 0 10px', color: B.white }}>{children}</h4>
  ),
  h5: ({ children }) => (
    <h5 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '24px 0 8px', color: 'rgba(255,255,255,0.85)' }}>{children}</h5>
  ),
  h6: ({ children }) => (
    <h6 style={{ fontSize: '1rem', fontWeight: 600, margin: '20px 0 8px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</h6>
  ),
  p: ({ children }) => (
    <p style={{ margin: '0 0 16px', color: B.body }}>{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{
      margin: '24px 0',
      padding: '20px 24px',
      borderLeft: `4px solid ${B.teal}`,
      background: 'rgba(15, 118, 110, 0.12)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '0 12px 12px 0',
      color: 'rgba(255,255,255,0.92)',
      fontStyle: 'italic',
    }}>
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr style={{
      border: 'none',
      height: '2px',
      margin: '36px 0',
      background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)`,
    }} />
  ),
  table: ({ children }) => (
    <div style={{ overflowX: 'auto', margin: '24px 0', borderRadius: '10px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>{children}</table>
    </div>
  ),
  th: ({ children, style }) => (
    <th style={{
      background: B.gold,
      color: B.dark,
      fontWeight: 700,
      padding: '12px 16px',
      textAlign: style?.textAlign || 'left',
      fontSize: '0.95rem',
    }}>
      {children}
    </th>
  ),
  td: ({ children, style }) => (
    <td style={{
      padding: '10px 16px',
      fontSize: '0.93rem',
      background: 'rgba(13, 59, 64, 0.45)',
      textAlign: style?.textAlign || 'left',
    }}>
      {children}
    </td>
  ),
  strong: ({ children }) => (
    <strong style={{ color: B.white, fontWeight: 700 }}>{children}</strong>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

/* ─── Component ─── */
export default function DashboardViewer() {
  const [content, setContent] = useState('');
  const [isHtml, setIsHtml] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Font
    if (!document.querySelector(`link[href="${FONT_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = FONT_URL;
      document.head.appendChild(link);
    }
    // Styles
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = STYLES;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById(STYLE_ID);
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const file = params.get('file');

    if (!file) {
      setError('No file specified. Add ?file=your-dashboard.md to the URL.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const { data } = supabase.storage.from('dashboards').getPublicUrl(file);
        if (!data?.publicUrl) {
          throw new Error('Could not generate public URL for this file.');
        }

        const res = await fetch(data.publicUrl);
        if (!res.ok) throw new Error(`Failed to fetch file (${res.status}).`);

        const text = await res.text();
        const htmlContent = /^\s*(<|<!doctype)/i.test(text);

        if (!cancelled) {
          setIsHtml(htmlContent);
          setContent(text);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load dashboard.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="db-center">
        <div className="db-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="db-center">
        <div style={{ color: '#f87171', fontSize: '1.1rem', textAlign: 'center', padding: '20px' }}>
          {error}
        </div>
      </div>
    );
  }

  // If the file is raw HTML, render as-is (legacy support)
  if (isHtml) {
    return (
      <div className="db-viewer">
        <div className="db-container" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  // Markdown content via react-markdown
  return (
    <div className="db-viewer">
      <div className="db-container">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={dbComponents}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
