import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const BRAND = {
  dark: '#0d3b40',
  teal: '#0f766e',
  gold: '#c5b896',
};

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';

/* ---------- Regex-based Markdown to HTML ---------- */
function markdownToHtml(md) {
  let html = md;

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="db-code-block"><code>${code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="db-inline-code">$1</code>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" class="db-image" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="db-link">$1</a>');

  // Headings (process from h6 to h1 to avoid collisions)
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="db-h6">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="db-h5">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="db-h4">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="db-h3">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="db-h2">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="db-h1">$1</h1>');

  // Horizontal rules
  html = html.replace(/^(?:---|\*\*\*|___)\s*$/gm, '<hr class="db-hr" />');

  // Blockquotes
  html = html.replace(/^(?:>\s?.+\n?)+/gm, (match) => {
    const inner = match.replace(/^>\s?/gm, '').trim();
    return `<blockquote class="db-blockquote">${inner}</blockquote>`;
  });

  // Tables
  html = html.replace(/^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)+)/gm, (_, headerRow, _sep, bodyRows) => {
    const headers = headerRow.split('|').filter(c => c.trim()).map(c => c.trim());
    const rows = bodyRows.trim().split('\n').map(row =>
      row.split('|').filter(c => c.trim()).map(c => c.trim())
    );
    const ths = headers.map(h => `<th class="db-th">${h}</th>`).join('');
    const trs = rows.map((cols, i) => {
      const tds = cols.map(c => `<td class="db-td">${c}</td>`).join('');
      return `<tr class="db-tr ${i % 2 === 0 ? 'db-tr-even' : 'db-tr-odd'}">${tds}</tr>`;
    }).join('');
    return `<div class="db-table-wrap"><table class="db-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
  });

  // Unordered lists
  html = html.replace(/^(?:\s*[-*+]\s+.+\n?)+/gm, (match) => {
    const items = match.trim().split('\n').map(l => {
      const text = l.replace(/^\s*[-*+]\s+/, '');
      return `<li class="db-li">${text}</li>`;
    }).join('');
    return `<ul class="db-ul">${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/^(?:\s*\d+\.\s+.+\n?)+/gm, (match) => {
    const items = match.trim().split('\n').map(l => {
      const text = l.replace(/^\s*\d+\.\s+/, '');
      return `<li class="db-li">${text}</li>`;
    }).join('');
    return `<ol class="db-ol">${items}</ol>`;
  });

  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Paragraphs - wrap remaining bare lines
  html = html.replace(/^(?!<[a-z/])(.*\S.*)$/gm, '<p class="db-p">$1</p>');

  return html;
}

/* ---------- Injected stylesheet ---------- */
const STYLES = `
  .db-viewer {
    min-height: 100vh;
    background: linear-gradient(170deg, ${BRAND.dark} 0%, #0a3a3f 40%, ${BRAND.dark} 100%);
    color: #ffffff;
    font-family: 'Nunito Sans', sans-serif;
    padding: 40px 24px 80px;
    line-height: 1.7;
  }
  .db-viewer * { box-sizing: border-box; }
  .db-container {
    max-width: 960px;
    margin: 0 auto;
  }

  /* Headings */
  .db-h1 { font-size: 2.4rem; font-weight: 800; margin: 48px 0 16px; color: ${BRAND.gold}; }
  .db-h2 { font-size: 1.9rem; font-weight: 700; margin: 40px 0 14px; color: ${BRAND.gold}; }
  .db-h3 { font-size: 1.5rem; font-weight: 700; margin: 32px 0 12px; color: #ffffff; }
  .db-h4 { font-size: 1.25rem; font-weight: 600; margin: 28px 0 10px; color: #ffffff; }
  .db-h5 { font-size: 1.1rem; font-weight: 600; margin: 24px 0 8px; color: rgba(255,255,255,0.85); }
  .db-h6 { font-size: 1rem; font-weight: 600; margin: 20px 0 8px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.5px; }

  /* Paragraph & text */
  .db-p { margin: 0 0 16px; color: rgba(255,255,255,0.9); }
  .db-link { color: ${BRAND.gold}; text-decoration: underline; text-underline-offset: 3px; }
  .db-link:hover { color: #ddd1b4; }

  /* Lists */
  .db-ul, .db-ol { margin: 0 0 20px; padding-left: 24px; color: rgba(255,255,255,0.9); }
  .db-li { margin-bottom: 6px; }

  /* Blockquote - glassmorphism callout */
  .db-blockquote {
    margin: 24px 0;
    padding: 20px 24px;
    border-left: 4px solid ${BRAND.teal};
    background: rgba(15, 118, 110, 0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 0 12px 12px 0;
    color: rgba(255,255,255,0.92);
    font-style: italic;
  }

  /* Horizontal rule - gold gradient */
  .db-hr {
    border: none;
    height: 2px;
    margin: 36px 0;
    background: linear-gradient(90deg, transparent, ${BRAND.gold}, transparent);
  }

  /* Tables */
  .db-table-wrap { overflow-x: auto; margin: 24px 0; border-radius: 10px; }
  .db-table { width: 100%; border-collapse: collapse; }
  .db-th {
    background: ${BRAND.gold};
    color: ${BRAND.dark};
    font-weight: 700;
    padding: 12px 16px;
    text-align: left;
    font-size: 0.95rem;
  }
  .db-td { padding: 10px 16px; font-size: 0.93rem; }
  .db-tr-even { background: rgba(13, 59, 64, 0.55); }
  .db-tr-odd { background: rgba(13, 59, 64, 0.35); }

  /* Code */
  .db-code-block {
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(197,184,150,0.2);
    border-radius: 8px;
    padding: 16px 20px;
    overflow-x: auto;
    margin: 20px 0;
    font-size: 0.88rem;
    line-height: 1.6;
  }
  .db-inline-code {
    background: rgba(0,0,0,0.3);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
  }

  /* Images */
  .db-image { max-width: 100%; border-radius: 10px; margin: 20px 0; }

  /* Loading / Error */
  .db-center {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: ${BRAND.dark};
    font-family: 'Nunito Sans', sans-serif;
  }
  .db-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255,255,255,0.15);
    border-top-color: ${BRAND.gold};
    border-radius: 50%;
    animation: db-spin 0.8s linear infinite;
  }
  @keyframes db-spin { to { transform: rotate(360deg); } }
  .db-error {
    color: #f87171;
    font-size: 1.1rem;
    text-align: center;
    padding: 20px;
  }
`;

/* ---------- Component ---------- */
export default function DashboardViewer() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inject font & styles
  useEffect(() => {
    // Font
    if (!document.querySelector(`link[href="${FONT_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = FONT_URL;
      document.head.appendChild(link);
    }
    // Styles
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Fetch dashboard file
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const file = params.get('file');

    if (!file) {
      setError('No file specified. Add ?file=your-dashboard.md to the URL.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const { data } = supabase.storage.from('dashboards').getPublicUrl(file);

        if (!data?.publicUrl) {
          throw new Error('Could not generate public URL for this file.');
        }

        const res = await fetch(data.publicUrl);
        if (!res.ok) throw new Error(`Failed to fetch file (${res.status}).`);

        const text = await res.text();

        // If the file is already HTML (starts with < or doctype), render as-is
        const isHtml = /^\s*(<|<!doctype)/i.test(text);
        setContent(isHtml ? text : markdownToHtml(text));
      } catch (err) {
        setError(err.message || 'Failed to load dashboard.');
      } finally {
        setLoading(false);
      }
    })();
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
        <div className="db-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="db-viewer">
      {/* Content sourced from your own Supabase storage bucket */}
      <div className="db-container" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
