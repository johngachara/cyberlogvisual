import React from 'react';
import { LogEntry } from '../types';
import Badge from './common/Badge';
import { FileSearch, ChevronLeft, ChevronRight } from 'lucide-react';

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
      <div className="card text-center py-16 md:py-20 animate-fade-in">
        <FileSearch className="mx-auto h-12 w-12 md:h-16 md:w-16 text-gray-400 mb-4 opacity-70" />
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">No Logs Found</h3>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                Try adjusting your search or filter criteria.
            </p>
      </div>
    );
  }

  return (
    <div className="table-container animate-fade-in">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="table-header">
            <tr>
              <th scope="col" className="table-cell text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
              <th scope="col" className="table-cell text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">IP Address</th>
              <th scope="col" className="table-cell text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Request</th>
              <th scope="col" className="table-cell text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Decision</th>
              <th scope="col" className="table-cell text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {logs.map((log, index) => (
              <tr
                key={log.id} 
                onClick={() => onRowClick(log)} 
                className={`table-row ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/30 dark:bg-gray-800/30'}`}
              >
                <td className="table-cell whitespace-nowrap text-gray-600 dark:text-gray-400 font-medium">
                  {new Date(log.created_at).toLocaleString()}
                </td>
                <td className="table-cell whitespace-nowrap">
                  <span className="font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 text-sm">
                    {log.ip_address}
                  </span>
                </td>
                <td className="table-cell">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold mr-2 ${
                    log.method === 'GET' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                    log.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                    log.method === 'PUT' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                    log.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {log.method}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-xs inline-block">{log.url}</span>
                </td>
                <td className="table-cell whitespace-nowrap"><Badge decision={log.decision} /></td>
                <td className="table-cell whitespace-nowrap text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    log.status >= 200 && log.status < 300 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                    log.status >= 300 && log.status < 400 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                    log.status >= 400 && log.status < 500 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden">
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {logs.map((log, index) => (
            <li 
              key={log.id} 
              onClick={() => onRowClick(log)} 
              className={`mobile-card ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/30 dark:bg-gray-800/30'}`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 w-fit">
                  <p className="font-mono text-xs md:text-sm text-gray-800 dark:text-gray-200">{log.ip_address}</p>
                </div>
                <Badge decision={log.decision} />
              </div>
              <div className="flex items-center mb-3 flex-wrap gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold mr-2 ${
                  log.method === 'GET' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                  log.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {log.method}
                </span>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium truncate flex-1 min-w-0">{log.url}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0">
                <span className="font-medium">{new Date(log.created_at).toLocaleString()}</span>
                <span className={`px-2 py-1 rounded-full font-semibold ${
                  log.status >= 200 && log.status < 300 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                } w-fit`}>
                  {log.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="px-4 md:px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="flex-1 flex justify-between sm:hidden">
          <button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1} 
            className="btn-secondary px-4 py-2 text-sm"
          >
            Previous
          </button>
          <button 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages} 
            className="btn-secondary px-4 py-2 text-sm ml-3"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
              Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px bg-white dark:bg-gray-800" aria-label="Pagination">
              <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="relative inline-flex items-center px-3 py-2 rounded-l-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus-ring min-h-[44px]"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="relative inline-flex items-center px-3 py-2 rounded-r-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus-ring min-h-[44px]"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogTable;
