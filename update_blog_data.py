import re

with open('src/data/blogData.js', 'r') as f:
    content = f.read()

# Update dates
content = content.replace("published_date: '2026-02-19'", "published_date: '2026-02-21'")
content = content.replace("published_date: '2026-02-27'", "published_date: '2026-02-26'")
content = content.replace("published_date: '2026-03-03'", "published_date: '2026-03-01'")
content = content.replace("published_date: '2026-03-07'", "published_date: '2026-03-03'")
content = content.replace("published_date: '2026-03-11'", "published_date: '2026-03-06'")
content = content.replace("published_date: '2026-03-15'", "published_date: '2026-03-09'")
content = content.replace("published_date: '2026-03-18'", "published_date: '2026-03-12'")
content = content.replace("published_date: '2026-03-21'", "published_date: '2026-03-15'")

# Wait, let's just make exact string replacements for FAQs:

faq5_old = """            {
                question: 'Does an automated SMS look unprofessional for a healthcare practice?',
                answer: "Not if it is written correctly. \\"We received your form, someone will call you in 24 hours\\" feels cold and corporate. However, \\"Hi [Name], this is [Clinic]. We just got your message. I know reaching out takes courage. We are out of the office right now, but you can book a gentle discovery call here: [Link]\\" feels immediate and profoundly empathetic."
            }
        ],
        content: `When a patient fills out"""

faq5_new = """            {
                question: 'Does an automated SMS look unprofessional for a healthcare practice?',
                answer: "Not if it is written correctly. \\"We received your form, someone will call you in 24 hours\\" feels cold and corporate. However, \\"Hi [Name], this is [Clinic]. We just got your message. I know reaching out takes courage. We are out of the office right now, but you can book a gentle discovery call here: [Link]\\" feels immediate and profoundly empathetic."
            },
            {
                question: 'What happens if a patient calls but we don\\'t answer?',
                answer: "Missed phone calls are a massive leak in your acquisition funnel. If a patient calls and it goes to voicemail, an automated missed-call text-back sequence should instantly trigger: 'Hi, we just missed your call at the clinic. How can we help you today?' This captures the lead before they move to the next clinic on Google Maps."
            },
            {
                question: 'How long does the Vulnerability Window last?',
                answer: "While it varies slightly by patient, data proves that the highest intent to act dissipates within 15 minutes. After this window, the lead's responsiveness drops off a cliff. Operating with an urgency of 5 minutes or less is critical to securing the consultation."
            }
        ],
        content: `When a patient fills out"""

content = content.replace(faq5_old, faq5_new)


faq6_old = """            {
                question: "How do I get patients to leave reviews for a sensitive treatment like ketamine therapy?",
                answer: "The anonymity of mental health care makes reviews difficult, but not impossible. The strategy is to ask at the absolute peak of their emotional breakthrough—usually right after their 4th or 5th integration session. Ask them to write a review about the *staff, the comfort of the clinic, and how safe they felt*, allowing them to leave 5 stars without disclosing their specific medical diagnosis."
            }
        ],
        content: `If you are running a brick-and-mortar"""

faq6_new = """            {
                question: "How do I get patients to leave reviews for a sensitive treatment like ketamine therapy?",
                answer: "The anonymity of mental health care makes reviews difficult, but not impossible. The strategy is to ask at the absolute peak of their emotional breakthrough—usually right after their 4th or 5th integration session. Ask them to write a review about the *staff, the comfort of the clinic, and how safe they felt*, allowing them to leave 5 stars without disclosing their specific medical diagnosis."
            },
            {
                question: "Can I pay a company to increase my Google Business Profile reviews?",
                answer: "Absolutely not. Purchasing reviews violates Google's policies and will inevitably lead to your entire listing being suspended and permanently deleted. Authentic patient experiences are the only sustainable path to ranking. Focus entirely on organic, process-driven review capture at the clinic."
            },
            {
                question: "How often should I upload photos to my ketamine clinic's GBP listing?",
                answer: "You should aim to upload at least 2-4 high-quality photos every single month. Consistent visual activity signals to Google that your clinic is active and engaged. Showcasing your clean, spa-like treatment rooms and friendly staff visually reduces barrier-to-entry anxiety for prospective patients."
            }
        ],
        content: `If you are running a brick-and-mortar"""

content = content.replace(faq6_old, faq6_new)


faq7_old = """            {
                question: "Do generic inspirational quotes hurt my clinic's brand?",
                answer: "Yes. Generic Canva quotes (\\"Dream Big\\") signal to prospective patients that your clinic lacks unique clinical depth. Patients spending $4,000 out-of-pocket for intense psychological interventions want to know they are in the hands of thought leaders and experts, not a robotic social media manager. You must replace fluff with raw, educational value."
            }
        ],
        content: `Scroll through the Instagram feeds"""

faq7_new = """            {
                question: "Do generic inspirational quotes hurt my clinic's brand?",
                answer: "Yes. Generic Canva quotes (\\"Dream Big\\") signal to prospective patients that your clinic lacks unique clinical depth. Patients spending $4,000 out-of-pocket for intense psychological interventions want to know they are in the hands of thought leaders and experts, not a robotic social media manager. You must replace fluff with raw, educational value."
            },
            {
                question: "Should a psychiatric clinic use TikTok for lead generation?",
                answer: "While TikTok boasts a rapidly growing mental health community, its demographic skews younger and is often mismatched for high-ticket $4,000 out-of-pocket care. Clinics often find higher-qualified patients who can actually afford the treatment by employing an integration-first strategy on Instagram and YouTube where older, affluent demographics research alternative medicine."
            },
            {
                question: "How can ketamine staff get over their fear of recording video content?",
                answer: "Fear of recording is natural for clinicians. The key is to stop trying to be an 'influencer' and instead treat the camera like a patient sitting across the room. Answer the single most common question you heard in clinic that week—just unscripted, raw expertise. Start by recording a 30-second video on your phone daily until the anxiety dissolves."
            }
        ],
        content: `Scroll through the Instagram feeds"""

content = content.replace(faq7_old, faq7_new)


faq8_old = """            {
                question: "Why does discounting cash-pay medical services hurt my practice?",
                answer: "Discounting degrades the perceived value of your clinical authority. If you instantly drop the price by $500, the patient wonders why it was inflated in the first place. Instead of discounting, increase the perceived value by highlighting the comprehensive care, or utilize third-party medical financing like CareCredit or Advance Care."
            }
        ],
        content: `The phone rings. Your Care Coordinator"""

faq8_new = """            {
                question: "Why does discounting cash-pay medical services hurt my practice?",
                answer: "Discounting degrades the perceived value of your clinical authority. If you instantly drop the price by $500, the patient wonders why it was inflated in the first place. Instead of discounting, increase the perceived value by highlighting the comprehensive care, or utilize third-party medical financing like CareCredit or Advance Care."
            },
            {
                question: "How do I introduce financing options during a ketamine consultation?",
                answer: "Never lead with financing, as it assumes the patient has a financial block. You introduce financing only after the value has been thoroughly established and the patient has explicitly expressed cost concerns. Present it as a powerful tool to make their needed healing journey immediately accessible."
            },
            {
                question: "What is the biggest mistake front desk staff make regarding pricing?",
                answer: "The biggest mistake is 'price-dropping' without context—simply stating '$600 per infusion' immediately over the phone. Staff must be trained to deflect the direct initial price query by saying, 'Every protocol is highly customized based on medical history, can I ask what you are currently struggling with?' and only providing totals once clinical value is completely communicated."
            }
        ],
        content: `The phone rings. Your Care Coordinator"""

content = content.replace(faq8_old, faq8_new)


faq9_old = """            {
                question: "What is the most common reason ketamine clinics fail a DEA inspection?",
                answer: "Sloppy record-keeping. The DEA is obsessed with the \\"cradle-to-grave\\" tracking of every milligram of a controlled substance. If your initial inventory logs do not perfectly reconcile with your dispensing logs and your DEA Form 222s (or CSOS records), you are in serious regulatory danger."
            }
        ],
        content: `You are in the middle of a busy"""

faq9_new = """            {
                question: "What is the most common reason ketamine clinics fail a DEA inspection?",
                answer: "Sloppy record-keeping. The DEA is obsessed with the \\"cradle-to-grave\\" tracking of every milligram of a controlled substance. If your initial inventory logs do not perfectly reconcile with your dispensing logs and your DEA Form 222s (or CSOS records), you are in serious regulatory danger."
            },
            {
                question: "How should a clinic safely dispose of unused or partially used ketamine vials?",
                answer: "Under no circumstances should you ever flush a controlled substance down the toilet. You must use a DEA-compliant chemical waste system like a Cactus Smart Sink or an RxDestroyer system that chemically neutralizes the medication. Wasting must always be witnessed and jointly signed off by two separate licensed clinical staff members."
            },
            {
                question: "Can the front desk coordinator manage the ketamine shipment tracking?",
                answer: "A receptionist can receive the physical box from the delivery driver, but ONLY an authorized licensed practitioner must open it, verify the controlled substance volume against the DEA Form 222 or electronic CSOS record, securely log it in the receiving ledger, and immediately lock it inside the vault."
            }
        ],
        content: `You are in the middle of a busy"""

content = content.replace(faq9_old, faq9_new)


faq10_old = """            {
                question: "What is the hybrid 'Ascension Model' for mental health clinics?",
                answer: "The Ascension Model involves leading marketing acquisition with insurance-covered services (like Spravato or TMS) to drastically lower Patient Acquisition Cost (CAC). Once trust and clinical rapport are established, patients who need it are offered premium, out-of-pocket services (like specialized IV KAP protocols or integration retreats)."
            }
        ],
        content: `If you are opening a new mental health practice"""

faq10_new = """            {
                question: "What is the hybrid 'Ascension Model' for mental health clinics?",
                answer: "The Ascension Model involves leading marketing acquisition with insurance-covered services (like Spravato or TMS) to drastically lower Patient Acquisition Cost (CAC). Once trust and clinical rapport are established, patients who need it are offered premium, out-of-pocket services (like specialized IV KAP protocols or integration retreats)."
            },
            {
                question: "Should a new psychiatric clinic launch with multiple services at once?",
                answer: "Usually, no. Launching multiple distinct services like IV Ketamine, TMS, and Spravato simultaneously dilutes marketing focus and creates massive operational strain on staff. The most successful approach is launching a single core offering, achieving operational excellence and steady revenue, and then bolting on subsequent services."
            },
            {
                question: "How does the patient sales cycle differ between TMS and IV Ketamine?",
                answer: "The TMS cycle is highly bureaucratic because its primary barrier is insurance verification and tedious prior authorizations, so patients decide quickly but wait long periods for clearance. IV Ketamine's sales cycle is a psychological and financial leap, meaning patients require extensive nurturing but can begin treatment identically fast once they pay out-of-pocket."
            }
        ],
        content: `If you are opening a new mental health practice"""

content = content.replace(faq10_old, faq10_new)

# Apply export filter logic
export_old = """export function getAllPosts() {
    const today = new Date();
    const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

    // Temporarily allowing all posts (removing future date restriction)
    return BLOG_POSTS.filter(p => p.published).sort(
        (a, b) => a.published_date < b.published_date ? 1 : -1
    );
}

export function getPostBySlug(slug) {
    const today = new Date();
    const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

    // Temporarily allowing all posts (removing future date restriction)
    return BLOG_POSTS.find(p => p.slug === slug && p.published) || null;
}"""

# A more robust regex replacement for the export functions
export_new = """export function getAllPosts() {
    const today = new Date();
    const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

    return BLOG_POSTS.filter(p => p.published && p.published_date <= todayStr).sort(
        (a, b) => a.published_date < b.published_date ? 1 : -1
    );
}

export function getPostBySlug(slug) {
    const today = new Date();
    const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

    return BLOG_POSTS.find(p => p.slug === slug && p.published && p.published_date <= todayStr) || null;
}"""

content = content.replace(export_old, export_new)

with open('src/data/blogData.js', 'w') as f:
    f.write(content)

print(content[-500:])

