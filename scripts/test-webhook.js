import fetch from 'node-fetch';

async function generateReport() {
    console.log("Triggering Webhook Simulation...");

    try {
        const res = await fetch("https://yrfobzuiqcuhylstiukn.supabase.co/functions/v1/generate-research-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: "Orion",
                lastName: "Gravity",
                email: "orion.gravity@livformor.com",
                phone: "+1555010020",
                website: "genesis-ketamine.com",
                contactId: "test_contact_404"
            })
        });

        if (!res.ok) {
            throw new Error(`Execution Failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.text();
        console.log("Success! Function Response:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}

generateReport();
