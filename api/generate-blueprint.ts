// Blueprint Generation API Route v2 — Two-Pass Architecture
// Pipeline: Scrape → Analyst (Haiku JSON brief) → Validate → Writer (Sonnet) → Upload
// Vercel Serverless Function with 300s max duration

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

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
    try {
      const res = await fetch(url, { redirect: 'follow' });
      const finalUrl = res.url || url;
      await res.text().catch(() => {});
      return finalUrl;
    } catch {
      return url;
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

    // Fallback: direct fetch with HTML stripping
    try {
      console.log("Falling back to direct fetch...");
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
      });
      if (!res.ok) return `Website extraction failed: ${(err as Error).message}`;
      let html = await res.text();
      html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
      html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
      html = html.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "");
      html = html.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "");
      html = html.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "");
      html = html.replace(/<[^>]+>/g, " ");
      html = html.replace(/\s+/g, " ").trim();
      const fallbackText = html.substring(0, 15000);
      if (fallbackText.length > 500) {
        console.log(`✅ Fallback extracted ${fallbackText.length} chars`);
        return fallbackText;
      }
      return `Website extraction failed: ${(err as Error).message}`;
    } catch {
      return `Website extraction failed: ${(err as Error).message}`;
    }
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
      model: "anthropic/claude-haiku-4.5",
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
// PASS 1: Analyst — Structured JSON brief from raw data (Claude Haiku)
// ---------------------------------------------------------------------------
interface AnalystBrief {
  clinic_name: string;
  contact_first_name: string;
  contact_last_name: string;
  city: string;
  state: string;
  report_type: "exomind" | "standard";
  data_quality: "full" | "partial" | "thin";
  data_gaps: string[];
  website_url: string;
  services: string[];
  website_analysis: {
    trust_grade: string;
    trust_strengths: string[];
    trust_weaknesses: string[];
    speed_grade: string;
    speed_metrics: {
      speedIndex: string;
      perfScore: number;
      fcp: string;
      lcp: string;
      seoScore: number;
    };
    bleeding_neck: boolean;
    seo_grade: string;
    seo_strengths: string[];
    seo_weaknesses: string[];
    cta_grade: string;
    cta_strengths: string[];
    cta_weaknesses: string[];
    critical_fix: string;
    key_website_features: string[];
  };
  competitors: Array<{
    name: string;
    type: string;
    rating: number;
    reviews: number;
    address: string;
    weakness: string;
    same_state: boolean;
  }>;
  ad_status: "zero_ads" | "active_ads" | "no_facebook_page" | "scrape_failed";
  ad_count: number;
  ad_details: Array<{
    format: string;
    hook: string;
    cta: string;
    platform: string;
    analysis: string;
  }>;
  revenue_calc: {
    service_type: string;
    avg_patient_value: number;
    monthly_target_patients: number;
    monthly_revenue: number;
    daily_loss: number;
  };
  market_insights: string[];
  positioning_opportunities: string[];
}

async function runAnalystPass(
  rawData: {
    firstName: string;
    lastName: string;
    website: string;
    services: string[];
    cityState: string;
    clinicOperational: string;
    monthlyBudget: string;
    teamStructure: string;
    websiteData: string;
    pageSpeedData: string;
    competitorsData: string;
    adLibraryData: string;
    locationInfer: string;
    isExoMind: boolean;
  },
  openrouterKey: string
): Promise<AnalystBrief> {
  console.log("🔬 Pass 1: Running Analyst (Claude Haiku)...");

  const analystPrompt = `You are a data analyst. Your job is to extract structured findings from raw marketing research data. Output ONLY valid JSON — no markdown, no explanation, no code fences.

Analyze ALL the data below and produce a JSON object with these exact fields:

{
  "clinic_name": "extracted from website data or use firstName + lastName's clinic",
  "contact_first_name": "${rawData.firstName}",
  "contact_last_name": "${rawData.lastName}",
  "city": "extracted city name — NEVER output UNKNOWN, empty string, or placeholder. Extract from cityState, website content, competitor addresses, or phone area codes",
  "state": "two-letter state code",
  "report_type": "${rawData.isExoMind ? 'exomind' : 'standard'}",
  "data_quality": "full if city+competitors+website+speed all present, partial if 1-2 missing, thin if 3+ missing",
  "data_gaps": ["list of what's missing, e.g. 'no_competitors', 'no_facebook_page', 'no_speed_data', 'no_city'"],
  "website_url": "${rawData.website}",
  "services": ${JSON.stringify(rawData.services)},
  "website_analysis": {
    "trust_grade": "A-F letter grade",
    "trust_strengths": ["specific things found in the scraped data that build trust"],
    "trust_weaknesses": ["specific things missing or weak — ONLY flag as missing if genuinely not in the data"],
    "speed_grade": "A-F based on perfScore: A=90+, B=70-89, C=50-69, D=30-49, F=<30",
    "speed_metrics": {
      "speedIndex": "exact value from data or 'unavailable'",
      "perfScore": 0,
      "fcp": "exact value from data or 'unavailable'",
      "lcp": "exact value from data or 'unavailable'",
      "seoScore": 0
    },
    "bleeding_neck": true if speedIndex > 2.5s,
    "seo_grade": "A-F letter grade",
    "seo_strengths": ["specific SEO strengths found"],
    "seo_weaknesses": ["specific SEO gaps"],
    "cta_grade": "A-F letter grade — for ExoMind reports, grade as 'executive_positioning' instead",
    "cta_strengths": ["specific CTA/positioning strengths"],
    "cta_weaknesses": ["specific CTA/positioning weaknesses"],
    "critical_fix": "the single most impactful thing to fix today",
    "key_website_features": ["list of notable things present on the site: team photos, testimonials, provider bios, service pages, etc."]
  },
  "competitors": [
    {
      "name": "competitor name",
      "type": "what type of clinic/business",
      "rating": 4.5,
      "reviews": 100,
      "address": "full address",
      "weakness": "specific exploitable weakness from reviews or positioning",
      "same_state": true/false
    }
  ],
  "ad_status": "zero_ads or active_ads or no_facebook_page or scrape_failed",
  "ad_count": 0,
  "ad_details": [],
  "revenue_calc": {
    "service_type": "${rawData.isExoMind ? 'ExoMind' : rawData.services[0] || 'ketamine'}",
    "avg_patient_value": ${rawData.isExoMind ? 4500 : 'calculate based on service: ketamine=3000, TMS=8000, Spravato=5000'},
    "monthly_target_patients": ${rawData.isExoMind ? '10' : '15'},
    "monthly_revenue": 0,
    "daily_loss": 0
  },
  "market_insights": ["3-5 specific insights about their local market derived from the data"],
  "positioning_opportunities": ["3-5 specific ways they can differentiate from competitors"]
}

RULES:
- ONLY cite things present or absent in the ACTUAL DATA below. Do not invent.
- For competitors, ONLY include businesses from the same state. Set same_state=false for others.
- Revenue calculations: ExoMind avg=$4,500 (max 15 patients=$67,500/mo). Ketamine=$3,000. TMS=$8,000. Spravato=$5,000. Max 20 patients for standard.
- Calculate daily_loss = avg_patient_value × 2 / 30 (2 missed patients per month).
- If website features ARE present in the scraped data (team photos, testimonials, bios), list them in key_website_features.

---
RAW DATA:

FORM SUBMISSION:
Name: ${rawData.firstName} ${rawData.lastName}
Website: ${rawData.website}
Services: ${rawData.services.join(", ")}
City/State provided: ${rawData.cityState}
Clinic Operational: ${rawData.clinicOperational}
Monthly Budget: ${rawData.monthlyBudget}
Team Structure: ${rawData.teamStructure}

SCRAPED WEBSITE CONTENT:
${rawData.websiteData.substring(0, 12000)}

TECHNICAL AUDIT (PageSpeed):
${rawData.pageSpeedData}

LOCAL COMPETITORS (Google Maps):
${rawData.competitorsData}

META AD LIBRARY:
${rawData.adLibraryData}

INFERRED LOCATION: ${rawData.locationInfer}`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openrouterKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4.5",
      max_tokens: 4096,
      messages: [
        {
          role: "system",
          content: "You are a structured data analyst. Output ONLY valid JSON. No markdown fences, no explanation text. Just the JSON object.",
        },
        { role: "user", content: analystPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Analyst pass failed: ${errText}`);
  }

  const data = await res.json();
  let content: string = data.choices?.[0]?.message?.content ?? "{}";

  // Strip any accidental markdown fences
  content = content.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();

  const brief: AnalystBrief = JSON.parse(content);
  console.log(`✅ Analyst brief: data_quality=${brief.data_quality}, city=${brief.city}, competitors=${brief.competitors?.length || 0}, ad_status=${brief.ad_status}`);
  return brief;
}

// ---------------------------------------------------------------------------
// VALIDATION: Check the analyst brief for critical gaps
// ---------------------------------------------------------------------------
function validateBrief(brief: AnalystBrief): AnalystBrief {
  console.log("🔍 Validating analyst brief...");
  const gaps: string[] = [...(brief.data_gaps || [])];

  if (!brief.city || brief.city === "UNKNOWN" || brief.city.length < 2) {
    gaps.push("no_city");
  }
  if (!brief.competitors || brief.competitors.length === 0) {
    gaps.push("no_competitors");
  }
  const sameStateCompetitors = (brief.competitors || []).filter(c => c.same_state);
  if (sameStateCompetitors.length === 0 && brief.competitors?.length > 0) {
    gaps.push("no_same_state_competitors");
  }
  if (brief.website_analysis?.speed_metrics?.perfScore === 0 && brief.website_analysis?.speed_metrics?.speedIndex === "unavailable") {
    gaps.push("no_speed_data");
  }
  if (brief.ad_status === "no_facebook_page" || brief.ad_status === "scrape_failed") {
    gaps.push("no_ad_data");
  }

  // Deduplicate
  brief.data_gaps = [...new Set(gaps)];

  // Recalculate data_quality based on validated gaps
  const criticalGaps = brief.data_gaps.filter(g => ["no_city", "no_competitors", "no_speed_data"].includes(g));
  if (criticalGaps.length >= 3) {
    brief.data_quality = "thin";
  } else if (criticalGaps.length >= 1) {
    brief.data_quality = "partial";
  } else {
    brief.data_quality = "full";
  }

  // Ensure revenue calc is populated
  if (!brief.revenue_calc.monthly_revenue) {
    brief.revenue_calc.monthly_revenue = brief.revenue_calc.avg_patient_value * brief.revenue_calc.monthly_target_patients;
  }
  if (!brief.revenue_calc.daily_loss) {
    brief.revenue_calc.daily_loss = Math.round((brief.revenue_calc.avg_patient_value * 2) / 30);
  }

  console.log(`✅ Validation complete: data_quality=${brief.data_quality}, gaps=[${brief.data_gaps.join(", ")}]`);
  return brief;
}

// ---------------------------------------------------------------------------
// PASS 2: Writer — Generate the markdown report from the brief (Claude Sonnet)
// ---------------------------------------------------------------------------
function buildExoMindSystemPrompt(): string {
  return `You are an elite performance marketing strategist working for LivForMor Media — the #1 patient acquisition agency for premium brain optimization clinics.

Your mission: Write a high-impact "ExoMind Market Intelligence Report" that will make the clinic owner's jaw drop. This is not a generic report — it is a PERSONALIZED COMPETITIVE ANALYSIS built entirely from the real data provided in the analyst brief.

CRITICAL CONTEXT: ExoMind is a premium, FDA-cleared neurostimulation protocol that targets high-performing individuals — CEOs, executives, founders, and professionals who want cognitive optimization, not just mental health treatment. ExoMind patients are cash-pay ($3,000–$6,000 per protocol, average $4,500). They are NOT the same audience as ketamine or TMS patients. Do NOT compare this clinic to ketamine or TMS providers — those are NOT competitors. ExoMind's TRUE competitors are: neurofeedback clinics, brain optimization centers, executive wellness programs, biohacking centers, and cognitive performance clinics.

IDENTITY & VOICE:
- Direct, authoritative, data-driven — like a peer who has seen the data and is giving it straight
- Short paragraphs (2-3 sentences max). Active voice. No hedging qualifiers.
- Apply Eugene Schwartz (market sophistication), Gary Halbert (emotional triggers), Gary Bencivenga (proof-driven persuasion)
- Every section must reference SPECIFIC data from the brief, quantify opportunity cost, use professional headers/bullets/bold
- Anti-agency-speak — no "leverage synergies" or "optimize touchpoints"

STRICT RULES:
1. NEVER mention any clinic name, city, or state that was not provided in the brief data.
2. If competitor data contains businesses from other states, IGNORE them completely.
3. NEVER write anything that sounds like a sales pitch for LivForMor. NEVER mention "livformor", "strategy call", "options", "packages", pricing, or dollar amounts for our services. NEVER include a "book a call" or "strategy session" call to action.
4. NEVER claim that website content is missing if the brief lists it in key_website_features. If team photos, provider bios, testimonials ARE present in the brief, acknowledge them as strengths.
5. All date references must use the CURRENT DATE provided in the user prompt. Never reference past years or months.
6. BANNED TERMS for Meta paid traffic: "lookalike audience", "interest targeting", "custom audience", "detailed targeting". Meta now uses Advantage+ AI-driven campaigns.
7. NEVER compare to ketamine, TMS, or Spravato clinics. Those are NOT ExoMind competitors.
8. NEVER use the phrases "unable to verify", "data limitation", "scraping limitations", "unable to access", "without complete content access", or "could not be verified". If data is thin or missing, write your analysis based on whatever data IS available. If competitor data is unavailable, analyze the NATIONAL competitive landscape for brain optimization and provide actionable positioning advice. Never admit data gaps to the reader.
9. REVENUE GUARDRAIL: ExoMind protocol value is $3,000–$6,000. NEVER cite patient values above $6,000. Use $4,500 as the average for all revenue calculations. Maximum reasonable monthly revenue projection = 15 patients × $4,500 = $67,500. Use the exact numbers from the brief's revenue_calc.
10. NEVER end with "this blueprint expires in 7 days" or any fake scarcity language.
11. Section 5 must NOT explain what LivForMor does — create curiosity, end with YouTube CTA.
12. Expand abbreviations in all content: kap→ketamine therapy, tms→TMS therapy, spravato→Spravato clinic.
13. Meta ads MUST use Advantage+ campaigns. MUST target diverse patient segments (depression, PTSD, OCD, anxiety, chronic pain — but framed through the lens of cognitive performance for ExoMind).
14. Use CARE framework for messaging (Connect, Acknowledge, Resolve, Empower).
15. Use Alpha Omega education framework — lead with the transformation (Alpha), educate on the mechanism (body), close with the aspiration (Omega). Never sell the commodity; sell the proprietary protocol.
16. A.I.M. FRAMEWORK: Thread [A]cquire → [I]ndoctrinate → [M]onetize throughout the 60-Day Plan. Week 1-2 = Acquire (positioning, visibility, lead gen foundations). Week 3-6 = Indoctrinate (education-first ads, native content, nurture sequences that build belief). Week 5-8 = Monetize (conversion optimization, referral networks, retention). Every tactic should map to one of these three pillars.

GRADING CALIBER:
- Be HARSH and specific. Use granular grades: D+, C-, B+, etc. — not just round letters.
- A "C" is generous for most clinic websites. Default assumption is most sites are mediocre.
- For ExoMind sites: grade against whether a CEO earning $500K+ would trust this site with their brain. The bar is luxury/premium, not "adequate healthcare."

NATIVE ADVERTISING SECTION (Section 4):
ExoMind's ideal patients read Forbes, Bloomberg, WSJ, and Entrepreneur. Native ads on Taboola/Outbrain that look like editorial content in these reading environments outperform social ads for this demographic. You MUST include a detailed table with 4 personas:
- CEO with brain fog → performance gap angle
- Founder burning out → recovery without weakness angle
- Executive post-concussion → transformation angle
- Biohacker/optimizer → science-first angle
Each row must include: Target Persona, Ad Angle, Sample Headline, Landing Page type.

META ADS SECTION (Section 4):
Provide detailed creative concepts. Each concept must include: Format (video/static/carousel), Hook (first 3 seconds), Target Audience Segment, Mindset Trigger (fear/aspiration/curiosity). Focus on transformation stories from high-performers, NOT clinical depression narratives.

GOOGLE ADS SECTION (Section 4):
Include specific keywords WITH estimated CPCs: "ExoMind near me" ($8-12), "neurofeedback for executives" ($6-10), "brain optimization [city]" ($5-8), "cognitive performance clinic" ($4-7). These are premium-intent searches.

EMAIL NURTURE SEQUENCE (Section 4, Week 5-8):
Detail a 5-email nurture sequence focused on performance and ROI (not treatment/healing language):
1. Welcome + "Why Top Performers Choose ExoMind" case study
2. Science explainer — how neurostimulation differs from neurofeedback
3. ROI calculator — cost of cognitive decline vs. cost of protocol
4. Social proof — executive testimonials (anonymized)
5. Urgency — limited protocol slots + consultation invite

REFERRAL NETWORK (Section 4, Week 5-8):
Specify outreach targets: executive coaches, corporate wellness departments, concierge medicine practices, biohacking communities, YPO/EO chapters, high-end fitness facilities.

DESIGN TOKENS (for any inline styling references):
- Colors: Dark #0d3b40 | Teal #0f766e | Teal Light #2dd4bf | Gold #c5b896
- Font: Nunito Sans
- Grade badges: Green for A/B, Yellow for C, Red for D/F

FORMATTING:
- Clean, scannable markdown. Short paragraphs (2-3 sentences max).
- Single-level bullets only. Never nest more than one level deep.
- Blockquotes (> ) for key insights, opportunity callouts, and important data points.
- ### headings for sub-sections within each section.
- --- horizontal rules between major sections.
- **bold** for emphasis, never ALL CAPS.
- Tables for structured comparisons only.`;
}

function buildStandardSystemPrompt(): string {
  return `You are an elite, direct-response healthcare marketer and copywriter working for LivForMor Media — the #1 patient acquisition agency for ketamine, TMS, and Spravato clinics.

Your mission: Write a high-impact "Patient Acquisition Blueprint" that will make the clinic owner's jaw drop. This is not a generic report — it is a PERSONALIZED BATTLE PLAN built entirely from the real data provided in the analyst brief.

IDENTITY & VOICE:
- Direct, authoritative, data-driven — like a peer who has seen the data and is giving it straight
- Short paragraphs (2-3 sentences max). Active voice. No hedging qualifiers.
- Apply Eugene Schwartz (market sophistication), Gary Halbert (emotional triggers), Gary Bencivenga (proof-driven persuasion)
- Every section must reference SPECIFIC data from the brief, quantify opportunity cost, use professional headers/bullets/bold
- Anti-agency-speak — no "leverage synergies" or "optimize touchpoints"

STRICT RULES:
1. NEVER mention any clinic name, city, or state that was not provided in the brief data.
2. If competitor data contains businesses from other states, IGNORE them completely.
3. NEVER write anything that sounds like a sales pitch for LivForMor. NEVER mention "livformor", "strategy call", "options", "packages", pricing, or dollar amounts for our services. NEVER include a "book a call" or "strategy session" call to action.
4. NEVER claim that website content is missing if the brief lists it in key_website_features. If team photos, provider bios, testimonials ARE present in the brief, acknowledge them as strengths under "What's Working."
5. All date references must use the CURRENT DATE provided in the user prompt. Never reference past years or months.
6. BANNED TERMS for Meta paid traffic: "lookalike audience", "interest targeting", "custom audience", "detailed targeting". Meta now uses Advantage+ AI-driven campaigns — advise accordingly.
7. NEVER use the phrases "unable to verify", "data limitation", "scraping limitations", "unable to access", "without complete content access", or "could not be verified". If data is thin or missing, write your analysis based on whatever data IS available. If competitor data is unavailable, analyze the NATIONAL competitive landscape for their service type and provide actionable positioning advice. Never admit data gaps to the reader.
8. REVENUE GUARDRAIL: Ketamine patient protocol value is $2,500–$4,000 (6-session protocol, avg $3,000). TMS patient value is $6,000–$12,000 (avg $8,000). Spravato patient value is $4,000–$8,000 (avg $5,000). NEVER cite individual patient values above these ranges. Maximum reasonable monthly revenue projection = 20 new patients × their service average. Use the exact numbers from the brief's revenue_calc.
9. NEVER end with "this blueprint expires in 7 days" or any fake scarcity language.
10. Section 5 must NOT explain what LivForMor does — create curiosity, end with YouTube CTA.
11. Expand abbreviations in all content: kap→ketamine therapy, tms→TMS therapy, spravato→Spravato clinic.
12. Meta ads MUST use Advantage+ campaigns. MUST target diverse patient segments: Treatment-Resistant Depression, Postpartum Depression, PTSD, OCD, Anxiety Disorders, Chronic Pain.
13. Use CARE framework for messaging (Connect, Acknowledge, Resolve, Empower).
14. Use Alpha Omega education framework — lead with the transformation (Alpha), educate on the mechanism (body), close with the aspiration (Omega). Sell a "Proprietary Protocol" — a named system, not a commodity treatment.

GRADING CALIBER:
- Be HARSH and specific. Use granular grades: D+, C-, B+, etc. — not just round letters.
- A "C" is generous for most clinic websites. Default assumption is most sites are mediocre.
- Grade against whether a patient in crisis would trust this site enough to call. The bar is "would I send my family member here?"

META ADS SECTION (Section 4):
Use Advantage+ campaigns ONLY. Focus on EDUCATION-FIRST storytelling via story-format video ads. You MUST include a detailed table with 6 diverse avatar creatives:
| Patient Condition | Ad Angle | Sample Hook | CTA |
- Treatment-Resistant Depression → Patient transformation story → "I tried everything for 10 years..." → Book Free Consultation
- Postpartum Depression → Myth-busting / de-stigmatization → "You're not a bad mother..." → Learn More
- PTSD → Education-first / science → "Your brain isn't broken..." → Watch the Video
- OCD → Relatable metaphor → "Living with OCD feels like..." → Get Help Today
- Anxiety Disorders → Patient story / hope → "I couldn't leave my house..." → Schedule a Call
- Chronic Pain → De-stigmatization → "Pain isn't just physical..." → Start Your Journey
Each creative must specify format (video preferred), hook concept, and mindset trigger. Focus on messaging and stories, NOT targeting mechanics. Let Meta's Andromeda AI handle targeting.

GOOGLE ADS SECTION (Section 4):
Include specific high-intent keywords WITH estimated CPCs: "ketamine therapy near me" ($12-18), "ketamine infusion [city]" ($10-15), "TMS therapy cost" ($8-12), "Spravato treatment" ($6-10), "ketamine for depression" ($8-14). Set up a dedicated landing page with a 3-video pre-indoctrination sequence to educate before the call.

EMAIL NURTURE SEQUENCE (Section 4, Week 5-8):
Detail a 5-email sequence:
1. Welcome + "What to Expect" educational content
2. Patient transformation story (anonymized)
3. Science explainer — how [their treatment] works on the brain
4. FAQ buster — addressing top 5 objections/fears
5. Social proof + consultation invite
Plus SMS follow-up cadence and retargeting ad strategy for website visitors.

DESIGN TOKENS (for any inline styling references):
- Colors: Dark #0d3b40 | Teal #0f766e | Teal Light #2dd4bf | Gold #c5b896
- Font: Nunito Sans
- Grade badges: Green for A/B, Yellow for C, Red for D/F

FORMATTING:
- Clean, scannable markdown. Short paragraphs (2-3 sentences max).
- Single-level bullets only. Never nest more than one level deep.
- Blockquotes (> ) for key insights, opportunity callouts, and important data points.
- ### headings for sub-sections within each section.
- --- horizontal rules between major sections.
- **bold** for emphasis, never ALL CAPS.
- Tables for structured comparisons only.`;
}

function buildWriterUserPrompt(brief: AnalystBrief): string {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const isExoMind = brief.report_type === "exomind";
  const title = isExoMind ? "ExoMind Market Intelligence Report" : "Patient Acquisition Blueprint";
  const sameStateCompetitors = brief.competitors.filter(c => c.same_state);

  // Build competitor table rows
  const competitorRows = sameStateCompetitors.map(c =>
    isExoMind
      ? `| ${c.name} | ${c.type} | ${c.rating}⭐ | ${c.reviews} | ${c.weakness} |`
      : `| ${c.name} | ${c.rating}⭐ | ${c.reviews} | ${c.weakness} | Position against: ${c.weakness} |`
  ).join("\n");

  const hasCompetitors = sameStateCompetitors.length > 0;
  const hasCity = brief.city && brief.city !== "UNKNOWN" && brief.city.length > 1;

  return `CURRENT DATE: ${currentDate}

Here is the validated analyst brief. Write the full report using ONLY this data. Every claim must trace back to a field in this brief.

ANALYST BRIEF:
${JSON.stringify(brief, null, 2)}

---

Write the complete report in markdown. Follow this exact structure:

# ${title}
## Prepared by LivForMor Media | Exclusively for ${brief.contact_first_name} ${brief.contact_last_name}

---

## 1. 🔍 Executive Summary & Market Opportunity

Write 3-4 paragraphs:
- Total addressable market ${hasCity ? `in ${brief.city}, ${brief.state}` : 'in their local market'} ${isExoMind ? '— focus on executive/professional demographic' : '— patient count + revenue opportunity'}
- Revenue gap using EXACT numbers from brief.revenue_calc: ${brief.revenue_calc.monthly_target_patients} patients × $${brief.revenue_calc.avg_patient_value} = $${brief.revenue_calc.monthly_revenue}/month
- The #1 barrier from brief.website_analysis.critical_fix
- Use a blockquote with the revenue number

---

## 2. ⚠️ Website Teardown: What's Leaking ${isExoMind ? 'High-Value ' : ''}Patients${isExoMind ? '' : ' & Revenue'}

Grade on 4 dimensions using EXACT data from the brief. For each:

### ${isExoMind ? 'Trust & Authority' : 'Trust'}: ${brief.website_analysis.trust_grade}
- Reference brief.website_analysis.trust_strengths and trust_weaknesses
- **What's Working:** ${brief.website_analysis.trust_strengths.join(', ')}
- **What's Broken:** ${brief.website_analysis.trust_weaknesses.join(', ')}
- **Fix It Now:** single most impactful action

### Speed: ${brief.website_analysis.speed_grade}
- **Mobile Load Time:** ${brief.website_analysis.speed_metrics.speedIndex}
- **Performance Score:** ${brief.website_analysis.speed_metrics.perfScore}/100
- **First Contentful Paint:** ${brief.website_analysis.speed_metrics.fcp}
- **Largest Contentful Paint:** ${brief.website_analysis.speed_metrics.lcp}
${brief.website_analysis.bleeding_neck ? '- FLAG AS BLEEDING NECK: 53% bounce rate for pages >3s. Half of paid traffic is wasted.' : ''}

### ${isExoMind ? 'SEO & Discoverability' : 'SEO'}: ${brief.website_analysis.seo_grade}
- Use brief.website_analysis.seo_strengths and seo_weaknesses

### ${isExoMind ? 'Executive-Ready Positioning' : 'CTA Effectiveness'}: ${brief.website_analysis.cta_grade}
- Use brief.website_analysis.cta_strengths and cta_weaknesses

### 🚨 The #1 Critical Fix for Today
${brief.website_analysis.critical_fix}

---

## 3. 🏆 ${isExoMind ? 'Competitive Landscape & Ad Intelligence' : 'Competitor Intelligence & Ad X-Ray'}

### Their Current Ad Strategy
- Ad status: ${brief.ad_status}, count: ${brief.ad_count}
${brief.ad_status === 'zero_ads' || brief.ad_status === 'no_facebook_page'
  ? '- State: "Zero Active Ad Spend Detected on Meta. You are currently entirely reliant on organic referrals and handing local market share directly to aggressive competitors."'
  : '- Analyze each ad from brief.ad_details'}

### ${hasCompetitors ? 'Local Competitive Landscape' : 'Market Landscape'}
${hasCompetitors ? `
${isExoMind
  ? '| Competitor | Type | Rating | Reviews | Exploitable Weakness |\n|---|---|---|---|---|\n' + competitorRows
  : '| Clinic Name | Rating | Reviews | Critical Weakness | How to Steal Their Patients |\n|---|---|---|---|---|\n' + competitorRows}
` : 'Analyze the national competitive landscape for their service type. Focus on positioning opportunities from brief.positioning_opportunities.'}

Write 2-3 blockquote callouts using brief.positioning_opportunities

---

## 4. 🗺️ ${isExoMind ? 'ExoMind Patient Acquisition Blueprint (60-Day A.I.M. Plan)' : 'The Patient Acquisition Blueprint (60-Day Quick Win Plan)'}

### Week 1-2: ${isExoMind ? 'Premium Positioning & Quick Wins' : 'Foundation & Quick Wins'} (Zero Ad Spend)
${isExoMind
  ? `Bullet list of 5-7 specific actions for ExoMind clinics:
- Google Business Profile optimization for brain optimization keywords (neurofeedback, brain optimization, cognitive performance + ${hasCity ? brief.city : 'their city'})
- Executive-focused website copy updates — reframe clinical language to performance/optimization language
- LinkedIn authority content strategy — position the provider as a thought leader in cognitive performance
- Case study development — document 2-3 executive transformations (anonymized)
- Partnership outreach to executive coaches and corporate wellness programs in ${hasCity ? brief.city : 'their market'}
- Premium branding audit — does the visual identity match a $4,500 protocol?
- Referral card program for existing high-value patients`
  : `Bullet list of 5-7 specific, zero-cost actions:
- GBP optimization with service-specific keywords + ${hasCity ? brief.city : 'their city'}
- Review generation campaign — systematic ask for Google reviews from satisfied patients
- Website quick fixes based on the critical issues identified in Section 2
- Frame everything around building a "Proprietary Protocol" — sell a named system, not a commodity treatment
- Local SEO content: create city + service landing pages
- Patient testimonial collection (video preferred)
- Referral program setup for existing patients`}

### Week 3-${isExoMind ? '6' : '4'}: Paid Traffic Launch

${isExoMind ? `#### Native Advertising (Taboola/Outbrain)
ExoMind's ideal patients read Forbes, Bloomberg, WSJ, and Entrepreneur. Native ads that look like editorial content in these reading environments outperform social ads for this demographic. Include this table:

| Target Persona | Ad Angle | Sample Headline | Landing Page |
|---|---|---|---|
| CEO with brain fog | Performance gap | "The protocol Silicon Valley execs use to stay sharp after 50" | VSL training page |
| Founder burning out | Recovery without weakness | "Burnout is a brain problem, not a willpower problem" | Educational content |
| Executive post-concussion | Transformation | "From forgetting meetings to running a $50M company" | Case study page |
| Biohacker/optimizer | Science-first | "Why 6 ExoMind sessions outperform 40 neurofeedback sessions" | Comparison page |

#### Meta Ads — Advantage+ Strategy
Use Advantage+ campaigns ONLY. Focus on transformation stories from high-performers, NOT clinical depression narratives. Include 3-4 detailed creative concepts, each with:
- **Format:** (video/static/carousel)
- **Hook:** (first 3 seconds that stop the scroll)
- **Audience Segment:** (executives with brain fog, founders with burnout, post-concussion professionals, biohackers)
- **Mindset Trigger:** (fear of cognitive decline, aspiration for peak performance, curiosity about neuroscience)
Frame through diverse conditions: cognitive decline, executive burnout, post-concussion recovery, ADHD optimization, anxiety in high-performers.

#### Google Ads — High-Intent Search
Target high-intent keywords with CPCs:
- "ExoMind near me" ($8-12 CPC)
- "neurofeedback for executives" ($6-10 CPC)
- "brain optimization ${hasCity ? brief.city : '[city]'}" ($5-8 CPC)
- "cognitive performance clinic" ($4-7 CPC)
- "executive brain health" ($5-9 CPC)
These are premium-intent searches with high conversion potential. Dedicated landing page required with executive-focused messaging.`
: `#### Meta Ads — Advantage+ Strategy
Use Advantage+ campaigns ONLY. Do NOT mention lookalike audiences, interest targeting, custom audiences, or detailed targeting — those are deprecated. Focus on EDUCATION-FIRST storytelling via story-format video ads. Include this detailed avatar table:

| Patient Condition | Ad Angle | Sample Hook | CTA |
|---|---|---|---|
| Treatment-Resistant Depression | Patient transformation story | "I tried everything for 10 years..." | Book Free Consultation |
| Postpartum Depression | Myth-busting / de-stigmatization | "You're not a bad mother..." | Learn More |
| PTSD | Education-first / science | "Your brain isn't broken..." | Watch the Video |
| OCD | Relatable metaphor | "Living with OCD feels like..." | Get Help Today |
| Anxiety Disorders | Patient story / hope | "I couldn't leave my house..." | Schedule a Call |
| Chronic Pain | De-stigmatization | "Pain isn't just physical..." | Start Your Journey |

For each creative, specify format (video preferred), hook concept, and mindset trigger. Focus on messaging and stories, NOT targeting mechanics. Let Meta's Andromeda AI handle targeting.

#### Google Ads — High-Intent Search
Search campaigns for high-intent keywords with estimated CPCs:
- "ketamine therapy near me" ($12-18 CPC)
- "ketamine infusion ${hasCity ? brief.city : '[city]'}" ($10-15 CPC)
- "TMS therapy cost" ($8-12 CPC)
- "Spravato treatment" ($6-10 CPC)
- "ketamine for depression" ($8-14 CPC)
Set up a dedicated landing page with a 3-video pre-indoctrination sequence to educate before the call.`}

### Week 5-8: ${isExoMind ? 'Executive Referral Network & Nurture' : 'Patient Nurture & Reactivation'}
${isExoMind
  ? `#### LinkedIn Outreach
Target: executive coaches, corporate wellness departments, concierge medicine practices, biohacking communities, YPO/EO chapters, high-end fitness facilities in ${hasCity ? brief.city : 'their market'}.

#### Email Nurture Sequence (5-email series, performance/ROI language — NOT treatment/healing):
1. Welcome + "Why Top Performers Choose ExoMind" case study
2. Science explainer — how neurostimulation differs from neurofeedback
3. ROI calculator — cost of cognitive decline vs. cost of protocol
4. Social proof — executive testimonials (anonymized)
5. Urgency — limited protocol slots + consultation invite

#### Retargeting
Retargeting ads for website visitors with executive-focused messaging. Separate creative for visitors who viewed pricing vs. science pages.`
  : `#### Email Nurture Sequence (5-email series):
1. Welcome + "What to Expect" educational content
2. Patient transformation story (anonymized)
3. Science explainer — how their treatment works on the brain
4. FAQ buster — addressing top 5 objections/fears
5. Social proof + consultation invite

#### SMS Follow-Up
Automated SMS cadence for leads who don't book within 48 hours.

#### Retargeting
Retargeting ads for website visitors. Separate creative for visitors who viewed treatment pages vs. general pages.`}

### KPIs & Success Metrics
Show specific targets at Week 2, Week 4, and Week 8. Include:
- Lead volume targets
- Cost per lead benchmarks
- Consultation booking rate
- ${isExoMind ? 'Protocol start rate and revenue per patient ($4,500 avg)' : 'Patient conversion rate and revenue per patient'}

---

## 5. 🚀 The Cost of Waiting
- Daily revenue loss: $${brief.revenue_calc.daily_loss}/day based on ${brief.revenue_calc.avg_patient_value} per patient
- Reference one competitor vulnerability
- End with EXACTLY this text and NOTHING after it:

"Every day you wait is another day your competitors capture the patients who should be yours. For more in-depth strategies, breakdowns, and patient acquisition playbooks, watch our training videos on YouTube: https://www.youtube.com/@orielmor-livformormedia"`;
}

async function runWriterPass(
  brief: AnalystBrief,
  openrouterKey: string
): Promise<string> {
  console.log("✍️  Pass 2: Running Writer (Claude Sonnet 4)...");

  const systemPrompt = brief.report_type === "exomind"
    ? buildExoMindSystemPrompt()
    : buildStandardSystemPrompt();

  const userPrompt = buildWriterUserPrompt(brief);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openrouterKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://livformor.com",
      "X-Title": "LivForMor Patient Acquisition Blueprint",
    },
    body: JSON.stringify({
      model: "anthropic/claude-sonnet-4",
      max_tokens: 8192,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Writer pass failed: ${errText}`);
  }

  const data = await res.json();
  let content: string = data.choices?.[0]?.message?.content ?? "";

  // Strip accidental markdown code fence wrappers
  content = content.replace(/^```(?:markdown|md)?\n?/i, "").replace(/\n?```$/i, "").trim();

  console.log(`✅ Writer produced ${content.length} chars`);
  return content;
}

// ---------------------------------------------------------------------------
// Main handler — Vercel Serverless Function
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let payload = req.body || {};
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); } catch { payload = {}; }
    }

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

    console.log(`🚀 Blueprint v2 Pipeline: ${firstName} ${lastName} — ${website}`);

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

    // ==================================================================
    // PHASE 1: Website Extraction via Apify + PageSpeed (parallel)
    // ==================================================================
    if (website) {
      const rawUrl = website.startsWith("http") ? website : `https://${website}`;
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
          bleedingNeck = `\n⚠️ BLEEDING NECK: Mobile load time is ${speedIndex} — over 2.5s threshold.`;
        }

        pageSpeedData = `Mobile Performance Score: ${perfScore}/100\nMobile SEO Score: ${seoScore}/100\nMobile Load Time (Speed Index): ${speedIndex}\nFirst Contentful Paint: ${fcp}\nLargest Contentful Paint: ${lcp}${bleedingNeck}`;
        console.log(`✅ PageSpeed: Perf ${perfScore}, SEO ${seoScore}, Speed Index ${speedIndex}`);
      }

      // ==================================================================
      // PHASE 2: Location Extraction → Competitor Research
      // ==================================================================
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
            console.log("🧠 ExoMind detected — searching neurofeedback/brain optimization...");
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
            console.log("✅ ExoMind competitor data gathered.");
          } else {
            const serviceExpansions: Record<string, string> = {
              kap: "ketamine therapy",
              tms: "TMS therapy",
              spravato: "Spravato clinic",
            };
            const expandedService = serviceExpansions[services[0]?.toLowerCase()] || services[0] || "mental health clinic";
            const searchQuery = `${expandedService} near ${locationInfer}`;
            console.log(`🔍 Google Maps search: "${searchQuery}"`);
            competitorsData = await scrapeLocalCompetitors(searchQuery, apifyKey);
            console.log("✅ Competitor data gathered.");
          }
        }
      }
    }

    // ==================================================================
    // PHASE 2.5: Facebook Discovery + Meta Ad Library Scrape
    // ==================================================================
    {
      const clinicName = `${firstName} ${lastName}`.trim();
      const cityForSearch = locationInfer || cityState || "";
      console.log("⚙️  Phase 2.5: Facebook Discovery + Ad Library...");
      const fbPage = await discoverFacebookPage(websiteData, clinicName, cityForSearch, apifyKey);
      if (fbPage) {
        adLibraryData = await scrapeMetaAdLibrary(fbPage, apifyKey);
        console.log(`✅ Ad Library data gathered for: ${fbPage}`);
      } else {
        adLibraryData = "ZERO_ADS: No Facebook page could be found for this clinic. Zero social media advertising presence detected.";
        console.log("⚠️ No Facebook page found — Ad Library skipped.");
      }
    }

    const isExoMind = services.some(s => s.toLowerCase().includes('exomind'));

    // ==================================================================
    // PHASE 3: PASS 1 — Analyst Brief (Claude Haiku)
    // ==================================================================
    const brief = await runAnalystPass(
      {
        firstName, lastName, website, services, cityState,
        clinicOperational, monthlyBudget, teamStructure,
        websiteData, pageSpeedData, competitorsData, adLibraryData,
        locationInfer, isExoMind,
      },
      openrouterKey
    );

    // ==================================================================
    // PHASE 3.5: Validate the brief
    // ==================================================================
    const validatedBrief = validateBrief(brief);

    // ==================================================================
    // PHASE 4: PASS 2 — Writer (Claude Sonnet 4)
    // ==================================================================
    const markdownContent = await runWriterPass(validatedBrief, openrouterKey);
    console.log(`✅ Blueprint generated — ${markdownContent.length} chars`);

    // ==================================================================
    // PHASE 5: Upload to Supabase Storage
    // ==================================================================
    console.log("💾  Phase 5: Saving to Supabase Storage...");
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

    // ==================================================================
    // PHASE 6: GoHighLevel CRM Handoff
    // ==================================================================
    if (ghlApiKey) {
      const ghlHeaders = {
        Authorization: `Bearer ${ghlApiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      };

      let resolvedContactId = contactId;
      if (!resolvedContactId && email) {
        await new Promise((r) => setTimeout(r, 2000));
        console.log(`🔍 Phase 6: Looking up GHL contact by email: ${email}...`);
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
        console.log(`📤  Phase 6: Updating GHL contact ${resolvedContactId}...`);
        try {
          const clinicName = payload.clinicName || payload.clinic_name || "";
          const servicesStr = Array.isArray(services) ? services.join(", ") : String(services);
          const qualified = payload.qualified || "";
          const sourcePage = payload.source_page || payload.source || "";

          // Build tags — add Blueprint_Thin_Data if data quality is thin
          const tags = ["Report_Ready"];
          if (validatedBrief.data_quality === "thin") {
            tags.push("Blueprint_Thin_Data");
          } else if (validatedBrief.data_quality === "partial") {
            tags.push("Blueprint_Partial_Data");
          }

          await Promise.all([
            fetch(`https://services.leadconnectorhq.com/contacts/${resolvedContactId}/tags`, {
              method: "POST",
              headers: ghlHeaders,
              body: JSON.stringify({ tags }),
            }),
            fetch(`https://services.leadconnectorhq.com/contacts/${resolvedContactId}/notes`, {
              method: "POST",
              headers: ghlHeaders,
              body: JSON.stringify({
                body: `✅ Patient Acquisition Blueprint Ready! (v2 — data quality: ${validatedBrief.data_quality})\n\nView Report: ${documentUrl}\n\nData gaps: ${validatedBrief.data_gaps.length > 0 ? validatedBrief.data_gaps.join(", ") : "none"}`,
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
          console.log("✅ GHL contact updated with tags and data quality flag.");
        } catch (ghlErr) {
          console.error("GHL handoff failed (non-fatal):", ghlErr);
        }
      } else {
        console.log("⏭️  Skipping GHL: Could not resolve contact ID.");
      }
    } else {
      console.log("⏭️  Skipping GHL: No API key configured.");
    }

    return res.status(200).json({
      success: true,
      docUrl: documentUrl,
      fileName,
      version: "v2",
      data_quality: validatedBrief.data_quality,
      data_gaps: validatedBrief.data_gaps,
    });
  } catch (error: any) {
    console.error("❌ Blueprint Generation Error:", error);
    return res.status(400).json({ error: error.message });
  }
}
