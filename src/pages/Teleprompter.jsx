import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    ALL_SCRIPTS,
    FILMING_ORDER,
    SCRIPT_CATEGORIES,
    OUTFITS,
} from '../data/scripts.js';
import { getStarred, toggleStarred } from '../data/hooks.js';

// ─── CONSTANTS ───────────────────────────────────
const STORAGE_KEY = 'dubai-shoot-progress';
const EDITS_KEY = 'dubai-shoot-edits-99-pivot';
const CATEGORY_COLORS = {
    [SCRIPT_CATEGORIES.CASH_PAY]: { bg: '#0d9488', text: '#f0fdfa', label: 'Cash-Pay' },
    [SCRIPT_CATEGORIES.INSURANCE]: { bg: '#7c3aed', text: '#f5f3ff', label: 'Insurance' },
    [SCRIPT_CATEGORIES.ORGANIC]: { bg: '#d97706', text: '#fffbeb', label: 'Organic' },
};
const OUTFIT_DOTS = {
    A: '#e2e8f0',
    B: '#94a3b8',
    C: '#64748b',
};
const ANGLE_COLORS = {
    stat: '#10b981',
    question: '#f59e0b',
    callout: '#3b82f6',
    contrarian: '#ef4444',
    command: '#8b5cf6',
    story: '#ec4899',
    conditional: '#06b6d4',
    label: '#f97316',
};
const ANGLE_ICONS = {
    stat: '📊',
    question: '❓',
    callout: '📣',
    contrarian: '🔥',
    command: '⚡',
    story: '📖',
    conditional: '🔀',
    label: '🏷️',
};
// Helper: get hooks array from script (backward-compatible)
function getHooks(script) {
    if (script.hooks && script.hooks.length > 0) return script.hooks;
    if (script.hook) return [{ angle: 'default', text: script.hook }];
    return [{ angle: 'default', text: '(No hook defined)' }];
}

// ─── HELPERS ─────────────────────────────────────
function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}
function saveProgress(obj) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}
function loadEdits() {
    try {
        const raw = localStorage.getItem(EDITS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}
function saveEdits(obj) {
    localStorage.setItem(EDITS_KEY, JSON.stringify(obj));
}
// Merge base script with any saved edits
function getEditedScript(script, edits) {
    const e = edits[script.id];
    if (!e) return script;
    return {
        ...script,
        hooks: e.hooks || script.hooks,
        hook: e.hooks ? undefined : (e.hook || script.hook),
        body: e.body !== undefined ? e.body : script.body,
        cta: e.cta !== undefined ? e.cta : script.cta,
    };
}

// ─── MAIN COMPONENT ─────────────────────────────
export default function Teleprompter() {
    const [done, setDone] = useState(loadProgress);
    const [edits, setEdits] = useState(loadEdits);
    const [starred, setStarred] = useState(() => getStarred());
    const [filter, setFilter] = useState('all');
    const [expandedId, setExpandedId] = useState(null);
    const [fullscreenScript, setFullscreenScript] = useState(null);
    const [selectedHookIdx, setSelectedHookIdx] = useState(0);
    const [autoScroll, setAutoScroll] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [viewMode, setViewMode] = useState('blocks'); // 'blocks' | 'list'
    const scrollRef = useRef(null);
    const autoScrollRef = useRef(null);

    const handleToggleStar = useCallback((scriptId) => {
        const updated = toggleStarred(scriptId);
        setStarred({ ...updated });
    }, []);

    // persist
    useEffect(() => { saveProgress(done); }, [done]);
    useEffect(() => { saveEdits(edits); }, [edits]);

    // Edit handlers
    const updateEdit = useCallback((scriptId, field, value, hookIdx) => {
        setEdits(prev => {
            const next = { ...prev };
            if (!next[scriptId]) {
                const script = ALL_SCRIPTS.find(s => s.id === scriptId);
                next[scriptId] = {
                    hooks: script.hooks ? script.hooks.map(h => ({ ...h })) : null,
                    body: script.body,
                    cta: script.cta,
                };
            }
            if (field === 'hook' && hookIdx !== undefined && next[scriptId].hooks) {
                next[scriptId].hooks = next[scriptId].hooks.map((h, i) =>
                    i === hookIdx ? { ...h, text: value } : h
                );
            } else if (field === 'body') {
                next[scriptId].body = value;
            } else if (field === 'cta') {
                next[scriptId].cta = value;
            }
            return next;
        });
    }, []);

    const revertEdits = useCallback((scriptId) => {
        setEdits(prev => {
            const next = { ...prev };
            delete next[scriptId];
            return next;
        });
    }, []);

    // auto-scroll
    useEffect(() => {
        if (autoScroll && scrollRef.current) {
            autoScrollRef.current = setInterval(() => {
                if (scrollRef.current) scrollRef.current.scrollTop += 1;
            }, 40);
        }
        return () => clearInterval(autoScrollRef.current);
    }, [autoScroll]);

    const toggle = useCallback((id) => {
        setDone(prev => {
            const next = { ...prev };
            if (next[id]) delete next[id]; else next[id] = true;
            return next;
        });
    }, []);

    const markDoneAndNext = useCallback((currentScript) => {
        setDone(prev => ({ ...prev, [currentScript.id]: true }));
        // find next undone in same block
        const allIds = ALL_SCRIPTS.map(s => s.id);
        const curIdx = allIds.indexOf(currentScript.id);
        for (let i = curIdx + 1; i < allIds.length; i++) {
            const nextId = allIds[i];
            if (!done[nextId]) {
                setFullscreenScript(ALL_SCRIPTS.find(s => s.id === nextId));
                return;
            }
        }
        // all done
        setFullscreenScript(null);
    }, [done]);

    // filtered scripts
    const filtered = ALL_SCRIPTS.filter(s => {
        if (filter === 'all') return true;
        if (filter === 'done') return done[s.id];
        if (filter === 'remaining') return !done[s.id];
        if (filter === 'starred') return !!starred[s.id];
        if (filter === 'cash') return s.category === SCRIPT_CATEGORIES.CASH_PAY;
        if (filter === 'insurance') return s.category === SCRIPT_CATEGORIES.INSURANCE;
        if (filter === 'organic') return s.category === SCRIPT_CATEGORIES.ORGANIC;
        return true;
    });

    const doneCount = Object.keys(done).length;
    const pct = Math.round((doneCount / ALL_SCRIPTS.length) * 100);

    const resetAll = () => {
        if (window.confirm('Reset ALL progress? This cannot be undone.')) {
            setDone({});
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    // ─── FULLSCREEN TELEPROMPTER ────────────────────
    if (fullscreenScript) {
        const mergedFs = getEditedScript(fullscreenScript, edits);
        const fsHooks = getHooks(mergedFs);
        const activeHook = fsHooks[selectedHookIdx] || fsHooks[0];
        const fsHasEdits = !!edits[fullscreenScript.id];
        return (
            <div style={styles.fullscreen}>
                <div style={styles.fsTopBar}>
                    <button onClick={() => { setFullscreenScript(null); setAutoScroll(false); setSelectedHookIdx(0); }} style={styles.fsClose}>✕ Exit</button>
                    <span style={styles.fsId}>{fullscreenScript.id}</span>
                    <button
                        onClick={() => setAutoScroll(a => !a)}
                        style={{ ...styles.fsAutoScroll, background: autoScroll ? '#10b981' : '#374151' }}
                    >
                        {autoScroll ? '⏸ Pause' : '▶ Auto-Scroll'}
                    </button>
                </div>

                <div ref={scrollRef} style={styles.fsContent}>
                    <div style={styles.fsMeta}>
                        <span style={{ ...styles.pill, background: CATEGORY_COLORS[fullscreenScript.category]?.bg }}>
                            {CATEGORY_COLORS[fullscreenScript.category]?.label}
                        </span>
                        <span style={styles.fsDuration}>{fullscreenScript.duration}</span>
                        <span style={{ ...styles.pill, background: 'rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: 10 }}>
                            {fsHooks.length} hook{fsHooks.length !== 1 ? 's' : ''}
                        </span>
                        {fsHasEdits && <span style={styles.editedPill}>✏️ edited</span>}
                        {fsHasEdits && (
                            <button onClick={() => revertEdits(fullscreenScript.id)} style={styles.revertBtn}>↺ Revert</button>
                        )}
                    </div>

                    <h2 style={styles.fsTitle}>{mergedFs.title}</h2>

                    <div style={styles.fsSection}>
                        <div style={styles.fsSectionLabel}>🎣 HOOK</div>
                        {/* Hook selector tabs */}
                        {fsHooks.length > 1 && (
                            <div style={styles.hookTabs}>
                                {fsHooks.map((h, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedHookIdx(i)}
                                        style={{
                                            ...styles.hookTab,
                                            ...(i === selectedHookIdx ? {
                                                background: ANGLE_COLORS[h.angle] || '#6b7280',
                                                color: '#fff',
                                                borderColor: ANGLE_COLORS[h.angle] || '#6b7280',
                                            } : {}),
                                        }}
                                    >
                                        {ANGLE_ICONS[h.angle] || '🎯'} {h.angle}
                                    </button>
                                ))}
                            </div>
                        )}
                        <EditableArea
                            value={activeHook.text}
                            onChange={(val) => updateEdit(fullscreenScript.id, 'hook', val, selectedHookIdx)}
                            style={styles.fsText}
                        />
                    </div>

                    <div style={styles.fsDivider} />

                    <div style={styles.fsSection}>
                        <div style={styles.fsSectionLabel}>📝 BODY</div>
                        <EditableArea
                            value={mergedFs.body}
                            onChange={(val) => updateEdit(fullscreenScript.id, 'body', val)}
                            style={styles.fsText}
                        />
                    </div>

                    <div style={styles.fsDivider} />

                    <div style={styles.fsSection}>
                        <div style={styles.fsSectionLabel}>🎯 CTA</div>
                        <EditableArea
                            value={mergedFs.cta}
                            onChange={(val) => updateEdit(fullscreenScript.id, 'cta', val)}
                            style={{ ...styles.fsText, color: '#10b981', fontWeight: 700 }}
                        />
                    </div>

                    <div style={{ height: 200 }} />
                </div>

                <button onClick={() => { markDoneAndNext(fullscreenScript); setSelectedHookIdx(0); }} style={styles.fsDoneBtn}>
                    ✅ Done & Next
                </button>
            </div>
        );
    }

    // ─── MAIN VIEW ──────────────────────────────────
    return (
        <div style={styles.page}>
            {/* ── HEADER ─────────────────── */}
            <header style={styles.header}>
                <div style={styles.headerTop}>
                    <div>
                        <h1 style={styles.h1}>🎬 Dubai Shoot</h1>
                        <p style={styles.subtitle}>Script Tracker</p>
                    </div>
                    <div style={styles.headerRight}>
                        <a
                            href="/ad-builder"
                            style={{
                                padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                                background: 'rgba(15,118,110,0.2)', color: '#0d9488',
                                border: '1px solid rgba(15,118,110,0.4)', textDecoration: 'none',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            🎬 Ad Builder
                        </a>
                        <span style={styles.counter}>{doneCount}/{ALL_SCRIPTS.length}</span>
                        <button onClick={resetAll} style={styles.resetBtn} title="Reset all progress">↺</button>
                    </div>
                </div>
                <div style={styles.progressBarOuter}>
                    <div style={{ ...styles.progressBarInner, width: `${pct}%` }}>
                        {pct > 8 && <span style={styles.progressText}>{pct}%</span>}
                    </div>
                </div>
            </header>

            {/* ── FILTERS ────────────────── */}
            <div style={styles.filters}>
                {[
                    { key: 'all', label: `All (${ALL_SCRIPTS.length})` },
                    { key: 'starred', label: `⭐ Starred (${Object.keys(starred).length})` },
                    { key: 'cash', label: `Cash-Pay (50)` },
                    { key: 'insurance', label: `Insurance (25)` },
                    { key: 'organic', label: `Organic (25)` },
                    { key: 'remaining', label: `📋 Remaining` },
                    { key: 'done', label: `✅ Done (${doneCount})` },
                ].map(f => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        style={{
                            ...styles.filterBtn,
                            ...(filter === f.key ? styles.filterBtnActive : {}),
                        }}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* ── VIEW TOGGLE ────────────── */}
            <div style={styles.viewToggle}>
                <button
                    onClick={() => setViewMode('blocks')}
                    style={{ ...styles.viewBtn, ...(viewMode === 'blocks' ? styles.viewBtnActive : {}) }}
                >🎬 Outfit Blocks</button>
                <button
                    onClick={() => setViewMode('list')}
                    style={{ ...styles.viewBtn, ...(viewMode === 'list' ? styles.viewBtnActive : {}) }}
                >📄 All Scripts</button>
            </div>

            {/* ── CONTENT ────────────────── */}
            <div style={styles.content}>
                {viewMode === 'blocks' ? (
                    <BlockView
                        blocks={FILMING_ORDER.blocks}
                        done={done}
                        toggle={toggle}
                        expandedId={expandedId}
                        setExpandedId={setExpandedId}
                        setFullscreenScript={setFullscreenScript}
                        filter={filter}
                        edits={edits}
                        updateEdit={updateEdit}
                        revertEdits={revertEdits}
                        starred={starred}
                        onToggleStar={handleToggleStar}
                    />
                ) : (
                    <ListView
                        scripts={filtered}
                        done={done}
                        toggle={toggle}
                        expandedId={expandedId}
                        setExpandedId={setExpandedId}
                        setFullscreenScript={setFullscreenScript}
                        edits={edits}
                        updateEdit={updateEdit}
                        revertEdits={revertEdits}
                        starred={starred}
                        onToggleStar={handleToggleStar}
                    />
                )}
            </div>

            {/* ── PRO TIPS ───────────────── */}
            <div style={styles.tipsSection}>
                <button onClick={() => setShowTips(t => !t)} style={styles.tipsToggle}>
                    {showTips ? '△' : '▽'} Pro Tips ({FILMING_ORDER.proTips.length})
                </button>
                {showTips && (
                    <div style={styles.tipsList}>
                        {FILMING_ORDER.proTips.map((tip, i) => (
                            <div key={i} style={styles.tip}>
                                <span style={styles.tipNum}>{i + 1}</span>
                                <span>{tip}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── BLOCK VIEW ──────────────────────────────────
function BlockView({ blocks, done, toggle, expandedId, setExpandedId, setFullscreenScript, filter, edits, updateEdit, revertEdits, starred, onToggleStar }) {
    return (
        <div>
            {blocks.map(block => {
                const blockScripts = block.scripts
                    .map(id => ALL_SCRIPTS.find(s => s.id === id))
                    .filter(Boolean)
                    .filter(s => {
                        if (filter === 'all') return true;
                        if (filter === 'done') return done[s.id];
                        if (filter === 'remaining') return !done[s.id];
                        if (filter === 'starred') return !!starred[s.id];
                        if (filter === 'cash') return s.category === SCRIPT_CATEGORIES.CASH_PAY;
                        if (filter === 'insurance') return s.category === SCRIPT_CATEGORIES.INSURANCE;
                        if (filter === 'organic') return s.category === SCRIPT_CATEGORIES.ORGANIC;
                        return true;
                    });
                const blockDone = blockScripts.filter(s => done[s.id]).length;

                return (
                    <div key={block.block} style={styles.block}>
                        <div style={styles.blockHeader}>
                            <div>
                                <h3 style={styles.blockTitle}>{block.label}</h3>
                                <span style={styles.blockDuration}>{block.duration}</span>
                            </div>
                            <div style={styles.blockProgress}>
                                <span style={styles.blockCount}>{blockDone}/{blockScripts.length}</span>
                                <div style={styles.blockBarOuter}>
                                    <div style={{
                                        ...styles.blockBarInner,
                                        width: blockScripts.length ? `${(blockDone / blockScripts.length) * 100}%` : '0%',
                                    }} />
                                </div>
                            </div>
                        </div>

                        {blockScripts.map(script => (
                            <ScriptCard
                                key={script.id}
                                script={script}
                                isDone={!!done[script.id]}
                                isExpanded={expandedId === script.id}
                                onToggle={() => toggle(script.id)}
                                onExpand={() => setExpandedId(expandedId === script.id ? null : script.id)}
                                onFullscreen={() => setFullscreenScript(script)}
                                edits={edits}
                                updateEdit={updateEdit}
                                revertEdits={revertEdits}
                                isStarred={!!starred[script.id]}
                                onToggleStar={onToggleStar}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

// ─── LIST VIEW ───────────────────────────────────
function ListView({ scripts, done, toggle, expandedId, setExpandedId, setFullscreenScript, edits, updateEdit, revertEdits, starred, onToggleStar }) {
    return (
        <div>
            {scripts.map(script => (
                <ScriptCard
                    key={script.id}
                    script={script}
                    isDone={!!done[script.id]}
                    isExpanded={expandedId === script.id}
                    onToggle={() => toggle(script.id)}
                    onExpand={() => setExpandedId(expandedId === script.id ? null : script.id)}
                    onFullscreen={() => setFullscreenScript(script)}
                    edits={edits}
                    updateEdit={updateEdit}
                    revertEdits={revertEdits}
                    isStarred={!!starred[script.id]}
                    onToggleStar={onToggleStar}
                />
            ))}
        </div>
    );
}

// ─── SCRIPT CARD ─────────────────────────────────
function ScriptCard({ script, isDone, isExpanded, onToggle, onExpand, onFullscreen, edits, updateEdit, revertEdits, isStarred, onToggleStar }) {
    const cat = CATEGORY_COLORS[script.category] || { bg: '#6b7280', text: '#fff' };
    const merged = getEditedScript(script, edits);
    const hasEdits = !!edits[script.id];

    return (
        <div style={{ ...styles.card, ...(isDone ? styles.cardDone : {}) }}>
            {/* Compact row */}
            <div style={styles.cardRow} onClick={onExpand}>
                <button
                    onClick={(e) => { e.stopPropagation(); onToggle(); }}
                    style={{ ...styles.checkbox, ...(isDone ? styles.checkboxDone : {}) }}
                >
                    {isDone ? '✓' : ''}
                </button>

                <span style={styles.cardId}>{script.id}</span>

                <div style={styles.cardInfo}>
                    <span style={styles.cardTitle}>
                        {script.title}
                        {hasEdits && <span style={styles.editedDot} title="Script has local edits">✏️</span>}
                    </span>
                    <div style={styles.cardMeta}>
                        <span style={{ ...styles.pill, background: cat.bg, color: cat.text, fontSize: 10 }}>
                            {cat.label}
                        </span>
                        <span style={styles.cardDuration}>{script.duration}</span>
                        <span style={{ ...styles.outfitDot, background: OUTFIT_DOTS[script.outfit] || '#666' }}
                            title={OUTFITS[script.outfit]?.desc}
                        />
                    </div>
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); onToggleStar(script.id); }}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 16, padding: '2px 4px', flexShrink: 0,
                        opacity: isStarred ? 1 : 0.2, transition: 'opacity 0.15s',
                    }}
                    title={isStarred ? 'Remove from filming list' : 'Star for filming'}
                >⭐</button>

                <button
                    onClick={(e) => { e.stopPropagation(); onFullscreen(); }}
                    style={styles.fsButton}
                    title="Full-screen teleprompter"
                >
                    📺
                </button>

                <span style={styles.chevron}>{isExpanded ? '▲' : '▼'}</span>
            </div>

            {/* Expanded content */}
            {isExpanded && (
                <div style={styles.expanded}>
                    <div style={styles.scriptSection}>
                        <div style={styles.sectionLabel}>🎣 Hooks ({getHooks(merged).length})</div>
                        {getHooks(merged).map((h, i) => (
                            <div key={i} style={styles.hookItem}>
                                <span style={{
                                    ...styles.angleBadge,
                                    background: `${ANGLE_COLORS[h.angle] || '#6b7280'}22`,
                                    color: ANGLE_COLORS[h.angle] || '#6b7280',
                                    borderColor: `${ANGLE_COLORS[h.angle] || '#6b7280'}44`,
                                }}>
                                    {ANGLE_ICONS[h.angle] || '🎯'} {h.angle}
                                </span>
                                <EditableArea
                                    value={h.text}
                                    onChange={(val) => updateEdit(script.id, 'hook', val, i)}
                                    style={{ ...styles.scriptText, margin: 0 }}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={styles.scriptSection}>
                        <div style={styles.sectionLabel}>📝 Body</div>
                        <EditableArea
                            value={merged.body}
                            onChange={(val) => updateEdit(script.id, 'body', val)}
                            style={styles.scriptText}
                        />
                    </div>
                    <div style={styles.scriptSection}>
                        <div style={styles.sectionLabel}>🎯 CTA</div>
                        <EditableArea
                            value={merged.cta}
                            onChange={(val) => updateEdit(script.id, 'cta', val)}
                            style={{ ...styles.scriptText, color: '#10b981', fontWeight: 600 }}
                        />
                    </div>
                    <div style={styles.expandedActions}>
                        <button onClick={onFullscreen} style={styles.fullscreenBtn}>📺 Teleprompter Mode</button>
                        <button onClick={onToggle} style={{
                            ...styles.markDoneBtn,
                            background: isDone ? '#dc2626' : '#10b981',
                        }}>
                            {isDone ? 'Undo' : '✅ Mark Done'}
                        </button>
                        {hasEdits && (
                            <button onClick={() => revertEdits(script.id)} style={styles.revertBtn}>
                                ↺ Revert
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── EDITABLE AREA ───────────────────────────────
function EditableArea({ value, onChange, style }) {
    const ref = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-resize
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = ref.current.scrollHeight + 'px';
        }
    }, [value]);

    const borderStyle = isFocused
        ? '1px solid rgba(59,130,246,0.5)'
        : isHovered
            ? '1px dashed rgba(255,255,255,0.2)'
            : '1px dashed transparent';

    const bgStyle = isFocused
        ? 'rgba(255,255,255,0.04)'
        : 'transparent';

    return (
        <textarea
            ref={ref}
            defaultValue={value}
            key={value}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
                setIsFocused(false);
                if (e.target.value !== value) onChange(e.target.value);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...style,
                ...styles.editableBase,
                border: borderStyle,
                background: bgStyle,
            }}
            rows={1}
        />
    );
}

// ─── STYLES ──────────────────────────────────────
const styles = {
    // Page
    page: {
        minHeight: '100vh',
        background: '#0a0a0f',
        color: '#e2e8f0',
        fontFamily: "'Inter', 'Nunito Sans', system-ui, sans-serif",
        paddingBottom: 100,
    },

    // Header
    header: {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        padding: '20px 16px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
    },
    headerTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    h1: {
        fontSize: 22,
        fontWeight: 800,
        margin: 0,
        background: 'linear-gradient(90deg, #10b981, #3b82f6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        fontSize: 13,
        color: '#94a3b8',
        margin: '2px 0 0',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    counter: {
        fontSize: 28,
        fontWeight: 900,
        fontVariantNumeric: 'tabular-nums',
        color: '#fff',
    },
    resetBtn: {
        background: 'rgba(255,255,255,0.08)',
        border: 'none',
        color: '#94a3b8',
        fontSize: 18,
        borderRadius: 8,
        width: 32,
        height: 32,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBarOuter: {
        height: 6,
        borderRadius: 3,
        background: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
    },
    progressBarInner: {
        height: '100%',
        borderRadius: 3,
        background: 'linear-gradient(90deg, #10b981, #3b82f6)',
        transition: 'width 0.5s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 4,
    },
    progressText: {
        fontSize: 8,
        fontWeight: 700,
        color: '#fff',
    },

    // Filters
    filters: {
        display: 'flex',
        gap: 6,
        padding: '12px 16px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    },
    filterBtn: {
        padding: '6px 14px',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.04)',
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s',
        flexShrink: 0,
    },
    filterBtnActive: {
        background: 'rgba(16,185,129,0.15)',
        borderColor: '#10b981',
        color: '#10b981',
    },

    // View toggle
    viewToggle: {
        display: 'flex',
        gap: 0,
        padding: '0 16px 12px',
    },
    viewBtn: {
        flex: 1,
        padding: '8px 0',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.03)',
        color: '#64748b',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    viewBtnActive: {
        background: 'rgba(59,130,246,0.15)',
        borderColor: '#3b82f6',
        color: '#3b82f6',
    },

    // Content
    content: {
        padding: '0 12px',
    },

    // Block
    block: {
        marginBottom: 20,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
    },
    blockHeader: {
        padding: '14px 16px',
        background: 'rgba(255,255,255,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    blockTitle: {
        fontSize: 14,
        fontWeight: 700,
        margin: 0,
        color: '#e2e8f0',
    },
    blockDuration: {
        fontSize: 11,
        color: '#64748b',
    },
    blockProgress: {
        textAlign: 'right',
    },
    blockCount: {
        fontSize: 18,
        fontWeight: 800,
        color: '#10b981',
        fontVariantNumeric: 'tabular-nums',
    },
    blockBarOuter: {
        width: 60,
        height: 4,
        borderRadius: 2,
        background: 'rgba(255,255,255,0.08)',
        marginTop: 4,
        overflow: 'hidden',
    },
    blockBarInner: {
        height: '100%',
        borderRadius: 2,
        background: '#10b981',
        transition: 'width 0.4s ease',
    },

    // Card
    card: {
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        transition: 'opacity 0.3s',
    },
    cardDone: {
        opacity: 0.5,
    },
    cardRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        cursor: 'pointer',
        userSelect: 'none',
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        border: '2px solid rgba(255,255,255,0.15)',
        background: 'transparent',
        color: '#10b981',
        fontSize: 16,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.2s',
    },
    checkboxDone: {
        background: 'rgba(16,185,129,0.15)',
        borderColor: '#10b981',
    },
    cardId: {
        fontSize: 11,
        fontWeight: 700,
        color: '#64748b',
        fontFamily: 'monospace',
        minWidth: 42,
        flexShrink: 0,
    },
    cardInfo: {
        flex: 1,
        minWidth: 0,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: 600,
        color: '#e2e8f0',
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    cardMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginTop: 3,
    },
    pill: {
        padding: '2px 8px',
        borderRadius: 10,
        fontSize: 10,
        fontWeight: 700,
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardDuration: {
        fontSize: 11,
        color: '#64748b',
    },
    outfitDot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        display: 'inline-block',
    },
    fsButton: {
        background: 'none',
        border: 'none',
        fontSize: 20,
        cursor: 'pointer',
        padding: 4,
        flexShrink: 0,
    },
    chevron: {
        fontSize: 10,
        color: '#475569',
        flexShrink: 0,
    },

    // Expanded card
    expanded: {
        padding: '0 12px 14px 52px',
        animation: 'fadeIn 0.2s ease',
    },
    scriptSection: {
        marginBottom: 12,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: 800,
        color: '#3b82f6',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    scriptText: {
        fontSize: 14,
        lineHeight: 1.6,
        color: '#cbd5e1',
        margin: 0,
        whiteSpace: 'pre-wrap',
    },
    expandedActions: {
        display: 'flex',
        gap: 8,
        marginTop: 12,
    },
    fullscreenBtn: {
        padding: '8px 16px',
        borderRadius: 8,
        border: '1px solid rgba(59,130,246,0.3)',
        background: 'rgba(59,130,246,0.1)',
        color: '#3b82f6',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
    },
    markDoneBtn: {
        padding: '8px 16px',
        borderRadius: 8,
        border: 'none',
        color: '#fff',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
    },

    // Fullscreen teleprompter
    fullscreen: {
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
    },
    fsTopBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
    },
    fsClose: {
        background: 'rgba(239,68,68,0.15)',
        border: '1px solid rgba(239,68,68,0.3)',
        color: '#ef4444',
        padding: '6px 14px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
    },
    fsId: {
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: 700,
        color: '#64748b',
    },
    fsAutoScroll: {
        border: 'none',
        padding: '6px 14px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        color: '#fff',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    fsContent: {
        flex: 1,
        overflow: 'auto',
        padding: '32px 24px',
        WebkitOverflowScrolling: 'touch',
    },
    fsMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    fsDuration: {
        fontSize: 14,
        color: '#64748b',
    },
    fsTitle: {
        fontSize: 22,
        fontWeight: 800,
        color: '#fff',
        marginBottom: 32,
    },
    fsSection: {
        marginBottom: 8,
    },
    fsSectionLabel: {
        fontSize: 14,
        fontWeight: 800,
        color: '#3b82f6',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 12,
    },
    fsText: {
        fontSize: 28,
        lineHeight: 1.5,
        color: '#f1f5f9',
        fontWeight: 400,
        margin: 0,
    },
    fsDivider: {
        height: 1,
        background: 'rgba(255,255,255,0.06)',
        margin: '28px 0',
    },
    fsDoneBtn: {
        position: 'sticky',
        bottom: 0,
        padding: '16px',
        background: 'linear-gradient(135deg, #059669, #10b981)',
        border: 'none',
        color: '#fff',
        fontSize: 18,
        fontWeight: 800,
        cursor: 'pointer',
        flexShrink: 0,
        letterSpacing: 1,
    },

    // Tips
    tipsSection: {
        padding: '16px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: 20,
    },
    tipsToggle: {
        width: '100%',
        padding: '10px 16px',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        textAlign: 'left',
    },
    tipsList: {
        marginTop: 12,
    },
    tip: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        padding: '8px 0',
        fontSize: 13,
        color: '#94a3b8',
        lineHeight: 1.5,
    },
    tipNum: {
        background: 'rgba(59,130,246,0.15)',
        color: '#3b82f6',
        width: 22,
        height: 22,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
    },

    // Hook tabs (fullscreen)
    hookTabs: {
        display: 'flex',
        gap: 8,
        marginBottom: 16,
        flexWrap: 'wrap',
    },
    hookTab: {
        padding: '6px 14px',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.05)',
        color: '#94a3b8',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        textTransform: 'capitalize',
        transition: 'all 0.2s',
    },

    // Hook items (expanded card)
    hookItem: {
        marginBottom: 10,
        paddingLeft: 8,
        borderLeft: '2px solid rgba(255,255,255,0.08)',
    },
    angleBadge: {
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 10,
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
        border: '1px solid',
    },

    // Editable areas
    editableBase: {
        width: '100%',
        background: 'transparent',
        border: '1px dashed transparent',
        borderRadius: 6,
        padding: '4px 6px',
        resize: 'none',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Nunito Sans', system-ui, sans-serif",
        outline: 'none',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'text',
        boxSizing: 'border-box',
    },

    // Edit indicators
    editedPill: {
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 10,
        fontSize: 10,
        fontWeight: 700,
        background: 'rgba(245,158,11,0.15)',
        color: '#f59e0b',
        border: '1px solid rgba(245,158,11,0.3)',
    },
    editedDot: {
        marginLeft: 6,
        fontSize: 11,
    },
    revertBtn: {
        padding: '8px 16px',
        borderRadius: 8,
        border: '1px solid rgba(239,68,68,0.3)',
        background: 'rgba(239,68,68,0.1)',
        color: '#ef4444',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
};
