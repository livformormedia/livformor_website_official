import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* ─── Brand Tokens ─── */
const C = {
  dark: '#0d3b40',
  teal: '#0f766e',
  tealLight: '#2dd4bf',
  gold: '#c5b896',
  white: '#ffffff',
  body: 'rgba(255,255,255,0.75)',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.1)',
  glassBg: 'rgba(255,255,255,0.06)',
};

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200..900;1,200..900&display=swap';

/* ─── Grade helpers ─── */
function gradeColor(grade) {
  const g = grade.trim().toUpperCase();
  if (g.startsWith('A') || g.startsWith('B')) return '#10b981';
  if (g.startsWith('C')) return '#f59e0b';
  return '#ef4444';
}

function isYouTubeUrl(href) {
  return /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch|embed|shorts)|youtu\.be\/)/.test(href);
}

/* ─── Stylesheet (injected once) ─── */
const STYLE_ID = 'bp-viewer-styles';

function injectGlobalStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
    @keyframes bp-spin { to { transform: rotate(360deg); } }
    @keyframes bp-fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

    .bp-root {
      min-height: 100vh;
      background: linear-gradient(170deg, #0d3b40 0%, #0a3a3f 40%, #0d3b40 100%);
      font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: ${C.white};
      padding: 2.5em 1em 4em;
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
    }
    .bp-root *, .bp-root *::before, .bp-root *::after { box-sizing: border-box; }

    .bp-container {
      max-width: 860px;
      margin: 0 auto;
      animation: bp-fadeIn 0.5s ease-out;
    }

    /* ── Links ── */
    .bp-container a {
      color: ${C.tealLight};
      text-decoration: none;
      transition: color 0.2s, text-decoration 0.2s;
    }
    .bp-container a:hover {
      color: ${C.gold};
      text-decoration: underline;
    }

    /* ── Lists ── */
    .bp-container ul, .bp-container ol {
      padding-left: 1.5em;
      margin: 0.75em 0;
    }
    .bp-container li {
      margin: 0.4em 0;
      line-height: 1.75;
      color: ${C.body};
    }
    .bp-container li::marker { color: ${C.tealLight}; }

    /* ── Images ── */
    .bp-container img {
      max-width: 100%;
      border-radius: 12px;
      margin: 1em 0;
    }

    /* ── Code ── */
    .bp-container pre {
      background: rgba(0,0,0,0.35);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 1.25em;
      overflow-x: auto;
      font-size: 0.88em;
      line-height: 1.6;
      margin: 1em 0;
    }
    .bp-container code {
      font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
      font-size: 0.9em;
    }
    .bp-container p code, .bp-container li code {
      background: rgba(255,255,255,0.08);
      padding: 0.15em 0.45em;
      border-radius: 5px;
    }

    /* ── YouTube CTA ── */
    .bp-yt-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
      background: linear-gradient(135deg, #CC0000, #FF0000);
      color: #fff !important;
      font-weight: 700;
      padding: 0.75em 1.6em;
      border-radius: 50px;
      text-decoration: none !important;
      margin: 0.75em 0;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 16px rgba(204,0,0,0.35);
    }
    .bp-yt-btn:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 6px 24px rgba(204,0,0,0.5);
      color: #fff !important;
      text-decoration: none !important;
    }

    /* ── Table row alternation ── */
    .bp-container tbody tr:nth-child(even) td { background: rgba(255,255,255,0.04); }
    .bp-container tbody tr:nth-child(odd) td { background: rgba(255,255,255,0.02); }
    .bp-container tbody tr:hover td { background: rgba(255,255,255,0.07); }

    /* ── Grade card hover ── */
    .bp-container .bp-grade-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    }
  `;
  document.head.appendChild(el);
}

function loadFont() {
  if (document.getElementById('bp-font-link')) return;
  const link = document.createElement('link');
  link.id = 'bp-font-link';
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

/* ─── Custom renderers for react-markdown ─── */

const HEADING_STYLES = {
  1: { fontSize: '2.2em', fontWeight: 900, color: C.white, margin: '1.5em 0 0.6em' },
  2: { fontSize: '1.7em', fontWeight: 700, color: C.white, margin: '1.3em 0 0.5em' },
  3: { fontSize: '1.3em', fontWeight: 700, color: C.tealLight, margin: '1.1em 0 0.4em' },
  4: { fontSize: '1.1em', fontWeight: 700, color: C.gold, margin: '1em 0 0.35em' },
  5: { fontSize: '1em', fontWeight: 600, color: C.gold, margin: '0.8em 0 0.3em' },
  6: { fontSize: '0.9em', fontWeight: 600, color: 'rgba(255,255,255,0.7)', margin: '0.7em 0 0.25em' },
};

/* Extract plain text from react-markdown children for pattern matching */
function extractText(children) {
  if (typeof children === 'string') return children;
  if (!Array.isArray(children)) return String(children ?? '');
  return children.map(c => (typeof c === 'string' ? c : c?.props?.children ? extractText(c.props.children) : '')).join('');
}

/* Render a grade badge card */
function GradeCard({ category, grade }) {
  const color = gradeColor(grade);
  return (
    <div className="bp-grade-card" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75em',
      background: C.glassBg,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: `1px solid ${C.cardBorder}`,
      borderRadius: '14px',
      padding: '0.9em 1.3em',
      margin: '0.4em 0.5em 0.4em 0',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
    }}>
      <span style={{
        fontFamily: "'Nunito Sans', sans-serif",
        fontWeight: 800,
        fontSize: '1.35em',
        minWidth: '2.2em',
        textAlign: 'center',
        padding: '0.15em 0.4em',
        borderRadius: '8px',
        color: '#fff',
        lineHeight: 1.2,
        background: color,
      }}>
        {grade}
      </span>
      <span style={{
        fontWeight: 600,
        color: 'rgba(255,255,255,0.85)',
        fontSize: '0.95em',
      }}>
        {category}
      </span>
    </div>
  );
}

/* Factory: creates a heading renderer for a specific level */
function makeHeading(level) {
  const Tag = `h${level}`;
  const s = HEADING_STYLES[level];

  return function HeadingComponent({ children }) {
    // Detect grade pattern on h3: "Category: Grade"
    if (level === 3) {
      const text = extractText(children);
      const m = text.match(/^(.+?):\s+([A-Fa-f][+-]?)$/);
      if (m) {
        return <GradeCard category={m[1].trim()} grade={m[2].trim()} />;
      }
    }

    return (
      <Tag style={{ ...s, lineHeight: 1.3, letterSpacing: level <= 2 ? '-0.02em' : undefined }}>
        {children}
      </Tag>
    );
  };
}

function ParagraphRenderer({ children }) {
  return (
    <p style={{ color: C.body, lineHeight: 1.8, margin: '0.6em 0' }}>
      {children}
    </p>
  );
}

function BlockquoteRenderer({ children }) {
  return (
    <blockquote style={{
      background: C.glassBg,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderLeft: `4px solid ${C.teal}`,
      borderRadius: '0 12px 12px 0',
      padding: '1em 1.4em',
      margin: '1.25em 0',
      color: C.body,
      fontStyle: 'italic',
    }}>
      {children}
    </blockquote>
  );
}

function HrRenderer() {
  return (
    <hr style={{
      border: 'none',
      height: '2px',
      background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
      margin: '2.5em 0',
    }} />
  );
}

function TableRenderer({ children }) {
  return (
    <div style={{
      overflowX: 'auto',
      margin: '1.25em 0',
      borderRadius: '12px',
      border: `1px solid ${C.cardBorder}`,
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92em' }}>
        {children}
      </table>
    </div>
  );
}

function TheadRenderer({ children }) {
  return <thead>{children}</thead>;
}

function TbodyRenderer({ children }) {
  return <tbody>{children}</tbody>;
}

function TrRenderer({ children }) {
  return <tr>{children}</tr>;
}

function ThRenderer({ children, style }) {
  return (
    <th style={{
      background: 'rgba(197,184,150,0.15)',
      color: C.gold,
      fontWeight: 700,
      textAlign: style?.textAlign || 'left',
      padding: '0.85em 1.1em',
      borderBottom: '2px solid rgba(197,184,150,0.25)',
    }}>
      {children}
    </th>
  );
}

function TdRenderer({ children, style }) {
  return (
    <td style={{
      padding: '0.75em 1.1em',
      color: C.body,
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      background: 'rgba(255,255,255,0.02)',
      textAlign: style?.textAlign || 'left',
    }}>
      {children}
    </td>
  );
}

function LinkRenderer({ href, children }) {
  if (href && isYouTubeUrl(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bp-yt-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
        </svg>
        {children || 'Watch on YouTube'}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function StrongRenderer({ children }) {
  return (
    <strong style={{ color: '#fff', fontWeight: 700 }}>
      {children}
    </strong>
  );
}

/* ─── Detect standalone YouTube URLs in text nodes ─── */
function TextRenderer({ children }) {
  if (typeof children !== 'string') return children;

  const ytRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)[^\s]+)/g;
  const parts = children.split(ytRegex);

  if (parts.length === 1) return children;

  return (
    <>
      {parts.map((part, i) => {
        if (ytRegex.lastIndex = 0, ytRegex.test(part)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="bp-yt-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
              </svg>
              Watch on YouTube
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

/* ─── Build component map ─── */
const markdownComponents = {
  h1: makeHeading(1),
  h2: makeHeading(2),
  h3: makeHeading(3),
  h4: makeHeading(4),
  h5: makeHeading(5),
  h6: makeHeading(6),
  p: ParagraphRenderer,
  blockquote: BlockquoteRenderer,
  hr: HrRenderer,
  table: TableRenderer,
  thead: TheadRenderer,
  tbody: TbodyRenderer,
  tr: TrRenderer,
  th: ThRenderer,
  td: TdRenderer,
  a: LinkRenderer,
  strong: StrongRenderer,
  text: TextRenderer,
};

/* ─── Main Component ─── */
export default function BlueprintViewer() {
  const [searchParams] = useSearchParams();
  const file = searchParams.get('file');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFont();
    injectGlobalStyles();
    return () => {
      const el = document.getElementById(STYLE_ID);
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    if (!file) {
      setError('No blueprint file specified. Add ?file=filename.md to the URL.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const urlData = supabase.storage.from('blueprints').getPublicUrl(file);
        if (!urlData.data?.publicUrl) {
          throw new Error('Could not generate public URL for this blueprint.');
        }

        const response = await fetch(urlData.data.publicUrl);
        if (!response.ok) {
          throw new Error(`Failed to load blueprint (${response.status}).`);
        }

        const text = await response.text();
        if (!cancelled) setContent(text);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load blueprint.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [file]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="bp-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            border: '3px solid rgba(255,255,255,0.08)',
            borderTopColor: C.gold,
            borderRadius: '50%',
            animation: 'bp-spin 0.8s linear infinite',
            margin: '0 auto 1.5em',
          }} />
          <p style={{
            color: C.body,
            fontSize: '1.05em',
            fontFamily: "'Nunito Sans', sans-serif",
            letterSpacing: '0.02em',
          }}>
            Loading blueprint...
          </p>
        </div>
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <div className="bp-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '20px',
          padding: '2.5em 3em',
          maxWidth: 480,
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(239,68,68,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1em',
            fontSize: '1.5em',
            color: '#ef4444',
          }}>
            !
          </div>
          <h2 style={{
            color: '#ef4444',
            fontSize: '1.2em',
            margin: '0 0 0.5em',
            fontFamily: "'Nunito Sans', sans-serif",
            fontWeight: 700,
          }}>
            Unable to Load Blueprint
          </h2>
          <p style={{
            color: C.body,
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "'Nunito Sans', sans-serif",
          }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  /* ── Rendered blueprint ── */
  return (
    <div className="bp-root">
      <div className="bp-container">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {content || ''}
        </ReactMarkdown>
      </div>
    </div>
  );
}
