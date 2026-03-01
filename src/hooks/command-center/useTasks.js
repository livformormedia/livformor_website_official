import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const TASKS_KEY = ['tasks'];

export function useTasks(filters = {}) {
    return useQuery({
        queryKey: [...TASKS_KEY, filters],
        queryFn: async () => {
            let query = supabase.from('tasks').select('*').order('due_date', { ascending: true, nullsFirst: false });
            if (filters.status) query = query.eq('status', filters.status);
            if (filters.client_id) query = query.eq('client_id', filters.client_id);
            if (filters.priority) query = query.eq('priority', filters.priority);
            if (filters.category) query = query.eq('category', filters.category);
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
    });
}

export function useCreateTask() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (task) => {
            const { data, error } = await supabase.from('tasks').insert(task).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
    });
}

export function useUpdateTask() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            if (updates.status === 'done' && !updates.completed_at) {
                updates.completed_at = new Date().toISOString();
            }
            const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
    });
}

export function useDeleteTask() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from('tasks').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
    });
}

export function useTaskStats() {
    return useQuery({
        queryKey: [...TASKS_KEY, 'stats'],
        queryFn: async () => {
            const { data, error } = await supabase.from('tasks').select('status, priority');
            if (error) throw error;
            return {
                total: data.length,
                todo: data.filter(t => t.status === 'todo').length,
                in_progress: data.filter(t => t.status === 'in_progress').length,
                blocked: data.filter(t => t.status === 'blocked').length,
                done: data.filter(t => t.status === 'done').length,
                urgent: data.filter(t => t.priority === 'urgent').length,
            };
        },
    });
}
