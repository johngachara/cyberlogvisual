
import React from 'react';
import { LogEntry } from '../types';

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
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="md:col-span-2 lg:col-span-2">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <hero-icon-outline-magnifying-glass class="h-5 w-5 text-gray-400"/>
                    </div>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
        <label htmlFor={name} className="sr-only">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        >
            <option value="all">{`All ${label}s`}</option>
            {options.slice(1).map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);


export default FilterBar;
