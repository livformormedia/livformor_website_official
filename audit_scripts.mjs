import { ALL_SCRIPTS } from './src/data/scripts.js';
import fs from 'fs';

try {
    console.log('Loaded scripts:', ALL_SCRIPTS.length);

    const nicheWords = ['ketamine', 'tms', 'spravato', 'clinic', 'patient', 'treatment', 'mental health', 'depression'];

    const audit = ALL_SCRIPTS.map(s => {
        const hooks = s.hooks || (s.hook ? [{ angle: 'default', text: s.hook }] : []);
        const hookTexts = hooks.map(h => h.text);
        const bodyText = s.body || '';
        const allHookText = hookTexts.join(' ').toLowerCase();
        const bodyLower = bodyText.toLowerCase();

        const nicheInHooks = nicheWords.filter(w => allHookText.includes(w));
        const nicheInBody = nicheWords.filter(w => bodyLower.includes(w));

        const addressesProspect = allHookText.includes('you') || allHookText.includes('your') || allHookText.includes('clinic') || allHookText.includes('ketamine') || allHookText.includes('tms');

        const genericStatHook = hookTexts.some(h => {
            const hl = h.toLowerCase();
            return (hl.includes('billion') || hl.includes('million') || hl.includes('doubles') || hl.includes('market size') || hl.includes('study shows')) &&
                !hl.includes('your') && !hl.includes('you') && !hl.includes('clinic');
        });

        const extractThemes = (text) => {
            const t = text.toLowerCase();
            const themes = [];
            if (t.includes('patient')) themes.push('patients');
            if (t.includes('lead')) themes.push('leads');
            if (t.includes('marketing') || t.includes('agency')) themes.push('marketing');
            if (t.includes('competition') || t.includes('competitor') || t.includes('market')) themes.push('competition');
            if (t.includes('roi') || t.includes('revenue') || t.includes('profit') || t.includes('money')) themes.push('revenue');
            if (t.includes('trust') || t.includes('belief') || t.includes('believ') || t.includes('authentic')) themes.push('trust');
            if (t.includes('video') || t.includes('content') || t.includes('film') || t.includes('camera')) themes.push('content');
            if (t.includes('referral') || t.includes('word of mouth')) themes.push('referrals');
            if (t.includes('calendar') || t.includes('chair') || t.includes('empty') || t.includes('slot')) themes.push('capacity');
            if (t.includes('insurance') || t.includes('cash pay') || t.includes('cash-pay') || t.includes('out-of-pocket')) themes.push('payment');
            if (t.includes('testimonial') || t.includes('success stor') || t.includes('social proof')) themes.push('social_proof');
            if (t.includes('90 day') || t.includes('long-term contract') || t.includes('excuse') || t.includes('burnt')) themes.push('agency_pain');
            return themes;
        };

        const hookThemes = extractThemes(allHookText);
        const bodyThemes = extractThemes(bodyLower);
        const sharedThemes = hookThemes.filter(t => bodyThemes.includes(t));
        const congruency = hookThemes.length > 0 ? Math.round((sharedThemes.length / hookThemes.length) * 100) : 100;

        const issues = [];
        if (nicheInHooks.length === 0) issues.push('NO_NICHE_IN_HOOKS');
        if (!addressesProspect) issues.push('DOESNT_ADDRESS_PROSPECT');
        if (genericStatHook) issues.push('GENERIC_STAT_HOOK');
        if (congruency < 50 && hookThemes.length > 0) issues.push('LOW_CONGRUENCY');
        if (hookTexts.some(h => h.length > 130)) issues.push('HOOK_TOO_LONG');

        return {
            id: s.id,
            title: s.title,
            cat: s.category,
            hc: hooks.length,
            hook1: hookTexts[0]?.substring(0, 120),
            body1: bodyText.substring(0, 120),
            nih: nicheInHooks.length,
            nib: nicheInBody.length,
            ap: addressesProspect,
            gs: genericStatHook,
            cong: congruency,
            ht: hookThemes.join(', '),
            bt: bodyThemes.join(', '),
            issues: issues.join(', '),
            ic: issues.length
        };
    });

    const total = audit.length;
    const withIssues = audit.filter(a => a.ic > 0);
    const noNiche = audit.filter(a => a.issues.includes('NO_NICHE'));
    const noProspect = audit.filter(a => a.issues.includes('DOESNT_ADDRESS'));
    const genericStat = audit.filter(a => a.issues.includes('GENERIC_STAT'));
    const lowCong = audit.filter(a => a.issues.includes('LOW_CONGRUENCY'));
    const tooLong = audit.filter(a => a.issues.includes('TOO_LONG'));

    console.log('\\n=== AUDIT SUMMARY ===');
    console.log('Total scripts:', total);
    console.log('Scripts with issues:', withIssues.length);
    console.log('  NO_NICHE_IN_HOOKS:', noNiche.length);
    console.log('  DOESNT_ADDRESS_PROSPECT:', noProspect.length);
    console.log('  GENERIC_STAT_HOOK:', genericStat.length);
    console.log('  LOW_CONGRUENCY:', lowCong.length);
    console.log('  HOOK_TOO_LONG:', tooLong.length);

    withIssues.sort((a, b) => b.ic - a.ic);

    const critical = withIssues.filter(a => a.ic >= 3);
    const moderate = withIssues.filter(a => a.ic === 2);
    const minor = withIssues.filter(a => a.ic === 1);

    console.log('\\n=== CRITICAL (3+ issues) ===');
    critical.forEach(s => {
        console.log(`[${s.id}] ${s.title}`);
        console.log(`  ${s.issues}`);
        console.log(`  Hook: "${s.hook1}"`);
    });

    console.log('\\n=== MODERATE (2 issues) ===');
    moderate.forEach(s => {
        console.log(`[${s.id}] ${s.title}`);
        console.log(`  ${s.issues}`);
        console.log(`  Hook: "${s.hook1}"`);
    });

    console.log('\\n=== MINOR (1 issue) ===');
    minor.forEach(s => {
        console.log(`[${s.id}] ${s.title}`);
        console.log(`  ${s.issues}`);
        console.log(`  Hook: "${s.hook1}"`);
    });

    fs.writeFileSync('/tmp/script_audit.json', JSON.stringify(audit, null, 2));
    console.log('\\nSaved /tmp/script_audit.json');

} catch (e) {
    console.error('ERROR:', e.message);
    console.error(e.stack);
}
