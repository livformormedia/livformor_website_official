/**
 * hooks.js — Global Hooks Pool
 * 
 * All hooks extracted from every script, unified into one searchable pool.
 * Each hook has a unique H-XXX id, angle type, source script reference, and text.
 * 
 * Used by the Ad Builder to attach any hook to any body copy.
 */

import { ALL_SCRIPTS } from './scripts.js';

// ─── Build the global hooks pool from ALL_SCRIPTS ────────────────────────────
// Extract every hook from every script, assign unique ids, keep source info
let _hookCounter = 1;
const _padded = (n) => String(n).padStart(3, '0');

export const HOOKS_POOL = ALL_SCRIPTS.flatMap((script) =>
    (script.hooks || []).map((hook) => ({
        id: `H-${_padded(_hookCounter++)}`,
        angle: hook.angle,
        text: hook.text,
        sourceScriptId: script.id,
        sourceScriptTitle: script.title,
        sourceCategory: script.category,
    }))
);

// ─── Angle display config ────────────────────────────────────────────────────
export const ANGLE_CONFIG = {
    stat: { label: 'Stat', color: '#0d9488', bg: '#0d948820' },
    question: { label: 'Question', color: '#7c3aed', bg: '#7c3aed20' },
    callout: { label: 'Callout', color: '#dc2626', bg: '#dc262620' },
    story: { label: 'Story', color: '#d97706', bg: '#d9770620' },
    command: { label: 'Command', color: '#0369a1', bg: '#0369a120' },
    contrarian: { label: 'Contrarian', color: '#be185d', bg: '#be185d20' },
    conditional: { label: 'Conditional', color: '#047857', bg: '#04785720' },
    label: { label: 'Label', color: '#64748b', bg: '#64748b20' },
    Direct: { label: 'Direct', color: '#0369a1', bg: '#0369a120' },
    Curiosity: { label: 'Curiosity', color: '#7c3aed', bg: '#7c3aed20' },
};

export const getAngleConfig = (angle) =>
    ANGLE_CONFIG[angle] || { label: angle, color: '#64748b', bg: '#64748b20' };

// ─── localStorage helpers ────────────────────────────────────────────────────
const AD_SETS_KEY = 'livformor-ad-sets-99-pivot';
const STARRED_KEY = 'livformor-starred-scripts';

export const getStarred = () => {
    try { return JSON.parse(localStorage.getItem(STARRED_KEY) || '{}'); }
    catch { return {}; }
};

export const setStarred = (starred) =>
    localStorage.setItem(STARRED_KEY, JSON.stringify(starred));

export const toggleStarred = (scriptId) => {
    const current = getStarred();
    if (current[scriptId]) {
        delete current[scriptId];
    } else {
        current[scriptId] = true;
    }
    setStarred(current);
    return { ...current };
};

export const getAdSets = () => {
    try { return JSON.parse(localStorage.getItem(AD_SETS_KEY) || '[]'); }
    catch { return []; }
};

export const saveAdSet = (adSet) => {
    const sets = getAdSets();
    const existingIdx = sets.findIndex((s) => s.id === adSet.id);
    if (existingIdx >= 0) {
        sets[existingIdx] = adSet;
    } else {
        sets.push(adSet);
    }
    localStorage.setItem(AD_SETS_KEY, JSON.stringify(sets));
    return sets;
};

export const deleteAdSet = (adSetId) => {
    const sets = getAdSets().filter((s) => s.id !== adSetId);
    localStorage.setItem(AD_SETS_KEY, JSON.stringify(sets));
    return sets;
};

export const generateAdSetId = () =>
    `AD-${Date.now().toString(36).toUpperCase()}`;
