import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const COLORS = {
  dark: '#0d3b40',
  teal: '#0f766e',
  tealLight: '#2dd4bf',
  gold: '#c5b896',
  white: '#ffffff',
  body: 'rgba(255,255,255,0.75)',
};

const STYLE_ID = 'blueprint-viewer-styles';

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes bp-spin {
      to { transform: rotate(360deg); }
    }
    .bp-viewer * { box-sizing: border-box; }
    .bp-viewer a { color: ${COLORS.tealLight}; text-decoration: none; transition: color 0.2s; }
    .bp-viewer a:hover { color: ${COLORS.gold}; text-decoration: underline; }
    .bp-viewer ul, .bp-viewer ol { padding-left: 1.5em; margin: 0.75em 0; }
    .bp-viewer li { margin: 0.35em 0; line-height: 1.7; color: ${COLORS.body}; }
    .bp-viewer li::marker { color: ${COLORS.tealLight}; }
    .bp-viewer img { max-width: 100%; border-radius: 12px; margin: 1em 0; }
    .bp-viewer pre {
      background: rgba(0,0,0,0.35);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 1.25em;
      overflow-x: auto;
      font-size: 0.88em;
      line-height: 1.6;
      margin: 1em 0;
    }
    .bp-viewer code {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.9em;
    }
    .bp-viewer p code {
      background: rgba(255,255,255,0.08);
      padding: 0.15em 0.45em;
      border-radius: 5px;
    }
    .bp-grade-card {
      display: inline-flex;
      align-items: center;
      gap: 0.75em;
      background: rgba(255,255,255,0.06);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      padding: 0.9em 1.3em;
      margin: 0.4em 0.5em 0.4em 0;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .bp-grade-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    }
    .bp-grade-badge {
      font-family: 'Nunito Sans', sans-serif;
      font-weight: 800;
      font-size: 1.35em;
      min-width: 2.2em;
      text-align: center;
      padding: 0.15em 0.4em;
      border-radius: 8px;
      color: #fff;
      line-height: 1.2;
    }
    .bp-grade-label {
      font-weight: 600;
      color: rgba(255,255,255,0.85);
      font-size: 0.95em;
    }
    .bp-table-wrap {
      overflow-x: auto;
      margin: 1.25em 0;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .bp-viewer table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.92em;
    }
    .bp-viewer th {
      background: rgba(197,184,150,0.15);
      color: ${COLORS.gold};
      font-weight: 700;
      text-align: left;
      padding: 0.85em 1.1em;
      border-bottom: 2px solid rgba(197,184,150,0.25);
    }
    .bp-viewer td {
      padding: 0.75em 1.1em;
      color: ${COLORS.body};
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    .bp-viewer tr:nth-child(even) td { background: rgba(255,255,255,0.04); }
    .bp-viewer tr:nth-child(odd) td { background: rgba(255,255,255,0.02); }
    .bp-viewer tr:hover td { background: rgba(255,255,255,0.07); }
    .bp-blockquote {
      background: rgba(255,255,255,0.06);
      backdrop-filter: blur(10px);
      border-left: 4px solid ${COLORS.teal};
      border-radius: 0 12px 12px 0;
      padding: 1em 1.4em;
      margin: 1.25em 0;
      color: ${COLORS.body};
      font-style: italic;
    }
    .bp-hr {
      border: none;
      height: 2px;
      background: linear-gradient(90deg, transparent, ${COLORS.gold}, transparent);
      margin: 2.5em 0;
    }
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
    }
    .bp-yt-btn svg { flex-shrink: 0; }
  `;
  document.head.appendChild(style);
}

function loadFont() {
  if (document.getElementById('bp-font')) return;
  const link = document.createElement('link');
  link.id = 'bp-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
  document.head.appendChild(link);
}

function getGradeColor(grade) {
  const g = grade.trim().toUpperCase();
  if (g.startsWith('A') || g.startsWith('B')) return '#10b981';
  if (g.startsWith('C')) return '#f59e0b';
  return '#ef4444';
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderYouTubeButton(url, label) {
  const escapedUrl = escapeHtml(url);
  const escapedLabel = escapeHtml(label || 'Watch on YouTube');
  const svg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>';
  return '<a href="' + escapedUrl + '" target="_blank" rel="noopener noreferrer" class="bp-yt-btn">' + svg + ' ' + escapedLabel + '</a>';
}

function inlineFormat(text) {
  // YouTube URLs in markdown link syntax
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)[^\s)]+)\)/g, function(_, label, url) {
    return renderYouTubeButton(url, label);
  });
  // Standalone YouTube URLs
  text = text.replace(/(^|[\s>])(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)[^\s<)"]+)/g, function(_, prefix, url) {
    return prefix + renderYouTubeButton(url);
  });
  // Images
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(_, alt, src) {
    return '<img alt="' + escapeHtml(alt) + '" src="' + escapeHtml(src) + '" />';
  });
  // Links (non-YouTube, already handled above)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(_, label, href) {
    return '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(label) + '</a>';
  });
  // Bold + italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;font-weight:700">$1</strong>');
  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  return text;
}

function parseMarkdown(md) {
  let html = '';
  const lines = md.split('\n');
  let i = 0;
  let inList = false;
  let listType = '';
  let inTable = false;
  let tableRows = [];
  let inCodeBlock = false;
  let codeContent = '';
  let blockquoteLines = [];
  let gradeCards = [];

  function flushList() {
    if (inList) {
      html += listType === 'ul' ? '</ul>' : '</ol>';
      inList = false;
    }
  }

  function flushBlockquote() {
    if (blockquoteLines.length > 0) {
      html += '<div class="bp-blockquote">' + inlineFormat(blockquoteLines.join('<br/>')) + '</div>';
      blockquoteLines = [];
    }
  }

  function flushTable() {
    if (!inTable) return;
    inTable = false;
    if (tableRows.length === 0) return;
    let t = '<div class="bp-table-wrap"><table>';
    tableRows.forEach(function(row, ri) {
      const cells = row.split('|').filter(function(_, ci, arr) { return ci > 0 && ci < arr.length - 1; }).map(function(c) { return c.trim(); });
      // Skip separator row
      if (ri === 1 && cells.every(function(c) { return /^[-:]+$/.test(c); })) return;
      const tag = ri === 0 ? 'th' : 'td';
      t += '<tr>';
      cells.forEach(function(c) { t += '<' + tag + '>' + inlineFormat(c) + '</' + tag + '>'; });
      t += '</tr>';
    });
    t += '</table></div>';
    html += t;
    tableRows = [];
  }

  function flushGradeCards() {
    if (gradeCards.length === 0) return;
    html += '<div style="display:flex;flex-wrap:wrap;margin:0.75em 0;">';
    gradeCards.forEach(function(item) {
      var color = getGradeColor(item.grade);
      html += '<div class="bp-grade-card"><span class="bp-grade-badge" style="background:' + color + '">' + escapeHtml(item.grade) + '</span><span class="bp-grade-label">' + escapeHtml(item.category) + '</span></div>';
    });
    html += '</div>';
    gradeCards = [];
  }

  while (i < lines.length) {
    var line = lines[i];

    // Code blocks
    if (/^```/.test(line)) {
      if (inCodeBlock) {
        flushList(); flushBlockquote(); flushTable(); flushGradeCards();
        html += '<pre><code>' + escapeHtml(codeContent) + '</code></pre>';
        codeContent = '';
        inCodeBlock = false;
        i++;
        continue;
      } else {
        flushList(); flushBlockquote(); flushTable(); flushGradeCards();
        inCodeBlock = true;
        i++;
        continue;
      }
    }
    if (inCodeBlock) {
      codeContent += (codeContent ? '\n' : '') + line;
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      flushList(); flushBlockquote(); flushTable(); flushGradeCards();
      i++;
      continue;
    }

    // Grade heading: ### Category: Grade
    var gradeMatch = line.match(/^###\s+(.+?):\s+([A-Fa-f][+-]?)$/);
    if (gradeMatch) {
      flushList(); flushBlockquote(); flushTable();
      gradeCards.push({ category: gradeMatch[1], grade: gradeMatch[2] });
      i++;
      // Look ahead for more grade cards
      while (i < lines.length) {
        var nextGrade = lines[i].match(/^###\s+(.+?):\s+([A-Fa-f][+-]?)$/);
        if (nextGrade) {
          gradeCards.push({ category: nextGrade[1], grade: nextGrade[2] });
          i++;
        } else if (lines[i].trim() === '') {
          i++;
        } else {
          break;
        }
      }
      flushGradeCards();
      continue;
    }

    // Headings
    var hMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (hMatch) {
      flushList(); flushBlockquote(); flushTable(); flushGradeCards();
      var level = hMatch[1].length;
      var sizes = { 1: '2.2em', 2: '1.7em', 3: '1.3em', 4: '1.1em', 5: '1em', 6: '0.9em' };
      var margins = { 1: '1.5em 0 0.6em', 2: '1.3em 0 0.5em', 3: '1.1em 0 0.4em', 4: '1em 0 0.35em', 5: '0.8em 0 0.3em', 6: '0.7em 0 0.25em' };
      var color = level <= 2 ? COLORS.white : level <= 3 ? COLORS.tealLight : COLORS.gold;
      html += '<h' + level + ' style="font-size:' + sizes[level] + ';font-weight:' + (level === 1 ? 900 : 700) + ';color:' + color + ';margin:' + margins[level] + ';line-height:1.3">' + inlineFormat(hMatch[2]) + '</h' + level + '>';
      i++;
      continue;
    }

    // HR
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      flushList(); flushBlockquote(); flushTable(); flushGradeCards();
      html += '<hr class="bp-hr" />';
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      flushList(); flushTable(); flushGradeCards();
      blockquoteLines.push(line.replace(/^>\s?/, ''));
      i++;
      continue;
    } else {
      flushBlockquote();
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      flushList(); flushBlockquote(); flushGradeCards();
      if (!inTable) inTable = true;
      tableRows.push(line);
      i++;
      continue;
    } else {
      flushTable();
    }

    // Unordered list
    if (/^(\s*)[-*+]\s+/.test(line)) {
      flushBlockquote(); flushTable(); flushGradeCards();
      if (!inList || listType !== 'ul') {
        flushList();
        html += '<ul>';
        inList = true;
        listType = 'ul';
      }
      html += '<li>' + inlineFormat(line.replace(/^\s*[-*+]\s+/, '')) + '</li>';
      i++;
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      flushBlockquote(); flushTable(); flushGradeCards();
      if (!inList || listType !== 'ol') {
        flushList();
        html += '<ol>';
        inList = true;
        listType = 'ol';
      }
      html += '<li>' + inlineFormat(line.replace(/^\s*\d+\.\s+/, '')) + '</li>';
      i++;
      continue;
    }

    // Paragraph
    flushList(); flushBlockquote(); flushTable(); flushGradeCards();
    html += '<p style="color:' + COLORS.body + ';line-height:1.8;margin:0.6em 0">' + inlineFormat(line) + '</p>';
    i++;
  }

  // Flush remaining
  flushList();
  flushBlockquote();
  flushTable();
  flushGradeCards();
  if (inCodeBlock) {
    html += '<pre><code>' + escapeHtml(codeContent) + '</code></pre>';
  }

  return html;
}

export default function BlueprintViewer() {
  const [searchParams] = useSearchParams();
  const file = searchParams.get('file');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function() {
    loadFont();
    injectStyles();
    return function() {
      var el = document.getElementById(STYLE_ID);
      if (el) el.remove();
    };
  }, []);

  useEffect(function() {
    if (!file) {
      setError('No blueprint file specified. Add ?file=filename.md to the URL.');
      setLoading(false);
      return;
    }

    async function fetchBlueprint() {
      try {
        setLoading(true);
        setError(null);

        var urlData = supabase.storage.from('blueprints').getPublicUrl(file);

        if (!urlData.data || !urlData.data.publicUrl) {
          throw new Error('Could not generate public URL for this blueprint.');
        }

        var response = await fetch(urlData.data.publicUrl);
        if (!response.ok) {
          throw new Error('Failed to load blueprint (' + response.status + ').');
        }

        var text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err.message || 'Failed to load blueprint.');
      } finally {
        setLoading(false);
      }
    }

    fetchBlueprint();
  }, [file]);

  var wrapperStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(170deg, #0d3b40 0%, #0a3a3f 40%, #0d3b40 100%)',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    color: COLORS.white,
    padding: '2em 1em',
  };

  var containerStyle = {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '2em',
  };

  if (loading) {
    return (
      <div style={Object.assign({}, wrapperStyle, { display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 44,
              height: 44,
              border: '3px solid rgba(255,255,255,0.1)',
              borderTopColor: COLORS.tealLight,
              borderRadius: '50%',
              animation: 'bp-spin 0.8s linear infinite',
              margin: '0 auto 1.2em',
            }}
          />
          <p style={{ color: COLORS.body, fontSize: '1.05em', fontFamily: "'Nunito Sans', sans-serif" }}>
            Loading blueprint...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={Object.assign({}, wrapperStyle, { display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
        <div
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 16,
            padding: '2em 2.5em',
            maxWidth: 500,
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ fontSize: '2em', marginBottom: '0.4em', color: '#ef4444' }}>!</div>
          <h2 style={{ color: '#ef4444', fontSize: '1.2em', margin: '0 0 0.5em', fontFamily: "'Nunito Sans', sans-serif" }}>
            Unable to Load Blueprint
          </h2>
          <p style={{ color: COLORS.body, lineHeight: 1.6, margin: 0, fontFamily: "'Nunito Sans', sans-serif" }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  var renderedHtml = parseMarkdown(content || '');

  return (
    <div style={wrapperStyle}>
      <div
        className="bp-viewer"
        style={containerStyle}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    </div>
  );
}
