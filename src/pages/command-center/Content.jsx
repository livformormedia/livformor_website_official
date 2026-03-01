import { useState } from 'react';
import { useContent, useCreateContent, useUpdateContent, useDeleteContent } from '@/hooks/command-center/useContent';
import { useClients } from '@/hooks/command-center/useClients';
import { Plus, FileText, Video, Globe, MessageSquare, Mail, BookOpen, ExternalLink, Trash2, ChevronRight } from 'lucide-react';

const CONTENT_TYPES = {
    landing_page: { label: 'Landing Page', icon: Globe, color: 'text-teal-400 bg-teal-500/10' },
    loom_video: { label: 'Loom Video', icon: Video, color: 'text-purple-400 bg-purple-500/10' },
    blog_post: { label: 'Blog Post', icon: FileText, color: 'text-blue-400 bg-blue-500/10' },
    social_post: { label: 'Social Post', icon: MessageSquare, color: 'text-pink-400 bg-pink-500/10' },
    email_sequence: { label: 'Email Sequence', icon: Mail, color: 'text-amber-400 bg-amber-500/10' },
    case_study: { label: 'Case Study', icon: BookOpen, color: 'text-emerald-400 bg-emerald-500/10' },
};

const STATUSES = [
    { id: 'queued', label: 'Queued', color: 'bg-white/10 text-white/50 border-white/10' },
    { id: 'in_progress', label: 'In Progress', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { id: 'review', label: 'Review', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { id: 'published', label: 'Published', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
];

const INITIAL_FORM = { title: '', content_type: 'landing_page', client_id: '', due_date: '', notes: '' };

export default function Content() {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [viewMode, setViewMode] = useState('board'); // 'board' | 'list'

    const { data: content = [], isLoading } = useContent();
    const { data: clients = [] } = useClients();
    const createContent = useCreateContent();
    const updateContent = useUpdateContent();
    const deleteContent = useDeleteContent();

    const handleSubmit = (e) => {
        e.preventDefault();
        createContent.mutate({ ...form, client_id: form.client_id || null }, {
            onSuccess: () => { setShowForm(false); setForm(INITIAL_FORM); },
        });
    };

    const moveStatus = (item, newStatus) => {
        updateContent.mutate({ id: item.id, status: newStatus });
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white/90">Content Pipeline</h2>
                    <p className="text-sm text-white/40 mt-0.5">{content.length} items</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-white/[0.04] rounded-lg border border-white/[0.06] p-0.5">
                        {['board', 'list'].map(mode => (
                            <button key={mode} onClick={() => setViewMode(mode)} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${viewMode === mode ? 'bg-white/10 text-white/80' : 'text-white/30 hover:text-white/50'}`}>
                                {mode === 'board' ? 'Board' : 'List'}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setShowForm(true)} className="h-9 px-4 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/25 rounded-lg text-teal-400 text-sm font-medium flex items-center gap-2 transition-colors">
                        <Plus className="w-4 h-4" /> Add Content
                    </button>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
                    <div className="bg-[#161b22] border border-white/[0.08] rounded-xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Add Content</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input required placeholder="Title *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                            <div className="grid grid-cols-2 gap-3">
                                <select value={form.content_type} onChange={e => setForm(p => ({ ...p, content_type: e.target.value }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 focus:outline-none" style={{ background: '#0d1117' }}>
                                    {Object.entries(CONTENT_TYPES).map(([v, c]) => <option key={v} value={v}>{c.label}</option>)}
                                </select>
                                <select value={form.client_id} onChange={e => setForm(p => ({ ...p, client_id: e.target.value }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 focus:outline-none" style={{ background: '#0d1117' }}>
                                    <option value="">No Client</option>
                                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <input type="date" value={form.due_date} onChange={e => setForm(p => ({ ...p, due_date: e.target.value }))} className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80" style={{ colorScheme: 'dark' }} />
                            <textarea placeholder="Notes" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="w-full h-16 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none resize-none" />
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 text-sm text-white/50">Cancel</button>
                                <button type="submit" disabled={createContent.isPending} className="h-9 px-5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
                                    {createContent.isPending ? 'Adding...' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Board View */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" /></div>
            ) : viewMode === 'board' ? (
                <div className="grid grid-cols-4 gap-4">
                    {STATUSES.map(status => {
                        const items = content.filter(c => c.status === status.id);
                        return (
                            <div key={status.id}>
                                <div className={`flex items-center gap-2 px-3 py-2 mb-3 rounded-lg bg-[#161b22] border border-white/[0.04]`}>
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${status.color.split(' ')[1]}`}>{status.label}</span>
                                    <span className="ml-auto text-xs text-white/20 font-mono">{items.length}</span>
                                </div>
                                <div className="space-y-2 min-h-[100px]">
                                    {items.map(item => {
                                        const ct = CONTENT_TYPES[item.content_type];
                                        const Icon = ct?.icon || FileText;
                                        return (
                                            <div key={item.id} className="bg-[#161b22] border border-white/[0.06] rounded-lg p-3 hover:border-white/[0.12] transition-colors group">
                                                <div className="flex items-start gap-2 mb-2">
                                                    <div className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 ${ct?.color || 'bg-white/5 text-white/30'}`}>
                                                        <Icon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-xs font-semibold text-white/85 truncate">{item.title}</h4>
                                                        {item.clients?.name && <p className="text-[10px] text-white/30 mt-0.5">{item.clients.name}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    {item.due_date && <span className="text-[10px] text-white/25">{new Date(item.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                                        {status.id !== 'published' && (
                                                            <button onClick={() => moveStatus(item, STATUSES[STATUSES.findIndex(s => s.id === status.id) + 1].id)} className="text-[10px] text-teal-400/60 hover:text-teal-400 flex items-center gap-0.5">
                                                                Move <ChevronRight className="w-2.5 h-2.5" />
                                                            </button>
                                                        )}
                                                        <button onClick={() => deleteContent.mutate(item.id)} className="text-white/20 hover:text-red-400 transition-colors">
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* List View */
                <div className="space-y-1.5">
                    {content.map(item => {
                        const ct = CONTENT_TYPES[item.content_type];
                        const Icon = ct?.icon || FileText;
                        const status = STATUSES.find(s => s.id === item.status);
                        return (
                            <div key={item.id} className="bg-[#161b22] border border-white/[0.06] rounded-lg px-4 py-3 flex items-center gap-3 hover:border-white/[0.12] transition-colors group">
                                <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${ct?.color || 'bg-white/5 text-white/30'}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm text-white/85">{item.title}</span>
                                    {item.clients?.name && <span className="text-xs text-white/30 ml-2">{item.clients.name}</span>}
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${status?.color} font-medium`}>{status?.label}</span>
                                <button onClick={() => deleteContent.mutate(item.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
