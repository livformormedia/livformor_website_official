import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const CONTENT_KEY = ['content_items'];

export function useContent(filters = {}) {
    return useQuery({
        queryKey: [...CONTENT_KEY, filters],
        queryFn: async () => {
            let query = supabase.from('content_items').select('*, clients(name)').order('created_at', { ascending: false });
            if (filters.status) query = query.eq('status', filters.status);
            if (filters.content_type) query = query.eq('content_type', filters.content_type);
            if (filters.client_id) query = query.eq('client_id', filters.client_id);
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
    });
}

export function useCreateContent() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (item) => {
            const { data, error } = await supabase.from('content_items').insert(item).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: CONTENT_KEY }),
    });
}

export function useUpdateContent() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            const { data, error } = await supabase.from('content_items').update(updates).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: CONTENT_KEY }),
    });
}

export function useDeleteContent() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from('content_items').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: CONTENT_KEY }),
    });
}
