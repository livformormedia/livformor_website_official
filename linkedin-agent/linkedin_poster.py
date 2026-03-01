"""
LivForMor Media — LinkedIn Auto-Poster
======================================
Modal scheduled agent: fires every 4 days, posts the next pending
LinkedIn post from Supabase, marks it done. That's it.

Secrets required (already set in Modal → LINKEDIN_POSTER_SECRETS):
  LINKEDIN_ACCESS_TOKEN       LinkedIn OAuth 2.0 access token
  LINKEDIN_PERSON_URN         urn:li:person:XXXXX  OR  urn:li:organization:XXXXX
  SUPABASE_URL                https://yrfobzuiqcuhylstiukn.supabase.co
  SUPABASE_SERVICE_ROLE_KEY   Supabase service role key

Four keys. All already set. Nothing else needed.
"""

import modal
import os
import httpx
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Modal app + image
# ---------------------------------------------------------------------------

app = modal.App("livformor-linkedin-poster")

image = (
    modal.Image.debian_slim()
    .pip_install("httpx", "supabase")
)

secret = modal.Secret.from_name("LINKEDIN_POSTER_SECRETS")


# ---------------------------------------------------------------------------
# LinkedIn image upload (3-step native asset upload)
# ---------------------------------------------------------------------------

def upload_image_to_linkedin(access_token: str, person_urn: str, image_url: str) -> str | None:
    """
    Upload an image to LinkedIn's asset service.
    Returns the asset URN, or None if anything fails (falls back to text-only).
    """
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
    }

    # Step 1 — Register the upload slot
    register_payload = {
        "registerUploadRequest": {
            "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
            "owner": person_urn,
            "serviceRelationships": [{
                "relationshipType": "OWNER",
                "identifier": "urn:li:userGeneratedContent"
            }]
        }
    }

    try:
        reg = httpx.post(
            "https://api.linkedin.com/v2/assets?action=registerUpload",
            headers=headers,
            json=register_payload,
            timeout=30,
        )
        if reg.status_code != 200:
            print(f"⚠️  Image register failed ({reg.status_code}) — posting text-only")
            return None

        upload_url = reg.json()["value"]["uploadMechanism"]["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]["uploadUrl"]
        asset_urn  = reg.json()["value"]["asset"]

        # Step 2 — Fetch the image bytes from the stored URL
        img = httpx.get(image_url, timeout=30, follow_redirects=True)
        if img.status_code != 200:
            print(f"⚠️  Could not fetch image ({img.status_code}) — posting text-only")
            return None

        # Step 3 — PUT image bytes to LinkedIn's upload URL
        put = httpx.put(
            upload_url,
            content=img.content,
            headers={"Content-Type": img.headers.get("content-type", "image/jpeg")},
            timeout=60,
        )
        if put.status_code not in (200, 201):
            print(f"⚠️  Image PUT failed ({put.status_code}) — posting text-only")
            return None

        print(f"🖼️  Image uploaded. Asset: {asset_urn}")
        return asset_urn

    except Exception as e:
        print(f"⚠️  Image upload error: {e} — posting text-only")
        return None


# ---------------------------------------------------------------------------
# LinkedIn post publisher
# ---------------------------------------------------------------------------

def post_to_linkedin(
    access_token: str,
    person_urn: str,
    content: str,
    image_asset_urn: str | None = None,
) -> str:
    """Publish to LinkedIn. Returns the post URN."""
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
    }

    if image_asset_urn:
        share_media = {
            "shareCommentary": {"text": content},
            "shareMediaCategory": "IMAGE",
            "media": [{
                "status": "READY",
                "description": {"text": ""},
                "media": image_asset_urn,
                "title": {"text": ""},
            }]
        }
    else:
        share_media = {
            "shareCommentary": {"text": content},
            "shareMediaCategory": "NONE",
        }

    payload = {
        "author": person_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": share_media,
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        },
    }

    resp = httpx.post(
        "https://api.linkedin.com/v2/ugcPosts",
        headers=headers,
        json=payload,
        timeout=30,
    )

    if resp.status_code not in (200, 201):
        raise RuntimeError(f"LinkedIn API error {resp.status_code}: {resp.text}")

    post_urn = resp.headers.get("x-restli-id") or resp.json().get("id", "unknown")
    print(f"✅ Posted to LinkedIn. URN: {post_urn}")
    return post_urn


# ---------------------------------------------------------------------------
# Supabase helpers
# ---------------------------------------------------------------------------

def get_next_post(supabase_url: str, supabase_key: str) -> dict | None:
    """Fetch the oldest pending post from Supabase."""
    from supabase import create_client
    client = create_client(supabase_url, supabase_key)
    now_iso = datetime.now(timezone.utc).isoformat()

    # Scheduled posts first
    scheduled = (
        client.table("linkedin_posts")
        .select("*")
        .eq("status", "pending")
        .not_.is_("scheduled_for", "null")
        .lte("scheduled_for", now_iso)
        .order("scheduled_for", desc=False)
        .limit(1)
        .execute()
    )
    if scheduled.data:
        return scheduled.data[0]

    # Otherwise: oldest pending in queue
    unscheduled = (
        client.table("linkedin_posts")
        .select("*")
        .eq("status", "pending")
        .is_("scheduled_for", "null")
        .order("created_at", desc=False)
        .limit(1)
        .execute()
    )
    return unscheduled.data[0] if unscheduled.data else None


def mark_posted(supabase_url: str, supabase_key: str, post_id: str, post_urn: str):
    from supabase import create_client
    client = create_client(supabase_url, supabase_key)
    client.table("linkedin_posts").update({
        "status": "posted",
        "posted_at": datetime.now(timezone.utc).isoformat(),
        "linkedin_post_id": post_urn,
    }).eq("id", post_id).execute()
    print(f"✅ Marked {post_id} as posted in Supabase")


def get_queue_count(supabase_url: str, supabase_key: str) -> int:
    from supabase import create_client
    client = create_client(supabase_url, supabase_key)
    result = (
        client.table("linkedin_posts")
        .select("id", count="exact")
        .eq("status", "pending")
        .execute()
    )
    return result.count or 0


# ---------------------------------------------------------------------------
# Modal scheduled function — fires every 4 days
# ---------------------------------------------------------------------------

@app.function(
    image=image,
    secrets=[secret],
    schedule=modal.Period(days=4),
)
def run_linkedin_poster():
    print(f"🚀 Triggered at {datetime.now(timezone.utc).isoformat()}")

    access_token = os.environ["LINKEDIN_ACCESS_TOKEN"]
    person_urn   = os.environ["LINKEDIN_PERSON_URN"]
    supabase_url = os.environ["SUPABASE_URL"]
    supabase_key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

    post = get_next_post(supabase_url, supabase_key)
    if not post:
        print("📭 Queue empty — nothing to post.")
        return

    print(f"📄 Posting: {post['content'][:100]}...")

    # Upload image if present
    image_asset_urn = None
    if post.get("image_url"):
        image_asset_urn = upload_image_to_linkedin(access_token, person_urn, post["image_url"])

    # Publish
    post_urn = post_to_linkedin(
        access_token=access_token,
        person_urn=person_urn,
        content=post["content"],
        image_asset_urn=image_asset_urn,
    )

    # Mark done
    mark_posted(supabase_url, supabase_key, post["id"], post_urn)

    remaining = get_queue_count(supabase_url, supabase_key)
    print(f"📊 {remaining} posts remaining in queue ({remaining * 4} days of content)")
    print("✅ Done.")


# ---------------------------------------------------------------------------
# Local dry-run test: modal run linkedin_poster.py
# ---------------------------------------------------------------------------

@app.local_entrypoint()
def test_locally():
    print("🧪 Dry-run (no posting)...")
    supabase_url = os.environ.get("SUPABASE_URL", "")
    supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
    if not supabase_url:
        print("❌ Set SUPABASE_URL env var to test")
        return
    post = get_next_post(supabase_url, supabase_key)
    if post:
        print(f"Next post:\n{post['content'][:300]}")
        print(f"Image URL: {post.get('image_url', 'none')}")
    else:
        print("📭 No pending posts")
