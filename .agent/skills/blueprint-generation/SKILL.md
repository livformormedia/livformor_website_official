---
name: blueprint-generation
description: Generates personalized Patient Acquisition Blueprints for clinic leads using Apify scraping, Google Maps competitor research, and Claude AI. Triggered automatically by form submissions via the Supabase Edge Function, or manually re-triggered for specific leads.
---

# Patient Acquisition Blueprint Generation

Generates a personalized, high-impact "Patient Acquisition Blueprint" for each new clinic lead. This is the report sent to prospects BEFORE a sales call to demonstrate expertise and create urgency.

## Architecture

```
Form Submit → Supabase Edge Function → Apify Scraping → Claude AI → Markdown Blueprint → Supabase Storage → BlueprintViewer.jsx
```

### Tools Used
| Tool | Purpose | Actor/Model |
|------|---------|-------------|
| **Apify** `website-content-crawler` | Scrape the clinic's website (5 pages max) | `apify/website-content-crawler` |
| **Apify** `crawler-google-places` | Find local competitors via Google Maps | `compass/crawler-google-places` |
| **Google PageSpeed API** | Technical website audit (performance + SEO scores) | Free API |
| **Claude Haiku** (OpenRouter) | Extract city/state from website text (if not provided) | `anthropic/claude-haiku-4` |
| **Claude Sonnet** (OpenRouter) | Generate the full blueprint markdown | `anthropic/claude-sonnet-4` |

### Key Files
- **Edge Function**: `supabase/functions/generate-research-report/index.ts`
- **Blueprint Viewer**: `src/pages/BlueprintViewer.jsx`
- **Storage Bucket**: Supabase `blueprints` bucket (public)
- **Local Storage**: `~/Desktop/LivForMor Blueprints/` — save a copy of every generated blueprint here as `blueprint_<firstname>_<lastname>.md`
- **Route**: `/blueprint?file=<filename>`

---

## Critical Rules — DO NOT VIOLATE

### Content Guardrails
1. **NEVER reference clinics or cities not provided in the form data.** If competitor data includes out-of-state businesses, exclude them.
2. **NEVER include LivForMor pricing, packages, or service methodology.** The blueprint identifies PROBLEMS and OPPORTUNITIES — solutions are discussed on the call.
3. **Section 5 must NOT explain what LivForMor does.** It must create curiosity and end with the YouTube CTA: `https://www.youtube.com/@orielmor-livformormedia`
4. **Expand service abbreviations** before searching Google Maps:
   - `kap` → `ketamine therapy`
   - `tms` → `TMS therapy`
   - `spravato` → `Spravato clinic`
5. **NEVER hallucinate missing content.** If the scraped website data contains team photos, provider bios, testimonials, etc. — acknowledge them as strengths. Only flag something as "missing" if it genuinely isn't in the scraped data.
6. **Always inject the current date** into the prompt (`new Date().toLocaleDateString()`). Never let the LLM reference old dates.
7. **NEVER end the report with "this blueprint expires in 7 days"** or any fake scarcity. Just end with the YouTube CTA.
8. **Expiry text fix**: If any urgency text at the bottom says "we may share these insights with other [city] providers" — it should say "we may share insights with other [city] providers" (no "these").

### Data Gathering Protocol: PageSpeed Auditor
**Trigger:** Before generating ANY blueprint, the Edge Function calls Google PageSpeed API with `&strategy=mobile`.
**Metrics extracted:**
- `lighthouseResult.categories.performance.score` → multiply by 100
- `lighthouseResult.audits.speed-index.displayValue` → exact mobile load time
- `lighthouseResult.audits.first-contentful-paint.displayValue` → FCP
- `lighthouseResult.audits.largest-contentful-paint.displayValue` → LCP
- `lighthouseResult.categories.seo.score` → multiply by 100

**Bleeding Neck Rule:** If Speed Index > 2.5 seconds, flag it as a "Bleeding Neck" — they are paying for Meta traffic that bounces before the page loads. Google's measured bounce rate for pages >3s is 53%.

**Output Rule:** The `### Speed:` grade MUST use these exact numbers. Never hallucinate or guess speed metrics.

### Data Gathering Protocol: Meta Ad Library / Competitor X-Ray
**Trigger:** Before generating the "Competitor Intelligence & Ad X-Ray" section, discover the clinic's Facebook page and scrape their active ads.

**Facebook Discovery Cascade** (fail-proof):
1. Extract `facebook.com/` links from the scraped website text (regex)
2. Check Google Maps data for social links
3. Search Google: `"clinic name" "city" site:facebook.com` (via `apify/google-search-scraper`)
4. If ALL fail → report "No Facebook presence detected" (this IS a finding)

**Ad Library Scrape:** Use `apify/facebook-ads-scraper` with the discovered Facebook page name. Extract: active ad count, ad copy/hooks, CTA, creative format (video/image/carousel), platforms.

**Output Rule:**
- If **ZERO ads** found: "Zero Active Ad Spend Detected on Meta. You are currently entirely reliant on organic referrals and handing local market share directly to aggressive competitors."
- If ads **ARE running**: Quote exact hooks, analyze against Alpha Omega rule (commodity vs. proprietary protocol), note creative format.

### Meta (Facebook) Paid Traffic Rules — CRITICAL
The blueprint MUST use modern Meta advertising best practices:

**BANNED TERMS (deprecated by Meta):**
- ❌ "Lookalike audience"
- ❌ "Interest targeting"  
- ❌ "Custom audience"
- ❌ "Detailed targeting"

**REQUIRED approach:**
- ✅ **Advantage+ campaigns** (Meta's Andromeda AI handles targeting)
- ✅ **Education-first storytelling** — patient transformation stories, myth-busting, de-stigmatization
- ✅ **Story-format video ads** driving to a dedicated landing page
- ✅ **Diverse avatar targeting** — creatives MUST target different patient segments:
  - People with **depression** (treatment-resistant, postpartum, etc.)
  - People with **PTSD**
  - People with **OCD**
  - People with **anxiety disorders**
  - People with **chronic pain**
- ✅ Reference the **Alpha Omega education framework** from `ketamine-golden-funnel-blueprint` skill
- ✅ Use the **CARE framework** for messaging
- ✅ Focus on the **messaging** and **stories**, not the targeting mechanics

> **Key source**: There is a NotebookLM notebook with deep research on **Meta Andromeda** — use this for the most up-to-date Meta advertising recommendations.

### Design Rules
1. **Font**: Nunito Sans (Google Fonts) — imported via `useEffect` in BlueprintViewer
2. **CTA button**: **Red gradient** (`#CC0000` → `#FF0000`) — YouTube brand colors
3. **Brand colors**: `#0d3b40` (dark), `#0f766e` (teal), `#c5b896` (gold)
4. **Tables**: Gold headers (`#c5b896`), semi-transparent dark rows, alternating row backgrounds, proper padding
5. **Grade Badge Format**: The viewer auto-detects `### Category: Grade` headings (e.g., `### Trust: B+`) and renders them as color-coded badge cards:
   - **Green** for A/B grades
   - **Yellow** for C grades
   - **Red** for D/F grades
6. **Blockquotes**: Rendered as glassmorphism callout cards with teal left border
7. **Horizontal rules**: Rendered as gold gradient dividers
8. **YouTube links**: Auto-detected and rendered as red gradient CTA buttons

---

## Blueprint Sections (5 Sections)

1. **🔍 Executive Summary & Market Opportunity** — Revenue gap, patient opportunity, #1 barrier
2. **⚠️ Website Teardown** — Specific, brutal audit with grades (A-F) on Trust, Speed, SEO, CTA. ONLY flag missing items if truly absent from scraped data.
3. **🏆 Competitor Intelligence** — Table of LOCAL (same state) competitors with weaknesses and exploitation strategies
4. **🗺️ 60-Day Quick Win Plan** — Week-by-week milestones with KPIs. Meta section MUST use Advantage+ and diverse avatar creatives.
5. **🚀 The Cost of Waiting** — Daily revenue loss calculation, competitor vulnerability. End with EXACT YouTube CTA text and NOTHING after it.

---

## Manual Re-trigger

```bash
curl -X POST "https://yrfobzuiqcuhylstiukn.supabase.co/functions/v1/generate-research-report" \
  -H "Authorization: Bearer <SUPABASE_ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Lee",
    "last_name": "Barrus",
    "email": "lee@rbh.care",
    "website": "https://rbh.care",
    "services": ["ketamine therapy"],
    "clinic_operational": "yes",
    "monthly_budget": "0-3000",
    "team_structure": "full-team",
    "city_state": "Pleasant Grove, Utah"
  }'
```

The anon key is hardcoded in `src/lib/supabase.js`.

---

## Apify Skills Reference

For advanced scraping beyond the Edge Function's inline calls:
- **`apify-competitor-intelligence`**: Deep competitor analysis across Google Maps, Facebook, Instagram, YouTube
- **`apify-market-research`**: Market conditions, geographic opportunities, pricing analysis
- **`apify-ultimate-scraper`**: Universal scraper for any platform

Located in `.agents/skills/`.


