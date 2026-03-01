import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/command-center/layout/Sidebar';
import TopBar from '@/components/command-center/layout/TopBar';
import Dashboard from '@/pages/command-center/Dashboard';
import Pipeline from '@/pages/command-center/Pipeline';
import Clients from '@/pages/command-center/Clients';
import Tasks from '@/pages/command-center/Tasks';
import Content from '@/pages/command-center/Content';
import Outreach from '@/pages/command-center/Outreach';
import Settings from '@/pages/command-center/Settings';
import { LayoutDashboard, Users, CheckSquare, FileText, Mail } from 'lucide-react';

export default function CommandCenter() {
    const [showAddModal, setShowAddModal] = useState(false);
    const navigate = useNavigate();

    const quickAddOptions = [
        { label: 'New Client', icon: Users, path: '/command-center/clients', color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
        { label: 'New Task', icon: CheckSquare, path: '/command-center/tasks', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
        { label: 'New Content', icon: FileText, path: '/command-center/content', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
        { label: 'New Outreach', icon: Mail, path: '/command-center/outreach', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    ];

    return (
        <div className="min-h-screen" style={{ background: '#0d1117' }}>
            <Sidebar />
            <div className="ml-[240px] flex flex-col min-h-screen">
                <TopBar title="Command Center" onQuickAdd={() => setShowAddModal(true)} />
                <main className="flex-1 p-6 overflow-auto">
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="pipeline" element={<Pipeline />} />
                        <Route path="clients" element={<Clients />} />
                        <Route path="tasks" element={<Tasks />} />
                        <Route path="content" element={<Content />} />
                        <Route path="outreach" element={<Outreach />} />
                        <Route path="settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>

            {/* Quick Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
                    <div className="bg-[#161b22] border border-white/[0.08] rounded-xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Quick Add</h3>
                        <div className="space-y-2">
                            {quickAddOptions.map(opt => (
                                <button
                                    key={opt.label}
                                    onClick={() => { setShowAddModal(false); navigate(opt.path); }}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg border ${opt.color} hover:opacity-90 transition-all text-left`}
                                >
                                    <opt.icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setShowAddModal(false)} className="w-full mt-3 h-9 text-sm text-white/30 hover:text-white/50 transition-colors">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
