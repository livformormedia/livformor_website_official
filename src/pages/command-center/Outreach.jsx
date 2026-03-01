import { useState } from 'react';
import { useOutreach, useCreateOutreach, useUpdateOutreach } from '@/hooks/command-center/useOutreach';
import { useClients } from '@/hooks/command-center/useClients';
import { Plus, Mail, CheckCircle, Clock, XCircle, MessageSquare, Calendar, ExternalLink, Video, Globe } from 'lucide-react';

const SEQUENCE_STEPS = ['email_1', 'email_2', 'email_3', 'email_4'];
const STATUS_LABELS = {
    not_started: 'Not Started',
    email_1: 'Email 1 Sent',
    email_2: 'Email 2 Sent',
    email_3: 'Email 3 Sent',
    email_4: 'Email 4 Sent',
    completed: 'Completed',
    replied: 'Replied',
    bounced: 'Bounced',
};

const getStepIcon = (status, step) => {
    const stepNum = SEQUENCE_STEPS.indexOf(step) + 1;
    const currentNum = SEQUENCE_STEPS.indexOf(status) + 1;
    if (status === 'completed' || status === 'replied') return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    if (status === 'bounced') return <XCircle className="w-4 h-4 text-red-400" />;
    if (stepNum <= currentNum && currentNum > 0) return <CheckCircle className="w-4 h-4 text-teal-400" />;
    if (stepNum === currentNum + 1) return <Clock className="w-4 h-4 text-amber-400" />;
    return <div className="w-4 h-4 rounded-full border border-white/20" />;
};

const INITIAL_FORM = { client_id: '', email_address: '', landing_page_url: '', loom_url: '', notes: '' };

export default function Outreach() {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);

    const { data: outreach = [], isLoading } = useOutreach();
    const { data: clients = [] } = useClients();
    const createOutreach = useCreateOutreach();
    const updateOutreach = useUpdateOutreach();

    const handleSubmit = (e) => {
        e.preventDefault();
        createOutreach.mutate({ ...form, client_id: form.client_id || null }, {
            onSuccess: () => { setShowForm(false); setForm(INITIAL_FORM); },
        });
    };

    const advanceSequence = (item) => {
        const currentIdx = SEQUENCE_STEPS.indexOf(item.sequence_status);
        let nextStatus;
        if (item.sequence_status === 'not_started') nextStatus = 'email_1';
        else if (currentIdx >= 0 && currentIdx < SEQUENCE_STEPS.length - 1) nextStatus = SEQUENCE_STEPS[currentIdx + 1];
        else nextStatus = 'completed';

        const updates = { id: item.id, sequence_status: nextStatus };
        const sentField = `${nextStatus}_sent_at`;
        if (SEQUENCE_STEPS.includes(nextStatus)) updates[sentField] = new Date().toISOString();
        updateOutreach.mutate(updates);
    };

    const markReplied = (item) => {
        updateOutreach.mutate({ id: item.id, sequence_status: 'replied', response_received: true });
    };

    const markDemo = (item) => {
        updateOutreach.mutate({ id: item.id, demo_booked: true });
    };

    // Stats
    const stats = {
        total: outreach.length,
        active: outreach.filter(o => SEQUENCE_STEPS.includes(o.sequence_status)).length,
        replied: outreach.filter(o => o.response_received).length,
        demos: outreach.filter(o => o.demo_booked).length,
    };

    return (
        <div className="max-w-[1200px] space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white/90">Outreach Tracker</h2>
                    <p className="text-sm text-white/40 mt-0.5">{stats.total} campaigns</p>
                </div>
                <button onClick={() => setShowForm(true)} className="h-9 px-4 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/25 rounded-lg text-teal-400 text-sm font-medium flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> New Outreach
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
                {[
                    { label: 'Total Sent', value: stats.total, color: 'text-white/60' },
                    { label: 'Active Sequences', value: stats.active, color: 'text-blue-400' },
                    { label: 'Replied', value: stats.replied, color: 'text-emerald-400' },
                    { label: 'Demos Booked', value: stats.demos, color: 'text-amber-400' },
                ].map(s => (
                    <div key={s.label} className="bg-[#161b22] border border-white/[0.06] rounded-lg p-3 text-center">
                        <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
                    <div className="bg-[#161b22] border border-white/[0.08] rounded-xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-white/90 mb-4">New Outreach</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <select required value={form.client_id} onChange={e => setForm(p => ({ ...p, client_id: e.target.value }))} className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80" style={{ background: '#0d1117' }}>
                                <option value="">Select Client *</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <input required type="email" placeholder="Email Address *" value={form.email_address} onChange={e => setForm(p => ({ ...p, email_address: e.target.value }))} className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                            <input placeholder="Landing Page URL" value={form.landing_page_url} onChange={e => setForm(p => ({ ...p, landing_page_url: e.target.value }))} className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none" />
                            <input placeholder="Loom URL" value={form.loom_url} onChange={e => setForm(p => ({ ...p, loom_url: e.target.value }))} className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none" />
                            <textarea placeholder="Notes" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="w-full h-16 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 resize-none" />
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 text-sm text-white/50">Cancel</button>
                                <button type="submit" disabled={createOutreach.isPending} className="h-9 px-5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
                                    {createOutreach.isPending ? 'Adding...' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Outreach Table */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" /></div>
            ) : outreach.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-white/30 text-sm mb-3">No outreach campaigns yet</p>
                    <button onClick={() => setShowForm(true)} className="text-teal-400 text-sm hover:underline">Start your first campaign →</button>
                </div>
            ) : (
                <div className="space-y-2">
                    {outreach.map(item => (
                        <div key={item.id} className="bg-[#161b22] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="text-sm font-semibold text-white/90">{item.clients?.name || 'Unknown Clinic'}</h4>
                                    <p className="text-xs text-white/40 mt-0.5">{item.email_address}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.demo_booked && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 font-medium">🎯 Demo</span>}
                                    {item.response_received && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">💬 Replied</span>}
                                </div>
                            </div>

                            {/* Sequence Progress */}
                            <div className="flex items-center gap-2 mb-3">
                                {SEQUENCE_STEPS.map((step, i) => (
                                    <div key={step} className="flex items-center gap-1.5">
                                        {getStepIcon(item.sequence_status, step)}
                                        <span className="text-[10px] text-white/30">Email {i + 1}</span>
                                        {i < SEQUENCE_STEPS.length - 1 && <div className="w-8 h-px bg-white/10" />}
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                {item.sequence_status !== 'completed' && item.sequence_status !== 'replied' && item.sequence_status !== 'bounced' && (
                                    <button onClick={() => advanceSequence(item)} className="text-[10px] px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/20 transition-colors font-medium">
                                        {item.sequence_status === 'not_started' ? 'Send Email 1' : `Send Next Email`}
                                    </button>
                                )}
                                {!item.response_received && (
                                    <button onClick={() => markReplied(item)} className="text-[10px] px-2.5 py-1 rounded bg-white/[0.04] text-white/40 border border-white/[0.08] hover:text-emerald-400 hover:border-emerald-500/20 transition-colors font-medium">Mark Replied</button>
                                )}
                                {!item.demo_booked && (
                                    <button onClick={() => markDemo(item)} className="text-[10px] px-2.5 py-1 rounded bg-white/[0.04] text-white/40 border border-white/[0.08] hover:text-amber-400 hover:border-amber-500/20 transition-colors font-medium">Demo Booked</button>
                                )}
                                {item.landing_page_url && (
                                    <a href={item.landing_page_url} target="_blank" rel="noopener noreferrer" className="text-[10px] px-2.5 py-1 rounded bg-white/[0.04] text-white/30 border border-white/[0.08] hover:text-teal-400 transition-colors font-medium flex items-center gap-1">
                                        <Globe className="w-2.5 h-2.5" /> Landing Page
                                    </a>
                                )}
                                {item.loom_url && (
                                    <a href={item.loom_url} target="_blank" rel="noopener noreferrer" className="text-[10px] px-2.5 py-1 rounded bg-white/[0.04] text-white/30 border border-white/[0.08] hover:text-purple-400 transition-colors font-medium flex items-center gap-1">
                                        <Video className="w-2.5 h-2.5" /> Loom
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
