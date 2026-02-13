import modal
from fastapi import Request
import os
import json
from datetime import datetime

# Define the image with necessary dependencies
image = (
    modal.Image.debian_slim()
    .pip_install(
        "google-generativeai",
        "google-auth",
        "google-auth-oauthlib",
        "google-auth-httplib2",
        "google-api-python-client",
        "beautifulsoup4",
        "requests"
    )
)

app = modal.App("clinic-research-agent", image=image)

@app.function(secrets=[modal.Secret.from_name("main")])
async def generate_research_report(data: dict):
    import google.generativeai as genai
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    
    print(f"Starting research for: {data.get('website', 'Unknown')}")
    
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
    model = genai.GenerativeModel('gemini-pro')

    clinic_name = data.get('business_name') or f"{data.get('firstName', 'Dr.')} {data.get('lastName', 'Smith')}'s Clinic"
    website = data.get('website', 'No website provided')
    treatments = data.get('treatments_list', 'Ketamine, TMS')
    city = data.get('city', 'their local area')

    prompt = f"""
    You are a deeply experienced Medical Marketing Strategist. 
    Perform a "Deep Dive Audit" for a clinic named "{clinic_name}" (Website: {website}).
    Core Focus: {treatments}.
    
    Task:
    1. **Website Audit**: specific critique of their landing page/website (conversion gaps, speed, messaging).
    2. **Competitor Analysis**: Identify 3 likely competitors in {city} (infer city from website if needed) and their offers.
    3. **SWOT Analysis**: Strengths, Weaknesses, Opportunities, Threats tailored to {treatments}.
    4. **Action Plan**: 3 immediate steps to get more patients next week.
    
    Format the output as a professional report suitable for a Google Doc. Use Markdown formatting.
    """

    try:
        response = model.generate_content(prompt)
        report_text = response.text
        print("Research generated.")
    except Exception as e:
        print(f"Error generating content: {e}")
        return

    try:
        creds_json = json.loads(os.environ["SERVICE_ACCOUNT_JSON"]) 
        creds = service_account.Credentials.from_service_account_info(
            creds_json, scopes=['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive']
        )
        
        docs_service = build('docs', 'v1', credentials=creds)
        
        doc_title = f"Growth Dossier - {clinic_name} - {datetime.now().strftime('%Y-%m-%d')}"
        doc = docs_service.documents().create(body={'title': doc_title}).execute()
        doc_id = doc.get('documentId')
        
        requests = [
            {
                'insertText': {
                    'location': {'index': 1},
                    'text': report_text
                }
            }
        ]
        docs_service.documents().batchUpdate(documentId=doc_id, body={'requests': requests}).execute()
        
        print(f"Report saved: https://docs.google.com/document/d/{doc_id}")
    except Exception as e:
        print(f"Error saving doc: {e}")

@app.function()
@modal.fastapi_endpoint(method="POST")
async def webhook(request: Request):
    try:
        body = await request.json()
        generate_research_report.spawn(body)
        return {"message": "Research started", "status": "queued"}
    except Exception as e:
        return {"message": str(e), "status": "error"}
