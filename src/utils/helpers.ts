/**
 * Utility functions for data formatting and manipulation
 */

import { LogEntry } from '../types';

/**
 * Get color class based on decision type
 */
export const getDecisionColor = (decision: string): string => {
  switch (decision) {
    case 'BENIGN':
    case 'allow':
      return 'text-green-600 bg-green-100';
    case 'MALICIOUS':
    case 'block':
      return 'text-red-600 bg-red-100';
    case 'flagged':
    case 'flag':
      return 'text-yellow-600 bg-yellow-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

/**
 * Get color class based on HTTP status code
 */
export const getStatusColor = (status: number): string => {
  if (status >= 200 && status < 300) {
    return 'text-green-600 bg-green-100';
  } else if (status >= 300 && status < 400) {
    return 'text-blue-600 bg-blue-100';
  } else if (status >= 400 && status < 500) {
    return 'text-yellow-600 bg-yellow-100';
  } else if (status >= 500) {
    return 'text-red-600 bg-red-100';
  }
  return 'text-gray-600 bg-gray-100';
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

/**
 * Truncate long text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Get confidence level color
 */
export const getConfidenceColor = (confidence: string): string => {
  const confidenceNum = parseFloat(confidence);
  if (confidenceNum >= 0.8) {
    return 'text-green-600';
  } else if (confidenceNum >= 0.6) {
    return 'text-yellow-600';
  } else {
    return 'text-red-600';
  }
};

/**
 * Generate stats from logs data
 */
export const generateStats = (logs: LogEntry[]) => {
  const total = logs.length;
  const allowed = logs.filter(log => log.decision === 'BENIGN').length;
  const blocked = logs.filter(log => log.decision=== 'MALICIOUS').length;
  const flagged = logs.filter(log => log.decision.toLowerCase() === 'flagged').length;

  return {
    total,
    allowed,
    blocked,
    flagged,
    allowedPercentage: total > 0 ? Math.round((allowed / total) * 100) : 0,
    blockedPercentage: total > 0 ? Math.round((blocked / total) * 100) : 0,
  };
};