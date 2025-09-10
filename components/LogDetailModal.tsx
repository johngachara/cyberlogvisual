
import React, { useEffect } from 'react';
import { LogEntry } from '../types';
import Badge from './common/Badge';
import { X, Calendar, Globe, Code, Shield, Brain, User, Monitor } from 'lucide-react';

interface LogDetailModalProps {
  log: LogEntry;
  onClose: () => void;
}

const DetailRow: React.FC<{ 
  label: string; 
  value: string | number; 
  mono?: boolean; 
  icon?: React.ReactNode;
}> = ({ label, value, mono = false, icon }) => (
  <div className="py-3 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 md:gap-6 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <dt className="flex items-center text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:mb-0">
      {icon && <span className="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0">{icon}</span>}
      {label}
    </dt>
    <dd className={`text-xs md:text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 ${mono ? 'font-mono bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg break-all' : 'font-medium'}`}>
      {value}
    </dd>
  </div>
);

const LogDetailModal: React.FC<LogDetailModalProps> = ({ log, onClose }) => {
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);
  
  return (
    <div className="modal-backdrop" aria-modal="true" role="dialog" onClick={onClose}>
      <div className="modal-content max-w-xs sm:max-w-2xl md:max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3 flex-shrink-0">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                Security Log Details
              </h3>
            </div>
            <button 
              onClick={onClose} 
              className="btn-ghost p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="modal-body">
          <div className="sm:flex sm:items-start">
            <div className="w-full">
              <dl className="space-y-0">
                <DetailRow 
                  label="Timestamp" 
                  value={new Date(log.created_at).toLocaleString()} 
                  icon={<Calendar className="h-4 w-4" />}
                />
                <DetailRow 
                  label="IP Address" 
                  value={log.ip_address} 
                  mono 
                  icon={<Globe className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Method" 
                  value={log.method} 
                  icon={<Code className="h-4 w-4" />}
                />
                <DetailRow 
                  label="URL" 
                  value={log.url} 
                  mono 
                  icon={<Globe className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Query String" 
                  value={log.query_string || 'None'} 
                  mono 
                  icon={<Code className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Status Code" 
                  value={log.status} 
                  icon={<Monitor className="h-4 w-4" />}
                />
                <div className="py-3 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 md:gap-6 border-b border-gray-100 dark:border-gray-700">
                  <dt className="flex items-center text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:mb-0">
                    <Shield className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    Decision
                  </dt>
                  <dd className="sm:col-span-2">
                    <Badge decision={log.decision} />
                  </dd>
                </div>
                <DetailRow 
                  label="Confidence" 
                  value={`${((log.confidence / 10) * 100).toFixed(0)}%`} 
                  icon={<Brain className="h-4 w-4" />}
                />
                <div className="py-3 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 md:gap-6 border-b border-gray-100 dark:border-gray-700">
                  <dt className="flex items-center text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
                    <Brain className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    Reasoning
                  </dt>
                  <dd className="text-xs md:text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 bg-gray-50 dark:bg-gray-800 p-3 md:p-4 rounded-xl border border-gray-200 dark:border-gray-700 leading-relaxed">
                    {log.reasoning}
                  </dd>
                </div>
                <DetailRow 
                  label="Decision Maker" 
                  value={log.decision_maker} 
                  icon={<User className="h-4 w-4" />}
                />
                <div className="py-3 md:py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <dt className="flex items-center text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    <Monitor className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    User Agent
                  </dt>
                  <dd className="text-xs md:text-sm text-gray-900 dark:text-gray-200 font-mono bg-gray-50 dark:bg-gray-800 p-3 md:p-4 rounded-xl border border-gray-200 dark:border-gray-700 break-all leading-relaxed">
                    {log.user_agent}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogDetailModal;
