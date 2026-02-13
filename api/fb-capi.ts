// Facebook Conversions API (Server-Side) Proxy
// Sends events from the server so they bypass ad blockers and are more reliable
// Requires FB_CAPI_ACCESS_TOKEN environment variable set in Vercel

import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const PIXEL_ID = '822229636864741';
const FB_API_VERSION = 'v21.0';

function hashSHA256(value: string): string {
    if (!value) return '';
    return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const accessToken = process.env.FB_CAPI_ACCESS_TOKEN;
    if (!accessToken) {
        console.error('FB_CAPI_ACCESS_TOKEN not set');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const {
            event_name,
            email,
            phone,
            firstName,
            lastName,
            // Client-side data for deduplication & matching
            fbc,        // _fbc cookie value
            fbp,        // _fbp cookie value
            client_ip,
            client_ua,
            event_source_url,
            // Custom data
            content_name,
            content_category,
            value,
            currency,
        } = req.body;

        // Build user_data with hashed PII
        const user_data: Record<string, any> = {};
        if (email) user_data.em = [hashSHA256(email)];
        if (phone) user_data.ph = [hashSHA256(phone.replace(/\D/g, ''))];
        if (firstName) user_data.fn = [hashSHA256(firstName)];
        if (lastName) user_data.ln = [hashSHA256(lastName)];
        if (fbc) user_data.fbc = fbc;
        if (fbp) user_data.fbp = fbp;

        // Use forwarded IP & UA if available, otherwise use request headers
        user_data.client_ip_address = client_ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
        user_data.client_user_agent = client_ua || req.headers['user-agent'] || '';

        // Build the event
        const event = {
            event_name: event_name || 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            event_source_url: event_source_url || '',
            action_source: 'website',
            user_data,
            custom_data: {
                content_name: content_name || '',
                content_category: content_category || '',
                value: value || 0,
                currency: currency || 'USD',
            },
        };

        // Send to Facebook Conversions API
        const fbUrl = `https://graph.facebook.com/${FB_API_VERSION}/${PIXEL_ID}/events`;

        const fbResponse = await fetch(fbUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: [event],
                access_token: accessToken,
            }),
        });

        const fbResult = await fbResponse.json();

        if (!fbResponse.ok) {
            console.error('FB CAPI error:', JSON.stringify(fbResult));
            return res.status(fbResponse.status).json({ error: 'FB CAPI error', details: fbResult });
        }

        return res.status(200).json({ success: true, fb_response: fbResult });
    } catch (error: any) {
        console.error('FB CAPI handler error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}
