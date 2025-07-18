import React from 'react';
import { LogEntry } from '../types';
import Badge from './common/Badge';

interface LogTableProps {
  logs: LogEntry[];
  onRowClick: (log: LogEntry) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const LogTable: React.FC<LogTableProps> = ({ logs, onRowClick, currentPage, totalPages, onPageChange }) => {
    
  if (logs.length === 0) {
    return (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
            <hero-icon-outline-document-magnifying-glass class="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No Logs Found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria.
            </p>
        </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">IP Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Request</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Decision</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {logs.map(log => (
              <tr key={log.id} onClick={() => onRowClick(log)} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(log.created_at).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800 dark:text-gray-200">{log.ip_address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  <span className={`font-bold text-xs ${log.method === 'GET' ? 'text-green-500' : 'text-blue-500'}`}>{log.method}</span> {log.url}
                </td>
                <td className="px-6 py-4 whitespace-nowrap"><Badge decision={log.decision} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {logs.map(log => (
            <li key={log.id} onClick={() => onRowClick(log)} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-mono text-sm text-gray-800 dark:text-gray-200">{log.ip_address}</p>
                <Badge decision={log.decision} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{log.method} {log.url}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{new Date(log.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">Previous</button>
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">Next</button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
                <span className="sr-only">Previous</span>
                <hero-icon-solid-chevron-left class="h-5 w-5" />
              </button>
              <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
                <span className="sr-only">Next</span>
                <hero-icon-solid-chevron-right class="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogTable;
