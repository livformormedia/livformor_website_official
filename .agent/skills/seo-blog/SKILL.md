---
name: SEO Blog Optimization
description: Guidelines for writing and formatting SEO-optimized blog posts for the LivForMor Media website
---

# SEO Blog Optimization Skill

Use this skill when creating or editing blog posts in the LivForMor Media website codebase.

## Blog Post Structure

### 1. Content Architecture (Heading Hierarchy)

Every blog post MUST follow this heading structure:

- **H1** — Only in the hero section (the `<h1>` tag in `BlogPost.jsx`). Never use `#` in the markdown content.
- **H2** — Main section headings. Use `##` in markdown. These auto-generate the Table of Contents.
- **H3** — Sub-sections within an H2 block. Use `###` in markdown.
- **Never skip levels** (e.g., don't jump from H2 to H4).

```markdown
## Main Section Title

Paragraph text here.

### Sub-section Title

More detail here.
```

### 2. Paragraph Length

- Max 3-4 sentences per paragraph
- Break long paragraphs after natural pauses
- Use line breaks between paragraphs for readability
- Average paragraph: 40-80 words

### 3. Blockquotes = Action Steps

Use markdown blockquotes (`>`) for actionable takeaways. The `BlogPost.jsx` renders these as teal callout cards with a lightbulb icon.

```markdown
> **Action Step:** Rewrite your homepage hero. Remove "Welcome to." Replace it with a sentence that mirrors your patient's internal monologue.
```

### 4. Lists

- Use bullet lists for unordered items (3-7 items ideal)
- Use numbered lists for sequential steps
- Each list item should be concise (1-2 lines)
- Lists get custom teal bullet styling in `BlogPost.jsx`

### 5. Section Dividers

Use `---` (horizontal rule) between major sections. These render as elegant gradient dividers with a centered teal dot.

### 6. Bold & Emphasis

- **Bold** (`**text**`) for key phrases, definitions, and important data points
- *Italic* (`*text*`) for patient quotes, internal monologue, and emphasis
- Don't overuse — if everything is bold, nothing is bold

## SEO Meta Requirements

### Required Fields in `blogData.js`

| Field | Requirements |
|-------|-------------|
| `title` | 50-65 characters, includes primary keyword |
| `slug` | Lowercase, hyphenated, includes primary keyword |
| `excerpt` | 150-160 characters, compelling hook |
| `meta_description` | 150-160 characters, includes primary keyword and CTA |
| `keywords` | 8-12 keywords, primary keyword first |
| `reading_time` | Accurate estimate (words ÷ 200) |
| `featured_image` | Always include, placed in `/public/` |
| `author` | Always "Oriel Mor" |

### Keyword Strategy

- **Primary keyword** appears in: title, slug, meta_description, first paragraph, at least one H2
- **Secondary keywords** appear naturally 2-3 times each
- **LSI keywords** (related terms) sprinkled throughout
- Keyword density: 1-2% for primary keyword
- Target keywords specific to the ketamine/TMS/Spravato niche

## JSON-LD Structured Data

The `BlogPost.jsx` component auto-generates Article schema. Ensure these fields are populated in `blogData.js`:

```javascript
{
  '@type': 'Article',
  headline: post.title,          // Max 110 chars
  description: post.meta_description,
  author: { '@type': 'Person', name: post.author },
  datePublished: post.published_date,  // ISO 8601 format
  publisher: { '@type': 'Organization', name: 'LivForMor Media' },
  image: post.featured_image     // Full URL or path
}
```

## Content Quality Standards

### For LivForMor Blog Posts

1. **Empathy-first opening** — Start with the reader's pain, not your credentials
2. **Data points** — Include at least 3 statistics with (sourced) attribution
3. **Actionable takeaways** — Every section ends with a concrete "Action Step" blockquote
4. **Niche-specific** — Use ketamine/TMS/Spravato/clinic terminology, not generic marketing advice
5. **Word count** — 1,500-3,000 words (8-15 min read)
6. **Internal links** — Link to at least 2 other pages (cash-offer, services, other blog posts)
7. **CTA placement** — Dual CTA section auto-renders at bottom of every post

### Readability Targets

- Flesch Reading Ease: 60-70 (suitable for general audience)
- Sentence length: 15-20 words average
- Active voice preferred
- No jargon without explanation

## Image Guidelines

- **Featured image**: 1200x630px minimum (OG image standard)
- Use teal/dark blue color palette matching brand
- No text overlays on featured images (title is in the hero)
- Store in `/public/blog-featured-{slug-keyword}.png`
- Alt text = descriptive, includes primary keyword

## Adding a New Blog Post

1. Add post object to `BLOG_POSTS` array in `src/data/blogData.js`
2. Generate featured image and save to `/public/`
3. Follow the heading hierarchy (H2 → H3, never H1 in content)
4. Use blockquotes for action steps
5. Include 8-12 keywords
6. Test locally at `http://localhost:5173/BlogPost?slug=your-slug`
7. Verify TOC generates correctly from H2 headings
8. Git commit and push → auto-deploys via Vercel
