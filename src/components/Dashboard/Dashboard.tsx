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
    <div className="min-h-screen bg-gray-50">
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
              <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
              <button
                onClick={() => setShowCharts(!showCharts)}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
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
                <h2 className="text-xl font-semibold text-gray-900">Security Logs</h2>
                <div className="text-sm text-gray-500">
                  {pagination.total} total entries
                </div>
              </div>
              
              {loading ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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