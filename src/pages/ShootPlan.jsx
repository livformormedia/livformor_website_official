import { useState, useEffect, useRef, useCallback } from 'react';

// ──────────────────────────────────────────────────
// SHOOT PLAN DATA — 20 scripts, 3 blocks
// Edit these directly or edit inline in the UI
// ──────────────────────────────────────────────────

import { CUSTOM_SHOOT_PLAN } from '../data/custom_scripts';
import { getStarred, toggleStarred as toggleStarredUtil } from '../data/hooks';

const DEFAULT_SCRIPTS = CUSTOM_SHOOT_PLAN;

const STORAGE_KEY = 'shoot-plan-scripts-v16-new-offers';

function loadScripts() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
    } catch (e) { }
    return DEFAULT_SCRIPTS;
}

function saveScripts(scripts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
}

// ──────────────────────────────────────────────────
// TELEPROMPTER VIEW
// ──────────────────────────────────────────────────

function TeleprompterView({ script, onClose, onEdit }) {
    const [speed, setSpeed] = useState(35);
    const [isPlaying, setIsPlaying] = useState(false);
    const [fontSize, setFontSize] = useState(42);
    const scrollRef = useRef(null);
    const animRef = useRef(null);
    const posRef = useRef(0);

    const defaultHookStr = typeof script.hook === 'string' ? script.hook : (script.hook?.text || '');
    const activeHookStr = typeof script.activeHook === 'string' ? script.activeHook : (script.activeHook?.text || defaultHookStr);
    const fullText = `HOOK\n\n${activeHookStr}\n\n──────────\n\n${script.body}\n\n──────────\n\nCTA: ${script.cta}`;

    const animate = useCallback(() => {
        if (!scrollRef.current) return;
        posRef.current += speed / 600;
        scrollRef.current.scrollTop = posRef.current;
        animRef.current = requestAnimationFrame(animate);
    }, [speed]);

    useEffect(() => {
        if (isPlaying) {
            animRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animRef.current);
        }
        return () => cancelAnimationFrame(animRef.current);
    }, [isPlaying, animate]);

    useEffect(() => {
        posRef.current = scrollRef.current?.scrollTop || 0;
    }, []);

    return (
        <div style={{
            position: 'fixed', inset: 0, background: '#000',
            zIndex: 9999, display: 'flex', flexDirection: 'column',
        }}>
            {/* Top bar */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 20px', background: '#111', borderBottom: '1px solid #222',
                flexShrink: 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: 13 }}>{script.id}</span>
                    <span style={{ color: '#666', fontSize: 12 }}>|</span>
                    <span style={{ color: '#ccc', fontSize: 13 }}>{script.title}</span>
                    <span style={{ color: '#555', fontSize: 11 }}>({script.duration})</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={onEdit} style={{
                        padding: '6px 14px', background: '#1e3a5f', border: '1px solid #2563eb',
                        borderRadius: 6, color: '#60a5fa', fontSize: 12, cursor: 'pointer',
                    }}>✏️ Edit</button>
                    <button onClick={onClose} style={{
                        padding: '6px 14px', background: '#1c1c1c', border: '1px solid #333',
                        borderRadius: 6, color: '#888', fontSize: 12, cursor: 'pointer',
                    }}>✕ Close</button>
                </div>
            </div>

            {/* Script text */}
            <div ref={scrollRef} style={{
                flex: 1, overflowY: 'auto', padding: '60px 10%',
                scrollbarWidth: 'none',
            }}>
                {fullText.split('\n').map((line, i) => {
                    const isLabel = line === 'HOOK' || line.startsWith('CTA:');
                    const isDivider = line.startsWith('──');
                    return (
                        <div key={i} style={{
                            fontSize: isDivider ? 14 : (isLabel ? 18 : fontSize),
                            fontWeight: isLabel ? 700 : 400,
                            color: isLabel ? '#f59e0b' : (isDivider ? '#333' : '#f1f5f9'),
                            lineHeight: 1.5,
                            marginBottom: isDivider ? 32 : (line === '' ? fontSize * 0.4 : 4),
                            fontFamily: "'Georgia', serif",
                            letterSpacing: '0.01em',
                        }}>
                            {line || '\u00A0'}
                        </div>
                    );
                })}
                <div style={{ height: '60vh' }} />
            </div>

            {/* Controls */}
            <div style={{
                padding: '14px 20px', background: '#111', borderTop: '1px solid #222',
                display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
                flexWrap: 'wrap',
            }}>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                        padding: '10px 28px',
                        background: isPlaying ? '#dc2626' : 'linear-gradient(135deg, #16a34a, #15803d)',
                        border: 'none', borderRadius: 8, color: '#fff',
                        fontSize: 15, fontWeight: 700, cursor: 'pointer', minWidth: 100,
                    }}
                >
                    {isPlaying ? '⏸ Pause' : '▶ Start'}
                </button>

                <button onClick={() => { posRef.current = 0; if (scrollRef.current) scrollRef.current.scrollTop = 0; setIsPlaying(false); }}
                    style={{ padding: '10px 18px', background: '#1c1c1c', border: '1px solid #333', borderRadius: 8, color: '#888', fontSize: 13, cursor: 'pointer' }}>
                    ↺ Reset
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 12 }}>
                    <span>Speed</span>
                    <input type="range" min={5} max={100} value={speed}
                        onChange={e => setSpeed(Number(e.target.value))}
                        style={{ width: 100, accentColor: '#f59e0b' }} />
                    <span style={{ color: '#999', minWidth: 24 }}>{speed}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 12 }}>
                    <span>Size</span>
                    <button onClick={() => setFontSize(f => Math.max(24, f - 4))}
                        style={{ padding: '4px 10px', background: '#1c1c1c', border: '1px solid #333', borderRadius: 4, color: '#aaa', cursor: 'pointer' }}>−</button>
                    <span style={{ color: '#999', minWidth: 24 }}>{fontSize}</span>
                    <button onClick={() => setFontSize(f => Math.min(80, f + 4))}
                        style={{ padding: '4px 10px', background: '#1c1c1c', border: '1px solid #333', borderRadius: 4, color: '#aaa', cursor: 'pointer' }}>+</button>
                </div>

                <div style={{ marginLeft: 'auto', color: '#444', fontSize: 11 }}>
                    Outfit: <span style={{ color: '#f59e0b' }}>{script.outfit}</span>
                </div>
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────────
// EDIT MODAL
// ──────────────────────────────────────────────────

function EditModal({ script, hookIndex, blockKey, onSave, onClose }) {
    // If the script has hook variations, edit the selected one; otherwise edit the single hook
    const hasHooks = script.hooks && script.hooks.length > 1;
    const rawHook = hasHooks ? (script.hooks[hookIndex] ?? script.hook) : script.hook;
    const initHook = typeof rawHook === 'string' ? rawHook : (rawHook?.text || '');

    const [hook, setHook] = useState(initHook);
    const [body, setBody] = useState(script.body);
    const [cta, setCta] = useState(script.cta);
    const [title, setTitle] = useState(script.title);

    const hookLabel = hasHooks ? `Hook — H${hookIndex + 1} of ${script.hooks.length}` : 'Hook (opening line)';

    const handleSave = () => {
        let updatedScript = { ...script, title, body, cta };
        if (hasHooks) {
            // Write the edited text back into the correct slot in the hooks array
            const newHooks = [...script.hooks];
            const oldHook = newHooks[hookIndex];
            newHooks[hookIndex] = typeof oldHook === 'object' ? { ...oldHook, text: hook } : hook;
            updatedScript.hooks = newHooks;
            // Keep default hook in sync with H1
            if (hookIndex === 0) updatedScript.hook = hook;
        } else {
            updatedScript.hook = hook;
        }
        onSave(updatedScript);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
        }} onClick={e => e.target === e.currentTarget && onClose()}>
            <div style={{
                background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12,
                width: '100%', maxWidth: 720, maxHeight: '90vh', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
            }}>
                <div style={{
                    padding: '16px 20px', background: '#1e293b', borderBottom: '1px solid #334155',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#f59e0b', fontWeight: 700 }}>{script.id} — Edit Script</span>
                        {hasHooks && (
                            <span style={{
                                padding: '2px 8px', background: '#f59e0b22', border: '1px solid #f59e0b44',
                                borderRadius: 4, color: '#f59e0b', fontSize: 10, fontWeight: 700,
                            }}>H{hookIndex + 1}</span>
                        )}
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 18 }}>✕</button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                        { label: 'Title', val: title, set: setTitle, rows: 1 },
                        { label: hookLabel, val: hook, set: setHook, rows: 3 },
                        { label: 'Body (the full script)', val: body, set: setBody, rows: 12 },
                        { label: 'CTA', val: cta, set: setCta, rows: 2 },
                    ].map(({ label, val, set, rows }) => (
                        <div key={label}>
                            <label style={{ display: 'block', color: '#94a3b8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</label>
                            <textarea
                                value={val}
                                onChange={e => set(e.target.value)}
                                rows={rows}
                                style={{
                                    width: '100%', background: '#1e293b', border: '1px solid #334155',
                                    borderRadius: 8, color: '#e2e8f0', fontSize: 14, padding: '10px 12px',
                                    resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
                                    lineHeight: 1.6,
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div style={{
                    padding: '14px 20px', borderTop: '1px solid #1e293b',
                    display: 'flex', gap: 10, justifyContent: 'flex-end',
                }}>
                    <button onClick={onClose} style={{
                        padding: '10px 20px', background: 'none', border: '1px solid #334155',
                        borderRadius: 8, color: '#64748b', cursor: 'pointer',
                    }}>Cancel</button>
                    <button onClick={handleSave} style={{
                        padding: '10px 24px', background: 'linear-gradient(135deg, #16a34a, #15803d)',
                        border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, cursor: 'pointer',
                    }}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────────
// SCRIPT CARD
// ──────────────────────────────────────────────────

const BLOCK_COLORS = {
    ads: { accent: '#ef4444', label: '🔴 DIRECT OFFER ADS', sublabel: 'Film first. Highest energy. These go live as paid ads.' },
    founder: { accent: '#a855f7', label: '🟣 FOUNDER VOICE', sublabel: 'Trust-building. Retargeting. These make warm audiences convert.' },
    organic: { accent: '#f59e0b', label: '🟡 ORGANIC SOCIAL', sublabel: 'Instagram · TikTok · YouTube. 3 months of content.' },
    kap: { accent: '#10b981', label: '🟢 KAP & TMS CLINICS', sublabel: 'Highly targeted B2B messaging for Ketamine and TMS operators.' },
    kap_final: { accent: '#3b82f6', label: '🔵 KAP FINAL (POLISHED)', sublabel: 'Perfectly smooth, education-first, non-aggressive patient acquisition ads.' },
};

function ScriptCard({ script, index, blockKey, onTeleprompter, onEdit, isStarred, onToggleStar }) {
    const color = BLOCK_COLORS[blockKey].accent;
    const hasHooks = script.hooks && script.hooks.length > 1;
    const [selectedHook, setSelectedHook] = useState(0);
    const rawHook = hasHooks ? script.hooks[selectedHook] : script.hook;
    const activeHook = typeof rawHook === 'string' ? rawHook : (rawHook?.text || '');

    return (
        <div style={{
            background: '#0f172a', border: `1px solid #1e293b`,
            borderRadius: 10, overflow: 'hidden',
            transition: 'border-color 0.15s',
        }}
            onMouseEnter={e => e.currentTarget.style.borderColor = color}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1e293b'}
        >
            <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flex: 1 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: color + '22', border: `1px solid ${color}44`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color, fontWeight: 800, fontSize: 13, flexShrink: 0,
                        }}>
                            {index + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ color, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>{script.id}</span>
                                <span style={{ color: '#475569', fontSize: 10 }}>·</span>
                                <span style={{ color: '#64748b', fontSize: 10 }}>{script.duration}</span>
                                <span style={{ color: '#475569', fontSize: 10 }}>·</span>
                                <span style={{ color: '#64748b', fontSize: 10 }}>Outfit {script.outfit}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                                <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{script.title}</div>
                                <button
                                    onClick={() => onToggleStar(script.id)}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontSize: 18, color: isStarred ? '#f59e0b' : '#334155',
                                        transition: 'color 0.2s', padding: 4
                                    }}
                                    title="Star this ad"
                                >
                                    {isStarred ? '★' : '☆'}
                                </button>
                            </div>
                            <div style={{ color: '#64748b', fontSize: 12, marginTop: 4, lineHeight: 1.5, fontStyle: 'italic' }}>
                                &ldquo;{activeHook.slice(0, 140)}{activeHook.length > 140 ? '...' : ''}&rdquo;
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hook variation selector */}
                {hasHooks && (
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ color: '#475569', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', marginRight: 2 }}>HOOK</span>
                        {script.hooks.map((h, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedHook(i)}
                                title={typeof h === 'string' ? h : h.text}
                                style={{
                                    padding: '3px 9px',
                                    background: selectedHook === i ? color + '33' : '#1e293b',
                                    border: `1px solid ${selectedHook === i ? color : '#334155'}`,
                                    borderRadius: 4,
                                    color: selectedHook === i ? color : '#475569',
                                    fontSize: 10, fontWeight: 700, cursor: 'pointer',
                                    transition: 'all 0.15s',
                                }}
                            >
                                H{i + 1}
                            </button>
                        ))}
                        <span style={{ color: '#1e293b', fontSize: 10, marginLeft: 4 }}>← pick before filming</span>
                    </div>
                )}

                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button
                        onClick={() => onTeleprompter({ ...script, activeHook })}
                        style={{
                            flex: 1, padding: '9px 0',
                            background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                            border: `1px solid ${color}44`, borderRadius: 7,
                            color, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                            letterSpacing: '0.03em',
                        }}
                    >
                        ▶ TELEPROMPTER {hasHooks ? `· H${selectedHook + 1}` : ''}
                    </button>
                    <button
                        onClick={() => onEdit(script, blockKey, selectedHook)}
                        style={{
                            padding: '9px 16px', background: '#1e293b',
                            border: '1px solid #334155', borderRadius: 7,
                            color: '#64748b', fontSize: 12, cursor: 'pointer',
                        }}
                    >
                        ✏️ Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────────
// MAIN PAGE
// ──────────────────────────────────────────────────

export default function ShootPlan() {
    const [scripts, setScripts] = useState(loadScripts);
    const [starred, setStarredState] = useState(getStarred);
    const [teleprompterScript, setTeleprompterScript] = useState(null);
    const [editTarget, setEditTarget] = useState(null);

    const handleToggleStar = (id) => {
        const newStarred = toggleStarredUtil(id);
        setStarredState(newStarred);
    };

    const handleEdit = (script, blockKey, hookIndex = 0) => setEditTarget({ script, blockKey, hookIndex });

    const handleSave = (updated) => {
        setScripts(prev => {
            const blockKey = editTarget.blockKey;
            const newScripts = {
                ...prev,
                [blockKey]: prev[blockKey].map(s => s.id === updated.id ? updated : s),
            };
            saveScripts(newScripts);
            return newScripts;
        });
        setEditTarget(null);
    };

    const handleReset = () => {
        if (confirm('Reset all scripts to defaults? Your edits will be lost.')) {
            localStorage.removeItem(STORAGE_KEY);
            setScripts(DEFAULT_SCRIPTS);
        }
    };

    const total = scripts.ads.length + scripts.founder.length + scripts.organic.length + (scripts.kap ? scripts.kap.length : 0);

    return (
        <div style={{
            minHeight: '100vh', background: '#030712',
            color: '#e2e8f0', fontFamily: "'Nunito Sans', sans-serif",
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(180deg, #0a0a1a 0%, #030712 100%)',
                borderBottom: '1px solid #1e293b', padding: '24px 32px',
            }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                        <div>
                            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                                🎬 Shoot Plan
                            </h1>
                            <p style={{ margin: '4px 0 0', color: '#475569', fontSize: 13 }}>
                                {total} videos · {Object.keys(starred).length} ⭐ Starred
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {Object.entries(BLOCK_COLORS).map(([key, { accent }]) => (
                                    <div key={key} style={{
                                        padding: '4px 10px', borderRadius: 4,
                                        background: accent + '15', border: `1px solid ${accent}30`,
                                        color: accent, fontSize: 10, fontWeight: 700,
                                    }}>
                                        {scripts[key].length} {key.toUpperCase()}
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleReset} style={{
                                padding: '6px 14px', background: 'none', border: '1px solid #1e293b',
                                borderRadius: 6, color: '#475569', fontSize: 11, cursor: 'pointer',
                            }}>↺ Reset</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blocks */}
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
                {['kap_final', 'ads', 'founder', 'organic', 'kap'].map((blockKey) => {
                    const blockConfig = BLOCK_COLORS[blockKey];
                    const blockScripts = scripts[blockKey] || [];
                    if (blockScripts.length === 0) return null;
                    const { accent, label, sublabel } = blockConfig;

                    return (
                        <div key={blockKey} style={{ marginBottom: 48 }}>
                            {/* Block header */}
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                    <div style={{ height: 2, width: 28, background: accent, borderRadius: 1 }} />
                                    <h2 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: accent, letterSpacing: '0.1em' }}>
                                        {label}
                                    </h2>
                                </div>
                                <p style={{ margin: '0 0 0 38px', color: '#475569', fontSize: 12 }}>{sublabel}</p>
                            </div>

                            {/* Cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {blockScripts.map((script, i) => (
                                    <ScriptCard
                                        key={script.id}
                                        script={script}
                                        index={i}
                                        blockKey={blockKey}
                                        onTeleprompter={setTeleprompterScript}
                                        onEdit={handleEdit}
                                        isStarred={!!starred[script.id]}
                                        onToggleStar={handleToggleStar}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}

                <div style={{ textAlign: 'center', padding: '32px 0', color: '#1e293b', fontSize: 12 }}>
                    Edits are saved automatically to your browser · Teleprompter works offline
                </div>
            </div>

            {/* Teleprompter overlay */}
            {teleprompterScript && (
                <TeleprompterView
                    script={teleprompterScript}
                    onClose={() => setTeleprompterScript(null)}
                    onEdit={() => {
                        const blockKey = ['ads', 'founder', 'organic'].find(k =>
                            scripts[k].some(s => s.id === teleprompterScript.id)
                        );
                        setEditTarget({ script: teleprompterScript, blockKey });
                        setTeleprompterScript(null);
                    }}
                />
            )}

            {/* Edit modal */}
            {editTarget && (
                <EditModal
                    script={editTarget.script}
                    blockKey={editTarget.blockKey}
                    hookIndex={editTarget.hookIndex ?? 0}
                    onSave={handleSave}
                    onClose={() => setEditTarget(null)}
                />
            )}
        </div>
    );
}
