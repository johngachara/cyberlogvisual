
import React, { useEffect } from 'react';
import { LogEntry } from '../types';
import Badge from './common/Badge';

interface LogDetailModalProps {
  log: LogEntry;
  onClose: () => void;
}

const DetailRow: React.FC<{ label: string; value: string | number; mono?: boolean }> = ({ label, value, mono = false }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
    <dd className={`mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2 ${mono ? 'font-mono' : ''}`}>{value}</dd>
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
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center" aria-modal="true" role="dialog" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl m-4 max-w-2xl w-full transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-white" id="modal-title">
                    Log Details
                  </h3>
                   <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <hero-icon-outline-x-mark class="h-6 w-6"/>
                  </button>
              </div>
              <div className="mt-4">
                <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                  <DetailRow label="Timestamp" value={new Date(log.created_at).toLocaleString().split(',')[1]} />
                  <DetailRow label="IP Address" value={log.ip_address} mono />
                  <DetailRow label="Method" value={log.method} />
                  <DetailRow label="URL" value={log.url} mono/>
                  <DetailRow label="Query String" value={log.query_string} mono/>
                  <DetailRow label="Status Code" value={log.status} />
                   <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Decision</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><Badge decision={log.decision} /></dd>
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
