---
name: clinic-dashboard-generator
description: >
  Automated Clinic Intelligence Dashboard Generator for LivForMor Media.
  Given a clinic name, domain, services, city/state, and contact name,
  this skill runs a complete 5-phase pipeline using NotebookLM MCP to produce
  deep research (100+ sources), multiple AI artifacts (audio briefing, infographic,
  quiz, flashcards, executive briefing, competitive intel), and packages everything
  into a beautifulglasmorphic HTML dashboard — ready to view before a clinic discovery call.
  Use this whenever you receive a new clinic lead from the LivForMor form submission pipeline.
---

# 🏥 Clinic Intelligence Dashboard Generator
### LivForMor Media — Pre-Call Research Automation

---

## 🎯 The Goal

Transform a raw clinic lead (name, website, services, city) into a ready-to-view
**"Clinic Intelligence Dashboard"** folder containing:

1. AI-generated Markdown documents: executive briefing, competitive intel, deep research report, quiz, flashcards
2. Downloaded media: audio podcast MP3, market infographic PNG
3. A premium glassmorphic HTML dashboard unifying everything — ready to open in any browser

**Colour Palette:** LivForMor Purple `#6B2FA0` + Gold `#D4AF37` on dark background `#08080c`

---

## ⚡ Trigger

Input comes from a new LivForMor clinic form submission. A payload is provided containing:

- `clinic_name` *(required)*
- `clinic_domain` *(required — e.g. mindwellness.com)*
- `services` *(required — e.g. "Ketamine, TMS, Spravato")*
- `city_state` *(required — e.g. "Miami, FL")*
- `contact_name` *(required — e.g. "Dr. Sarah Kim")*
- `monthly_budget` *(optional)*
- `team_structure` *(optional)*

**If triggered manually**, ask for these fields before proceeding.

---

---

# 🔁 Step-By-Step Execution Pipeline

---

## Phase 0: Agent Pre-Research (Data Enrichment)

Before creating a NotebookLM notebook, do your own ground-level research to build high-quality seed data. NotebookLM outputs are only as good as what you feed it.

---

### Step 0.1 — Website Scrape (MUST USE APIFY)

You MUST use Apify to crawl the clinic's website. **Do not use Jina, Firecrawl, or raw HTTP fetches.** If writing a script, use `apify-client`. If acting manually, use the `apify-ultimate-scraper` skill.
**Required Actor:** `apify/website-content-crawler`
Target:
- Homepage
- Services / Treatments page
- About / Team page
- Any blog or press page (max 5 pages total)

---

### Step 0.2 — External Enrichment (MUST USE APIFY)
q
You MUST use Apify to pull real Google Maps and competitor data. Reference the `apify-competitor-intelligence` and `apify-market-research` skills.

**1. Google Maps & Reviews:**
- **Required Actor:** `compass/Google-Maps-Reviews-Scraper` or `compass/crawler-google-places`
- **Target:** The clinic's own Google Maps listing to get rating, review count, and recent reviews (especially negative ones).

**2. Local Competitors:**
- Search Google Maps for `{services} near {city_state}`
- **Target:** Find 3-5 competitors in the same city offering the same services (e.g., TMS, Ketamine, Spravato). Extract their ratings and notable review themes.

**3. Additional Context (Web/Apify):**
- Area mental health statistics: depression prevalence, treatment gap, patient demand proxies for `{city_state}`
- Facebook/Instagram presence (do they run ads? what do they post?)

---

### Step 0.3 — Synthesize Clinic Profile

Combine all scraped data into a single "Clinic Profile" text document:

```
Clinic Name: {clinic_name}
Domain: {clinic_domain}
Services: {services}
Location: {city_state}
Contact: {contact_name}

WEBSITE SUMMARY:
[Key copy, service descriptions, trust signals, CTAs found on site]

ONLINE REPUTATION:
[Google rating, number of reviews, common praise/complaints from actual reviews]

LOCAL COMPETITORS:
[List each competitor found: name, rating, services, notable review themes]

AREA MARKET DATA:
[Population, mental health statistics, treatment gap estimates for this city/region]

SOCIAL PRESENCE:
[Facebook/Instagram active? Running ads? Post frequency?]

FORM DATA:
Monthly Budget: {monthly_budget}
Team Structure: {team_structure}
```

This profile becomes the **foundational seed** for NotebookLM.

---

---

## Phase 1: Notebook Preparation & Initial Ingestion

### Step 1.1 — Create Notebook

```
mcp: notebook_create
title: "Clinic Intel - {clinic_name} | {city_state}"
```

Save the returned `notebook_id`.

---

### Step 1.2 — Inject Seed Data as Text Source

```
mcp: source_add
notebook_id: {notebook_id}
source_type: "text"
title: "{clinic_name} — Clinic Profile & Market Data"
text: [the full synthesized Clinic Profile from Phase 0.3]
wait: true
```

---

### Step 1.3 — Add Scraped URLs as Sources

For each high-quality URL found (clinic website, key competitor pages, relevant mental health market reports, news articles), add individually:

```
mcp: source_add
notebook_id: {notebook_id}
source_type: "url"
url: "{each_url}"
wait: true
```

> Add 4–8 of the best URLs. Do not add more than 10 here — deep research in Phase 2 will find many more.

---

---

## Phase 2: Deep Research (NotebookLM Web Search)

### Step 2.1 — Start Deep Research

```
mcp: research_start
notebook_id: {notebook_id}
query: "{clinic_name} {city_state} {services} ketamine TMS Spravato mental health market competitors patient acquisition marketing 2025 2026"
source: "web"
mode: "deep"
```

`mode: "deep"` finds 40–100+ sources and takes ~5 minutes.

---

### Step 2.2 — Poll Until Complete

```
mcp: research_status
notebook_id: {notebook_id}
max_wait: 300
```

Wait for `status: "completed"` before proceeding.

---

### Step 2.3 — Batch Import Sources (CRITICAL — Do Not Skip)

Deep research returns 40–100+ sources. **Never import all at once** — it will timeout. Import in chunks of 20:

```
# Batch 1
mcp: research_import
notebook_id: {notebook_id}
task_id: {task_id_from_step_2.1}
source_indices: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]

# Wait 3 seconds, then Batch 2
mcp: research_import
source_indices: [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]

# Continue in chunks of 20 until all sources imported
```

> ⚠️ Wait 3 seconds between each batch.

---

---

## Phase 3: Artifact Generation

### Step 3.1 — Executive Briefing (`01_briefing_doc.md`)

```
mcp: notebook_query
notebook_id: {notebook_id}
query: "Write a comprehensive executive pre-call briefing for LivForMor Media's sales team who are about to speak with {contact_name} at {clinic_name} in {city_state}. Include these exact sections:
1) Clinic Overview (services, online reputation, digital presence, staff structure)
2) Local Market Opportunity (patient demand, treatment gap, competitors' weak spots)
3) Competitive Landscape (name each local competitor, their rating, their weaknesses based on reviews, and how to position against them)
4) Key Talking Points (5 numbered conversation starters specific to this clinic's situation)
5) Anticipated Objections & Responses (table format)
6) Recommended Next Steps for LivForMor to win this clinic as a client"
```

Save output as `01_briefing_doc.md`.

---

### Step 3.2 — Deep Research Report (`02_deep_research_report.md`)

```
mcp: notebook_query
notebook_id: {notebook_id}
query: "Write a deep research report on the macro market trends affecting {services} clinics in {city_state} and the United States over the next 2 years. Include: a table of the top 10 most important sources discovered (Source Name | Why It Matters), followed by 5 major theme summaries. Quantify the market opportunity with real dollar figures and growth rates where possible."
```

Save output as `02_deep_research_report.md`.

---

### Step 3.3 — Competitive Intelligence (`03_competitive_intel.md`)

```
mcp: notebook_query
notebook_id: {notebook_id}
query: "Create a competitive intelligence cheat sheet for {clinic_name} in {city_state}. Format as:
TOP 3 COMPETITOR VULNERABILITIES (each with bold headline, 3-4 bullet points of evidence from reviews/data, and a 'LivForMor Angle' recommendation)
Then: MARKET NUMBERS TO USE IN THE SALES CALL — list 7-10 specific statistics with dollar signs and percentages that will create urgency with the clinic owner."
```

Save output as `03_competitive_intel.md`.

---

### Step 3.4 — Market Infographic (`04_market_infographic.png`)

```
mcp: studio_create
notebook_id: {notebook_id}
artifact_type: "infographic"
orientation: "portrait"
detail_level: "detailed"
confirm: true
```

Poll `studio_status` until complete, then download:

```
mcp: download_artifact
notebook_id: {notebook_id}
artifact_type: "infographic"
output_path: "{prep_folder}/04_market_infographic.png"
```

> If infographic generation fails, skip and note it in INDEX. Dashboard will still work.

---

### Step 3.5 — Audio Briefing Podcast (`audio_briefing.mp3`)

```
mcp: studio_create
notebook_id: {notebook_id}
artifact_type: "audio"
audio_format: "brief"
audio_length: "short"
confirm: true
```

Poll `studio_status` until complete, then download:

```
mcp: download_artifact
notebook_id: {notebook_id}
artifact_type: "audio"
output_path: "{prep_folder}/audio_briefing.mp3"
```

> If audio is still processing after 5 minutes, move on and note "audio generating" in INDEX.

---

### Step 3.6 — Knowledge Quiz (`06_pre_call_quiz.md`)

```
mcp: studio_create
notebook_id: {notebook_id}
artifact_type: "quiz"
question_count: 8
difficulty: "medium"
confirm: true
```

Download as markdown:

```
mcp: download_artifact
artifact_type: "quiz"
output_path: "{prep_folder}/06_pre_call_quiz.md"
output_format: "markdown"
```

---

### Step 3.7 — Flashcards (`07_flashcards.md`)

```
mcp: studio_create
notebook_id: {notebook_id}
artifact_type: "flashcards"
difficulty: "medium"
confirm: true
```

Download as markdown:

```
mcp: download_artifact
artifact_type: "flashcards"
output_path: "{prep_folder}/07_flashcards.md"
output_format: "markdown"
```

**Fallback:** If fewer than 8 Q&A pairs in the output, run this supplementary query:

```
mcp: notebook_query
query: "Generate 10 flashcard-style Q&A pairs covering the most important facts a salesperson should memorize before calling {contact_name} at {clinic_name}. Format each as 'Q: [question]' on one line and 'A: [answer]' on the next."
```

Append to `07_flashcards.md`.

---

---

## Phase 4: Index File

Create `00_INDEX.md`:

```markdown
# Clinic Intelligence Package: {clinic_name}
**Generated:** {timestamp}
**Contact:** {contact_name}
**Location:** {city_state}
**Services:** {services}

## Files
| # | File | Description |
|---|------|-------------|
| 1 | 01_briefing_doc.md | Executive pre-call briefing |
| 2 | 02_deep_research_report.md | Deep research + source table |
| 3 | 03_competitive_intel.md | Competitor vulnerabilities + market stats |
| 4 | 04_market_infographic.png | Visual market landscape |
| 5 | 06_pre_call_quiz.md | Knowledge test (8 questions) |
| 6 | 07_flashcards.md | Rapid-review flashcards |
| 7 | audio_briefing.mp3 | AI audio briefing |
| 8 | index.html | Interactive dashboard |

## NotebookLM
- **Notebook:** Clinic Intel - {clinic_name}
- **Sources analyzed:** [number from deep research]

## How to Use
1. Open `index.html` in your browser for the full interactive experience
2. Or run `python3 -m http.server 8888` and visit localhost:8888
3. Listen to `audio_briefing.mp3` while commuting
```

---

---

## Phase 5: HTML Dashboard (`index.html`)

Build a single `index.html` file inside the prep folder. Requirements:

### Structure
- **Navbar**: "LivForMor OS" logo/branding, clinic name badge, meeting date, Export PDF button
- **Header**: Clinic name + city as hero, subtitle ("Pre-Call Intelligence Report"), embedded audio player with animated visualizer bars
- **Sidebar**: 6 tabs — Executive Briefing | Competitive Intel | Deep Research | Knowledge Test | Flashcards | Market Infographic
- **Content area**: Dynamic tab rendering

### Implementation Details

**Tabs 1–3 (Briefing, Intel, Research):** Store raw markdown in `<script type="text/markdown" id="md-briefing">` etc. blocks. Use marked.js CDN to parse and inject into the content div on tab click.

**Quiz tab:** Interactive, not markdown. Build with:
- Clickable answer options (radio-style)
- Green ✓ on correct, Red ✗ on wrong with correct answer revealed
- Score counter after all 8 questions answered
- Parse questions from `06_pre_call_quiz.md` content (embed inline)

**Flashcards tab:** Interactive, not markdown. Build with:
- 3D CSS flip animation (`perspective` + `rotateY(180deg)`)
- Front: LivForMor purple gradient — Question
- Back: Gold accent — Answer
- Left/right arrow navigation + card counter + progress dots
- Parse from `07_flashcards.md` (embed inline)

**Infographic tab:** Render with `<img src="04_market_infographic.png">` — never via markdown parser.

**Audio player:** `<audio>` element for `audio_briefing.mp3` with play/pause button and animated CSS visualizer bars.

### Styling Requirements
```
Background:    #08080c
Primary:       #6B2FA0  (LivForMor purple)
Accent:        #D4AF37  (LivForMor gold)
Glass panels:  backdrop-filter: blur(10px), rgba(255,255,255,0.05) background
Font:          Inter (Google Fonts)
Icons:         Font Awesome 6 (CDN)
```

Additional:
- Smooth tab transitions (opacity + translateY)
- Hover states on all interactive elements
- Scrollable content area (sidebar stays fixed)
- Mobile-friendly layout (sidebar collapses on small screens)
- Print/Export button triggers `window.print()` with print-specific CSS

---

---

# 📐 Constraints & Principles

### 🛑 NO SCRAPING SHORTCUTS
Never substitute Apify. If the spec says Apify, use Apify. If the codebase already has a working Apify integration (like in `generate-research-report/index.ts`), reuse it. Do not replace with Jina, Firecrawl, or any other service. Apify is required to get rich competitor and review data, not just raw homepage text.

### 🛑 DASHBOARD RENDERING
Supabase Storage does NOT render HTML files. They must be served through a Vercel route. Always serve the dashboard via a proper React/Vercel route (e.g. `src/pages/DashboardViewer.jsx` rendering inside an iframe pointing to Supabase storage URL) instead of linking directly to Supabase storage.

### 🔴 Batch Imports — Non-Negotiable

Never import 100+ deep research sources at once. Always in chunks of 20. Wait 3 seconds between batches.

### 🟡 Fail Gracefully
- Missing infographic → skip, note in INDEX, dashboard tab shows "Generating..." message
- Audio still processing → skip, note in INDEX, tab shows "Audio coming soon..."
- Thin flashcards → auto-run fallback query, append to file

### 🎨 Aesthetics Are Non-Negotiable
Dashboard must feel premium. Purple + gold on dark. Glassmorphism everywhere. Animated. This is what we show a clinic owner if they ever ask "what do you do before calling us?" — it should be jaw-dropping.

### 🔐 Data Isolation
Each clinic = its own NotebookLM notebook. Never reuse across clients.

### 📁 Output Folder → Desktop by default
Create the folder at `~/Desktop/Clinic Intel - {clinic_name}/`
unless a different path is specified.

---

# 📋 MCP Tools Reference

| Tool | Phase | Purpose |
|------|-------|---------|
| `notebook_create` | 1 | Create isolated clinic notebook |
| `source_add (text)` | 1 | Inject synthesized clinic profile |
| `source_add (url)` | 1 | Add scraped site + news URLs |
| `research_start` | 2 | Trigger deep web research |
| `research_status` | 2 | Poll until research completes |
| `research_import` | 2 | Batch-import discovered sources (chunks of 20) |
| `notebook_query` | 3 | Generate briefing, intel, research docs |
| `studio_create` | 3 | Generate audio, infographic, quiz, flashcards |
| `download_artifact` | 3 | Download audio + infographic + quiz + flashcards |
