import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const CLIENTS_KEY = ['clients'];

export function useClients(filters = {}) {
    return useQuery({
        queryKey: [...CLIENTS_KEY, filters],
        queryFn: async () => {
            let query = supabase.from('clients').select('*').order('created_at', { ascending: false });
            if (filters.pipeline_stage) {
                query = query.eq('pipeline_stage', filters.pipeline_stage);
            }
            if (filters.service_type) {
                query = query.eq('service_type', filters.service_type);
            }
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
    });
}

export function useClient(id) {
    return useQuery({
        queryKey: [...CLIENTS_KEY, id],
        queryFn: async () => {
            const { data, error } = await supabase.from('clients').select('*').eq('id', id).single();
            if (error) throw error;
            return data;
        },
        enabled: !!id,
    });
}

export function useCreateClient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (client) => {
            const { data, error } = await supabase.from('clients').insert(client).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CLIENTS_KEY }),
    });
}

export function useUpdateClient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            const { data, error } = await supabase
                .from('clients')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CLIENTS_KEY }),
    });
}

export function useDeleteClient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from('clients').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CLIENTS_KEY }),
    });
}

export function useClientsByStage() {
    return useQuery({
        queryKey: [...CLIENTS_KEY, 'by-stage'],
        queryFn: async () => {
            const { data, error } = await supabase.from('clients').select('*').order('updated_at', { ascending: false });
            if (error) throw error;
            const stages = {
                prospect: [],
                outreach_sent: [],
                demo_booked: [],
                proposal: [],
                onboarded: [],
                active: [],
                churned: [],
            };
            data.forEach((client) => {
                if (stages[client.pipeline_stage]) {
                    stages[client.pipeline_stage].push(client);
                }
            });
            return stages;
        },
    });
}
