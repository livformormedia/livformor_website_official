import { JWT } from "google-auth-library";
import fs from 'fs';

async function testDocGeneration() {
    try {
        const serviceAccount = JSON.parse(fs.readFileSync('./google-service-account.json', 'utf-8'));

        const client = new JWT({
            email: serviceAccount.client_email,
            key: serviceAccount.private_key,
            scopes: [
                'https://www.googleapis.com/auth/documents',
                'https://www.googleapis.com/auth/drive',
            ],
        });

        console.log("Authenticating...");
        const tokenResponse = await client.getAccessToken();
        const accessToken = tokenResponse.token;

        if (!accessToken) throw new Error("Could not get access token");
        console.log("Authentication successful!");

        const docName = `Blueprint Test - ${new Date().toISOString()}`;

        console.log("Creating Google Doc...");
        let response = await fetch('https://docs.googleapis.com/v1/documents', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: docName
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to create doc: ${await response.text()}`);
        }

        const doc = await response.json();
        const documentId = doc.documentId;
        console.log(`Document created with ID: ${documentId}`);

        console.log("Injecting text...");
        const textToInsert = "This is a test document generated natively via the Service Account API!";

        response = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requests: [
                    {
                        insertText: {
                            location: {
                                index: 1,
                            },
                            text: textToInsert
                        }
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to write to doc: ${await response.text()}`);
        }

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

testDocGeneration();
