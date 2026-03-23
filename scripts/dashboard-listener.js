#!/usr/bin/env node
/**
 * LivForMor Dashboard Listener
 * 
 * Subscribes to Supabase Realtime on the `research_queue` table.
 * When a new lead comes in (status = 'pending'), it prints the
 * AntiGravity command to run the clinic-dashboard-generator skill.
 * 
 * Usage:
 *   node scripts/dashboard-listener.js
 * 
 * Requirements:
 *   npm install @supabase/supabase-js
 */

import { createClient } from '@supabase/supabase-js';
import { exec } from 'child_process';

// ─── Config ───────────────────────────────────────────────────────
const SUPABASE_URL = 'https://yrfobzuiqcuhylstiukn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZm9ienVpcWN1aHlsc3RpdWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjExMDIsImV4cCI6MjA4NjAzNzEwMn0.Rvv0jffFSDYejIpddmD8UMTS599-xx58iWAU3l24ca0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── State ────────────────────────────────────────────────────────
let isProcessing = false;

// ─── Notification Sound (macOS) ───────────────────────────────────
function notify(title, message) {
    const escaped = message.replace(/"/g, '\\"');
    exec(`osascript -e 'display notification "${escaped}" with title "${title}" sound name "Glass"'`);
}

// ─── Process a new queue entry ────────────────────────────────────
async function processEntry(entry) {
    if (isProcessing) {
        console.log(`⏳ Already processing, will queue: ${entry.clinic_name}`);
        return;
    }

    isProcessing = true;
    const { id, clinic_name, clinic_domain, services, city_state, contact_name } = entry;

    console.log('\n' + '═'.repeat(60));
    console.log(`🚨 NEW CLINIC LEAD DETECTED`);
    console.log('═'.repeat(60));
    console.log(`  Clinic:   ${clinic_name}`);
    console.log(`  Domain:   ${clinic_domain}`);
    console.log(`  Services: ${(services || []).join(', ')}`);
    console.log(`  Location: ${city_state}`);
    console.log(`  Contact:  ${contact_name}`);
    console.log('═'.repeat(60));

    // Send macOS notification
    notify('🏥 New Clinic Lead', `${clinic_name} in ${city_state} — Dashboard generating...`);

    // Mark as processing
    await supabase
        .from('research_queue')
        .update({ status: 'processing', processed_at: new Date().toISOString() })
        .eq('id', id);

    // Print the AntiGravity command
    const skillCommand = [
        `Use the clinic-dashboard-generator skill for:`,
        `  Clinic: ${clinic_name}`,
        `  Domain: ${clinic_domain}`,
        `  Services: ${(services || []).join(', ')}`,
        `  City: ${city_state}`,
        `  Contact: ${contact_name}`,
    ].join('\n');

    console.log('\n📋 ANTIGRAVITY COMMAND:\n');
    console.log(skillCommand);
    console.log('\n' + '─'.repeat(60));

    // Copy to clipboard (macOS)
    exec(`echo "${skillCommand.replace(/"/g, '\\"')}" | pbcopy`, () => {
        console.log('📎 Command copied to clipboard!');
    });

    isProcessing = false;
}

// ─── Check for any existing pending entries on startup ────────────
async function checkPending() {
    const { data, error } = await supabase
        .from('research_queue')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error checking pending:', error.message);
        return;
    }

    if (data && data.length > 0) {
        console.log(`📬 Found ${data.length} pending entries on startup`);
        for (const entry of data) {
            await processEntry(entry);
        }
    }
}

// ─── Subscribe to Realtime ────────────────────────────────────────
function startListening() {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║  🏥 LivForMor Dashboard Listener — ACTIVE          ║');
    console.log('║  Watching for new clinic leads...                   ║');
    console.log('║  Press Ctrl+C to stop                              ║');
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log('');

    const channel = supabase
        .channel('research-queue-changes')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'research_queue',
                filter: 'status=eq.pending',
            },
            (payload) => {
                console.log('🔔 Realtime event received!');
                processEntry(payload.new);
            }
        )
        .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log('✅ Connected to Supabase Realtime');
                console.log('👀 Listening for new leads...\n');
            } else if (status === 'CHANNEL_ERROR') {
                console.error('❌ Realtime connection error — retrying in 5s...');
                setTimeout(startListening, 5000);
            }
        });

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n👋 Shutting down listener...');
        supabase.removeChannel(channel);
        process.exit(0);
    });
}

// ─── Main ─────────────────────────────────────────────────────────
async function main() {
    await checkPending();
    startListening();
}

main().catch(console.error);
