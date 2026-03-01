import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KPICard({ label, value, icon: Icon, trend, trendLabel, color = 'teal' }) {
    const colorMap = {
        teal: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
        gold: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
        green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
        red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
        purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
        blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    };

    const c = colorMap[color] || colorMap.teal;

    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
    const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-white/30';

    return (
        <div className="bg-[#161b22] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-colors group">
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.border} border flex items-center justify-center`}>
                    {Icon && <Icon className={`w-5 h-5 ${c.text}`} />}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
                        <TrendIcon className="w-3 h-3" />
                        {trendLabel && <span>{trendLabel}</span>}
                    </div>
                )}
            </div>
            <div className="text-2xl font-bold text-white/90 mb-1 tracking-tight">{value}</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">{label}</div>
        </div>
    );
}
