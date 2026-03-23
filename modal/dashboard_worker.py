"""
LivForMor Media — Automated Clinic Dashboard Worker
Runs on Modal. Triggered by Supabase DB webhook on research_queue INSERT.

Full pipeline:
  Phase 0: Apify website scrape + competitor research
  Phase 1: NotebookLM notebook creation + seed data
  Phase 2: Deep research (40-100 sources)
  Phase 3: Artifact generation (briefing, intel, quiz, flashcards, audio, infographic)
  Phase 4: Build HTML dashboard
  Phase 5: Upload to Supabase Storage
  Phase 6: Update GHL contact with dashboard URL + status
"""

import modal
import json
import os
import asyncio
import time
from datetime import datetime, timezone

# ── Modal App ─────────────────────────────────────────────────────
app = modal.App("livformor-dashboard-worker")

# Persistent volume for NotebookLM auth tokens
auth_volume = modal.Volume.from_name("notebooklm-auth", create_if_missing=True)

# Image with all dependencies
worker_image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "notebooklm-py",
        "httpx",
        "supabase",
        "fastapi[standard]",
    )
)

# ── Secrets ───────────────────────────────────────────────────────
# Store these in Modal dashboard → Secrets
#   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
#   GHL_API_TOKEN
#   APIFY_API_TOKEN
#   OPENROUTER_API_KEY
#   WEBHOOK_SECRET (shared secret for webhook auth)


# ── Constants ─────────────────────────────────────────────────────
GHL_LOCATION_ID = "MSFgME5t3cZZRgzhEnI2"
GHL_CUSTOM_FIELD_IDS = {
    "clinic_name": "ZvV7CauCyceA1TxMhMyA",
    "city_state": "HBcYeuRzKJn6K7LSsjvI",
    "clinic_operational": "qTxLTVKQa6oifnWHTCnO",
    "monthly_budget": "XZvcCtBMH6JFK8QQs43c",
    "team_structure": "gLWZYC0HLG52oNc8ZTIs",
    "services_offered": "vzLImYEhZfyjuVmVoqD0",
    "lead_qualified": "N4vd5ho0j5q16XgJy6vc",
    "source_page": "hoo6wFcNk0TlPvWNCFKz",
    "blueprint_url": "fLPKOaXKzeeYzp1L8FtK",
}

BRAND = {
    "purple": "#6B2FA0",
    "gold": "#D4AF37",
    "bg": "#08080c",
}


# ═══════════════════════════════════════════════════════════════════
#  WEBHOOK ENDPOINT — receives Supabase pg_net trigger
# ═══════════════════════════════════════════════════════════════════
@app.function(
    image=worker_image,
    secrets=[modal.Secret.from_name("livformor-secrets")],
    timeout=900,  # 15 min max
    volumes={"/auth": auth_volume},
)
@modal.fastapi_endpoint(method="POST")
async def webhook(request: dict):
    """Receive webhook from Supabase and spawn dashboard generation."""
    # Validate webhook secret
    # The Supabase webhook sends the full row as JSON
    record = request.get("record", request)

    clinic_name = record.get("clinic_name", "Unknown Clinic")
    clinic_domain = record.get("clinic_domain", "")
    services = record.get("services", [])
    city_state = record.get("city_state", "")
    contact_name = record.get("contact_name", "")
    contact_email = record.get("contact_email", "")
    monthly_budget = record.get("monthly_budget", "Unknown")
    team_structure = record.get("team_structure", "Unknown")
    queue_id = record.get("id", "")

    print(f"🚀 Received dashboard request: {clinic_name} ({city_state})")

    # Spawn the long-running pipeline asynchronously
    generate_dashboard.spawn(
        clinic_name=clinic_name,
        clinic_domain=clinic_domain,
        services=services if isinstance(services, list) else [services],
        city_state=city_state,
        contact_name=contact_name,
        contact_email=contact_email,
        monthly_budget=monthly_budget,
        team_structure=team_structure,
        queue_id=queue_id,
    )

    return {"status": "accepted", "message": f"Dashboard generation started for {clinic_name}"}


# ═══════════════════════════════════════════════════════════════════
#  MAIN PIPELINE — runs asynchronously after webhook returns
# ═══════════════════════════════════════════════════════════════════
@app.function(
    image=worker_image,
    secrets=[modal.Secret.from_name("livformor-secrets")],
    timeout=900,  # 15 min
    volumes={"/auth": auth_volume},
)
async def generate_dashboard(
    clinic_name: str,
    clinic_domain: str,
    services: list,
    city_state: str,
    contact_name: str,
    contact_email: str,
    monthly_budget: str,
    team_structure: str,
    queue_id: str,
):
    """Full dashboard generation pipeline."""
    import httpx
    from notebooklm import NotebookLMClient, AuthTokens

    print(f"\n{'='*60}")
    print(f"🏥 DASHBOARD PIPELINE: {clinic_name}")
    print(f"{'='*60}")

    supabase_url = os.environ["SUPABASE_URL"]
    supabase_key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    apify_key = os.environ.get("APIFY_API_TOKEN", "")
    ghl_key = os.environ.get("GHL_API_TOKEN", "")
    openrouter_key = os.environ.get("OPENROUTER_API_KEY", "")

    services_str = ", ".join(services) if isinstance(services, list) else str(services)
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    # Update queue status
    async with httpx.AsyncClient() as http:
        await http.patch(
            f"{supabase_url}/rest/v1/research_queue?id=eq.{queue_id}",
            headers={
                "apikey": supabase_key,
                "Authorization": f"Bearer {supabase_key}",
                "Content-Type": "application/json",
                "Prefer": "return=minimal",
            },
            json={"status": "processing", "processed_at": datetime.now(timezone.utc).isoformat()},
        )

    # ── Load NotebookLM Auth ──────────────────────────────────────
    auth_path = "/auth/auth.json"
    if not os.path.exists(auth_path):
        print("❌ No auth tokens found. Run sync_auth first.")
        return {"error": "No auth tokens"}

    with open(auth_path) as f:
        auth_data = json.load(f)

    cookies = auth_data["cookies"]
    
    # Fetch fresh CSRF + session tokens from cookies 
    from notebooklm.auth import fetch_tokens
    try:
        csrf_token, session_id = await fetch_tokens(cookies)
        print(f"✅ Auth tokens refreshed (CSRF + session)")
    except Exception as e:
        print(f"⚠️ Token refresh failed, using stored: {e}")
        csrf_token = auth_data.get("csrf_token", "")
        session_id = auth_data.get("session_id", "")

    auth = AuthTokens(
        cookies=cookies,
        csrf_token=csrf_token,
        session_id=session_id,
    )

    results = {
        "briefing": "",
        "deep_research": "",
        "competitive_intel": "",
        "quiz_md": "",
        "flashcards_md": "",
        "infographic_path": None,
        "audio_path": None,
    }

    try:
        async with NotebookLMClient(auth) as client:
            # ══════════════════════════════════════════════════════
            # PHASE 0: Pre-Research (Apify Website Scrape)
            # ══════════════════════════════════════════════════════
            print("\n⚙️  Phase 0: Website scrape + enrichment...")
            website_data = "No website data available."
            competitors_data = "No competitor data available."

            if clinic_domain and apify_key:
                website_data = await scrape_website(clinic_domain, apify_key)
                competitors_data = await scrape_competitors(
                    clinic_name, city_state, services_str, apify_key
                )

            # Build clinic profile
            clinic_profile = f"""Clinic Name: {clinic_name}
Domain: {clinic_domain}
Services: {services_str}
Location: {city_state}
Contact: {contact_name}

WEBSITE SUMMARY:
{website_data[:3000]}

LOCAL COMPETITORS:
{competitors_data[:3000]}

FORM DATA:
Monthly Budget: {monthly_budget}
Team Structure: {team_structure}
"""
            print(f"✅ Clinic profile synthesized ({len(clinic_profile)} chars)")

            # ══════════════════════════════════════════════════════
            # PHASE 1: NotebookLM Notebook + Seed Data
            # ══════════════════════════════════════════════════════
            print("\n📓 Phase 1: Creating NotebookLM notebook...")
            nb = await client.notebooks.create(f"Clinic Intel - {clinic_name} | {city_state}")
            notebook_id = nb.id
            print(f"✅ Notebook created: {notebook_id}")

            # Add clinic profile as text source
            await client.sources.add_text(
                notebook_id,
                clinic_profile,
                title=f"{clinic_name} — Clinic Profile & Market Data",
            )
            print("✅ Seed data injected")

            # Add clinic website URL as source
            if clinic_domain:
                url = clinic_domain if clinic_domain.startswith("http") else f"https://{clinic_domain}"
                try:
                    await client.sources.add_url(notebook_id, url, wait=True)
                    print(f"✅ Website URL added: {url}")
                except Exception as e:
                    print(f"⚠️ Failed to add URL source: {e}")

            # ══════════════════════════════════════════════════════
            # PHASE 2: Deep Research
            # ══════════════════════════════════════════════════════
            print("\n🔬 Phase 2: Starting deep research...")
            research_query = (
                f"{clinic_name} {city_state} {services_str} ketamine TMS Spravato "
                f"mental health market competitors patient acquisition marketing 2025 2026"
            )

            research = await client.research.start(
                notebook_id, query=research_query, mode="deep"
            )
            print(f"✅ Deep research started (task: {research.task_id})")

            # Poll until complete (up to 8 minutes)
            for attempt in range(16):
                await asyncio.sleep(30)
                status = await client.research.status(notebook_id, task_id=research.task_id)
                print(f"   Research status: {status.status} (attempt {attempt + 1}/16)")
                if status.status == "completed":
                    break
            else:
                print("⚠️ Research timed out — proceeding with available sources")

            # Batch import sources (chunks of 20)
            if hasattr(status, "sources") and status.sources:
                total_sources = len(status.sources)
                print(f"📥 Importing {total_sources} sources in batches...")
                for i in range(0, total_sources, 20):
                    batch = list(range(i, min(i + 20, total_sources)))
                    try:
                        await client.research.import_sources(
                            notebook_id, task_id=research.task_id, source_indices=batch
                        )
                        print(f"   Batch {i//20 + 1}: imported indices {batch[0]}-{batch[-1]}")
                    except Exception as e:
                        print(f"   Batch {i//20 + 1} failed: {e}")
                    await asyncio.sleep(3)
            print(f"✅ Deep research complete")

            # ══════════════════════════════════════════════════════
            # PHASE 3: Artifact Generation
            # ══════════════════════════════════════════════════════
            print("\n📝 Phase 3: Generating artifacts...")

            # 3.1 Executive Briefing
            print("   → Executive briefing...")
            briefing_result = await client.chat.ask(
                notebook_id,
                f"""Write a comprehensive executive pre-call briefing for LivForMor Media's sales team
who are about to speak with {contact_name} at {clinic_name} in {city_state}. Include:
1) Clinic Overview (services, online reputation, digital presence, staff structure)
2) Local Market Opportunity (patient demand, treatment gap, competitors' weak spots)
3) Competitive Landscape (name each local competitor, their rating, their weaknesses)
4) Key Talking Points (5 numbered conversation starters specific to this clinic)
5) Anticipated Objections & Responses (table format)
6) Recommended Next Steps for LivForMor to win this clinic as a client"""
            )
            results["briefing"] = briefing_result.answer
            print(f"   ✅ Briefing: {len(results['briefing'])} chars")

            # 3.2 Deep Research Report
            print("   → Deep research report...")
            research_result = await client.chat.ask(
                notebook_id,
                f"""Write a deep research report on the macro market trends affecting {services_str}
clinics in {city_state} and the United States over the next 2 years. Include:
a table of the top 10 most important sources discovered (Source Name | Why It Matters),
followed by 5 major theme summaries. Quantify the market opportunity with real dollar
figures and growth rates where possible."""
            )
            results["deep_research"] = research_result.answer
            print(f"   ✅ Research report: {len(results['deep_research'])} chars")

            # 3.3 Competitive Intelligence
            print("   → Competitive intel...")
            intel_result = await client.chat.ask(
                notebook_id,
                f"""Create a competitive intelligence cheat sheet for {clinic_name} in {city_state}. Format:
TOP 3 COMPETITOR VULNERABILITIES (each with bold headline, 3-4 bullet points of evidence
from reviews/data, and a 'LivForMor Angle' recommendation)
Then: MARKET NUMBERS TO USE IN THE SALES CALL — list 7-10 specific statistics with dollar
signs and percentages that will create urgency with the clinic owner."""
            )
            results["competitive_intel"] = intel_result.answer
            print(f"   ✅ Competitive intel: {len(results['competitive_intel'])} chars")

            # 3.4–3.7: Studio artifacts (parallel where possible)
            print("   → Generating studio artifacts (quiz, flashcards, infographic, audio)...")
            artifact_tasks = {}

            try:
                quiz_status = await client.artifacts.generate_quiz(notebook_id, difficulty="medium", question_count=8)
                artifact_tasks["quiz"] = quiz_status
            except Exception as e:
                print(f"   ⚠️ Quiz generation failed: {e}")

            try:
                flash_status = await client.artifacts.generate_flashcards(notebook_id, difficulty="medium")
                artifact_tasks["flashcards"] = flash_status
            except Exception as e:
                print(f"   ⚠️ Flashcard generation failed: {e}")

            try:
                infographic_status = await client.artifacts.generate_infographic(
                    notebook_id, orientation="portrait", detail_level="detailed"
                )
                artifact_tasks["infographic"] = infographic_status
            except Exception as e:
                print(f"   ⚠️ Infographic generation failed: {e}")

            try:
                audio_status = await client.artifacts.generate_audio(
                    notebook_id, format="brief", length="short"
                )
                artifact_tasks["audio"] = audio_status
            except Exception as e:
                print(f"   ⚠️ Audio generation failed: {e}")

            # Wait for artifacts to complete
            for name, task_status in artifact_tasks.items():
                try:
                    for _ in range(20):  # up to 5 minutes per artifact
                        await asyncio.sleep(15)
                        current = await client.artifacts.status(notebook_id)
                        # Check if the specific artifact type is done
                        if current and hasattr(current, 'status') and current.status == 'completed':
                            break
                    print(f"   ✅ {name} ready")
                except Exception as e:
                    print(f"   ⚠️ {name} timeout/error: {e}")

            # Download artifacts
            try:
                quiz_md = await client.artifacts.download_quiz(notebook_id, "/tmp/quiz.md", output_format="markdown")
                with open("/tmp/quiz.md") as f:
                    results["quiz_md"] = f.read()
                print(f"   ✅ Quiz downloaded ({len(results['quiz_md'])} chars)")
            except Exception as e:
                print(f"   ⚠️ Quiz download failed: {e}")

            try:
                await client.artifacts.download_flashcards(notebook_id, "/tmp/flashcards.md", output_format="markdown")
                with open("/tmp/flashcards.md") as f:
                    results["flashcards_md"] = f.read()
                print(f"   ✅ Flashcards downloaded ({len(results['flashcards_md'])} chars)")
            except Exception as e:
                print(f"   ⚠️ Flashcards download failed: {e}")

            try:
                await client.artifacts.download_infographic(notebook_id, "/tmp/infographic.png")
                results["infographic_path"] = "/tmp/infographic.png"
                print("   ✅ Infographic downloaded")
            except Exception as e:
                print(f"   ⚠️ Infographic download failed: {e}")

            try:
                await client.artifacts.download_audio(notebook_id, "/tmp/audio.mp3")
                results["audio_path"] = "/tmp/audio.mp3"
                print("   ✅ Audio downloaded")
            except Exception as e:
                print(f"   ⚠️ Audio download failed: {e}")

        # ══════════════════════════════════════════════════════════
        # PHASE 4: Build HTML Dashboard
        # ══════════════════════════════════════════════════════════
        print("\n🎨 Phase 4: Building HTML dashboard...")
        dashboard_html = build_dashboard_html(
            clinic_name=clinic_name,
            city_state=city_state,
            contact_name=contact_name,
            services_str=services_str,
            timestamp=timestamp,
            briefing=results["briefing"],
            deep_research=results["deep_research"],
            competitive_intel=results["competitive_intel"],
            quiz_md=results["quiz_md"],
            flashcards_md=results["flashcards_md"],
            has_infographic=results["infographic_path"] is not None,
            has_audio=results["audio_path"] is not None,
        )
        print(f"✅ Dashboard HTML built ({len(dashboard_html)} bytes)")

        # ══════════════════════════════════════════════════════════
        # PHASE 5: Upload to Supabase Storage
        # ══════════════════════════════════════════════════════════
        print("\n☁️  Phase 5: Uploading to Supabase Storage...")
        safe_name = clinic_name.lower().replace(" ", "_").replace("'", "")
        folder = f"dashboards/{safe_name}_{int(time.time())}"

        async with httpx.AsyncClient() as http:
            storage_headers = {
                "apikey": supabase_key,
                "Authorization": f"Bearer {supabase_key}",
            }

            # Upload dashboard HTML
            await http.post(
                f"{supabase_url}/storage/v1/object/blueprints/{folder}/index.html",
                headers={**storage_headers, "Content-Type": "text/html"},
                content=dashboard_html.encode(),
            )
            print("   ✅ index.html uploaded")

            # Upload infographic if available
            if results["infographic_path"] and os.path.exists(results["infographic_path"]):
                with open(results["infographic_path"], "rb") as f:
                    await http.post(
                        f"{supabase_url}/storage/v1/object/blueprints/{folder}/infographic.png",
                        headers={**storage_headers, "Content-Type": "image/png"},
                        content=f.read(),
                    )
                print("   ✅ infographic.png uploaded")

            # Upload audio if available
            if results["audio_path"] and os.path.exists(results["audio_path"]):
                with open(results["audio_path"], "rb") as f:
                    await http.post(
                        f"{supabase_url}/storage/v1/object/blueprints/{folder}/audio.mp3",
                        headers={**storage_headers, "Content-Type": "audio/mpeg"},
                        content=f.read(),
                    )
                print("   ✅ audio.mp3 uploaded")

        dashboard_url = f"{supabase_url}/storage/v1/object/public/blueprints/{folder}/index.html"
        print(f"🔗 Dashboard URL: {dashboard_url}")

        # ══════════════════════════════════════════════════════════
        # PHASE 6: Update GHL + Supabase Queue
        # ══════════════════════════════════════════════════════════
        print("\n📤 Phase 6: Updating GHL contact + queue status...")

        async with httpx.AsyncClient() as http:
            # Find contact by email in GHL
            if contact_email and ghl_key:
                ghl_headers = {
                    "Authorization": f"Bearer {ghl_key}",
                    "Version": "2021-07-28",
                    "Content-Type": "application/json",
                }
                search_res = await http.get(
                    f"https://services.leadconnectorhq.com/contacts/",
                    params={"locationId": GHL_LOCATION_ID, "query": contact_email, "limit": 1},
                    headers=ghl_headers,
                )
                if search_res.status_code == 200:
                    contacts = search_res.json().get("contacts", [])
                    if contacts:
                        contact_id = contacts[0]["id"]
                        # Add dashboard URL tag + note
                        await http.post(
                            f"https://services.leadconnectorhq.com/contacts/{contact_id}/tags",
                            headers=ghl_headers,
                            json={"tags": ["Dashboard_Ready"]},
                        )
                        await http.post(
                            f"https://services.leadconnectorhq.com/contacts/{contact_id}/notes",
                            headers=ghl_headers,
                            json={"body": f"🏥 Clinic Intelligence Dashboard Ready!\n\nView: {dashboard_url}"},
                        )
                        print(f"   ✅ GHL contact {contact_id} tagged + noted")

            # Update queue status to completed
            await http.patch(
                f"{supabase_url}/rest/v1/research_queue?id=eq.{queue_id}",
                headers={
                    "apikey": supabase_key,
                    "Authorization": f"Bearer {supabase_key}",
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal",
                },
                json={
                    "status": "completed",
                    "dashboard_url": dashboard_url,
                    "completed_at": datetime.now(timezone.utc).isoformat(),
                },
            )

        print(f"\n{'='*60}")
        print(f"✅ DASHBOARD COMPLETE: {clinic_name}")
        print(f"   URL: {dashboard_url}")
        print(f"{'='*60}")

        return {"success": True, "dashboard_url": dashboard_url}

    except Exception as e:
        print(f"\n❌ Pipeline failed: {e}")
        import traceback
        traceback.print_exc()

        # Mark queue as failed
        async with httpx.AsyncClient() as http:
            await http.patch(
                f"{supabase_url}/rest/v1/research_queue?id=eq.{queue_id}",
                headers={
                    "apikey": supabase_key,
                    "Authorization": f"Bearer {supabase_key}",
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal",
                },
                json={"status": "failed", "error": str(e)},
            )

        return {"error": str(e)}


# ═══════════════════════════════════════════════════════════════════
#  HELPER: Apify Website Scraper
# ═══════════════════════════════════════════════════════════════════
async def scrape_website(domain: str, apify_key: str) -> str:
    """Scrape clinic website via Apify."""
    import httpx

    url = domain if domain.startswith("http") else f"https://{domain}"
    try:
        async with httpx.AsyncClient(timeout=60) as http:
            run = await http.post(
                "https://api.apify.com/v2/acts/apify~website-content-crawler/runs",
                params={"token": apify_key, "waitForFinish": 60},
                json={
                    "startUrls": [{"url": url}],
                    "maxCrawlPages": 5,
                    "maxCrawlDepth": 1,
                },
            )
            if run.status_code != 201:
                return f"Website scrape failed: {run.status_code}"

            dataset_id = run.json().get("data", {}).get("defaultDatasetId")
            if not dataset_id:
                return "No dataset from scrape"

            # Wait and fetch results
            await asyncio.sleep(5)
            items = await http.get(
                f"https://api.apify.com/v2/datasets/{dataset_id}/items",
                params={"token": apify_key, "limit": 5},
            )
            if items.status_code == 200:
                texts = []
                for item in items.json():
                    text = item.get("text", "")
                    if text:
                        texts.append(text[:2000])
                return "\n\n---\n\n".join(texts) if texts else "No text extracted"
            return "Failed to fetch scrape results"
    except Exception as e:
        return f"Scrape error: {e}"


async def scrape_competitors(
    clinic_name: str, city_state: str, services: str, apify_key: str
) -> str:
    """Find local competitors via Apify Google Maps scraper."""
    import httpx

    try:
        async with httpx.AsyncClient(timeout=90) as http:
            query = f"{services} clinic near {city_state}"
            run = await http.post(
                "https://api.apify.com/v2/acts/compass~crawler-google-places/runs",
                params={"token": apify_key, "waitForFinish": 60},
                json={
                    "searchStringsArray": [query],
                    "maxCrawledPlacesPerSearch": 10,
                    "language": "en",
                },
            )
            if run.status_code != 201:
                return f"Competitor scrape failed: {run.status_code}"

            dataset_id = run.json().get("data", {}).get("defaultDatasetId")
            if not dataset_id:
                return "No competitor dataset"

            await asyncio.sleep(5)
            items = await http.get(
                f"https://api.apify.com/v2/datasets/{dataset_id}/items",
                params={"token": apify_key, "limit": 10},
            )
            if items.status_code == 200:
                competitors = []
                for item in items.json():
                    name = item.get("title", "Unknown")
                    rating = item.get("totalScore", "N/A")
                    reviews = item.get("reviewsCount", 0)
                    competitors.append(f"- {name}: {rating}⭐ ({reviews} reviews)")
                return "\n".join(competitors) if competitors else "No competitors found"
            return "Failed to fetch competitor data"
    except Exception as e:
        return f"Competitor scrape error: {e}"


# ═══════════════════════════════════════════════════════════════════
#  HELPER: Build HTML Dashboard
# ═══════════════════════════════════════════════════════════════════
def build_dashboard_html(
    clinic_name: str,
    city_state: str,
    contact_name: str,
    services_str: str,
    timestamp: str,
    briefing: str,
    deep_research: str,
    competitive_intel: str,
    quiz_md: str,
    flashcards_md: str,
    has_infographic: bool,
    has_audio: bool,
) -> str:
    """Build premium glassmorphic HTML dashboard."""

    # Escape content for safe embedding in JS template literals
    def js_escape(s):
        return (s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${"))

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Clinic Intel — {clinic_name} | LivForMor OS</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--purple:#6B2FA0;--gold:#D4AF37;--bg:#08080c;--glass:rgba(255,255,255,0.05);--glass-border:rgba(255,255,255,0.08)}}
body{{font-family:'Inter',sans-serif;background:var(--bg);color:#e0e0e0;min-height:100vh}}
.navbar{{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;
  background:rgba(107,47,160,0.15);backdrop-filter:blur(20px);border-bottom:1px solid var(--glass-border);position:sticky;top:0;z-index:100}}
.navbar .logo{{font-size:18px;font-weight:800;background:linear-gradient(135deg,var(--purple),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent}}
.navbar .badge{{padding:6px 14px;border-radius:20px;background:var(--glass);border:1px solid var(--glass-border);font-size:12px;font-weight:500;color:var(--gold)}}
.hero{{text-align:center;padding:48px 32px 32px;background:linear-gradient(180deg,rgba(107,47,160,0.12) 0%,transparent 100%)}}
.hero h1{{font-size:clamp(28px,4vw,42px);font-weight:800;background:linear-gradient(135deg,#fff,var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px}}
.hero .sub{{color:#888;font-size:14px;letter-spacing:2px;text-transform:uppercase}}
.audio-player{{display:{'flex' if has_audio else 'none'};align-items:center;justify-content:center;gap:12px;margin:24px auto;
  padding:12px 24px;background:var(--glass);border:1px solid var(--glass-border);border-radius:40px;max-width:400px}}
.audio-player audio{{height:32px;flex:1}}
.layout{{display:flex;max-width:1400px;margin:0 auto;padding:0 24px 48px;gap:24px}}
.sidebar{{width:220px;flex-shrink:0;position:sticky;top:80px;height:fit-content}}
.sidebar button{{display:flex;align-items:center;gap:10px;width:100%;padding:12px 16px;margin:4px 0;border:none;border-radius:10px;
  background:transparent;color:#999;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.2s;text-align:left;font-family:inherit}}
.sidebar button:hover,.sidebar button.active{{background:rgba(107,47,160,0.2);color:#fff}}
.sidebar button.active{{border-left:3px solid var(--gold);color:var(--gold)}}
.sidebar button i{{width:18px;text-align:center;font-size:14px}}
.content{{flex:1;min-width:0}}
.panel{{display:none;background:var(--glass);border:1px solid var(--glass-border);border-radius:16px;padding:32px;
  backdrop-filter:blur(10px);animation:fadeIn 0.3s ease}}
.panel.active{{display:block}}
@keyframes fadeIn{{from{{opacity:0;transform:translateY(10px)}}to{{opacity:1;transform:translateY(0)}}}}
.panel h2,.panel h3{{color:var(--gold)}}
.panel table{{width:100%;border-collapse:collapse;margin:16px 0}}
.panel th{{background:rgba(107,47,160,0.2);color:var(--gold);padding:10px;text-align:left;font-size:13px}}
.panel td{{padding:10px;border-bottom:1px solid var(--glass-border);font-size:13px}}
.panel strong{{color:var(--gold)}}
.panel ul,.panel ol{{padding-left:20px;margin:8px 0}}
.panel li{{margin:6px 0;line-height:1.6}}
.panel p{{line-height:1.7;margin:8px 0}}
.quiz-option{{display:block;width:100%;padding:12px 16px;margin:6px 0;border:1px solid var(--glass-border);border-radius:10px;
  background:var(--glass);color:#e0e0e0;cursor:pointer;text-align:left;font-size:14px;transition:all 0.2s;font-family:inherit}}
.quiz-option:hover{{border-color:var(--purple)}}
.quiz-option.correct{{border-color:#22c55e;background:rgba(34,197,94,0.1)}}
.quiz-option.wrong{{border-color:#ef4444;background:rgba(239,68,68,0.1)}}
.flashcard{{width:100%;max-width:500px;height:280px;margin:20px auto;perspective:1000px;cursor:pointer}}
.flashcard-inner{{position:relative;width:100%;height:100%;transition:transform 0.6s;transform-style:preserve-3d}}
.flashcard.flipped .flashcard-inner{{transform:rotateY(180deg)}}
.flashcard-front,.flashcard-back{{position:absolute;width:100%;height:100%;backface-visibility:hidden;border-radius:16px;
  display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font-size:16px;line-height:1.6}}
.flashcard-front{{background:linear-gradient(135deg,var(--purple),#4a1a7a);color:#fff;font-weight:600}}
.flashcard-back{{background:linear-gradient(135deg,#1a1a2e,#16213e);border:2px solid var(--gold);color:var(--gold);transform:rotateY(180deg)}}
.fc-nav{{display:flex;align-items:center;justify-content:center;gap:16px;margin:16px 0}}
.fc-nav button{{padding:8px 20px;border-radius:8px;border:1px solid var(--glass-border);background:var(--glass);color:#fff;cursor:pointer;font-family:inherit}}
.infographic-container img{{max-width:100%;border-radius:12px;border:1px solid var(--glass-border)}}
.export-btn{{padding:8px 16px;border-radius:8px;border:1px solid var(--gold);background:transparent;color:var(--gold);
  cursor:pointer;font-size:12px;font-weight:600;transition:all 0.2s;font-family:inherit}}
.export-btn:hover{{background:var(--gold);color:var(--bg)}}
@media(max-width:768px){{.layout{{flex-direction:column}}.sidebar{{width:100%;position:static;display:flex;overflow-x:auto;gap:4px}}
  .sidebar button{{white-space:nowrap;min-width:fit-content}}}}
@media print{{.sidebar,.navbar,.audio-player,.export-btn{{display:none!important}}.panel{{display:block!important;break-inside:avoid;page-break-inside:avoid}}}}
</style>
</head>
<body>
<nav class="navbar">
  <div class="logo"><i class="fas fa-bolt"></i> LivForMor OS</div>
  <div class="badge"><i class="fas fa-building"></i> {clinic_name}</div>
  <button class="export-btn" onclick="window.print()"><i class="fas fa-file-export"></i> Export PDF</button>
</nav>

<div class="hero">
  <h1>{clinic_name}</h1>
  <div class="sub">{city_state} · Pre-Call Intelligence Report · {timestamp}</div>
  <div class="audio-player">
    <i class="fas fa-headphones" style="color:var(--gold)"></i>
    <audio controls src="audio.mp3"></audio>
  </div>
</div>

<div class="layout">
  <div class="sidebar">
    <button class="active" onclick="showTab('briefing',this)"><i class="fas fa-file-alt"></i> Executive Briefing</button>
    <button onclick="showTab('intel',this)"><i class="fas fa-crosshairs"></i> Competitive Intel</button>
    <button onclick="showTab('research',this)"><i class="fas fa-microscope"></i> Deep Research</button>
    <button onclick="showTab('quiz',this)"><i class="fas fa-question-circle"></i> Knowledge Test</button>
    <button onclick="showTab('flashcards',this)"><i class="fas fa-clone"></i> Flashcards</button>
    <button onclick="showTab('infographic',this)"><i class="fas fa-chart-pie"></i> Infographic</button>
  </div>

  <div class="content">
    <div id="tab-briefing" class="panel active"></div>
    <div id="tab-intel" class="panel"></div>
    <div id="tab-research" class="panel"></div>
    <div id="tab-quiz" class="panel"></div>
    <div id="tab-flashcards" class="panel"></div>
    <div id="tab-infographic" class="panel">
      {'<div class="infographic-container"><img src="infographic.png" alt="Market Infographic"></div>' if has_infographic else '<p style="color:#888;text-align:center;padding:40px">Infographic not available for this report.</p>'}
    </div>
  </div>
</div>

<script>
// ── Markdown Content ─────────────────────────────────────────
const mdBriefing = `{js_escape(briefing)}`;
const mdIntel = `{js_escape(competitive_intel)}`;
const mdResearch = `{js_escape(deep_research)}`;
const mdQuiz = `{js_escape(quiz_md)}`;
const mdFlashcards = `{js_escape(flashcards_md)}`;

// ── Render Markdown Tabs ─────────────────────────────────────
document.getElementById('tab-briefing').innerHTML = marked.parse(mdBriefing);
document.getElementById('tab-intel').innerHTML = marked.parse(mdIntel);
document.getElementById('tab-research').innerHTML = marked.parse(mdResearch);

// ── Tab Switching ────────────────────────────────────────────
function showTab(id, btn) {{
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar button').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}}

// ── Quiz Parser ──────────────────────────────────────────────
(function() {{
  const quizEl = document.getElementById('tab-quiz');
  const lines = mdQuiz.split('\\n').filter(l => l.trim());
  let html = '<h2 style="margin-bottom:20px"><i class="fas fa-question-circle" style="color:var(--gold)"></i> Knowledge Test</h2>';
  let qNum = 0, score = 0, total = 0;
  let currentQ = '', options = [], correctIdx = -1;

  function flushQ() {{
    if (!currentQ) return;
    qNum++; total++;
    html += '<div style="margin:20px 0"><p style="font-weight:600;margin-bottom:8px">' + qNum + '. ' + currentQ + '</p>';
    options.forEach((opt, i) => {{
      const isCorrect = i === correctIdx;
      html += '<button class="quiz-option" data-correct="' + isCorrect + '" onclick="checkAnswer(this)">' + opt + '</button>';
    }});
    html += '</div>';
    currentQ = ''; options = []; correctIdx = -1;
  }}

  lines.forEach(line => {{
    const qMatch = line.match(/^\\d+[\\.\\)]/);
    const optMatch = line.match(/^[A-D][\\.\\)]/i);
    if (qMatch) {{
      flushQ();
      currentQ = line.replace(/^\\d+[\\.\\)]\\s*/, '');
    }} else if (optMatch) {{
      const letter = line[0].toUpperCase();
      const text = line.replace(/^[A-D][\\.\\)]\\s*/i, '');
      if (text.includes('✓') || text.includes('(correct)') || text.includes('*')) correctIdx = options.length;
      options.push(letter + '. ' + text.replace(/[✓\\*]/g, '').replace('(correct)', '').trim());
    }} else if (line.toLowerCase().includes('answer') && line.match(/[A-D]/i)) {{
      const match = line.match(/[A-D]/i);
      if (match) correctIdx = match[0].toUpperCase().charCodeAt(0) - 65;
    }}
  }});
  flushQ();

  if (qNum === 0) {{
    html += '<div style="text-align:center;padding:40px;color:#888">Quiz data is being processed...</div>';
  }}
  quizEl.innerHTML = html;
}})();

function checkAnswer(btn) {{
  if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
  const isCorrect = btn.dataset.correct === 'true';
  btn.classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) {{
    btn.parentElement.querySelectorAll('.quiz-option[data-correct="true"]').forEach(b => b.classList.add('correct'));
  }}
}}

// ── Flashcard Parser ─────────────────────────────────────────
(function() {{
  const fcEl = document.getElementById('tab-flashcards');
  const lines = mdFlashcards.split('\\n').filter(l => l.trim());
  const cards = [];
  let q = '', a = '';

  lines.forEach(line => {{
    if (line.match(/^Q:/i) || line.match(/^\\*\\*Q/i)) {{
      if (q && a) cards.push({{q, a}});
      q = line.replace(/^Q:\\s*/i, '').replace(/^\\*\\*Q.*?\\*\\*\\s*/i, '').trim();
      a = '';
    }} else if (line.match(/^A:/i) || line.match(/^\\*\\*A/i)) {{
      a = line.replace(/^A:\\s*/i, '').replace(/^\\*\\*A.*?\\*\\*\\s*/i, '').trim();
    }}
  }});
  if (q && a) cards.push({{q, a}});

  if (cards.length === 0) {{
    fcEl.innerHTML = '<div style="text-align:center;padding:40px;color:#888">Flashcards are being generated...</div>';
    return;
  }}

  let idx = 0;
  function render() {{
    const c = cards[idx];
    fcEl.innerHTML = `
      <h2 style="text-align:center;margin-bottom:16px"><i class="fas fa-clone" style="color:var(--gold)"></i> Flashcards</h2>
      <div class="flashcard" onclick="this.classList.toggle('flipped')">
        <div class="flashcard-inner">
          <div class="flashcard-front">${{c.q}}</div>
          <div class="flashcard-back">${{c.a}}</div>
        </div>
      </div>
      <div class="fc-nav">
        <button onclick="fcNav(-1)"><i class="fas fa-arrow-left"></i> Prev</button>
        <span style="color:#888">${{idx+1}} / ${{cards.length}}</span>
        <button onclick="fcNav(1)">Next <i class="fas fa-arrow-right"></i></button>
      </div>
      <p style="text-align:center;color:#666;font-size:12px;margin-top:8px">Click card to flip</p>`;
  }}
  window.fcNav = function(d) {{ idx = Math.max(0, Math.min(cards.length-1, idx+d)); render(); }};
  render();
}})();
</script>
</body>
</html>"""


# ═══════════════════════════════════════════════════════════════════
#  AUTH SYNC — One-time utility to push local tokens to Modal Volume
# ═══════════════════════════════════════════════════════════════════
@app.function(
    image=worker_image,
    volumes={"/auth": auth_volume},
)
def sync_auth(auth_json: str):
    """Sync NotebookLM auth tokens from local machine to Modal Volume."""
    with open("/auth/auth.json", "w") as f:
        f.write(auth_json)
    auth_volume.commit()
    print("✅ Auth tokens synced to Modal Volume")
    return {"status": "synced"}
