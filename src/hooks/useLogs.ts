/**
 * Custom hook for managing log data fetching and state
 * Handles pagination, filtering, and real-time updates
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, LOG_AGENT_TABLE } from '../lib/supabase';
import {  FilterOptions, LogsState } from '../types';

export const useLogs = (initialFilters: FilterOptions = {}) => {
  const [state, setState] = useState<LogsState>({
    logs: [],
    loading: true,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
  });

  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  /**
   * Fetch logs from Supabase with filters and pagination
   */
  const fetchLogs = useCallback(async (page: number = 1, limit: number = 10) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      let query = supabase
        .from(LOG_AGENT_TABLE)
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      // Apply filters
      if (filters.method) {
        query = query.eq('method', filters.method);
      }
      if (filters.decision) {
        query = query.eq('decision', filters.decision);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.search) {
        query = query.or(`ip_address.ilike.%${filters.search}%,url.ilike.%${filters.search}%`);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      setState(prev => ({
        ...prev,
        logs: data || [],
        loading: false,
        pagination: {
          page,
          limit,
          total: count || 0,
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  }, [filters]);

  /**
   * Update filters and refetch data
   */
  const updateFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  /**
   * Change page and refetch data
   */
  const changePage = useCallback((newPage: number) => {
    fetchLogs(newPage, state.pagination.limit);
  }, [fetchLogs, state.pagination.limit]);

  /**
   * Refresh logs data
   */
  const refreshLogs = useCallback(() => {
    fetchLogs(state.pagination.page, state.pagination.limit);
  }, [fetchLogs, state.pagination.page, state.pagination.limit]);

  // Fetch logs when filters change
  useEffect(() => {
    fetchLogs(1, state.pagination.limit);
  }, [fetchLogs]);

  return {
    ...state,
    filters,
    updateFilters,
    changePage,
    refreshLogs,
  };
};