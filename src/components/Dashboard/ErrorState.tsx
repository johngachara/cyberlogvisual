/**
 * Error state component with retry functionality
 */

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 transition-colors duration-200">
      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Data</h3>
      <p className="text-red-600 dark:text-red-400 text-center mb-4 max-w-md">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;