/**
 * Pagination component for navigating through log entries
 */

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { PaginationOptions } from '../../types';

interface PaginationProps {
  pagination: PaginationOptions;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{startItem.toLocaleString()}</span> to{' '}
              <span className="font-medium">{endItem.toLocaleString()}</span> of{' '}
              <span className="font-medium">{total.toLocaleString()}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
              <button
                onClick={() => onPageChange(1)}
                disabled={page === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200 ${
                    pageNum === page
                      ? 'z-10 bg-blue-50 dark:bg-blue-900/50 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onPageChange(totalPages)}
                disabled={page === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;