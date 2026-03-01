// Dubai Video Shoot — 100 Camera-Ready Scripts
// Rewritten with Direct Response Copywriting + Multi-Hook A/B Testing
// Each script has multiple hooks tagged by angle for Andromeda creative testing

export const SCRIPT_CATEGORIES = {
    CASH_PAY: 'Cash-Pay B2B Ads',
    INSURANCE: 'Insurance / Spravato / TMS Ads',
    ORGANIC: 'Organic Social Content',
    FOUNDER: 'Founder Voice',
};

export const FRAMEWORKS = {
    PAS: 'Problem → Agitate → Solve',
    BELIEF_BRIDGE: 'Before / After / Bridge',
    OCPB: 'Objection → Claim → Proof → Benefit',
    CARE: 'Compassion → Awareness → Reassurance → Ethics',
    DIRECT: 'Direct Offer Stack',
    STORY: 'Founder Story / Narrative',
    STATS: 'Statistical Authority',
    EDUCATIONAL: 'Educational Value Drop',
};

export const AWARENESS_LEVELS = {
    UNAWARE: 'Unaware',
    PROBLEM: 'Problem Aware',
    SOLUTION: 'Solution Aware',
    PRODUCT: 'Product Aware',
    MOST: 'Most Aware',
};

export const HOOK_ANGLES = {
    STAT: 'stat',
    QUESTION: 'question',
    CALLOUT: 'callout',
    STORY: 'story',
    COMMAND: 'command',
    CONTRARIAN: 'contrarian',
    CONDITIONAL: 'conditional',
    LABEL: 'label',
};

export const OUTFITS = {
    A: { label: 'Outfit A', desc: 'Dark suit / professional', color: '#1a1a2e' },
    B: { label: 'Outfit B', desc: 'Smart casual / rolled sleeves', color: '#16213e' },
    C: { label: 'Outfit C', desc: 'Casual / streetwear', color: '#0f3460' },
};

// ─────────────────────────────────────────────────
// CASH-PAY B2B ADS (1–50)
// ─────────────────────────────────────────────────
export const CASH_PAY_SCRIPTS = [

    // ── MARKET DATA / UNAWARE (1–8) ──────────────
    {
        id: 'CP-01',
        title: 'The Market Is Doubling',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "The ketamine clinic market is worth $3.4 billion right now. By 2030 it'll hit $6.9 billion. That's not my opinion — that's Grand View Research." },
            { angle: 'question', text: "What happens when an entire healthcare market DOUBLES in 6 years? I'll tell you exactly what happens." },
            { angle: 'callout', text: "If you own a ketamine clinic and you don't have a scalable acquisition system yet — you're actively ceding market share to someone who does." },
            { angle: 'conditional', text: "If your clinic doesn't have a predictable patient acquisition system locked in by end of year — your cost per acquired patient in 2026 will be 2 to 3x what it is today." },
        ],
        body: "Here's what's happening right now in this market.\n\nNew clinics are opening every week. A new one probably just opened 15 minutes from yours. They may not be as good as you. They may not have your outcomes. They definitely don't have your experience.\n\nBut here's the thing about a doubling market: the clinics that win aren't the best ones. They're the ones patients find first.\n\nYou can be the best clinic in your city and still lose. Because the patient at 2 AM isn't comparing outcomes. They're clicking whoever shows up when they search.\n\nAnd right now — if your acquisition system isn't locked in — someone else is building theirs. While you wait, they're capturing the market share that should be yours.\n\nThe question isn't whether the market is growing. It is. The question is whether you're positioned to grow with it — or whether you're watching someone else eat the demand you should be serving.",
        cta: "We build that system — and you only pay $99 per qualified inquiry — pre-screened, cash-pay, first contact. No retainers, no contracts. If we don't perform, we don't eat. Link in bio to see if your clinic qualifies.",
    },
    {
        id: 'CP-02',
        title: 'Ketamine Prescriptions Up 500%',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "Ketamine prescriptions increased over 500% between 2017 and 2022. Five. Hundred. Percent." },
            { angle: 'question', text: "500% more people are seeking ketamine therapy than 5 years ago. Is your clinic capturing its proportional share of that demand — or watching a better-positioned competitor do it?" },
            { angle: 'contrarian', text: "Everyone says the ketamine market is booming. They're right about demand. But most clinics aren't built to capture it systematically. Here's the gap between clinics that win and clinics that plateau." },
            { angle: 'callout', text: "There are more people searching for ketamine therapy right now than at any point in history. And most of them will never find YOUR clinic." },
        ],
        body: "That's not a statistic. That's a person.\n\nThat's someone who spent three years trying Lexapro, Zoloft, Wellbutrin, Prozac — watched every one of them either not work or make things worse. Who's now Googling at 2 AM, not because they want another medication, but because they're desperate for something different.\n\nThey found ketamine. They're looking for a clinic near them.\n\nWill they find yours?\n\n28% of those prescriptions are for depression. 19% for anxiety. 35% for chronic pain. The demand exists. It's real. It's growing every single year.\n\nBut here's what I've seen in clinic after clinic: the patients aren't finding the best provider. They're finding whoever shows up first. Whoever's running ads. Whoever has the system.\n\nRight now — that might not be you.",
        cta: "We put your clinic in front of these patients every single day — and you only pay $99 per qualified inquiry. No retainer. Performance-based. Link in bio.",
    },
    {
        id: 'CP-03',
        title: 'The ExoMind Cash-Pay Window',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "ExoMind TMS just got FDA clearance and it's 100% cash-pay — no insurance, no prior auth, no billing headaches. $3,000 to $4,800 per 6-session course. And almost nobody is marketing it correctly yet." },
            { angle: 'question', text: "If you have ExoMind equipment sitting in your clinic — are you filling it? Because most clinics with ExoMind are running at half capacity right now." },
            { angle: 'callout', text: "ExoMind TMS is the most undermarketed cash-pay treatment in mental health right now. Clinics have the device. Zero idea how to fill the chairs with it." },
            { angle: 'contrarian', text: "Everyone talks about growing ketamine revenue. But the biggest untapped cash-pay opportunity in your clinic right now might be the TMS chair that's half-empty." },
        ],
        body: "FDA-cleared. Cash-pay only. $3,000 to $4,800 per six-session course. No insurance headaches, no prior auths, no clawbacks.\n\nAnd here's the piece most clinics miss: the patient psychology for ExoMind is completely different from ketamine. There's no psychedelic experience. Non-invasive. Works for depression AND anxiety. And the 'no drug' framing removes the #1 objection your ketamine patients bring to the table.\n\nBut patients don't know ExoMind exists. They're not searching for it by name. You can't run a 'book now' ad for a treatment nobody's heard of.\n\nWhat you need is an education-first campaign. Something that explains the mechanism, builds trust, breaks the belief that SSRIs are the only option — and THEN converts to a consult.\n\nMost clinics with ExoMind equipment treat it like an afterthought. You already paid for the device. You're already paying for the space. The only variable is the marketing.\n\nAnd the window to own this category before it gets crowded is closing fast.",
        cta: "We build ExoMind and ketamine patient acquisition systems on performance pricing — $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-04',
        title: 'The Math Problem',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "A single ketamine patient is worth $15,000 to $25,000 in lifetime value. The cost to acquire them? It should be about $300. Let me show you why most ketamine clinics pay 10x that." },
            { angle: 'question', text: "Ketamine clinic owners — what if I told you you're spending $2,000 to acquire a patient you SHOULD be getting for $300?" },
            { angle: 'command', text: "Ketamine and TMS clinic owners — grab a calculator. I'm about to show you the math that's either going to make you very excited or very angry." },
            { angle: 'callout', text: "Every ketamine clinic paying $5K a month in retainers and getting 3 patients is paying $1,700 per patient. That's insane. Here's what the math SHOULD look like." },
        ],
        body: "Let me walk you through the math.\n\nA ketamine patient who completes the full protocol is worth $15,000 to $25,000 in revenue. That's the ceiling.\n\nThe cost to acquire them — with the right system — should be around $300. $99 per qualified inquiry when delivered.\n\nThat's a 50x to 80x return on your marketing spend.\n\nBut most clinics aren't seeing anywhere near that. Because they're paying $5,000 to $10,000 a month in retainers — whether patients show up or not.\n\nAnd that's the problem. Your agency gets the same check in a month where you book 50 patients and a month where you book zero. They have no incentive to perform at the level this math requires.\n\nThe math doesn't break because marketing doesn't work for ketamine clinics. The math breaks because the incentive structure is designed to pay agencies whether they work or not.\n\nChange the model. Change the math.",
        cta: "That's exactly what we built. $99 per qualified inquiry. You don't pay us unless a patient is sitting in your chair. Link in bio to see the full model.",
    },
    {
        id: 'CP-05',
        title: 'New Clinics Eating Your Lunch',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'story', text: "A new ketamine clinic just opened 15 minutes from yours. And they're already running ads. They're not better than you. But they're about to take your patients." },
            { angle: 'question', text: "How many new clinics have opened in your city in the last 12 months? Do you even know?" },
            { angle: 'callout', text: "You've been the best clinic in your area for years. Congratulations. A 26-year-old with a business degree and a marketing budget is about to eat your lunch." },
            { angle: 'stat', text: "The number of ketamine clinics in the U.S. has tripled since 2020. And every single new one is competing for YOUR patients." },
        ],
        body: "They don't have better outcomes. They don't have better equipment. They don't have more years of experience.\n\nBut they have one thing: a system.\n\nSomeone is running ads for their clinic right now. Someone is showing up every time a patient searches 'ketamine therapy near me' at midnight. Someone is filling their chairs with the patients who should be coming to yours.\n\nAnd visibility beats quality every single time.\n\nThat's not how it should work. But look around — you've seen it in every industry. The best restaurant doesn't win. The most visible one does. The best clinic doesn't always win. The one that shows up first does.\n\nYou built something real. You've helped patients. You have the outcomes.\n\nNow it's time to make sure people can actually find you — before someone with half your experience and twice your visibility takes the market you've spent years building.",
        cta: "We make your clinic un-ignorable — and you only pay when patients show up. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-06',
        title: 'The 67% Stat',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "67% of patients don't respond to SSRIs. That's not a fringe stat — that's two out of three people on antidepressants right now getting no relief." },
            { angle: 'story', text: "Right now, someone in your city is lying awake at 2 AM wondering why their antidepressant isn't working. They've tried Lexapro, Zoloft, Wellbutrin — nothing." },
            { angle: 'question', text: "Two out of three people on antidepressants aren't getting better. Where do they go next? And will they find YOUR clinic?" },
            { angle: 'contrarian', text: "SSRIs fail the majority of patients. Everyone knows this. Nobody talks about it. And YOUR clinic has the answer — but those patients can't find you." },
        ],
        body: "Here's who that patient is.\n\nThey've tried five medications. Maybe more. They've been to therapy. They've done the work. And nothing has moved the needle.\n\nThey're not just struggling — they're hopeless. They've started to believe this is just how their life is going to be.\n\nAnd then they read something about ketamine. Or TMS. And for the first time in years, something clicks. Maybe this is different. Maybe this actually works.\n\nSo they pull out their phone at 2 AM and start searching.\n\nKetamine has a 50 to 70% response rate for treatment-resistant depression. Your clinic could change this person's life.\n\nBut if you're not showing up when they search — they'll find whoever is. Not the best clinic. Not the one with the best outcomes. The one that's running ads. The one with a system.\n\nYou have the answer. The problem is they can't find you.",
        cta: "We put your clinic in front of these patients every day. $99 per qualified inquiry. No retainer. Link in bio.",
    },
    {
        id: 'CP-07',
        title: 'ExoMind Cash-Pay Goldmine',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'callout', text: "If you offer ExoMind TMS, you're sitting on a cash-pay goldmine that most clinics don't know how to market." },
            { angle: 'stat', text: "ExoMind TMS: $3,000 to $4,800 per 6-session course. FDA-cleared. Cash-pay only. Zero insurance headaches. And almost nobody is marketing it correctly." },
            { angle: 'question', text: "What if you had a treatment that costs $4,800, requires no insurance, and patients have never heard of? That's ExoMind — and it's a marketing problem, not a clinical one." },
            { angle: 'conditional', text: "If you've invested in ExoMind equipment and your chairs are half-empty — the treatment isn't the problem. Your marketing is." },
        ],
        body: "ExoMind is FDA-cleared. Cash-pay. $3,000 to $4,800 per six-session course. No REMS. No insurance. No prior auths. Clean margin every single time.\n\nHere's the problem: nobody's searching for it by name.\n\nYou can't run a 'book now' ad for a treatment your patient has never heard of. They need to understand what it is, why it works, and why it's different from everything they've already tried — before they'll ever consider booking.\n\nThat's an education problem. And it requires a very specific type of funnel: educate first, build belief, THEN convert.\n\nMost marketing agencies don't know how to run that. They know how to run 'click here to book your consultation' ads for established products. ExoMind is different.\n\nThe clinics that build the right education-to-conversion system for ExoMind right now — before this becomes a crowded category — are going to own that market.\n\nThis is a first-mover window. It's real. And it's closing.",
        cta: "We build education-to-conversion funnels for cash-pay treatments like ExoMind. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-08',
        title: 'The Invisible Clinic',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'callout', text: "Ketamine clinic owners — you have an incredible clinic. State-of-the-art equipment. Amazing outcomes. Five-star reviews. And nobody knows you exist." },
            { angle: 'label', text: "If you run a ketamine or TMS clinic and your reputation lives only inside your existing patient base — you've left your growth ceiling up to word-of-mouth. And word-of-mouth has a cap." },
            { angle: 'question', text: "What's worse than running a great ketamine clinic? Running one where nobody outside your current patients knows it exists." },
            { angle: 'contrarian', text: "The worst ketamine clinic in your city might be getting more patients than you right now. Not because they're better — because they're louder." },
        ],
        body: "You're the best-kept secret in your city.\n\nI know that's not a compliment. But it's exactly what most clinic owners are.\n\nFive-star reviews. Real outcomes. Years of experience. Patients who would refer you to everyone they know — but they're not doing it fast enough to fill your chairs.\n\nWord-of-mouth has a ceiling. And you've probably already hit it.\n\nRight now, the clinics capturing new patients aren't the ones with the best outcomes. They're the ones showing up at midnight when someone searches 'ketamine therapy near me' and actually clicks something.\n\nThey're running ads. They have a system. And it doesn't matter if their clinical outcomes are worse than yours — because the patient found them first.\n\nEvery day you stay invisible, someone less experienced is treating the patients who should be sitting in your chair.\n\nThat's not a traffic problem. That's a choice.",
        cta: "Stop being invisible. We put clinics on the map — and you only pay when patients show up. $99 per qualified inquiry. Link in bio.",
    },

    // ── PAIN AGITATION / PROBLEM AWARE (9–18) ────
    {
        id: 'CP-09',
        title: 'Retainer Fatigue',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '80s',
        hooks: [
            { angle: 'callout', text: "Ketamine clinic owners — you're paying your marketing agency $5,000 a month. Maybe $7,000. Maybe $10,000. The reports show green numbers. But when you look at new patient bookings for the month — the math doesn't reconcile." },
            { angle: 'question', text: "If you run a ketamine or TMS clinic — when's the last time you looked at your marketing spend and thought 'Every dollar of this is working'? Exactly." },
            { angle: 'label', text: "If you're a ketamine or TMS clinic owner paying a retainer to an agency that can't tell you how many patients they generated last month — this is for you." },
            { angle: 'story', text: "I talked to a ketamine clinic owner last week who's paid $120,000 in agency retainers over the last two years. She couldn't name 10 patients that came from it." },
        ],
        body: "Every month, the same pattern.\n\nYou write the check. The agency sends a PDF. Impressions are up. Clicks are up. Engagement looks good.\n\nYou ask: 'How many patients came in this month?'\n\nAnd they start talking about brand awareness.\n\nHere's the thing: leads don't pay your rent. Patients do. Not impressions. Not clicks. Not 'algorithm performance.' Patients who sit in your chair and pay you — that's the only metric that matters.\n\nThe reason you keep getting burned isn't that the agencies are incompetent. Some of them are smart people. The problem is structural.\n\nThey get $5,000 whether you get 50 patients or zero. So they optimize for the things they can control — the metrics that look good in a PDF — not the things you actually care about.\n\nThe fix isn't a better agency. The fix is a model where your agency's revenue is tied to yours.",
        cta: "Our model: $99 per qualified inquiry up. If we generate zero patients, you pay zero. No retainers. No contracts. Month to month. Link in bio.",
    },
    {
        id: 'CP-10',
        title: 'Your Front Desk Is Killing Your ROI',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '80s',
        hooks: [
            { angle: 'contrarian', text: "Your ketamine clinic's ads are working. Your front desk is killing the ROI." },
            { angle: 'stat', text: "Your clinic loses 80% of patient leads after 5 minutes. Your front desk calls back in 4 hours." },
            { angle: 'question', text: "How fast does your clinic call back a new patient lead? Over 5 minutes? You're losing 80%." },
            { angle: 'callout', text: "Clinic owners — you're blaming your ads. But your patient leads were fine. Your follow-up wasn't." },
        ],
        body: "MIT ran a study on lead response time.\n\nThe odds of qualifying a lead drop 80% if you wait more than five minutes to call them back.\n\nEighty percent.\n\nHere's what that means for your clinic. Someone fills out your form at 2 PM. They're scared. This is probably the most vulnerable thing they've done in years — admitting they need help, putting in their name and number, waiting for someone to call.\n\nYour receptionist calls them back at 4 PM.\n\nBy then? They've already talked themselves out of it. Or they've called three other clinics and booked with whoever picked up first.\n\nThe lead wasn't bad. The window closed.\n\nMost clinic owners blame the ads when this happens. 'The leads aren't qualified.' 'We're not getting the right patients.' But when I dig into the data, the leads were fine — the follow-up system failed them.\n\nSpeed-to-lead isn't a sales trick. For a treatment-resistant patient who finally worked up the courage to reach out, it's empathy.",
        cta: "We don't just generate leads — we help you convert them with speed-to-lead systems and trained ISAs. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-11',
        title: 'The Agency Graveyard',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '80s',
        hooks: [
            { angle: 'question', text: "Ketamine and TMS clinic owners — how many agencies have you fired in the last two years? One? Two? Three? You're not alone — and it's not your fault." },
            { angle: 'callout', text: "If I talk to one more ketamine clinic owner who says 'I've been burned by agencies' — I might lose it. Not because they're wrong. Because the SYSTEM is designed to burn you." },
            { angle: 'label', text: "This is for every ketamine or TMS clinic owner who's said 'I'll never hire another agency again.' I don't blame you. But let me show you why it wasn't really the agency's fault." },
            { angle: 'stat', text: "The average ketamine clinic owner has fired 2.3 agencies in the last 3 years. The agencies weren't all bad — the MODEL was." },
        ],
        body: "I've talked to hundreds of clinic owners. I know the story before they tell me.\n\nThey hired an agency. The pitch was great. They paid $5K, maybe $7K a month. Got leads. The leads didn't convert. The agency blamed patient quality, ad costs, the algorithm. Six months later — same empty chairs, $40,000 gone.\n\nSo they fired them. Hired another one. Different name, different logo, same story.\n\nNow they don't trust anyone. They're cynical. When I call, they expect to hear another promise.\n\nHere's what I tell them: you weren't burned by bad agencies. You were burned by a broken model.\n\nEvery one of those agencies got paid the same check whether you got 50 patients or zero. There was no incentive to perform. There was only incentive to retain the account.\n\nSo they did just enough to keep you from firing them — until they couldn't.\n\nThe agency doesn't need to be better. The model does.",
        cta: "We flipped the model. $99 per qualified inquiry. If we fail, we make $0. That's not a promise — that's math. Link in bio.",
    },
    {
        id: 'CP-12',
        title: 'Leads Are NOT Patients',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.OCPB,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "Your agency sent your ketamine clinic 200 leads last month. How many became patients who sat in your chair? If you can't answer that in 3 seconds, we have a problem." },
            { angle: 'contrarian', text: "For ketamine and TMS clinics — leads are the most overrated metric in healthcare marketing. I said what I said." },
            { angle: 'question', text: "Ketamine clinic owners — what's the difference between a lead and a patient? About $15,000. And most agencies don't track the gap." },
            { angle: 'command', text: "If you run a ketamine or TMS clinic — stop counting leads. Start counting butts in chairs. That's the only number that pays your bills." },
        ],
        body: "Leads don't pay your bills. Patients do.\n\nA lead is someone who filled out a form. Maybe they were curious. Maybe they were comparison shopping. Maybe they were having a bad night and clicked on something before talking themselves out of it.\n\nA patient is someone who sat in your chair, received treatment, and paid you.\n\nThose are completely different things. And most agencies have no idea what happens to their leads after the form fill.\n\nI've seen clinics get 200 leads a month from an agency that charged $8,000, where 5 patients actually showed up. That's a 2.5% conversion. And the agency's report showed green arrows because their lead number was up.\n\nIf your marketing partner can't tell you your cost per actual patient — not per lead, not per click, not per impression — they're hiding behind metrics because the real numbers would get them fired.\n\nAsk them. Watch what happens.",
        cta: "We track from click to chair — and we only get paid on the chair. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-13',
        title: 'The $60K Leak',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "Your ketamine or TMS clinic is leaking $60,000 a year and you don't even know it. Let me show you the math." },
            { angle: 'question', text: "Ketamine clinic owners — what if I told you there's a $60,000 hole in your business that has nothing to do with your treatment quality?" },
            { angle: 'callout', text: "Ketamine clinics spending $5K a month on marketing and converting 10% of leads — you should be converting 30%. That gap is costing you $60K a year." },
            { angle: 'command', text: "If you run a ketamine or TMS clinic — stop and go check your lead-to-patient conversion rate right now. If it's under 20%, you're leaving $60K+ on the table every year." },
        ],
        body: "Here's the math, and it's uncomfortable.\n\nIf you're spending $5,000 a month on marketing and your lead-to-patient conversion is 10%, you're booking about 5 patients a month. If you fixed your conversion to 30% — the same spend, the same leads, the same ads — you'd book 15 patients.\n\nThat's 10 extra patients a month. At $500 average initial value, that's $5,000. At $15,000 LTV, that's $150,000 in additional revenue annually. From zero extra ad spend.\n\nWhere did those patients go? The leads came in. They filled out the form. And then nothing happened fast enough, or smoothly enough, or personally enough to keep them engaged.\n\nThe intake process failed them. The follow-up speed failed them. The nurture sequence didn't exist.\n\nThe marketing didn't fail. The system around the marketing failed.\n\nAnd the gap between what you're doing and what's possible — that's your $60K leak.",
        cta: "We plug the leaks. Speed-to-lead systems, conversion optimization, and you only pay $99 per qualified inquiry. Link in bio for a free diagnostic.",
    },
    {
        id: 'CP-14',
        title: 'Brand Awareness Doesn\'t Pay Rent',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.OCPB,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'question', text: "Ketamine and TMS clinic owners — your agency keeps talking about 'brand awareness.' Cool. Does brand awareness pay your clinic's rent?" },
            { angle: 'callout', text: "If your ketamine clinic's agency is proudest of an 'impressions' graph going up — fire them today." },
            { angle: 'contrarian', text: "For ketamine and TMS clinics — brand awareness is the most expensive way to feel good while going broke." },
            { angle: 'command', text: "The next time your ketamine clinic's agency sends a report with 'impressions' on it — ask one question: 'How many patients sat in my chair?'" },
        ],
        body: "Does 'brand awareness' pay your nurses this month?\n\nDoes 'impressions growth' cover your ketamine infusion supplies?\n\nNo. Patients do that. Actual people who sat in your chair and paid you.\n\nHere's the problem with most agency reporting: they measure what they can control. Impressions, clicks, engagement — all things they can inflate with enough budget. But they can't control whether your front desk picks up the phone in time. They can't control your intake process. So they report on what makes them look good.\n\nIf your marketing partner can't draw a straight line from ad dollar to patient sitting in your chair, what you have is an expensive hobby — not a marketing system.\n\nEvery dollar you spend should have a trackable pathway to revenue. If it doesn't, stop spending it.",
        cta: "We cut the noise. Performance-based. $99 per qualified inquiry. You only pay for what's real. Link in bio.",
    },
    {
        id: 'CP-15',
        title: 'The Catch-22',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.BELIEF_BRIDGE,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'callout', text: "Here's the catch-22 every established ketamine or TMS clinic eventually hits: you're profitable enough that the retainer model feels tolerable — until you calculate what you're leaving on the table every single month." },
            { angle: 'question', text: "Ketamine clinic owners — what if every dollar you invested in patient acquisition had a contractually-defined return? No more writing $10K checks and hoping." },
            { angle: 'label', text: "This is for ketamine and TMS clinic owners who've already proven they can fill chairs, already invested in agencies, and are done funding a marketing partner whose downside isn't aligned with yours." },
            { angle: 'story', text: "I talked to a ketamine clinic owner last month clearing $80K in monthly revenue who said: 'I know my clinic should scale faster. I just can't find a single partner whose incentives actually match mine.'" },
        ],
        body: "BEFORE — you're running a profitable clinic. The reports look fine. Retainer checks go out every month. But you can't answer one question: what did we actually pay per patient this month?\n\nYou're not sure. And that uncertainty is expensive.\n\nAFTER — you know exactly what you paid per patient. Because you only paid $99 per qualified inquiry — pre-screened, cash-pay, defined by you before launch. You can trace every dollar. You can scale up when you want more volume. You can pull back when you're full.\n\nTHE BRIDGE — the shift from retainer to performance isn't about trust. It's about alignment. When your marketing partner makes nothing if you make nothing, everything changes. How fast they build. How hard they optimize. How seriously they take your empty chair.\n\nYou don't need a bigger budget. You need a partner whose downside is structurally tied to yours.",
        cta: "That's our model. $99 per qualified inquiry. If we fail, you pay nothing. Link in bio.",
    },
    {
        id: 'CP-16',
        title: 'Why Your Ads Are Getting Rejected',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "Your Facebook ads keep getting rejected and your agency doesn't know why. Let me save you months of frustration in 60 seconds." },
            { angle: 'question', text: "Why does Meta reject healthcare ads? Because your agency is running your ketamine clinic the same way they'd run a pizza shop." },
            { angle: 'stat', text: "Meta tightened healthcare ad restrictions 4 times since 2022. Interest targeting by medical condition? Gone. Before-and-after images? Banned. And most agencies have no idea." },
            { angle: 'label', text: "If your agency has gotten your ad account flagged, suspended, or restricted — this is exactly why." },
        ],
        body: "I've talked to clinic owners who had their ad account restricted and had no idea why. And their agency told them it was 'Meta being unpredictable.'\n\nIt wasn't. It was predictable. Meta changed healthcare ad rules four times since 2022 and their agency was still running 2019 creative.\n\nHere's what triggers rejections: before-and-after images. Guaranteed outcome claims. 'FDA-approved' language used incorrectly. Targeting by medical condition — which Meta removed in January 2022. Interest-based medical targeting: gone.\n\nMost generalist agencies don't know any of this because they're not healthcare-specific. They're running your clinic the same way they run a restaurant.\n\nCompliant healthcare creative isn't a checkbox. It's a craft. It has to feel native. Educational. Like a doctor sharing information, not a brand running a sale.\n\nGet that wrong and you don't just lose the ad. You lose the account.",
        cta: "That's literally all we do — compliant healthcare creative that converts. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-17',
        title: 'The Revolving Door',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'C',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "Your clinic has a revolving door problem. Patients come for one infusion and never come back. And it's costing you $14,000 per patient." },
            { angle: 'stat', text: "The difference between a $400 patient and a $15,000 patient is exactly one thing: what happens AFTER the first infusion." },
            { angle: 'question', text: "How many patients did you lose after their first infusion last month? If you don't know — that's the problem." },
            { angle: 'contrarian', text: "Your biggest revenue problem isn't lead generation. It's retention. And almost nobody is talking about it." },
        ],
        body: "The first infusion isn't the business. The series is the business.\n\nA full ketamine protocol is six infusions minimum. That's where the real clinical benefit happens. That's also where the real revenue is.\n\nBut if you don't have a system that brings patients back — follow-ups, outcome check-ins, rebooking reminders, automated sequences — they come in once, feel something, and then life gets in the way.\n\nThey meant to come back. They just didn't.\n\nAnd you just converted a $15,000 patient into a $400 one. Same cost to acquire them. Completely different revenue outcome.\n\nMost clinic owners think about marketing as getting patients in the door. The door is actually in the middle of the funnel. The real marketing happens AFTER the first visit.\n\nRetention is the most underbuilt system in almost every clinic I talk to.",
        cta: "We build the full funnel — acquisition AND retention. $99 per qualified inquiry. Plus complete nurture systems. Link in bio.",
    },
    {
        id: 'CP-18',
        title: 'You\'re Marketing to the Wrong Person',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.OCPB,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'contrarian', text: "What if I told you the reason your ads aren't working is because you're targeting the wrong person entirely?" },
            { angle: 'question', text: "Who's Googling 'ketamine therapy near me' at midnight? It's usually NOT the patient. It's their spouse." },
            { angle: 'callout', text: "You're running ads to patients. But in ketamine therapy, the BUYER is usually the family member." },
            { angle: 'stat', text: "In 60% of ketamine inquiries, the person filling out the form is NOT the patient — it's their loved one. And your ads don't speak to them." },
        ],
        body: "Here's a pattern I didn't expect when I started working in this space.\n\nThe person filling out the form at midnight isn't always the patient. Half the time, it's their spouse. Or their adult child. Or their parent.\n\nThey're watching someone they love fall apart. They've watched SSRIs not work. They've watched therapy not be enough. They're the ones Googling at 2 AM because the patient themselves has given up trying.\n\nYour ads need to speak to both people. And they need to speak to them differently.\n\nThe patient needs to hear: you're not broken. This is a different mechanism entirely. This can work when nothing else has.\n\nThe supporter needs to hear: there's something you can do. Here's how to help them take the next step. You don't have to watch helplessly.\n\nTwo completely different emotional triggers. Two different conversion paths. One system that serves both.\n\nMost agencies don't even know this dynamic exists.",
        cta: "We build campaigns for both. $99 per qualified inquiry. Ads that speak to sufferers AND supporters. Link in bio.",
    },

    // ── MECHANISM / SOLUTION AWARE (19–28) ────────
    {
        id: 'CP-19',
        title: 'Why Pay-Per-Performance Works',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.BELIEF_BRIDGE,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'contrarian', text: "Every agency says they'll get patients for your ketamine or TMS clinic. We structured our entire business so we go BROKE if we don't." },
            { angle: 'question', text: "Ketamine and TMS clinic owners — what would change if your marketing partner literally couldn't afford to be bad at their job?" },
            { angle: 'callout', text: "Ketamine clinic owners — I'm about to explain why every other agency charges retainers, and why we can't. It'll change how you think about marketing forever." },
            { angle: 'command', text: "Ask your ketamine clinic's current agency: 'If you get me zero patients this month, do you still get paid?' When they say yes, call us." },
        ],
        body: "BEFORE — you're paying an agency $5,000 to $10,000 a month. They run ads. Send a report. Get paid. Whether you got 1 patient or 100 doesn't change their check.\n\nThat's not a partnership. That's a subscription you forgot to cancel.\n\nAFTER — you pay $99 per qualified inquiry. If we book zero — we make zero. We don't get a retainer to soften the blow. We don't have a base fee to fall back on.\n\nOur entire revenue depends on your patients showing up.\n\nTHE BRIDGE — it's called performance-based marketing. And here's why it works: when our income is structurally tied to your results, everything changes. We optimize like it's our money because our money depends on your outcomes. We don't take clients we can't grow because a client we can't grow costs us everything.\n\nNo retainers. No contracts. Month to month. If we don't deliver, you leave. No penalty.",
        cta: "See the full model — link in bio. 4 questions. 60 seconds.",
    },
    {
        id: 'CP-20',
        title: 'The Full Offer Stack',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '90s',
        hooks: [
            { angle: 'callout', text: "Ketamine clinic owners — here's an offer no marketing agency will ever make you." },
            { angle: 'command', text: "If you run a ketamine or TMS clinic, screenshot this offer. You won't see it anywhere else." },
            { angle: 'question', text: "What if your clinic got a website redesign, 10 video scripts, AND 20 SEO articles — free?" },
            { angle: 'contrarian', text: "Your agency charges $5K/month for a report. Here's what your clinic gets from us — for free." },
        ],
        body: "Here's everything that's included — and here's why we give most of it away for free.\n\nPerformance pricing: $99 per qualified inquiry. No retainer. Month to month.\n\nTen professional video scripts for your organic social: free.\n\nFull website redesign into a conversion-optimized landing page: free.\n\nTwenty SEO blog articles targeting your local market: free.\n\nISA follow-up and speed-to-lead system: included.\n\nWhy? Because we make money when you make money. A clinic with a bad website converts at 2%. A clinic with a great website converts at 8%. That's four times the patients from the same ad spend. The free website isn't charity — it's us being selfish. Better website means more patients showing up, which means more revenue for us.\n\nThe entire free offer exists because our performance depends on your conversion. We can't afford to hand you a broken pipeline.",
        cta: "The full stack: performance ads + ISA + scripts + website + SEO. All included. If you're a cash-pay clinic doing at least $3K in monthly ad spend — link in bio.",
    },
    {
        id: 'CP-21',
        title: 'Aligned Incentives',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'command', text: "Ketamine clinic owners — ask your current agency one question: 'If you don't get me a single patient this month, do you still get paid?' Watch their face." },
            { angle: 'contrarian', text: "The agency model for ketamine clinics isn't broken because agencies are bad. It's broken because the INCENTIVE STRUCTURE rewards mediocrity." },
            { angle: 'question', text: "What happens when your ketamine clinic's marketing partner makes the same money whether you get 50 patients or zero? Exactly what you'd expect." },
            { angle: 'label', text: "If you run a ketamine or TMS clinic and you're tired of writing checks to agencies that don't feel the pain when you feel the pain — listen up." },
        ],
        body: "Ask your current agency one question: if you don't get me a single patient this month, do you still get paid?\n\nThey'll say yes. Because that's the model.\n\nThat one answer explains every experience you've ever had with a marketing agency. It explains the generic reports, the missed calls, the templated campaigns, the slow creative turnarounds. None of it matters to the agency because the check comes regardless.\n\nOur fee is $99 per qualified inquiry.\n\nIf we generate zero, we make zero. Full stop.\n\nWhen the incentives are aligned, you don't need to micromanage. You don't need weekly status calls to make sure people are working. You don't need to chase reports. Because our survival depends on your results.\n\nThat's a fundamentally different relationship. And it produces fundamentally different results.",
        cta: "Ready for a partner who actually has skin in the game? Link in bio.",
    },
    {
        id: 'CP-22',
        title: 'The 3-Layer System',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'contrarian', text: "Most agencies running ketamine clinic ads just run ads and pray. Let me show you the actual 3-layer system that fills chairs — and why prayer is not a strategy." },
            { angle: 'command', text: "Ketamine and TMS clinic owners — if your agency can't explain their system in 3 layers, they don't have a system. Here's ours." },
            { angle: 'question', text: "What does a REAL ketamine or TMS patient acquisition system look like? Not 'we run Facebook ads.' An actual system. Let me break it down." },
            { angle: 'callout', text: "Your ketamine clinic has been paying for 'marketing.' What you actually need is a 3-layer acquisition machine. Here's the difference." },
        ],
        body: "Most agencies run ads. That's it. They call it a 'full-service marketing strategy' but what they mean is they spend your budget on Facebook and send you a report.\n\nHere's what an actual patient acquisition system looks like.\n\nLayer one: acquisition. Compliant Meta ads built for the Andromeda algorithm. Creative-as-targeting — five semantically different concepts running simultaneously, letting the algorithm find different patient pools from different angles. No wasted budget on interest targeting that stopped working two years ago.\n\nLayer two: conversion. Speed-to-lead infrastructure. Trained ISAs. A structured intake process that meets the patient where they are emotionally — scared, skeptical, desperate, hopeful. If a lead comes in at 2 PM, they're contacted within five minutes, not four hours.\n\nLayer three: retention. Automated follow-ups, outcome check-ins, rebooking sequences. Because the first infusion isn't the revenue — the protocol is. And the protocol happens when someone helps the patient show up consistently.\n\nThree layers. One system. Every single component optimized because all three have to work for us to get paid.",
        cta: "Want to see how the 3-layer system applies to YOUR clinic? Link in bio for a free diagnostic.",
    },
    {
        id: 'CP-23',
        title: 'Why We Only Take 6 Clinics',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "We only take on 6 new ketamine or TMS clinics per month. And here's why that should matter to your clinic." },
            { angle: 'contrarian', text: "Every agency that serves ketamine clinics brags about how many clients they have. We brag about how FEW we take." },
            { angle: 'question', text: "What happens when an agency takes on 200 ketamine clinics? Everyone gets a template. What happens when they take 6? Everyone gets a system." },
            { angle: 'stat', text: "Volume agencies serve 200 ketamine clinics with junior account managers and templated campaigns. We serve 6 — because we can't afford to fail." },
        ],
        body: "Volume agencies take on 50, 100, sometimes 200 clients. Junior account managers run everything. Templated campaigns go out with your logo and location swapped in. Every ketamine clinic they serve gets the same playbook.\n\nThat's fine if you want to be median. If you want to grow, it's a problem.\n\nWe cap at six clients. Not because we can't handle more — because our performance-based model demands that we don't.\n\nIf a retainer agency takes 50 clients and half of them plateau, they still collected $250,000 in retainers that month. Not our problem.\n\nWith our model, we make money per patient. Which means half our clients failing means half our revenue is zero.\n\nWe NEED every clinic we take on to grow. So we take six. We go deep. We build custom systems. We can't afford to spread thin.\n\nAnd because we're selective, you know exactly what our yes means: we looked at your clinic, we know we can grow it, and we're betting our revenue on it.",
        cta: "Find out if your clinic qualifies for one of the 6 spots. Link in bio.",
    },
    {
        id: 'CP-24',
        title: 'Creative IS Targeting',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'command', text: "Your ketamine clinic's ad creative IS your targeting now. If your agency doesn't get that — fire them." },
            { angle: 'contrarian', text: "Targeting for your clinic's ads is dead. The only thing that matters is your creative. Here's why." },
            { angle: 'question', text: "Why are your clinic's ads reaching the wrong patients? Because your agency is still using 2020 targeting." },
            { angle: 'stat', text: "Meta changed how your clinic's ads get served. 90% of healthcare agencies haven't caught up." },
        ],
        body: "This took a while to understand, but it changed how we build everything.\n\nMeta's algorithm used to rely on interest and demographic targeting. You'd pick mental health interests, certain age ranges, certain locations. That worked in 2019.\n\nNow the algorithm is smarter than that. It reads the content itself — the language, the visuals, the tone, the emotional specificity of the copy — and determines who should see it based on who would actually be moved by it.\n\nWhat that means: if your ad is generic, it finds generic people. People who click on generic health content. Not necessarily people actively seeking ketamine therapy.\n\nIf your ad is specific — if it says something like 'you've tried four antidepressants and given up hoping anything will work' — the algorithm finds the people that language RESONATES with.\n\nYour creative is now your targeting. If your agency doesn't understand this, everything they're running for you is suboptimal by design.",
        cta: "We build creative designed for the Andromeda algorithm — with multiple hooks tested from different angles. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-25',
        title: 'The Speed-to-Lead Gap',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STATS,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "MIT study: ketamine and TMS clinics that contact a lead within 5 minutes are 100x more likely to connect. After 30 minutes? 80% drop. Your front desk calls back in 4 hours." },
            { angle: 'question', text: "Ketamine clinic owners — what's the single biggest lever that could double your patient acquisition overnight? It's not your ads. It's not your budget. It's your response time." },
            { angle: 'story', text: "A ketamine patient fills out your form at 2 PM. She's scared. She's never tried this before. Your front desk calls at 5 PM. She's already booked somewhere else." },
            { angle: 'command', text: "Ketamine clinic owners — time yourself. How long does it take your team to respond to a new lead? If it's more than 5 minutes, you're hemorrhaging patients." },
        ],
        body: "There's an MIT study on lead response time that I quote a lot. It's because the numbers are genuinely shocking.\n\nContacting a lead within five minutes makes you 100 times more likely to actually connect with them. After 30 minutes, the connection probability drops 80%.\n\nHundred times. Eighty percent.\n\nHere's who your patient is in that window: someone who has been suffering for years and finally worked up the courage to reach out. They filled out the form. They're waiting. Every minute that passes is a minute they have to convince themselves it won't work anyway, that they're not worth $400 for a treatment, that they should just stick with what they know.\n\nWhen you call at 4 PM? That person is already gone. Not because they left — because hope is fragile and nobody met them in the window where it was available.\n\nThis isn't a sales optimization. It's a clinical reality. Fast response for mental health patients isn't about conversion rates. It's about whether they get help.",
        cta: "We install speed-to-lead systems with trained ISAs who respond in under 5 minutes. $99 per qualified inquiry. Link in bio.",
    },

    // ── OBJECTION HANDLING / PRODUCT AWARE (26–38) ──
    {
        id: 'CP-26',
        title: 'What Healthcare-Specialized Agencies Get Wrong',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'callout', text: "If you've paid a 'clinic-specialized' agency four or five figures a month and your chairs are still half-empty — I need to tell you what they're not telling you." },
            { angle: 'contrarian', text: "There's an agency in the ketamine space that charges $3,000 to $5,000 a month in retainers and delivers templated campaigns. They're not bad. But their model is." },
            { angle: 'question', text: "Why would you pay $5K a month to an agency that gets paid the same whether you get 50 patients or zero?" },
            { angle: 'label', text: "This is for every clinic that's been paying four or five figures a month to a 'specialized' healthcare agency and still has empty chairs." },
        ],
        body: "Here's what I've seen happen with specialized healthcare agencies — and it's a pattern I've seen so many times I can describe it without asking.\n\nThey come in with a slick pitch. They say they specialize in ketamine or mental health. They charge $3,000 to $5,000 a month. They run the same campaign framework for every clinic they serve. Same stock photos. Same headline templates. Same landing page with your logo dropped in.\n\nThe reports look great. Impressions up. CPM down. Click-through rate above benchmark.\n\nAnd then you look at your schedule. Tuesday afternoon. Three empty chairs.\n\nHere's the disconnect: they're measured on activity metrics, not patient outcomes. Their contract says 'leads.' Your bank account needs patients.\n\nThose are different things. And the agency built their business model around the first one.",
        cta: "We don't do retainers. We don't do templates. $99 per qualified inquiry. If we fail, we make $0. Link in bio.",
    },
    {
        id: 'CP-27',
        title: 'Why Performance-Based Agencies Don\'t Exist (And We Do)',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'question', text: "Ketamine clinic owners — you know why almost nobody does performance-based marketing in this space? Because most agencies can't afford to fail. We built our business so we CAN." },
            { angle: 'contrarian', text: "Performance-based marketing is theoretically the best model for every ketamine and TMS clinic. So why doesn't every agency offer it? Because they'd go bankrupt." },
            { angle: 'callout', text: "Ketamine clinic owners — you've been asking agencies 'Can you do pay-per-patient?' and they all say no. Let me explain why — and why we say yes." },
            { angle: 'stat', text: "Less than 1% of agencies serving ketamine and TMS clinics operate on a performance-based model. Here's the reason — and what it means for your clinic." },
        ],
        body: "Here's a question I get constantly: 'If performance-based is so great, why doesn't every agency do it?'\n\nBecause the retainer model is profitable without performing. Sign a client. Collect $5,000. Deliver whatever. If they churn in 90 days, you've already pocketed $15,000 and can sign the next one.\n\nThe retainer model incentivizes acquiring clients, not growing them. Performance-based flips that. We invest first — creative, systems, ISA infrastructure, ad management — and we make nothing until patients show up.\n\nWhich means we have to be extremely good. And extremely selective.\n\nMost agencies won't operate this way because they're not confident enough in their own results to bet their revenue on them.\n\nWe built our systems specifically for this vertical — ketamine, TMS, Spravato, nothing else — which is why we can make that bet. We know what we're doing. We've done it enough times to stake our income on it.",
        cta: "Ready to work with an agency that can't afford to fail? $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-28',
        title: 'The Transparency Test',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'command', text: "Ketamine and TMS clinic owners — log into your ad account right now. Can't? Fire your agency today." },
            { angle: 'question', text: "Does your ketamine clinic even have access to its own ad account? If not — you've been had." },
            { angle: 'callout', text: "Your agency owns your ketamine clinic's ad account, pixel data, and creative. That's a hostage situation." },
            { angle: 'contrarian', text: "The biggest red flag in ketamine clinic marketing? When your agency won't let you see your own results." },
        ],
        body: "Run this test right now.\n\nOne: do you personally have admin access to your ad account? Not view-only. Admin. Can you log in independently of your agency?\n\nIf no — red flag.\n\nTwo: when your agency leaves, does your pixel data go with them? Have you ever seen the actual audience data they've been building?\n\nIf you can't answer that — red flag.\n\nThree: can you see exactly how much was spent, on what creative, targeting what audience, generating how many leads and bookings? Not a summary PDF. The actual account.\n\nIf no — major red flag.\n\nTransparency isn't a feature your agency is offering you as a bonus. It's the minimum standard of accountability. If they won't give you full access, the reason is simple: the numbers don't reflect what they've been telling you.",
        cta: "Full transparency. Full access. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-29',
        title: 'The "I\'ve Been Burned" Objection',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'label', text: "This one's for every ketamine or TMS clinic owner who says 'I've been burned by agencies before.' I hear you. And here's why you're right AND wrong." },
            { angle: 'question', text: "Ketamine clinic owners — how many agencies have you fired? And more importantly — do you know why ALL of them failed?" },
            { angle: 'callout', text: "Ketamine clinic owners — you weren't burned by bad agencies. You were burned by a bad MODEL. There's a huge difference." },
            { angle: 'story', text: "A ketamine clinic owner told me 'I'll never hire another agency.' I said: 'Good. Don't hire an agency. Hire a partner who only eats when you eat.'" },
        ],
        body: "'I've been burned before.' I hear this on almost every first call.\n\nAnd every time, I say the same thing: you weren't burned by a bad agency. You were burned by a bad model.\n\nThe people running your previous campaigns were probably decent marketers. They had the skills. They just had no incentive to use them at full capacity — because the check came in regardless.\n\n$5,000 a month whether you got two patients or forty. Same check. Different urgency.\n\nWhen the incentive structure doesn't punish failure, failure becomes tolerable. Just enough results to justify the retainer. Never enough to actually change the trajectory of your business.\n\nThe fix isn't finding a better agency. The fix is finding a model where your partner goes hungry when you go hungry.\n\nThat changes every single decision they make.",
        cta: "We starve if you don't grow. $99 per qualified inquiry. Zero retainer. Link in bio.",
    },
    {
        id: 'CP-30',
        title: 'The ROI Calculator',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'command', text: "Ketamine clinic owners — grab your calculator. I'm going to show you the exact math on what our performance model looks like for your clinic." },
            { angle: 'stat', text: "One ketamine patient = $15K to $25K over their treatment journey. Your cost to acquire them with our model? Under $300. That's a 50x to 80x ROI." },
            { angle: 'question', text: "Ketamine clinic owners — what if every $300 you spent on marketing came back as $15,000 in patient revenue? Here's the exact math." },
            { angle: 'callout', text: "Your ketamine clinic's current agency can't show you this math because the math would embarrass them. Here's ours." },
        ],
        body: "Let me walk you through the numbers.\n\nA ketamine patient does an initial series of six infusions at $400 to $600 each. That's $2,400 to $3,600 for the series. Then boosters every four to eight weeks. Over the first year — $8,000 to $15,000 per patient. Some go to $25,000 over two years.\n\nWith us, you pay $99 per qualified inquiry. Total acquisition cost: $298 per patient actually in your chair.\n\nEven if 60% complete the full series: $298 in. $8,000 to $15,000 out. That's a 25x to 50x return.\n\nNow compare that to the retainer math: $5,000 a month, maybe three patients. That's $1,667 per patient — and they still might not show up.\n\nSame outcome. Completely different cost. The math doesn't break because marketing doesn't work for ketamine. The math breaks because the pricing model was never designed around results.",
        cta: "The math speaks for itself. $99 per qualified inquiry. Link in bio to run the numbers for your clinic.",
    },
    {
        id: 'CP-31',
        title: 'Month-to-Month Means We Have to Earn It',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.BELIEF_BRIDGE,
        outfit: 'A',
        duration: '65s',
        hooks: [
            { angle: 'contrarian', text: "No contracts for your ketamine or TMS clinic. Not 6-month. Not 3-month. That's not a risk — it's how we stay sharp." },
            { angle: 'question', text: "Why does your ketamine clinic's agency need a 6-month contract? Because they know you'd leave in month 2." },
            { angle: 'callout', text: "Ketamine and TMS clinic owners — if your agency needs a contract to keep you, their results definitely won't." },
            { angle: 'command', text: "Before you sign any agency contract for your ketamine or TMS clinic — ask: 'Can I leave month one?' If they hesitate, run." },
        ],
        body: "Here's what happens the minute you sign a six-month retainer contract.\n\nThe pressure to perform drops. Not because the agency is dishonest — because the incentive is gone. They have your money. The urgency that was there during the sales call evaporates after the agreement is signed.\n\nWe don't do contracts. Month to month. Which means every single month, we have to re-earn your business.\n\nIf we deliver, you stay because results make the decision obvious. If we don't deliver, you leave. No penalty. No breakup call with a billing department. No 90-day termination clause.\n\nMonth-to-month creates a pressure that contracts eliminate. It's uncomfortable for us — which is exactly why it works so well for you.\n\nYou're never locked into paying for something that stopped working.",
        cta: "Month to month. Performance-based. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-32',
        title: 'We\'re NOT a Good Fit For Everyone',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'contrarian', text: "Ketamine and TMS clinic owners — I'm going to tell you why your clinic might NOT be a good fit for us. Yeah — we might say no to YOU." },
            { angle: 'callout', text: "We turn away 70% of ketamine and TMS clinics that apply. Not because they're bad clinics — because performance-based marketing doesn't work for everyone." },
            { angle: 'question', text: "What kind of ketamine or TMS clinic do we say NO to? One that can't answer a lead in under 5 minutes. One that has no ad budget. One that doesn't want to grow." },
            { angle: 'label', text: "This is specifically for ketamine and TMS clinic owners already generating consistent patient revenue — who want a marketing partner whose downside is structurally tied to theirs." },
        ],
        body: "We say no to a lot of clinics. Not because they're bad clinics. Because our model means their failure is our failure — and we can't take that risk with every applicant.\n\nHere's what we need: a clinic that's generating some revenue and has the infrastructure to handle growth. A team that can respond to leads in under five minutes. Treatment capacity to absorb 30+ new patients a month. And an ad budget of at least $3,000.\n\nIf those four things aren't in place, we can drive every qualified patient in your city to your door and watch them bounce. Nobody answers fast enough. Intake is broken. No available slots.\n\nWe make $0 and the patient doesn't get help. Lose-lose.\n\nSo before we say yes, we need to know you can hold up your end. That's not arrogance. That's us doing our job.",
        cta: "Think you qualify? Link in bio. 4 questions. Takes 60 seconds. And we'll be honest with you about whether it's a fit.",
    },
    {
        id: 'CP-33',
        title: 'Founder Story: Why Ketamine Clinics',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '90s',
        hooks: [
            { angle: 'story', text: "In 2022, someone I love tried to take their own life. And that's why I started this company." },
            { angle: 'question', text: "What would you do if someone you love was suffering and traditional medicine had nothing left to offer?" },
            { angle: 'contrarian', text: "I didn't start a healthcare marketing company because I love marketing. I started it because I watched the mental health system fail someone I love." },
            { angle: 'callout', text: "Most marketing agencies are built to make money. We were built because someone almost died. Let me tell you the story." },
        ],
        body: "Someone close to me spent years cycling through SSRIs. Lexapro. Zoloft. Prozac. Wellbutrin. Each one either not working or making things worse.\n\nThey hit rock bottom. And when I found ketamine therapy as an option, I was ready to be shocked by the science.\n\nI was shocked by something else: nobody knew it existed.\n\nThe clinics were there. The treatments were working. The outcomes data was extraordinary. And the marketing was a stock photo and a 'Book Now' button.\n\nGeneral agencies were treating these providers like dentists. No one understood the compliance requirements. No one understood the patient psychology. No one was building systems that actually connected suffering people with the clinics that could help them.\n\nSo I shut down what I was doing and built this.\n\nA company that only works with ketamine, TMS, and Spravato clinics. That understands the sensitivity and the compliance. And that only gets paid when a patient actually walks through the door.",
        cta: "That's why Livformor exists. Not to sell marketing. To make sure patients find the help that's waiting for them. Link in bio.",
    },
    {
        id: 'CP-34',
        title: 'Why These Clinics Specifically',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '75s',
        hooks: [
            { angle: 'question', text: "Why would a marketing company ONLY work with ketamine, TMS, and Spravato clinics? Isn't that limiting?" },
            { angle: 'contrarian', text: "Everyone told me specializing in just three treatment types was business suicide. It turned out to be our biggest advantage." },
            { angle: 'callout', text: "Generalist agencies serve 50 industries. We serve one. And that's exactly why we outperform all of them." },
            { angle: 'story', text: "I turned down a $15K/month client last month because they were a med spa. Here's why." },
        ],
        body: "We only work with ketamine, TMS, and Spravato clinics. Not dentists. Not med spas. Not weight loss centers. Three treatment categories. That's it.\n\nHere's why that matters.\n\nThe ad compliance in this space is completely different from any other healthcare vertical. The patient psychology is different — these aren't impulse purchases, these are scared people making terrifying decisions after years of failed treatments.\n\nThe sales cycle requires empathy first, information second, and a complete absence of pressure. The follow-up has to feel clinical, not commercial.\n\nA generalist agency doesn't know any of that. They'll run your ketamine clinic the same way they run a yoga studio. Same urgency tactics. Same scarcity copy. Same 'Book Now' CTA.\n\nAnd then they'll blame your market when the account gets flagged or the leads don't convert.\n\nWe know this space because it's the only space we've ever worked in. That depth is not replicable.",
        cta: "One vertical. One mission. Maximum depth. Link in bio to see if your clinic qualifies.",
    },
    {
        id: 'CP-35',
        title: 'The CARE Framework Reveal',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.CARE,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'callout', text: "Most healthcare marketing feels like a used car ad. Let me show you the framework we created to fix that." },
            { angle: 'command', text: "If your ads say 'Book now! Limited slots!' for a treatment that helps suicidal patients — something is deeply wrong. Here's the right way." },
            { angle: 'question', text: "How do you market to someone who's suffering from treatment-resistant depression without being manipulative? We built a framework for that." },
            { angle: 'contrarian', text: "Urgency tactics. Scarcity messaging. Countdown timers. Great for shoes. Terrible for mental health. Here's what works instead." },
        ],
        body: "We built the CARE framework because the marketing playbooks designed for e-commerce don't work for mental health — and shouldn't.\n\nC: Compassion. Every piece of content starts from understanding, not selling. 'You've been suffering long enough' converts better than 'Book Now' for this audience. Always.\n\nA: Awareness. These patients often don't know ketamine or TMS exist as options. We educate before we ask anything. We explain how it works before we ask them to book.\n\nR: Reassurance. 'Is it safe? Will it work for me? What does it actually feel like?' These questions exist in every patient's head before they take a single step. We answer them in the content before we ask for anything in return.\n\nE: Ethics. We don't use fear tactics. We don't create artificial urgency. We don't exploit desperation.\n\nThis framework converts higher than aggressive tactics because it builds trust. And in mental health, trust isn't a nice-to-have — it's the entire conversion mechanism.",
        cta: "CARE-based marketing that converts. Performance-based. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-36',
        title: 'The Diagnostic Call',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "Ketamine and TMS clinic owners — before we take a single dollar, we do something no other agency does: we diagnose your patient acquisition system for free." },
            { angle: 'question', text: "Ketamine clinic owners — what if you could find out EXACTLY why your marketing isn't working — for free — in 25 minutes?" },
            { angle: 'command', text: "If your ketamine or TMS clinic has empty chairs — stop guessing why. Let me diagnose it. Free. 25 minutes." },
            { angle: 'contrarian', text: "Every agency tries to SELL ketamine clinics on the first call. We DIAGNOSE yours. Because we need to know if we can actually help before we take you on." },
        ],
        body: "When we get on a call, we don't pitch. We diagnose.\n\nWe look at your current ad performance, if you have any. Your intake process — how leads are handled, how fast, by whom. Your conversion rates. Your retention. Your speed-to-lead.\n\nWe identify exactly where patients are falling out of the funnel. And then we tell you what's actually broken.\n\nEven if the honest answer is: 'You don't need us. You need to fix your intake before you spend another dollar on ads.'\n\nWe say that. Because the alternative is taking you on, running ads into a broken system, generating zero patients, and making zero revenue.\n\nWe're selfishly honest. We only take on clients we know we can grow. And a diagnostic is how we figure out which ones those are.",
        cta: "Get your free diagnostic. Link in bio. 4 qualifying questions. If you're a fit, we'll schedule a 25-minute deep dive into your patient acquisition system.",
    },
    {
        id: 'CP-37',
        title: 'The Volume Agency Problem',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'callout', text: "There's a type of agency dominating the ketamine clinic marketing space right now — and the ketamine clinics they serve are unknowingly competing against each other for the same patients." },
            { angle: 'question', text: "What happens when a healthcare marketing agency treats your ketamine clinic like a franchise? Templated content. Shared patient audiences. Zero differentiation." },
            { angle: 'contrarian', text: "Some agencies claim to 'specialize' in ketamine clinics. What they actually specialize in is copy-pasting the same campaign across 50 of them." },
            { angle: 'label', text: "If the agency running your ketamine clinic's ads also serves other clinics in your metro area — congratulations, you're competing against your own marketing partner." },
        ],
        body: "There are agencies in this space serving 40, 50, sometimes 100 ketamine and TMS clinics.\n\nAnd they run essentially the same campaign for every one of them. Same creative angles. Same landing page structure. Same email templates. Your city name swapped into the headline.\n\nIf any of those clinics are in your metro area — you're funding a marketing partner who's running duplicate campaigns against you in the same patient pool.\n\nThe audience overlap drives up your ad costs. The identical messaging means neither clinic stands out. And you're both saying the exact same thing to the exact same people.\n\nSpecialization shouldn't mean 'we specialize in running template campaigns for this specific vertical.' Specialization means custom systems, custom creative, one client per market, and results that couldn't be replicated by swapping in a different logo.",
        cta: "We cap at 6 clients. No market overlap. No templates. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-38',
        title: 'Pay-Per-Lead Is Not Performance Marketing',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "Some agencies serving ketamine clinics charge per LEAD and call it 'performance-based.' That's not performance. That's a semantic trick." },
            { angle: 'question', text: "Ketamine clinic owners — what's the difference between paying per lead and paying per patient? About $14,000 in wasted spend." },
            { angle: 'contrarian', text: "For ketamine and TMS clinics: pay-per-lead is NOT pay-per-performance. And the agencies charging per lead are counting on you not knowing the difference." },
            { angle: 'command', text: "If any agency pitching your ketamine clinic says they do 'performance marketing' — ask one question: 'What exactly do I pay for?' If the answer is 'leads,' run." },
        ],
        body: "Some agencies in this space charge per lead. $50 a lead. $100 a lead. And they call it performance-based.\n\nIt's not.\n\nA lead is someone who filled out a form on your landing page. That's all it is. They might not answer the phone. They might not be the patient — it might be a bored teenager who clicked an ad. They might have filled it out by accident.\n\nWhen your agency gets paid per lead, they have one job: generate form submissions. Quality is irrelevant. Volume is the metric.\n\nSo they dump low-intent traffic at your landing page and hand you a spreadsheet of phone numbers that go straight to voicemail.\n\nYou're left chasing ghost leads while they cash the check.\n\nReal performance-based means paying when a qualified patient physically shows up to your clinic. Not when a stranger fills out a form. That distinction is the difference between a full schedule and an expensive CRM.",
        cta: "We charge $99 per qualified inquiry — not per lead, not per click, not per impression. Per real, pre-screened cash-pay prospect who meets the standard you define. Link in bio.",
    },

    // ── URGENCY / FOUNDER MISSION / FINAL (39–50) ──
    {
        id: 'CP-39',
        title: 'The Generalist Trap',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "The agency running your ketamine clinic's ads also does restaurants, gyms, and e-commerce stores. And that's exactly why they don't understand your business." },
            { angle: 'contrarian', text: "Generalist agencies will tell your ketamine clinic that healthcare marketing is just like any other marketing. It's not. And that lie is costing you patients." },
            { angle: 'question', text: "Ketamine clinic owners — would you trust a doctor who also does plumbing? Then why trust a marketing agency that also does restaurants?" },
            { angle: 'label', text: "If the agency serving your ketamine clinic has more than 3 industries on their website — they're a generalist pretending to be a specialist." },
        ],
        body: "A generalist agency treats your ketamine clinic the same way they treat a pizza chain. Same playbook. Same copy frameworks. Same bidding strategy.\n\nThe problem: healthcare marketing is completely different from every other vertical.\n\nYou cannot use before-and-after images. You cannot make guaranteed recovery claims. You cannot target by medical condition since Meta removed that in 2022. The patient is not an impulse buyer — they're a scared human making a life-altering decision after years of failed attempts.\n\nA generalist doesn't know any of this. They'll submit ads that get your account flagged. They'll write copy that violates healthcare compliance. They'll target audiences that haven't been valid since 2021.\n\nAnd when nothing works, they'll tell you the market is tough.\n\nThe market isn't tough. The playbook was wrong.",
        cta: "We only do ketamine, TMS, and Spravato. Nothing else. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-40',
        title: 'The First-Mover Window',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.PAS,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "In 2024, digital ad costs for ketamine and TMS clinics went up 32%. In 2025, they'll go higher. Every month your clinic waits, it costs more." },
            { angle: 'command', text: "Ketamine clinic owners — the window for affordable patient acquisition in this space is closing. Not next year. Not next quarter. Right now." },
            { angle: 'callout', text: "While your ketamine clinic is 'thinking about it,' your competitor just signed up. And they're about to own your market." },
            { angle: 'question', text: "What does it cost to be the SECOND ketamine clinic in your market with a patient acquisition system? About 3x what the first clinic paid." },
        ],
        body: "Every healthcare marketing vertical follows the same trajectory. I've watched it happen.\n\nEarly movers get cheap patients. Low CPMs. Thin competition. Wide open market share. They build systems while the market is forgiving.\n\nThen more clinics catch on. Everyone starts running ads. CPM goes up. Cost per lead goes up. Cost per patient doubles, then triples.\n\nThe clinics that waited are now paying exponentially more for the same patient the early movers acquired for $200.\n\nThe ketamine and TMS space is mid-transition right now. Not the frontier stage — that was 2020 to 2022. But not saturated yet either.\n\nEvery month you delay, the cost goes up. The clinics that move now will own their markets for the next five years at a fraction of what it'll cost a year from now.\n\nThis isn't manufactured urgency. It's the documented pattern of every healthcare vertical that's gone through this cycle before.",
        cta: "Move now. $99 per qualified inquiry. No retainer. Link in bio.",
    },
    {
        id: 'CP-41',
        title: 'What We Need From You',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.MOST,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '65s',
        hooks: [
            { angle: 'callout', text: "Ketamine and TMS clinic owners — I'm going to be brutally honest about what we need from you as a clinic partner. Not everyone can handle it." },
            { angle: 'command', text: "Ketamine clinic owners — before you apply, here are the 4 things we require. If you can't deliver these, don't waste our time or yours." },
            { angle: 'question', text: "Ketamine or TMS clinic owners wanting performance-based marketing — here's what we need from your clinic in return." },
            { angle: 'contrarian', text: "Most agencies take any ketamine clinic with a credit card. We have requirements. Here's why." },
        ],
        body: "Here's what we need from you.\n\nFirst: a minimum $3,000 monthly ad budget. We manage and optimize every dollar, but we need enough volume for the algorithm to learn and perform. Below that threshold, it takes longer and results are inconsistent.\n\nSecond: lead response in under five minutes. This is non-negotiable. The MIT study I keep citing exists for a reason. When we send you a qualified lead, your team picks up the phone within minutes. Not at end of business. Minutes.\n\nThird: capacity for at least 30 new patients a month. If we fill your schedule faster than your clinical team can absorb, that's a bad patient experience and a short partnership.\n\nFourth: 90 days of commitment. Not a contract — it's month-to-month. But the system takes 30 days to build and 60 to hit real velocity. If you're looking for overnight miracles, I can't help you.\n\nThese aren't arbitrary requirements. They're the conditions that make our model work — which means they're the conditions that make your results work.",
        cta: "Can you meet these 4 requirements? Link in bio to apply.",
    },
    {
        id: 'CP-42',
        title: 'The Compound Effect',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "Ketamine clinic — Month 1 with us: 15 patients. Month 3: 35 patients. Month 6: 60+ patients. And your cost per patient goes DOWN every month. Here's why." },
            { angle: 'contrarian', text: "Most agencies serving ketamine clinics deliver the same results in month 6 as month 1. Our model does the opposite — it compounds." },
            { angle: 'question', text: "Ketamine clinic owners — what if your marketing got BETTER every month instead of staying flat? What if month 6 was 4x month 1?" },
            { angle: 'callout', text: "The agencies your ketamine clinic has fired all had the same problem — flat results. Here's why our system compounds instead." },
        ],
        body: "Most agencies deliver the same results in month six as they did in month one. Same patient volume. Same cost per acquisition. Flat line.\n\nOur system compounds.\n\nMonth one: we launch, build the system, gather data. You get 10 to 15 patients. Real, but not the ceiling.\n\nMonth two: we optimize on actual data — which hooks converted, which creative angles found the right audience, which ISA scripts retained leads through the booking step. 20 to 25 patients.\n\nMonth three: the pixel is trained. The algorithm knows your ideal patient profile. ISA team is dialed in. 30+ patients.\n\nMonth six: the SEO articles we wrote are ranking organically. The retargeting pools are large. The organic content is generating inbound inquiries. 50 to 60+ patients — and cost per patient has dropped because every piece of the system is more efficient than it was on day one.\n\nClients don't stay past month six because of a contract. They stay because walking away means dismantling a machine that's improving every month.",
        cta: "Start building the compounding system. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-43',
        title: 'The ISA Advantage',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'question', text: "Ketamine clinic owners — what's an ISA and why is it the most important part of your patient acquisition system that you've never heard of?" },
            { angle: 'callout', text: "Your ketamine clinic is paying for leads but your front desk can't convert them. Here's the missing piece that doubles your show rate." },
            { angle: 'stat', text: "Ketamine and TMS clinics with trained ISAs convert 3x more leads into patients than clinics relying on front desk staff. Here's why." },
            { angle: 'contrarian', text: "Your ketamine clinic's front desk receptionist is NOT a salesperson. Asking them to convert patient leads is like asking your nurse to do your taxes." },
        ],
        body: "ISA — Inside Sales Agent. In most industries, that means a sales rep. In healthcare, it means something different: a dedicated patient conversion specialist who understands the emotional territory they're working in.\n\nHere's the problem with relying on your front desk to handle patient leads.\n\nYour front desk is managing check-ins. Insurance verification. Pharmacy calls. Scheduling conflicts. Incoming faxes. Referral paperwork. Incoming leads are item number twelve on a fourteen-item list.\n\nBut for the patient who filled out that form — it was the most courageous thing they'd done in months. And when nobody calls back for three hours, that courage runs out.\n\nAn ISA's only job is converting qualified leads into booked, confirmed appointments. They respond in under five minutes. They're trained on the clinical language and the specific objections — 'Is it safe?' 'My spouse thinks I should try medication again.' 'What if it doesn't work?'\n\nThis role is the highest-ROI position in your clinic. And almost nobody has one.",
        cta: "We help you build your ISA system. Part of our full-stack service. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-44',
        title: 'The Dubai Commitment',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '70s',
        hooks: [
            { angle: 'story', text: "I flew to Dubai to film 100 scripts — all for ketamine and TMS clinics. Not a vacation. A mission." },
            { angle: 'question', text: "What kind of company films 100 videos in Dubai — all for your clinic's patients? The all-in kind." },
            { angle: 'callout', text: "While your agency posts stock photos, we filmed 100 pieces of original clinic content in Dubai." },
            { angle: 'contrarian', text: "Your agency outsources to freelancers. We flew to Dubai to film 100 scripts for ketamine clinics." },
        ],
        body: "I'm filming this in Dubai. A hundred scripts in two weeks. Professional production. All of it written specifically for the ketamine, TMS, and Spravato space.\n\nMost agencies send you a stock photo and a Canva template. They call it creative.\n\nWe invested six figures in original content because every hook, every angle, every script has to speak the exact language that a treatment-resistant patient uses when they're searching at 2 AM.\n\nThat language isn't generic. It isn't transferable from another industry. It took months of working in this space to understand it well enough to write it.\n\nThe Dubai commitment exists because I believe in this mission enough to stake real money on it. This isn't a side project. It's a company built specifically to close the gap between patients who are suffering and clinics that can help them.",
        cta: "See the commitment firsthand. Link in bio.",
    },
    {
        id: 'CP-45',
        title: 'Why I Left Traditional Marketing',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '80s',
        hooks: [
            { angle: 'story', text: "I ran a retainer agency. $10K/month clients. I shut it all down to serve ketamine clinics. Here's why." },
            { angle: 'question', text: "What makes someone leave guaranteed revenue to build performance-based marketing for clinics? Pain." },
            { angle: 'contrarian', text: "I gave up guaranteed retainer income to build a model where your clinic's results decide my paycheck." },
            { angle: 'callout', text: "I went from $50K/month in retainers to a ketamine clinic model where I could make $0. My accountant was horrified." },
        ],
        body: "I had a comfortable agency before this. Retainer clients across multiple industries. Restaurants, real estate, e-commerce. Good revenue. Fine work.\n\nBut here's the thing I couldn't shake: I was optimizing for not getting fired. Not for transforming businesses. Just good enough every month that the check kept coming.\n\nI knew that the retainer model structurally requires that. The agency's survival depends on client retention, not client results. So the minimum viable performance becomes the default performance.\n\nI shut it all down. Walked away from the retainer income. Built a model where I literally cannot make money unless my clients are getting patients in their chairs.\n\nMy accountant thought I'd lost my mind. He might have been right. But the alternative was spending another decade running an agency whose model fundamentally worked against its own clients.\n\nI'd rather build something I can be honest about.",
        cta: "Work with someone who bet everything on your results. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-46',
        title: 'The 3-Minute Qualification',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.MOST,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '60s',
        hooks: [
            { angle: 'command', text: "Ketamine and TMS clinic owners — I can tell you in 3 minutes whether your clinic is a fit for performance-based marketing. Let me ask you 4 questions." },
            { angle: 'question', text: "Ketamine or TMS clinic owners — want to know if your clinic qualifies for pay-per-patient marketing? Answer these 4 questions." },
            { angle: 'callout', text: "Not every ketamine or TMS clinic qualifies for what we do. Here are the 4 questions that determine if yours does." },
            { angle: 'conditional', text: "If you run a ketamine or TMS clinic and you answer YES to all 4 of these questions — you're exactly what we're looking for." },
        ],
        body: "Four questions. Ninety seconds.\n\nOne: are you a cash-pay ketamine, TMS, or Spravato clinic?\n\nTwo: can your clinic handle at least 30 new patients a month? We need capacity headroom or we're filling a schedule there's no room for.\n\nThree: can your team respond to a new lead in under five minutes? Not eventually. Not by end of day. Under five minutes.\n\nFour: do you have at least $3,000 a month available for ad spend? We manage every dollar — we just need enough fuel for the algorithm to perform.\n\nIf the answer is yes to all four, you're exactly what we're looking for.\n\nIf the answer is no to any of them — the conversation we'd have would be about what needs to be built before the ads make sense.",
        cta: "Tap the link in bio. 4 questions. 60 seconds. And we'll tell you honestly whether it's a fit.",
    },
    {
        id: 'CP-47',
        title: 'Zero Risk Guarantee',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.MOST,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '65s',
        hooks: [
            { angle: 'callout', text: "Ketamine and TMS clinic owners — here's my guarantee: if we don't generate a single patient for your clinic in 30 days, you owe us literally nothing. Zero." },
            { angle: 'question', text: "Ketamine clinic owners — what if your marketing partner gave you a guarantee that was actually worth something? Not 'we'll try harder.' But 'you pay us nothing.'" },
            { angle: 'command', text: "Ask the agency running your ketamine clinic's ads for this guarantee: 'If you don't deliver patients in 30 days, I pay nothing.' Watch them squirm." },
            { angle: 'contrarian', text: "Every agency serving ketamine clinics guarantees results. Ours is the only one where our revenue is literally zero if we fail." },
        ],
        body: "When I say zero risk, I mean it structurally — not as a marketing promise.\n\nWe don't charge retainers. We don't have a base fee. We charge $99 per qualified inquiry — a real, pre-screened, cash-pay prospect, defined with you before we launch a single ad.\n\nIf we generate zero bookings and zero shows — we make $0. There is literally no mechanism for us to charge you if we fail. No retainer to fall back on. No contract clause that says 'we delivered impressions.' No invoice for 'creative development.'\n\nEither patients sit in your chair, or we don't eat that month.\n\nEvery other agency can say 'we guarantee results.' We're the only ones where the fee structure makes that a structural reality instead of a sales line.",
        cta: "Zero risk. Zero retainer. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-48',
        title: 'Why Mental Health Marketing Matters',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '85s',
        hooks: [
            { angle: 'stat', text: "47 million Americans suffer from mental illness. 60% received NO treatment last year. Not because treatment doesn't exist — because they can't find it." },
            { angle: 'story', text: "16 million Americans live with treatment-resistant depression. SSRIs didn't work. Therapy didn't work. And they've given up. But the treatment that WOULD work is sitting half-empty 15 minutes from their house." },
            { angle: 'question', text: "What happens when life-saving treatments exist but the people who need them can't find them? Preventable suffering. That's what happens." },
            { angle: 'callout', text: "There are clinics right now with open chairs and treatments that work — and patients 10 miles away who are suffering because they don't know those clinics exist." },
        ],
        body: "The treatments exist. They work.\n\nKetamine has a 50 to 70% response rate for treatment-resistant depression — a condition that's defeated years of medication trials and therapy for millions of people. TMS is FDA-approved and covered by most major insurance plans. Spravato can cost a patient as little as $10 per session through manufacturer savings programs.\n\nAnd still — millions of people are suffering from conditions these treatments could address, with no idea that any of this exists.\n\nNot because the science is new. Because the clinics are invisible.\n\nGeneric marketing. Nonexistent digital presence. Or worse — a generalist agency running the same healthcare template that doesn't convert and occasionally gets the account flagged.\n\nRight now, there's a patient 15 minutes from your clinic who has tried four antidepressants, spent months in therapy, and is losing hope. They would come in tomorrow if they knew you existed.\n\nClosing that gap is the whole point.",
        cta: "That's Livformor's mission. Connect patients with the help that's already there. Link in bio.",
    },
    {
        id: 'CP-49',
        title: 'The Mission Behind the Model',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '75s',
        hooks: [
            { angle: 'contrarian', text: "We market for ketamine clinics with a nonprofit's heart. And I'm not embarrassed to say that." },
            { angle: 'story', text: "My advisor said 'Pick: make money or help patients.' I said 'Watch me do both for your clinic.'" },
            { angle: 'question', text: "Can a marketing company actually care about your patients? Here's the structural proof we do." },
            { angle: 'callout', text: "Every clinic agency says they 'care about patients.' Here's why our model structurally forces us to." },
        ],
        body: "Our performance model isn't just good business strategy. It's structurally aligned with the mission.\n\nWhen we only get paid for patients who show up — our incentive is identical to yours: get people who are suffering into a chair where they can actually get help.\n\nEvery patient we generate isn't a 'conversion metric.' It's a person who was in pain, worked up the courage to reach out, and made it through the door.\n\nWhen we optimize our ads, we're not optimizing for click-through rate. We're optimizing for humans finding the thing that might actually help them.\n\nWhen we train ISAs, we're not training salespeople. We're training the first compassionate voice a suffering person hears after years of failed treatments.\n\nThe model creates profit and purpose simultaneously. That's the only kind of business I was willing to build.",
        cta: "Join a mission-driven marketing partner. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'CP-50',
        title: 'Final Ask: Are You Ready?',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.MOST,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '60s',
        hooks: [
            { angle: 'command', text: "Alright — you've watched enough of my videos. You know the model. You know the mission. Time to decide." },
            { angle: 'question', text: "How much patient acquisition upside are you comfortable leaving on the table before you change the economic model powering it?" },
            { angle: 'callout', text: "You've been thinking about this. Something kept bringing you back to these videos. Let's stop analyzing the model and start running it." },
            { angle: 'conditional', text: "If you're a ketamine, TMS, or Spravato clinic that's ready to run scalable, performance-based acquisition — this is the step." },
        ],
        body: "Here's what the offer actually is.\n\nPerformance-based patient acquisition. $99 per qualified inquiry. Zero retainer. Month to month. Full transparency — you own the ad account, you see every dollar.\n\nIncluded: ten professional video scripts for your organic social. Full website conversion redesign. Twenty local SEO articles targeting your specific market. Speed-to-lead infrastructure. ISA script packages. Monthly optimization calls.\n\nAll of that comes with the performance partnership. Not as an upsell. Not as a separate package.\n\nWhy? Because we need your clinic to convert. A clinic with a broken website and slow lead response converts poorly even with perfect ads. Which means we make less money. The free stack exists because our revenue depends on the entire pipeline working, not just the ad click.\n\nWe take six clinics. Six. If you're a fit, the next step is 60 seconds.",
        cta: "Tap the link in bio. 4 qualifying questions. 60 seconds. Let's make the math work.",
    },

    // ── CASH-PAY OFFER: EXOMIND TMS + KETAMINE (51–55) ──────────────────
    {
        id: 'CP-51',
        title: 'The ExoMind + Ketamine Offer — What You Actually Get',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.MOST,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'callout', text: "If you run a cash-pay ketamine or ExoMind TMS clinic — here's the exact offer. No fluff. No 'schedule a call to find out.' Right here." },
            { angle: 'command', text: "Cash-pay ketamine and TMS clinic owners — stop asking what we do and let me show you the offer in 60 seconds flat." },
            { angle: 'question', text: "Ketamine and ExoMind TMS clinic owners — want to know exactly what you're paying for before you ever get on a call with us?" },
            { angle: 'conditional', text: "If you run a cash-pay ketamine or ExoMind TMS clinic and you're tired of vague agency proposals — here's exactly what our offer looks like." },
        ],
        body: "Here's the offer. Performance-based patient acquisition for cash-pay ketamine and ExoMind TMS clinics. You pay $99 per qualified inquiry. That's it. No retainer. No setup fee. No 6-month contract. Included in that: we build your ad campaigns using ExoMind and ketamine-specific creative that passes Meta compliance. We install speed-to-lead systems so no lead goes cold. We write the landing page copy. We provide the intake scripts. We train your team on lead conversion. And we only cap 6 clinics per market so you're never competing against a clinic we also serve. The math is simple. One ketamine patient series is worth $4,000 to $6,000. One TMS course is worth $6,000 to $15,000. You pay $99 per qualified inquiry to put them in your pipeline. The rest is profit.",
        cta: "Tap the link in bio. 4 questions. Find out if your clinic qualifies for the remaining open spots.",
    },
    {
        id: 'CP-52',
        title: 'ExoMind TMS Offer — The Cash-Pay Goldmine Nobody\'s Talking About',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'stat', text: "ExoMind TMS — FDA-cleared, cash-pay, $6,000 to $15,000 per patient course. And most ExoMind practices have no patient acquisition system. That's the $500K opportunity sitting in your clinic right now." },
            { angle: 'question', text: "ExoMind TMS clinic owners — your device is paid off or leased. The treatment slots are open. What's missing is a system that fills those chairs every single week." },
            { angle: 'callout', text: "ExoMind TMS practices — you have a $6,000 to $15,000 per-patient cash-pay treatment and your marketing looks like a dentist's Facebook page. Let's fix that." },
            { angle: 'contrarian', text: "Every ExoMind TMS clinic I talk to says the same thing: 'We have the device. We have the expertise. We just can't figure out how to get patients consistently.' Here's why — and how to fix it." },
        ],
        body: "ExoMind is one of the most powerful cash-pay opportunities in mental health right now. It's FDA-cleared for depression and OCD. No insurance prior auth required. Patients pay out of pocket. A typical course runs $6,000 to $15,000. And the clinical outcomes are exceptional — which means retention and referrals are built into the treatment itself. The problem? Most ExoMind clinics are marketing it the same way you'd market a chiropractic adjustment. Generic Facebook posts. A landing page that reads like a brochure. No specific messaging for the treatment-resistant patient who's already tried SSRIs and is skeptical of everything. That's the patient who is SEARCHING for ExoMind right now. Your job — with our help — is to be findable when they search. Our offer: performance-based patient acquisition specifically built for ExoMind TMS cash-pay practices. You pay $99 per qualified inquiry. We do the rest.",
        cta: "ExoMind clinic owners — link in bio. 4 qualifying questions to see if you're a fit.",
    },
    {
        id: 'CP-53',
        title: 'Ketamine Cash-Pay Offer — The Stack They Get',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "Cash-pay ketamine clinic owners — here's every single thing included in our offer. No drip marketing. No 'find out on the call.' Right now." },
            { angle: 'question', text: "What does a full-stack patient acquisition system for a cash-pay ketamine clinic actually include? Let me break down every piece." },
            { angle: 'command', text: "Ketamine clinic owners — I'm going to tell you exactly what's in the offer before you decide whether to apply. No gating. Here's the full stack." },
            { angle: 'contrarian', text: "Every agency hides their offer behind a 'discovery call.' Here's ours for cash-pay ketamine clinics — completely transparent, right now." },
        ],
        body: "Here's what cash-pay ketamine clinics get when they work with us. Performance-based Meta ads: you pay $99 per qualified inquiry. Zero retainer. Included inside that: five new ad creatives per week A/B tested through Andromeda. A dedicated landing page written specifically for cash-pay ketamine patients — not a generic mental health page. A speed-to-lead SMS and email sequence that reaches new leads in under 5 minutes. An ISA script package so your team knows exactly what to say when a scared patient calls. Monthly reporting on every dollar and every patient — full transparency, full access to your own accounts. Retargeting pools for people who clicked but didn't book. Monthly check-in calls to optimize based on real data. SEO blog content to build organic reach while ads generate immediate volume. One market per clinic — we never serve two ketamine clinics in the same city.",
        cta: "Cash-pay ketamine clinic owners — link in bio. See if one of the 6 open spots is yours.",
    },
    {
        id: 'CP-54',
        title: 'ExoMind + Ketamine Combo Clinic Offer',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'callout', text: "If your clinic offers BOTH ketamine AND ExoMind TMS — you're sitting on two of the most powerful cash-pay revenue streams in mental health. And we have a specific offer for dual-treatment clinics." },
            { angle: 'question', text: "Does your clinic offer ketamine AND ExoMind TMS? If yes — our offer works completely differently for you, and the economics are even better." },
            { angle: 'contrarian', text: "Single-treatment ketamine clinics and ExoMind TMS clinics compete for similar patient pools. Dual-treatment clinics own the entire pool. Here's the math." },
            { angle: 'stat', text: "Dual-treatment clinics offering both cash-pay ketamine and ExoMind TMS see 40-60% higher patient retention — because when one modality doesn't fit, the other does. Here's how we market that." },
        ],
        body: "OBJECTION — 'Two treatments means twice the marketing complexity.' CLAIM — It's actually the opposite. When you offer both ketamine and ExoMind TMS, you capture a wider patient profile with a single ad campaign. The same ad that attracts a ketamine patient can also convert a TMS patient because both start with the same pain: treatment-resistant depression, anxiety, or OCD that conventional medicine hasn't solved. PROOF — Our ads are written to speak to the suffering first, then educate on the treatment options. This means your ads do double duty — attracting both ketamine and ExoMind patients from the same spend. BENEFIT — Lower cost per acquisition per treatment type, higher average revenue per patient because the right treatment can be matched to each person, and better clinical outcomes because you're not forcing every patient into one box.",
        cta: "Dual-treatment clinic owners — link in bio. We have a specific strategy for ketamine + ExoMind practices.",
    },
    {
        id: 'CP-55',
        title: 'The Offer They Wish Was Real Until They See It Is',
        category: SCRIPT_CATEGORIES.CASH_PAY,
        awareness: AWARENESS_LEVELS.MOST,
        framework: FRAMEWORKS.BELIEF_BRIDGE,
        outfit: 'C',
        duration: '80s',
        hooks: [
            { angle: 'story', text: "Every ketamine and TMS clinic owner I talk to says the same thing when I explain our offer: 'That sounds too good to be true.' So let me prove it isn't." },
            { angle: 'question', text: "What would a truly fair deal for a cash-pay ketamine or TMS clinic actually look like? One where you only pay when it works? Here's exactly that." },
            { angle: 'contrarian', text: "The reason ketamine and ExoMind TMS clinic owners don't trust marketing agencies isn't because they're cynical — it's because they've been burned. This is why our offer structure is different." },
            { angle: 'callout', text: "Cash-pay ketamine and ExoMind TMS clinic owners — the objection I hear most is 'How do I know this works?' So let me show you why the structure of the offer itself answers that question." },
        ],
        body: "BEFORE — you've been burned. Multiple agencies. Multiple retainers. Multiple broken promises. And now when you hear 'performance-based marketing,' you think 'Yeah, I've heard that before.' AFTER — you're running a patient acquisition system where your marketing partner gets paid $0 unless patients sit in your chair. No clever contract clauses. No 'we delivered leads and you failed to close them.' Either a qualified patient — someone who understands ketamine therapy or ExoMind TMS, who's been pre-screened for your intake, who's shown up for their appointment — sits in your chair. Or we make nothing. THE BRIDGE — that's not a pitch. That's a structural reality. Our business model cannot generate revenue unless your clinic generates patients. When we make money, you made more. The only question is whether you're a clinic we can actually help — which is why we have a 4-question intake. If it's a fit, the deal is exactly as described.",
        cta: "Cash-pay ketamine and ExoMind TMS clinic owners — see the offer live. Link in bio. 4 questions. 60 seconds.",
    },
];

// ─────────────────────────────────────────────────
// INSURANCE / SPRAVATO / TMS ADS (51–75)
// ─────────────────────────────────────────────────
export const INSURANCE_SCRIPTS = [

    // ── SPRAVATO OPPORTUNITY (1–8) ────────────────
    {
        id: 'INS-01',
        title: 'The Spravato Gold Rush',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'stat', text: "Spravato just became the most profitable insurance-reimbursed treatment in mental health. And most clinics don't even know it." },
            { angle: 'question', text: "What if there was an FDA-approved treatment where the patient pays $10 and you get reimbursed thousands? It already exists." },
            { angle: 'callout', text: "If you're REMS-certified for Spravato and your chairs are empty — you're sitting on a goldmine you haven't figured out how to mine." },
            { angle: 'command', text: "Stop scrolling and listen. Spravato is $8,200 per month per patient. Insurance covers it. The patient pays $10. And you probably have empty chairs." },
        ],
        body: "Let me walk you through the math that should keep you up at night. Spravato is FDA-approved esketamine nasal spray for treatment-resistant depression. List price: $8,200 per month per patient. Insurance covers it. Janssen's savings program brings the patient copay down to as low as $10 per session. The patient pays $10. You get reimbursed thousands. The margins are enormous. But here's the catch — you need REMS certification AND you need patients walking through your door. Most REMS-certified clinics are sitting on this goldmine with empty treatment rooms because they have no patient acquisition system. They're waiting for psychiatrist referrals that trickle in at one or two a month. Meanwhile, there are thousands of patients in their city who qualify and don't know Spravato exists.",
        cta: "We fill Spravato chairs. Performance-based. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-02',
        title: 'SAINT Protocol Medicare Goldmine',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "Starting July 2025, Medicare reimburses the SAINT protocol at $19,700 per patient. Let that number sink in." },
            { angle: 'question', text: "What would your clinic look like if every new TMS patient represented $19,700 in Medicare reimbursement?" },
            { angle: 'callout', text: "The SAINT protocol just got its own Medicare billing code. And the clinics that figure out patient acquisition first will dominate for a decade." },
            { angle: 'command', text: "If you offer TMS and you don't know what the SAINT protocol is — you're about to lose the biggest opportunity in mental health in a decade." },
        ],
        body: "Stanford Accelerated Intelligent Neuromodulation Therapy — SAINT. It's an accelerated TMS protocol that delivers a full course in just 5 days instead of 6 weeks. FDA-cleared. Published in Nature Medicine. And starting July 2025, it gets its OWN Medicare billing code at $19,700 per patient reimbursement. This completely changes the economics of TMS. Instead of 36 sessions over 6 weeks with inconsistent show rates, you do 10 sessions in 5 days. Higher completion rates. Higher patient satisfaction. And now, massive reimbursement. But — you need patients. And the clinics that build acquisition systems NOW will own this market before most clinics even know the billing code exists.",
        cta: "We position TMS clinics for the SAINT protocol wave. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-03',
        title: 'Insurance vs Cash-Pay: Why Not Both?',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'contrarian', text: "Everyone argues about cash-pay vs insurance. The smart clinics stopped arguing and started doing BOTH." },
            { angle: 'question', text: "Why are you choosing between cash-pay ketamine and insurance-covered Spravato when the real money is in offering both?" },
            { angle: 'callout', text: "You're leaving half your revenue on the table by only doing cash-pay OR only doing insurance. Here's the dual model." },
            { angle: 'stat', text: "Clinics running dual revenue models (cash-pay + insurance) see 40-60% higher revenue than single-model clinics." },
        ],
        body: "Here's what the smart clinics figured out. Cash-pay ketamine: $400 to $600 per infusion. No insurance hassles. Immediate revenue. But limited to patients who can pay out of pocket. Insurance-covered Spravato: $10 patient copay. Thousands in reimbursement. Massive patient pool because insurance covers it. But prior auths and paperwork. The answer isn't either-or. It's BOTH. Cash-pay ketamine for patients who want privacy, speed, and flexibility. Spravato for patients who need insurance coverage. Same clinic. Same treatment rooms. Same mission. Two revenue streams that serve different patient populations and insulate you from market shifts. This is the model that's going to define the next generation of successful mental health clinics.",
        cta: "We market both revenue streams. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-04',
        title: 'The Prior Auth Problem',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "Prior authorizations are killing your Spravato revenue. Not because patients don't qualify — because your process is broken." },
            { angle: 'question', text: "How many Spravato patients have you lost because the prior auth took 3 weeks? Let me tell you — more than you think." },
            { angle: 'stat', text: "The average prior auth for Spravato takes 14 days. 30% of patients give up before it's approved. That's a $8,200/month patient who walked." },
            { angle: 'contrarian', text: "Prior authorizations aren't the problem. Your PROCESS for handling them is. Here's the fix." },
        ],
        body: "Here's what happens in most Spravato clinics. Patient inquires. You start the prior auth. It takes 14 days. During those 14 days, the patient's courage fades. They talk themselves out of it. Their spouse says 'Are you sure?' They research horror stories on Reddit. And by the time you get approval, they've gone cold. 30% never come back. That's a patient worth $8,200 a month in reimbursement who evaporated because your system couldn't maintain engagement during the waiting period. You need an automated nurture system that keeps patients warm during the prior auth window — check-in texts, educational content, reassurance calls, next-step clarity. Not just 'We'll call you when it's approved.'",
        cta: "We build the full nurture system. Keep patients engaged from inquiry through first session. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-05',
        title: 'TMS Insurance Marketing',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "TMS has a 58% response rate and a 37% remission rate for treatment-resistant depression. Insurance covers it. And most patients have no idea it exists." },
            { angle: 'question', text: "How do you market a treatment that most patients don't know exists, that insurance covers, and that requires 36 sessions to complete?" },
            { angle: 'callout', text: "You bought a $200K TMS device. Insurance covers the treatment. But your chairs are half empty. The problem isn't clinical — it's marketing." },
            { angle: 'contrarian', text: "TMS has a massive awareness problem. And the clinics that solve it first will own their markets for a decade." },
        ],
        body: "TMS marketing is uniquely challenging for three reasons. ONE — most patients don't know TMS exists. You're not just marketing a clinic — you're introducing an entirely new concept. TWO — it requires 36 sessions over 6 weeks. That's a massive commitment that scares patients. You need content that normalizes the time commitment. THREE — insurance coverage varies wildly. Some plans cover it fully, some require prior auth, some don't cover it at all. Your marketing needs to pre-qualify by insurance BEFORE they commit. These challenges require specialized creative. Education-first content that builds trust. Pre-qualification funnels that filter by insurance. And retention systems that keep patients through all 36 sessions.",
        cta: "TMS-specific marketing that addresses all three challenges. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-06',
        title: 'Spravato: The $10 Message',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.BELIEF_BRIDGE,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "What if the most effective treatment for your depression cost you $10 per session? Not $400. Not $600. Ten dollars." },
            { angle: 'question', text: "How many people suffering from treatment-resistant depression would seek help if they knew it could cost as little as $10?" },
            { angle: 'callout', text: "There's an FDA-approved treatment for treatment-resistant depression where the patient copay can be as low as $10. And barely anyone knows." },
            { angle: 'contrarian', text: "Ketamine costs $400 to $600 per infusion out of pocket. Spravato can cost as little as $10. Same mechanism. Different model. And almost nobody is marketing the $10 option." },
        ],
        body: "BEFORE — a patient hears about ketamine therapy. It sounds incredible. Then they hear the price: $400 to $600 per infusion, six infusions minimum. They can't afford it. They go home. They suffer. AFTER — that same patient learns about Spravato. FDA-approved. Insurance covers it. With the Janssen savings program, their copay can be as low as $10 per session. Suddenly, the life-changing treatment they couldn't afford is accessible. THE BRIDGE — the problem isn't the treatment. It's the MESSAGE. Most clinics don't know how to market the $10 copay without it sounding too good to be true. You need compliant creative that educates, builds trust, and leads with the accessibility message without triggering Meta's ad restrictions.",
        cta: "We craft the Spravato message. Education-first. Compliant. Converting. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-07',
        title: 'Referral Networks Are Not Scalable',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'contrarian', text: "You're relying on psychiatrist referrals for Spravato patients. That's not a strategy — that's a hope." },
            { angle: 'stat', text: "The average REMS-certified Spravato clinic gets 1-2 referrals per month from local psychiatrists. You need 15-20 to be profitable." },
            { angle: 'question', text: "How long can you sustain your Spravato program on 1-2 referrals a month? Let me save you the math: you can't." },
            { angle: 'callout', text: "You dropped $50K on REMS certification and Spravato infrastructure. And you're waiting for Dr. Smith to maybe send you someone." },
        ],
        body: "Referral networks are great — as a supplement. But as your PRIMARY patient acquisition channel for Spravato? They're dangerously unreliable. Psychiatrists are busy. They have their own patient loads. They don't think about your clinic when a patient qualifies — they think about it if they REMEMBER your clinic. That's 1-2 referrals a month. Maybe. You need 15 to 20 monthly Spravato patients to make the program profitable. That means you need a direct-to-patient acquisition system that finds people who qualify, educates them on Spravato, pre-qualifies by insurance, and books them — all without relying on a single referral source. Referrals are a bonus. Your SYSTEM is what you scale.",
        cta: "We build direct-to-patient Spravato funnels. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-08',
        title: 'Insurance Verification As Lead Magnet',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'contrarian', text: "Most clinics treat insurance verification as an admin task. We treat it as a conversion tool. And it triples qualified bookings." },
            { angle: 'question', text: "What if your biggest lead magnet was already built into your operations? Insurance verification is a conversion weapon — if you use it right." },
            { angle: 'callout', text: "Free insurance verification — those three words will triple your Spravato and TMS inquiries overnight." },
            { angle: 'command', text: "Put 'Free Insurance Verification' on your landing page today. It's the highest-converting CTA in insurance-based healthcare marketing." },
        ],
        body: "The number one barrier for insurance patients isn't awareness — it's uncertainty. 'WILL my insurance cover this? How much will I pay?' That uncertainty kills conversions. But here's the hack — offer free insurance verification as the FIRST step. Not 'Book a consultation.' Not 'Schedule an appointment.' 'Check if your insurance covers this — free, 2 minutes.' It's low commitment. High value. And it gives YOU the patient's information, insurance details, and intent signal all in one step. Once you verify coverage, the conversation shifts from 'Can I afford this?' to 'When can I start?' That one change — leading with verification instead of booking — increases conversion rates dramatically for insurance-model clinics.",
        cta: "We build insurance verification funnels. $99 per qualified inquiry. Link in bio.",
    },

    // ── INSURANCE OPERATIONS & MARKETING (9–18) ───
    {
        id: 'INS-09',
        title: 'The Show Rate Crisis',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "The average show rate for insurance-based mental health clinics is 65%. That means 1 in 3 patients you booked doesn't walk in." },
            { angle: 'question', text: "What's your show rate? If it's under 80%, you're losing thousands every month on patients who book and never come." },
            { angle: 'callout', text: "You're celebrating booked appointments. Meanwhile, 35% of them will ghost. And nobody on your team is solving for that." },
            { angle: 'contrarian', text: "Booking more patients isn't the answer. Getting the ones you already booked to SHOW UP is." },
        ],
        body: "Let me show you what these numbers actually mean. A 65% show rate on 20 booked appointments means 7 no-shows. If each Spravato session generates $1,200 in reimbursement, those 7 no-shows cost you $8,400 per month. That's $100K a year in lost revenue from patients who ALREADY SAID YES. The fix isn't booking MORE patients — it's getting the ones you have to show up. That means automated reminders. Multiple touchpoints. Day-before and morning-of confirmation. Transportation options. Family member notifications. Rebooking protocols for cancellations. The gap between booked and showed is the most expensive gap in your business. And most clinics don't even track it.",
        cta: "We don't just deliver inquiries — we pre-screen them so your team isn't wasting time. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-10',
        title: 'Why Insurance Clinics Need Different Creative',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'contrarian', text: "If you're marketing an insurance-based clinic the same way as a cash-pay clinic — you're wasting money. The psychology is completely different." },
            { angle: 'question', text: "What does an insurance patient care about that a cash-pay patient doesn't? And how does that change your entire marketing strategy?" },
            { angle: 'callout', text: "Cash-pay patients ask 'Does it work?' Insurance patients ask 'Does my plan cover it?' Your ads should reflect that." },
            { angle: 'stat', text: "Insurance-based mental health clinics convert 3x better when the lead magnet addresses coverage FIRST and treatment SECOND." },
        ],
        body: "Cash-pay patients ask: Does it work? Is it safe? Is it worth $500 per session? Insurance patients ask: Is it covered? What's my copay? How do I get approved? Completely different objections. Completely different conversion psychology. Your ads, landing pages, and intake process need to answer THEIR questions — not the cash-pay questions. Lead with coverage. Show the copay range. Explain the prior auth timeline. Make the financial barrier disappear FIRST — then educate on the treatment. Most agencies run the same campaign regardless of the revenue model and wonder why conversion rates are different. It's because they're answering the wrong questions for the wrong audience.",
        cta: "Insurance-specific funnels that answer the right questions. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-11',
        title: 'The Treatment Protocol Education Gap',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'question', text: "Do your patients know what happens during a Spravato session? Most don't. And that uncertainty kills conversions." },
            { angle: 'callout', text: "You're losing Spravato patients because they don't understand the 2-hour monitoring requirement. That's a marketing failure, not a clinical one." },
            { angle: 'contrarian', text: "Spravato isn't hard to sell clinically. It's hard to sell LOGISTICALLY. And your marketing isn't addressing that." },
            { angle: 'stat', text: "40% of Spravato-qualified patients decline treatment because they don't understand what the session actually looks like." },
        ],
        body: "Spravato has unique requirements that scare patients if you don't address them upfront. Two-hour monitoring after each session. Twice-weekly sessions for the first month. Can't drive yourself home. These aren't deal-breakers — but they FEEL like deal-breakers to a patient who doesn't understand them. Your marketing needs to normalize these requirements. 'The 2-hour session includes relaxation time in a comfortable private room.' 'Most patients read, listen to music, or nap.' 'Many patients bring a family member who drives them — it becomes a shared healing experience.' When you REFRAME the logistics as features instead of barriers, objections dissolve. But you have to address them BEFORE the patient calls — not during intake.",
        cta: "We create protocol-education content that turns objections into features. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-12',
        title: 'Spravato vs IV Ketamine',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'question', text: "Why do some clinics offer both Spravato and IV ketamine? Because they serve completely different patient populations." },
            { angle: 'stat', text: "Spravato: $10 copay, insurance-covered, FDA-approved. IV Ketamine: $400-$600 out of pocket, not FDA-approved for depression. Same molecule. Different markets." },
            { angle: 'callout', text: "If you're only offering IV ketamine, you're only reaching the 20% of patients who can pay cash. The other 80% need Spravato." },
            { angle: 'contrarian', text: "IV ketamine clinics look at Spravato as a competitor. Smart clinics see it as a second revenue stream that opens an 80% larger market." },
        ],
        body: "IV ketamine and Spravato use different forms of the same molecule. But from a BUSINESS perspective, they're completely different products for completely different markets. IV ketamine is cash-pay. Patients who can afford $400-$600 per session. No insurance coverage for depression. Faster onset. More flexibility in dosing. Spravato is insurance-covered. $10 copay for patients. FDA-approved specifically for treatment-resistant depression. REMS-certified administration. Two-hour monitoring window. The cash-pay patient values privacy, speed, and customization. The insurance patient values accessibility, FDA approval, and coverage. Marketing to both requires DIFFERENT creative, different landing pages, different intake flows, and different nurture sequences. One clinic. Two acquisition systems.",
        cta: "We build both systems. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-13',
        title: 'The 36-Session TMS Challenge',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "TMS requires 36 sessions. That's 36 chances for your patient to drop off. And most clinics lose 40% before completion." },
            { angle: 'question', text: "What's worse than a patient who doesn't show up? One who shows up 20 times and drops out before the treatment works." },
            { angle: 'callout', text: "If your TMS completion rate is under 75%, you're losing thousands per patient AND getting worse outcomes." },
            { angle: 'contrarian', text: "TMS protocol adherence isn't a patient problem. It's a system problem. And most clinics blame the patient." },
        ],
        body: "36 sessions over 6 weeks. That's the standard TMS protocol. And it's a retention NIGHTMARE. Life gets in the way. Work conflicts. Family emergencies. Bad weather days. After session 15, patients start wondering if it's working. By session 25, some just stop showing up. And incomplete protocols mean worse outcomes — which means worse reviews — which means fewer referrals. The solution is a retention system that's as robust as your acquisition system. Session milestones. Progress check-ins. Outcome measurements shared WITH the patient. Automated rebooking for missed sessions. Family member engagement. Every session they complete brings them closer to results — and your marketing should reinforce that at every touchpoint.",
        cta: "Acquisition AND retention systems for TMS. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-14',
        title: 'Medicare TMS Opportunity',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "Medicare covers standard TMS at approximately $9,500 per treatment course. The SAINT protocol? $19,700. And Medicare patients are the most underserved." },
            { angle: 'question', text: "When was the last time you marketed specifically to Medicare-eligible patients? That's the largest untapped pool in TMS." },
            { angle: 'callout', text: "You're ignoring the single largest payer for TMS services because you don't know how to reach Medicare patients online." },
            { angle: 'conditional', text: "If you accept Medicare and offer TMS, there's a $19,700-per-patient opportunity you're probably not capitalizing on." },
        ],
        body: "Here's the reality nobody is addressing. Medicare patients are the most underserved population in the TMS market. They're older. They've been on medications for decades. Many have treatment-resistant depression. And they qualify for TMS coverage. But they're not on Instagram. They're not responding to the same ads as a 35-year-old. They require different channels, different messaging, and different trust signals. Their adult children are often the ones researching treatment options. Your marketing needs to reach BOTH the patient and the caregiver. Different platforms. Different creative. Different language. And with the SAINT protocol billing code coming in July 2025, every Medicare TMS patient represents $19,700 in potential reimbursement. That's worth building a system for.",
        cta: "We build Medicare-specific TMS funnels. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-15',
        title: 'Building Your REMS Defense Moat',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "Your REMS certification isn't just a requirement — it's a competitive moat. But only if you market it correctly." },
            { angle: 'contrarian', text: "Most clinics see REMS certification as a burden. The smart ones see it as an unscalable barrier that keeps competitors OUT." },
            { angle: 'question', text: "How many clinics in your metro area are REMS-certified for Spravato? Probably fewer than 5. That's your advantage." },
            { angle: 'stat', text: "REMS certification takes months to obtain. In most metros, fewer than 5 clinics have it. If you're one of them, you have a natural monopoly." },
        ],
        body: "REMS certification is expensive, time-consuming, and complicated. And that's exactly why it's your biggest competitive advantage. In most metro areas, there are fewer than 5 REMS-certified Spravato clinics. That means the total addressable market of treatment-resistant depression patients covered by insurance has only 5 options. If you're one of the 5, you don't need to be the BEST marketer — you just need to be VISIBLE. The barrier to entry keeps new competitors from flooding in. While new ketamine clinics can open every month, new REMS-certified clinics take 6-12 months to get approved. That's your moat. But a moat without marketing is just a circle of water. You need to be the clinic that shows up when patients search.",
        cta: "We help REMS clinics leverage their advantage. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-16',
        title: 'Insurance Pre-Qualification Funnels',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'question', text: "What if you only talked to patients who ALREADY qualified for insurance coverage? No more wasting time on patients whose plans don't cover TMS." },
            { angle: 'callout', text: "You're spending 30 minutes per lead doing insurance verification manually. We automate it and only send you pre-qualified patients." },
            { angle: 'contrarian', text: "Most clinics qualify leads AFTER they call. We qualify them BEFORE they call. And it changes everything." },
            { angle: 'stat', text: "Pre-qualified leads convert at 3x the rate of raw leads for insurance-based clinics. Here's how to build the funnel." },
        ],
        body: "In insurance-based marketing, the BIGGEST time waste is spending 30 minutes with a patient only to discover their insurance doesn't cover the treatment. An insurance pre-qualification funnel fixes this. Step one — ad targets patients by condition and geography. Step two — landing page collects insurance info and basic clinical history. Step three — automated verification checks coverage BEFORE your team ever makes a call. Step four — only patients with verified coverage get forwarded to your intake team. You stop wasting time on patients you can't serve. Your team only talks to pre-qualified leads. Your conversion rate skyrockets because every conversation is with someone who CAN actually start treatment.",
        cta: "Pre-qualification funnels built for insurance clinics. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-17',
        title: 'The Reimbursement Stack',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "Spravato: $8,200/month per patient. Standard TMS: $9,500 per course. SAINT protocol: $19,700 per patient. Now imagine 20 patients a month." },
            { angle: 'command', text: "Pull out your calculator. 20 Spravato patients × $8,200/month = $164,000 in monthly reimbursement. Now ask yourself why your chairs are empty." },
            { angle: 'question', text: "What would an additional $164,000 in monthly reimbursement do for your clinic? That's 20 Spravato patients." },
            { angle: 'callout', text: "The revenue potential of insurance-covered mental health treatments is staggering. But you need PATIENTS to unlock it." },
        ],
        body: "Let's stack the numbers. Spravato: $8,200 per month per patient. With 20 active patients, that's $164,000 in monthly reimbursement. Standard TMS: $9,500 per 36-session course. 10 new patients a month = $95,000 in new revenue. SAINT protocol: $19,700 per patient. Just 5 patients = $98,500. Combined with cash-pay ketamine at $15,000 per patient per year, a multi-modality clinic with a solid acquisition system can generate $300,000 to $500,000 per month in total revenue. These numbers are real. The treatments are real. The insurance coverage is real. The ONLY missing piece is a system that consistently puts qualified patients in your chairs.",
        cta: "We build that system. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-18',
        title: 'Competing With Hospital TMS Programs',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.OCPB,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'question', text: "How do you compete with hospital-based TMS programs that have unlimited marketing budgets and brand recognition?" },
            { angle: 'callout', text: "The hospital system in your city just started a TMS program. They have a marketing department, a brand, and a budget. You have better care." },
            { angle: 'contrarian', text: "Hospital TMS programs have one massive weakness that private clinics DON'T. And nobody's exploiting it." },
            { angle: 'label', text: "If a hospital TMS program just opened in your market and you're worried — listen. You actually have the advantage." },
        ],
        body: "Let me break down why you actually have the advantage here. Hospital TMS programs have brand recognition and marketing budgets. But they have massive weaknesses. Wait times — hospitals have 4-8 week wait lists. Yours can start next week. Impersonal care — hospital patients see a different tech each session. Your patients see the same caring team every time. Bureaucracy — hospital intake involves 3 departments and 2 weeks. Yours takes one call. And here's the biggest one — patients WANT alternatives to hospitals. They want a clinic that feels like a clinic, not a hospital wing. Your marketing should lean into these advantages HARD. 'Start treatment this week, not next month.' 'Same compassionate team every session.' 'Walk in and feel like a person, not a number.'",
        cta: "We position private TMS clinics against hospital programs. $99 per qualified inquiry. Link in bio.",
    },

    // ── INSURANCE OFFERS & CLOSING (19–25) ────────
    {
        id: 'INS-19',
        title: 'The Insurance Clinic Offer Stack',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '80s',
        hooks: [
            { angle: 'callout', text: "Here's what we build for insurance-based mental health clinics — and why it's the most complete system in the market." },
            { angle: 'command', text: "If you're an insurance-based TMS or Spravato clinic, screenshot this and compare to whatever your current agency offers." },
            { angle: 'question', text: "What would it look like to have a complete patient acquisition system designed specifically for insurance-model clinics?" },
            { angle: 'contrarian', text: "Most marketing companies don't even know what REMS certification is. Here's what a SPECIALIZED system looks like." },
        ],
        body: "For insurance clinics, we build: ONE — Compliant Meta ad campaigns with creative designed for the insurance patient psychology. Coverage-first messaging. $10 copay positioning. Condition education. TWO — Insurance pre-qualification funnels that verify coverage BEFORE your team talks to anyone. THREE — Speed-to-lead systems with trained ISAs who understand prior auth timelines and can keep patients warm during the approval window. FOUR — Automated show-rate optimization — reminders, confirmations, transportation planning, family member engagement. FIVE — Retention systems for 36-session TMS protocols and ongoing Spravato maintenance. SIX — Free website revamp focused on insurance conversion. SEVEN — 20 SEO articles targeting insurance-specific searches in your local market.",
        cta: "The complete insurance clinic system. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-20',
        title: 'Why Insurance Clinics Need Us MORE',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.OCPB,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'contrarian', text: "Insurance-based clinics actually NEED performance marketing MORE than cash-pay clinics. And almost nobody understands why." },
            { angle: 'question', text: "Why is performance-based marketing even MORE important for insurance clinics than cash-pay clinics? The math will surprise you." },
            { angle: 'stat', text: "Insurance clinics have longer sales cycles, more complex intake, and 2x the administrative overhead. And they're paying the same retainer as a cash-pay clinic." },
            { angle: 'callout', text: "Your insurance clinic has a 3-week intake process. Your retainer agency doesn't care — they get paid the same regardless." },
        ],
        body: "Insurance clinics have more complexity than cash-pay. Longer intake cycles. Prior authorizations. Insurance verification. Two-hour monitoring requirements. Each step is a potential dropout point. When you pay a retainer, your agency has ZERO incentive to optimize any of these steps. They handed you a lead. Their job is done. But WE don't get paid until the patient SHOWS UP. Which means every step of your intake process — from lead to prior auth to verification to scheduling to showing up — is OUR problem too. We're motivated to optimize EVERY stage because a dropout at any stage means we don't get paid. That aligned incentive is even more critical in insurance models where the pipeline is longer and more fragile.",
        cta: "Performance-based marketing designed for the complexity of insurance clinics. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-21',
        title: 'Insurance Clinic Qualification',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.MOST,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '60s',
        hooks: [
            { angle: 'command', text: "Insurance-based TMS and Spravato clinics — here are the 5 questions that determine if we can help you." },
            { angle: 'question', text: "Is your insurance clinic ready for a patient acquisition system? Answer these 5 questions and find out." },
            { angle: 'callout', text: "Not every insurance clinic is ready for what we do. Here's how to know if you are." },
            { angle: 'conditional', text: "If you answer YES to all 5 of these — your insurance clinic is exactly what we built our system for." },
        ],
        body: "Question one — are you REMS-certified for Spravato or operating a TMS device? Question two — do you accept at least 3 major insurance carriers? Question three — can your admin team handle prior authorizations efficiently? Question four — do you have capacity for at least 15 new patients per month? Question five — can your team respond to leads in under 10 minutes? If yes to all five — you're an ideal fit. The next step is a 25-minute diagnostic where we analyze your current patient pipeline and identify exactly where patients are falling off.",
        cta: "Take the 60-second qualification. Link in bio.",
    },
    {
        id: 'INS-22',
        title: 'The Spravato Patient Journey',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'question', text: "Do you know what your Spravato patient experiences from the moment they see your ad to the moment they sit in your treatment room? Most clinics don't." },
            { angle: 'callout', text: "There are 14 touchpoints between a Spravato ad click and a patient's first session. Lose them at any one, and you lose $8,200/month." },
            { angle: 'contrarian', text: "Your clinical Spravato process is excellent. Your MARKETING patient journey is broken. And that's where the money leaks." },
            { angle: 'stat', text: "The average Spravato patient interacts with your clinic 14 times before their first session. If any of those 14 touchpoints fail, they're gone." },
        ],
        body: "The Spravato patient journey has 14 touchpoints. Ad impression. Click. Form fill. Speed-to-lead call. Insurance verification. Prior authorization submission. Waiting period communication. Prior auth approval notification. First appointment scheduling. Pre-session prep information. Day-before confirmation. Morning-of reminder. Arrival experience. First session debrief. FOURTEEN opportunities to lose them. And most clinics only think about the first two — the ad and the form. The other 12 are unmanaged. Random. Inconsistent. That's where $8,200-per-month patients evaporate. We map and optimize all 14 touchpoints. Because our revenue depends on patients making it through ALL of them.",
        cta: "Let us map your patient journey. Free diagnostic. Link in bio.",
    },
    {
        id: 'INS-23',
        title: 'The Insurance Clinic ROI',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.PRODUCT,
        framework: FRAMEWORKS.STATS,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "One Spravato patient: $99 qualified inquiry fee. That patient generates $8,200/month in reimbursement. Do the math." },
            { angle: 'command', text: "Grab your calculator. $99 in, $8,200 per month out. That's an 82x return in month ONE. And it compounds monthly." },
            { angle: 'question', text: "What's an 82x monthly return on a marketing investment look like? Exactly like our Spravato acquisition model." },
            { angle: 'callout', text: "You spend $99 with us per qualified inquiry. You get $8,200 in monthly reimbursement. I'll let you decide if that's a good deal." },
        ],
        body: "The ROI math for insurance clinics is even more dramatic than cash-pay. One Spravato patient costs you $99 with us — one qualified inquiry fee, pre-screened to your standard. That patient generates approximately $8,200 per month in insurance reimbursement. Month ONE return: 82x. And that patient stays for months. Over 6 months: $49,200 in reimbursement from a $99 acquisition cost. That's a 497x return. For TMS: $99 acquisition cost, $9,500 per treatment course. 96x return. For SAINT protocol: $99 acquisition, $19,700 reimbursement. 199x return. These aren't theoretical numbers. They're the mathematical reality of performance-based marketing in the insurance model.",
        cta: "165x return. Performance-based. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-24',
        title: 'Future-Proofing Your Insurance Practice',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "By 2027, insurance coverage for neuromodulation treatments will expand to cover 3 new modalities. The clinics with systems NOW will capture all of it." },
            { angle: 'question', text: "What happens when insurance starts covering the NEXT breakthrough treatment? Will your clinic be ready, or scrambling?" },
            { angle: 'contrarian', text: "You're not just building a patient acquisition system. You're building infrastructure for every new treatment insurance will cover in the next decade." },
            { angle: 'callout', text: "The SAINT protocol billing code is just the FIRST of many new insurance-covered neuromodulation treatments. The system you build now serves them ALL." },
        ],
        body: "The mental health treatment landscape is evolving rapidly. SAINT protocol just got Medicare coverage. New psilocybin-assisted therapy trials are showing breakthrough results and are heading toward FDA approval. MDMA-assisted therapy for PTSD is in Phase 3 trials. Insurance companies are starting to recognize that these treatments SAVE them money compared to decades of SSRIs and talk therapy. The clinics that build patient acquisition infrastructure NOW won't just capture today's patients — they'll be POSITIONED to capture every new treatment as it gains insurance coverage. Your system, your pixel data, your SEO rankings, your brand authority — all of it compounds. Building now isn't just about TMS and Spravato. It's about being the dominant mental health treatment clinic in your market for the next decade.",
        cta: "Start building the infrastructure. $99 per qualified inquiry. Link in bio.",
    },
    {
        id: 'INS-25',
        title: 'Insurance Clinic: Final CTA',
        category: SCRIPT_CATEGORIES.INSURANCE,
        awareness: AWARENESS_LEVELS.MOST,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'A',
        duration: '60s',
        hooks: [
            { angle: 'command', text: "If you run an insurance-based TMS or Spravato clinic — this is the moment. Stop watching. Start building." },
            { angle: 'question', text: "How many more months will you rely on referrals while your empty chairs cost you $8,200 each?" },
            { angle: 'callout', text: "Every empty Spravato chair is $8,200 per month in unrealized reimbursement. Every month you wait, that number compounds." },
            { angle: 'conditional', text: "If you're REMS-certified or operating TMS and you've watched more than 3 of my videos — you already know. Take the step." },
        ],
        body: "Here's what you get: Performance-based advertising built for insurance-model clinics. $99 per qualified inquiry — a real, pre-screened patient who meets the standard we agreed on before launch. Insurance pre-qualification funnels. Speed-to-lead systems. Prior auth nurture sequences. Show-rate optimization. TMS retention programs. Free website revamp. Free SEO. No retainer. Month to month. We only win when your chairs are full and your reimbursement claims are filed. If we don't perform, we make $0.",
        cta: "Link in bio. 5 qualifying questions. 60 seconds. Let's fill your treatment rooms.",
    },
];

// ─────────────────────────────────────────────────
// ORGANIC SOCIAL CONTENT (76–100)
// ─────────────────────────────────────────────────
export const ORGANIC_SCRIPTS = [

    // ── 🎬 SHOOT-PLAN ORGANICS (SORG-01 to SORG-10) — Film these first ──────────

    {
        id: 'SORG-01',
        title: 'The 360 Marketing Strategy Clinics Actually Need',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '60s',
        hooks: [
            { angle: 'contrarian', text: "Everyone's telling you to run ads. But ads without a strategy behind them are just burning money. Here's what a real 360 marketing system looks like for a clinic." },
            { angle: 'callout', text: "Ketamine, TMS, Spravato clinic owners — you don't have a marketing problem. You have a system problem. Let me show you what I mean." },
            { angle: 'story', text: "Every clinic I talk to is doing one or two things well. None of them are doing all five. Here's the full picture." },
        ],
        body: `Here's what a 360 clinic marketing strategy actually looks like. You need five things working at the same time.

One: A landing page that's designed to convert. Not your homepage. A dedicated page for each treatment, with one CTA.

Two: A paid channel. Google Ads for active searchers who are ready to book. Meta for building awareness with people who don't know they have options.

Three: A speed-to-lead system. Sub-60-second automated response the moment someone fills out a form. You lose 80% of leads if you wait more than 5 minutes.

Four: A follow-up sequence. Seven touches minimum. Email, text, call. Most clinics do one follow-up and give up.

Five: Organic content. Instagram, TikTok, YouTube — trust-building content that makes every ad you run convert at a higher rate.

That's it. The clinics that are growing 20, 30 patients a month aren't doing anything magic. They're just running all five of these simultaneously.`,
        cta: "Follow if you want the breakdown on any of these five.",
    },
    {
        id: 'SORG-02',
        title: 'Why Your Clinic Website Isn\'t Converting',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '55s',
        hooks: [
            { angle: 'callout', text: "If your clinic website starts with 'Welcome to' — it's not converting. Here's why." },
            { angle: 'question', text: "How is your clinic website supposed to convert patients if the first thing they see is your logo and your clinic name?" },
            { angle: 'contrarian', text: "Your clinic website is not for you. It's for the patient who tried 5 antidepressants and still gets out of bed every day wondering if it's worth it. Is yours written for them?" },
        ],
        body: `The number one mistake I see on clinic websites: they're written for the doctor, not the patient.

The patient who lands on your site isn't reading your credentials. They're asking one question: "Is this for someone like me?"

Here's what the first thing on your website should communicate: "You've tried everything. Nothing worked. You're still here, and that matters. Here's what we can do."

Not — "Welcome to our state-of-the-art ketamine infusion center."

Empathy first. Credentials second. Every single time.

And then one thing to click. Not six links. Not a navigation bar full of options. One thing. Book a call. Fill out the form. That's it.

Our blog post breaks this down with specific before-and-after examples. Link in bio. But the short version is: if your website is about you, it's not working.`,
        cta: "If you want us to look at your clinic's website for free — DM me the link.",
    },
    {
        id: 'SORG-03',
        title: 'The Retainer Trap — And Why I Walked Away From It',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'story', text: "I could charge clinic owners a $5,000/month retainer. I chose not to. Here's why that was the most important business decision I made." },
            { angle: 'contrarian', text: "Every marketing agency is going to tell you they need a retainer. I'm going to explain exactly why that model is broken — and what I built instead." },
            { angle: 'question', text: "Why would a marketing company that's actually confident in their results ask you to pay them before getting a single patient?" },
        ],
        body: `When I started building this business, I looked at how every other clinic marketing agency structured their deals. Retainer. Retainer. Retainer.

Three, five, ten thousand dollars a month. Whether they deliver patients or not. Whether your clinic grows or not.

And I sat with that for a while. Because I'd already been on the other side of it — paying for ads that didn't work, trusting an agency with my money and getting nothing back.

So I built a different model. You pay $99 per qualified inquiry — pre-screened, cash-pay, first contact, consented to be contacted. Zero retainer. Zero monthly fee. Zero risk.

The only way we win is if you win. That's the whole point.

Is it more work for us? Yes. Do we only take clients we're confident we can deliver for? Absolutely. But that's exactly how it should be.`,
        cta: "If you want to work with an agency that has actual skin in the game — link in bio.",
    },
    {
        id: 'SORG-04',
        title: 'Your Consultation Show Rate Is Killing Your Revenue',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'stat', text: "The average consultation no-show rate for mental health clinics is between 30 and 50 percent. That means you're losing half your potential revenue before the patient ever walks in the door." },
            { angle: 'question', text: "Do you actually know what your consultation show rate is? Most clinic owners don't. And that might be the most expensive thing they don't know." },
            { angle: 'callout', text: "Clinic owners — you're probably blaming your ads for poor results. But if 40% of your leads aren't showing up for their consultation, that's not an ads problem. That's a follow-up problem." },
        ],
        body: `Here's the thing most clinics don't realize: your show rate is often a bigger problem than your lead volume.

You could be generating 30 leads a month and converting 5 patients. Or you could be generating 20 leads and converting 12. The difference is your show rate.

What drives show rate? Three things.

One: Speed to lead. If you respond within 5 minutes, the patient is still mentally present in their decision. If you wait 3 hours, they've moved on or they've talked themselves out of it.

Two: The confirmation sequence. Text the day before, text two hours before. Most clinics send one reminder email. That's not enough.

Three: What happens on the consultation call. If it feels like an interrogation instead of a conversation, patients don't come back.

Fix your show rate before you increase your ad spend. Every additional patient you convert from existing leads costs you zero in acquisition spend.`,
        cta: "DM me 'SHOW RATE' and I'll send you the 3-step confirmation sequence we use.",
    },
    {
        id: 'SORG-05',
        title: 'Why Posting 3x a Week Does Nothing for Your Clinic',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '55s',
        hooks: [
            { angle: 'contrarian', text: "Everyone tells you to post three times a week on Instagram. Nobody tells you why it almost never actually turns into patients for a clinic. Here's the thing they're missing." },
            { angle: 'question', text: "Your clinic has been posting on Instagram for six months. How many patients has it directly brought in? For most clinics, the honest answer is zero or close to it." },
            { angle: 'callout', text: "If you're posting on social media without a clear funnel behind it — you're doing content marketing for someone else's brand. Here's what I mean." },
        ],
        body: `Content doesn't convert by itself. I need you to hear that.

You can post every single day — and if there's no CTA, no bio link, no landing page, no follow-up — you're building brand awareness for a brand that has no conversion mechanism. You're just... existing online.

Here's what actually works for clinic social media:

Your content educates. Your bio link converts. And there has to be a direct path from the video the person watched to the form they fill out.

The content you make should be answering the three questions every potential patient has:
What is this treatment? Is it right for me? How do I get started?

Answer those three questions across your content. Make every video end with one call to action. Have one link in your bio that goes to a dedicated landing page.

That's when social media starts working. Not when you post three times a week and hope.`,
        cta: "Follow for specific content frameworks that actually bring in consultations.",
    },
    {
        id: 'SORG-06',
        title: 'The 5-Minute Rule That Changes Everything',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '50s',
        hooks: [
            { angle: 'stat', text: "MIT did a study on lead response times. The clinics that respond within 5 minutes are 100 times more likely to convert that lead than clinics that wait 30 minutes. One hundred times." },
            { angle: 'question', text: "What happens between when a patient fills out your intake form — and when your front desk actually calls them back?" },
            { angle: 'contrarian', text: "Your ad campaign isn't the problem. Your speed to lead is the problem. And fixing it costs almost nothing." },
        ],
        body: `Here's the reality: a patient who fills out your form at 7 PM on a Tuesday is in a window.

They made an emotional decision. They finally decided to do something. They searched. They clicked. They typed their name and number into your form. They hit submit.

And then — what? They wait for you to call them back tomorrow morning.

By then, they've talked themselves out of it. They've told themselves it's too expensive. They've filled out two other clinic forms. That window is closed.

The fix is not expensive. An automated text — "Hi, we got your form. We'd love to connect. Can we call you in the next 10 minutes?" — sent within 60 seconds of them hitting submit.

That one change, at clinics I've worked with, can double consultation bookings from existing ad spend.

You don't need more leads. You need to actually catch the leads you have.`,
        cta: "Want the exact automation setup for this? DM me.",
    },
    {
        id: 'SORG-07',
        title: 'You Pay When Patients Show Up. That\'s It.',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.DIRECT_OFFER,
        outfit: 'B',
        duration: '45s',
        hooks: [
            { angle: 'callout', text: "For the clinic owners who've been burned by marketing agencies — this is for you specifically." },
            { angle: 'contrarian', text: "I'm going to tell you something most marketing agencies will never say: you shouldn't be paying a retainer." },
            { angle: 'question', text: "What if you literally never had to pay for a marketing lead that didn't show up?" },
        ],
        body: `Real quick — because I know most of you have been burned.

Here's how we work. You pay $99 when a qualified, pre-screened, cash-pay prospect is delivered to your clinic. That's the only fee.

You never pay a monthly retainer. There is no contract. If we don't bring you patients who show up — you don't pay.

We only take one clinic per market. Right now there are open markets.

If you're a ketamine, TMS, or Spravato clinic and you want to know if your market is available — four qualifying questions in the link in my bio. Takes sixty seconds.

That's it.`,
        cta: "Link in bio. Four questions. Sixty seconds.",
    },
    {
        id: 'SORG-08',
        title: 'Google Ads for Ketamine Clinics — What Nobody Tells You',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '65s',
        hooks: [
            { angle: 'question', text: "Did you know that ketamine and Spravato clinics need a special certification just to run Google Ads? And most clinics trying to run ads don't have it?" },
            { angle: 'callout', text: "If you've ever had a Google Ads account suspended or your ads disapproved — there's about a 70% chance I know exactly why." },
            { angle: 'stat', text: "Google Ads in the healthcare space are one of the most under-utilized channels for ketamine, TMS, and Spravato clinics. Here's why — and how to fix it." },
        ],
        body: `There's a reason most ketamine and Spravato clinics either skip Google Ads entirely or get suspended immediately.

It's called LegitScript certification. Ketamine and Spravato are controlled substances. Google requires third-party certification from LegitScript before you can run any paid ads for these treatments. Without it — your ads get disapproved, and repeated violations can get your account permanently banned.

TMS doesn't require LegitScript. But it still falls under Google's sensitive health content policies — so you still can't just run any ad.

The certification costs about $2,000 a year and takes 2 to 4 weeks. And most clinics don't know about it until after they've already been suspended.

Here's the good news: because this barrier exists, the clinics that do it correctly have dramatically less competition. A well-certified ketamine clinic on Google Ads in a mid-size market might face two or three real competitors. Not twenty.

The full breakdown is in our blog — link in bio. But if you're going to run Google Ads, start with LegitScript. Everything else in the strategy depends on it.`,
        cta: "Full breakdown at the link in bio. Check if your market is underserved.",
    },
    {
        id: 'SORG-09',
        title: 'Your Social Media Is Leaking Patients Right Now',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '50s',
        hooks: [
            { angle: 'stat', text: "71% of patients research a provider on social media before booking. If your clinic profile has posts from 2022 and no active stories — you're losing patients to clinics that are less experienced than you." },
            { angle: 'callout', text: "Go look at your clinic's Instagram profile right now. Now imagine you're a patient who just finished watching a video about ketamine therapy. Would that profile make you want to book?" },
            { angle: 'question', text: "What is your clinic's social media proving to the patient who found you through an ad? Specifically — what does it say about trust?" },
        ],
        body: `Before a patient books, they look you up. They always do.

They see your ad. They're interested. They google you. They click to your Instagram. And what they see either confirms their decision — or kills it.

An abandoned Instagram profile with 12 posts from last year and zero stories communicates one thing: this clinic is not active, and maybe not legitimate.

You don't need to go viral. You don't need a content team. You need three things on your social profile:

One — recent posts. Within the last two weeks, minimum.

Two — content that answers their questions. What is ketamine therapy? What does a session feel like? What do your patients experience?

Three — proof that there are humans here. Behind-the-scenes clips. Staff faces. Real moments.

Seventy-one percent of patients research you on social before they book. Make sure what they find makes them more confident — not less.`,
        cta: "Follow and I'll give you a 90-day content framework for clinic social media.",
    },
    {
        id: 'SORG-10',
        title: 'The Real Math on Getting a New Ketamine Patient',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'stat', text: "A well-managed Google Ads campaign for a ketamine clinic has a cost per patient acquisition of $300 to $500. A ketamine series costs the patient $4,000 to $6,000. Do that math." },
            { angle: 'question', text: "If I told you that for every $500 you spend on marketing you could acquire a patient worth $5,000 — what would your ideal monthly marketing budget be?" },
            { angle: 'contrarian', text: "Most clinic owners say they can't afford marketing. But when you actually run the numbers — you can't afford not to." },
        ],
        body: `Let me just do the math out loud for a second.

In a well-run Google Ads campaign for a ketamine clinic, cost per click is typically $8 to $15. With a converting landing page, you're looking at a $75 to $150 cost per lead. And if your consultation show rate and close rate are solid — patient acquisition cost lands between $300 and $500.

A ketamine infusion series costs the patient $4,000 to $8,000 depending on the market. Spravato can be $6,000 to $20,000 over a course of treatment.

So you're spending $300 to $500 to acquire a patient worth $4,000 to $20,000. The return on investment is 8:1 to 40:1 depending on the treatment.

The math works. The question is whether your marketing is set up correctly to capture it.

Most clinic Google Ads campaigns I audit are not. They're sending traffic to homepages, not landing pages. They're missing LegitScript certification. They have no follow-up sequence.

Fix the infrastructure — the math takes care of itself.`,
        cta: "Want me to run the math on your specific clinic and market? DM me.",
    },

    // ── EDUCATIONAL / VALUE DROPS (1–10) ──────────
    {
        id: 'ORG-01',
        title: '3 Numbers Every Clinic Owner Should Know',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'stat', text: "If you own a mental health clinic, these 3 numbers will determine whether your clinic thrives or dies in the next 3 years." },
            { angle: 'command', text: "Stop what you're doing and write these 3 numbers down. They'll change how you think about your clinic." },
            { angle: 'question', text: "Do you know the 3 most important numbers in mental health clinic growth right now? Most owners don't." },
        ],
        body: "Here are the three numbers. Number one — 500%. That's how much ketamine prescriptions increased from 2017 to 2022. The demand is EXPLODING. Number two — 67%. That's the percentage of depression patients who DON'T respond to SSRIs. Two-thirds. They need alternatives — and they're actively looking right now. Number three — 5 minutes. That's the window MIT found where your odds of qualifying a lead drop 80%. If your team isn't responding within 5 minutes, you're losing patients you already paid to attract. 500%. 67%. 5 minutes. Every decision you make about your clinic should revolve around these three numbers.",
        cta: "Follow for more clinic growth data that actually matters.",
    },
    {
        id: 'ORG-02',
        title: 'How Meta Banned Mental Health Targeting',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'stat', text: "In 2022, Meta removed the ability to target users by medical condition. And most mental health marketers STILL haven't adapted." },
            { angle: 'question', text: "How do you run ads for depression treatment when you can't target people with depression? Here's what works now." },
            { angle: 'callout', text: "If your agency is still complaining about Meta's targeting restrictions — they don't know how to advertise in healthcare." },
        ],
        body: "Before 2022, you could target people interested in 'depression treatment' or 'anxiety medications' on Meta. That's gone. Removed. And most agencies in this space still haven't figured out what to do about it. Here's what works now: you target by behavior and geography, not by condition. You target people who've visited competitor websites. You build lookalike audiences from your existing patient data. You use education-first creative that self-selects the right audience. 'If you've tried multiple medications and nothing has worked…' — that line targets treatment-resistant depression without ever mentioning it. The restriction isn't a limitation. It's a FILTER that separates sophisticated marketers from amateurs.",
        cta: "Follow for healthcare marketing strategies that work in 2025.",
    },
    {
        id: 'ORG-03',
        title: 'The 5-Minute Rule',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '55s',
        hooks: [
            { angle: 'stat', text: "MIT found that responding to a lead within 5 minutes makes you 80% more likely to qualify them. After 30 minutes? It drops to nearly zero." },
            { angle: 'question', text: "How long does it take your team to respond to a new patient inquiry? If it's over 5 minutes, you're losing most of them." },
            { angle: 'callout', text: "Your front desk takes 45 minutes to return inquiry calls. By then, that patient's window of courage has already closed." },
        ],
        body: "A person struggling with treatment-resistant depression just filled out your form. In that moment — they're at peak courage. Peak motivation. Peak openness. 5 minutes later? Doubt creeps in. 'Maybe I should try therapy again.' 'What if the side effects are bad?' 'My spouse won't understand.' 30 minutes later? They've talked themselves out of it. An hour later? They've forgotten they filled out the form. Speed to lead isn't just a metric — it's the difference between a patient who gets help and one who continues suffering. Every minute you wait, you lose more patients than you gain from better ads.",
        cta: "Follow if you want to stop losing the leads you already have.",
    },
    {
        id: 'ORG-04',
        title: "How to Create Ads That Don't Get Banned",
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'question', text: "How many of your ketamine or TMS ads has Meta rejected? Follow these 5 rules to never get banned again." },
            { angle: 'callout', text: "Your clinic's ad account just got restricted. Again. Here's the compliance playbook for ketamine advertising." },
            { angle: 'command', text: "Clinic owners — screenshot these 5 rules for running compliant ketamine and TMS ads on Meta." },
        ],
        body: "Rule 1 — never use before-and-after implications. Don't show 'sad person becomes happy person.' Rule 2 — never reference specific medical conditions in ad copy. Say 'If traditional treatments haven't worked for you' not 'If you have treatment-resistant depression.' Rule 3 — never use the word 'cure' or anything that implies guaranteed outcomes. Use 'response rates' and 'clinical studies show.' Rule 4 — avoid showing medical procedures in ad creative. Educational diagrams are fine; actual IV insertions are not. Rule 5 — always include a disclaimer when citing clinical data. 'Individual results may vary' isn't optional — it's mandatory. Follow these 5 rules and your ad account stays clean.",
        cta: "Save this. Share it with your marketing team. Follow for more.",
    },
    {
        id: 'ORG-05',
        title: "Why Your Landing Page Doesn't Convert",
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'stat', text: "The average healthcare landing page converts at 2.3%. Ours convert at 8 to 12%. Here are the 3 differences." },
            { angle: 'question', text: "Are these 3 conversion-killing mistakes on your clinic's website right now?" },
            { angle: 'callout', text: "I just reviewed 50 ketamine clinic websites. 47 of them had these same 3 conversion-killing mistakes." },
        ],
        body: "Mistake 1 — too many navigation options. Your landing page should have ONE action: fill out the form. No menu bar. No 'About Us.' No 'Meet Our Team.' ONE path forward. Mistake 2 — your form asks for too much. Name, email, phone. That's it. Every additional field drops conversion by 10%. Don't ask for insurance details, medical history, or address on the FIRST form. Mistake 3 — no social proof above the fold. Patients need to see that other people have trusted you BEFORE they share their information. A rating, a review count, a trust badge — something. Fix these 3 things and watch your conversion rate double within a week.",
        cta: "Follow for more conversion optimization tips for clinics.",
    },
    {
        id: 'ORG-06',
        title: 'The Retainer Model Is Dying',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'contrarian', text: "The marketing retainer model is dying. And the agencies clinging to it are exactly the ones you should stop paying." },
            { angle: 'question', text: "Why would you pay $10K/month whether your agency delivers 50 patients or zero? The retainer model protects THEM, not you." },
            { angle: 'stat', text: "72% of small business owners who fire their agency cite 'paying for activity, not results' as the reason." },
        ],
        body: "The retainer model was designed for agencies, not for clients. Here's why it's dying. Problem 1: misaligned incentives. The agency gets paid whether you get patients or not. Their incentive is to keep you SATISFIED enough to not cancel — not to TRANSFORM your business. Problem 2: vanity metrics. They show you impressions, clicks, and CPMs. You ask 'How many patients did I get?' They change the subject. Problem 3: no accountability. If they fail, they keep your $10K AND blame the market. Performance-based models fix all three. You pay for patients, not promises. The agency is accountable for outcomes, not activities. And the incentives are perfectly aligned — they win when you win.",
        cta: "Follow to learn what the performance-based model actually looks like.",
    },
    {
        id: 'ORG-07',
        title: 'How I Would Market a New Clinic From Scratch',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '80s',
        hooks: [
            { angle: 'question', text: "If I were opening a ketamine clinic tomorrow with zero patients, here's exactly what I'd do in the first 90 days." },
            { angle: 'command', text: "Save this. If you're starting a clinic — this is your 90-day marketing playbook." },
            { angle: 'callout', text: "New clinic owners: don't make the same 90-day mistakes I've seen dozens of clinics make. Here's the blueprint." },
        ],
        body: "Days 1-30: Build the foundation. Professional website with a conversion-optimized landing page. Google Business Profile claimed and optimized. 10 SEO articles targeting '[city] ketamine clinic' and related terms. Your pixel installed. Days 31-60: Launch paid acquisition. Meta ads with education-first creative. Test 3-4 hook angles. Build retargeting audiences from website visitors. Hire or train an ISA to handle speed-to-lead. Days 61-90: Optimize and scale. Kill underperforming ads. Double down on winners. Launch organic content — 3 videos per week. Start building email nurture sequences for leads who aren't ready yet. By day 90, you should be generating 15-20 inquiries per month with 8-12 showing up. Not explosive — but a machine that compounds every month from here.",
        cta: "Follow for more clinic-building strategies from someone who does this daily.",
    },
    {
        id: 'ORG-08',
        title: 'The Biggest Mistake New Clinic Owners Make',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'callout', text: "The #1 mistake new ketamine clinic owners make isn't clinical. It's marketing. And it costs them their first year." },
            { angle: 'question', text: "You spent $200K opening your clinic. How much did you budget for patient acquisition? If it's less than $5K/month, we need to talk." },
            { angle: 'contrarian', text: "The best clinical care in the world means nothing if nobody knows your clinic exists." },
        ],
        body: "They build the clinic first and think about marketing later. They spend $200K on build-out, equipment, and licensing — and budget $2K for marketing. They assume patients will 'find them.' Through Google. Through referrals. Through word of mouth. And for the first 6 months, they sit in an expensive, empty clinic wondering what went wrong. The clinics that succeed budget AT LEAST $3K-5K per month for patient acquisition from DAY ONE. They don't wait until the clinic is open to start marketing — they start 60 days BEFORE opening. By launch day, they have a pipeline. By month 3, they're breaking even. By month 6, they're profitable. Marketing isn't something you do AFTER you build a clinic. It's something you build INTO the clinic from the start.",
        cta: "Follow for more hard truths about clinic growth.",
    },
    {
        id: 'ORG-09',
        title: 'SEO for Mental Health Clinics',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "72% of patients search online before choosing a mental health provider. If you're not on page 1 of Google, you're invisible." },
            { angle: 'question', text: "What would 50 free organic patient inquiries per month do for your clinic? That's what SEO delivers when done right." },
            { angle: 'callout', text: "You're paying $50 per click on Google Ads when the organic result RIGHT ABOVE your ad gets the same clicks for free." },
        ],
        body: "Here's an SEO strategy for mental health clinics in 5 steps. ONE — claim and optimize your Google Business Profile. Photos, hours, services, reviews. This is free and it's the highest-ROI marketing action in healthcare. TWO — write 20 articles targeting '[city] + [treatment]' keywords. 'Ketamine therapy in Austin.' 'TMS for depression in Chicago.' Local + treatment = patients. THREE — get reviews. Google reviews are the #1 ranking factor for local SEO. Build a system that asks every patient. FOUR — build location pages if you serve multiple areas. Each city gets its own page. FIVE — update content quarterly. Google rewards fresh content. Clinics that do this consistently rank on page 1 within 6 months — and stay there.",
        cta: "Follow for more SEO strategies you can implement this week.",
    },
    {
        id: 'ORG-10',
        title: 'Patient Psychology 101',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'question', text: "What is a patient with treatment-resistant depression actually thinking when they see your ad? Let me walk you through their psychology." },
            { angle: 'callout', text: "You're writing ads like a marketer. You should be writing them like a therapist. Here's the patient's internal monologue." },
            { angle: 'contrarian', text: "Marketing to depressed patients isn't like marketing to consumers. Get the psychology wrong and you cause harm." },
        ],
        body: "Let me walk you through what's going on in their head. When a patient with treatment-resistant depression sees your ad, here's their internal monologue: 'I've tried everything. This probably won't work either.' Then: 'But what if it does?' Then: 'The side effects are probably terrible.' Then: 'Can I even afford this?' Then: 'What would my family think?' Then: 'Maybe I should just deal with it.' Your ad, your landing page, your ENTIRE funnel needs to address EVERY one of these objections. Not with sales tactics — with empathy. 'We know you've tried everything. That's actually why this exists.' 'Here's what the clinical data shows about response rates.' 'Most patients bring a family member to the consultation — we welcome that.' Meet them where they are. Not where you wish they were.",
        cta: "Follow for more patient-first marketing strategies.",
    },

    // ── THOUGHT LEADERSHIP / AUTHORITY (11–18) ────
    {
        id: 'ORG-11',
        title: 'The Future of Mental Health Marketing',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'stat', text: "Mental health marketing will be completely unrecognizable in 5 years. Here are the 3 trends that will define it." },
            { angle: 'question', text: "What will mental health marketing look like in 2030? The clinics that adapt NOW will own the next decade." },
            { angle: 'contrarian', text: "Everything you know about healthcare marketing is about to change. And it's happening faster than you think." },
        ],
        body: "Trend 1 — AI-powered personalization. Ads will dynamically adjust messaging based on the patient's stage of awareness. Trend 2 — video-first content. Static image ads are dying in healthcare. Patients want to see and TRUST the person behind the clinic before committing to treatment. Trend 3 — performance-based pricing. The retainer model is collapsing. Clinics are demanding accountability, and agencies that can't prove ROI are being replaced by models that align incentives. The clinics that adopt these three trends NOW — personalized content, video-first creative, and performance-based partnerships — will dominate their markets. The ones that wait will be playing catch-up for years.",
        cta: "Follow for forward-thinking clinic growth strategies.",
    },
    {
        id: 'ORG-12',
        title: 'Why I Only Do Mental Health',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '70s',
        hooks: [
            { angle: 'story', text: "I turned down a $40K/month med spa client last week. I only market for ketamine and TMS clinics. Here's why." },
            { angle: 'question', text: "Why would a clinic marketing company turn down guaranteed money? Because your patients deserve a specialist." },
            { angle: 'contrarian', text: "Specialization in ketamine clinic marketing isn't a limitation — it's the reason we outperform generalists." },
        ],
        body: "Med spa. $40K per month. Easy work. The creative writes itself. The targeting is simple. The margins would've been great. And I said no. Because the moment I take a non-mental-health client, I become a generalist. My team splits focus. Our R&D gets diluted. Our understanding of the patient journey gets shallow. The things that make us exceptional for ketamine, TMS, and Spravato clinics — the deep niche expertise, the compliant creative library, the patient psychology frameworks — all of that erodes the second we start also doing lip filler ads. I'd rather be the BEST at one thing than mediocre at ten. That's not a business limitation. It's a strategic moat that gets deeper every month.",
        cta: "Follow if you believe specialization beats generalization.",
    },
    {
        id: 'ORG-13',
        title: 'The Ketamine Stigma Problem',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'question', text: "How do you market a treatment that most people still associate with being a 'club drug'? Carefully. And strategically." },
            { angle: 'contrarian', text: "Ketamine's biggest marketing challenge isn't competition. It's stigma. And most clinics are making it worse, not better." },
            { angle: 'callout', text: "Your patients aren't afraid of ketamine therapy. They're afraid of what their family will THINK about ketamine therapy." },
        ],
        body: "The stigma around ketamine therapy is real. And it impacts marketing in 3 specific ways. ONE — patients won't share their experience publicly. Referrals and reviews are harder to get. Your marketing has to generate MORE awareness because word-of-mouth is suppressed. TWO — family and friends are often gatekeepers. 'You're going to do KETAMINE?' Your content needs to educate the patient AND their support system. THREE — the association with recreational use creates skepticism. Your content needs to lead with FDA research, clinical protocols, and medical supervision — not the treatment word itself. The clinics that crack the stigma code don't avoid it — they ADDRESS it head-on with education-first content that reframes the conversation.",
        cta: "Follow for more on marketing treatments with stigma challenges.",
    },
    {
        id: 'ORG-14',
        title: 'What Good Clinic Branding Looks Like',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'callout', text: "Your clinic's brand looks like every other clinic. White, clinical, forgettable. And you wonder why patients choose the other guy." },
            { angle: 'question', text: "What does your clinic's brand communicate in the first 3 seconds? If it says 'sterile medical facility' — you're losing patients." },
            { angle: 'contrarian', text: "The best ketamine clinic brands don't look clinical. They look warm, aspirational, and human. Here's why." },
        ],
        body: "Most mental health clinic brands make the same mistake — they look like hospitals. White backgrounds. Blue logos. Stock photos of smiling people. Clinical language. And patients HATE hospitals. They associate hospitals with illness, anxiety, and coldness. The best clinic brands feel warm, modern, and HUMAN. Earth tones instead of clinical blues. Real photography instead of stock. Language that says 'We understand what you've been through' instead of 'We offer evidence-based treatments.' Your brand should make a patient feel WELCOMED before they ever walk through your door. Not diagnosed. Not treated. Welcomed. Because the decision to try ketamine therapy is already scary enough without your website feeling like a hospital admission form.",
        cta: "Follow for more branding insights for mental health clinics.",
    },
    {
        id: 'ORG-15',
        title: 'Clinic Owner Red Flags',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'callout', text: "5 red flags that your marketing agency doesn't actually understand healthcare. Number 3 is the biggest." },
            { angle: 'question', text: "How do you know if your agency actually understands mental health marketing? Here are 5 questions that reveal the truth." },
            { angle: 'command', text: "Ask your agency these 5 questions today. If they can't answer all 5, start looking for a replacement." },
        ],
        body: "Red flag 1 — they can't name the Meta ad policies specific to healthcare. Red flag 2 — they show you CPM and CPC instead of cost per qualified lead and cost per patient. Red flag 3 — they've never heard of speed-to-lead and don't track it. Red flag 4 — they don't know the difference between Spravato and IV ketamine. Red flag 5 — they charge a retainer whether you get 50 patients or zero. If your agency can't pass this basic test, they're generalists pretending to understand your business. You wouldn't hire a surgeon who's 'pretty good at most specialties.' Don't hire a marketing agency under those terms either.",
        cta: "Follow and share this with a clinic owner who needs to hear it.",
    },
    {
        id: 'ORG-16',
        title: 'The Content Calendar Framework',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'callout', text: "Here's the exact content mix I use for mental health clinic social media. Steal this framework." },
            { angle: 'question', text: "What should a ketamine clinic post on social media? Here's the data-backed content calendar." },
            { angle: 'command', text: "Screenshot this content framework and give it to whoever manages your social media. It works." },
        ],
        body: "The ideal content mix for clinic social media — 40% educational. Treatment explanations, myth-busting, clinical data, patient FAQs. This builds trust and positions you as an authority. 30% proof and social proof. Reviews, outcomes data, process walkthroughs, team introductions. This reduces perceived risk. 20% offer-adjacent. What the experience is like, what to expect on your first visit, accessibility content, insurance information. This removes barriers. 10% direct offers. Book a consultation. Free assessment. Limited availability. This converts the people your other 90% of content already warmed up. Most clinics post 100% educational or 100% promotional. Both fail. The ratio matters.",
        cta: "Follow for more actionable content frameworks.",
    },
    {
        id: 'ORG-17',
        title: 'Google Reviews: The Growth Cheat Code',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '60s',
        hooks: [
            { angle: 'stat', text: "Clinics with 50+ Google reviews get 3x more organic patient inquiries than clinics with under 10. Here's how to get there." },
            { angle: 'question', text: "How many Google reviews does your clinic have? If it's under 50, you're leaving patients on the table every single day." },
            { angle: 'command', text: "Go check your Google reviews right now. If a competitor has more than you, they're winning patients you should have." },
        ],
        body: "Google reviews are the highest-leverage, lowest-cost growth tool for any clinic. And most clinics are terrible at collecting them. Here's the system: Step 1 — Send an automated text 2 hours after every appointment. 'Thank you for visiting today. If you had a positive experience, we'd be grateful for a Google review.' Include the direct link. Step 2 — Follow up 3 days later for anyone who didn't respond. Step 3 — Respond to EVERY review — positive AND negative. Google rewards engagement. Step 4 — Never incentivize reviews. It violates Google's policies and it's unethical in healthcare. Step 5 — Aim for 5 new reviews per month. Within a year, you'll be the highest-rated provider in your area.",
        cta: "Follow for more growth strategies that cost nothing but effort.",
    },
    {
        id: 'ORG-18',
        title: 'How We Build Trust Without Testimonials',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'question', text: "How do you build trust in healthcare marketing when you can't use patient testimonials? Here are 6 alternatives that work better." },
            { angle: 'contrarian', text: "Patient testimonials are overrated in healthcare marketing. These 6 trust signals convert HIGHER. Here's the data." },
            { angle: 'callout', text: "You can't use patient testimonials in most healthcare ads. Good. Because these 6 alternatives are more powerful anyway." },
        ],
        body: "Alternative 1 — Mechanism proof. Show HOW the treatment works. Brain scans. Neuroplasticity explanations. Clinical protocols. People trust the SCIENCE more than a stranger's opinion. Alternative 2 — Industry data. Response rates. Clinical studies. Published research. Numbers are harder to argue with than anecdotes. Alternative 3 — Competitor exposure. Instead of proving YOU'RE great, prove the alternatives are flawed. Alternative 4 — Process transparency. Show your intake process. Your treatment room. Your team preparing for a patient. Transparency builds trust. Alternative 5 — Founder story. WHO you are and WHY you do this matters more than what any patient says. Alternative 6 — Logical authority. Build arguments so clear and specific that your expertise is self-evident.",
        cta: "Follow for more creative trust-building strategies.",
    },

    // ── FOUNDER STORIES / ENGAGEMENT (19–25) ──────
    {
        id: 'ORG-19',
        title: 'My Predictions for 2026 Mental Health Market',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'stat', text: "Here are my 5 predictions for the mental health treatment market in 2026. Number 4 will surprise you." },
            { angle: 'question', text: "What does the mental health clinic landscape look like in 12 months? I've been studying the data. Here's what's coming." },
            { angle: 'contrarian', text: "Everybody's talking about AI in healthcare. That's prediction #5. Here are the 4 bigger shifts nobody's discussing." },
        ],
        body: "Prediction 1 — Consolidation. Large healthcare systems will acquire independent clinics that can't compete on marketing. The survivors will be clinics with strong patient acquisition systems. Prediction 2 — The SAINT protocol will become the new standard for TMS. 5 days instead of 6 weeks. Higher compliance. Higher satisfaction. Prediction 3 — Direct-to-consumer Spravato advertising will increase by 300%. Janssen is investing heavily. Ride the wave. Prediction 4 — Performance-based marketing will become the default. Retainer agencies will be seen as outdated within 2 years. Prediction 5 — AI personalization will make generic ads obsolete. Your creative will need to dynamically adapt to each patient's awareness level.",
        cta: "Follow to stay ahead of every shift in this market.",
    },
    {
        id: 'ORG-20',
        title: 'The Story Behind Livformor',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '80s',
        hooks: [
            { angle: 'story', text: "I named this company Livformor because every ketamine patient deserves more than surviving. Here's the whole philosophy." },
            { angle: 'question', text: "What does 'Livformor' mean for your clinic's patients? It's not a typo — it's a manifesto." },
            { angle: 'contrarian', text: "Every clinic agency has a clever name that means nothing. Ours means everything for your patients." },
        ],
        body: "Livformor. Live. For. More. The idea that every patient deserves more than surviving. More than existing. More than enduring day after day of numbness, darkness, hopelessness. They deserve to LIVE. For MORE. For their kids. For their passions. For experiences they've stopped imagining because depression stole their ability to imagine. That's what the clinics we serve provide — not a drug, not a treatment, but a second chance at living. And THAT's what we're marketing. Not ketamine. Not TMS. Not Spravato. We're marketing the possibility of living again. For more. Every ad we write, every funnel we build, every patient we connect with a clinic — it's a step toward someone living for more. That's why the company exists. That's why I exist in this work.",
        cta: "Follow if you believe everyone deserves to live for more.",
    },
    {
        id: 'ORG-21',
        title: 'Ask Me Anything: Clinic Marketing',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.DIRECT,
        outfit: 'B',
        duration: '45s',
        hooks: [
            { angle: 'command', text: "I'm opening up the comments for an AMA on mental health clinic marketing. Ask me anything — I'll answer every question." },
            { angle: 'question', text: "What's the ONE question about clinic marketing that keeps you up at night? Drop it in the comments. I'll answer." },
            { angle: 'callout', text: "Clinic owners: you have direct access to someone who does this every day. Use me. Drop your questions below." },
        ],
        body: "I've helped clinics go from zero to 60+ patients a month. I've analyzed dozens of failed marketing campaigns and identified exactly why they didn't work. I've studied the data on what converts in mental health marketing and what doesn't. And today, I'm opening up the comments for you to ask me ANYTHING about clinic marketing. Patient acquisition. Ad creative. Landing pages. SEO. Show rates. Team building. Pricing models. Agency selection. Nothing is off limits. The more specific your question, the more useful my answer. Drop it below.",
        cta: "Drop your question in the comments. I'll answer every single one.",
    },
    {
        id: 'ORG-22',
        title: 'My Controversial Marketing Opinions',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'B',
        duration: '65s',
        hooks: [
            { angle: 'contrarian', text: "I have 5 marketing opinions that make other agency owners uncomfortable. Here they are. No filter." },
            { angle: 'command', text: "Disagree with me in the comments. Here are my 5 most controversial takes on clinic marketing." },
            { angle: 'callout', text: "These 5 opinions have gotten me unfollowed by agency owners and followed by clinic owners. Worth the trade." },
        ],
        body: "Here are my five takes. Opinion 1 — If an agency charges a retainer, they should ALSO take performance risk. Skin in the game or get out. Opinion 2 — Your front desk should NOT be answering marketing leads. Full stop. Different skill set. Different incentives. Opinion 3 — Stock photos on your website cost you patients. Real photos or no photos. Opinion 4 — If your marketing company also does restaurants, they don't understand healthcare marketing. Period. Opinion 5 — Most clinics don't have a marketing problem. They have a SALES problem. They get leads and can't convert them. Fix conversion before you spend more on ads. Disagree? Let's discuss in the comments.",
        cta: "Which one do you disagree with? Drop it below.",
    },
    {
        id: 'ORG-23',
        title: 'Responding to Haters',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '65s',
        hooks: [
            { angle: 'story', text: "Someone commented 'Performance-based clinic marketing is a gimmick.' Let me respond publicly." },
            { angle: 'callout', text: "An agency owner said our ketamine clinic model 'can't scale.' Here's why he's wrong — and scared." },
            { angle: 'question', text: "Is performance-based marketing for your clinic too good to be true? Let's address the biggest criticism." },
        ],
        body: "The criticism: 'Performance-based marketing doesn't scale because the agency takes on too much risk.' Here's my response: We ELIMINATE risk through specialization. We only work with one niche — mental health treatment clinics. We know the exact CPA, show rate, and lifetime value for every modality. We've seen thousands of data points. We're not guessing — we're calculating. When you KNOW the numbers, you're not taking risk. You're making investments with predictable returns. The agencies that call our model risky are the same agencies that can't tell you their clients' average cost per patient. They're protecting their retainers. Not their clients. And the market is figuring that out.",
        cta: "Follow for more transparent conversations about marketing models.",
    },
    {
        id: 'ORG-24',
        title: 'What I Wish Clinic Owners Knew',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "After working with dozens of clinic owners, here are the 3 things I wish every one of them knew before they started." },
            { angle: 'story', text: "If I could go back and tell every new clinic owner 3 things before they opened — this is what I'd say." },
            { angle: 'question', text: "What's the one thing every clinic owner learns the hard way? Actually, there are 3. And they're all avoidable." },
        ],
        body: "Thing 1: Marketing isn't a cost — it's an investment. The clinic owners who see marketing as an expense cut it when things get tight. The ones who see it as an investment increase it when things get tight. Guess which group survives? Thing 2: Your team makes or breaks your marketing. The best ads in the world don't matter if your front desk can't convert a lead. Invest in your people as much as your marketing. Thing 3: Patience beats panic. Month 1 is never going to be your best month. The system needs data. The pixel needs training. The creative needs testing. The owners who commit to 90 days build machines. The ones who panic after 30 days restart from zero every quarter.",
        cta: "Follow for more hard-earned wisdom from the trenches.",
    },
    {
        id: 'ORG-25',
        title: 'This Is What We Stand For',
        category: SCRIPT_CATEGORIES.ORGANIC,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '75s',
        hooks: [
            { angle: 'story', text: "I'm ending this series the way I started — with why connecting patients to your clinic matters beyond business." },
            { angle: 'question', text: "What's the point of building a company if it doesn't help patients find your clinic? Here's what we stand for." },
            { angle: 'callout', text: "This isn't a pitch. This is a statement of purpose from someone who believes clinic marketing can be a force for good." },
        ],
        body: "We stand for the patient who has been failed by traditional medicine. Who has tried 5 medications and still feels empty. Who has lost hope. We stand for the clinic owner who built something meaningful but can't reach the people who need it. We stand for a marketing model where the agency CAN'T profit unless the clinic profits. Where incentives are aligned. Where accountability is built in. Where every dollar spent connects a suffering human with help that actually works. This isn't about marketing metrics. It's about closing the gap between people who need help and the clinics that can provide it. That gap is the biggest tragedy in mental health today. And closing it is the most important work I'll ever do.",
        cta: "Follow if this resonates. Share if someone needs to see it.",
    },
];

export const FILMING_ORDER = {
    note: 'Shoot order optimized for energy + outfit changes. Film highest-energy scripts first, intimate/story pieces last.',
    blocks: [
        {
            block: 0,
            label: 'Founder Voice Block — Outfit B/C (Casual / Personal)',
            duration: '~45 min',
            scripts: [
                'FV-01', 'FV-02', 'FV-03', 'FV-04', 'FV-05',
                'FV-06', 'FV-07', 'FV-08', 'FV-09', 'FV-10',
            ],
        },
        {
            block: 1,
            label: 'Power Block — Outfit A (Dark Suit)',
            duration: '~60 min',
            scripts: [
                'CP-01', 'CP-02', 'CP-03', 'CP-04', 'CP-05', 'CP-06', 'CP-07', 'CP-08',
                'CP-17', 'CP-18', 'CP-19', 'CP-20', 'CP-21', 'CP-26', 'CP-27',
                'CP-28', 'CP-29', 'CP-30', 'CP-31', 'CP-32', 'CP-33', 'CP-35',
                'CP-37', 'CP-38', 'CP-39', 'CP-40', 'CP-41', 'CP-46', 'CP-47', 'CP-50',
                'INS-01', 'INS-02', 'INS-05', 'INS-06', 'INS-08', 'INS-10',
                'INS-12', 'INS-14', 'INS-15', 'INS-16', 'INS-17', 'INS-19',
                'INS-20', 'INS-21', 'INS-23', 'INS-24', 'INS-25',
            ],
        },
        {
            block: 2,
            label: 'Authority Block — Outfit B (Smart Casual)',
            duration: '~45 min',
            scripts: [
                'CP-09', 'CP-10', 'CP-11', 'CP-12', 'CP-13', 'CP-14', 'CP-15', 'CP-16',
                'CP-22', 'CP-23', 'CP-24', 'CP-25', 'CP-34', 'CP-36', 'CP-42', 'CP-43',
                'INS-03', 'INS-04', 'INS-07', 'INS-09', 'INS-11', 'INS-13', 'INS-18', 'INS-22',
                'ORG-01', 'ORG-02', 'ORG-03', 'ORG-04', 'ORG-05', 'ORG-06', 'ORG-07',
                'ORG-08', 'ORG-09', 'ORG-10', 'ORG-11', 'ORG-13', 'ORG-14', 'ORG-15',
                'ORG-16', 'ORG-17', 'ORG-18', 'ORG-19', 'ORG-21', 'ORG-22',
            ],
        },
        {
            block: 3,
            label: 'Story Block — Outfit C (Relaxed / Personal)',
            duration: '~30 min',
            scripts: [
                'CP-44', 'CP-45', 'CP-48', 'CP-49',
                'ORG-12', 'ORG-20', 'ORG-23', 'ORG-24', 'ORG-25',
            ],
        },
    ],
    proTips: [
        'Film all scripts for one outfit before changing — saves 15+ min per change.',
        'Shoot high-energy stat-bombs and direct offers FIRST while energy is highest.',
        'Stories and intimate pieces LAST when you are naturally more reflective.',
        'Each script has 3-4 hook variations — film ALL hooks per script before moving on.',
        'Take 5-min breaks every 30 minutes to maintain energy and vocal quality.',
    ],
};


// ─────────────────────────────────────────────────────────────────────────────
// FOUNDER VOICE SERIES (FV-01–10)
// Raw, personal, confrontational — Oriel speaking directly to camera.
// NOT polished. NOT scripted-feeling. These are founder confessionals.
// Film casually. Eye contact. One cut or zero cuts. Real room, real energy.
// ─────────────────────────────────────────────────────────────────────────────
export const FOUNDER_VOICE_SCRIPTS = [

    // ── THE THREE-PROBLEMS SCRIPT (FV-01) ──────────────────────────────────
    {
        id: 'FV-01',
        title: 'The Three Reasons Your Clinic\'s Marketing Isn\'t Working',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.STORY,
        outfit: 'B',
        duration: '90s',
        hooks: [
            { angle: 'story', text: "I've spoken to over 40 ketamine clinics in the last 3 months. Most of them said the same thing: 'We got burned by an agency. Marketing doesn't work for us.' I didn't just accept that. I dug deeper. And I found three patterns that explained everything." },
            { angle: 'question', text: "If you've ever said 'marketing doesn't work for my clinic' — have you ever actually stopped to ask WHY it didn't work? Because it wasn't random. There were three specific reasons. And I'm going to tell you all three right now." },
            { angle: 'callout', text: "Ketamine clinic owners — I'm not surprised your marketing failed. I've talked to enough of you to know exactly why it did. Three reasons. Every time. Let me walk you through them." },
            { angle: 'contrarian', text: "I'm going to say something that most agencies won't: the reason your marketing failed probably wasn't the market. It wasn't the algorithm. It was three very specific, very fixable mistakes. And one of them might make you uncomfortable." },
        ],
        body: `So I've spoken to over 40 ketamine clinics in the past 3 months. A lot of them were burned. Disappointed. Done with marketing agencies. And I completely understand that. But I didn't want to just point at the agency and say they're bad and move on. I wanted to understand what actually happened.

So I dug deeper. And I saw the same three patterns, over and over.

PROBLEM ONE — the creative. The way these clinics were marketing was fundamentally wrong. They were running ads that said things like 'Breakthrough FDA-Approved Treatment for Depression.' And here's why that doesn't work. Your potential patients — they've already tried FDA-approved treatments. Multiple of them. Prescribed by their own psychiatrist. All of them failed. So when they see your ad screaming 'FDA-APPROVED TREATMENT' — what do they actually think? 'I've tried that. It didn't work for me. I'm treatment-resistant. This won't be different.' That's a BELIEF problem. You're not reaching them with facts. You need to break a belief first. And you can't break a belief with the same messaging everyone else is using.

PROBLEM TWO — the agency had no skin in the game. Whether the clinic got patients or not — it simply didn't matter to the agency financially. They got their $3,000, $4,000 retainer either way. If the clinic left, fine. They'd just sign another one. And that's fundamentally broken. When someone doesn't feel your pain, they can't fix your problem.

PROBLEM THREE — what happened AFTER the lead. Let's say the patient actually got through a bad ad. They were desperate enough for a solution that they left their details. They had a little bit of hope. And then the clinic called them back — 24 hours later. Or just sent a generic email. How do you think that patient felt? These are people who've been suffering for years. They reached out at a moment of peak courage. And nobody showed up fast enough. As clinicians, you're supposed to have empathy at the core of what you do. Speed to respond IS empathy.

So how do we solve this? We are an agency — and I know that word might have bad connotations for you right now. But here's what's different: we only get paid when patients show up. Not per lead. Per patient in your chair. That's the skin-in-the-game part. Now there is a catch. We work with established clinics — minimum $100 a day in ad spend, willingness to follow the system, and openness to a model you haven't tried before.

Because here's the truth: the ketamine market is going to double in the next six years. That's backed by research. New clinics are opening every month. And there are basically two options. You build a system now, with the right partner, and you own your market. Or you keep blaming the algorithm, and one day you look up and someone else is treating the patients you should have been treating.

Patients need you. Whether you believe that or not — they need you. And whether you're there for them or someone else is — that's entirely on the decisions you make today.`,
        cta: "Tap the link in bio. 4 questions. If you're a fit, let's talk.",
    },

    // ── INCENTIVE AUDIT (FV-02) ────────────────────────────────────────────
    {
        id: 'FV-02',
        title: 'I\'m Not Surprised Your Clinic\'s Marketing Failed',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.PAS,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'contrarian', text: "I'm not surprised that cash-pay ketamine clinics are failing with their marketing. And I'm going to tell you exactly why." },
            { angle: 'callout', text: "Most ketamine clinics that try marketing and fail — it wasn't bad luck. It was a predictable outcome. And I can explain exactly what created it." },
            { angle: 'story', text: "Every time I hear a ketamine clinic owner say 'marketing doesn't work' — I ask the same question: 'What did your agency actually track?' The answer tells me everything." },
            { angle: 'question', text: "Ketamine clinic owners — be honest. When your agency sent you the monthly report, could you tell me how many of those leads actually sat in your chair? Most can't. That's the whole problem." },
        ],
        body: `Here's why it's predictable. The agency doesn't care about the same number you care about. You care about patients in chairs. They care about leads in spreadsheets. Those are fundamentally different metrics — and they lead to fundamentally different behaviors.

The agency optimizes for the number THEY report on. Which is leads. Cost per lead. Click-through rate. Impressions. All things that look good on a PDF and have nothing to do with your bank account.

Meanwhile, you're writing a $4,000 check every month, getting a green report, and somehow your chairs are still half-empty.

That's not a bad agency. That's a broken incentive structure.

When your marketing partner's income is disconnected from your patient count — you will always be optimizing for different goals. And you will always be disappointed.

The fix isn't a new agency. The fix is changing whose financial interest is tied to whether a patient shows up.

Ours is. Completely. We make $0 if we deliver no qualified inquiries. We make $99 per qualified inquiry delivered. Our entire business is aligned with yours. That's not a pitch. That's why it works.`,
        cta: "Link in bio to see if your clinic qualifies.",
    },

    // ── THE BELIEF PROBLEM (FV-03) ──────────────────────────────────────────
    {
        id: 'FV-03',
        title: 'FDA-Approved Does NOT Work as a Hook (Here\'s Why)',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'contrarian', text: "'FDA-Approved Treatment for Depression.' If that's what your ketamine clinic's ads say — I want to explain why that specific phrase is actively costing you patients." },
            { angle: 'story', text: "A ketamine clinic was running a $5,000 a month campaign with 'FDA-Approved Breakthrough Treatment for Depression' as the hook. The leads were garbage. Not because the treatment wasn't real — because the MESSAGE created a belief problem in the exact people who needed it most." },
            { angle: 'question', text: "Ketamine clinic owners — have you ever thought about what your potential patient has already been through before they see your ad? Because if you had — you would never say 'FDA-approved treatment' in your hook again." },
            { angle: 'callout', text: "The single most common creative mistake I see ketamine clinics make: leading with 'FDA-Approved.' Here's the psychology of why that kills your conversion rate." },
        ],
        body: `Think about who your patient is before they see your ad. They've been suffering from depression — sometimes for years. They've seen a psychiatrist. They've been prescribed medication — FDA-approved medication. Multiple times. None of it worked. They've been labeled 'treatment-resistant.'

Now they're scrolling Instagram or Facebook. And they see your ad that says 'NEW FDA-APPROVED TREATMENT FOR DEPRESSION.'

What do they think?

'I've tried FDA-approved treatments. Four of them. My own psychiatrist prescribed them. None of them worked. I'm treatment-resistant. This probably won't be different.'

You created a belief problem. With your own hook. Before they even watched the ad.

The person who most needs ketamine therapy is the most skeptical of your ad — because you're using the same language that failed them before.

So what do you do instead? You meet them where they are. You acknowledge what they've already tried. You explain the MECHANISM of why ketamine is different at a neurological level. You show them proof from people who looked exactly like them.

You don't need a bigger budget. You need a different message. One built for the belief state of a treatment-resistant patient — not a first-time medication user.

That's what we build. And it's why our ads actually convert.`,
        cta: "Ketamine clinic owners — link in bio. 4 questions. Let's look at what your ads are actually communicating.",
    },

    // ── 100K MISSION (FV-04) ────────────────────────────────────────────────
    {
        id: 'FV-04',
        title: 'Why I\'m Doing This — The 100,000 People Mission',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STORY,
        outfit: 'C',
        duration: '80s',
        hooks: [
            { angle: 'story', text: "I have a goal. It's a big one. I want to help 100,000 people beat depression — people who've tried everything and were told there's nothing left. And I figured out that the only way to get there was to help the clinics that treat them. So that's what I do." },
            { angle: 'question', text: "What would it look like if 100,000 people who were told they were treatment-resistant — who'd given up on ever feeling okay again — actually found a treatment that worked? I think about that number every day. And it's why I started this company." },
            { angle: 'callout', text: "There are millions of people with treatment-resistant depression who haven't heard of ketamine therapy. And there are hundreds of qualified clinics that could help them — but can't find them. That gap is the entire reason I do what I do." },
            { angle: 'contrarian', text: "I didn't start a healthcare marketing company because I love marketing. I started it because I figured out that the bottleneck between a treatment-resistant patient and a clinic that could change their life — wasn't the treatment. It was the marketing. So I fixed the marketing." },
        ],
        body: `I'll be honest with you about why I do this.

I've spoken to clinic owners who are genuinely changing people's lives. Patients who'd been suicidal. Patients who hadn't gotten out of bed in two years. Patients who had tried every medication their psychiatrist could offer — and nothing worked. And then they found ketamine therapy. And something shifted.

Those stories stay with me.

And the more clinics I talked to, the more I realized something: the bottleneck between those patients and the treatment wasn't clinical. The treatments exist. The qualified people to administer them exist. The FDA clearances exist.

The bottleneck was marketing. Specifically — the right patients not knowing these clinics exist, and the clinics not being able to find them in a way that's financially sustainable.

That's the gap I decided to fix.

My goal is to help clinics collectively reach 100,000 people who've been labeled treatment-resistant and told there's nothing left for them. People who've given up on feeling okay again. People who need something different.

I don't get paid unless a patient shows up. Which means every patient who walks through your door — that's a person we reached together.

This isn't about clicks. This isn't about leads. This is about 100,000 people who need a different option.

If you run a ketamine, TMS, or Spravato clinic — and that mission resonates with you — I'd like to talk.`,
        cta: "Tap the link in bio. 4 questions. Let's figure out if we can build something that matters.",
    },

    // ── SKIN IN THE GAME (FV-05) ────────────────────────────────────────────
    {
        id: 'FV-05',
        title: 'I Built a Business I Can\'t Escape If I Underperform',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.STORY,
        outfit: 'B',
        duration: '75s',
        hooks: [
            { angle: 'story', text: "I'm going to be honest with you about the business I built: if I don't deliver patients to your clinic, I make zero. Literally zero. There's no retainer to fall back on. No contract to hold. We eat what we kill. I built it this way on purpose — and I'm going to tell you why." },
            { angle: 'contrarian', text: "Most agency owners sleep fine at night whether their clients got results or not. Because the retainer hit the account either way. I can't do that. I built a company where I can't afford to be bad at my job. And here's why I think that's the only way to run this thing." },
            { angle: 'question', text: "What happens to your marketing quality when the person running your ads financially NEEDS your patients to show up — not just wants it, not just cares about it — but literally cannot pay their own bills if they don't? I'm going to tell you what happens. And why I structured things that way." },
            { angle: 'callout', text: "Ketamine and TMS clinic owners — the reason you've been burned by agencies is simple: their financial model allowed them to underperform without consequences. Mine doesn't. Let me tell you what that actually looks like in practice." },
        ],
        body: `Here's the truth about how I built this.

We don't charge retainers. We charge $99 per qualified inquiry — a real, pre-screened, cash-pay prospect who meets the standard you defined before we started.

I don't have another revenue stream. No consulting packages. No 'brand strategy' add-on. No setup fee. If your patients don't show up — I don't eat.

I'm not telling you that to impress you. I'm telling you because it changes EVERYTHING about how we work.

Every ad we write matters to me personally. Every lead that doesn't convert is money I didn't make. Every patient that ghosts after booking — I feel that. Not as a metric. As lost income.

That's what skin in the game actually means. Not 'we care about your results.' Not 'we're passionate about healthcare.' It means: our revenue is mathematically connected to your patient count. Full stop.

When I get on a call with a clinic, I'm not trying to sell them. I'm trying to figure out if I can actually help them. Because if I can't — taking them on costs me money and time I don't have.

I cap at 6 clinics per month. Not because I can't handle more operationally. Because I can't afford to dilute my attention across a portfolio where I get paid whether they win or not.

That's the model. And if it resonates — link in bio.`,
        cta: "4 questions in bio. 60 seconds. Let's see if we're a fit.",
    },

    // ── CREATIVE DIFFERENTIATION (FV-06) ───────────────────────────────────
    {
        id: 'FV-06',
        title: 'Why Every Ketamine Clinic Looks Identical (And What to Do)',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.EDUCATIONAL,
        outfit: 'A',
        duration: '70s',
        hooks: [
            { angle: 'callout', text: "I analyzed the ads of over 100 ketamine and TMS clinics. What I found was embarrassing. Most of them are running the exact same ad. Same stock image. Same 'FDA-approved' copy. Same messaging that doesn't convert. Here's what's actually happening — and what to do instead." },
            { angle: 'contrarian', text: "Most ketamine clinic marketing looks identical. Not because clinic owners are lazy — because their agencies use the same template for every client. And when you look like everyone else, you convert like no one." },
            { angle: 'story', text: "A clinic owner showed me her ads last month. Stock photos. Generic copy. Same messaging as 30 other clinics. She was paying $5K a month and seeing 2 new patients. I told her the truth: your ad isn't distinguishing you from anyone. It's making you invisible." },
            { angle: 'question', text: "Ketamine clinic owners — if I showed your patient a list of 5 ketamine clinic ads including yours, could they identify which one was you? If the answer is no — what does that tell you about how your marketing is actually performing?" },
        ],
        body: `I looked at the ads of over 100 clinics in this space. And what I saw was alarming.

The same stock photos. Woman holding a serotonin molecule. Brain scan images. Smiling doctor in a white coat next to a generic quote about healing. And the same messaging — 'FDA-approved treatment for depression.' Every. Single. One.

'Creative inflation' is what happens in advertising when too many brands in the same space use the same messaging. People's brains learn to skip it automatically. You're not just competing — you're invisible before the patient even processes what you said.

And here's what makes it worse for ketamine clinics specifically: your patients are treatment-resistant. They've seen healthcare marketing before. They responded to it before. And it let them down. So they're MORE skeptical, not less. Your creative has to break through twice as hard — not blend in.

The fix? Your face. Your clinic. Your voice. A video where you — the actual clinician or owner — look at the camera and speak directly to someone who's tried everything and is starting to lose hope. Not a stock photo. Not recycled messaging. YOUR perspective on WHY this works when everything else didn't.

That's ultimately what makes people book. And once you have that creative — you need a system to turn belief into patients. That's what we build.`,
        cta: "Ketamine and TMS clinic owners — link in bio. Let's look at what your ads are actually communicating.",
    },

    // ── SPEED TO LEAD = EMPATHY (FV-07) ────────────────────────────────────
    {
        id: 'FV-07',
        title: 'You Called Them Back in 24 Hours. They\'d Already Closed the Door.',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.STORY,
        outfit: 'B',
        duration: '70s',
        hooks: [
            { angle: 'story', text: "Someone filled out your clinic's form at 11 PM last Tuesday. They were scared. They'd been suffering for three years. They finally told themselves — maybe I'll try this. Your front desk called them back at 2 PM Wednesday. By then, the moment was gone." },
            { angle: 'callout', text: "Ketamine clinic owners — the leads you're writing off as 'low quality' are probably not low quality. They're leads who needed you within 5 minutes and waited 24 hours for a callback. There's a difference." },
            { angle: 'question', text: "When a treatment-resistant patient fills out your intake form — what's going through their mind in that exact moment? And what happens to that state of mind if nobody follows up until the next day? Because I can tell you — the window closes fast." },
            { angle: 'contrarian', text: "Most ketamine clinic owners think bad leads are an ad problem. They're not. They're a response-time problem. The same lead, contacted in 5 minutes vs 24 hours, behaves like a completely different person. Here's why." },
        ],
        body: `Here's what that person is going through when they fill out your form.

They've probably been in treatment for depression for years. Multiple medications. Each one promising something. Each one failing. Their psychiatrist told them they're treatment-resistant. They'd maybe accepted that this is just how their life is.

And then, late at night, they saw something about ketamine therapy. And something in them said — maybe. MAYBE. So they filled out the form. On peak courage. Peak openness.

That state doesn't last.

Five minutes later, doubt starts to creep in. 'What if this is just another thing that doesn't work?' Ten minutes later, they're back on their phone. Thirty minutes later, the courage window is basically closed. Twenty-four hours later? They're embarrassed they filled it out. Or they've booked somewhere else.

The research says contacting a lead within 5 minutes makes you 100x more likely to connect. That's a real number. And in this specific context — with this specific patient population — the emotional arc makes it even more profound.

As clinicians — you understand empathy. You've trained to be there for people in their most vulnerable moments.

Speed to lead IS empathy.

If someone raised their hand for help and you took 24 hours to acknowledge it — that has a clinical and emotional consequence. Not just a marketing one.

We build speed-to-lead systems. ISA teams. 5-minute response windows. Because we care about what happens after the lead, not just before it.`,
        cta: "Link in bio to see the full system. 4 questions. 60 seconds.",
    },

    // ── THE BINARY CHOICE (FV-08) ───────────────────────────────────────────
    {
        id: 'FV-08',
        title: 'Two Clinics — One Built a System, One Blamed the Market',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.BELIEF_BRIDGE,
        outfit: 'A',
        duration: '75s',
        hooks: [
            { angle: 'contrarian', text: "The ketamine market is going to double by 2030. That's backed by research. New clinics will open. Demand will grow. And for YOUR clinic — that creates exactly two futures. I'm going to describe both of them." },
            { angle: 'story', text: "I talked to two ketamine clinic owners last month. Same city. Same market. One was seeing 40 new patients a month. One was seeing 4. The market was identical. The difference was a system." },
            { angle: 'question', text: "Ketamine and TMS clinic owners — when your market doubles in the next 6 years, which clinic captures most of that demand? The one that built an acquisition system now, or the one that's still figuring it out?" },
            { angle: 'callout', text: "Ketamine clinic owners — the market is growing. But growing markets attract more competition. The clinics that build their patient acquisition system FIRST will own the economics for the next decade." },
        ],
        body: `BEFORE — You're running a ketamine or TMS clinic in 2025. The market is growing. There's real demand. But you're still struggling to convert that demand into consistent patient volume. You've tried agencies. Maybe it worked a little. Maybe it didn't. And you're not sure what to do next.

AFTER — It's 2027. The clinic that built an acquisition system — trained pixel, optimized creative, speed-to-lead in 5 minutes, ISA team that converts — is seeing 50-60 new patients a month at a cost per patient that goes DOWN every month because the data compounds. The clinic that waited is now competing in a more expensive ad market, with less data advantage, and paying 2-3x more for the same patient.

THE BRIDGE — There are two options in front of every ketamine and TMS clinic right now. Build the system with a partner who has skin in the game and figure it out together. Or blame the algorithm, blame the leads, blame the market — and one day look up and realize someone else is treating the patients you should have been treating.

Patients need these clinics. That's not marketing speak. That's a clinical reality. These are people who've run out of treatment options inside the conventional healthcare system.

Whether your clinic is there for them — that's entirely on the decisions you make today.`,
        cta: "Tap the link in bio. 4 questions. Let's build the system.",
    },

    // ── THE AGENCY WORD (FV-09) ─────────────────────────────────────────────
    {
        id: 'FV-09',
        title: 'I Know \'Agency\' Is a Bad Word For You. Here\'s Why We\'re Different.',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.SOLUTION,
        framework: FRAMEWORKS.OCPB,
        outfit: 'C',
        duration: '70s',
        hooks: [
            { angle: 'story', text: "Every time I say the word 'agency' on a call with a ketamine clinic owner — I watch their face change. Their eyes go flat. I get it. They've been burned. So let me explain why the word is right but the model is completely different." },
            { angle: 'callout', text: "Ketamine clinic owners — I know the word 'agency' carries baggage. I understand why. So I'm going to spend the next 60 seconds explaining exactly how our model is structurally different from every agency that burned you." },
            { angle: 'contrarian', text: "The agency model is broken. I agree. I've talked to 40 clinic owners who got burned by it. But the problem wasn't the agency itself — it was the incentive structure. Remove the retainer, replace it with per-patient pricing, and everything changes." },
            { angle: 'question', text: "Ketamine clinic owners — what specifically about agencies burned you? Bad results? No accountability? Green reports with empty chairs? None of those things are possible when your vendor's income is $0 unless a patient shows up." },
        ],
        body: `OBJECTION — 'You're an agency. I've been burned by agencies. Why would this be different?'

I completely understand that. And I'm not going to try to talk you out of your skepticism.

CLAIM — The difference is structural, not philosophical. We don't charge retainers. We don't have monthly minimums. We make $99 per qualified inquiry delivered. That's it. Our entire revenue depends on your patient count.

PROOF — Think about what that means operationally. Every ad we write either generates a patient or costs us money. Every lead that doesn't convert is revenue we didn't make. Every follow-up system we build has a direct financial consequence if it fails. We have no financial cushion between us and underperformance. None.

BENEFIT — That's not clever marketing speak. That's a structural reality that changes how we work, what we prioritize, and how we treat your accounts every single day. When you make money, we make money. When you don't — we don't. That's the only partnership structure that should ever exist in this space.

I know 'agency' is a bad word for you. Call us a performance partner, a growth partner, whatever. The structure is what matters. And the structure is the most clinic-aligned arrangement in this industry.`,
        cta: "Link in bio. 4 questions. 60 seconds. See if we're what we say we are.",
    },

    // ── THE COST OF WAITING (FV-10) ─────────────────────────────────────────
    {
        id: 'FV-10',
        title: 'What Happens If You Wait Another Quarter',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.MOST,
        framework: FRAMEWORKS.PAS,
        outfit: 'A',
        duration: '65s',
        hooks: [
            { angle: 'callout', text: "Ketamine clinic owners — I want to tell you what the next 90 days look like if you don't change anything about how you're acquiring patients. Because I've seen it play out enough times to describe it accurately." },
            { angle: 'question', text: "If your current patient acquisition system doesn't change — what's your clinic's patient count going to look like in Q3? Because I can tell you with some confidence what the math produces." },
            { angle: 'contrarian', text: "The most expensive decision a ketamine or TMS clinic makes isn't a bad agency contract. It's waiting. Because while you're waiting, someone else in your market isn't." },
            { angle: 'story', text: "A ketamine clinic owner told me last month: 'I've been thinking about fixing my marketing for 6 months.' I told him: 'I saw your competitor launch 3 months ago. They're at 35 patients a month. The market you're in is already getting competed.'" },
        ],
        body: `Here's what the cost of waiting actually looks like — not emotionally, but mathematically.

Every month you're running at 10 patients when a system could have you at 30 — that's 20 patients you didn't see. At $3,000 to $5,000 average revenue per patient — that's $60,000 to $100,000 in revenue you didn't generate. In a single month.

Do that across a quarter and you start to understand the actual cost of inaction.

And that's before you factor in competitive dynamics. The ketamine and TMS market is growing fast. New clinics are opening. Existing clinics are starting to run ads. The ones that build their acquisition systems FIRST get the cheapest data. The best-trained pixels. The lowest cost per patient. And a compounding advantage that gets harder to overcome every month.

I'm not saying this to manufacture urgency. I'm saying it because I've watched it happen. I've talked to clinics in markets where a competitor launched 4 months ago and is already dominant. And the clinic that waited is now paying 2x more per patient for second position in the same market.

Waiting isn't neutral. It's expensive. And it compounds.

If you're ready to stop waiting — link in bio.`,
        cta: "Tap the link. 4 questions. 60 seconds. Let's stop the clock on waiting.",
    },

    // ── MISSION + PURPOSE: THE VACUUM (FV-11) ──────────────────────────────
    {
        id: 'FV-11',
        title: 'The Vacuum In The Market (And Why It\'s Your Fault)',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.UNAWARE,
        framework: FRAMEWORKS.STORY,
        outfit: OUTFITS.CASUAL,
        duration: '60–90s',
        hooks: [
            { angle: 'Confrontation', text: 'Most ketamine and TMS clinic owners are losing patients right now — and they think it\'s the market\'s fault.' },
            { angle: 'Reframe', text: 'There\'s a vacuum in the ketamine clinic market. And the clinics sitting in it don\'t even know they\'re in it.' },
            { angle: 'Mission', text: 'We\'re trying to help 100,000 people beat depression. And we can\'t do that if the clinics that treat them can\'t market themselves.' },
            { angle: 'Provocative', text: 'Your agency didn\'t fail you. You failed yourself by not understanding why the marketing wasn\'t working.' },
        ],
        body: `Here's the truth that nobody in this industry wants to say out loud:

Most cash-pay ketamine and TMS clinics are struggling — and they don't know it's their own fault.

I've talked to clinic owners who spent $5,000, $10,000, $20,000 with marketing agencies. Got almost nothing back. And their conclusion was: "Marketing doesn't work for us."

That's wrong. And it's dangerous.

Here's what actually happened:

The agency ran generic ads. "FDA-approved treatment." "Our clinic has helped hundreds of patients." Broad targeting. Competitor-copy creative. The same hooks every SaaS company would use — on a patient who has been failed by every medication they've ever tried. Who doesn't believe anything works anymore. Who wouldn't click "FDA Approved" if you paid them.

The messaging didn't meet the patient where they were. It talked PAST the belief problem.

And then the agency kept collecting their $3,000 retainer. Month after month. Because they get paid whether or not you get patients. That's not partnership. That's payroll with a logo.

So the clinic owner concluded: marketing doesn't work. And they went back to word-of-mouth. Back to waiting.

Meanwhile, depression is not waiting.

Right now, in 2026, anxiety and depression are at levels this country has never seen. The news cycle is destroying people's sense of safety. AI is making people feel obsolete. Wars are making people feel hopeless. The mental health crisis isn't a trend — it's a collapse happening in slow motion.

And treatment-resistant patients — the people who have tried five medications and nothing worked — they're running out of options. They're running out of hope.

Ketamine and TMS are not nice-to-haves. They are lifelines.

So when a clinic can't get patients through the door — when their marketing fails — that's not just a revenue problem. That's a patient that didn't get help. That's a life that stayed stuck.

This is why I believe that running effective marketing for ketamine and TMS clinics is one of the most important jobs in healthcare right now. Not because it sounds good. Because the gap between people who need this help and clinics that can provide it — that gap is a tragedy.

Our goal is to help 100,000 people beat treatment-resistant depression, anxiety, PTSD, and the other conditions that have stolen their lives.

That's not a tagline. That's why we built this.

And here's what we offer: if we don't help you grow — if we don't put real patients in your chairs — you don't pay us. No retainer. No monthly fees. Performance only.

Because our mission only works if yours does.

If you own a ketamine or TMS clinic and you understand this — if you see the gap and you want to help close it — link is in the bio.`,
        cta: "Click the link. Qualifying clinics only. Let's see if we're a fit.",
    },

    // ── THE MARKETING DIAGNOSTIC (FV-12) ───────────────────────────────────
    {
        id: 'FV-12',
        title: 'The 4-Question Marketing Test For Ketamine & TMS Clinics',
        category: SCRIPT_CATEGORIES.FOUNDER,
        awareness: AWARENESS_LEVELS.PROBLEM,
        framework: FRAMEWORKS.EDUCATION,
        outfit: OUTFITS.CASUAL,
        duration: '60–90s',
        hooks: [
            { angle: 'Diagnostic', text: 'Quick test: is your ketamine or TMS clinic\'s marketing destined to fail? Four questions. Be honest.' },
            { angle: 'Challenge', text: 'If you own a ketamine or TMS clinic, run this checklist. Most owners fail at least three of four.' },
            { angle: 'Direct', text: 'I\'m going to tell you exactly why your clinic\'s marketing isn\'t working — in four questions.' },
            { angle: 'Curiosity', text: 'There are four things that determine whether a ketamine or TMS clinic grows or stagnates. Here\'s how to know which one you are.' },
        ],
        body: `Quick test. Four questions. Be honest with yourself.

Question one: What does your ad actually say?

Are you running "FDA-approved treatment for depression"? "Our clinic has helped hundreds of patients"? Generic stock photo of a smiling person?

Or are you using psychology? Stories? Patient analogies? Data that breaks the belief that SSRIs are the only option? Are you creating content that meets a treatment-resistant patient where they actually are — someone who has tried five medications and given up hope?

Because one of those creates curiosity. The other creates scroll-bys.

Question two: What does your content look like?

Are you showing up on video — your face, your voice, your authority — or are you hiding behind a logo? Are you on platforms where awareness ads actually work — TikTok, Reels, YouTube — or are you only running search ads to people who already know they want ketamine?

Patients don't trust a clinic they've never seen. They trust a face. They trust a doctor who shows up in their feed and actually explains what's happening in their brain.

Question three: How fast do you call your leads?

If a potential patient fills out your form at 10pm on a Tuesday, when do they hear from you?

A treatment-resistant patient who finally works up the courage to ask for help is in the most open window of their life — and that window closes fast. If you're calling them back 24 hours later, they've already convinced themselves it won't work. They've already talked themselves out of it.

Speed-to-lead isn't a sales tactic. It's empathy. The faster you respond, the more they feel seen.

Question four: Are you making it easy to experience the treatment?

Or are you leading with $4,000 for a six-session protocol before a patient has ever felt what ketamine actually does?

Think about it differently. If you charged $190 for a single first session — let them experience it, let them feel the shift — how many of those patients would book the full protocol? Because we already know what this treatment does. We know how transformational it can be. The first session sells the rest, if you let it.

Here's the bottom line:

There's nothing wrong with the market. There's nothing wrong with Facebook. There's nothing wrong with Google or TikTok or any platform. There are more people being diagnosed with depression right now than at any point in history. The demand is there. It's growing. The country is more divided than ever. People are hurting. And they need what you have.

The question is whether you have the right pieces in place to reach them.

If you answered honestly and you know you're missing one of these — or all four — that's not a market problem. That's a solvable problem.

Our goal is to help 100,000 people beat treatment-resistant depression, anxiety, PTSD, and the conditions that have taken their lives from them. We do that by helping the clinics that treat them actually grow.

If that's your vision too — if you're willing to put in the work — leave your details below. Let's see if we can build this together.`,
        cta: "Link in bio. Four questions. Tell us about your clinic. We'll take it from there.",
    },
];

// ─────────────────────────────────────────────────
// COMBINED EXPORTS
// ─────────────────────────────────────────────────
export const ALL_SCRIPTS = [
    ...CASH_PAY_SCRIPTS,
    ...INSURANCE_SCRIPTS,
    ...ORGANIC_SCRIPTS,
    ...FOUNDER_VOICE_SCRIPTS,
];
