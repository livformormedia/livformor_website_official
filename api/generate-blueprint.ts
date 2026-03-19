// Blueprint Generation API Route — Vercel Serverless Function
// Migrated from Supabase Edge Function for 300s timeout (Pro plan)
// Pipeline: Website scrape + PageSpeed + Competitors + Ad Library + Claude → Supabase Storage

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Vercel Pro: allow up to 300 seconds for the full pipeline
export const config = {
  maxDuration: 300,
};

// ---------------------------------------------------------------------------
// Helper: Follow redirects to resolve the final URL (for PageSpeed, etc.)
// ---------------------------------------------------------------------------
async function resolveRedirects(url: string): Promise<string> {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return res.url || url;
  } catch {
    // If HEAD fails, try GET
    try {
      const res = await fetch(url, { redirect: 'follow' });
      const finalUrl = res.url || url;
      // Consume the body to avoid memory leaks
      await res.text().catch(() => {});
      return finalUrl;
    } catch {
      return url; // Fall back to original URL
    }
  }
}

// ---------------------------------------------------------------------------
// Helper: Run an Apify actor synchronously and return the dataset items.
// ---------------------------------------------------------------------------
async function runApifyActorSync(
  actorId: string,
  input: Record<string, unknown>,
  apifyToken: string,
  timeoutSecs = 60
): Promise<unknown[]> {
  const url = `https://api.apify.com/v2/acts/${encodeURIComponent(actorId)}/run-sync-get-dataset-items?token=${apifyToken}&timeout=${timeoutSecs}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Apify actor ${actorId} failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<unknown[]>;
}

// ---------------------------------------------------------------------------
// Helper: Extract readable text from a website via Apify website-content-crawler.
// ---------------------------------------------------------------------------
async function extractWebsiteText(url: string, apifyToken: string): Promise<string> {
  try {
    console.log(`Extracting website text via Apify website-content-crawler: ${url}`);
    const items = await runApifyActorSync(
      "apify/website-content-crawler",
      {
        startUrls: [{ url }],
        maxCrawlPages: 5,
        crawlerType: "playwright",
        saveMarkdown: true,
      },
      apifyToken,
      90
    );

    if (!items || items.length === 0) {
      return "Website scrape returned no content.";
    }

    const combined = (items as Array<Record<string, unknown>>)
      .map((item) => {
        const title = item.title ?? "";
        const text = item.markdown ?? item.text ?? item.html ?? "";
        return `### ${title}\n${text}`;
      })
      .join("\n\n---\n\n");

    return combined.substring(0, 15000);
  } catch (err) {
    console.error("Apify website-content-crawler error:", err);
    return `Website extraction failed: ${(err as Error).message}`;
  }
}

// ---------------------------------------------------------------------------
// Helper: Scrape local competitors via Apify Google Places crawler.
// ---------------------------------------------------------------------------
async function scrapeLocalCompetitors(
  searchQuery: string,
  apifyToken: string
): Promise<string> {
  try {
    console.log(`Scraping Google Maps competitors: "${searchQuery}"`);
    const items = await runApifyActorSync(
      "compass/crawler-google-places",
      {
        searchStringsArray: [searchQuery],
        maxCrawledPlacesPerSearch: 5,
        language: "en",
        maxReviews: 3,
      },
      apifyToken,
      120
    );

    if (!items || items.length === 0) {
      return "No local competitors found via Google Maps.";
    }

    return (items as Array<Record<string, unknown>>)
      .map((p) => {
        const reviews = Array.isArray(p.reviews)
          ? (p.reviews as Array<Record<string, unknown>>)
              .map((r) => `- "${r.text}"`)
              .join("\n")
          : "No reviews available.";

        return (
          `**${p.title}**\n` +
          `Rating: ${p.totalScore ?? "N/A"} ⭐ (${p.reviewsCount ?? 0} reviews)\n` +
          `Website: ${p.website ?? "None"}\n` +
          `Address: ${p.address ?? "Unknown"}\n` +
          `Top Reviews:\n${reviews}`
        );
      })
      .join("\n\n---\n\n");
  } catch (err) {
    console.error("Apify Google Maps error:", err);
    return `Competitor research failed: ${(err as Error).message}`;
  }
}

// ---------------------------------------------------------------------------
// Helper: Extract Facebook page URL/name from scraped website text.
// ---------------------------------------------------------------------------
function extractFacebookUrl(websiteText: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([A-Za-z0-9._-]{3,})\/?(?:\?[^\s"')]*)?/gi,
  ];

  for (const pattern of patterns) {
    const matches = websiteText.matchAll(pattern);
    for (const match of matches) {
      const pageName = match[1];
      const skip = [
        "sharer", "share", "dialog", "plugins", "tr", "ads",
        "login", "groups", "events", "marketplace", "watch",
        "hashtag", "stories", "reels", "flx", "privacy",
        "policies", "help", "settings", "pages",
      ];
      if (!skip.includes(pageName.toLowerCase())) {
        return pageName;
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Helper: Find a Facebook page by business name via Google Search fallback.
// ---------------------------------------------------------------------------
async function findFacebookPage(
  businessName: string,
  cityState: string,
  apifyToken: string
): Promise<string | null> {
  try {
    console.log(`🔍 Searching Google for Facebook page: "${businessName} ${cityState}"`);
    const items = await runApifyActorSync(
      "apify/google-search-scraper",
      {
        queries: `"${businessName}" ${cityState} site:facebook.com`,
        maxPagesPerQuery: 1,
        resultsPerPage: 3,
      },
      apifyToken,
      30
    );

    if (!items || items.length === 0) return null;

    for (const item of items as Array<Record<string, unknown>>) {
      const results = (item.organicResults || []) as Array<Record<string, string>>;
      for (const r of results) {
        const url = r.url || "";
        const fbMatch = url.match(/facebook\.com\/([A-Za-z0-9._-]{3,})\/?/);
        if (fbMatch) {
          const pageName = fbMatch[1];
          const skip = ["pages", "sharer", "groups", "events", "help", "login"];
          if (!skip.includes(pageName.toLowerCase())) {
            console.log(`✅ Found Facebook page via Google: ${pageName}`);
            return pageName;
          }
        }
      }
    }
    return null;
  } catch (err) {
    console.error("Facebook page search failed:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Helper: Scrape active ads from Meta Ad Library for a given Facebook page.
// ---------------------------------------------------------------------------
async function scrapeMetaAdLibrary(
  facebookPageName: string,
  apifyToken: string
): Promise<string> {
  try {
    console.log(`📢 Scraping Meta Ad Library for: ${facebookPageName}`);
    const adLibraryUrl = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=page&view_all_page_id=${facebookPageName}`;

    const items = await runApifyActorSync(
      "apify/facebook-ads-scraper",
      {
        urls: [{ url: adLibraryUrl }],
        maxItems: 10,
        scrapeAdDetails: true,
      },
      apifyToken,
      60
    );

    if (!items || items.length === 0) {
      return `ZERO_ADS: No active ads found for Facebook page "${facebookPageName}". Zero Active Ad Spend Detected on Meta.`;
    }

    const activeAds = (items as Array<Record<string, unknown>>).filter(
      (ad) => ad.isActive === true
    );

    const adSummaries = activeAds.slice(0, 5).map((ad, i) => {
      const snapshot = ad.snapshot as Record<string, unknown> | undefined;
      const body = (snapshot?.body as Record<string, string>)?.text || "No copy";
      const ctaText = (snapshot?.ctaText as string) || "None";
      const displayFormat = (snapshot?.displayFormat as string) || "Unknown";
      const platforms = (ad.publisherPlatform as string[])?.join(", ") || "Unknown";
      const startDate = ad.startDateFormatted as string || "Unknown";

      return `Ad #${i + 1}:\n- Format: ${displayFormat}\n- Platforms: ${platforms}\n- Hook/Copy: "${body.substring(0, 200)}"\n- CTA: ${ctaText}\n- Running Since: ${startDate}`;
    });

    return `ACTIVE_ADS: ${activeAds.length} active ads found.\n\n${adSummaries.join("\n\n")}`;
  } catch (err) {
    console.error("Meta Ad Library scrape failed:", err);
    return `AD_SCRAPE_FAILED: Could not retrieve ad data: ${(err as Error).message}`;
  }
}

// ---------------------------------------------------------------------------
// Helper: Full Facebook discovery cascade.
// ---------------------------------------------------------------------------
async function discoverFacebookPage(
  websiteText: string,
  competitorName: string,
  cityState: string,
  apifyToken: string
): Promise<string | null> {
  const fromWebsite = extractFacebookUrl(websiteText);
  if (fromWebsite) {
    console.log(`✅ Facebook page found in website: ${fromWebsite}`);
    return fromWebsite;
  }

  const fromGoogle = await findFacebookPage(competitorName, cityState, apifyToken);
  if (fromGoogle) return fromGoogle;

  console.log(`⚠️ No Facebook page found for "${competitorName}"`);
  return null;
}

// ---------------------------------------------------------------------------
// Helper: Fast location extraction using Claude Haiku 4.
// ---------------------------------------------------------------------------
async function extractLocationFromText(
  text: string,
  openrouterKey: string
): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openrouterKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4",
      max_tokens: 50,
      messages: [
        {
          role: "system",
          content:
            "You are a location extractor. Extract ONLY the City and State (or City and Country if outside the US) from the website text provided. Reply in the format: 'City, ST'. If you cannot determine the location, reply exactly: UNKNOWN",
        },
        {
          role: "user",
          content: text.substring(0, 6000),
        },
      ],
    }),
  });

  if (!res.ok) return "UNKNOWN";

  const data = await res.json();
  return (data.choices?.[0]?.message?.content ?? "UNKNOWN").trim();
}

// ---------------------------------------------------------------------------
// Main handler — Vercel Serverless Function
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Defensive: handle both object body (application/json) and string body (text/plain)
    let payload = req.body || {};
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); } catch { payload = {}; }
    }

    // Support both direct frontend payload and GHL Webhook structure
    const firstName = payload.firstName || payload.first_name || "Doctor";
    const lastName = payload.lastName || payload.last_name || "";
    const email = payload.email || "";
    const website = payload.website || payload.customData?.website || "";
    const clinicOperational = payload.clinicOperational || "Yes";
    const services: string[] = payload.services || ["TMS / Ketamine"];
    const monthlyBudget = payload.monthlyBudget || "Unknown";
    const teamStructure = payload.teamStructure || "Unknown";
    const contactId = payload.contact_id || payload.id || null;
    const cityState = payload.cityState || payload.city_state || "";

    console.log(`🚀 Starting Research Pipeline: ${firstName} ${lastName} — ${website}`);

    // ----- API Keys -----
    const apifyKey = process.env.APIFY_API_TOKEN || "";
    const ghlApiKey = process.env.GHL_API_TOKEN || "";
    const openrouterKey = process.env.OPENROUTER_API_KEY || "";
    const mapsKey = process.env.GOOGLE_MAPS_API_KEY || "";
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!openrouterKey) throw new Error("Missing OPENROUTER_API_KEY");
    if (!apifyKey) throw new Error("Missing APIFY_API_TOKEN");

    let websiteData = "No website provided.";
    let pageSpeedData = "No PageSpeed data available.";
    let competitorsData = "No competitor data available.";
    let adLibraryData = "No Meta Ad Library data available.";
    let locationInfer = cityState || "";

    // ------------------------------------------------------------------
    // PHASE 1: Website Extraction via Apify + PageSpeed (parallel)
    // ------------------------------------------------------------------
    if (website) {
      const rawUrl = website.startsWith("http") ? website : `https://${website}`;

      // Resolve redirects first so PageSpeed gets the final URL
      console.log(`🔗 Resolving redirects for: ${rawUrl}`);
      const targetUrl = await resolveRedirects(rawUrl);
      console.log(`🔗 Final URL: ${targetUrl}`);

      console.log("⚙️  Phase 1: Apify website extraction + PageSpeed...");
      const [websiteResult, speedRes] = await Promise.allSettled([
        extractWebsiteText(targetUrl, apifyKey),
        fetch(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
            targetUrl
          )}&strategy=mobile&category=PERFORMANCE&category=SEO${mapsKey ? `&key=${mapsKey}` : ""}`
        ),
      ]);

      if (websiteResult.status === "fulfilled") {
        websiteData = websiteResult.value;
        console.log(`✅ Website extracted — ${websiteData.length} chars`);
      } else {
        console.error("Website extraction failed:", websiteResult.reason);
        websiteData = "Website extraction failed.";
      }

      if (speedRes.status === "fulfilled" && speedRes.value.ok) {
        const speedJson = await speedRes.value.json();
        const perfScore = Math.round(
          (speedJson.lighthouseResult?.categories?.performance?.score ?? 0) * 100
        );
        const seoScore = Math.round(
          (speedJson.lighthouseResult?.categories?.seo?.score ?? 0) * 100
        );
        const speedIndex = speedJson.lighthouseResult?.audits?.["speed-index"]?.displayValue ?? "Unknown";
        const fcp = speedJson.lighthouseResult?.audits?.["first-contentful-paint"]?.displayValue ?? "Unknown";
        const lcp = speedJson.lighthouseResult?.audits?.["largest-contentful-paint"]?.displayValue ?? "Unknown";

        let bleedingNeck = "";
        const loadTimeSecs = parseFloat(speedIndex);
        if (!isNaN(loadTimeSecs) && loadTimeSecs > 2.5) {
          bleedingNeck = `\n⚠️ BLEEDING NECK: Mobile load time is ${speedIndex} — over the 2.5s threshold. Every dollar spent on Meta ads is partially wasted because visitors bounce before the page even loads. At a 53% bounce rate (Google's measured rate for pages >3s), roughly HALF of all paid traffic is leaving without seeing the offer.`;
        }

        pageSpeedData = `Mobile Performance Score: ${perfScore}/100\nMobile SEO Score: ${seoScore}/100\nMobile Load Time (Speed Index): ${speedIndex}\nFirst Contentful Paint: ${fcp}\nLargest Contentful Paint: ${lcp}${bleedingNeck}`;
        console.log(`✅ PageSpeed: Perf ${perfScore}, SEO ${seoScore}, Speed Index ${speedIndex}, FCP ${fcp}, LCP ${lcp}`);
      }

      // ------------------------------------------------------------------
      // PHASE 2: Location Extraction → Competitor Research via Apify Maps
      // ------------------------------------------------------------------
      if (websiteData.length > 80) {
        if (!locationInfer) {
          console.log("⚙️  Phase 2: Extracting location via Claude Haiku 4...");
          locationInfer = await extractLocationFromText(websiteData, openrouterKey);
          console.log(`📍 Location inferred: ${locationInfer}`);
        } else {
          console.log(`📍 Location provided directly: ${locationInfer}`);
        }

        if (locationInfer && locationInfer !== "UNKNOWN") {
          const isExoMind = services.some(s => s.toLowerCase().includes('exomind'));

          if (isExoMind) {
            // ExoMind-specific competitor searches — neurofeedback & brain optimization landscape
            console.log("🧠 ExoMind detected — searching for neurofeedback/brain optimization competitors...");
            const exomindSearches = [
              `neurofeedback clinic near ${locationInfer}`,
              `brain optimization center near ${locationInfer}`,
              `executive wellness clinic near ${locationInfer}`,
            ];

            const searchResults = await Promise.allSettled(
              exomindSearches.map(q => {
                console.log(`🔍 Google Maps search: "${q}"`);
                return scrapeLocalCompetitors(q, apifyKey);
              })
            );

            const allResults = searchResults
              .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled" && r.value !== "No local competitors found via Google Maps.")
              .map(r => r.value);

            competitorsData = allResults.length > 0
              ? allResults.join("\n\n---\n\n")
              : "No local competitors found via Google Maps.";

            console.log("✅ ExoMind competitor data gathered via Apify Google Maps.");
          } else {
            // Standard ketamine/TMS/Spravato competitor search
            const serviceExpansions: Record<string, string> = {
              kap: "ketamine therapy",
              tms: "TMS therapy",
              spravato: "Spravato clinic",
            };
            const expandedService = serviceExpansions[services[0]?.toLowerCase()] || services[0] || "mental health clinic";
            const searchQuery = `${expandedService} near ${locationInfer}`;
            console.log(`🔍 Google Maps search: "${searchQuery}"`);
            competitorsData = await scrapeLocalCompetitors(searchQuery, apifyKey);
            console.log("✅ Competitor data gathered via Apify Google Maps.");
          }
        }
      }
    }

    // ------------------------------------------------------------------
    // PHASE 2.5: Facebook Discovery + Meta Ad Library Scrape
    // ------------------------------------------------------------------
    {
      const clinicName = `${firstName} ${lastName}`.trim();
      const cityForSearch = locationInfer || cityState || "";

      console.log("⚙️  Phase 2.5: Facebook Discovery + Ad Library Scrape...");
      const fbPage = await discoverFacebookPage(
        websiteData,
        clinicName,
        cityForSearch,
        apifyKey
      );

      if (fbPage) {
        adLibraryData = await scrapeMetaAdLibrary(fbPage, apifyKey);
        console.log(`✅ Ad Library data gathered for: ${fbPage}`);
      } else {
        adLibraryData = "ZERO_ADS: No Facebook page could be found for this clinic. Zero social media advertising presence detected.";
        console.log("⚠️ No Facebook page found — Ad Library skipped.");
      }
    }

    // ------------------------------------------------------------------
    // PHASE 3: Generate Blueprint with Claude Sonnet 4
    // ------------------------------------------------------------------
    console.log("🧠  Phase 3: Generating Blueprint with Claude Sonnet 4...");

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const isExoMind = services.some(s => s.toLowerCase().includes('exomind'));

    const systemPrompt = isExoMind
      ? // ================================================================
        // EXOMIND-SPECIFIC BLUEPRINT PROMPT
        // ================================================================
        `You are an elite performance marketing strategist working for LivForMor Media — the #1 patient acquisition agency for premium brain optimization clinics.

Your mission: Write a high-impact "ExoMind Market Intelligence Report" that will make the clinic owner's jaw drop. This is not a generic report — it is a PERSONALIZED COMPETITIVE ANALYSIS built entirely from the real data provided below.

CRITICAL CONTEXT: ExoMind is a premium, FDA-cleared neurostimulation protocol that targets high-performing individuals — CEOs, executives, founders, and professionals who want cognitive optimization, not just mental health treatment. ExoMind patients are cash-pay ($3,000–$6,000 per protocol). They are NOT the same audience as ketamine or TMS patients. Do NOT compare this clinic to ketamine or TMS providers — those are NOT competitors.

CURRENT DATE: ${currentDate}

## STRICT RULES:
1. NEVER mention any clinic name, city, or state that was not provided in the CLINIC OWNER DATA.
2. If competitor data contains businesses from other states, IGNORE them completely.
3. NEVER write anything that sounds like a sales pitch for LivForMor.
4. NEVER mention "livformor", "strategy call", "options", "packages", pricing, or dollar amounts for our services.
5. NEVER include a "book a call" or "strategy session" call to action.
6. NEVER claim that website content is missing if the SCRAPED DATA shows it IS present.
7. All date references must use the CURRENT DATE provided above. Never reference past years or months.
8. BANNED TERMS for Meta paid traffic: "lookalike audience", "interest targeting", "custom audience", "detailed targeting". Meta now uses Advantage+ AI-driven campaigns.
9. ExoMind's TRUE competitors are: neurofeedback clinics, brain optimization centers, executive wellness programs, biohacking centers, and cognitive performance clinics. NEVER compare to ketamine, TMS, or Spravato clinics.
10. NEVER use the phrases "unable to verify", "data limitation", "scraping limitations", "unable to access", "without complete content access", or "could not be verified". If data is thin or missing for a section, write your analysis based on whatever data IS available. If competitor data is unavailable, analyze the NATIONAL competitive landscape for their service type and provide actionable positioning advice. Never admit data gaps to the reader.
11. REVENUE GUARDRAIL: ExoMind protocol value is $3,000–$6,000. NEVER cite patient values above $6,000. Use $4,500 as the average for all revenue calculations. Maximum reasonable monthly revenue projection = 15 patients × $4,500 = $67,500.

Apply the copywriting principles of Eugene Schwartz (market sophistication), Gary Halbert (emotional triggers), and Gary Bencivenga (proof-driven persuasion). Every section must:
- Reference SPECIFIC data from the website scrape or competitor research
- Quantify the opportunity cost of inaction (money left on the table every day)
- Use professional headers, bullet points, and bold text for scannability

---

CLINIC OWNER DATA:
Name: ${firstName} ${lastName}
Email: ${email}
Website: ${website}
Services Offered: ${services.join(", ")}
Clinic Status: ${clinicOperational}
Monthly Marketing Budget: ${monthlyBudget}
Team Structure: ${teamStructure}

TECHNICAL AUDIT:
${pageSpeedData}

LOCAL NEUROFEEDBACK & BRAIN OPTIMIZATION COMPETITORS IN ${locationInfer || "their market"}:
${competitorsData}

META AD LIBRARY INTELLIGENCE:
${adLibraryData}

CLINIC WEBSITE CONTENT (Scraped):
${websiteData.substring(0, 12000)}

---

OUTPUT REQUIREMENTS — Write the full report in Markdown. Include ALL 5 sections below. Write comprehensive, specific content for each.

FORMATTING RULES:
- Keep markdown clean and scannable. Use short paragraphs (2-3 sentences max).
- Use single-level bullets. Never nest more than one level deep.
- Use blockquotes (> ) for key insights, opportunity callouts, and important data points.
- Use ### headings for sub-sections within each section.
- Use --- horizontal rules between major sections.
- Use **bold** for emphasis, never ALL CAPS.
- Use tables for structured comparisons only.

# ExoMind Market Intelligence Report
## Prepared by LivForMor Media | Exclusively for ${firstName} ${lastName}

---

## 1. 🔍 Executive Summary & Market Opportunity

Write 3-4 punchy paragraphs covering:
- The total addressable market for brain optimization in their city — focus on the executive/professional demographic, NOT the general mental health population
- The revenue opportunity: each ExoMind patient is worth $3,000–$6,000 per protocol. Calculate potential monthly revenue from 10-15 new patients using $4,500 as the average. Never project above $67,500/month.
- The competitive landscape gap — most neurofeedback/brain optimization clinics in their market are poorly marketed and easily outpositioned

Use a blockquote to highlight the single biggest number.

---

## 2. ⚠️ Website Teardown: What's Leaking High-Value Patients

Grade the website on 4 dimensions. For EACH grade, use this EXACT format:

### Trust & Authority: [A-F grade]
Does this website look like a premium brain optimization center that a CEO would trust with their cognition? Or does it look like a generic mental health clinic? Reference SPECIFIC elements from the website.
- **What's Working:** bullet points of strengths (if any)
- **What's Broken:** bullet points of weaknesses
- **Fix It Now:** The single most impactful action

### Speed: [A-F grade]
Use the REAL data from the TECHNICAL AUDIT section above. Report the exact Mobile Load Time, Performance Score, FCP, and LCP — do NOT guess these numbers.
- **Mobile Load Time:** [exact Speed Index value from data]
- **Performance Score:** [exact score from data]/100
- **First Contentful Paint:** [exact FCP from data]
If the Speed Index is above 2.5 seconds, this is a "Bleeding Neck" — explain that executives will not wait for slow websites.
- **What's Working:** any speed strengths
- **What's Broken:** specific speed issues with exact numbers
- **Fix It Now:** The single most impactful speed optimization

### SEO & Discoverability: [A-F grade]
(same structure — focus on whether they rank for "neurofeedback", "brain optimization", "ExoMind" + their city)

### Executive-Ready Positioning: [A-F grade]
Does the website speak to busy professionals and high-achievers, or does it read like a generic health clinic? Is the language aspirational (performance, edge, optimization) or clinical (treatment, disorder, symptoms)?
- Grade based on whether an executive would see this and think "this is for me"

After all 4 grades, add:
### 🚨 The #1 Critical Fix for Today
One paragraph describing the single most impactful change.

---

## 3. 🏆 Competitive Landscape & Ad Intelligence

Analyze the local neurofeedback/brain optimization market using the competitor data provided.

### Their Current Ad Strategy
- **Active Ad Count:** Report the exact number of active ads found. If ZERO_ADS, explain the opportunity: "You have ZERO paid ad presence. In a market where your competitors are [describe competitor ad activity], you are invisible to the highest-value patients searching for brain optimization."
- **Creative Analysis:** If ads ARE running, analyze the messaging. Are they positioning as premium/executive or generic/clinical?

### Local Competitive Landscape
Show a table with ONLY competitors from the SAME STATE/REGION:

| Competitor | Type | Rating | Reviews | Positioning | Exploitable Weakness |
|---|---|---|---|---|---|

After the table, write 2-3 blockquote callouts highlighting opportunities:
> **Market Gap:** [Describe specific positioning gaps no competitor is filling — e.g., none of them target executives specifically, none have premium branding, etc.]

---

## 4. 🗺️ The ExoMind Patient Acquisition Blueprint (60-Day Plan)

### Week 1-2: Premium Positioning & Quick Wins (Zero Ad Spend)
Bullet list of 5-7 actions specific to ExoMind: Google Business Profile optimization for brain optimization keywords, executive-focused website copy updates, LinkedIn authority content, case study development, partnership outreach to executive coaches / corporate wellness programs.

### Week 3-4: Paid Traffic Launch

#### Native Advertising (Taboola/Outbrain)
ExoMind's ideal patients read Forbes, Bloomberg, WSJ, and Entrepreneur. Native ads that look like editorial content in these reading environments outperform social ads for this demographic. Include a table:

| Target Persona | Ad Angle | Sample Headline | Landing Page |
|---|---|---|---|
| CEO with brain fog | Performance gap | "The protocol Silicon Valley execs use to stay sharp after 50" | VSL training page |
| Founder burning out | Recovery without weakness | "Burnout is a brain problem, not a willpower problem" | Educational content |
| Executive post-concussion | Transformation | "From forgetting meetings to running a $50M company" | Case study page |
| Biohacker/optimizer | Science-first | "Why 6 ExoMind sessions outperform 40 neurofeedback sessions" | Comparison page |

#### Meta Ads — Advantage+ Strategy
Use Advantage+ campaigns. Focus on transformation stories from high-performers, NOT clinical depression narratives.

#### Google Ads — High-Intent Search
Target "ExoMind near me", "neurofeedback for executives", "brain optimization [city]", "cognitive performance clinic". These are premium-intent searches with high conversion potential.

### Week 5-8: Executive Referral Network & Nurture
LinkedIn outreach to executive coaches, corporate wellness departments. Email sequence focused on performance and ROI (not treatment/healing language). Retargeting ads for website visitors.

### KPIs & Success Metrics
Show targets at Week 2, Week 4, and Week 8.

---

## 5. 🚀 The Cost of Waiting
- Calculate the specific daily revenue they are losing. At $4,500 average patient value, every missed patient = $4,500 gone. Use conservative math.
- Reference one competitor vulnerability that may close soon.
- Then end the ENTIRE report with EXACTLY this text and ABSOLUTELY NOTHING after it:

"Every day you wait is another day your competitors capture the patients who should be yours. For more in-depth strategies, breakdowns, and patient acquisition playbooks, watch our training videos on YouTube: https://www.youtube.com/@orielmor-livformormedia"

---
END OF REPORT`
      : // ================================================================
        // STANDARD KETAMINE/TMS/SPRAVATO BLUEPRINT PROMPT (unchanged)
        // ================================================================
        `You are an elite, direct-response healthcare marketer and copywriter working for LivForMor Media — the #1 patient acquisition agency for ketamine, TMS, and Spravato clinics.

Your mission: Write a high-impact "Patient Acquisition Blueprint" that will make the clinic owner's jaw drop. This is not a generic report — it is a PERSONALIZED BATTLE PLAN built entirely from the real data provided below.

CURRENT DATE: ${currentDate}

## STRICT RULES:
1. NEVER mention any clinic name, city, or state that was not provided in the CLINIC OWNER DATA.
2. If competitor data contains businesses from other states, IGNORE them completely.
3. NEVER write anything that sounds like a sales pitch for LivForMor.
4. NEVER mention "livformor", "strategy call", "options", "packages", pricing, or dollar amounts for our services.
5. NEVER include a "book a call" or "strategy session" call to action.
6. NEVER claim that website content is missing if the SCRAPED DATA shows it IS present. For example, if team photos or provider bios appear in the scraped data, do NOT say they are missing.
7. All date references must use the CURRENT DATE provided above. Never reference past years or months.
8. BANNED TERMS for Meta paid traffic: "lookalike audience", "interest targeting", "custom audience", "detailed targeting". Meta now uses Advantage+ AI-driven campaigns — advise accordingly.
9. NEVER use the phrases "unable to verify", "data limitation", "scraping limitations", "unable to access", "without complete content access", or "could not be verified". If data is thin or missing for a section, write your analysis based on whatever data IS available. If competitor data is unavailable, analyze the NATIONAL competitive landscape for their service type and provide actionable positioning advice. Never admit data gaps to the reader.
10. REVENUE GUARDRAIL: Ketamine patient protocol value is $2,500–$4,000 (6-session protocol). TMS patient value is $6,000–$12,000. Spravato patient value is $4,000–$8,000. NEVER cite individual patient values above these ranges. Use conservative averages for all revenue calculations ($3,000 for ketamine, $8,000 for TMS, $5,000 for Spravato). Maximum reasonable monthly revenue projection = 20 new patients × their service average.

Apply the copywriting principles of Eugene Schwartz (market sophistication), Gary Halbert (emotional triggers), and Gary Bencivenga (proof-driven persuasion). Every section must:
- Reference SPECIFIC data from the website scrape or competitor research
- Quantify the opportunity cost of inaction (money left on the table every day)
- Use professional headers, bullet points, and bold text for scannability

---

CLINIC OWNER DATA:
Name: ${firstName} ${lastName}
Email: ${email}
Website: ${website}
Services Offered: ${services.join(", ")}
Clinic Status: ${clinicOperational}
Monthly Marketing Budget: ${monthlyBudget}
Team Structure: ${teamStructure}

TECHNICAL AUDIT:
${pageSpeedData}

LOCAL COMPETITORS IN ${locationInfer || "their market"}:
${competitorsData}

META AD LIBRARY INTELLIGENCE:
${adLibraryData}

CLINIC WEBSITE CONTENT (Scraped):
${websiteData.substring(0, 12000)}

---

OUTPUT REQUIREMENTS — Write the full report in Markdown. Include ALL 5 sections below. Write comprehensive, specific content for each.

FORMATTING RULES:
- Keep markdown clean and scannable. Use short paragraphs (2-3 sentences max).
- Use single-level bullets. Never nest more than one level deep.
- Use blockquotes (> ) for key insights, opportunity callouts, and important data points.
- Use ### headings for sub-sections within each section.
- Use --- horizontal rules between major sections.
- Use **bold** for emphasis, never ALL CAPS.
- Use tables for structured comparisons only.

# Patient Acquisition Blueprint
## Prepared by LivForMor Media | Exclusively for ${firstName} ${lastName}

---

## 1. 🔍 Executive Summary & Market Opportunity

Write 3-4 punchy paragraphs covering:
- The total addressable market size in their city (patient count + revenue)
- The realistic revenue gap — what they SHOULD be earning vs. what they likely are
- The #1 barrier standing between them and 3-5x more patients

Use a blockquote to highlight the single biggest number (e.g., > **You're leaving an estimated $X/month on the table.**)

---

## 2. ⚠️ Website Teardown: What's Leaking Patients & Revenue

Grade the website on 4 dimensions. For EACH grade, use this EXACT format:

### Trust: [A-F grade]
2-3 sentence explanation of why this grade was given, referencing SPECIFIC elements from their actual website.
- **What's Working:** bullet points of strengths (if any)
- **What's Broken:** bullet points of weaknesses
- **Fix It Now:** The single most impactful action to improve this grade

### Speed: [A-F grade]
Use the REAL data from the TECHNICAL AUDIT section above. Report the exact Mobile Load Time, Performance Score, FCP, and LCP — do NOT guess or hallucinate these numbers. Format:
- **Mobile Load Time:** [exact Speed Index value from data]
- **Performance Score:** [exact score from data]/100
- **First Contentful Paint:** [exact FCP from data]
If the Speed Index is above 2.5 seconds, this is a "Bleeding Neck" — explain that they are paying for Meta traffic that bounces before the page loads. At Google's measured 53% bounce rate for pages over 3 seconds, roughly HALF of their paid clicks are wasted.
- **What's Working:** any speed strengths (if score > 70)
- **What's Broken:** specific speed issues with exact numbers from the audit
- **Fix It Now:** The single most impactful speed optimization

### SEO: [A-F grade]
(same structure)

### CTA Effectiveness: [A-F grade]
(same structure)

IMPORTANT: Only flag something as "missing" if you genuinely cannot find it in the SCRAPED WEBSITE DATA above. If team photos, provider bios, testimonials ARE present, acknowledge them as strengths under "What's Working."

After all 4 grades, add:
### 🚨 The #1 Critical Fix for Today
One paragraph describing the single most impactful change they should make immediately.

---

## 3. 🏆 Competitor Intelligence & Ad X-Ray

First, analyze the clinic's OWN Meta ad activity using the META AD LIBRARY INTELLIGENCE data above:

### Their Current Ad Strategy
- **Active Ad Count:** Report the exact number of active ads found. If ZERO_ADS, state: "Zero Active Ad Spend Detected on Meta. You are currently entirely reliant on organic referrals and handing local market share directly to aggressive competitors."
- **The Hook Analysis:** If ads ARE running, quote their exact ad copy. Point out if they are violating the Alpha Omega rule by selling a "commodity" (e.g., "Get 6 Ketamine Infusions for $X") instead of a "Proprietary Protocol" or unique transformation story.
- **Creative Format:** Note whether they're running video, static images, or carousels. Video significantly outperforms static for healthcare.

Then show the competitor table with ONLY competitors from the SAME STATE:

| Clinic Name | Rating | Reviews | Critical Weakness | How to Steal Their Patients |
|---|---|---|---|---|

After the table, write 2-3 blockquote callouts highlighting the most exploitable competitor weaknesses:
> **Exploitation Opportunity:** [Competitor X] has [specific weakness from reviews]. Position yourself as [counter-positioning].

---

## 4. 🗺️ The Patient Acquisition Blueprint (60-Day Quick Win Plan)

### Week 1-2: Foundation & Quick Wins (Zero Ad Spend)
Bullet list of 5-7 specific, zero-cost actions: GBP optimization, review generation, website quick fixes. Frame everything around building a "Proprietary Protocol" — sell a named system, not a commodity treatment.

### Week 3-4: Paid Traffic Launch

#### Meta Ads — Advantage+ Strategy
Use Advantage+ campaigns ONLY. Do NOT mention lookalike audiences, interest targeting, custom audiences, or detailed targeting — those are deprecated.

Focus on EDUCATION-FIRST storytelling via story-format video ads. Include a table of diverse avatar creatives:

| Patient Condition | Ad Angle | Sample Hook | CTA |
|---|---|---|---|
| Treatment-Resistant Depression | Patient transformation story | "I tried everything for 10 years..." | Book Free Consultation |
| Postpartum Depression | Myth-busting / de-stigmatization | "You're not a bad mother..." | Learn More |
| PTSD | Education-first / science | "Your brain isn't broken..." | Watch the Video |
| OCD | Relatable metaphor | "Living with OCD feels like..." | Get Help Today |
| Anxiety Disorders | Patient story / hope | "I couldn't leave my house..." | Schedule a Call |
| Chronic Pain | De-stigmatization | "Pain isn't just physical..." | Start Your Journey |

Focus on messaging and stories, NOT targeting mechanics. Let Meta's Andromeda AI handle targeting.

#### Google Ads — High-Intent Search
Search campaigns for high-intent keywords. Set up a dedicated landing page with a 3-video pre-indoctrination sequence to educate before the call.

### Week 5-8: Patient Nurture & Reactivation
Email sequences, SMS campaigns, retargeting ads. Describe the specific sequence.

### KPIs & Success Metrics
Show targets at Week 2, Week 4, and Week 8 as bullet points.

---

## 5. 🚀 The Cost of Waiting
- Calculate the specific daily revenue they are losing right now. Use the conservative per-service averages from the REVENUE GUARDRAIL rule above. Do NOT inflate these numbers.
- Reference one competitor vulnerability that may close soon.
- Then end the ENTIRE report with EXACTLY this text and ABSOLUTELY NOTHING after it — no P.S., no expiry notice, no additional paragraphs:

"Every day you wait is another day your competitors capture the patients who should be yours. For more in-depth strategies, breakdowns, and patient acquisition playbooks, watch our training videos on YouTube: https://www.youtube.com/@orielmor-livformormedia"

---
END OF REPORT`;

    const claudeRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openrouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://livformor.com",
        "X-Title": "LivForMor Patient Acquisition Blueprint",
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4",
        max_tokens: 4096,
        messages: [
          {
            role: "system",
            content:
              "You are an elite direct-response marketing consultant for behavioral health clinics. Write with precision, authority, and specificity. Never be generic.",
          },
          {
            role: "user",
            content: systemPrompt,
          },
        ],
      }),
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      throw new Error(`OpenRouter / Claude API Error: ${errText}`);
    }

    const claudeData = await claudeRes.json();
    let markdownContent: string = claudeData.choices[0].message.content;

    // Strip accidental markdown code fence wrappers
    markdownContent = markdownContent
      .replace(/^```(markdown|md)?\n/i, "")
      .replace(/\n```$/i, "")
      .trim();

    console.log(`✅ Blueprint generated — ${markdownContent.length} chars`);

    // ------------------------------------------------------------------
    // PHASE 4: Upload Markdown to Supabase Storage
    // ------------------------------------------------------------------
    console.log("💾  Phase 4: Saving blueprint to Supabase Storage...");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const safeFirst = firstName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const fileName = `blueprint_${Date.now()}_${safeFirst}.md`;

    const { error: uploadError } = await supabaseClient.storage
      .from("blueprints")
      .upload(fileName, markdownContent, {
        contentType: "text/markdown",
        upsert: true,
      });

    if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`);

    const documentUrl = `https://www.livformor.com/blueprint?file=${encodeURIComponent(fileName)}`;
    console.log(`🔗 Blueprint URL: ${documentUrl}`);

    // ------------------------------------------------------------------
    // PHASE 5: GoHighLevel CRM Handoff
    // ------------------------------------------------------------------
    if (ghlApiKey) {
      const ghlHeaders = {
        Authorization: `Bearer ${ghlApiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      };

      let resolvedContactId = contactId;
      if (!resolvedContactId && email) {
        await new Promise((r) => setTimeout(r, 2000));
        console.log(`🔍 Phase 5: Looking up GHL contact by email: ${email}...`);
        try {
          const searchRes = await fetch(
            `https://services.leadconnectorhq.com/contacts/?locationId=MSFgME5t3cZZRgzhEnI2&query=${encodeURIComponent(email)}&limit=1`,
            { headers: ghlHeaders }
          );
          if (searchRes.ok) {
            const searchData = await searchRes.json();
            const contacts = searchData.contacts || [];
            if (contacts.length > 0) {
              resolvedContactId = contacts[0].id;
              console.log(`✅ Found contact: ${resolvedContactId}`);
            } else {
              console.log("⚠️ No GHL contact found for email:", email);
            }
          }
        } catch (lookupErr) {
          console.error("GHL contact lookup failed:", lookupErr);
        }
      }

      if (resolvedContactId) {
        console.log(`📤  Phase 5: Updating GHL contact ${resolvedContactId}...`);
        try {
          const clinicName = payload.clinicName || payload.clinic_name || "";
          const servicesStr = Array.isArray(services) ? services.join(", ") : String(services);
          const qualified = payload.qualified || "";
          const sourcePage = payload.source_page || payload.source || "";

          await Promise.all([
            fetch(`https://services.leadconnectorhq.com/contacts/${resolvedContactId}/tags`, {
              method: "POST",
              headers: ghlHeaders,
              body: JSON.stringify({ tags: ["Report_Ready"] }),
            }),
            fetch(`https://services.leadconnectorhq.com/contacts/${resolvedContactId}/notes`, {
              method: "POST",
              headers: ghlHeaders,
              body: JSON.stringify({
                body: `✅ Patient Acquisition Blueprint Ready!\n\nView Report: ${documentUrl}`,
              }),
            }),
            fetch(`https://services.leadconnectorhq.com/contacts/${resolvedContactId}`, {
              method: "PUT",
              headers: ghlHeaders,
              body: JSON.stringify({
                customFields: [
                  { id: "ZvV7CauCyceA1TxMhMyA", field_value: clinicName },
                  { id: "HBcYeuRzKJn6K7LSsjvI", field_value: cityState || locationInfer || "" },
                  { id: "qTxLTVKQa6oifnWHTCnO", field_value: clinicOperational },
                  { id: "XZvcCtBMH6JFK8QQs43c", field_value: monthlyBudget },
                  { id: "gLWZYC0HLG52oNc8ZTIs", field_value: teamStructure },
                  { id: "vzLImYEhZfyjuVmVoqD0", field_value: servicesStr },
                  { id: "N4vd5ho0j5q16XgJy6vc", field_value: qualified },
                  { id: "hoo6wFcNk0TlPvWNCFKz", field_value: sourcePage },
                  { id: "fLPKOaXKzeeYzp1L8FtK", field_value: documentUrl },
                ],
              }),
            }),
          ]);
          console.log("✅ GHL contact tagged, note attached, and custom fields populated.");
        } catch (ghlErr) {
          console.error("GHL handoff failed (non-fatal):", ghlErr);
        }
      } else {
        console.log("⏭️  Skipping GHL: Could not resolve contact ID.");
      }
    } else {
      console.log("⏭️  Skipping GHL: No API key configured.");
    }

    return res.status(200).json({ success: true, docUrl: documentUrl, fileName });
  } catch (error: any) {
    console.error("❌ Blueprint Generation Error:", error);
    return res.status(400).json({ error: error.message });
  }
}
