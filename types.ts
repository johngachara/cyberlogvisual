import type { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

export type Decision = 'allowed' | 'blocked' | 'monitored';

export interface LogEntry {
  created_at: string | number | Date;
  id: number;
  ip_address: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  query_string: string;
  user_agent: string;
  decision: Decision;
  confidence: number;
  reasoning: string;
  decision_maker: string;
  url: string;
  status: number;
  timestamp: string;
}

// Use the official Supabase types for User and Session for type consistency.
export type User = SupabaseUser;
export type Session = SupabaseSession;