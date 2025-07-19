import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import { LogEntry } from '../types';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import LogTable from '../components/LogTable';
import LogDetailModal from '../components/LogDetailModal';
import Analytics from '../components/Analytics';
import Spinner from '../components/common/Spinner';
import { BarChart3, Table, Shield, RefreshCw } from 'lucide-react';

const LOGS_PER_PAGE = 15;

const Dashboard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [dataReady, setDataReady] = useState(false);

  // Tab state for Analytics vs Logs view
  const [activeTab, setActiveTab] = useState<'logs' | 'analytics'>('logs');

  // Filtering and Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ method: string; status: string; decision: string }>({
    method: 'all',
    status: 'all',
    decision: 'all',
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = useCallback(async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setDataReady(false);
    
    try {
      const { data, error } = await supabase
          .from('logagent')
          .select('*')
          .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (data) {
        setLogs(data as LogEntry[]);
        setDataReady(true);
      } else {
        setLogs([]);
        setDataReady(true);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      setDataReady(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
    
    // Set up auto-refresh every 60 seconds
    const intervalId = setInterval(() => {
      fetchLogs(true);
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [fetchLogs]);

  const filteredLogs = useMemo(() => {
    if (!dataReady || logs.length === 0) {
      return [];
    }

    setCurrentPage(1);
    return logs
        .filter(log => {
          // Add null checks for safety
          if (!log) return false;

          const searchLower = searchQuery.toLowerCase();
          const ipAddress = log.ip_address || '';
          const url = log.url || '';

          return (
              ipAddress.toLowerCase().includes(searchLower) ||
              url.toLowerCase().includes(searchLower)
          );
        })
        .filter(log => filters.method === 'all' || log.method === filters.method)
        .filter(log => filters.status === 'all' || log.status?.toString() === filters.status)
        .filter(log => filters.decision === 'all' || log.decision === filters.decision);
  }, [logs, searchQuery, filters, dataReady]);

  const paginatedLogs = useMemo(() => {
    if (!dataReady || filteredLogs.length === 0) {
      return [];
    }

    const startIndex = (currentPage - 1) * LOGS_PER_PAGE;
    return filteredLogs.slice(startIndex, startIndex + LOGS_PER_PAGE);
  }, [filteredLogs, currentPage, dataReady]);

  const totalPages = Math.ceil(filteredLogs.length / LOGS_PER_PAGE);

  const handleRowClick = (log: LogEntry) => {
    setSelectedLog(log);
  };

  const closeModal = () => {
    setSelectedLog(null);
  };

  const handleRefresh = () => {
    fetchLogs(true);
  };

  if (loading || !dataReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Navbar />
        <main className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-700/20 mr-4">
                  <Shield className="h-8 w-8 text-white drop-shadow-md" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Security Dashboard
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-medium">
                  Monitor and analyze security events in real-time.
                </p>
              </header>
            <div className="flex justify-center items-center h-96 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
                <div className="flex flex-col items-center">
                  <Spinner size="xl" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">Loading security data...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
          <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-700/20 mr-4 transform hover:scale-105 transition-all duration-300">
                  <Shield className="h-8 w-8 text-white drop-shadow-md" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Security Dashboard
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-medium pl-1">
                Monitor and analyze security events in real-time.
              </p>
            </div>
            <button 
              onClick={handleRefresh} 
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300 font-medium"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </header>
              
          {/* Tab Navigation */}
          <div className="mb-6">
            <nav className="flex space-x-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-1.5 rounded-2xl w-fit shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === 'logs'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md transform translate-y-[-1px]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Table className="h-4 w-4 mr-2" />
                Security Logs
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === 'analytics'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md transform translate-y-[-1px]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </button>
            </nav>
          </div>
              
          <div className="transition-opacity duration-300 ease-in-out">
            {activeTab === 'analytics' && (
              <Analytics logs={logs} />
            )}
            
            {activeTab === 'logs' && (
              <>
                <FilterBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filters={filters}
                  setFilters={setFilters}
                  logData={logs}
                />

                <LogTable
                  logs={paginatedLogs}
                  onRowClick={handleRowClick}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
                
                {filteredLogs.length > 0 && (
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                    Showing {paginatedLogs.length} of {filteredLogs.length} entries
                  </div>
                )}
              </>
            )}
          </div>
          </div>
        </main>
        
        {/* Enhanced modal with transition effects */}
        {selectedLog && <LogDetailModal log={selectedLog} onClose={closeModal} />}
    </div>
  );
};

export default Dashboard;