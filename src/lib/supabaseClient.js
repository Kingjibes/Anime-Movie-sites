import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://tshigtzrxawswsqfivvo.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzaGlndHpyeGF3c3dzcWZpdnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjMwMTMsImV4cCI6MjA2MzgzOTAxM30.C1vexJvUYWBLmrHNweXvTBOkhO54yf-ipChZm1t-zI4';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);