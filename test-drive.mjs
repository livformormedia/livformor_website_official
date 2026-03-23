import { JWT } from "google-auth-library";
import fs from 'fs';

async function testDrive() {
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
        console.log("Authentication successful!");

        console.log("Listing Drive files...");
        let response = await fetch('https://www.googleapis.com/drive/v3/files', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to list docs: ${await response.text()}`);
        }

        const files = await response.json();
        console.log(`Drive Files found:`, files);

    } catch (error) {
        console.error("Test failed:", error);
    }
}

testDrive();
