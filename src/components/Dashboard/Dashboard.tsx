/**
 * Main dashboard component that orchestrates all other components
 * Handles state management and data flow
 */

import React, { useState } from 'react';
import { useLogs } from '../../hooks/useLogs';
import { FilterOptions } from '../../types';
import Header from './Header';
import StatsCards from './StatsCards';
import FilterBar from './FilterBar';
import Charts from './Charts';
import LogsTable from './LogsTable';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import ErrorState from './ErrorState';
import { BarChart3 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [showCharts, setShowCharts] = useState(true);
  
  const {
    logs,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    changePage,
    refreshLogs,
  } = useLogs();

  /**
   * Handle filter changes and update the filters state
   */
  const handleFiltersChange = (newFilters: FilterOptions) => {
    updateFilters(newFilters);
  };

  /**
   * Clear all active filters
   */
  const handleClearFilters = () => {
    updateFilters({});
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <Header onRefresh={refreshLogs} loading={loading} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error ? (
          <ErrorState error={error} onRetry={refreshLogs} />
        ) : (
          <>
            {/* Statistics Cards */}
            <StatsCards logs={logs} />

            {/* Charts Toggle Button */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics</h2>
              </div>
              <button
                onClick={() => setShowCharts(!showCharts)}
                className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200"
              >
                {showCharts ? 'Hide Charts' : 'Show Charts'}
              </button>
            </div>

            {/* Charts */}
            {showCharts && logs.length > 0 && <Charts logs={logs} />}

            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />

            {/* Logs Table */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Logs</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {pagination.total.toLocaleString()} total entries
                </div>
              </div>
              
              {loading ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <LoadingSpinner message="Loading security logs..." />
                </div>
              ) : (
                <>
                  <LogsTable logs={logs} />
                  <Pagination pagination={pagination} onPageChange={changePage} />
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;