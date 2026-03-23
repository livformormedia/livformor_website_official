import { JWT } from "google-auth-library";
import fs from 'fs';

async function testDriveCreate() {
    try {
        const serviceAccount = JSON.parse(fs.readFileSync('./google-service-account.json', 'utf-8'));

        const client = new JWT({
            email: serviceAccount.client_email,
            key: serviceAccount.private_key,
            scopes: [
                'https://www.googleapis.com/auth/drive',
            ],
        });

        console.log("Authenticating...");
        const tokenResponse = await client.getAccessToken();
        const accessToken = tokenResponse.token;

        if (!accessToken) throw new Error("Could not get access token");

        console.log("Creating Google Doc via Drive API Upload...");

        // We create a multipart upload to send metadata AND content at once.
        const metadata = {
            name: `Blueprint Test - Generated via Drive API - ${new Date().toISOString()}`,
            mimeType: 'application/vnd.google-apps.document', // convert to Google Doc
            parents: ['1pyvWbsJ1-zfp8rgQc8B_IyGojjZ8m07E']
        };

        // HTML content will be converted nicely to Google Doc formatting
        const htmlContent = `
        <h1>Patient Acquisition Blueprint</h1>
        <p>This document was generated natively via the Drive API by bypassing the Google Docs API.</p>
        <h2>Executive Summary</h2>
        <p>This works perfectly and supports <b>bold</b>, <i>italic</i>, and headers!</p>
    `;

        const boundary = '-------314159265358979323846';
        const delimiter = `\r\n--${boundary}\r\n`;
        const closeDelimiter = `\r\n--${boundary}--`;

        const body = delimiter +
            'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: text/html; charset=UTF-8\r\n\r\n' +
            htmlContent +
            closeDelimiter;

        let response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': `multipart/related; boundary=${boundary}`
            },
            body: body
        });

        if (!response.ok) {
            throw new Error(`Failed to create doc: ${await response.text()}`);
        }

        const doc = await response.json();
        const documentId = doc.id;
        console.log(`Document created with ID: ${documentId}`);

        console.log("Setting sharing permissions to 'Anyone with link'...");
        response = await fetch(`https://www.googleapis.com/drive/v3/files/${documentId}/permissions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role: 'reader',
                type: 'anyone'
            })
        });

        if (!response.ok) {
            console.error(`Failed to share document. Error: ${await response.text()}`);
        } else {
            console.log("Permissions set successfully!");
        }

        console.log(`\n✅ TEST SUCCESSFUL! \nDocument Link: https://docs.google.com/document/d/${documentId}/edit`);

    } catch (error) {
        console.error("Test failed:", error);
    }
}

testDriveCreate();
