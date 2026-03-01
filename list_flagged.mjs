import { ALL_SCRIPTS } from './src/data/scripts.js';

const nicheWords = ['ketamine', 'tms', 'spravato', 'clinic', 'patient', 'treatment', 'mental health', 'depression'];

const flagged = ALL_SCRIPTS.filter(s => {
    const hooks = s.hooks || (s.hook ? [{ angle: 'default', text: s.hook }] : []);
    const hookTexts = hooks.map(h => h.text);
    const allHookText = hookTexts.join(' ').toLowerCase();

    const nicheInHooks = nicheWords.filter(w => allHookText.includes(w));
    const addressesProspect = allHookText.includes('you') || allHookText.includes('your') || allHookText.includes('clinic') || allHookText.includes('ketamine') || allHookText.includes('tms');

    const genericStatHook = hookTexts.some(h => {
        const hl = h.toLowerCase();
        return (hl.includes('billion') || hl.includes('doubles') || hl.includes('market size')) && !hl.includes('your') && !hl.includes('you') && !hl.includes('clinic');
    });

    return nicheInHooks.length === 0 || !addressesProspect || genericStatHook;
});

flagged.forEach(s => {
    const hooks = s.hooks || [];
    console.log('---');
    console.log('ID:', s.id);
    console.log('TITLE:', s.title);
    console.log('HOOKS:');
    hooks.forEach(h => console.log('  [' + h.angle + ']', h.text));
    console.log('BODY:', (s.body || '').substring(0, 300));
    console.log('');
});
console.log('TOTAL FLAGGED (non-length):', flagged.length);
