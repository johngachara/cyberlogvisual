/**
 * Supabase client configuration
 * Initialize the Supabase client with environment variables
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables - these should be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Database table name
export const LOG_AGENT_TABLE = 'logagent';