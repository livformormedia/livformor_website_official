import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
    // CORS support
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const ghlWebhookUrl = 'https://services.leadconnectorhq.com/hooks/MSFgME5t3cZZRgzhEnI2/webhook-trigger/134d873c-ba6b-49c2-99b2-5b3fe8c2eee0';

        console.log('Forwarding to GHL:', ghlWebhookUrl);

        const ghlResponse = await fetch(ghlWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request.body),
        });

        if (!ghlResponse.ok) {
            const errorText = await ghlResponse.text();
            console.error('GHL Error:', ghlResponse.status, errorText);
            return response.status(502).json({ error: 'Bad Gateway - GHL Rejected', details: errorText });
        }

        const data = await ghlResponse.text();
        return response.status(200).json({ success: true, ghl_response: data });

    } catch (error) {
        console.error('Proxy Error:', error);
        return response.status(500).json({ error: 'Internal Server Error', details: String(error) });
    }
}
