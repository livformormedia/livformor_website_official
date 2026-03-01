import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ALL_SCRIPTS, SCRIPT_CATEGORIES } from '../data/scripts.js';
import {
    HOOKS_POOL,
    ANGLE_CONFIG,
    getAngleConfig,
    getStarred,
    toggleStarred,
    getAdSets,
    saveAdSet,
    deleteAdSet,
    generateAdSetId,
} from '../data/hooks.js';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
    [SCRIPT_CATEGORIES.CASH_PAY]: { pill: '#0d9488', text: '#f0fdfa', label: 'Cash-Pay' },
    [SCRIPT_CATEGORIES.INSURANCE]: { pill: '#7c3aed', text: '#faf5ff', label: 'Insurance/TMS' },
    [SCRIPT_CATEGORIES.ORGANIC]: { pill: '#0369a1', text: '#f0f9ff', label: 'Organic' },
    [SCRIPT_CATEGORIES.FOUNDER]: { pill: '#b45309', text: '#fffbeb', label: 'Founder' },
};
const getCategoryStyle = (cat) => CATEGORY_COLORS[cat] || { pill: '#475569', text: '#f8fafc', label: cat };

const VIEWS = { BUILDER: 'builder', AD_SETS: 'ad-sets', TELEPROMPTER: 'teleprompter' };


// ─── SUBCOMPONENTS ─────────────────────────────────────────────────────────────

const CategoryPill = ({ category }) => {
    const s = getCategoryStyle(category);
    return (
        <span style={{
            background: s.pill, color: s.text,
            fontSize: 10, fontWeight: 700, padding: '2px 8px',
            borderRadius: 20, letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
            {s.label}
        </span>
    );
};

const AngleBadge = ({ angle }) => {
    const s = getAngleConfig(angle);
    return (
        <span style={{
            background: s.bg, color: s.color, border: `1px solid ${s.color}40`,
            fontSize: 10, fontWeight: 700, padding: '2px 8px',
            borderRadius: 20, letterSpacing: '0.04em', textTransform: 'uppercase',
            flexShrink: 0,
        }}>
            {s.label}
        </span>
    );
};


// ─── PANEL 1: BODY COPIES LIST ───────────────────────────────────────────────

function BodyCopyPanel({ selected, onSelect, starred, onToggleStar, filter, onFilterChange }) {
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        let list = ALL_SCRIPTS;
        if (filter === 'starred') list = list.filter((s) => starred[s.id]);
        if (filter && filter !== 'starred' && filter !== 'all') list = list.filter((s) => s.category === filter);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter((s) =>
                s.title?.toLowerCase().includes(q) ||
                s.id?.toLowerCase().includes(q)
            );
        }
        return list;
    }, [filter, search, starred]);

    const categories = [
        { key: 'all', label: 'All' },
        { key: 'starred', label: '⭐ Starred' },
        ...Object.entries(SCRIPT_CATEGORIES).map(([, v]) => ({ key: v, label: getCategoryStyle(v).label })),
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', padding: '12px 12px 8px', borderBottom: '1px solid #1e293b' }}>
                {categories.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => onFilterChange(key)}
                        style={{
                            padding: '4px 10px', borderRadius: 20, border: 'none', cursor: 'pointer',
                            fontSize: 11, fontWeight: 600,
                            background: filter === key ? '#0f766e' : '#1e293b',
                            color: filter === key ? '#fff' : '#94a3b8',
                            transition: 'all 0.15s',
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e293b' }}>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search body copies..."
                    style={{
                        width: '100%', padding: '7px 12px', borderRadius: 8,
                        border: '1px solid #1e293b', background: '#0f172a',
                        color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box',
                    }}
                />
            </div>

            {/* Count */}
            <div style={{ padding: '6px 14px', fontSize: 11, color: '#64748b', borderBottom: '1px solid #1e293b' }}>
                {filtered.length} body cop{filtered.length === 1 ? 'y' : 'ies'}
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {filtered.map((script) => {
                    const isSelected = selected?.id === script.id;
                    const isStarred = starred[script.id];
                    return (
                        <div
                            key={script.id}
                            onClick={() => onSelect(script)}
                            style={{
                                padding: '10px 12px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #0f172a',
                                background: isSelected ? '#0f2d2a' : 'transparent',
                                borderLeft: isSelected ? '3px solid #0f766e' : '3px solid transparent',
                                transition: 'background 0.1s',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                {/* Star */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); onToggleStar(script.id); }}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontSize: 14, padding: '0 2px', marginTop: 1, flexShrink: 0,
                                        opacity: isStarred ? 1 : 0.25, transition: 'opacity 0.15s',
                                    }}
                                    title={isStarred ? 'Remove from filming list' : 'Mark for filming'}
                                >
                                    ⭐
                                </button>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{script.id}</span>
                                        <CategoryPill category={script.category} />
                                    </div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.3 }}>
                                        {script.title}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filtered.length === 0 && (
                    <div style={{ padding: 32, textAlign: 'center', color: '#475569', fontSize: 13 }}>
                        No body copies match your filter.
                    </div>
                )}
            </div>
        </div>
    );
}


// ─── PANEL 2: HOOKS LIBRARY ──────────────────────────────────────────────────

function HooksLibraryPanel({ attachedHookIds, onToggleHook }) {
    const [search, setSearch] = useState('');
    const [angleFilter, setAngleFilter] = useState('all');

    const allAngles = useMemo(() => {
        const set = new Set(HOOKS_POOL.map((h) => h.angle));
        return ['all', ...Array.from(set)];
    }, []);

    const filtered = useMemo(() => {
        let list = HOOKS_POOL;
        if (angleFilter !== 'all') list = list.filter((h) => h.angle === angleFilter);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter((h) =>
                h.text.toLowerCase().includes(q) ||
                h.angle.toLowerCase().includes(q) ||
                h.sourceScriptId?.toLowerCase().includes(q)
            );
        }
        return list;
    }, [angleFilter, search]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Angle Filter */}
            <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid #1e293b', overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {allAngles.map((angle) => {
                        const cfg = angle === 'all' ? { label: 'All', color: '#0f766e', bg: '#0f766e20' } : getAngleConfig(angle);
                        return (
                            <button
                                key={angle}
                                onClick={() => setAngleFilter(angle)}
                                style={{
                                    padding: '4px 10px', borderRadius: 20, border: 'none', cursor: 'pointer',
                                    fontSize: 11, fontWeight: 600,
                                    background: angleFilter === angle ? cfg.color : '#1e293b',
                                    color: angleFilter === angle ? '#fff' : '#94a3b8',
                                    transition: 'all 0.15s',
                                }}
                            >
                                {cfg.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Search */}
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e293b' }}>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search hooks..."
                    style={{
                        width: '100%', padding: '7px 12px', borderRadius: 8,
                        border: '1px solid #1e293b', background: '#0f172a',
                        color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box',
                    }}
                />
            </div>

            {/* Count */}
            <div style={{ padding: '6px 14px', fontSize: 11, color: '#64748b', borderBottom: '1px solid #1e293b' }}>
                {filtered.length} hooks · {attachedHookIds.length} selected
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {filtered.map((hook) => {
                    const isAttached = attachedHookIds.includes(hook.id);
                    return (
                        <div
                            key={hook.id}
                            onClick={() => onToggleHook(hook.id)}
                            style={{
                                padding: '10px 12px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #0f172a',
                                background: isAttached ? '#0f2d2a' : 'transparent',
                                borderLeft: isAttached ? '3px solid #0f766e' : '3px solid transparent',
                                display: 'flex', alignItems: 'flex-start', gap: 10,
                                transition: 'background 0.1s',
                            }}
                        >
                            {/* Checkbox */}
                            <div style={{
                                width: 18, height: 18, borderRadius: 4, border: '2px solid',
                                borderColor: isAttached ? '#0f766e' : '#475569',
                                background: isAttached ? '#0f766e' : 'transparent',
                                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginTop: 2, transition: 'all 0.15s',
                            }}>
                                {isAttached && <span style={{ color: '#fff', fontSize: 11, lineHeight: 1 }}>✓</span>}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                                    <AngleBadge angle={hook.angle} />
                                    <span style={{ fontSize: 10, color: '#475569' }}>from {hook.sourceScriptId}</span>
                                </div>
                                <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5 }}>
                                    {hook.text}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {filtered.length === 0 && (
                    <div style={{ padding: 32, textAlign: 'center', color: '#475569', fontSize: 13 }}>
                        No hooks match your search.
                    </div>
                )}
            </div>
        </div>
    );
}


// ─── PANEL 3: AD SET BUILDER ─────────────────────────────────────────────────

function AdSetBuilderPanel({ selectedScript, attachedHookIds, onRemoveHook, onSave, onReorder }) {
    const [adTitle, setAdTitle] = useState('');
    const [savedMsg, setSavedMsg] = useState(false);

    const attachedHooks = attachedHookIds
        .map((id) => HOOKS_POOL.find((h) => h.id === id))
        .filter(Boolean);

    const handleSave = () => {
        if (!selectedScript) return;
        const adSet = {
            id: generateAdSetId(),
            bodyId: selectedScript.id,
            bodyTitle: selectedScript.title,
            bodyCategory: selectedScript.category,
            title: adTitle.trim() || `${selectedScript.id} — ${attachedHookIds.length} hooks`,
            hookIds: [...attachedHookIds],
            createdAt: new Date().toISOString(),
        };
        onSave(adSet);
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 2000);
        setAdTitle('');
    };

    const moveHook = (idx, dir) => {
        const newIds = [...attachedHookIds];
        const target = idx + dir;
        if (target < 0 || target >= newIds.length) return;
        [newIds[idx], newIds[target]] = [newIds[target], newIds[idx]];
        onReorder(newIds);
    };

    if (!selectedScript) {
        return (
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                padding: '32px 24px', gap: 16,
            }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    How to build an ad set
                </div>
                {[
                    { num: '1', title: 'Pick a body copy', desc: 'Click any script in the left panel — that becomes your ad\'s main message.' },
                    { num: '2', title: 'Select hooks', desc: 'Check hooks in the middle panel. Each hook = one ad variation to film.' },
                    { num: '3', title: 'Save the set', desc: 'Hit the green "Save Ad Set" button at the bottom of this panel.' },
                ].map((step) => (
                    <div key={step.num} style={{
                        display: 'flex', gap: 14, alignItems: 'flex-start',
                        background: '#0a1628', borderRadius: 10,
                        border: '1px solid #1e293b', padding: '14px 16px',
                    }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                            background: '#0f766e', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 800, fontSize: 13,
                        }}>{step.num}</div>
                        <div>
                            <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: 13, marginBottom: 3 }}>{step.title}</div>
                            <div style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5 }}>{step.desc}</div>
                        </div>
                    </div>
                ))}
                <div style={{
                    marginTop: 'auto', padding: '16px', borderRadius: 10,
                    background: 'rgba(15,118,110,0.08)', border: '1px dashed rgba(15,118,110,0.3)',
                    textAlign: 'center', color: '#0d9488', fontSize: 12, fontWeight: 600,
                }}>
                    ← Start by clicking a body copy
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {/* Script Header */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #1e293b', background: '#0a1628' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{selectedScript.id}</span>
                    <CategoryPill category={selectedScript.category} />
                    <span style={{ fontSize: 11, color: '#475569' }}>{selectedScript.duration}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.3 }}>
                    {selectedScript.title}
                </div>
            </div>

            {/* Body Preview */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #1e293b', background: '#0a1628' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Body Preview
                </div>
                <div style={{
                    fontSize: 12, color: '#94a3b8', lineHeight: 1.6,
                    maxHeight: 100, overflowY: 'auto',
                    background: '#0f172a', padding: '8px 10px', borderRadius: 6,
                }}>
                    {selectedScript.body?.substring(0, 400)}
                    {selectedScript.body?.length > 400 && '…'}
                </div>
            </div>

            {/* CTA Preview */}
            <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e293b', background: '#0a1628' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                    CTA
                </div>
                <div style={{ fontSize: 12, color: '#0d9488', lineHeight: 1.5 }}>
                    {selectedScript.cta}
                </div>
            </div>

            {/* Attached Hooks */}
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 16px 6px', flexShrink: 0 }}>
                Hooks ({attachedHooks.length}) — film each one with this body
            </div>

            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0 16px 8px', minHeight: 0 }}>
                {attachedHooks.length === 0 && (
                    <div style={{ padding: '20px 0', color: '#475569', fontSize: 13, textAlign: 'center' }}>
                        No hooks attached yet. Check hooks in Panel 2.
                    </div>
                )}
                {attachedHooks.map((hook, idx) => (
                    <div
                        key={hook.id}
                        style={{
                            padding: '10px 10px',
                            marginBottom: 6,
                            background: '#0f172a',
                            borderRadius: 8,
                            border: '1px solid #1e293b',
                            display: 'flex', alignItems: 'flex-start', gap: 8,
                        }}
                    >
                        {/* Reorder */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
                            <button
                                onClick={() => moveHook(idx, -1)}
                                disabled={idx === 0}
                                style={{
                                    background: 'none', border: 'none', cursor: idx === 0 ? 'default' : 'pointer',
                                    color: idx === 0 ? '#1e293b' : '#64748b', fontSize: 10, padding: '1px 4px',
                                }}
                            >▲</button>
                            <span style={{ fontSize: 10, color: '#475569', textAlign: 'center', fontWeight: 700 }}>{idx + 1}</span>
                            <button
                                onClick={() => moveHook(idx, 1)}
                                disabled={idx === attachedHooks.length - 1}
                                style={{
                                    background: 'none', border: 'none',
                                    cursor: idx === attachedHooks.length - 1 ? 'default' : 'pointer',
                                    color: idx === attachedHooks.length - 1 ? '#1e293b' : '#64748b', fontSize: 10, padding: '1px 4px',
                                }}
                            >▼</button>
                        </div>

                        {/* Hook text */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ marginBottom: 4 }}>
                                <AngleBadge angle={hook.angle} />
                            </div>
                            <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.5 }}>
                                {hook.text}
                            </div>
                        </div>

                        {/* Remove */}
                        <button
                            onClick={() => onRemoveHook(hook.id)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: '#475569', fontSize: 16, padding: '2px 4px', flexShrink: 0,
                                transition: 'color 0.15s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
                            title="Remove hook"
                        >✕</button>
                    </div>
                ))}
            </div>

            {/* Save Bar */}
            <div style={{ padding: '16px', borderTop: '2px solid #0f766e', background: '#071020', flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Step 3 — Save this ad set
                </div>
                <input
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                    placeholder={`Name this set (e.g. "CP-01 Market Hook Batch")`}
                    style={{
                        width: '100%', padding: '9px 12px', borderRadius: 8, marginBottom: 10,
                        border: '1px solid #1e3a5f', background: '#0f172a',
                        color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box',
                    }}
                />
                <button
                    onClick={handleSave}
                    disabled={attachedHooks.length === 0}
                    style={{
                        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
                        background: attachedHooks.length === 0
                            ? '#1e293b'
                            : savedMsg ? '#047857' : 'linear-gradient(135deg, #0f766e, #0d9488)',
                        color: attachedHooks.length === 0 ? '#475569' : '#fff',
                        fontWeight: 800, fontSize: 15,
                        cursor: attachedHooks.length === 0 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: attachedHooks.length > 0 && !savedMsg ? '0 4px 20px rgba(13,148,136,0.4)' : 'none',
                        letterSpacing: '0.01em',
                    }}
                >
                    {savedMsg
                        ? '✓ Ad Set Saved!'
                        : attachedHooks.length === 0
                            ? '← Select hooks in Panel 2 first'
                            : `💾 Save Ad Set — ${attachedHooks.length} hook${attachedHooks.length !== 1 ? 's' : ''}`}
                </button>
                {attachedHooks.length > 0 && !savedMsg && (
                    <div style={{ textAlign: 'center', fontSize: 11, color: '#475569', marginTop: 8 }}>
                        Saves to &quot;Saved Sets&quot; tab above ↗
                    </div>
                )}
            </div>
        </div>
    );
}


// ─── AD SETS VIEW ─────────────────────────────────────────────────────────────

function AdSetsView({ adSets, onDelete, onOpenInTeleprompter }) {
    if (adSets.length === 0) {
        return (
            <div style={{ padding: 64, textAlign: 'center', color: '#475569' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📁</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>
                    No ad sets yet
                </div>
                <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                    Go to the Builder tab, select a body copy, attach hooks, and save.
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {adSets.map((set) => {
                const body = ALL_SCRIPTS.find((s) => s.id === set.bodyId);
                const hooks = set.hookIds
                    .map((id) => HOOKS_POOL.find((h) => h.id === id))
                    .filter(Boolean);
                return (
                    <div
                        key={set.id}
                        style={{
                            background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b',
                            padding: 18, display: 'flex', flexDirection: 'column', gap: 12,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.3, marginBottom: 4 }}>
                                    {set.title}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                    {body && <CategoryPill category={body.category} />}
                                    <span style={{ fontSize: 11, color: '#475569' }}>{set.bodyId}</span>
                                    <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>
                                        {hooks.length} hook{hooks.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => onDelete(set.id)}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: '#475569', fontSize: 16, padding: '2px 4px', flexShrink: 0,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
                            >✕</button>
                        </div>

                        {/* Hooks preview */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {hooks.slice(0, 4).map((h, i) => (
                                <div key={h.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                                    <span style={{ fontSize: 10, color: '#475569', minWidth: 18, fontWeight: 700, marginTop: 2 }}>
                                        {i + 1}.
                                    </span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <AngleBadge angle={h.angle} />
                                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3, lineHeight: 1.4 }}>
                                            {h.text.substring(0, 90)}{h.text.length > 90 ? '…' : ''}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {hooks.length > 4 && (
                                <div style={{ fontSize: 11, color: '#475569', paddingLeft: 24 }}>
                                    +{hooks.length - 4} more hook{hooks.length - 4 !== 1 ? 's' : ''}
                                </div>
                            )}
                        </div>

                        {/* Created date */}
                        <div style={{ fontSize: 10, color: '#334155' }}>
                            Created {new Date(set.createdAt).toLocaleDateString()}
                        </div>

                        {/* Action button */}
                        <button
                            onClick={() => onOpenInTeleprompter(set)}
                            style={{
                                width: '100%', padding: '9px', borderRadius: 8, border: 'none',
                                background: '#0f766e', color: '#fff',
                                fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#0d9488')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#0f766e')}
                        >
                            🎬 Open in Teleprompter
                        </button>
                    </div>
                );
            })}
        </div>
    );
}


// ─── TELEPROMPTER VIEW (for ad sets) ─────────────────────────────────────────

function AdSetTeleprompterView({ adSet, onBack }) {
    const [activeHookIdx, setActiveHookIdx] = useState(0);
    const [fontSize, setFontSize] = useState(28);
    const [scrolling, setScrolling] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(40);
    const scrollRef = React.useRef(null);
    const intervalRef = React.useRef(null);

    const body = ALL_SCRIPTS.find((s) => s.id === adSet.bodyId);
    const hooks = adSet.hookIds
        .map((id) => HOOKS_POOL.find((h) => h.id === id))
        .filter(Boolean);
    const activeHook = hooks[activeHookIdx];

    useEffect(() => {
        if (scrolling) {
            intervalRef.current = setInterval(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop += scrollSpeed / 30;
                }
            }, 33);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [scrolling, scrollSpeed]);

    if (!body) return <div style={{ color: '#fff', padding: 32 }}>Body copy not found.</div>;

    return (
        <div style={{
            position: 'fixed', inset: 0, background: '#000',
            display: 'flex', flexDirection: 'column', zIndex: 1000,
        }}>
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 20px', borderBottom: '1px solid #1a1a1a',
                background: '#0a0a0a', flexShrink: 0,
            }}>
                <button onClick={onBack} style={{
                    background: '#1e293b', border: 'none', color: '#94a3b8',
                    padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                }}>
                    ← Back
                </button>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>
                    {adSet.title} · {body.id} · {body.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#64748b' }}>Size</span>
                    <input type="range" min={18} max={60} value={fontSize}
                        onChange={(e) => setFontSize(+e.target.value)}
                        style={{ width: 80 }}
                    />
                    <button
                        onClick={() => setScrolling(!scrolling)}
                        style={{
                            background: scrolling ? '#0f766e' : '#1e293b',
                            border: 'none', color: '#fff', padding: '6px 14px',
                            borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                        }}
                    >
                        {scrolling ? '⏸ Pause' : '▶ Scroll'}
                    </button>
                </div>
            </div>

            {/* Hook Tabs */}
            <div style={{
                display: 'flex', gap: 0, overflowX: 'auto',
                background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', flexShrink: 0,
            }}>
                {hooks.map((h, idx) => (
                    <button
                        key={h.id}
                        onClick={() => { setActiveHookIdx(idx); if (scrollRef.current) scrollRef.current.scrollTop = 0; }}
                        style={{
                            padding: '10px 16px', border: 'none', cursor: 'pointer',
                            background: activeHookIdx === idx ? '#0f2d2a' : 'transparent',
                            color: activeHookIdx === idx ? '#0d9488' : '#475569',
                            borderBottom: activeHookIdx === idx ? '2px solid #0d9488' : '2px solid transparent',
                            whiteSpace: 'nowrap', fontSize: 12, fontWeight: 600,
                            transition: 'all 0.15s',
                        }}
                    >
                        H{idx + 1} — {(ANGLE_CONFIG[h.angle]?.label || h.angle).toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Script Content */}
            <div
                ref={scrollRef}
                style={{
                    flex: 1, overflowY: 'auto', padding: '40px 60px',
                    background: '#000',
                }}
            >
                {/* Active Hook */}
                {activeHook && (
                    <div style={{
                        background: '#0a1628', border: '1px solid #1e3a5f',
                        borderRadius: 12, padding: '24px 32px', marginBottom: 40,
                    }}>
                        <div style={{ marginBottom: 12 }}>
                            <AngleBadge angle={activeHook.angle} />
                        </div>
                        <div style={{
                            fontSize: fontSize, fontWeight: 700,
                            color: '#ffffff', lineHeight: 1.5, letterSpacing: '-0.01em',
                        }}>
                            {activeHook.text}
                        </div>
                    </div>
                )}

                {/* Body */}
                <div style={{
                    fontSize: fontSize * 0.85, color: '#e2e8f0',
                    lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: 40,
                }}>
                    {body.body}
                </div>

                {/* CTA */}
                <div style={{
                    background: '#0f2d2a', border: '1px solid #0f766e',
                    borderRadius: 12, padding: '20px 28px',
                }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                        CTA
                    </div>
                    <div style={{ fontSize: fontSize * 0.8, color: '#5eead4', fontWeight: 600, lineHeight: 1.5 }}>
                        {body.cta}
                    </div>
                </div>

                <div style={{ height: 200 }} />
            </div>
        </div>
    );
}


// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function AdBuilder() {
    const [view, setView] = useState(VIEWS.BUILDER);
    const [selectedScript, setSelectedScript] = useState(null);
    const [attachedHookIds, setAttachedHookIds] = useState([]);
    const [starred, setStarred] = useState({});
    const [adSets, setAdSets] = useState([]);
    const [bodyFilter, setBodyFilter] = useState('all');
    const [teleprompterAdSet, setTeleprompterAdSet] = useState(null);

    // Load from localStorage on mount
    useEffect(() => {
        setStarred(getStarred());
        setAdSets(getAdSets());
    }, []);

    const handleToggleStar = useCallback((scriptId) => {
        const updated = toggleStarred(scriptId);
        setStarred({ ...updated });
    }, []);

    const handleSelectScript = useCallback((script) => {
        setSelectedScript(script);
    }, []);

    const handleToggleHook = useCallback((hookId) => {
        setAttachedHookIds((prev) =>
            prev.includes(hookId) ? prev.filter((id) => id !== hookId) : [...prev, hookId]
        );
    }, []);

    const handleRemoveHook = useCallback((hookId) => {
        setAttachedHookIds((prev) => prev.filter((id) => id !== hookId));
    }, []);

    const handleReorder = useCallback((newIds) => {
        setAttachedHookIds(newIds);
    }, []);

    const handleSaveAdSet = useCallback((adSet) => {
        const updated = saveAdSet(adSet);
        setAdSets([...updated]);
        setAttachedHookIds([]);
    }, []);

    const handleDeleteAdSet = useCallback((adSetId) => {
        const updated = deleteAdSet(adSetId);
        setAdSets([...updated]);
    }, []);

    const handleOpenInTeleprompter = useCallback((adSet) => {
        setTeleprompterAdSet(adSet);
        setView(VIEWS.TELEPROMPTER);
    }, []);

    // Full-screen teleprompter takes over
    if (view === VIEWS.TELEPROMPTER && teleprompterAdSet) {
        return (
            <AdSetTeleprompterView
                adSet={teleprompterAdSet}
                onBack={() => { setView(VIEWS.AD_SETS); setTeleprompterAdSet(null); }}
            />
        );
    }

    const starredCount = Object.keys(starred).length;

    return (
        <div style={{
            height: '100vh', background: '#030712', color: '#e2e8f0', overflow: 'hidden',
            fontFamily: "'Nunito Sans', sans-serif", display: 'flex', flexDirection: 'column',
        }}>
            {/* Top Nav */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 24px', background: '#0a0f1e',
                borderBottom: '1px solid #0f172a', flexShrink: 0, flexWrap: 'wrap',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <span style={{ fontSize: 22 }}>🎬</span>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 18, color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                            Ad Builder
                        </div>
                        <div style={{ fontSize: 11, color: '#475569' }}>
                            Build ad sets · {ALL_SCRIPTS.length} body copies · {HOOKS_POOL.length} hooks
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* Starred badge */}
                    {starredCount > 0 && (
                        <div style={{
                            background: '#92400e', color: '#fef3c7', padding: '4px 12px',
                            borderRadius: 20, fontSize: 12, fontWeight: 700,
                        }}>
                            ⭐ {starredCount} starred
                        </div>
                    )}

                    <button
                        onClick={() => setView(VIEWS.BUILDER)}
                        style={{
                            padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                            background: view === VIEWS.BUILDER ? '#0f766e' : '#1e293b',
                            color: view === VIEWS.BUILDER ? '#fff' : '#94a3b8',
                            fontWeight: 600, fontSize: 13, transition: 'all 0.15s',
                        }}
                    >
                        Builder
                    </button>
                    <button
                        onClick={() => setView(VIEWS.AD_SETS)}
                        style={{
                            padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                            background: view === VIEWS.AD_SETS ? '#0f766e' : '#1e293b',
                            color: view === VIEWS.AD_SETS ? '#fff' : '#94a3b8',
                            fontWeight: 600, fontSize: 13, transition: 'all 0.15s',
                            position: 'relative',
                        }}
                    >
                        Saved Sets
                        {adSets.length > 0 && (
                            <span style={{
                                background: '#0d9488', color: '#fff', borderRadius: '50%',
                                width: 18, height: 18, fontSize: 10, fontWeight: 700,
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                marginLeft: 6,
                            }}>
                                {adSets.length}
                            </span>
                        )}
                    </button>
                    <a
                        href="/teleprompter"
                        style={{
                            padding: '8px 16px', borderRadius: 8, border: '1px solid #1e293b',
                            color: '#94a3b8', fontWeight: 600, fontSize: 13, textDecoration: 'none',
                            transition: 'all 0.15s', display: 'inline-block',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0f766e')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1e293b')}
                    >
                        ↗ Teleprompter
                    </a>
                </div>
            </div>

            {/* AD SETS VIEW */}
            {view === VIEWS.AD_SETS && (
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <AdSetsView
                        adSets={adSets}
                        onDelete={handleDeleteAdSet}
                        onOpenInTeleprompter={handleOpenInTeleprompter}
                    />
                </div>
            )}

            {/* BUILDER VIEW — 3 Panels */}
            {view === VIEWS.BUILDER && (
                <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr 340px',
                    overflow: 'hidden',
                    height: 'calc(100vh - 70px)',
                }}>
                    {/* Panel 1 — Body Copies */}
                    <div style={{ borderRight: '1px solid #0f172a', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#060d1a' }}>
                        <div style={{ padding: '10px 14px', borderBottom: '1px solid #1e293b', background: '#0a0f1e' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                1 · Body Copies
                            </div>
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <BodyCopyPanel
                                selected={selectedScript}
                                onSelect={handleSelectScript}
                                starred={starred}
                                onToggleStar={handleToggleStar}
                                filter={bodyFilter}
                                onFilterChange={setBodyFilter}
                            />
                        </div>
                    </div>

                    {/* Panel 2 — Hooks Library */}
                    <div style={{ borderRight: '1px solid #0f172a', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#060d1a' }}>
                        <div style={{ padding: '10px 14px', borderBottom: '1px solid #1e293b', background: '#0a0f1e' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                2 · Hooks Library
                                {selectedScript && (
                                    <span style={{ marginLeft: 8, color: '#0d9488', textTransform: 'none', fontWeight: 600 }}>
                                        → attaching to {selectedScript.id}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <HooksLibraryPanel
                                attachedHookIds={attachedHookIds}
                                onToggleHook={handleToggleHook}
                            />
                        </div>
                    </div>

                    {/* Panel 3 — Ad Set Builder */}
                    <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#060d1a' }}>
                        <div style={{ padding: '10px 14px', borderBottom: '1px solid #1e293b', background: '#0a0f1e' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                3 · Ad Set Builder
                            </div>
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <AdSetBuilderPanel
                                selectedScript={selectedScript}
                                attachedHookIds={attachedHookIds}
                                onRemoveHook={handleRemoveHook}
                                onSave={handleSaveAdSet}
                                onReorder={handleReorder}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
