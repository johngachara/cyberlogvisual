/**
 * Logs table component with responsive design and interactive features
 */

import React, { useState } from 'react';
import { LogEntry } from '../../types';
import { 
  getDecisionColor, 
  getStatusColor, 
  getConfidenceColor,
  truncateText,
  formatTimestamp 
} from '../../utils/helpers';
import LogModal from './LogModal';

interface LogsTableProps {
  logs: LogEntry[];
}

const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (log: LogEntry) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  if (logs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center transition-colors duration-200">
        <p className="text-gray-500 dark:text-gray-400">No logs found with current filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Decision
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                  Confidence
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden xl:table-cell">
                  Reasoning
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {logs.map((log, index) => (
                <tr 
                  key={index} 
                  onClick={() => handleRowClick(log)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {log.created_at ? formatTimestamp(log.created_at) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                    {log.ip_address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      {log.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs">
                    <span title={log.url}>
                      {truncateText(log.url, 50)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getDecisionColor(log.decision)}`}>
                      {log.decision}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                    <span className={`font-semibold ${getConfidenceColor(log.confidence)}`}>
                      {log.confidence}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs hidden xl:table-cell">
                    <span title={log.reasoning}>
                      {truncateText(log.reasoning, 60)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <LogModal 
        log={selectedLog}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default LogsTable;