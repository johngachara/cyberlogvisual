
import React from 'react';
import { LogEntry } from '../types';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: { method: string; status: string; decision: string };
  setFilters: React.Dispatch<React.SetStateAction<{ method: string; status: string; decision: string }>>;
  logData: LogEntry[];
}

const FilterBar: React.FC<FilterBarProps> = ({ searchQuery, setSearchQuery, filters, setFilters, logData }) => {
    
    const uniqueMethods = ['all', ...Array.from(new Set(logData.map(log => log.method)))];
    const uniqueDecisions = ['all', ...Array.from(new Set(logData.map(log => log.decision)))];
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({...prev, [name]: value}));
    }

  return (
    <div className="card p-4 md:p-6 mb-6 md:mb-8 animate-fade-in">
      <div className="flex items-center mb-4 md:mb-6">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3 flex-shrink-0">
          <Filter className="h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-300" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Filters & Search</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="md:col-span-2">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="search"
                        id="search"
                      className="form-input pl-10 md:pl-12"
                        placeholder="Search by IP or URL..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <FilterSelect name="method" value={filters.method} onChange={handleFilterChange} options={uniqueMethods} label="Method"/>
            <FilterSelect name="decision" value={filters.decision} onChange={handleFilterChange} options={uniqueDecisions} label="Decision"/>
      </div>
    </div>
  );
};

interface FilterSelectProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    label: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ name, value, onChange, options, label }) => (
    <div>
      <label htmlFor={name} className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
          className="form-select"
        >
            <option value="all">{`All ${label}s`}</option>
            {options.slice(1).map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);


export default FilterBar;
