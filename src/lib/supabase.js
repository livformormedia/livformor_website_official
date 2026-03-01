import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yrfobzuiqcuhylstiukn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZm9ienVpcWN1aHlsc3RpdWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjExMDIsImV4cCI6MjA4NjAzNzEwMn0.Rvv0jffFSDYejIpddmD8UMTS599-xx58iWAU3l24ca0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
