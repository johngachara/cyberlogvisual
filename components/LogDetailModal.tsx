
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
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-6 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <dt className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400">
      {icon && <span className="mr-2 text-gray-500 dark:text-gray-400">{icon}</span>}
      {label}
    </dt>
    <dd className={`mt-2 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2 ${mono ? 'font-mono bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg' : 'font-medium'}`}>
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
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in" aria-modal="true" role="dialog" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out animate-fade-in border border-gray-200 dark:border-gray-700" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Security Log Details
              </h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto custom-scrollbar max-h-[calc(90vh-140px)]">
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
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-6 border-b border-gray-100 dark:border-gray-700">
                  <dt className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                    <Shield className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    Decision
                  </dt>
                  <dd className="mt-2 sm:mt-0 sm:col-span-2">
                    <Badge decision={log.decision} />
                  </dd>
                </div>
                <DetailRow 
                  label="Confidence" 
                  value={`${((log.confidence / 10) * 100).toFixed(0)}%`} 
                  icon={<Brain className="h-4 w-4" />}
                />
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-6 border-b border-gray-100 dark:border-gray-700">
                  <dt className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                    <Brain className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    Reasoning
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    {log.reasoning}
                  </dd>
                </div>
                <DetailRow 
                  label="Decision Maker" 
                  value={log.decision_maker} 
                  icon={<User className="h-4 w-4" />}
                />
                <div className="py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <dt className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    <Monitor className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    User Agent
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-200 font-mono bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 break-all">
                    {log.user_agent}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
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
                  </div>
                  <DetailRow label="Confidence" value={`${((log.confidence / 10 ) * 100).toFixed(0)}%`} />
                  <DetailRow label="Reasoning" value={log.reasoning} />
                  <DetailRow label="Decision Maker" value={log.decision_maker} />
                  <DetailRow label="User Agent" value={log.user_agent} mono/>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-500 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogDetailModal;
