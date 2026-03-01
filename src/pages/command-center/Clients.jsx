import { useState } from 'react';
import { useClients, useCreateClient, useDeleteClient } from '@/hooks/command-center/useClients';
import { Plus, Search, MapPin, DollarSign, Globe, Phone, Mail, Trash2, ChevronDown } from 'lucide-react';

const SERVICE_OPTIONS = [
    { value: '', label: 'All Services' },
    { value: 'ketamine', label: 'Ketamine' },
    { value: 'tms', label: 'TMS' },
    { value: 'spravato', label: 'Spravato' },
    { value: 'multi', label: 'Multi-Service' },
];

const STAGE_LABELS = {
    prospect: 'Prospect',
    outreach_sent: 'Outreach Sent',
    demo_booked: 'Demo Booked',
    proposal: 'Proposal',
    onboarded: 'Onboarded',
    active: 'Active',
    churned: 'Churned',
};

const STAGE_COLORS = {
    prospect: 'bg-white/10 text-white/60',
    outreach_sent: 'bg-blue-500/15 text-blue-400',
    demo_booked: 'bg-purple-500/15 text-purple-400',
    proposal: 'bg-amber-500/15 text-amber-400',
    onboarded: 'bg-teal-500/15 text-teal-400',
    active: 'bg-emerald-500/15 text-emerald-400',
    churned: 'bg-red-500/15 text-red-400',
};

const INITIAL_FORM = {
    name: '', city: '', state: '', service_type: 'ketamine', website_url: '',
    contact_name: '', contact_email: '', contact_phone: '', deal_value_monthly: 0, notes: '',
};

export default function Clients() {
    const [search, setSearch] = useState('');
    const [serviceFilter, setServiceFilter] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);

    const { data: clients = [], isLoading } = useClients({ service_type: serviceFilter || undefined });
    const createClient = useCreateClient();
    const deleteClient = useDeleteClient();

    const filtered = clients.filter(c => {
        if (!search) return true;
        const q = search.toLowerCase();
        return c.name?.toLowerCase().includes(q) || c.city?.toLowerCase().includes(q) || c.contact_name?.toLowerCase().includes(q);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createClient.mutate(form, {
            onSuccess: () => { setShowForm(false); setForm(INITIAL_FORM); },
        });
    };

    return (
        <div className="max-w-[1200px] space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white/90">Clients</h2>
                    <p className="text-sm text-white/40 mt-0.5">{filtered.length} clinic{filtered.length !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={() => setShowForm(true)} className="h-9 px-4 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/25 rounded-lg text-teal-400 text-sm font-medium flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> Add Client
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input type="text" placeholder="Search clinics..." value={search} onChange={e => setSearch(e.target.value)} className="w-full h-9 pl-9 pr-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40 transition-colors" />
                </div>
                <div className="relative">
                    <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} className="h-9 pl-3 pr-8 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/60 focus:outline-none focus:border-teal-500/40 appearance-none cursor-pointer" style={{ background: '#161b22' }}>
                        {SERVICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
                </div>
            </div>

            {/* Add Client Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
                    <div className="bg-[#161b22] border border-white/[0.08] rounded-xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Add New Client</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <input required placeholder="Clinic Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="col-span-2 h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                                <input placeholder="City" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                                <input placeholder="State" value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                                <select value={form.service_type} onChange={e => setForm(p => ({ ...p, service_type: e.target.value }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 focus:outline-none focus:border-teal-500/40" style={{ background: '#0d1117' }}>
                                    <option value="ketamine">Ketamine</option>
                                    <option value="tms">TMS</option>
                                    <option value="spravato">Spravato</option>
                                    <option value="multi">Multi-Service</option>
                                </select>
                                <input type="number" placeholder="Deal $/mo" value={form.deal_value_monthly || ''} onChange={e => setForm(p => ({ ...p, deal_value_monthly: parseInt(e.target.value) || 0 }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                                <input placeholder="Contact Name" value={form.contact_name} onChange={e => setForm(p => ({ ...p, contact_name: e.target.value }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                                <input type="email" placeholder="Contact Email" value={form.contact_email} onChange={e => setForm(p => ({ ...p, contact_email: e.target.value }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                                <input placeholder="Website URL" value={form.website_url} onChange={e => setForm(p => ({ ...p, website_url: e.target.value }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                                <input placeholder="Phone" value={form.contact_phone} onChange={e => setForm(p => ({ ...p, contact_phone: e.target.value }))} className="h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40" />
                            </div>
                            <textarea placeholder="Notes" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="w-full h-20 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40 resize-none" />
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 text-sm text-white/50 hover:text-white/70 transition-colors">Cancel</button>
                                <button type="submit" disabled={createClient.isPending} className="h-9 px-5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
                                    {createClient.isPending ? 'Adding...' : 'Add Client'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Client List */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-white/30 text-sm mb-3">No clients yet</p>
                    <button onClick={() => setShowForm(true)} className="text-teal-400 text-sm hover:underline">Add your first client →</button>
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map(client => (
                        <div key={client.id} className="bg-[#161b22] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-colors group">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-sm font-semibold text-white/90">{client.name}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STAGE_COLORS[client.pipeline_stage]}`}>
                                            {STAGE_LABELS[client.pipeline_stage]}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-white/40">
                                        {client.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{client.city}{client.state ? `, ${client.state}` : ''}</span>}
                                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${(client.deal_value_monthly || 0).toLocaleString()}/mo</span>
                                        {client.website_url && <a href={client.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-400 transition-colors"><Globe className="w-3 h-3" />Website</a>}
                                        {client.contact_email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{client.contact_email}</span>}
                                        {client.contact_phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{client.contact_phone}</span>}
                                    </div>
                                </div>
                                <button onClick={() => { if (confirm('Delete this client?')) deleteClient.mutate(client.id); }} className="text-white/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
