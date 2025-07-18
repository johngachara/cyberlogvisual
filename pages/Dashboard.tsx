import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import { LogEntry } from '../types';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import LogTable from '../components/LogTable';
import LogDetailModal from '../components/LogDetailModal';
import Analytics from '../components/Analytics';
import Spinner from '../components/common/Spinner';
import { BarChart3, Table, Shield } from 'lucide-react';

const LOGS_PER_PAGE = 15;

const Dashboard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
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

  const fetchLogs = useCallback(async () => {
    setLoading(true);
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
    }
  }, []);

  useEffect(() => {
    fetchLogs();
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

  if (loading || !dataReady) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />
        <main className="p-6 sm:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Security Dashboard
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                  Monitor and analyze security events in real-time.
                </p>
              </header>
            <div className="flex justify-center items-center h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <Spinner size="xl" />
              </div>
            </div>
          </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
      <main className="p-6 sm:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Security Dashboard
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                Monitor and analyze security events in real-time.
              </p>
            </header>

          {/* Tab Navigation */}
          <div className="mb-8">
            <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl w-fit">
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === 'logs'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-lg'
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
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </button>
            </nav>
          </div>
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
            </>
          )}
          </div>
        </main>
        {selectedLog && <LogDetailModal log={selectedLog} onClose={closeModal} />}
    </div>
  );
};

          {activeTab === 'analytics' && (
            <Analytics logs={logs} />
          )}
export default Dashboard;