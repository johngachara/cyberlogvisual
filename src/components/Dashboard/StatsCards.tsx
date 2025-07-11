/**
 * Statistics cards component showing key metrics
 */

import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Flag } from 'lucide-react';
import { generateStats } from '../../utils/helpers';
import { LogEntry } from '../../types';

interface StatsCardsProps {
  logs: LogEntry[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ logs }) => {
  const stats = generateStats(logs);

  const cards = [
    {
      title: 'Total Requests',
      value: stats.total,
      icon: Shield,
      color: 'blue',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      title: 'Allowed',
      value: stats.allowed,
      percentage: stats.allowedPercentage,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      iconColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      title: 'Blocked',
      value: stats.blocked,
      percentage: stats.blockedPercentage,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
      iconColor: 'text-red-600 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-800',
    },
    {
      title: 'Flagged',
      value: stats.flagged,
      icon: Flag,
      color: 'yellow',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`${card.bgColor} ${card.borderColor} p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{card.value.toLocaleString()}</p>
              {card.percentage !== undefined && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{card.percentage}%</p>
              )}
            </div>
            <div className={`p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 shadow-sm`}>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;