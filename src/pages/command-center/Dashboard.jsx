import { Users, CheckSquare, DollarSign, Mail, GitBranch, TrendingUp } from 'lucide-react';
import KPICard from '@/components/command-center/dashboard/KPICard';
import { useClients } from '@/hooks/command-center/useClients';
import { useTaskStats } from '@/hooks/command-center/useTasks';
import { useOutreachStats } from '@/hooks/command-center/useOutreach';
import { useContent } from '@/hooks/command-center/useContent';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Placeholder MRR data — will be replaced with Stripe data
const mrrData = [
    { month: 'Sep', mrr: 0 },
    { month: 'Oct', mrr: 2000 },
    { month: 'Nov', mrr: 3500 },
    { month: 'Dec', mrr: 4200 },
    { month: 'Jan', mrr: 6800 },
    { month: 'Feb', mrr: 8200 },
];

const STAGE_LABELS = {
    prospect: 'Prospect',
    outreach_sent: 'Outreach',
    demo_booked: 'Demo',
    proposal: 'Proposal',
    onboarded: 'Onboarding',
    active: 'Active',
    churned: 'Churned',
};

const STAGE_COLORS = {
    prospect: 'bg-white/10',
    outreach_sent: 'bg-blue-500/20',
    demo_booked: 'bg-purple-500/20',
    proposal: 'bg-amber-500/20',
    onboarded: 'bg-teal-500/20',
    active: 'bg-emerald-500/20',
    churned: 'bg-red-500/20',
};

export default function Dashboard() {
    const { data: clients = [] } = useClients();
    const { data: taskStats = { total: 0, todo: 0, in_progress: 0, blocked: 0, done: 0, urgent: 0 } } = useTaskStats();
    const { data: outreachStats = { total: 0, active: 0, replied: 0, demos: 0 } } = useOutreachStats();
    const { data: contentItems = [] } = useContent();

    const activeClients = clients.filter(c => c.pipeline_stage === 'active').length;
    const pipelineValue = clients.filter(c => !['churned', 'active'].includes(c.pipeline_stage)).reduce((sum, c) => sum + (c.deal_value_monthly || 0), 0);
    const openTasks = taskStats.total - taskStats.done;

    // Compute stage counts
    const stageCounts = {};
    clients.forEach(c => {
        stageCounts[c.pipeline_stage] = (stageCounts[c.pipeline_stage] || 0) + 1;
    });

    // Recent tasks (top 5 non-done)
    // We'll show from taskStats for now

    return (
        <div className="space-y-6 max-w-[1400px]">
            {/* KPI Strip */}
            <div className="grid grid-cols-5 gap-4">
                <KPICard label="Active Clients" value={activeClients} icon={Users} color="teal" trend="up" trendLabel="+2" />
                <KPICard label="Pipeline Value" value={`$${pipelineValue.toLocaleString()}/mo`} icon={GitBranch} color="purple" />
                <KPICard label="MRR" value="$8,200" icon={DollarSign} color="gold" trend="up" trendLabel="+18%" />
                <KPICard label="Open Tasks" value={openTasks} icon={CheckSquare} color={openTasks > 15 ? 'red' : 'green'} />
                <KPICard label="Outreach Sent" value={`${outreachStats.total}`} icon={Mail} color="blue" />
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-3 gap-6">
                {/* Pipeline Summary */}
                <div className="col-span-2 bg-[#161b22] border border-white/[0.06] rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Pipeline Overview</h3>
                    <div className="flex gap-2">
                        {Object.entries(STAGE_LABELS).map(([stage, label]) => (
                            <div key={stage} className={`flex-1 ${STAGE_COLORS[stage]} rounded-lg p-3 text-center`}>
                                <div className="text-xl font-bold text-white/90">{stageCounts[stage] || 0}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-[#161b22] border border-white/[0.06] rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Task Breakdown</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'To Do', count: taskStats.todo, color: 'bg-white/20' },
                            { label: 'In Progress', count: taskStats.in_progress, color: 'bg-blue-500' },
                            { label: 'Blocked', count: taskStats.blocked, color: 'bg-red-500' },
                            { label: 'Done', count: taskStats.done, color: 'bg-emerald-500' },
                        ].map(({ label, count, color }) => (
                            <div key={label} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${color}`} />
                                    <span className="text-sm text-white/60">{label}</span>
                                </div>
                                <span className="text-sm font-semibold text-white/80">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MRR Chart */}
            <div className="bg-[#161b22] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Revenue Trend</h3>
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>+18% this month</span>
                    </div>
                </div>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mrrData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                            <Tooltip
                                contentStyle={{ background: '#1c2333', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#e6edf3', fontSize: '12px' }}
                                formatter={(v) => [`$${v.toLocaleString()}`, 'MRR']}
                            />
                            <Area type="monotone" dataKey="mrr" stroke="#2dd4bf" strokeWidth={2} fill="url(#mrrGradient)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Content Pipeline Mini */}
            <div className="bg-[#161b22] border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Content Pipeline</h3>
                <div className="grid grid-cols-4 gap-3">
                    {['queued', 'in_progress', 'review', 'published'].map(status => {
                        const count = contentItems.filter(c => c.status === status).length;
                        const labels = { queued: 'Queued', in_progress: 'In Progress', review: 'Review', published: 'Published' };
                        const colors = { queued: 'text-white/40', in_progress: 'text-blue-400', review: 'text-amber-400', published: 'text-emerald-400' };
                        return (
                            <div key={status} className="bg-white/[0.02] rounded-lg p-3 text-center border border-white/[0.04]">
                                <div className={`text-2xl font-bold ${colors[status]}`}>{count}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{labels[status]}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
