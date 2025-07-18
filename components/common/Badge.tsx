
import React from 'react';
import { Decision } from '../../types';

interface BadgeProps {
  decision: Decision;
}

const decisionStyles: Record<Decision, string> = {
  allowed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  blocked: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  monitored: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

const Badge: React.FC<BadgeProps> = ({ decision }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${decisionStyles[decision]}`}>
      {decision.charAt(0).toUpperCase() + decision.slice(1)}
    </span>
  );
};

export default Badge;
