import { SCRIPT_CATEGORIES, AWARENESS_LEVELS, FRAMEWORKS } from './constants'; // Assuming these exist, adjust if they don't

export const ORGANIC_SCRIPTS_EXTENDED_BATCH_3 = [
    // ── BATCH 5: SPRAVATO & TMS SPECIFIC NUANCES (SORG-51 to SORG-60) ──────────
    {
        id: 'SORG-51',
        title: 'The Spravato Buy-and-Bill Trap',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "Spravato clinic owners: If your marketing is driving high volume but your cash flow is negative, I know exactly what's happening." },
            { angle: 'question', text: "Why do so many clinics scale their Spravato programs to 50 patients a month and then run out of money?" },
            { angle: 'contrarian', text: "Marketing Spravato is easy. Surviving the buy-and-bill cycle while marketing Spravato is the hard part." },
        ],
        body: `Spravato is an incredible tool for patients and clinics, because it's covered by insurance. It removes the $3,000 cash barrier. 
But if you run an aggressive ad campaign without a bulletproof revenue cycle management team, you will bankrupt your clinic.
You are fronting the cost of the drug. If your prior authorizations aren't air-tight, or if the insurer delays reimbursement for 90 days, your clinic becomes an unintentional bank loan for the insurance company.
Your marketing agency needs to know this. If they just flood you with 200 patient inquiries and your front desk can't process the benefits verifications fast enough, you die by your own success.
Scale your Spravato marketing at the exact speed of your billing department. Not faster.`,
        cta: "Follow if you want marketing that considers your cash flow.",
    },
    {
        id: 'SORG-52',
        title: 'Selling The 36 Sessions of TMS',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'C',
        duration: '65s',
        hooks: [
            { angle: 'stat', text: "The biggest objection a TMS patient has isn't the cost. It's the fact that they have to come to your office 36 times in 6 weeks." },
            { angle: 'question', text: "How do you convince a severely depressed patient to leave their house 5 days a week for over a month?" },
            { angle: 'callout', text: "If your TMS ads just say 'FDA Approved for Depression,' you aren't addressing the elephant in the room: the massive time commitment." },
        ],
        body: `TMS clinics love explaining the magnetic coil. 
But the patient isn't worried about the magnet. They are worried about the logistics. A depressed patient struggles to get out of bed once a week, let alone 5 days a week for 36 sessions. 
Your marketing has to acknowledge this massive hurdle head-on.
'We know that coming to our clinic every day sounds exhausting right now. We know it requires a logistical nightmare of rearranging your job or child care. But give us the first two weeks. Those first ten sessions are the hardest. By week three, when the fog starts to lift, coming here will be the best part of your day.'
Don't hide the 36 sessions. Frame them as the daily steps out of the darkness.`,
        cta: "Need your TMS landing pages rewritten? Link in bio.",
    },
    {
        id: 'SORG-53',
        title: 'Ketamine vs Spravato: The Marketing Split',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'callout', text: "If your clinic offers both IV Ketamine and Spravato, and you run the exact same ads for both... you are wasting half your budget." },
            { angle: 'question', text: "Why do IV Ketamine patients and Spravato patients require two completely different marketing funnels?" },
            { angle: 'contrarian', text: "The patient looking for Spravato is not the same patient looking for IV Ketamine. Stop treating them like they are." },
        ],
        body: `They might have the same diagnosis, but their buying psychology is entirely different.
The IV Ketamine patient has high disposable income. They are looking for the absolute gold standard of care. They want a premium experience, and they are willing to pay cash for maximum bioavailability. 
The Spravato patient is highly insurance-dependent. They are financially constrained but desperate for relief. Their primary concern is: 'Am I covered?'
If you send both patients to a generic 'Ketamine Therapy' landing page, you confuse both of them. 
You need one funnel built on premium care and transformation for IV, and a completely separate funnel built on FDA-approval and insurance coverage for Spravato. 
Segment your funnels, or lose both patients.`,
        cta: "We build segmented funnels for hybrid clinics. Link in bio.",
    },
    {
        id: 'SORG-54',
        title: 'The Psychedelic Stigma',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "Over 60% of older adults interested in ketamine therapy will abandon the idea because they are terrified it's a 'party drug' or a hallucinogenic trip they can't control." },
            { angle: 'callout', text: "Clinic owners: The word 'psychedelic' might be trendy in wellness spaces, but it is terrifying to a 55-year-old mother with chronic depression." },
            { angle: 'question', text: "How do you market an anesthetic with dissociative properties without triggering the 'D.A.R.E.' programming of the 1980s?" },
        ],
        body: `There is a massive cultural rebrand happening with psychedelics right now. 
As clinicians, you know the data. You know it's safe. 
But the average suburban patient who has only ever taken Zoloft hears 'ketamine' and thinks of illegal raves. 
If your marketing leans into the 'psychedelic journey' aesthetic—with sacred geometry and spiritual awakening language—you alienate the mainstream medical patient.
You must ground ketamine entirely in the medical model. It is a 'dissociative anesthetic.' It is administered by medical professionals. It involves 'neuroplasticity' and 'synaptic repair.' 
De-stigmatize the drug by dressing it in a white coat. Save the spiritual awakening talk for the integration room. Keep it out of your Facebook ads.`,
        cta: "Follow for medical copywriting strategies.",
    },
    {
        id: 'SORG-55',
        title: 'The TMS Map Problem',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'C',
        duration: '55s',
        hooks: [
            { angle: 'callout', text: "If you own a TMS clinic, the most important marketing tool you have isn't Meta or Google. It's Google Maps." },
            { angle: 'contrarian', text: "TMS patients do not care how good your clinic is if it's more than 20 minutes from their house." },
            { angle: 'question', text: "Why is the geographic radius for a TMS clinic half the size of an IV Ketamine clinic?" },
        ],
        body: `A patient will drive an hour or more for an IV Ketamine infusion. They only have to do it 6 times. It's an event.
A TMS patient has to come to your office 36 times. Every single weekday. 
If you are running broad-radius ads for TMS, you are burning money. A patient 45 minutes away might click the ad, but the second they realize the driving commitment, they will cancel the consultation.
TMS marketing requires hyper-local dominance. You have to own the 15-minute radius around your clinic. 
That means hyper-localized Google Local Service Ads, an optimized Google Business Profile with hundreds of reviews, and geographic call-outs heavily featured in your ad copy. 
For TMS, convenience is the highest converting feature you have.`,
        cta: "Need local SEO dominance? Link in bio.",
    },
    {
        id: 'SORG-56',
        title: 'The REMS Barrier',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.EDUCATIONAL,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'callout', text: "The biggest bottleneck for new Spravato patients isn't the cost. It's the two-hour observation window." },
            { angle: 'question', text: "How do you explain the FDA REMS protocol to a patient without making Spravato sound dangerous?" },
            { angle: 'contrarian', text: "Stop hiding the two-hour observation requirement in the fine print. Use it as a selling point." },
        ],
        body: `When a patient finds out they have to sit in your clinic for two hours after a Spravato treatment, and someone else has to drive them home, it feels like a massive burden.
If you apologize for it, they think it's a flaw. 
Instead, reframe the REMS protocol as a luxury. 
'Because of the profound way this medication works, the FDA requires us to monitor you for two hours. But this isn't a waiting room. This is your two hours of mandated peace. Put on noise-canceling headphones. Sleep. Disconnect from your phone. When was the last time you were required to just sit quietly and heal?'
Reframe the logistical burden as a forced sanctuary. Watch your show rates double.`,
        cta: "Want us to rewrite your Spravato follow-up emails? Link in bio.",
    },
    {
        id: 'SORG-57',
        title: 'Do Not Treat Psychosis (The Anti-Avatar)',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '60s',
        hooks: [
            { angle: 'command', text: "Ketamine clinic owners: Your marketing needs to clearly define who you CANNOT treat, just as much as who you can." },
            { angle: 'question', text: "Are you paying for clicks from patients with schizophrenia or active psychosis? Because your ads aren't excluding them." },
            { angle: 'callout', text: "If your Facebook ads are completely broad, you are attracting patients that are clinically contraindicated for ketamine." },
        ],
        body: `Ketamine is a miracle for TRD and PTSD. But it exacerbates psychosis and certain personality disorders. 
As clinicians, you screen these patients out during the intake call. 
But as marketers, you are paying $15 for every one of those patient inquiries before you reject them. 
Your marketing needs a velvet rope. It is completely okay to state in your ads and on your landing page: 'Due to the mechanism of this treatment, we cannot accept patients with a history of schizophrenia or active psychosis.'
Not only does this save you money on unqualified clicks, it actually increases trust with your ideal patients. A clinic that openly turns people away is perceived as highly ethical and medically rigorous.`,
        cta: "Follow for more advanced clinic marketing psychology.",
    },
    {
        id: 'SORG-58',
        title: 'The "Tapering" Conversation',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.PAS,
        outfit: 'C',
        duration: '65s',
        hooks: [
            { angle: 'question', text: "What is the single most common question a patient asks before starting TMS? 'Do I have to stop my antidepressants?'" },
            { angle: 'callout', text: "If your website doesn't explicitly answer whether a patient has to taper off their SSRIs, they are not booking a consultation." },
            { angle: 'stat', text: "Over 80% of patients researching TMS or Ketamine are currently on a daily antidepressant and are terrified of the withdrawals." },
        ],
        body: `A patient has spent 10 years feeling horrible on Zoloft. But the idea of tapering off Zoloft and going through the withdrawals is even more terrifying than staying on it.
When they research TMS or Ketamine, they are looking for a catch. They assume they have to quit their meds first.
You have to answer this objection immediately in your marketing.
'You do not have to stop your current antidepressants to begin TMS or Ketamine.'
Make it a massive, bold headline on your FAQ. Put it in your retargeting ads. 
When you remove the prerequisite of tapering, you remove the biggest boulder blocking them from the front door. Address the fear of withdrawal before they even have to ask.`,
        cta: "DM me your URL and I'll audit your FAQs.",
    },
    {
        id: 'SORG-59',
        title: 'Maintenance Is Your Lifetime Value',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'question', text: "What happens six months after your patient finishes their initial series of 6 ketamine infusions?" },
            { angle: 'contrarian', text: "Most clinics spend 90% of their marketing budget acquiring new patients, and 0% bringing their successful patients back for maintenance." },
            { angle: 'callout', text: "If you don't have an automated email flow for maintenance boosters, you are leaving hundreds of thousands of dollars on the table." },
        ],
        body: `The patient had a breakthrough. They felt amazing for four months. 
Then, a stressful life event happens. The heavy blanket starts to creep back in. 
But because they feel like they 'failed,' or because the depression makes it hard to pick up the phone, they don't call you for a booster. 
You cannot wait for a depressed patient to ask for help twice. 
You need an automated 90-day, 120-day, and 180-day 'check-in' sequence. 
'Hey Sarah. It's been 4 months since your last infusion. We know the world is loud right now. If the darkness is creeping back, you don't have to start over. One booster session can reset the baseline. Click here to book.'
That one email sequence can add six figures to your bottom line entirely for free.`,
        cta: "Want our 6-month booster sequence? Link in bio.",
    },
    {
        id: 'SORG-60',
        title: 'The Cash/Insurance Hybrid Model',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '65s',
        hooks: [
            { angle: 'stat', text: "The most profitable mental health clinics in the country do exactly two things: Insurance-covered TMS, and Cash-pay IV Ketamine." },
            { angle: 'question', text: "Why are the smartest clinic owners running a hybrid cash and insurance model?" },
            { angle: 'callout', text: "If your clinic is 100% cash-pay, you are struggling with volume. If your clinic is 100% insurance, you are struggling with margin." },
        ],
        body: `The hybrid model is the holy grail of clinic economics. 
You market TMS and Spravato heavily on Google Search. It's covered by insurance. It brings massive volume through the door. It keeps the lights on and pays your staff. 
But the margin on insurance is thin. 
So you run highly targeted Meta ads for premium, cash-pay IV Ketamine. 
Now, you have the stability and volume of insurance driving the baseline, and the $3,000 cash-pay ketamine treatment plans driving the actual profit margin. 
More importantly, if a cash-pay ketamine patient inquiry can't afford the treatment, you don't lose them. You down-sell them into insurance-covered TMS. You monetize every single patient inquiry.`,
        cta: "We build funnels for hybrid clinics. Link in bio.",
    },

    // ── BATCH 6: META & GOOGLE ADS COMPLIANCE (SORG-61 to SORG-70) ──────────
    {
        id: 'SORG-61',
        title: 'The LegitScript Tax',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'C',
        duration: '60s',
        hooks: [
            { angle: 'callout', text: "Ketamine clinic owners: If you are trying to run Google or Facebook ads without LegitScript certification, you are playing Russian Roulette with your ad account." },
            { angle: 'question', text: "Why did your Facebook ad account get permanently banned last week? Two words: Addiction Policy." },
            { angle: 'stat', text: "Over 80% of uncertified ketamine clinics will have their ad accounts suspended within the first 60 days of advertising." },
        ],
        body: `Google and Meta do not understand what a Ketamine clinic is. 
Their algorithms look at the word 'Ketamine', categorize it as a recreational drug or an addiction treatment facility, and shut down your account for violating their healthcare policies.
You can appeal it 100 times. You will lose against the algorithm. 
The only way to guarantee your clinic stays online is to get LegitScript certified. Yes, it costs thousands of dollars a year. Yes, the paperwork is a nightmare. 
But it is the toll booth on the highway. If you don't pay it, you don't get to drive. 
Get the certification. It is the best investment you will ever make, because it blocks 50% of your lazy competitors from ever running ads against you.`,
        cta: "Need help navigating ketamine marketing compliance? Link in bio.",
    },
    {
        id: 'SORG-62',
        title: 'Banned Words in Meta Ads',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'command', text: "Open your Facebook Ads manager right now. If your ketamine ad contains any of these three words, turn it off immediately." },
            { angle: 'question', text: "Did you know that telling the truth on Facebook can get your clinic's ad account permanently banned?" },
            { angle: 'callout', text: "You cannot use the words 'Suicide', 'Cure', or 'Trip' in your Facebook ads. Period." },
        ],
        body: `Meta has highly aggressive AI moderators for mental health content. 
If your ad says: 'Ketamine is a cure for suicidal ideation' — you are getting banned. 
First, because you cannot promise a medical 'cure' under FDA rules. 
Second, because words like 'suicide' trigger self-harm flags that immediately kill the ad, regardless of clinical context. 
You have to use compliant language that still evokes emotion. Instead of 'cure for suicidal thoughts', use 'breakthrough relief for the heaviest darkness.' 
Instead of 'ketamine trip', use 'dissociative healing session.' 
You can write highly converting, deeply emotional direct response copy without ever triggering the Meta ban-hammer. You just have to know the vocabulary.`,
        cta: "Follow for compliant medical copywriting tips.",
    },
    {
        id: 'SORG-63',
        title: 'Personal Attributes and The "Are You" Ban',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.EDUCATIONAL,
        framework: FRAMEWORKS.PAS,
        outfit: 'A',
        duration: '60s',
        hooks: [
            { angle: 'stat', text: "The most common reason ketamine clinic ads get rejected by Facebook isn't because of the drug. It's because of the word 'You'." },
            { angle: 'question', text: "Have you ever had a Facebook ad rejected for violating the 'Personal Attributes' policy?" },
            { angle: 'callout', text: "If your ad starts with the sentence 'Are you struggling with severe depression?' you are breaking Meta's terms of service." },
        ],
        body: `Meta's advertising policy explicitly states you cannot assume personal attributes about the user. 
You cannot call out their medical condition.
If you say 'Are YOU depressed?' Meta flags it, because it feels invasive to the user. 
The workaround is incredibly simple. Shift the subject from the user to the condition.
Instead of: 'Are you struggling with depression?' 
Write: 'Treatment-resistant depression can make getting out of bed feel impossible.'
Instead of: 'Did your antidepressants fail you?'
Write: 'When traditional SSRIs fail, patients need alternative pathways to relief.'
You get the exact same emotional resonance, but it passes the algorithm perfectly.`,
        cta: "Want our list of compliant Facebook ad hooks? DM me 'HOOKS'.",
    },
    {
        id: 'SORG-64',
        title: 'Google Search Intent vs Meta Interruption',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'C',
        duration: '70s',
        hooks: [
            { angle: 'contrarian', text: "You should never use the same ad copy on Google that you use on Facebook. They are entirely different psychological landscapes." },
            { angle: 'question', text: "Why do Google ads generate faster bookings but Facebook ads generate cheaper patient inquiries?" },
            { angle: 'callout', text: "If you are running the exact same Ketamine campaign on Google and Meta, you don't understand patient search intent." },
        ],
        body: `Google is a search engine. The patient has high intent. They are literally typing 'Ketamine clinic near me' into their phone. 
They already know they want the treatment. So your Google ad copy shouldn't be a long, emotional story. It should be: 'Top-Rated IV Ketamine. $190 Intro Session. Book Today.'
Facebook is an interruption engine. The patient is looking at pictures of their niece. They are not looking for a doctor.
To get them to stop scrolling, you cannot just say 'Buy Ketamine.' 
You have to arrest their attention with a massive emotional hook. You have to tell a story about a patient who failed 5 SSRIs and finally found relief. 
Google captures the demand that already exists. Facebook creates demand where it didn't exist a second ago. They require completely different copywriting frameworks.`,
        cta: "We manage both platforms for our partner clinics. Link in bio.",
    },
    {
        id: 'SORG-65',
        title: 'Why You Should Let Negative Comments Stay',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'callout', text: "When you run Ketamine ads on Facebook, you will get angry comments from people calling you a drug dealer. Do not delete them." },
            { angle: 'question', text: "What should you do when internet trolls comment on your clinic's Spravato ads?" },
            { angle: 'contrarian', text: "A Facebook ad with angry comments in the comment section actually converts cheaper than an ad with zero comments. Here's why." },
        ],
        body: `Ketamine is polarizing. When you run ads, uninformed people will comment: 'This is just horse tranquilizer' or 'Big pharma pushing drugs.'
Your first instinct is to delete them. Don't. 
First, the Facebook algorithm rewards controversy. Comments, even angry ones, signal engagement. Facebook will make your ad cheaper to run because people are interacting with it.
Second, and more importantly, it gives you a stage.
Reply to the troll professionally. 'I understand why it sounds surprising. But as the anesthesia of choice for pediatric surgery for 50 years, and now a breakthrough for TRD, the clinical data is profound. We'd love to share the studies with anyone interested.'
When a real patient reads that comment thread, they see a troll, and they see a calm, authoritative doctor. It builds massive trust.`,
        cta: "Follow for how to handle crisis communication in clinical marketing.",
    },
    {
        id: 'SORG-66',
        title: 'The "Before and After" Ban',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '55s',
        hooks: [
            { angle: 'stat', text: "One of the fastest ways to get your clinic's ad account shut down is showing a patient's 'Before and After' results." },
            { angle: 'question', text: "Can you use patient testimonials in your ketamine Facebook ads?" },
            { angle: 'callout', text: "Meta strictly prohibits 'Before and After' implications in healthcare advertising. Here is how you use patient success stories anyway." },
        ],
        body: `Meta hates claims they can't verify. If you show a sad face next to a happy face and say 'Ketamine cured my depression,' the AI will flag it as misleading healthcare claims.
But social proof is the strongest marketing tool you have.
The workaround is to focus the testimonial strictly on the internal experience, not a guaranteed medical outcome.
Don't write: 'Ketamine cured my depression in 6 weeks.'
Write: 'I was terrified before my first session, but the staff made me feel incredibly safe. The environment was peaceful, and the compassion I received was unlike any other doctor I've visited.'
Meta allows you to praise the clinic's environment and the staff's empathy. You get the social proof, without making a banned medical claim.`,
        cta: "We write compliant testimonials. Link in bio.",
    },
    {
        id: 'SORG-67',
        title: 'The Shadow Ban of the Word "Depression"',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'C',
        duration: '60s',
        hooks: [
            { angle: 'callout', text: "Did you know Facebook will limit the reach of your clinic's ads strictly because you used the word 'Depression' too many times?" },
            { angle: 'contrarian', text: "Sometimes the best way to market a depression treatment is to completely remove the word 'depression' from the copy." },
            { angle: 'question', text: "How do you talk about severe mental health issues without triggering Meta's algorithmic suppression?" },
        ],
        body: `Meta's algorithm wants the platform to be a happy place. If your ad text is heavily saturated with words like 'depression', 'anxiety', 'trauma', and 'suffering', the algorithm will actively suppress your reach because it deems the content 'low-quality' or 'negative.'
You will pay twice as much for the same clicks.
Instead of clinically diagnosing the user in the ad text, use metaphorical language that the algorithm ignores but the patient completely understands. 
'When the heavy blanket won't lift.' 'When the world feels entirely gray.' 'When simply getting out of bed feels like running a marathon.'
Patients know exactly what you are talking about. But the Facebook AI just reads it as poetry and lets the ad run cheap.`,
        cta: "DM me 'COPY' and I'll review your Facebook ads.",
    },
    {
        id: 'SORG-68',
        title: 'Retargeting the Skeptics',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'stat', text: "Over 85% of people who visit your ketamine clinic's website will leave without filling out a form. If you aren't retargeting them, you lost them forever." },
            { angle: 'question', text: "A patient spent 10 minutes reading your website and then left. Why?" },
            { angle: 'callout', text: "Ketamine ad traffic is expensive. If you only try to convert them on the first click, you will lose money." },
        ],
        body: `Mental healthcare requires a massive amount of trust. A patient will rarely book a $3,000 treatment plan the very first time they hear the clinic's name.
They click your Google ad. They read your site. They get scared. They leave.
That is completely normal. What matters is what happens next.
You must have a Meta retargeting pixel tracking them. Once they leave your site, they should see a completely different type of ad on their Instagram feed for the next 14 days. 
They don't need another sales pitch. They need trust building. 
Retarget them with a 60-second video of the founder explaining the safety protocols. Retarget them with a video showing what the infusion room looks like. 
By the fifth time they see your face, the anxiety drops, the trust rises, and they book the consultation.`,
        cta: "Want us to build your retargeting funnel? Link in bio.",
    },
    {
        id: 'SORG-69',
        title: 'The Local Dominance Ad Strategy',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '60s',
        hooks: [
            { angle: 'callout', text: "Stop running your Facebook ads to the entire state. Ketamine is a local business. Act like one." },
            { angle: 'command', text: "If your clinic is in Austin, Texas, the very first word of your Facebook ad should be 'Austin'." },
            { angle: 'question', text: "Why do hyper-local ads outperform broad medical ads by almost 3 to 1?" },
        ],
        body: `People automatically trust things that are close to them. It's human nature. 
When a depressed patient sees an ad for a generic medical facility, their defense mechanisms are high. 
But when the ad says 'Austin residents: There is a breakthrough treatment happening right here in Travis County...'
Suddenly, you aren't a faceless corporation. You are a local doctor in their community. 
Call out the city. Call out the neighborhood. 'We are located right off I-35 next to the Domain.'
It grounds the abstract medical science into their physical, daily reality. It makes the treatment feel accessible. You don't need to be the best clinic in the world. You just need to be the undisputed authority in a 20-mile radius.`,
        cta: "We build massive local monopolies. Link in bio.",
    },
    {
        id: 'SORG-70',
        title: 'patient inquiry Forms vs Landing Pages',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'C',
        duration: '65s',
        hooks: [
            { angle: 'question', text: "Should your Facebook ads use in-app patient inquiry Forms, or send traffic to your clinic's website? The answer will dictate your entire profit margin." },
            { angle: 'contrarian', text: "Facebook patient inquiry Forms will give you the cheapest patient inquiries you've ever seen. And they will ruin your clinic's conversion rate." },
            { angle: 'callout', text: "If your agency is using Facebook patient inquiry Forms to get you $15 ketamine inquiries, fire them." },
        ],
        body: `Facebook loves patient inquiry Forms because it keeps the user on their platform. They click the ad, their info auto-populates, they hit submit, and keep scrolling. 
It takes 2 seconds. The friction is zero.
But for high-ticket medical treatments, zero friction is a disaster. 
They didn't read anything. They don't know the price. Half the time, they don't even remember giving you their phone number. When your front desk calls, the patient inquiry is completely cold and bewildered.
You must send the traffic to a dedicated, long-form landing page. 
Force them to leave Facebook. Force them to read the price. Force them to type in their phone number manually. 
The patient inquiries will cost 3 times as much. But they will actually show up for the consultation. You want friction. Friction filters out the tire-kickers.`,
        cta: "Stop paying for cheap patient inquiries. Start paying for patients. Link in bio.",
    },
];
