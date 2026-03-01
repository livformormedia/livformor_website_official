import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    GitBranch,
    Users,
    CheckSquare,
    FileText,
    Mail,
    Settings,
    ChevronLeft,
    ChevronRight,
    Zap,
} from 'lucide-react';

const navItems = [
    { path: '/command-center', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/command-center/pipeline', icon: GitBranch, label: 'Pipeline' },
    { path: '/command-center/clients', icon: Users, label: 'Clients' },
    { path: '/command-center/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/command-center/content', icon: FileText, label: 'Content' },
    { path: '/command-center/outreach', icon: Mail, label: 'Outreach' },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'w-[72px]' : 'w-[240px]'
                }`}
            style={{ background: '#0a0f1e' }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-6 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                </div>
                {!collapsed && (
                    <div className="overflow-hidden">
                        <h1 className="text-sm font-bold text-white tracking-tight truncate">LivForMor</h1>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Command Center</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map(({ path, icon: Icon, label, end }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                                ? 'bg-teal-500/10 text-teal-400'
                                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                            }`
                        }
                    >
                        <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                        {!collapsed && <span className="truncate">{label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom section */}
            <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
                <NavLink
                    to="/command-center/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-teal-500/10 text-teal-400' : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                        }`
                    }
                >
                    <Settings className="w-[18px] h-[18px] flex-shrink-0" />
                    {!collapsed && <span>Settings</span>}
                </NavLink>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all w-full"
                >
                    {collapsed ? <ChevronRight className="w-[18px] h-[18px]" /> : <ChevronLeft className="w-[18px] h-[18px]" />}
                    {!collapsed && <span>Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
