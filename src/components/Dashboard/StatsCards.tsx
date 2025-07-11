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
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Allowed',
      value: stats.allowed,
      percentage: stats.allowedPercentage,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Blocked',
      value: stats.blocked,
      percentage: stats.blockedPercentage,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: 'Flagged',
      value: stats.flagged,
      icon: Flag,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} p-6 rounded-lg border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              {card.percentage !== undefined && (
                <p className="text-sm text-gray-500 mt-1">{card.percentage}%</p>
              )}
            </div>
            <card.icon className={`w-8 h-8 ${card.iconColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;