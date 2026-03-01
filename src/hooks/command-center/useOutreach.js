import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const OUTREACH_KEY = ['outreach'];

export function useOutreach(filters = {}) {
    return useQuery({
        queryKey: [...OUTREACH_KEY, filters],
        queryFn: async () => {
            let query = supabase.from('outreach').select('*, clients(name, city, service_type)').order('created_at', { ascending: false });
            if (filters.sequence_status) query = query.eq('sequence_status', filters.sequence_status);
            if (filters.client_id) query = query.eq('client_id', filters.client_id);
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
    });
}

export function useCreateOutreach() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (item) => {
            const { data, error } = await supabase.from('outreach').insert(item).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: OUTREACH_KEY }),
    });
}

export function useUpdateOutreach() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            const { data, error } = await supabase.from('outreach').update(updates).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: OUTREACH_KEY }),
    });
}

export function useOutreachStats() {
    return useQuery({
        queryKey: [...OUTREACH_KEY, 'stats'],
        queryFn: async () => {
            const { data, error } = await supabase.from('outreach').select('*');
            if (error) throw error;
            return {
                total: data.length,
                active: data.filter(o => !['not_started', 'completed', 'replied', 'bounced'].includes(o.sequence_status)).length,
                replied: data.filter(o => o.response_received).length,
                demos: data.filter(o => o.demo_booked).length,
                completed: data.filter(o => o.sequence_status === 'completed').length,
            };
        },
    });
}
