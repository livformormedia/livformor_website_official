import { useState } from 'react';
import { Search, Plus, Bell } from 'lucide-react';

export default function TopBar({ title, onQuickAdd }) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 flex-shrink-0" style={{ background: 'rgba(13, 17, 23, 0.8)', backdropFilter: 'blur(12px)' }}>
            {/* Left — Title */}
            <h2 className="text-lg font-semibold text-white/90">{title}</h2>

            {/* Right — Search + Actions */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-56 h-9 pl-9 pr-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-teal-500/40 focus:bg-white/[0.06] transition-colors"
                    />
                </div>

                {/* Quick Add */}
                {onQuickAdd && (
                    <button
                        onClick={onQuickAdd}
                        className="h-9 px-3 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 rounded-lg text-teal-400 text-sm font-medium flex items-center gap-1.5 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                    </button>
                )}

                {/* Notifications */}
                <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-colors">
                    <Bell className="w-[18px] h-[18px]" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full" />
                </button>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                    OM
                </div>
            </div>
        </header>
    );
}
