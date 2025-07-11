/**
 * Type definitions for the cybersecurity log agent system
 */

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: string | null;
}

export interface LogEntry {
  id?: string;
  ip_address: string;
  method: string;
  query_string: string;
  user_agent: string;
  decision: string;
  confidence: string;
  reasoning: string;
  decision_maker: string;
  url: string;
  status: number;
  created_at?: string;
}

export interface FilterOptions {
  method?: string;
  decision?: string;
  status?: string;
  search?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface LogsState {
  logs: LogEntry[];
  loading: boolean;
  error: string | null;
  pagination: PaginationOptions;
}
