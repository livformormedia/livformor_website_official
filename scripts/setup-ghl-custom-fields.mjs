#!/usr/bin/env node
/**
 * setup-ghl-custom-fields.mjs
 * ----------------------------
 * One-time setup script that creates all required GHL Custom Fields
 * for the B2B ads form pipeline on the LivForMor Media sub-account.
 *
 * Usage:  node scripts/setup-ghl-custom-fields.mjs
 *
 * Requirements:
 *   - GHL Private Integration Token with scopes:
 *       locations.readonly, locations/customFields.write, locations/customFields.readonly
 */

const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-7b21573a-57ce-4209-8569-ba2cc75ef2a4';
const LOCATION_ID = process.env.LOCATION_ID || 'MSFgME5t3cZZRgzhEnI2';
const API_BASE = 'https://services.leadconnectorhq.com';
const VERSION = '2021-07-28';

const headers = {
    Authorization: `Bearer ${GHL_API_KEY}`,
    Version: VERSION,
    'Content-Type': 'application/json',
};

// ─── Custom fields we want to ensure exist ───────────────────────────
const DESIRED_FIELDS = [
    { name: 'Clinic Name', dataType: 'TEXT' },
    { name: 'City / State', dataType: 'TEXT' },
    { name: 'Clinic Operational', dataType: 'TEXT' },
    { name: 'Monthly Ad Budget', dataType: 'TEXT' },
    { name: 'Team Structure', dataType: 'TEXT' },
    { name: 'Services Offered', dataType: 'TEXT' },
    { name: 'Lead Qualified', dataType: 'TEXT' },
    { name: 'Source Page', dataType: 'TEXT' },
    { name: 'Blueprint URL', dataType: 'TEXT' },
];

// ─── Helpers ──────────────────────────────────────────────────────────

async function ghlGet(path) {
    const res = await fetch(`${API_BASE}${path}`, { method: 'GET', headers });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`GET ${path} → ${res.status}: ${body}`);
    }
    return res.json();
}

async function ghlPost(path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`POST ${path} → ${res.status}: ${text}`);
    }
    try { return JSON.parse(text); } catch { return text; }
}

// ─── Step 1: Discover Location (Sub-Account) ID ──────────────────────

async function getLocationId() {
    console.log('\n🔍 Step 1: Discovering Location ID...');

    // Try the /locations/search endpoint first (agency-level)
    try {
        const data = await ghlGet('/locations/search?limit=20');
        if (data.locations && data.locations.length > 0) {
            // Look for the LivForMor location
            const livformor = data.locations.find(
                (l) => l.name?.toLowerCase().includes('livformor')
            ) || data.locations[0];

            console.log(`   ✅ Found location: "${livformor.name}" → ${livformor.id}`);
            return livformor.id;
        }
    } catch (err) {
        console.log(`   ⚠️  /locations/search failed: ${err.message}`);
    }

    // If the token is sub-account scoped, try /locations/:id with a GET on custom fields
    // The sub-account token embeds the location ID — we can extract it
    // by calling any location-scoped endpoint
    try {
        // Attempt to list custom fields without a location ID — this sometimes
        // works with sub-account tokens since the ID is embedded in the token
        const data = await ghlGet('/locations/?limit=1');
        if (data.locations && data.locations.length > 0) {
            const loc = data.locations[0];
            console.log(`   ✅ Found location: "${loc.name}" → ${loc.id}`);
            return loc.id;
        }
    } catch (err) {
        console.log(`   ⚠️  /locations/ list failed: ${err.message}`);
    }

    throw new Error(
        'Could not auto-discover Location ID. Please find it in GHL → Settings → Business Info and set LOCATION_ID env var.'
    );
}

// ─── Step 2: Get existing custom fields ──────────────────────────────

async function getExistingFields(locationId) {
    console.log('\n📋 Step 2: Fetching existing custom fields...');
    const data = await ghlGet(`/locations/${locationId}/customFields`);
    const fields = data.customFields || [];
    console.log(`   Found ${fields.length} existing custom fields.`);
    return fields;
}

// ─── Step 3: Create missing custom fields ────────────────────────────

async function createMissingFields(locationId, existingFields) {
    console.log('\n🛠️  Step 3: Creating missing custom fields...\n');

    const existingNames = new Set(existingFields.map((f) => f.name.toLowerCase()));
    const created = [];
    const skipped = [];

    for (const field of DESIRED_FIELDS) {
        if (existingNames.has(field.name.toLowerCase())) {
            const existing = existingFields.find(
                (f) => f.name.toLowerCase() === field.name.toLowerCase()
            );
            skipped.push({ name: field.name, id: existing?.id, key: existing?.fieldKey });
            console.log(`   ⏭️  "${field.name}" already exists (key: ${existing?.fieldKey})`);
            continue;
        }

        try {
            const result = await ghlPost(`/locations/${locationId}/customFields`, {
                name: field.name,
                dataType: field.dataType,
                model: 'contact',
            });

            const newField = result.customField || result;
            created.push({
                name: field.name,
                id: newField.id,
                key: newField.fieldKey,
            });
            console.log(`   ✅ Created "${field.name}" → key: ${newField.fieldKey}, id: ${newField.id}`);

            // Small delay to avoid rate-limiting
            await new Promise((r) => setTimeout(r, 300));
        } catch (err) {
            console.error(`   ❌ Failed to create "${field.name}": ${err.message}`);
        }
    }

    return { created, skipped };
}

// ─── Step 4: Summary ─────────────────────────────────────────────────

function printSummary(created, skipped) {
    console.log('\n' + '═'.repeat(60));
    console.log('📊 SUMMARY');
    console.log('═'.repeat(60));

    if (created.length > 0) {
        console.log(`\n✅ Created ${created.length} new custom fields:`);
        console.log('┌──────────────────────┬──────────────────────────┬──────────────────────────────┐');
        console.log('│ Name                 │ Field Key                │ ID                           │');
        console.log('├──────────────────────┼──────────────────────────┼──────────────────────────────┤');
        for (const f of created) {
            console.log(
                `│ ${(f.name || '').padEnd(20)} │ ${(f.key || '').padEnd(24)} │ ${(f.id || '').padEnd(28)} │`
            );
        }
        console.log('└──────────────────────┴──────────────────────────┴──────────────────────────────┘');
    }

    if (skipped.length > 0) {
        console.log(`\n⏭️  Skipped ${skipped.length} fields (already exist):`);
        for (const f of skipped) {
            console.log(`   - ${f.name} (key: ${f.key})`);
        }
    }

    console.log('\n💡 Next step: Use the field keys above in your edge function to populate custom fields');
    console.log('   when creating/updating contacts via the GHL API.\n');
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
    console.log('🚀 GHL Custom Fields Setup for LivForMor Media');
    console.log('═'.repeat(50));

    try {
        const locationId = LOCATION_ID;
        console.log(`\n📍 Using Location ID: ${locationId}`);
        const existingFields = await getExistingFields(locationId);
        const { created, skipped } = await createMissingFields(locationId, existingFields);

        printSummary(created, skipped);

        // Also print the field mapping for use in edge functions
        const allFields = [...created, ...skipped];
        if (allFields.length > 0) {
            console.log('📝 Field Key Mapping (copy to edge function):');
            console.log('─'.repeat(50));
            console.log('const CUSTOM_FIELD_KEYS = {');
            for (const f of allFields) {
                const jsKey = f.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '_')
                    .replace(/^_|_$/g, '');
                console.log(`  ${jsKey}: "${f.key}",`);
            }
            console.log('};');
            console.log('');
        }
    } catch (err) {
        console.error(`\n❌ Fatal error: ${err.message}`);
        process.exit(1);
    }
}

main();
