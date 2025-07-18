
import React from 'react';
import { Decision } from '../../types';

interface BadgeProps {
  decision: Decision;
}

const decisionStyles: Record<Decision, string> = {
  allowed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
  blocked: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800',
  monitored: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
};

const Badge: React.FC<BadgeProps> = ({ decision }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${decisionStyles[decision]} transition-all duration-200`}>
      {decision.charAt(0).toUpperCase() + decision.slice(1)}
    </span>
  );
};

export default Badge;
