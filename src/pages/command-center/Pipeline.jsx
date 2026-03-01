import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useClientsByStage, useUpdateClient } from '@/hooks/command-center/useClients';
import { MapPin, DollarSign, Clock, ExternalLink, MoreHorizontal } from 'lucide-react';

const STAGES = [
    { id: 'prospect', label: 'Prospect', color: 'border-white/10', dotColor: 'bg-white/30' },
    { id: 'outreach_sent', label: 'Outreach Sent', color: 'border-blue-500/30', dotColor: 'bg-blue-400' },
    { id: 'demo_booked', label: 'Demo Booked', color: 'border-purple-500/30', dotColor: 'bg-purple-400' },
    { id: 'proposal', label: 'Proposal', color: 'border-amber-500/30', dotColor: 'bg-amber-400' },
    { id: 'onboarded', label: 'Onboarded', color: 'border-teal-500/30', dotColor: 'bg-teal-400' },
    { id: 'active', label: 'Active', color: 'border-emerald-500/30', dotColor: 'bg-emerald-400' },
    { id: 'churned', label: 'Churned', color: 'border-red-500/30', dotColor: 'bg-red-400' },
];

const SERVICE_BADGES = {
    ketamine: { label: 'Ketamine', class: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
    tms: { label: 'TMS', class: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    spravato: { label: 'Spravato', class: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    multi: { label: 'Multi', class: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
};

function daysAgo(dateStr) {
    if (!dateStr) return null;
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function ClinicCard({ client, index }) {
    const days = daysAgo(client.updated_at);
    const badge = SERVICE_BADGES[client.service_type] || { label: client.service_type || '—', class: 'bg-white/5 text-white/40 border-white/10' };

    return (
        <Draggable draggableId={client.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-[#0d1117] border border-white/[0.06] rounded-lg p-3.5 mb-2 cursor-grab active:cursor-grabbing transition-all hover:border-white/[0.12] ${snapshot.isDragging ? 'shadow-xl shadow-teal-500/10 border-teal-500/30 rotate-1' : ''
                        }`}
                >
                    <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-semibold text-white/90 leading-tight pr-2">{client.name}</h4>
                        <button className="text-white/20 hover:text-white/50 transition-colors flex-shrink-0 mt-0.5">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 mb-2.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${badge.class} font-medium`}>{badge.label}</span>
                        {client.city && (
                            <span className="text-[10px] text-white/30 flex items-center gap-0.5">
                                <MapPin className="w-2.5 h-2.5" />
                                {client.city}{client.state ? `, ${client.state}` : ''}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1 text-white/40">
                            <DollarSign className="w-3 h-3" />
                            <span>${(client.deal_value_monthly || 0).toLocaleString()}/mo</span>
                        </div>
                        {days !== null && (
                            <div className={`flex items-center gap-1 ${days > 7 ? 'text-amber-400/60' : 'text-white/25'}`}>
                                <Clock className="w-3 h-3" />
                                <span>{days}d</span>
                            </div>
                        )}
                    </div>

                    {client.website_url && (
                        <a
                            href={client.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-[10px] text-teal-400/50 hover:text-teal-400 flex items-center gap-1 transition-colors"
                        >
                            <ExternalLink className="w-2.5 h-2.5" /> Website
                        </a>
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default function Pipeline() {
    const { data: stageData, isLoading } = useClientsByStage();
    const updateClient = useUpdateClient();
    const [filter, setFilter] = useState('all');

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const { draggableId, destination } = result;
        const newStage = destination.droppableId;
        updateClient.mutate({ id: draggableId, pipeline_stage: newStage });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const stages = stageData || { prospect: [], outreach_sent: [], demo_booked: [], proposal: [], onboarded: [], active: [], churned: [] };

    return (
        <div className="h-[calc(100vh-112px)] flex flex-col">
            {/* Filters */}
            <div className="flex items-center gap-2 mb-4 flex-shrink-0">
                {['all', 'ketamine', 'tms', 'spravato'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filter === type
                                ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                                : 'text-white/40 hover:text-white/60 border border-white/[0.06] hover:border-white/[0.12]'
                            }`}
                    >
                        {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {/* Kanban Board */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex gap-3 overflow-x-auto flex-1 pb-4">
                    {STAGES.map(({ id: stageId, label, color, dotColor }) => {
                        const stageClients = (stages[stageId] || []).filter(
                            c => filter === 'all' || c.service_type === filter
                        );

                        return (
                            <div key={stageId} className={`flex-shrink-0 w-[260px] flex flex-col`}>
                                {/* Column Header */}
                                <div className={`flex items-center gap-2 px-3 py-2.5 mb-2 rounded-lg bg-[#161b22] border-l-2 ${color}`}>
                                    <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">{label}</span>
                                    <span className="ml-auto text-xs text-white/25 font-mono">{stageClients.length}</span>
                                </div>

                                {/* Droppable Area */}
                                <Droppable droppableId={stageId}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`flex-1 rounded-lg p-1.5 min-h-[100px] transition-colors ${snapshot.isDraggingOver ? 'bg-teal-500/[0.04] ring-1 ring-teal-500/20' : 'bg-transparent'
                                                }`}
                                        >
                                            {stageClients.map((client, index) => (
                                                <ClinicCard key={client.id} client={client} index={index} />
                                            ))}
                                            {provided.placeholder}
                                            {stageClients.length === 0 && !snapshot.isDraggingOver && (
                                                <div className="text-center py-8 text-white/15 text-xs">
                                                    No clinics
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}
