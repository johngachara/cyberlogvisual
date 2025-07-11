/**
 * Modal component for displaying detailed log information
 */

import React, { useEffect } from 'react';
import { X, Calendar, Globe, Shield, AlertTriangle, Info } from 'lucide-react';
import { LogEntry } from '../../types';
import { getDecisionColor, getStatusColor, formatTimestamp } from '../../utils/helpers';

interface LogModalProps {
  log: LogEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

const LogModal: React.FC<LogModalProps> = ({ log, isOpen, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !log) return null;

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'BENIGN':
        return <Shield className="w-5 h-5 text-green-600" />;
      case 'MALICIOUS':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-yellow-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {getDecisionIcon(log.decision)}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Security Log Details
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Request Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Request Information
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">IP Address</label>
                    <p className="text-gray-900 dark:text-white font-mono text-sm mt-1">{log.ip_address}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">HTTP Method</label>
                    <div className="mt-1">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                        {log.method}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">URL</label>
                    <p className="text-gray-900 dark:text-white text-sm mt-1 break-all">{log.url}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status Code</label>
                    <div className="mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                  
                  {log.query_string && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Query String</label>
                      <p className="text-gray-900 dark:text-white text-sm mt-1 break-all">{log.query_string}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Analysis */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Analysis
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Decision</label>
                    <div className="mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getDecisionColor(log.decision)}`}>
                        {log.decision}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Confidence</label>
                    <p className="text-gray-900 dark:text-white text-sm mt-1">{log.confidence}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Decision Maker</label>
                    <p className="text-gray-900 dark:text-white text-sm mt-1">{log.decision_maker}</p>
                  </div>
                  
                  {log.reasoning && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Reasoning</label>
                      <p className="text-gray-900 dark:text-white text-sm mt-1">{log.reasoning}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Additional Information
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  {log.created_at && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</label>
                      <p className="text-gray-900 dark:text-white text-sm mt-1">{formatTimestamp(log.created_at)}</p>
                    </div>
                  )}
                  
                  {log.user_agent && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">User Agent</label>
                      <p className="text-gray-900 dark:text-white text-sm mt-1 break-all">{log.user_agent}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogModal;