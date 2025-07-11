/**
 * Filter and search bar component for log filtering
 */

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FilterOptions } from '../../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters & Search</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="ml-auto flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="w-4 h-4" />
            <span className="text-sm font-medium">Clear All</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search IP or URL..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />
        </div>

        {/* Method filter */}
        <select
          value={filters.method || ''}
          onChange={(e) => handleFilterChange('method', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
        >
          <option value="">All Methods</option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>

        {/* Decision filter */}
        <select
          value={filters.decision || ''}
          onChange={(e) => handleFilterChange('decision', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
        >
          <option value="">All Decisions</option>
          <option value="BENIGN">Allowed</option>
          <option value="MALICIOUS">Blocked</option>
          <option value="flagged">Flagged</option>
        </select>

        {/* Status filter */}
        <select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
        >
          <option value="">All Status</option>
          <option value="200">200 - OK</option>
          <option value="400">400 - Bad Request</option>
          <option value="401">401 - Unauthorized</option>
          <option value="403">403 - Forbidden</option>
          <option value="404">404 - Not Found</option>
          <option value="500">500 - Server Error</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;