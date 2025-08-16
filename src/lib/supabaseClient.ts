import { createClient } from '@supabase/supabase-js';

// Publicly available keys, safe to use in client and server code
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// This client is for public and authenticated user actions and is subject to RLS policies.[9]
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// The service role key must be kept private and used in API Routes only.[1, 2, 10]
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);