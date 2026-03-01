import { User, Shield, Bell, Palette, Database, ExternalLink } from 'lucide-react';

export default function Settings() {
    return (
        <div className="max-w-[800px] space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white/90">Settings</h2>
                <p className="text-sm text-white/40 mt-0.5">Configure your Command Center</p>
            </div>

            {/* Profile */}
            <div className="bg-[#161b22] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <User className="w-4 h-4 text-teal-400" />
                    <h3 className="text-sm font-semibold text-white/80">Profile</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] uppercase tracking-wider text-white/30 mb-1 block">Name</label>
                        <input defaultValue="Oriel Mor" className="w-full h-9 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 focus:outline-none focus:border-teal-500/40" />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-wider text-white/30 mb-1 block">Email</label>
                        <input defaultValue="oriel@livformor.com" className="w-full h-9 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 focus:outline-none focus:border-teal-500/40" />
                    </div>
                </div>
            </div>

            {/* Integrations */}
            <div className="bg-[#161b22] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <Database className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-semibold text-white/80">Integrations</h3>
                </div>
                <div className="space-y-3">
                    {[
                        { name: 'Supabase', status: 'Connected', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: 'Database & storage' },
                        { name: 'GoHighLevel', status: 'Not Connected', color: 'text-white/30 bg-white/[0.04] border-white/[0.08]', desc: 'CRM & automations' },
                        { name: 'Stripe', status: 'Not Connected', color: 'text-white/30 bg-white/[0.04] border-white/[0.08]', desc: 'Billing & MRR' },
                    ].map(i => (
                        <div key={i.name} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                            <div>
                                <div className="text-sm font-medium text-white/80">{i.name}</div>
                                <div className="text-[10px] text-white/30">{i.desc}</div>
                            </div>
                            <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${i.color}`}>{i.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-[#161b22] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-semibold text-white/80">Notifications</h3>
                </div>
                <div className="space-y-3">
                    {['Task due reminders', 'Pipeline stage changes', 'New outreach replies'].map(label => (
                        <label key={label} className="flex items-center justify-between cursor-pointer">
                            <span className="text-sm text-white/60">{label}</span>
                            <div className="w-9 h-5 bg-teal-500/30 rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-teal-400 rounded-full transition-all" />
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#161b22] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <ExternalLink className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-white/80">Quick Links</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { name: 'Supabase Dashboard', url: 'https://supabase.com/dashboard/project/yrfobzuiqcuhylstiukn' },
                        { name: 'GoHighLevel', url: 'https://app.gohighlevel.com' },
                        { name: 'Stripe Dashboard', url: 'https://dashboard.stripe.com' },
                        { name: 'LivForMor Website', url: 'https://www.livformor.com' },
                    ].map(l => (
                        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 bg-white/[0.02] rounded-lg border border-white/[0.04] hover:border-white/[0.12] transition-colors text-sm text-white/50 hover:text-teal-400">
                            <ExternalLink className="w-3 h-3" />
                            {l.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
