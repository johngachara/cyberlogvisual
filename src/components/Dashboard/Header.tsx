/**
 * Dashboard header component with title and real-time indicators
 */

import React from 'react';
import { Shield, Activity, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  loading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, loading = false }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Cybersecurity Log Agent
            </h1>
            <p className="text-gray-600 text-sm">
              Real-time security monitoring and analysis
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-600">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">System Active</span>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;