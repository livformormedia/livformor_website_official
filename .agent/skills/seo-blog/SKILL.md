---
name: SEO Blog Optimization
description: Guidelines for writing and formatting SEO-optimized blog posts for the LivForMor Media website, including generative AI optimization (GEO) best practices for 2025-2026
---

# SEO Blog Optimization Skill

Use this skill when creating or editing blog posts in the LivForMor Media website codebase.

---

## Blog Post Structure

### 1. Content Architecture (Heading Hierarchy)

Every blog post MUST follow this heading structure:

- **H1** — Only in the hero section (the `<h1>` tag in `BlogPost.jsx`). Never use `#` in the markdown content.
- **H2** — Main section headings. Use `##` in markdown. These auto-generate the Table of Contents.
- **H3** — Sub-sections within an H2 block. Use `###` in markdown.
- **Never skip levels** (e.g., don't jump from H2 to H4).

### 2. Question-Based H2 Headings (CRITICAL for GEO)

**All H2 headings MUST be phrased as questions.** This is one of the highest-impact SEO/GEO tactics because:

- Google's AI Overviews directly answer question-based headings
- ChatGPT and Perplexity prefer citing content with clear Q&A structure
- Users search with questions — matching their intent improves ranking

```markdown
## Is Your Website Talking About You Instead of Your Patient?
## How Fast Are You Responding to Patient Inquiries?
## Are You Sending Google Ads Traffic to Your Homepage?
```

❌ **NEVER** use format like: `## Mistake #1: Bad Website Copy`
✅ **ALWAYS** use format like: `## Is Your Website Talking About You Instead of Your Patient?`

### 3. Snippet-Ready Introductions

The **first 1-2 sentences** of every H2 section MUST directly answer the question in the heading. This is critical for Google Featured Snippets and AI Overviews.

```markdown
## How Fast Are You Responding to Patient Inquiries?

Speed-to-lead is the single most important metric in clinic marketing. The first clinic to respond to an inquiry wins the patient 78% of the time.
```

### 4. Key Takeaways Section

Every post MUST include a **Key Takeaways** section immediately after the introduction. This serves as a scannable summary and is heavily cited by AI engines.

```markdown
### Key Takeaways

- **Your website should speak to the patient's pain first**, not your credentials.
- **Speed wins patients.** The first clinic to respond wins 78% of the time.
- **Social media without video is invisible.** Video content gets 3x more engagement.
```

The `BlogPost.jsx` component renders this with a lightbulb icon (💡).

### 5. Paragraph Structure

- Max 3-4 sentences per paragraph
- **Self-contained paragraphs** — Each paragraph should make sense if extracted alone (critical for AI citation)
- Use line breaks between paragraphs for readability
- Average paragraph: 40-80 words
- Break long arguments into distinct, citable chunks

### 6. Blockquotes = Action Steps

Use markdown blockquotes (`>`) for actionable takeaways. The `BlogPost.jsx` renders these as teal callout cards with a lightbulb icon.

```markdown
> **Action Step:** Rewrite your homepage hero. Remove "Welcome to." Replace it with a sentence that mirrors your patient's internal monologue.
```

### 7. Lists

- Use bullet lists for unordered items (3-7 items ideal)
- Use numbered lists for sequential steps
- Each list item should be concise (1-2 lines)
- Lists get custom teal bullet styling

### 8. Section Dividers

Use `---` (horizontal rule) between major sections. These render as elegant gradient dividers with a centered teal dot.

### 9. Bold & Emphasis

- **Bold** (`**text**`) for key phrases, definitions, and important data points
- *Italic* (`*text*`) for patient quotes, internal monologue, and emphasis
- Don't overuse — if everything is bold, nothing is bold

---

## Inline Images (REQUIRED)

### Image Frequency

Every blog post MUST include **1 inline image for every 200-300 words**, placed contextually within the content. A 2,000-word post should have 4-6 inline images minimum.

### Image Syntax

Use standard markdown image syntax. The `BlogPost.jsx` component renders these with:
- Rounded corners (`rounded-xl`)
- Shadow effect (`shadow-lg`)
- Lazy loading (`loading="lazy"`)
- Alt text displayed as a centered italic figcaption

```markdown
![Before and after comparison of empathy-first clinic website design](/blog-img-empathy-website.png)
```

### Image Best Practices

- **Alt text is the caption** — Write descriptive, keyword-rich alt text
- **Contextual placement** — Place images immediately after the paragraph that references them
- **Generate with AI** — Use the `generate_image` tool for custom illustrations
- **Store in `/public/`** — All blog images go in the public directory
- **Naming convention**: `blog-img-{descriptive-keyword}.png`
- **No stock photos** — Generate custom visuals matching the brand's teal/dark color palette

### Image Types That Perform Best

1. Before/after comparisons
2. Data visualizations and statistics
3. Process diagrams
4. Screenshot mockups
5. Infographics

---

## FAQ Section (REQUIRED)

### Structure

Every blog post MUST end with a **Frequently Asked Questions** section containing 5-8 questions. This is both a UX win and a critical SEO element.

### Data Format in `blogData.js`

```javascript
faq: [
  {
    question: 'How much should a ketamine clinic spend on marketing per month?',
    answer: 'Most successful ketamine clinics invest between $3,000 and $10,000 per month...'
  },
  // 5-8 total questions
]
```

### FAQ Best Practices

- Questions should be phrased as users would ask them (natural language)
- Answers should be 2-4 sentences (concise but comprehensive)
- Include the primary keyword in at least 2 questions
- Mix informational and commercial-intent questions
- **Do NOT duplicate H2 headings** — FAQ questions should cover adjacent topics

### FAQPage JSON-LD Schema

The `BlogPost.jsx` component **automatically generates** FAQPage JSON-LD structured data from the `faq` array. This enables Google's FAQ rich results.

---

## Internal Links (REQUIRED)

Every blog post MUST include **3-5 contextual internal links** to other pages on the site.

### Link Targets

| Page | When to Link |
|------|-------------|
| `/cash-offer` | When discussing landing pages, conversion, patient acquisition |
| `/services` | When mentioning specific services (Google Ads, SEO, content) |
| `/Blog` | When referencing related topics covered in other posts |
| `/#about` | When discussing the agency's approach or methodology |

### Link Style

Use natural anchor text — never "click here." The link should flow within the sentence:

```markdown
That's why we build [dedicated landing pages](/cash-offer) for every clinic we work with.
```

---

## Source Citations (REQUIRED)

### Data Points Need Sources

Every statistical claim MUST include an inline source link or attribution:

```markdown
The first clinic to respond wins the patient 78% of the time ([source](https://www.softwareadvice.com/resources/patient-survey-response-time/)).
```

### Citation Requirements

- Minimum **3 sourced statistics** per post
- Link to the original study/source when available
- Use parenthetical citation format
- Prefer authoritative sources (medical journals, industry reports, government data)

---

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
| `faq` | Array of 5-8 question/answer objects |

### Keyword Strategy

- **Primary keyword** appears in: title, slug, meta_description, first paragraph, at least one H2
- **Secondary keywords** appear naturally 2-3 times each
- **LSI keywords** (related terms) sprinkled throughout
- Keyword density: 1-2% for primary keyword
- Target keywords specific to the ketamine/TMS/Spravato niche

---

## JSON-LD Structured Data

The `BlogPost.jsx` component auto-generates **two schema types**:

### 1. Article Schema

```javascript
{
  '@type': 'Article',
  headline: post.title,
  description: post.meta_description,
  author: { '@type': 'Person', name: post.author },
  datePublished: post.published_date,
  publisher: { '@type': 'Organization', name: 'LivForMor Media' },
  image: post.featured_image
}
```

### 2. FAQPage Schema (auto-generated from `faq` array)

```javascript
{
  '@type': 'FAQPage',
  mainEntity: post.faq.map(q => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.answer
    }
  }))
}
```

---

## Generative Engine Optimization (GEO) Checklist

These practices optimize content for AI engines (ChatGPT, Google AI Overviews, Perplexity):

| Practice | Status |
|----------|--------|
| Question-based H2 headings | Auto-generates AI citations |
| Snippet-ready first sentences | Featured snippet + AIO |
| Key Takeaways summary | Scannable, frequently cited |
| Self-contained paragraphs | Enables isolated AI citations |
| Sourced statistics | Builds authority signals |
| FAQ section with schema | Rich results + AI training data |
| Inline images with alt text | Visual search + engagement |
| Internal links | Authority distribution |

---

## Content Quality Standards

### For LivForMor Blog Posts

1. **Empathy-first opening** — Start with the reader's pain, not your credentials
2. **Data points** — Include at least 3 statistics with sourced attribution
3. **Actionable takeaways** — Every section ends with a concrete "Action Step" blockquote
4. **Niche-specific** — Use ketamine/TMS/Spravato/clinic terminology, not generic marketing advice
5. **Word count** — 1,500-3,000 words (8-15 min read)
6. **Internal links** — 3-5 contextual links to other pages
7. **CTA placement** — Dual CTA section auto-renders at bottom of every post
8. **FAQ section** — 5-8 questions with FAQPage JSON-LD schema
9. **Inline images** — 1 per 200-300 words with descriptive alt text/captions
10. **Key Takeaways** — Summary section after introduction

### Readability Targets

- Flesch Reading Ease: 60-70 (suitable for general audience)
- Sentence length: 15-20 words average
- Active voice preferred
- No jargon without explanation

---

## Image Guidelines

- **Featured image**: 1200x630px minimum (OG image standard)
- **Inline images**: Any size, auto-responsive (`w-full h-auto`)
- Use teal/dark blue color palette matching brand
- No text overlays on featured images (title is in the hero)
- Store in `/public/blog-img-{descriptive-keyword}.png` for inline, `/public/blog-featured-{slug}.png` for featured
- Alt text = descriptive, includes primary keyword

---

## Adding a New Blog Post — Complete Checklist

1. Add post object to `BLOG_POSTS` array in `src/data/blogData.js`
2. Generate featured image → save to `/public/`
3. Generate 4-6 inline images → save to `/public/`
4. Write **question-based H2** headings for every section
5. Write **snippet-ready first sentences** for every section
6. Add **Key Takeaways** section after introduction
7. Add **3-5 internal links** throughout content
8. Add **3+ sourced statistics** with links
9. Write **FAQ section** (5-8 Q&As) in the `faq` array
10. Use blockquotes for action steps
11. Include 8-12 keywords
12. Ensure self-contained paragraphs for AI citation
13. Test locally at `http://localhost:5173/BlogPost?slug=your-slug`
14. Verify TOC generates correctly from H2 headings
15. Verify FAQ accordion works (expand/collapse)
16. Verify inline images render with captions
17. Git commit and push → auto-deploys via Vercel
