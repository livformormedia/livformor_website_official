import { useState, useRef, useEffect, useCallback } from 'react';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '@/hooks/command-center/useTasks';
import { useClients } from '@/hooks/command-center/useClients';
import { Plus, Calendar, Trash2, Check, Clock, X, ChevronDown, ChevronRight, AlertCircle, Pencil, FileText, ArrowUpDown } from 'lucide-react';

/* ═══════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════ */
const STATUS_ORDER = ['todo', 'in_progress', 'blocked', 'done'];
const STATUS_CONFIG = {
    todo: { label: 'To Do', color: 'text-white/50', bg: 'bg-white/5', border: 'border-white/10', dot: 'bg-white/30' },
    in_progress: { label: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', dot: 'bg-blue-400' },
    blocked: { label: 'Blocked', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', dot: 'bg-red-400' },
    done: { label: 'Done', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
};

const PRIORITIES = [
    { value: 'urgent', label: 'Urgent', emoji: '🔴', color: 'border-red-500/40 bg-red-500/10 text-red-400', active: 'border-red-500 bg-red-500/20 ring-1 ring-red-500/30' },
    { value: 'high', label: 'High', emoji: '🟡', color: 'border-amber-500/40 bg-amber-500/10 text-amber-400', active: 'border-amber-500 bg-amber-500/20 ring-1 ring-amber-500/30' },
    { value: 'normal', label: 'Normal', emoji: '🟢', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400', active: 'border-emerald-500 bg-emerald-500/20 ring-1 ring-emerald-500/30' },
    { value: 'low', label: 'Low', emoji: '⚪', color: 'border-white/20 bg-white/5 text-white/50', active: 'border-white/40 bg-white/10 ring-1 ring-white/20' },
];

const CATEGORIES = [
    { value: 'content', label: 'Content', color: 'border-purple-500/30 bg-purple-500/10 text-purple-400', active: 'border-purple-500 bg-purple-500/20 ring-1 ring-purple-500/30' },
    { value: 'outreach', label: 'Outreach', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400', active: 'border-blue-500 bg-blue-500/20 ring-1 ring-blue-500/30' },
    { value: 'technical', label: 'Technical', color: 'border-teal-500/30 bg-teal-500/10 text-teal-400', active: 'border-teal-500 bg-teal-500/20 ring-1 ring-teal-500/30' },
    { value: 'admin', label: 'Admin', color: 'border-white/15 bg-white/5 text-white/50', active: 'border-white/30 bg-white/10 ring-1 ring-white/20' },
    { value: 'billing', label: 'Billing', color: 'border-amber-500/30 bg-amber-500/10 text-amber-400', active: 'border-amber-500 bg-amber-500/20 ring-1 ring-amber-500/30' },
];

const PRIORITY_BORDER = { urgent: 'border-l-red-500', high: 'border-l-amber-400', normal: 'border-l-emerald-500', low: 'border-l-white/20' };
const PRIORITY_WEIGHT = { urgent: 0, high: 1, normal: 2, low: 3 };

const INITIAL_FORM = { title: '', description: '', client_id: '', status: 'todo', priority: 'normal', category: 'content', due_date: '', estimated_minutes: '' };

const SORT_OPTIONS = [
    { value: 'due_date', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'created', label: 'Recently Created' },
];

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const fmt = (d) => d.toISOString().split('T')[0];
const add = (base, days) => { const d = new Date(base); d.setDate(d.getDate() + days); return fmt(d); };

function getDatePresets() {
    const today = new Date();
    const nextMon = () => { const d = new Date(today); d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7)); return fmt(d); };
    return [
        { label: 'Today', value: fmt(today) },
        { label: 'Tomorrow', value: add(today, 1) },
        { label: '+3 days', value: add(today, 3) },
        { label: 'Next Mon', value: nextMon() },
        { label: '+1 week', value: add(today, 7) },
        { label: '+2 weeks', value: add(today, 14) },
    ];
}

function formatDueDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr + 'T12:00:00');
    const now = new Date();
    now.setHours(12, 0, 0, 0);
    const diff = Math.round((d - now) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff === -1) return 'Yesterday';
    if (diff < -1) return `${Math.abs(diff)}d overdue`;
    if (diff <= 7) return `In ${diff}d`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function useClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (e) => { if (ref.current && !ref.current.contains(e.target)) handler(); };
        document.addEventListener('mousedown', listener);
        return () => document.removeEventListener('mousedown', listener);
    }, [ref, handler]);
}

/* ═══════════════════════════════════════════
   MINI CALENDAR
   ═══════════════════════════════════════════ */
function MiniCalendar({ value, onChange, onClose }) {
    const today = new Date();
    const selected = value ? new Date(value + 'T12:00:00') : null;
    const [viewMonth, setViewMonth] = useState(selected ? selected.getMonth() : today.getMonth());
    const [viewYear, setViewYear] = useState(selected ? selected.getFullYear() : today.getFullYear());
    const ref = useRef(null);
    useClickOutside(ref, onClose);

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
    const presets = getDatePresets();

    const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
    const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

    const handleSelect = (day) => {
        const d = new Date(viewYear, viewMonth, day);
        onChange(fmt(d));
        onClose();
    };

    const isToday = (day) => today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
    const isSelected = (day) => selected && selected.getDate() === day && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
    const isPast = (day) => {
        const d = new Date(viewYear, viewMonth, day);
        d.setHours(23, 59, 59);
        return d < new Date();
    };

    const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div ref={ref} className="absolute z-50 mt-1 w-72 bg-[#1c2128] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden">
            {/* Presets */}
            <div className="p-2 flex flex-wrap gap-1 border-b border-white/[0.06]">
                {presets.map(p => (
                    <button key={p.label} type="button" onClick={() => { onChange(p.value); onClose(); }}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${value === p.value ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'text-white/50 hover:text-white/70 hover:bg-white/[0.06] border border-transparent'}`}>
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Month nav */}
            <div className="flex items-center justify-between px-3 py-2">
                <button type="button" onClick={prevMonth} className="w-6 h-6 rounded-md flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors">‹</button>
                <span className="text-sm font-semibold text-white/80">{MONTHS[viewMonth]} {viewYear}</span>
                <button type="button" onClick={nextMonth} className="w-6 h-6 rounded-md flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors">›</button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 px-2">
                {DAYS.map(d => <div key={d} className="text-center text-[10px] font-semibold text-white/25 py-1">{d}</div>)}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 px-2 pb-3">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    return (
                        <button key={day} type="button" onClick={() => handleSelect(day)}
                            className={`w-8 h-8 mx-auto rounded-lg text-xs font-medium flex items-center justify-center transition-all
                                ${isSelected(day) ? 'bg-teal-500 text-white font-bold' : ''}
                                ${isToday(day) && !isSelected(day) ? 'ring-1 ring-teal-500/50 text-teal-400' : ''}
                                ${!isSelected(day) && !isToday(day) && isPast(day) ? 'text-white/20' : ''}
                                ${!isSelected(day) && !isToday(day) && !isPast(day) ? 'text-white/60 hover:bg-white/[0.08]' : ''}
                            `}>
                            {day}
                        </button>
                    );
                })}
            </div>

            {/* Clear */}
            {value && (
                <div className="border-t border-white/[0.06] p-2">
                    <button type="button" onClick={() => { onChange(''); onClose(); }}
                        className="w-full text-center text-xs text-white/30 hover:text-red-400 py-1 transition-colors">
                        Clear date
                    </button>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   STATUS DROPDOWN
   ═══════════════════════════════════════════ */
function StatusDropdown({ status, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useClickOutside(ref, () => setOpen(false));
    const sc = STATUS_CONFIG[status];

    return (
        <div ref={ref} className="relative flex-shrink-0">
            <button type="button" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className={`text-[11px] px-2.5 py-1 rounded-full ${sc.bg} ${sc.color} font-semibold border ${sc.border} hover:brightness-125 transition-all cursor-pointer`}>
                {sc.label}
            </button>
            {open && (
                <div className="absolute z-50 right-0 mt-1 w-44 bg-[#1c2128] border border-white/[0.1] rounded-lg shadow-2xl overflow-hidden">
                    {STATUS_ORDER.map(s => {
                        const cfg = STATUS_CONFIG[s];
                        return (
                            <button key={s} type="button" onClick={(e) => { e.stopPropagation(); onChange(s); setOpen(false); }}
                                className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2.5 transition-colors ${status === s ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'}`}>
                                <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                                <span className={cfg.color}>{cfg.label}</span>
                                {status === s && <Check className="w-3 h-3 text-teal-400 ml-auto" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   DROPDOWN (generic)
   ═══════════════════════════════════════════ */
function Dropdown({ value, onChange, options, placeholder = 'Select...' }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useClickOutside(ref, () => setOpen(false));
    const selected = options.find(o => o.value === value);
    return (
        <div ref={ref} className="relative">
            <button type="button" onClick={() => setOpen(!open)}
                className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-left flex items-center justify-between hover:border-white/[0.15] transition-colors focus:outline-none focus:border-teal-500/40">
                <span className={selected ? 'text-white/80' : 'text-white/30'}>{selected ? selected.label : placeholder}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute z-50 mt-1 w-full bg-[#1c2128] border border-white/[0.1] rounded-lg shadow-2xl overflow-hidden max-h-48 overflow-y-auto">
                    {options.map(opt => (
                        <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                            className={`w-full px-3 py-2 text-sm text-left hover:bg-white/[0.06] transition-colors flex items-center gap-2 ${value === opt.value ? 'text-teal-400 bg-teal-500/5' : 'text-white/70'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   TASK DETAIL PANEL (slide-in from right)
   ═══════════════════════════════════════════ */
function TaskDetailPanel({ task, clients, onUpdate, onDelete, onClose }) {
    const [form, setForm] = useState({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        priority: task.priority || 'normal',
        category: task.category || 'content',
        client_id: task.client_id || '',
        due_date: task.due_date || '',
        estimated_minutes: task.estimated_minutes || '',
    });
    const [showCal, setShowCal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [dirty, setDirty] = useState(false);
    const panelRef = useRef(null);

    const update = (field, val) => {
        setForm(p => ({ ...p, [field]: val }));
        setDirty(true);
    };

    const handleSave = () => {
        const payload = {
            id: task.id,
            title: form.title,
            description: form.description,
            status: form.status,
            priority: form.priority,
            category: form.category,
            client_id: form.client_id || null,
            due_date: form.due_date || null,
            estimated_minutes: form.estimated_minutes ? parseInt(form.estimated_minutes) : null,
        };
        onUpdate(payload);
        setDirty(false);
    };

    const handleDelete = () => {
        if (confirmDelete) {
            onDelete(task.id);
            onClose();
        } else {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 3000);
        }
    };

    // Save on close if dirty
    const handleClose = () => {
        if (dirty) handleSave();
        onClose();
    };

    // Click outside panel
    useEffect(() => {
        const handler = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) handleClose();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [dirty, form]);

    // Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') handleClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [dirty, form]);

    const dueDateDisplay = form.due_date
        ? new Date(form.due_date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
        : 'No date set';

    return (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
            <div ref={panelRef} className="w-full max-w-lg bg-[#0d1117] border-l border-white/[0.08] h-full overflow-y-auto animate-slide-in-right">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-[#0d1117]/95 backdrop-blur-sm border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white/60">Edit Task</h3>
                    <div className="flex items-center gap-2">
                        {dirty && (
                            <button onClick={handleSave}
                                className="h-7 px-3 bg-teal-500/20 text-teal-400 text-xs font-semibold rounded-lg border border-teal-500/30 hover:bg-teal-500/30 transition-all">
                                Save
                            </button>
                        )}
                        <button onClick={handleClose}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <input value={form.title} onChange={e => update('title', e.target.value)}
                            className="w-full text-lg font-bold text-white/90 bg-transparent border-none outline-none placeholder:text-white/20 focus:ring-0"
                            placeholder="Task title..." />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="text-[11px] font-semibold text-white/35 uppercase tracking-wider mb-2 block">Status</label>
                        <div className="flex gap-1.5">
                            {STATUS_ORDER.map(s => {
                                const cfg = STATUS_CONFIG[s];
                                return (
                                    <button key={s} type="button" onClick={() => update('status', s)}
                                        className={`flex-1 h-9 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1.5
                                            ${form.status === s ? `${cfg.bg} ${cfg.color} ${cfg.border} ring-1 ring-current/20` : 'border-white/[0.08] text-white/30 hover:border-white/[0.15] hover:text-white/50'}`}>
                                        <div className={`w-2 h-2 rounded-full ${form.status === s ? cfg.dot : 'bg-white/20'}`} />
                                        {cfg.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="text-[11px] font-semibold text-white/35 uppercase tracking-wider mb-2 block">Priority</label>
                        <div className="flex gap-2">
                            {PRIORITIES.map(p => (
                                <button key={p.value} type="button" onClick={() => update('priority', p.value)}
                                    className={`flex-1 h-9 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1.5
                                        ${form.priority === p.value ? p.active : p.color + ' opacity-50 hover:opacity-75'}`}>
                                    <span>{p.emoji}</span> {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-[11px] font-semibold text-white/35 uppercase tracking-wider mb-2 block">Category</label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(c => (
                                <button key={c.value} type="button" onClick={() => update('category', c.value)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                                        ${form.category === c.value ? c.active : c.color + ' opacity-50 hover:opacity-75'}`}>
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="text-[11px] font-semibold text-white/35 uppercase tracking-wider mb-2 block">Due Date</label>
                        <div className="relative">
                            <button type="button" onClick={() => setShowCal(!showCal)}
                                className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-left flex items-center gap-2 hover:border-white/[0.15] transition-colors">
                                <Calendar className="w-3.5 h-3.5 text-white/30" />
                                <span className={form.due_date ? 'text-white/80' : 'text-white/30'}>{dueDateDisplay}</span>
                                {form.due_date && (
                                    <button type="button" onClick={(e) => { e.stopPropagation(); update('due_date', ''); }}
                                        className="ml-auto text-white/20 hover:text-white/50"><X className="w-3 h-3" /></button>
                                )}
                            </button>
                            {showCal && <MiniCalendar value={form.due_date} onChange={v => update('due_date', v)} onClose={() => setShowCal(false)} />}
                        </div>
                    </div>

                    {/* Client */}
                    <div>
                        <label className="text-[11px] font-semibold text-white/35 uppercase tracking-wider mb-1.5 block">Client <span className="text-white/20 normal-case">(optional)</span></label>
                        <Dropdown
                            value={form.client_id}
                            onChange={v => update('client_id', v)}
                            options={[{ value: '', label: 'None' }, ...clients.map(c => ({ value: c.id, label: c.name }))]}
                            placeholder="No client" />
                    </div>

                    {/* Estimated time */}
                    <div>
                        <label className="text-[11px] font-semibold text-white/35 uppercase tracking-wider mb-1.5 block">Estimated Time</label>
                        <div className="flex items-center gap-2">
                            <input type="number" placeholder="30" value={form.estimated_minutes}
                                onChange={e => update('estimated_minutes', e.target.value)}
                                className="w-24 h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-teal-500/40" />
                            <span className="text-xs text-white/30">minutes</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-[11px] font-semibold text-white/35 uppercase tracking-wider mb-1.5 block">Description / Notes</label>
                        <textarea value={form.description} onChange={e => update('description', e.target.value)}
                            placeholder="Add details, notes, context..."
                            className="w-full h-32 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-teal-500/40 transition-all resize-none" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                        <button onClick={handleDelete}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5
                                ${confirmDelete ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-white/25 hover:text-red-400 hover:bg-red-500/10 border border-transparent'}`}>
                            <Trash2 className="w-3.5 h-3.5" />
                            {confirmDelete ? 'Confirm delete?' : 'Delete task'}
                        </button>
                        {dirty && (
                            <button onClick={handleSave}
                                className="h-9 px-5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                                Save Changes
                            </button>
                        )}
                    </div>

                    {/* Meta */}
                    <div className="text-[10px] text-white/15 space-y-0.5 pt-2">
                        <p>Created: {new Date(task.created_at).toLocaleString()}</p>
                        {task.completed_at && <p>Completed: {new Date(task.completed_at).toLocaleString()}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   TASK CARD
   ═══════════════════════════════════════════ */
function TaskCard({ task, onStatusChange, onDelete, onOpen }) {
    const [editingTitle, setEditingTitle] = useState(false);
    const [titleVal, setTitleVal] = useState(task.title);
    const titleRef = useRef(null);
    const updateTask = useUpdateTask();

    const prio = PRIORITIES.find(p => p.value === task.priority);
    const cat = CATEGORIES.find(c => c.value === task.category);
    const isOverdue = task.due_date && new Date(task.due_date + 'T23:59:59') < new Date() && task.status !== 'done';
    const dueDateText = formatDueDate(task.due_date);

    const handleTitleDoubleClick = (e) => {
        e.stopPropagation();
        setEditingTitle(true);
        setTimeout(() => titleRef.current?.focus(), 0);
    };

    const saveTitle = () => {
        setEditingTitle(false);
        if (titleVal.trim() && titleVal !== task.title) {
            updateTask.mutate({ id: task.id, title: titleVal.trim() });
        } else {
            setTitleVal(task.title);
        }
    };

    return (
        <div
            onClick={() => onOpen(task)}
            className={`group bg-[#161b22] border border-white/[0.06] rounded-lg overflow-hidden transition-all hover:border-white/[0.12] border-l-[3px] ${PRIORITY_BORDER[task.priority]} ${isOverdue ? 'ring-1 ring-red-500/15' : ''} cursor-pointer`}
        >
            <div className="px-4 py-3 flex items-center gap-3">
                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                    {editingTitle ? (
                        <input ref={titleRef} value={titleVal}
                            onChange={e => setTitleVal(e.target.value)}
                            onBlur={saveTitle}
                            onKeyDown={e => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') { setTitleVal(task.title); setEditingTitle(false); } }}
                            onClick={e => e.stopPropagation()}
                            className="w-full text-sm font-medium text-white/90 bg-transparent border-b border-teal-500/50 outline-none py-0.5" />
                    ) : (
                        <span
                            onDoubleClick={handleTitleDoubleClick}
                            className={`text-sm font-medium block truncate ${task.status === 'done' ? 'text-white/30 line-through' : 'text-white/90'}`}
                            title="Double-click to rename">
                            {task.title}
                        </span>
                    )}
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {cat && <span className={`text-[10px] px-1.5 py-0.5 rounded-md border font-medium ${cat.color}`}>{cat.label}</span>}
                        {dueDateText && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md flex items-center gap-1 font-medium ${isOverdue ? 'bg-red-500/15 text-red-400 border border-red-500/25' : 'text-white/35 border border-white/[0.06]'}`}>
                                {isOverdue && <AlertCircle className="w-2.5 h-2.5" />}
                                <Calendar className="w-2.5 h-2.5" />
                                {dueDateText}
                            </span>
                        )}
                        {task.estimated_minutes && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md text-white/25 border border-white/[0.06] flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />{task.estimated_minutes}m
                            </span>
                        )}
                        {task.description && (
                            <span className="text-[10px] text-white/15 flex items-center gap-0.5" title="Has notes">
                                <FileText className="w-2.5 h-2.5" />
                            </span>
                        )}
                    </div>
                </div>

                {/* Priority dot */}
                <span className="text-xs flex-shrink-0">{prio?.emoji}</span>

                {/* Status dropdown */}
                <StatusDropdown status={task.status} onChange={(s) => onStatusChange(task.id, s)} />

                {/* Edit icon (visible on hover) */}
                <button onClick={(e) => { e.stopPropagation(); onOpen(task); }}
                    className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-white/0 group-hover:text-white/25 hover:!text-teal-400 hover:!bg-teal-500/10 transition-all"
                    title="Edit task">
                    <Pencil className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   MAIN — TASKS PAGE
   ═══════════════════════════════════════════ */
export default function Tasks() {
    const [statusFilter, setStatusFilter] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [showFormCal, setShowFormCal] = useState(false);
    const [sortBy, setSortBy] = useState('due_date');
    const [groupByStatus, setGroupByStatus] = useState(true);
    const [collapsedGroups, setCollapsedGroups] = useState({});
    const [editingTask, setEditingTask] = useState(null);

    const { data: tasks = [], isLoading } = useTasks({ status: statusFilter || undefined });
    const { data: clients = [] } = useClients();
    const createTask = useCreateTask();
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();

    // Keyboard shortcut: N = new task
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'n' && !e.metaKey && !e.ctrlKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                setShowForm(true);
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...form, client_id: form.client_id || null, estimated_minutes: form.estimated_minutes ? parseInt(form.estimated_minutes) : null };
        createTask.mutate(payload, { onSuccess: () => { setShowForm(false); setForm(INITIAL_FORM); } });
    };

    const handleStatusChange = (taskId, newStatus) => {
        updateTask.mutate({ id: taskId, status: newStatus });
    };

    const handleUpdate = (payload) => {
        updateTask.mutate(payload);
    };

    const toggleGroup = (status) => {
        setCollapsedGroups(prev => ({ ...prev, [status]: !prev[status] }));
    };

    // Sorting
    const sortTasks = (list) => {
        return [...list].sort((a, b) => {
            switch (sortBy) {
                case 'priority': return (PRIORITY_WEIGHT[a.priority] ?? 2) - (PRIORITY_WEIGHT[b.priority] ?? 2);
                case 'created': return new Date(b.created_at) - new Date(a.created_at);
                case 'due_date':
                default:
                    if (!a.due_date && !b.due_date) return 0;
                    if (!a.due_date) return 1;
                    if (!b.due_date) return -1;
                    return new Date(a.due_date) - new Date(b.due_date);
            }
        });
    };

    // Grouping
    const getGroupedTasks = () => {
        if (!groupByStatus) return [{ status: null, tasks: sortTasks(tasks) }];
        return STATUS_ORDER.map(s => ({
            status: s,
            tasks: sortTasks(tasks.filter(t => t.status === s)),
        }));
    };

    const groups = getGroupedTasks();
    const openTasks = tasks.filter(t => t.status !== 'done').length;

    const dueDateDisplay = form.due_date
        ? new Date(form.due_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'No date';

    return (
        <div className="max-w-[1000px] space-y-5">
            {/* Slide-in animation */}
            <style>{`
                @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-slide-in-right { animation: slideInRight 0.25s ease-out; }
            `}</style>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white/90">Tasks</h2>
                    <p className="text-sm text-white/40 mt-0.5">{openTasks} open · {tasks.length} total</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Sort */}
                    <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-white/[0.06] text-white/30 text-xs">
                        <ArrowUpDown className="w-3 h-3" />
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                            className="bg-transparent text-white/50 text-xs outline-none cursor-pointer" style={{ colorScheme: 'dark' }}>
                            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                    {/* Group toggle */}
                    <button onClick={() => setGroupByStatus(!groupByStatus)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${groupByStatus ? 'bg-teal-500/10 text-teal-400 border-teal-500/25' : 'text-white/30 border-white/[0.06] hover:text-white/50'}`}>
                        Group
                    </button>
                    <button onClick={() => setShowForm(true)}
                        className="h-9 px-4 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/25 rounded-lg text-teal-400 text-sm font-medium flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <Plus className="w-4 h-4" /> New Task
                    </button>
                </div>
            </div>

            {/* Status filters */}
            <div className="flex items-center gap-2">
                {[{ value: '', label: 'All' }, ...STATUS_ORDER.map(s => ({ value: s, label: STATUS_CONFIG[s].label }))].map(({ value, label }) => (
                    <button key={value} onClick={() => setStatusFilter(value)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${statusFilter === value ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30' : 'text-white/40 hover:text-white/60 border border-white/[0.06] hover:border-white/[0.12]'}`}>
                        {label}
                    </button>
                ))}
                <span className="text-[10px] text-white/15 ml-2">Press <kbd className="px-1 py-0.5 bg-white/[0.06] rounded text-white/30 font-mono">N</kbd> to create</span>
            </div>

            {/* ─── New Task Modal ─── */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
                    <div className="bg-[#161b22] border border-white/[0.08] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                            <h3 className="text-base font-semibold text-white/90">New Task</h3>
                            <button onClick={() => setShowForm(false)} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Title */}
                            <div>
                                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Title *</label>
                                <input required placeholder="What needs to be done?" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                                    className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/90 placeholder:text-white/25 focus:outline-none focus:border-teal-500/40 focus:bg-white/[0.06] transition-all" />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Description</label>
                                <textarea placeholder="Add details, notes, context..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                    className="w-full h-20 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-teal-500/40 focus:bg-white/[0.06] transition-all resize-none" />
                            </div>

                            {/* Priority pills */}
                            <div>
                                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 block">Priority</label>
                                <div className="flex gap-2">
                                    {PRIORITIES.map(p => (
                                        <button key={p.value} type="button" onClick={() => setForm(prev => ({ ...prev, priority: p.value }))}
                                            className={`flex-1 h-9 rounded-lg text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 ${form.priority === p.value ? p.active : p.color + ' opacity-50 hover:opacity-75'}`}>
                                            <span>{p.emoji}</span> {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category chips */}
                            <div>
                                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 block">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map(c => (
                                        <button key={c.value} type="button" onClick={() => setForm(prev => ({ ...prev, category: c.value }))}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${form.category === c.value ? c.active : c.color + ' opacity-50 hover:opacity-75'}`}>
                                            {c.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Client + Due date row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Client <span className="text-white/20 normal-case">(optional)</span></label>
                                    <Dropdown value={form.client_id} onChange={v => setForm(p => ({ ...p, client_id: v }))}
                                        options={[{ value: '', label: 'None' }, ...clients.map(c => ({ value: c.id, label: c.name }))]} placeholder="No client" />
                                </div>
                                <div>
                                    <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Due Date</label>
                                    <div className="relative">
                                        <button type="button" onClick={() => setShowFormCal(!showFormCal)}
                                            className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-left flex items-center gap-2 hover:border-white/[0.15] transition-colors focus:outline-none focus:border-teal-500/40">
                                            <Calendar className="w-3.5 h-3.5 text-white/30" />
                                            <span className={form.due_date ? 'text-white/80' : 'text-white/30'}>{dueDateDisplay}</span>
                                            {form.due_date && (
                                                <button type="button" onClick={(e) => { e.stopPropagation(); setForm(p => ({ ...p, due_date: '' })); }}
                                                    className="ml-auto text-white/20 hover:text-white/50"><X className="w-3 h-3" /></button>
                                            )}
                                        </button>
                                        {showFormCal && <MiniCalendar value={form.due_date} onChange={v => setForm(p => ({ ...p, due_date: v }))} onClose={() => setShowFormCal(false)} />}
                                    </div>
                                </div>
                            </div>

                            {/* Est. time */}
                            <div>
                                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Estimated Time</label>
                                <div className="flex items-center gap-2">
                                    <input type="number" placeholder="30" value={form.estimated_minutes} onChange={e => setForm(p => ({ ...p, estimated_minutes: e.target.value }))}
                                        className="w-24 h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-teal-500/40" />
                                    <span className="text-xs text-white/30">minutes</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.06]">
                                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 text-sm text-white/50 hover:text-white/70 rounded-lg hover:bg-white/[0.04] transition-colors">Cancel</button>
                                <button type="submit" disabled={createTask.isPending}
                                    className="h-9 px-5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
                                    {createTask.isPending ? 'Creating...' : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── Task List ─── */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" /></div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-20 bg-[#161b22] border border-white/[0.06] rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-3">
                        <Check className="w-5 h-5 text-white/20" />
                    </div>
                    <p className="text-white/30 text-sm mb-2">No tasks{statusFilter ? ` with "${STATUS_CONFIG[statusFilter]?.label}" status` : ''}</p>
                    <button onClick={() => setShowForm(true)} className="text-teal-400 text-sm hover:underline">Create your first task →</button>
                </div>
            ) : groupByStatus ? (
                <div className="space-y-4">
                    {groups.map(({ status, tasks: groupTasks }) => {
                        if (statusFilter && status !== statusFilter) return null;
                        const cfg = STATUS_CONFIG[status];
                        const isCollapsed = collapsedGroups[status];
                        return (
                            <div key={status}>
                                {/* Group header */}
                                <button onClick={() => toggleGroup(status)}
                                    className="flex items-center gap-2 mb-2 group w-full text-left">
                                    <ChevronRight className={`w-3.5 h-3.5 text-white/25 transition-transform ${isCollapsed ? '' : 'rotate-90'}`} />
                                    <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                                    <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
                                    <span className="text-[10px] text-white/20 font-medium">{groupTasks.length}</span>
                                </button>
                                {/* Group tasks */}
                                {!isCollapsed && (
                                    <div className="space-y-1.5 ml-5">
                                        {groupTasks.length > 0 ? groupTasks.map(task => (
                                            <TaskCard key={task.id} task={task}
                                                onStatusChange={handleStatusChange}
                                                onDelete={(id) => deleteTask.mutate(id)}
                                                onOpen={(t) => setEditingTask(t)} />
                                        )) : (
                                            <p className="text-xs text-white/15 py-3 pl-1">No {cfg.label.toLowerCase()} tasks</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-1.5">
                    {sortTasks(tasks).map(task => (
                        <TaskCard key={task.id} task={task}
                            onStatusChange={handleStatusChange}
                            onDelete={(id) => deleteTask.mutate(id)}
                            onOpen={(t) => setEditingTask(t)} />
                    ))}
                </div>
            )}

            {/* ─── Edit Panel ─── */}
            {editingTask && (
                <TaskDetailPanel
                    key={editingTask.id}
                    task={editingTask}
                    clients={clients}
                    onUpdate={handleUpdate}
                    onDelete={(id) => deleteTask.mutate(id)}
                    onClose={() => setEditingTask(null)} />
            )}
        </div>
    );
}
