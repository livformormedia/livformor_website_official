#!/bin/bash
# LivForMor Auto Dashboard — Startup Script
# Syncs NotebookLM cookies from MCP CLI then starts the auto-processor.
# Run this once, or use the LaunchAgent for auto-start.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🔄 Syncing NotebookLM cookies..."

# Convert MCP cookies to notebooklm-py format
python3 -c "
import json, os
mcp_cookies = '/Users/orielmor/.notebooklm-mcp-cli/profiles/default/cookies.json'
if os.path.exists(mcp_cookies):
    with open(mcp_cookies) as f:
        chrome_cookies = json.load(f)
    pw_cookies = [{'name': c.get('name',''), 'value': c.get('value',''), 'domain': c.get('domain',''),
                   'path': c.get('path','/'), 'expires': c.get('expires',-1),
                   'httpOnly': c.get('httpOnly',False), 'secure': c.get('secure',False),
                   'sameSite': c.get('sameSite','None')} for c in chrome_cookies]
    os.makedirs('/Users/orielmor/.notebooklm', exist_ok=True)
    with open('/Users/orielmor/.notebooklm/storage_state.json', 'w') as f:
        json.dump({'cookies': pw_cookies, 'origins': []}, f)
    print(f'  ✅ Synced {len(pw_cookies)} cookies')
else:
    print('  ⚠️ No MCP cookies found. Run: nlm login')
"

echo "🚀 Starting auto-dashboard processor..."
cd "$PROJECT_DIR"
exec python3 scripts/auto-dashboard.py
