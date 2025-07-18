
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  return (
    <div
      className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-primary-500 border-t-transparent`}
      role="status"
    >
        <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
