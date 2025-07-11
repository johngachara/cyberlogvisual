/**
 * Loading spinner component with cybersecurity theme
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} animate-spin mb-4`}>
        <div className="border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full w-full h-full"></div>
      </div>
      {message && (
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;