# LinkedIn Auto-Poster — Setup Guide

## How It Works

Every **4 days**, a Modal cloud function fires automatically:
1. Reads the **oldest pending** post from the `linkedin_posts` Supabase table
2. Posts it to your LinkedIn via the API
3. Marks it as `posted` in Supabase — never double-posts
4. Logs remaining queue count

---

## One-Time Setup (you do this once, ~10 minutes)

### Step 1 — Create a LinkedIn App

1. Go to [linkedin.com/developers/apps/new](https://www.linkedin.com/developers/apps/new)
2. Create an app:
   - App Name: `LivForMor Poster`
   - LinkedIn Page: your personal profile (or LivForMor Media company page)
   - App Logo: anything
3. After creation → **Products** tab → request access to:
   - ✅ **Share on LinkedIn** (this is the only one you need)
4. **Auth** tab → Add this redirect URI exactly:
   ```
   https://oauth.pstmn.io/v1/callback
   ```
5. Copy your **Client ID** and **Client Secret**

---

### Step 2 — Get Your Access Token (via Postman)

1. Open [web.postman.co](https://web.postman.co) (free, no install needed)
2. New request → **Authorization** tab
3. Type: **OAuth 2.0**
4. Fill in:
   - **Auth URL:** `https://www.linkedin.com/oauth/v2/authorization`
   - **Access Token URL:** `https://www.linkedin.com/oauth/v2/accessToken`
   - **Client ID:** (from Step 1)
   - **Client Secret:** (from Step 1)
   - **Scope:** `w_member_social openid profile`
   - **State:** any random string
5. Click **Get New Access Token** → log in with your LinkedIn → **Authorize**
6. Copy the **Access Token** that appears

> ⚠️ LinkedIn tokens last **60 days**. Set a calendar reminder to refresh it every 50 days.

---

### Step 3 — Get Your LinkedIn Person URN

Run this in your terminal (replace `YOUR_TOKEN`):

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "X-Restli-Protocol-Version: 2.0.0" \
     "https://api.linkedin.com/v2/userinfo"
```

Look for `"sub": "urn:li:person:XXXXXXX"` — that's your person URN.

---

### Step 4 — Create Modal Secret

1. Go to [modal.com](https://modal.com) → **Secrets** → **New Secret**
2. Name it exactly: `LINKEDIN_POSTER_SECRETS`
3. Add these 4 keys:

| Key | Value |
|-----|-------|
| `LINKEDIN_ACCESS_TOKEN` | The token from Step 2 |
| `LINKEDIN_PERSON_URN` | `urn:li:person:XXXXXXX` from Step 3 |
| `SUPABASE_URL` | `https://yrfobzuiqcuhylstiukn.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key (Settings → API) |

---

### Step 5 — Deploy

```bash
cd linkedin-agent
pip install modal supabase httpx
modal deploy linkedin_poster.py
```

That's it. The agent runs every 4 days automatically. You'll see it in your Modal dashboard.

---

## Managing the Queue

### Add a new post to the queue
Go to Supabase → Table Editor → `linkedin_posts` → Insert row:
- `content`: your post text
- `status`: `pending`
- `scheduled_for`: optional specific date, or leave null

### Skip a post without deleting it
Set its `status` to `skip`.

### See what posts are queued
```sql
SELECT id, LEFT(content, 80) AS preview, status, scheduled_for, created_at
FROM linkedin_posts
ORDER BY status, scheduled_for ASC NULLS LAST, created_at ASC;
```

### Current queue (already loaded)
| # | Preview | Source |
|---|---------|--------|
| 1 | "HOT TAKE: Most ketamine and TMS clinics aren't losing..." | Blog Post #1 |
| 2 | "7 marketing mistakes that are quietly killing..." | Blog Post #1 |
| 3 | "I talked to a ketamine clinic operator last year..." | Blog Post #1 |
| 4 | "HOT TAKE: Most clinics running Google Ads..." (LegitScript) | Blog Post #2 |
| 5 | "The complete Google Ads keyword strategy..." | Blog Post #2 |
| 6 | "A TMS clinic was spending $5,500/month..." (landing page) | Blog Post #2 |

---

## Change Posting Frequency

In `linkedin_poster.py`, line with `modal.Period(days=4)`:
- Every 3 days: `modal.Period(days=3)`
- Twice a week: `modal.Cron("0 9 * * 2,5")` (Tue + Fri at 9am UTC)
